import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { DeadManSwitchSettings } from '@/components/capsule/DeadManSwitchSettings'
import { ProfileForm } from '@/components/settings/ProfileForm'
import { PasswordForm } from '@/components/settings/PasswordForm'
import { DangerZone } from '@/components/settings/DangerZone'
import Link from 'next/link'
import { CreditCard } from 'lucide-react'

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)
  const [user, dms] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session!.user.id },
      select: { name: true, email: true, plan: true, password: true },
    }),
    prisma.deadManSwitch.findUnique({ where: { userId: session!.user.id } }),
  ])

  const planLabel: Record<string, string> = {
    FREE: 'Souvenir (Gratuit)',
    PRO: 'Héritage — 9€/mois',
    ETERNAL: 'Éternel — 19€/mois',
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in space-y-6">
      <ProfileForm name={user?.name ?? ''} email={user?.email ?? ''} />

      <div className="paper-card rounded-2xl p-8">
        <h2 className="font-display text-2xl text-vault-800 mb-4 flex items-center gap-2">
          <CreditCard size={22} className="text-gold-500" /> Abonnement
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-vault-500 text-sm mb-1">Plan actuel</p>
            <p className="text-vault-800 font-medium text-lg">{planLabel[user?.plan ?? 'FREE']}</p>
          </div>
          {user?.plan === 'FREE' && (
            <Link href="/pricing" className="px-5 py-2 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90" style={{ background: 'var(--gold)' }}>
              Passer Pro
            </Link>
          )}
        </div>
      </div>

      <DeadManSwitchSettings dms={dms} isPro={(user?.plan ?? 'FREE') !== 'FREE'} />

      {user?.password && <PasswordForm />}

      <DangerZone />
    </div>
  )
}
