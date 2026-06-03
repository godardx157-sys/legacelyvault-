// app/api/capsules/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { PLANS } from '@/lib/stripe'

const createSchema = z.object({
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(50000),
  mediaUrls: z.array(z.string().url()).default([]),
  deliverAt: z.string().datetime().nullable().optional(),
  triggerType: z.enum(['SCHEDULED', 'DEADMAN']).default('SCHEDULED'),
  isEncrypted: z.boolean().default(false),
  recipients: z.array(z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    phone: z.string().optional(),
    relation: z.string().optional(),
  })).min(1).max(50),
})

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const capsules = await prisma.capsule.findMany({
    where: { userId: session.user.id },
    include: { recipients: true, _count: { select: { recipients: true } } },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json({ capsules })
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  try {
    const body = await req.json()
    const data = createSchema.parse(body)

    // Plan limits
    const userPlan = (session.user.plan ?? 'FREE') as keyof typeof PLANS
    const planConfig = PLANS[userPlan] ?? PLANS.FREE
    const existingCount = await prisma.capsule.count({ where: { userId: session.user.id } })

    if (planConfig.capsules !== Infinity && existingCount >= planConfig.capsules) {
      return NextResponse.json({ error: `Limite de capsules atteinte pour votre plan (${planConfig.capsules}).` }, { status: 403 })
    }

    if (data.mediaUrls.length > planConfig.mediaPerCapsule) {
      return NextResponse.json({ error: `Trop de médias. Votre plan autorise ${planConfig.mediaPerCapsule} médias/capsule.` }, { status: 403 })
    }

    if (data.recipients.length > (planConfig.recipients === Infinity ? 999 : planConfig.recipients)) {
      return NextResponse.json({ error: `Trop de destinataires pour votre plan.` }, { status: 403 })
    }

    const capsule = await prisma.capsule.create({
      data: {
        userId: session.user.id,
        title: data.title,
        message: data.message,
        mediaUrls: data.mediaUrls,
        deliverAt: data.deliverAt ? new Date(data.deliverAt) : null,
        triggerType: data.triggerType,
        isEncrypted: data.isEncrypted,
        status: 'SEALED',
        recipients: { create: data.recipients },
      },
      include: { recipients: true },
    })

    // Init dead man's switch if needed
    if (data.triggerType === 'DEADMAN') {
      await prisma.deadManSwitch.upsert({
        where: { userId: session.user.id },
        update: {},
        create: { userId: session.user.id, lastCheckIn: new Date() },
      })
    }

    return NextResponse.json({ capsule }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 })
    }
    console.error(err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
