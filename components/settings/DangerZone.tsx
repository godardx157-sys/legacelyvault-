'use client'
import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { signOut } from 'next-auth/react'

export function DangerZone() {
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    await fetch('/api/user/delete', { method: 'DELETE' })
    await signOut({ callbackUrl: '/' })
  }

  return (
    <div className="paper-card rounded-2xl p-8 border border-red-200">
      <h2 className="font-display text-2xl text-red-700 mb-4 flex items-center gap-2">
        <Trash2 size={22} /> Zone dangereuse
      </h2>
      <p className="text-vault-500 text-sm mb-6">
        La suppression de votre compte est définitive. Toutes vos capsules et données seront effacées sans possibilité de récupération.
      </p>
      {!confirming ? (
        <button onClick={() => setConfirming(true)} className="px-6 py-3 rounded-xl text-red-600 border border-red-300 text-sm font-medium hover:bg-red-50 transition-all">
          Supprimer mon compte
        </button>
      ) : (
        <div className="space-y-3">
          <p className="text-red-600 text-sm font-medium">Êtes-vous sûr ? Cette action est irréversible.</p>
          <div className="flex gap-3">
            <button onClick={handleDelete} disabled={deleting} className="px-6 py-3 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-all disabled:opacity-50">
              {deleting ? 'Suppression...' : 'Confirmer'}
            </button>
            <button onClick={() => setConfirming(false)} className="px-6 py-3 rounded-xl text-vault-600 border border-vault-300 text-sm font-medium hover:bg-vault-50 transition-all">
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
