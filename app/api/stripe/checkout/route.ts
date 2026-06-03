// app/api/stripe/checkout/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createCheckoutSession, PLANS } from '@/lib/stripe'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { plan } = await req.json()
  if (!plan || !(plan in PLANS)) {
    return NextResponse.json({ error: 'Plan invalide' }, { status: 400 })
  }

  const planConfig = PLANS[plan as keyof typeof PLANS]
  if (!planConfig.priceId) {
    return NextResponse.json({ error: 'Plan gratuit, pas de checkout requis' }, { status: 400 })
  }

  const checkoutSession = await createCheckoutSession(
    session.user.id,
    session.user.email,
    planConfig.priceId,
    plan
  )

  return NextResponse.json({ url: checkoutSession.url })
}
