// components/capsule/NewCapsuleForm.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, Upload, Lock, Calendar, Zap } from 'lucide-react'

interface Recipient { name: string; email: string; relation: string }

interface Props { plan: string }

export function NewCapsuleForm({ plan }: Props) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [triggerType, setTriggerType] = useState<'SCHEDULED' | 'DEADMAN'>('SCHEDULED')
  const [deliverAt, setDeliverAt] = useState('')
  const [isEncrypted, setIsEncrypted] = useState(false)
  const [mediaUrls, setMediaUrls] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [recipients, setRecipients] = useState<Recipient[]>([{ name: '', email: '', relation: '' }])

  const canUpload = plan !== 'FREE'

  const addRecipient = () => setRecipients(r => [...r, { name: '', email: '', relation: '' }])
  const removeRecipient = (i: number) => setRecipients(r => r.filter((_, idx) => idx !== i))
  const updateRecipient = (i: number, field: keyof Recipient, val: string) =>
    setRecipients(r => r.map((rec, idx) => idx === i ? { ...rec, [field]: val } : rec))

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return
    setUploading(true)
    for (const file of Array.from(e.target.files)) {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      if (res.ok) {
        const { url } = await res.json()
        setMediaUrls(m => [...m, url])
      }
    }
    setUploading(false)
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    const validRecipients = recipients.filter(r => r.name && r.email)
    if (!title || !message || validRecipients.length === 0) {
      setError('Veuillez remplir tous les champs obligatoires.')
      setLoading(false)
      return
    }
    if (triggerType === 'SCHEDULED' && !deliverAt) {
      setError('Veuillez choisir une date de livraison.')
      setLoading(false)
      return
    }

    const res = await fetch('/api/capsules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title, message, mediaUrls, isEncrypted,
        triggerType,
        deliverAt: triggerType === 'SCHEDULED' ? new Date(deliverAt).toISOString() : null,
        recipients: validRecipients,
      }),
    })

    const data = await res.json()
    if (!res.ok) { setError(data.error ?? 'Erreur lors de la création.'); setLoading(false); return }
    router.push('/dashboard/capsules?created=1')
  }

  const inputCls = "w-full px-4 py-3 rounded-xl border border-vault-300 bg-white/60 text-vault-800 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 text-base transition"

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex gap-2">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex-1 h-1.5 rounded-full transition-all" style={{ background: s <= step ? 'var(--gold)' : '#d4bc9f' }} />
        ))}
      </div>
      <p className="text-vault-500 text-sm">Étape {step} sur 3</p>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
      )}

      {/* Step 1 — Message */}
      {step === 1 && (
        <div className="paper-card rounded-2xl p-8 space-y-6">
          <h3 className="font-display text-2xl text-vault-800">✍️ Votre message</h3>
          <div>
            <label className="block text-vault-700 text-sm mb-1">Titre de la capsule *</label>
            <input
              type="text" value={title} onChange={e => setTitle(e.target.value)}
              className={inputCls} placeholder="Ex: Pour ma fille le jour de ses 18 ans"
              maxLength={200}
            />
          </div>
          <div>
            <label className="block text-vault-700 text-sm mb-1">Votre message *</label>
            <textarea
              value={message} onChange={e => setMessage(e.target.value)} rows={10}
              className={`${inputCls} resize-none`}
              placeholder="Écrivez librement. Ce message sera figé dans le temps..."
            />
            <p className="text-right text-vault-400 text-xs mt-1">{message.length} / 50 000</p>
          </div>

          {/* Media upload */}
          <div>
            <label className="block text-vault-700 text-sm mb-2">Photos & Vidéos</label>
            {!canUpload ? (
              <div className="border-2 border-dashed border-vault-200 rounded-xl p-6 text-center">
                <Upload size={24} className="mx-auto text-vault-300 mb-2" />
                <p className="text-vault-400 text-sm">Disponible avec le plan Héritage</p>
                <a href="/pricing" className="text-gold-600 text-sm hover:underline">Passer au plan payant</a>
              </div>
            ) : (
              <div>
                <label className="flex items-center justify-center gap-2 border-2 border-dashed border-vault-300 rounded-xl p-6 cursor-pointer hover:border-gold-400 transition-colors">
                  <Upload size={20} className="text-vault-400" />
                  <span className="text-vault-500 text-sm">{uploading ? 'Upload en cours...' : 'Cliquez pour ajouter des médias'}</span>
                  <input type="file" multiple accept="image/*,video/*,audio/*,.pdf" className="hidden" onChange={handleUpload} />
                </label>
                {mediaUrls.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                    {mediaUrls.map((url, i) => (
                      <div key={i} className="relative group">
                        {url.match(/\.(jpg|jpeg|png|gif|webp)/i)
                          ? <img src={url} alt="" className="w-full h-20 object-cover rounded-lg" />
                          : <div className="w-full h-20 bg-vault-100 rounded-lg flex items-center justify-center text-xs text-vault-500">📎 Fichier</div>
                        }
                        <button onClick={() => setMediaUrls(m => m.filter((_, j) => j !== i))}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full hidden group-hover:flex items-center justify-center text-xs"
                        >×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <button onClick={() => setStep(2)} disabled={!title || !message}
            className="w-full py-3 rounded-xl text-white font-medium transition-all hover:opacity-90 disabled:opacity-40"
            style={{ background: 'var(--gold)' }}
          >
            Continuer →
          </button>
        </div>
      )}

      {/* Step 2 — Destinataires */}
      {step === 2 && (
        <div className="paper-card rounded-2xl p-8 space-y-6">
          <h3 className="font-display text-2xl text-vault-800">👥 Destinataires</h3>
          <p className="text-vault-500 text-sm">Qui recevra cette capsule ?</p>

          <div className="space-y-4">
            {recipients.map((r, i) => (
              <div key={i} className="p-4 border border-vault-200 rounded-xl space-y-3 relative" style={{ background: 'white' }}>
                {recipients.length > 1 && (
                  <button onClick={() => removeRecipient(i)} className="absolute top-3 right-3 text-vault-300 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-vault-600 text-xs mb-1">Prénom & Nom *</label>
                    <input
                      type="text" value={r.name} onChange={e => updateRecipient(i, 'name', e.target.value)}
                      className={inputCls} placeholder="Marie Dupont"
                    />
                  </div>
                  <div>
                    <label className="block text-vault-600 text-xs mb-1">Relation</label>
                    <input
                      type="text" value={r.relation} onChange={e => updateRecipient(i, 'relation', e.target.value)}
                      className={inputCls} placeholder="Ma fille, Mon ami..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-vault-600 text-xs mb-1">Email *</label>
                  <input
                    type="email" value={r.email} onChange={e => updateRecipient(i, 'email', e.target.value)}
                    className={inputCls} placeholder="destinataire@exemple.com"
                  />
                </div>
              </div>
            ))}
          </div>

          <button onClick={addRecipient} className="flex items-center gap-2 text-gold-600 text-sm hover:underline">
            <Plus size={15} /> Ajouter un destinataire
          </button>

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border border-vault-300 text-vault-600 hover:bg-vault-50 transition-colors">
              ← Retour
            </button>
            <button onClick={() => setStep(3)} disabled={recipients.filter(r => r.name && r.email).length === 0}
              className="flex-1 py-3 rounded-xl text-white font-medium transition-all hover:opacity-90 disabled:opacity-40"
              style={{ background: 'var(--gold)' }}
            >
              Continuer →
            </button>
          </div>
        </div>
      )}

      {/* Step 3 — Trigger */}
      {step === 3 && (
        <div className="paper-card rounded-2xl p-8 space-y-6">
          <h3 className="font-display text-2xl text-vault-800">⚙️ Déclencheur</h3>
          <p className="text-vault-500 text-sm">Quand votre capsule sera-t-elle envoyée ?</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setTriggerType('SCHEDULED')}
              className={`p-5 rounded-xl border-2 text-left transition-all ${triggerType === 'SCHEDULED' ? 'border-gold-500 bg-gold-50' : 'border-vault-200 hover:border-vault-300'}`}
            >
              <Calendar size={24} className="mb-2 text-gold-600" />
              <p className="font-medium text-vault-800">Date précise</p>
              <p className="text-vault-500 text-xs mt-1">Livraison automatique à la date choisie</p>
            </button>
            <button
              onClick={() => { if (plan === 'FREE') return; setTriggerType('DEADMAN') }}
              className={`p-5 rounded-xl border-2 text-left transition-all relative ${triggerType === 'DEADMAN' ? 'border-gold-500 bg-gold-50' : 'border-vault-200 hover:border-vault-300'} ${plan === 'FREE' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {plan === 'FREE' && <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full bg-gold-100 text-gold-700 border border-gold-200">Pro</span>}
              <Zap size={24} className="mb-2 text-gold-600" />
              <p className="font-medium text-vault-800">Dead Man's Switch</p>
              <p className="text-vault-500 text-xs mt-1">Envoi si vous ne vous reconnectez plus</p>
            </button>
          </div>

          {triggerType === 'SCHEDULED' && (
            <div>
              <label className="block text-vault-700 text-sm mb-1">Date & heure de livraison *</label>
              <input
                type="datetime-local" value={deliverAt} onChange={e => setDeliverAt(e.target.value)}
                min={new Date(Date.now() + 86400000).toISOString().slice(0, 16)}
                className={inputCls}
              />
            </div>
          )}

          {/* Encryption */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-vault-200" style={{ background: 'white' }}>
            <div className="flex items-center gap-3">
              <Lock size={18} className="text-vault-500" />
              <div>
                <p className="text-vault-800 text-sm font-medium">Chiffrer la capsule</p>
                <p className="text-vault-400 text-xs">Protection supplémentaire du contenu</p>
              </div>
            </div>
            <button
              onClick={() => setIsEncrypted(!isEncrypted)}
              className={`w-12 h-6 rounded-full transition-all relative ${isEncrypted ? 'bg-gold-500' : 'bg-vault-200'}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${isEncrypted ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl border border-vault-300 text-vault-600 hover:bg-vault-50 transition-colors">
              ← Retour
            </button>
            <button
              onClick={handleSubmit} disabled={loading}
              className="flex-1 py-3 rounded-xl text-white font-medium transition-all hover:opacity-90 disabled:opacity-60"
              style={{ background: 'var(--gold)' }}
            >
              {loading ? 'Scellement...' : '🔒 Sceller la capsule'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
