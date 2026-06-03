// components/layout/Sidebar.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { LayoutDashboard, Archive, Settings, CreditCard, LogOut, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Vue d\'ensemble' },
  { href: '/dashboard/capsules', icon: Archive, label: 'Mes capsules' },
  { href: '/dashboard/settings', icon: Settings, label: 'Paramètres' },
  { href: '/dashboard/billing', icon: CreditCard, label: 'Abonnement' },
]

interface Props {
  user: { name?: string | null; email?: string | null; image?: string | null; plan?: string }
}

export function Sidebar({ user }: Props) {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-vault-200" style={{ background: 'var(--bg-paper)' }}>
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-vault-200">
        <span className="text-2xl">🏺</span>
        <span className="font-display text-xl text-vault-800">LegacyVault</span>
      </div>

      {/* New capsule CTA */}
      <div className="px-4 py-4">
        <Link
          href="/dashboard/capsules/new"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90"
          style={{ background: 'var(--gold)' }}
        >
          <Plus size={16} />
          Nouvelle capsule
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {nav.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
              pathname === href
                ? 'text-vault-900 font-medium'
                : 'text-vault-500 hover:text-vault-700 hover:bg-vault-100/60'
            )}
            style={pathname === href ? { background: 'rgba(201,151,42,0.12)' } : {}}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-vault-200 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0" style={{ background: 'var(--gold)' }}>
            {user.name?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? '?'}
          </div>
          <div className="min-w-0">
            <p className="text-vault-800 text-sm truncate font-medium">{user.name ?? 'Utilisateur'}</p>
            <p className="text-vault-400 text-xs truncate">{user.plan ?? 'FREE'}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-vault-500 hover:text-vault-700 hover:bg-vault-100/60 text-sm transition-colors"
        >
          <LogOut size={16} />
          Déconnexion
        </button>
      </div>
    </aside>
  )
}
