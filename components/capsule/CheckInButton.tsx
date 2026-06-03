// components/capsule/CheckInButton.tsx
'use client'
import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

export function CheckInButton() {
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleCheckIn = async () => {
    setLoading(true)
    await fetch('/api/checkin', { method: 'POST' })
    setLoading(false)
    setDone(true)
  }

  if (done) {
    return (
      <span className="flex items-center gap-2 text-green-700 text-sm">
        <CheckCircle size={16} /> Présence confirmée !
      </span>
    )
  }

  return (
    <button
      onClick={handleCheckIn}
      disabled={loading}
      className="px-4 py-2 rounded-lg text-white text-sm transition-all hover:opacity-90 disabled:opacity-60"
      style={{ background: 'var(--gold)' }}
    >
      {loading ? 'En cours...' : '✓ Je suis là'}
    </button>
  )
}
