// app/api/cron/deliver/route.ts
// Call this via a cron service (Vercel Cron, cron-job.org) daily
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendCapsuleEmail, sendCheckInReminder } from '@/lib/email'

export async function GET(req: Request) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  let delivered = 0
  let warned = 0

  // 1. Deliver scheduled capsules
  const scheduled = await prisma.capsule.findMany({
    where: {
      status: 'SEALED',
      triggerType: 'SCHEDULED',
      deliverAt: { lte: now },
    },
    include: { recipients: true, user: true },
  })

  for (const capsule of scheduled) {
    try {
      for (const recipient of capsule.recipients) {
        await sendCapsuleEmail({
          to: recipient.email,
          recipientName: recipient.name,
          senderName: capsule.user.name ?? capsule.user.email ?? 'Quelqu\'un qui vous aime',
          capsuleTitle: capsule.title,
          message: capsule.message,
          mediaUrls: capsule.mediaUrls,
        })
      }
      await prisma.capsule.update({
        where: { id: capsule.id },
        data: { status: 'DELIVERED', sentAt: now },
      })
      delivered++
    } catch (e) {
      console.error(`Failed to deliver capsule ${capsule.id}:`, e)
      await prisma.capsule.update({ where: { id: capsule.id }, data: { status: 'FAILED' } })
    }
  }

  // 2. Dead Man's Switch — check overdue switches
  const dmsUsers = await prisma.deadManSwitch.findMany({ where: { isTriggered: false } })

  for (const dms of dmsUsers) {
    const daysSince = Math.floor((now.getTime() - dms.lastCheckIn.getTime()) / (1000 * 60 * 60 * 24))
    const interval = dms.intervalDays
    const daysLeft = interval - daysSince

    const user = await prisma.user.findUnique({ where: { id: dms.userId } })
    if (!user) continue

    // Warning at 30 days, 14 days, 7 days before trigger
    const warnAt = [interval - 30, interval - 14, interval - 7]
    const shouldWarn = warnAt.some(w => daysSince >= w && dms.warningsSent < warnAt.indexOf(w) + 1)

    if (shouldWarn && user.email) {
      await sendCheckInReminder(
        user.email,
        user.name ?? 'cher utilisateur',
        Math.max(0, daysLeft),
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkin=1`
      )
      await prisma.deadManSwitch.update({ where: { userId: dms.userId }, data: { warningsSent: { increment: 1 } } })
      warned++
    }

    // Trigger delivery
    if (daysSince >= interval) {
      const capsules = await prisma.capsule.findMany({
        where: { userId: dms.userId, status: 'SEALED', triggerType: 'DEADMAN' },
        include: { recipients: true, user: true },
      })

      for (const capsule of capsules) {
        try {
          for (const recipient of capsule.recipients) {
            await sendCapsuleEmail({
              to: recipient.email,
              recipientName: recipient.name,
              senderName: capsule.user.name ?? capsule.user.email ?? 'Quelqu\'un qui vous aimait',
              capsuleTitle: capsule.title,
              message: capsule.message,
              mediaUrls: capsule.mediaUrls,
            })
          }
          await prisma.capsule.update({ where: { id: capsule.id }, data: { status: 'DELIVERED', sentAt: now } })
          delivered++
        } catch (e) {
          console.error(e)
        }
      }

      await prisma.deadManSwitch.update({
        where: { userId: dms.userId },
        data: { isTriggered: true, triggeredAt: now },
      })
    }
  }

  return NextResponse.json({ ok: true, delivered, warned, timestamp: now.toISOString() })
}
