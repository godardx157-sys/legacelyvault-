// components/pricing/UpgradeButton.tsx
'use client'
import { useState } from 'react'

export function UpgradeButton({ plan }: { plan: string }) {
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    setLoading(true)
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan }),
    })
    const { url } = await res.json()
    if (url) window.location.href = url
    setLoading(false)
  }

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      className="mt-3 px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90 disabled:opacity-60"
      style={{ background: 'var(--gold)' }}
    >
      {loading ? 'Redirection...' : 'Choisir ce plan'}
    </button>
  )
}
