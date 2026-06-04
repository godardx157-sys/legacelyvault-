// app/(dashboard)/dashboard/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { ArrowRight, Clock, CheckCircle, Archive, AlertCircle } from 'lucide-react'
import { CheckInButton } from '@/components/capsule/CheckInButton'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)!
  const userId = session!.user.id

  const [capsules, dms] = await Promise.all([
    prisma.capsule.findMany({
      where: { userId },
      include: { recipients: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.deadManSwitch.findUnique({ where: { userId } }),
  ])

  const stats = {
    total: await prisma.capsule.count({ where: { userId } }),
    sealed: await prisma.capsule.count({ where: { userId, status: 'SEALED' } }),
    delivered: await prisma.capsule.count({ where: { userId, status: 'DELIVERED' } }),
  }

  const statusIcon = { DRAFT: '✏️', SEALED: '🔒', DELIVERED: '💌', FAILED: '❌' }
  const statusLabel = { DRAFT: 'Brouillon', SEALED: 'Scellée', DELIVERED: 'Livrée', FAILED: 'Échec' }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome */}
      <div>
        <h2 className="font-display text-3xl text-vault-800 mb-1">
          Bonjour, {session?.user?.name?.split(' ')[0] ?? 'ami'} 👋
        </h2>
        <p className="text-vault-500">Votre héritage numérique vous attend.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 md:gap-4">
        {[
          { label: 'Total', value: stats.total, icon: Archive },
          { label: 'Scellées', value: stats.sealed, icon: Clock },
          { label: 'Livrées', value: stats.delivered, icon: CheckCircle },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="paper-card rounded-xl p-4 md:p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-vault-500 text-xs md:text-sm">{label}</p>
              <Icon size={16} className="text-vault-400" />
            </div>
            <p className="font-display text-3xl md:text-4xl text-vault-900">{value}</p>
          </div>
        ))}
      </div>

      {/* Dead Man's Switch alert */}
      {dms && !dms.isTriggered && (
        <div className="paper-card rounded-xl p-5 border-l-4" style={{ borderLeftColor: 'var(--gold)' }}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="font-medium text-vault-800 flex items-center gap-2">
                <AlertCircle size={16} className="text-gold-500" />
                Dead Man's Switch actif
              </p>
              <p className="text-vault-500 text-sm mt-1">
                Dernier check-in : {formatDate(dms.lastCheckIn)} — confirmez votre présence régulièrement
              </p>
            </div>
            <CheckInButton />
          </div>
        </div>
      )}

      {/* Recent capsules */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl text-vault-800">Capsules récentes</h3>
          <Link href="/dashboard/capsules" className="text-gold-600 text-sm flex items-center gap-1 hover:underline">
            Voir tout <ArrowRight size={14} />
          </Link>
        </div>

        {capsules.length === 0 ? (
          <div className="paper-card rounded-xl p-12 text-center">
            <div className="text-5xl mb-4">🏺</div>
            <p className="font-display text-2xl text-vault-700 mb-2">Votre coffre est vide</p>
            <p className="text-vault-500 mb-6">Créez votre première capsule temporelle</p>
            <Link
              href="/dashboard/capsules/new"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all hover:opacity-90"
              style={{ background: 'var(--gold)' }}
            >
              Créer une capsule
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {capsules.map(c => (
              <Link key={c.id} href={`/dashboard/capsules/${c.id}`}
                className="paper-card rounded-xl p-5 flex items-center justify-between hover:shadow-md transition-shadow group block"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{statusIcon[c.status]}</span>
                  <div>
                    <p className="font-medium text-vault-800 group-hover:text-vault-900">{c.title}</p>
                    <p className="text-vault-400 text-sm">
                      {c.recipients.length} destinataire{c.recipients.length > 1 ? 's' : ''} •{' '}
                      {c.deliverAt ? `Livraison le ${formatDate(c.deliverAt)}` : 'Dead Man\'s Switch'}
                    </p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full border border-vault-200 text-vault-500">
                  {statusLabel[c.status]}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
