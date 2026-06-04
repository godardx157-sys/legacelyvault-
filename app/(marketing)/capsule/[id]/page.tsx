// app/(marketing)/capsule/[id]/page.tsx
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

export default async function CapsuleViewPage({ params }: { params: { id: string } }) {
  const capsule = await prisma.capsule.findUnique({
    where: { id: params.id },
    include: {
      user: { select: { name: true } },
      recipients: { select: { name: true, email: true } },
    },
  })

  if (!capsule || capsule.status !== 'DELIVERED') notFound()

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: 'var(--bg-paper)' }}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <span className="text-3xl">🏺</span>
            <span className="font-display text-2xl text-vault-800">LegacyVault</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-300 bg-gold-50 text-gold-700 text-sm mb-6">
            💌 Une capsule temporelle vous a été transmise
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-vault-900 mb-2">
            {capsule.title}
          </h1>
          <p className="text-vault-500 text-sm">
            De la part de <strong className="text-vault-700">{capsule.user.name ?? 'quelqu\'un qui tenait à vous'}</strong>
            {capsule.sentAt && ` · Envoyée le ${formatDate(capsule.sentAt)}`}
          </p>
        </div>

        {/* Message */}
        <div className="paper-card rounded-2xl p-6 md:p-10 mb-6">
          <div className="relative">
            <span className="font-display text-6xl text-gold-200 absolute -top-4 -left-2 leading-none select-none">"</span>
            <p className="text-vault-800 text-lg leading-relaxed whitespace-pre-wrap relative z-10 pt-4">
              {capsule.message}
            </p>
            <span className="font-display text-6xl text-gold-200 absolute -bottom-8 right-0 leading-none select-none">"</span>
          </div>
        </div>

        {/* Media */}
        {capsule.mediaUrls.length > 0 && (
          <div className="paper-card rounded-2xl p-6 mb-6">
            <p className="text-vault-600 text-sm font-medium mb-4">📎 {capsule.mediaUrls.length} média{capsule.mediaUrls.length > 1 ? 's' : ''} joint{capsule.mediaUrls.length > 1 ? 's' : ''}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {capsule.mediaUrls.map((url, i) =>
                url.match(/\.(jpg|jpeg|png|gif|webp)/i) ? (
                  <img
                    key={i}
                    src={url}
                    alt={`Média ${i + 1}`}
                    className="w-full rounded-xl object-cover max-h-80"
                  />
                ) : url.match(/\.(mp4|mov|webm)/i) ? (
                  <video key={i} controls className="w-full rounded-xl">
                    <source src={url} />
                  </video>
                ) : url.match(/\.(mp3|wav|ogg|m4a)/i) ? (
                  <audio key={i} controls className="w-full">
                    <source src={url} />
                  </audio>
                ) : (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl border border-vault-200 hover:bg-vault-50 transition-colors text-vault-600"
                  >
                    <span className="text-2xl">📄</span>
                    <span className="text-sm">Voir le fichier</span>
                  </a>
                )
              )}
            </div>
          </div>
        )}

        {/* Footer note */}
        <div className="text-center text-vault-400 text-sm mt-8 space-y-2">
          <p>Ce message vous a été transmis via LegacyVault.</p>
          <p>
            Vous souhaitez créer votre propre capsule ?{' '}
            <Link href="/register" className="text-gold-600 hover:underline">
              C'est gratuit →
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}
