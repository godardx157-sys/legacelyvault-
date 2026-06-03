// lib/stripe.ts
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
})

export const PLANS = {
  FREE: {
    name: 'Souvenir',
    priceId: null,
    price: 0,
    capsules: 1,
    mediaPerCapsule: 0,
    recipients: 2,
    features: ['1 capsule temporelle', '2 destinataires', 'Message texte uniquement', 'Livraison à date'],
  },
  PRO: {
    name: 'Héritage',
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    price: 9,
    capsules: 20,
    mediaPerCapsule: 10,
    recipients: 20,
    features: ['20 capsules', '10 médias/capsule (photos, vidéos)', '20 destinataires', 'Dead Man\'s Switch', 'Chiffrement', 'Rappels automatiques'],
  },
  ETERNAL: {
    name: 'Éternel',
    priceId: process.env.STRIPE_ETERNAL_PRICE_ID!,
    price: 19,
    capsules: Infinity,
    mediaPerCapsule: 50,
    recipients: Infinity,
    features: ['Capsules illimitées', '50 médias/capsule', 'Destinataires illimités', 'Tout Héritage inclus', 'Stockage prioritaire', 'Support dédié'],
  },
}

export async function createCheckoutSession(userId: string, email: string, priceId: string, plan: string) {
  let customerId: string | undefined

  const user = await import('./prisma').then(m => m.prisma.user.findUnique({ where: { id: userId } }))
  if (user?.stripeCustomerId) {
    customerId = user.stripeCustomerId
  } else {
    const customer = await stripe.customers.create({ email, metadata: { userId } })
    customerId = customer.id
    await import('./prisma').then(m => m.prisma.user.update({ where: { id: userId }, data: { stripeCustomerId: customerId } }))
  }

  return stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true&plan=${plan}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    metadata: { userId, plan },
    subscription_data: { metadata: { userId, plan } },
  })
}

export async function createPortalSession(stripeCustomerId: string) {
  return stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings`,
  })
}
