// app/(dashboard)/dashboard/capsules/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { Plus } from 'lucide-react'

export default async function CapsulesPage() {
  const session = await getServerSession(authOptions)!
  const capsules = await prisma.capsule.findMany({
    where: { userId: session!.user.id },
    include: { recipients: true },
    orderBy: { createdAt: 'desc' },
  })

  const statusConfig = {
    DRAFT:     { label: 'Brouillon', emoji: '✏️', cls: 'status-draft' },
    SEALED:    { label: 'Scellée',   emoji: '🔒', cls: 'status-sealed' },
    DELIVERED: { label: 'Livrée',    emoji: '💌', cls: 'status-delivered' },
    FAILED:    { label: 'Échec',     emoji: '❌', cls: 'status-failed' },
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <p className="text-vault-500">{capsules.length} capsule{capsules.length !== 1 ? 's' : ''}</p>
        <Link
          href="/dashboard/capsules/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm transition-all hover:opacity-90"
          style={{ background: 'var(--gold)' }}
        >
          <Plus size={16} /> Nouvelle capsule
        </Link>
      </div>

      {capsules.length === 0 ? (
        <div className="letter-card rounded-sm p-16 text-center">
          <div className="text-6xl mb-4">🏺</div>
          <p className="font-display text-2xl text-vault-700 mb-2">Aucune capsule encore</p>
          <p className="text-vault-500 mb-8">Commencez à préserver vos souvenirs et messages pour l'avenir.</p>
          <Link href="/dashboard/capsules/new" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-white transition-all hover:opacity-90" style={{ background: 'var(--gold)' }}>
            <Plus size={18} /> Créer ma première capsule
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {capsules.map(c => {
            const sc = statusConfig[c.status]
            return (
              <Link
                key={c.id}
                href={`/dashboard/capsules/${c.id}`}
                className="letter-card rounded-sm p-6 flex items-start justify-between hover:shadow-lg transition-shadow group block"
              >
                <div className="flex gap-4">
                  <span className="text-3xl mt-0.5">{sc.emoji}</span>
                  <div>
                    <h3 className="font-display text-xl italic text-vault-800 group-hover:text-vault-900 mb-1">{c.title}</h3>
                    <p className="text-vault-500 text-sm line-clamp-1 mb-3 font-body">{c.message.slice(0, 100)}...</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="tag">👥 {c.recipients.length} destinataire{c.recipients.length > 1 ? 's' : ''}</span>
                      <span className="tag">
                        {c.triggerType === 'DEADMAN' ? '⚙️ Dead Man\'s Switch' : `📅 ${c.deliverAt ? formatDate(c.deliverAt) : 'Date non définie'}`}
                      </span>
                      {c.mediaUrls.length > 0 && (
                        <span className="tag">📎 {c.mediaUrls.length} média{c.mediaUrls.length > 1 ? 's' : ''}</span>
                      )}
                    </div>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1 rounded border flex-shrink-0 ${sc.cls}`}>
                  {sc.label}
                </span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
