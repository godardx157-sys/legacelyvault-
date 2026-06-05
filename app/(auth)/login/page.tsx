// app/(auth)/login/page.tsx
'use client'
import { Suspense, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

function AuthError() {
  const params = useSearchParams()
  if (!params.get('error')) return null
  return (
    <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
      Erreur de connexion. Vérifiez vos identifiants.
    </div>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
      rememberMe: rememberMe ? '1' : '0',
    })
    setLoading(false)
    if (res?.error) {
      setError('Email ou mot de passe incorrect.')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg-paper)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center mb-6">
            <Image src="/logo.svg" alt="LegacyVault" width={200} height={51} priority />
          </Link>
          <h1 className="font-display text-4xl text-vault-900 mb-2">Bon retour</h1>
          <p className="text-vault-500">Connectez-vous à votre coffre</p>
        </div>

        <div className="paper-card rounded-2xl p-8">
          <Suspense>
            <AuthError />
          </Suspense>
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
          )}

          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-vault-300 rounded-xl text-vault-700 hover:bg-vault-50 transition-colors mb-6 text-base"
          >
            <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/></svg>
            Continuer avec Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-vault-200" /></div>
            <div className="relative text-center"><span className="px-3 text-vault-400 text-sm" style={{ background: 'var(--bg-paper)' }}>ou</span></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-vault-700 text-sm mb-1">Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full px-4 py-3 rounded-xl border border-vault-300 bg-white/60 text-vault-800 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 text-base transition"
                placeholder="vous@exemple.com"
              />
            </div>
            <div>
              <label className="block text-vault-700 text-sm mb-1">Mot de passe</label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)} required
                className="w-full px-4 py-3 rounded-xl border border-vault-300 bg-white/60 text-vault-800 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 text-base transition"
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-all ${rememberMe ? 'border-gold-500' : 'border-vault-300 bg-white'}`}
                style={rememberMe ? { background: 'var(--gold)', borderColor: 'var(--gold)' } : {}}
                aria-label="Se souvenir de moi"
              >
                {rememberMe && (
                  <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                    <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
              <span
                className="text-vault-600 text-sm cursor-pointer select-none"
                onClick={() => setRememberMe(!rememberMe)}
              >
                Se souvenir de moi <span className="text-vault-400">(30 jours)</span>
              </span>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full py-3 rounded-xl text-white font-medium text-base transition-all hover:opacity-90 disabled:opacity-60"
              style={{ background: 'var(--gold)' }}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-vault-500">
          Pas encore de compte ?{' '}
          <Link href="/register" className="text-gold-600 hover:underline">S'inscrire gratuitement</Link>
        </p>
      </div>
    </div>
  )
}
