// app/api/stripe/webhook/route.ts
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const s = event.data.object as Stripe.Checkout.Session
      const userId = s.metadata?.userId
      const plan = s.metadata?.plan
      if (!userId || !plan) break

      const subscription = typeof s.subscription === 'string'
        ? await stripe.subscriptions.retrieve(s.subscription)
        : s.subscription as Stripe.Subscription

      await prisma.user.update({
        where: { id: userId },
        data: {
          plan: plan as 'PRO' | 'ETERNAL',
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
      })
      break
    }

    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription
      const userId = sub.metadata?.userId
      if (!userId) break

      const plan = sub.items.data[0].price.id === process.env.STRIPE_ETERNAL_PRICE_ID ? 'ETERNAL' : 'PRO'
      await prisma.user.update({
        where: { id: userId },
        data: {
          plan: sub.status === 'active' ? plan : 'FREE',
          stripeCurrentPeriodEnd: new Date(sub.current_period_end * 1000),
          stripePriceId: sub.items.data[0].price.id,
        },
      })
      break
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      const userId = sub.metadata?.userId
      if (!userId) break
      await prisma.user.update({
        where: { id: userId },
        data: { plan: 'FREE', stripeSubscriptionId: null, stripePriceId: null, stripeCurrentPeriodEnd: null },
      })
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      console.warn(`Payment failed for customer ${invoice.customer}`)
      break
    }
  }

  return NextResponse.json({ received: true })
}

export const runtime = 'nodejs'
