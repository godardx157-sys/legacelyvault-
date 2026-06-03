// components/capsule/DeadManSwitchSettings.tsx
'use client'
import { useState } from 'react'
import { Zap } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface DMSData {
  intervalDays: number
  lastCheckIn: Date
  warningsSent: number
  isTriggered: boolean
}

interface Props {
  dms: DMSData | null
  userId: string
  isPro: boolean
}

export function DeadManSwitchSettings({ dms, isPro }: Props) {
  const [interval, setInterval] = useState(dms?.intervalDays ?? 180)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await fetch('/api/checkin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ intervalDays: interval }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className={`paper-card rounded-2xl p-8 ${!isPro ? 'opacity-60' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-2xl text-vault-800 flex items-center gap-2">
          <Zap size={22} className="text-gold-500" /> Dead Man's Switch
        </h2>
        {!isPro && <span className="text-xs px-2 py-1 rounded-full bg-gold-100 text-gold-700 border border-gold-200">Plan Pro requis</span>}
      </div>

      <p className="text-vault-500 text-sm mb-6">
        Si vous ne vous connectez pas pendant la durée choisie, vos capsules "Dead Man's Switch" seront automatiquement envoyées.
      </p>

      {dms && (
        <div className="p-4 rounded-xl border border-vault-200 bg-white/40 mb-4 text-sm">
          <p className="text-vault-600">Dernier check-in : <span className="text-vault-800 font-medium">{formatDate(dms.lastCheckIn)}</span></p>
          <p className="text-vault-600 mt-1">Statut : <span className={`font-medium ${dms.isTriggered ? 'text-red-600' : 'text-green-700'}`}>{dms.isTriggered ? 'Déclenché' : 'Actif'}</span></p>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-vault-700 text-sm mb-2">Délai avant déclenchement</label>
        <select
          value={interval}
          onChange={e => setInterval(Number(e.target.value))}
          disabled={!isPro}
          className="w-full px-4 py-3 rounded-xl border border-vault-300 bg-white/60 text-vault-800 focus:outline-none focus:border-gold-500 text-base"
        >
          <option value={90}>3 mois</option>
          <option value={180}>6 mois</option>
          <option value={365}>1 an</option>
          <option value={730}>2 ans</option>
        </select>
      </div>

      <button
        onClick={handleSave}
        disabled={!isPro || saving}
        className="px-6 py-3 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90 disabled:opacity-50"
        style={{ background: 'var(--gold)' }}
      >
        {saved ? '✓ Sauvegardé' : saving ? 'Sauvegarde...' : 'Sauvegarder'}
      </button>
    </div>
  )
}
