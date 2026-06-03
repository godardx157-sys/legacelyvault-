// app/api/checkin/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  await prisma.deadManSwitch.upsert({
    where: { userId: session.user.id },
    update: { lastCheckIn: new Date(), warningsSent: 0 },
    create: { userId: session.user.id, lastCheckIn: new Date() },
  })

  return NextResponse.json({ success: true, checkedAt: new Date().toISOString() })
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const dms = await prisma.deadManSwitch.findUnique({ where: { userId: session.user.id } })
  return NextResponse.json({ switch: dms })
}
