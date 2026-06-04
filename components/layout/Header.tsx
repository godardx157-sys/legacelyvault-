'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, Plus } from 'lucide-react'
import { MobileNav } from './MobileNav'

const titles: Record<string, string> = {
  '/dashboard': 'Vue d\'ensemble',
  '/dashboard/capsules': 'Mes capsules',
  '/dashboard/capsules/new': 'Nouvelle capsule',
  '/dashboard/settings': 'Paramètres',
  '/dashboard/billing': 'Abonnement',
}

interface Props {
  user: { name?: string | null; email?: string | null; plan?: string }
}

export function Header({ user }: Props) {
  const pathname = usePathname()
  const title = titles[pathname] ?? 'Dashboard'
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <>
      <header className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-vault-200" style={{ background: 'var(--bg-paper)' }}>
        <div className="flex items-center gap-3">
          {/* Hamburger — mobile only */}
          <button
            className="md:hidden text-vault-600 hover:text-vault-900 transition-colors"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu size={22} />
          </button>
          <h1 className="font-display text-xl md:text-2xl text-vault-800">{title}</h1>
        </div>
        <Link
          href="/dashboard/capsules/new"
          className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-white text-sm transition-all hover:opacity-90"
          style={{ background: 'var(--gold)' }}
        >
          <Plus size={15} />
          <span className="hidden sm:inline">Nouvelle capsule</span>
        </Link>
      </header>

      <MobileNav user={user} isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  )
}
