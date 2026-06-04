// app/(dashboard)/dashboard/settings/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { DeadManSwitchSettings } from '@/components/capsule/DeadManSwitchSettings'
import { ProfileForm } from '@/components/settings/ProfileForm'
import { PasswordForm } from '@/components/settings/PasswordForm'
import { DangerZone } from '@/components/settings/DangerZone'
import Link from 'next/link'

const PLAN_LABELS: Record<string, string> = {
  FREE: 'Gratuit',
  PRO: 'Pro',
  ETERNAL: 'Éternel',
}

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)!
  const [user, dms] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session!.user.id },
      select: { name: true, email: true, plan: true, password: true },
    }),
    prisma.deadManSwitch.findUnique({ where: { userId: session!.user.id } }),
  ])

  const isPro = (user?.plan ?? 'FREE') !== 'FREE'

  return (
    <div className="max-w-2xl mx-auto animate-fade-in space-y-6">

      {/* Profile */}
      <div className="paper-card rounded-2xl p-8">
        <h2 className="font-display text-2xl text-vault-800 mb-6">Profil</h2>
        <ProfileForm initialName={user?.name ?? ''} email={user?.email ?? ''} />
      </div>

      {/* Plan */}
      <div className="paper-card rounded-2xl p-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-display text-2xl text-vault-800">Abonnement</h2>
          <span className="px-3 py-1 rounded-full text-sm font-medium border"
            style={{
              background: isPro ? 'rgba(201,151,42,0.12)' : 'rgba(0,0,0,0.04)',
              borderColor: isPro ? 'rgba(201,151,42,0.4)' : 'rgba(0,0,0,0.1)',
              color: isPro ? 'var(--gold)' : '#6b7280',
            }}>
            {PLAN_LABELS[user?.plan ?? 'FREE']}
          </span>
        </div>
        <p className="text-vault-500 text-sm mb-5">
          {isPro
            ? 'Vous bénéficiez de toutes les fonctionnalités premium.'
            : 'Passez au plan Pro pour débloquer le Dead Man\'s Switch, les capsules illimitées et plus.'}
        </p>
        {!isPro && (
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90"
            style={{ background: 'var(--gold)' }}
          >
            Passer au Pro
          </Link>
        )}
      </div>

      {/* Dead Man's Switch */}
      <DeadManSwitchSettings dms={dms} isPro={isPro} />

      {/* Password (only for email/password accounts) */}
      {user?.password && (
        <div className="paper-card rounded-2xl p-8">
          <h2 className="font-display text-2xl text-vault-800 mb-6">Mot de passe</h2>
          <PasswordForm />
        </div>
      )}

      {/* Danger Zone */}
      <div className="paper-card rounded-2xl p-8 border border-red-100">
        <h2 className="font-display text-2xl text-red-700 mb-2">Zone de danger</h2>
        <p className="text-vault-500 text-sm mb-5">
          La suppression de votre compte est définitive et irréversible. Toutes vos capsules seront supprimées.
        </p>
        <DangerZone />
      </div>

    </div>
  )
}
