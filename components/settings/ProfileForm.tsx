'use client'
import { useState } from 'react'
import { User } from 'lucide-react'

export function ProfileForm({ name, email }: { name: string; email: string }) {
  const [currentName, setCurrentName] = useState(name)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    setSaving(true)
    setError('')
    const res = await fetch('/api/user/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: currentName }),
    })
    setSaving(false)
    if (res.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } else {
      const data = await res.json()
      setError(data.error ?? 'Erreur')
    }
  }

  return (
    <div className="paper-card rounded-2xl p-8">
      <h2 className="font-display text-2xl text-vault-800 mb-6 flex items-center gap-2">
        <User size={22} className="text-gold-500" /> Profil
      </h2>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      <div className="space-y-4">
        <div>
          <label className="block text-vault-600 text-sm mb-1">Nom complet</label>
          <input
            type="text"
            value={currentName}
            onChange={e => setCurrentName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-vault-300 bg-white/60 text-vault-800 focus:outline-none focus:border-gold-500 text-base transition"
          />
        </div>
        <div>
          <label className="block text-vault-600 text-sm mb-1">Email</label>
          <p className="px-4 py-3 rounded-xl border border-vault-200 bg-white/40 text-vault-600">{email}</p>
          <p className="text-vault-400 text-xs mt-1">L&apos;email ne peut pas être modifié.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || currentName.trim() === name.trim()}
          className="px-6 py-3 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90 disabled:opacity-50"
          style={{ background: 'var(--gold)' }}
        >
          {saved ? '✓ Sauvegardé' : saving ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>
    </div>
  )
}
