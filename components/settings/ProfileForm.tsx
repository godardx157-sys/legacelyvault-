'use client'
import { useState } from 'react'

interface Props {
  initialName: string
  email: string
}

export function ProfileForm({ initialName, email }: Props) {
  const [name, setName] = useState(initialName)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    const res = await fetch('/api/user/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? 'Erreur lors de la mise à jour.')
    } else {
      setMessage('Nom mis à jour avec succès.')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">{message}</div>}
      {error && <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}
      <div>
        <label className="block text-vault-600 text-sm mb-1">Nom complet</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          minLength={2}
          className="w-full px-4 py-3 rounded-xl border border-vault-300 bg-white/60 text-vault-800 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 text-base transition"
        />
      </div>
      <div>
        <label className="block text-vault-600 text-sm mb-1">Email</label>
        <p className="px-4 py-3 rounded-xl border border-vault-200 bg-white/40 text-vault-500 text-base">{email}</p>
        <p className="text-xs text-vault-400 mt-1">L'adresse email ne peut pas être modifiée.</p>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2.5 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90 disabled:opacity-60"
        style={{ background: 'var(--gold)' }}
      >
        {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
      </button>
    </form>
  )
}
