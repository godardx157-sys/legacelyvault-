import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`
    const userCount = await prisma.user.count()
    return NextResponse.json({ ok: true, message: 'DB connected', userCount })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
