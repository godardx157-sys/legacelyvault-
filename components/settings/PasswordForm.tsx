'use client'
import { useState } from 'react'

export function PasswordForm() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setError('')

    if (form.newPassword !== form.confirmPassword) {
      setError('Les nouveaux mots de passe ne correspondent pas.')
      return
    }

    setLoading(true)
    const res = await fetch('/api/user/password', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: form.currentPassword, newPassword: form.newPassword }),
    })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? 'Erreur lors du changement de mot de passe.')
    } else {
      setMessage('Mot de passe modifié avec succès.')
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">{message}</div>}
      {error && <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}
      <div>
        <label className="block text-vault-600 text-sm mb-1">Mot de passe actuel</label>
        <input
          type="password"
          value={form.currentPassword}
          onChange={e => setForm(f => ({ ...f, currentPassword: e.target.value }))}
          required
          className="w-full px-4 py-3 rounded-xl border border-vault-300 bg-white/60 text-vault-800 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 text-base transition"
        />
      </div>
      <div>
        <label className="block text-vault-600 text-sm mb-1">Nouveau mot de passe</label>
        <input
          type="password"
          value={form.newPassword}
          onChange={e => setForm(f => ({ ...f, newPassword: e.target.value }))}
          required
          minLength={8}
          placeholder="8 caractères minimum"
          className="w-full px-4 py-3 rounded-xl border border-vault-300 bg-white/60 text-vault-800 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 text-base transition"
        />
      </div>
      <div>
        <label className="block text-vault-600 text-sm mb-1">Confirmer le nouveau mot de passe</label>
        <input
          type="password"
          value={form.confirmPassword}
          onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
          required
          minLength={8}
          className="w-full px-4 py-3 rounded-xl border border-vault-300 bg-white/60 text-vault-800 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 text-base transition"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2.5 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90 disabled:opacity-60"
        style={{ background: 'var(--gold)' }}
      >
        {loading ? 'Modification...' : 'Changer le mot de passe'}
      </button>
    </form>
  )
}
