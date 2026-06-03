// components/pricing/ManageSubscriptionButton.tsx
'use client'
import { useState } from 'react'

export function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false)

  const handlePortal = async () => {
    setLoading(true)
    const res = await fetch('/api/stripe/portal', { method: 'POST' })
    const { url } = await res.json()
    if (url) window.location.href = url
    setLoading(false)
  }

  return (
    <button
      onClick={handlePortal}
      disabled={loading}
      className="w-full py-3 rounded-xl border border-vault-300 text-vault-700 hover:bg-vault-50 transition-colors text-sm"
    >
      {loading ? 'Redirection...' : 'Gérer mon abonnement'}
    </button>
  )
}
