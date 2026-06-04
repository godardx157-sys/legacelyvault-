'use client'
import { useState } from 'react'
import { signOut } from 'next-auth/react'

export function DangerZone() {
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDelete = async () => {
    setLoading(true)
    setError('')

    const res = await fetch('/api/user/delete', { method: 'DELETE' })
    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Erreur lors de la suppression.')
      setLoading(false)
      return
    }

    await signOut({ callbackUrl: '/' })
  }

  return (
    <div className="space-y-4">
      {error && <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}
      {!confirming ? (
        <button
          onClick={() => setConfirming(true)}
          className="px-6 py-2.5 rounded-xl border border-red-300 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors"
        >
          Supprimer mon compte
        </button>
      ) : (
        <div className="p-4 rounded-xl border border-red-200 bg-red-50 space-y-3">
          <p className="text-red-700 text-sm font-medium">
            Cette action est irréversible. Toutes vos capsules et données seront supprimées définitivement.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-60"
            >
              {loading ? 'Suppression...' : 'Oui, supprimer définitivement'}
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="px-5 py-2 rounded-xl border border-vault-300 text-vault-600 text-sm hover:bg-vault-50 transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
