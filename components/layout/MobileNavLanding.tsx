'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export function MobileNavLanding() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="md:hidden text-vault-600 hover:text-vault-900 transition-colors"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
      >
        <Menu size={24} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-64 flex flex-col shadow-2xl" style={{ background: 'var(--bg-paper)' }}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-vault-200">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏺</span>
                <span className="font-display text-xl text-vault-800">LegacyVault</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-vault-400 hover:text-vault-700">
                <X size={22} />
              </button>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
              <Link href="/pricing" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg text-vault-700 hover:bg-vault-100 transition-colors text-base">Tarifs</Link>
              <Link href="/login" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg text-vault-700 hover:bg-vault-100 transition-colors text-base">Connexion</Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl text-white text-center text-base font-medium mt-4 transition-all hover:opacity-90"
                style={{ background: 'var(--gold)' }}
              >
                Commencer gratuitement
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
