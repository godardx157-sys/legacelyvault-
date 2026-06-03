// app/(dashboard)/dashboard/billing/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { PLANS } from '@/lib/stripe'
import { UpgradeButton } from '@/components/pricing/UpgradeButton'
import { ManageSubscriptionButton } from '@/components/pricing/ManageSubscriptionButton'

export default async function BillingPage() {
  const session = await getServerSession(authOptions)!
  const user = await prisma.user.findUnique({ where: { id: session!.user.id } })
  const currentPlan = (user?.plan ?? 'FREE') as keyof typeof PLANS
  const planConfig = PLANS[currentPlan]

  return (
    <div className="max-w-2xl mx-auto animate-fade-in space-y-8">
      {/* Current plan */}
      <div className="paper-card rounded-2xl p-8">
        <h2 className="font-display text-2xl text-vault-800 mb-6">Votre abonnement</h2>
        <div className="flex items-center justify-between p-5 rounded-xl border-2 border-gold-300 bg-gold-50 mb-6">
          <div>
            <p className="text-vault-400 text-xs mb-1">Plan actuel</p>
            <p className="font-display text-2xl text-vault-900">{planConfig.name}</p>
            {currentPlan !== 'FREE' && user?.stripeCurrentPeriodEnd && (
              <p className="text-vault-500 text-sm mt-1">Renouvellement le {formatDate(user.stripeCurrentPeriodEnd)}</p>
            )}
          </div>
          <div className="text-right">
            <p className="font-display text-3xl text-vault-900">{planConfig.price}€</p>
            {currentPlan !== 'FREE' && <p className="text-vault-400 text-xs">/mois</p>}
          </div>
        </div>

        {/* Limits */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Capsules', value: planConfig.capsules === Infinity ? '∞' : planConfig.capsules },
            { label: 'Médias/capsule', value: planConfig.mediaPerCapsule === 0 ? 'Aucun' : planConfig.mediaPerCapsule },
            { label: 'Destinataires', value: planConfig.recipients === Infinity ? '∞' : planConfig.recipients },
          ].map(s => (
            <div key={s.label} className="p-3 rounded-xl border border-vault-200 text-center">
              <p className="font-display text-2xl text-vault-800">{s.value}</p>
              <p className="text-vault-400 text-xs">{s.label}</p>
            </div>
          ))}
        </div>

        {user?.stripeCustomerId
          ? <ManageSubscriptionButton />
          : currentPlan === 'FREE' && (
            <p className="text-vault-500 text-sm text-center">Passez à un plan payant pour débloquer toutes les fonctionnalités.</p>
          )
        }
      </div>

      {/* Upgrade options */}
      {currentPlan === 'FREE' && (
        <div className="space-y-4">
          <h3 className="font-display text-xl text-vault-800">Passer à un plan supérieur</h3>
          {(['PRO', 'ETERNAL'] as const).map(planKey => {
            const p = PLANS[planKey]
            return (
              <div key={planKey} className={`paper-card rounded-2xl p-6 ${planKey === 'PRO' ? 'border-2 border-gold-300' : ''}`}>
                {planKey === 'PRO' && <span className="text-xs px-2 py-0.5 rounded-full bg-gold-100 text-gold-700 border border-gold-200 mb-3 inline-block">Recommandé</span>}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-display text-xl text-vault-800">{p.name}</h4>
                    <ul className="space-y-1 mt-2">
                      {p.features.map(f => (
                        <li key={f} className="text-vault-600 text-sm flex items-center gap-2">
                          <span className="text-gold-500">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-right flex-shrink-0 ml-6">
                    <p className="font-display text-3xl text-vault-900">{p.price}€<span className="text-vault-400 text-base">/mois</span></p>
                    <UpgradeButton plan={planKey} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
