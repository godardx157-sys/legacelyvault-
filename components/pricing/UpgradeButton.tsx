// components/pricing/UpgradeButton.tsx
'use client'
import { useState } from 'react'

export function UpgradeButton({ plan }: { plan: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleUpgrade = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Erreur lors de la redirection.')
        setLoading(false)
        return
      }
      if (data.url) {
        window.location.href = data.url
      } else {
        setError('URL de paiement introuvable.')
        setLoading(false)
      }
    } catch {
      setError('Erreur réseau, réessayez.')
      setLoading(false)
    }
  }

  return (
    <div className="mt-3">
      {error && <p className="text-red-600 text-xs mb-2">{error}</p>}
      <button
        onClick={handleUpgrade}
        disabled={loading}
        className="px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90 disabled:opacity-60"
        style={{ background: 'var(--gold)' }}
      >
        {loading ? 'Redirection...' : 'Choisir ce plan'}
      </button>
    </div>
  )
}
