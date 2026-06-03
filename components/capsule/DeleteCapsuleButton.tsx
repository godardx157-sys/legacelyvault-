// components/capsule/DeleteCapsuleButton.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

export function DeleteCapsuleButton({ capsuleId }: { capsuleId: string }) {
  const router = useRouter()
  const [confirm, setConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    await fetch(`/api/capsules/${capsuleId}`, { method: 'DELETE' })
    router.push('/dashboard/capsules')
  }

  if (confirm) {
    return (
      <div className="flex items-center gap-3">
        <p className="text-vault-600 text-sm">Confirmer la suppression ?</p>
        <button onClick={handleDelete} disabled={loading}
          className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 transition-colors disabled:opacity-60"
        >
          {loading ? '...' : 'Supprimer'}
        </button>
        <button onClick={() => setConfirm(false)} className="px-4 py-2 rounded-lg border border-vault-300 text-vault-600 text-sm hover:bg-vault-50 transition-colors">
          Annuler
        </button>
      </div>
    )
  }

  return (
    <button onClick={() => setConfirm(true)}
      className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm transition-colors"
    >
      <Trash2 size={16} /> Supprimer cette capsule
    </button>
  )
}
