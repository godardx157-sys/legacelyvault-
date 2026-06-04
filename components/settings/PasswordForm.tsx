'use client'
import { useState } from 'react'
import { Lock } from 'lucide-react'

export function PasswordForm() {
  const [form, setForm] = useState({ current: '', next: '', confirm: '' })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    if (form.next !== form.confirm) { setError('Les mots de passe ne correspondent pas'); return }
    if (form.next.length < 8) { setError('8 caractères minimum'); return }
    setSaving(true)
    setError('')
    const res = await fetch('/api/user/password', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: form.current, newPassword: form.next }),
    })
    setSaving(false)
    if (res.ok) {
      setSaved(true)
      setForm({ current: '', next: '', confirm: '' })
      setTimeout(() => setSaved(false), 2000)
    } else {
      const data = await res.json()
      setError(data.error ?? 'Erreur')
    }
  }

  return (
    <div className="paper-card rounded-2xl p-8">
      <h2 className="font-display text-2xl text-vault-800 mb-6 flex items-center gap-2">
        <Lock size={22} className="text-gold-500" /> Mot de passe
      </h2>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      <div className="space-y-4">
        {[{ label: 'Mot de passe actuel', key: 'current' }, { label: 'Nouveau mot de passe', key: 'next', placeholder: '8 caractères minimum' }, { label: 'Confirmer', key: 'confirm' }].map(f => (
          <div key={f.key}>
            <label className="block text-vault-600 text-sm mb-1">{f.label}</label>
            <input
              type="password"
              value={form[f.key as keyof typeof form]}
              onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
              placeholder={f.placeholder}
              className="w-full px-4 py-3 rounded-xl border border-vault-300 bg-white/60 text-vault-800 focus:outline-none focus:border-gold-500 text-base transition"
            />
          </div>
        ))}
        <button
          onClick={handleSave}
          disabled={saving || !form.current || !form.next}
          className="px-6 py-3 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90 disabled:opacity-50"
          style={{ background: 'var(--gold)' }}
        >
          {saved ? '✓ Modifié' : saving ? 'Sauvegarde...' : 'Modifier le mot de passe'}
        </button>
      </div>
    </div>
  )
}
