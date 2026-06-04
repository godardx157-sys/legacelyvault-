import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const hasDbUrl = !!process.env.DATABASE_URL
  const dbUrlPreview = process.env.DATABASE_URL
    ? process.env.DATABASE_URL.substring(0, 50) + '...'
    : 'NOT SET'

  if (!hasDbUrl) {
    return NextResponse.json({
      ok: false,
      error: 'DATABASE_URL absent de process.env',
      dbUrlPreview,
      nodeEnv: process.env.NODE_ENV,
    }, { status: 500 })
  }

  try {
    const { prisma } = await import('@/lib/prisma')
    await prisma.$queryRaw`SELECT 1`
    const userCount = await prisma.user.count()
    return NextResponse.json({ ok: true, dbUrlPreview, userCount })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err), dbUrlPreview }, { status: 500 })
  }
}
