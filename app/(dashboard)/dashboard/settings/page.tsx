// app/(dashboard)/dashboard/settings/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { DeadManSwitchSettings } from '@/components/capsule/DeadManSwitchSettings'

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)!
  const [user, dms] = await Promise.all([
    prisma.user.findUnique({ where: { id: session!.user.id }, select: { name: true, email: true, plan: true } }),
    prisma.deadManSwitch.findUnique({ where: { userId: session!.user.id } }),
  ])

  return (
    <div className="max-w-2xl mx-auto animate-fade-in space-y-6">
      {/* Profile */}
      <div className="paper-card rounded-2xl p-8">
        <h2 className="font-display text-2xl text-vault-800 mb-6">Profil</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-vault-600 text-sm mb-1">Nom</label>
            <p className="px-4 py-3 rounded-xl border border-vault-200 bg-white/40 text-vault-800">{user?.name ?? '—'}</p>
          </div>
          <div>
            <label className="block text-vault-600 text-sm mb-1">Email</label>
            <p className="px-4 py-3 rounded-xl border border-vault-200 bg-white/40 text-vault-800">{user?.email}</p>
          </div>
          <div>
            <label className="block text-vault-600 text-sm mb-1">Plan</label>
            <p className="px-4 py-3 rounded-xl border border-vault-200 bg-white/40 text-vault-800">{user?.plan}</p>
          </div>
        </div>
      </div>

      {/* Dead Man's Switch */}
      <DeadManSwitchSettings
        dms={dms}
        userId={session!.user.id}
        isPro={(user?.plan ?? 'FREE') !== 'FREE'}
      />
    </div>
  )
}
