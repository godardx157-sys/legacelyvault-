// components/layout/Header.tsx
'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, Plus } from 'lucide-react'

const titles: Record<string, string> = {
  '/dashboard': 'Vue d\'ensemble',
  '/dashboard/capsules': 'Mes capsules',
  '/dashboard/capsules/new': 'Nouvelle capsule',
  '/dashboard/settings': 'Paramètres',
  '/dashboard/billing': 'Abonnement',
}

interface Props {
  user: { name?: string | null; email?: string | null }
}

export function Header({ user }: Props) {
  const pathname = usePathname()
  const title = titles[pathname] ?? 'Dashboard'

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-vault-200" style={{ background: 'var(--bg-paper)' }}>
      <h1 className="font-display text-2xl text-vault-800">{title}</h1>
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/capsules/new"
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm transition-all hover:opacity-90"
          style={{ background: 'var(--gold)' }}
        >
          <Plus size={15} />
          Nouvelle capsule
        </Link>
      </div>
    </header>
  )
}
