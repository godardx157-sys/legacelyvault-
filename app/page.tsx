// app/page.tsx
import Link from 'next/link'
import { ArrowRight, Clock, Shield, Heart, Users, Lock, Zap } from 'lucide-react'
import { MobileNavLanding } from '@/components/layout/MobileNavLanding'

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-paper)' }}>

      {/* ── Navigation ─────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 border-b border-vault-200/60 backdrop-blur-sm" style={{ background: 'rgba(247,242,233,0.92)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-2xl">🏺</span>
            <span className="font-display text-xl text-vault-800 italic">LegacyVault</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/pricing" className="text-vault-600 hover:text-vault-800 transition-colors text-base">Tarifs</Link>
            <Link href="/login" className="text-vault-600 hover:text-vault-800 transition-colors text-base">Connexion</Link>
            <Link href="/register" className="px-5 py-2 rounded text-white text-base transition-all hover:opacity-90 wax-seal font-display italic" style={{ background: 'var(--gold)' }}>
              Commencer
            </Link>
          </div>
          <MobileNavLanding />
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="pt-36 pb-20 px-6 text-center relative overflow-hidden">
        {/* Faint lines like writing paper */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #cdb99a22 31px, #cdb99a22 32px)',
          backgroundPosition: '0 64px',
        }} />

        <div className="max-w-4xl mx-auto relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-400/40 text-gold-600 text-sm mb-10" style={{ background: 'rgba(184,134,31,0.07)' }}>
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
            <span className="font-body italic">Plus de 10 000 capsules scellées</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl leading-none text-vault-900 mb-6">
            Des mots pour<br />
            <span className="shimmer-text italic">l'éternité</span>
          </h1>

          <p className="text-xl text-vault-600 max-w-2xl mx-auto mb-4 font-body leading-relaxed">
            Rédigez des lettres, assemblez vos souvenirs. LegacyVault les scelle et les remet
            à vos proches — au moment choisi, ou quand le temps sera venu.
          </p>
          <p className="text-vault-400 italic text-base mb-10">Comme si vous leur aviez écrit hier.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="inline-flex items-center gap-2 px-8 py-4 rounded text-white text-lg font-display italic transition-all hover:opacity-90 hover:scale-105" style={{ background: 'var(--gold)' }}>
              Écrire ma première capsule
              <ArrowRight size={20} />
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 px-8 py-4 rounded text-vault-700 text-lg border border-vault-300 hover:border-vault-400 transition-all font-body">
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>

      {/* ── Letter preview ──────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="letter-card rounded-sm p-8 md:p-12 relative">
            {/* Postmark */}
            <div className="absolute top-6 right-6 postmark text-vault-400 text-center" style={{ fontSize: '0.6rem' }}>
              <div>LegacyVault</div>
              <div>2024</div>
              <div>SCELLÉE</div>
            </div>

            {/* Stamp */}
            <div className="absolute top-6 right-24 opacity-70">
              <div className="stamp" style={{ width: 52, height: 64 }}>
                <div className="stamp-inner h-full flex flex-col items-center justify-center text-center" style={{ margin: 6, padding: 4 }}>
                  <span style={{ fontSize: 18 }}>🏺</span>
                  <span style={{ fontSize: 7, fontFamily: 'var(--font-mono)', color: '#6e4928', marginTop: 2 }}>LEGACY</span>
                </div>
              </div>
            </div>

            <p className="font-mono text-vault-400 text-xs mb-1 tracking-widest uppercase">Capsule scellée — 15 mars 2024</p>
            <hr className="ink-rule" />

            <h3 className="font-display text-2xl md:text-3xl text-vault-800 italic mb-1">Pour ma fille, le jour de ses 18 ans</h3>
            <p className="text-vault-500 text-sm mb-6 font-mono">À remettre le <strong className="text-vault-700">15 mars 2036</strong> · Destinataire : Emma</p>

            <div className="rounded-sm p-6 border border-vault-200 relative" style={{ background: 'rgba(255,255,255,0.5)' }}>
              <span className="font-display text-5xl text-gold-300 absolute -top-3 left-3 leading-none select-none">"</span>
              <p className="text-vault-700 italic leading-relaxed font-body pl-4">
                Ma chérie, quand tu liras ces mots, tu auras 18 ans et moi... qui sait.
                Voici tout ce que je voudrais que tu saches sur ce qui compte vraiment dans la vie...
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="tag">📷 3 photos</span>
              <span className="tag">🎵 1 audio</span>
              <span className="px-3 py-1 rounded text-xs border status-sealed">🔒 Scellée & Chiffrée</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Comment ça fonctionne ───────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl text-center text-vault-900 mb-3 italic">Comment ça fonctionne</h2>
          <p className="text-center text-vault-500 mb-16 text-lg font-body italic">Simple comme écrire une lettre. Puissant comme l'éternité.</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '✍️', step: '01', title: 'Rédigez', desc: 'Écrivez votre message comme une lettre. Ajoutez des photos, des vidéos, des fichiers audio. Tout ce qui vous représente.' },
              { icon: '🔒', step: '02', title: 'Scellez', desc: 'Chiffrez votre capsule. Choisissez une date précise ou activez le Dead Man\'s Switch — livraison si vous cessez de vous connecter.' },
              { icon: '💌', step: '03', title: 'Traversez le temps', desc: 'Vos proches reçoivent une belle lettre au bon moment. Votre voix, vos mots, vos souvenirs — intacts.' },
            ].map(f => (
              <div key={f.step} className="letter-card rounded-sm p-8 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{f.icon}</div>
                <p className="text-gold-600 font-mono text-xs mb-2 tracking-widest">{f.step}</p>
                <h3 className="font-display text-2xl text-vault-800 italic mb-3">{f.title}</h3>
                <p className="text-vault-600 leading-relaxed font-body">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dead Man's Switch ────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: 'var(--bg-aged)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-6">⚙️</div>
          <h2 className="font-display text-4xl md:text-5xl text-vault-900 mb-4 italic">Dead Man's Switch</h2>
          <p className="text-vault-600 text-xl mb-12 leading-relaxed font-body max-w-2xl mx-auto">
            Si vous ne vous connectez plus pendant la durée que vous choisissez,
            vos capsules sont automatiquement remises à vos proches.
            <em className="block mt-2 text-vault-500 text-lg">Aucune intervention requise.</em>
          </p>

          <div className="grid sm:grid-cols-3 gap-6 text-left relative">
            {/* Connecting line */}
            <div className="hidden sm:block absolute top-8 left-1/4 right-1/4 h-px" style={{ background: 'linear-gradient(90deg, transparent, #cdb99a, #cdb99a, transparent)' }} />
            {[
              { t: 'J − 30', d: 'Premier rappel par email', icon: '📬' },
              { t: 'J − 7',  d: 'Trois rappels urgents', icon: '⚠️' },
              { t: 'J − 0',  d: 'Livraison automatique', icon: '💌' },
            ].map(s => (
              <div key={s.t} className="letter-card rounded-sm p-6 text-center">
                <div className="text-2xl mb-2">{s.icon}</div>
                <p className="text-gold-600 font-display text-2xl italic mb-1">{s.t}</p>
                <p className="text-vault-600 font-body text-sm">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fonctionnalités ──────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl text-center text-vault-900 mb-16 italic">Tout ce dont vous avez besoin</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Clock,  t: 'Livraison programmée',        d: 'À une date précise : anniversaire, mariage, événement futur.' },
              { icon: Shield, t: 'Chiffrement',                  d: 'Vos messages sont protégés. Personne d\'autre ne peut les lire.' },
              { icon: Heart,  t: 'Messages riches',              d: 'Texte, photos, vidéos, fichiers audio — tout ce qui vous représente.' },
              { icon: Users,  t: 'Plusieurs destinataires',      d: 'Famille, amis, collègues — chacun reçoit ce qui lui est destiné.' },
              { icon: Lock,   t: 'Dead Man\'s Switch',           d: 'Livraison automatique si vous ne vous reconnectez plus.' },
              { icon: Zap,    t: 'Rapide à créer',               d: 'Moins de 5 minutes pour rédiger et sceller votre première capsule.' },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="envelope-card rounded-sm p-6 flex gap-4 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(184,134,31,0.12)' }}>
                  <Icon size={18} style={{ color: 'var(--gold)' }} />
                </div>
                <div>
                  <h3 className="font-display text-lg text-vault-800 italic mb-1">{t}</h3>
                  <p className="text-vault-500 text-base leading-relaxed font-body">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center letter-card rounded-sm p-12 relative">
          {/* Wax seal decoration */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full wax-seal flex items-center justify-center text-white text-xl shadow-xl">
            🏺
          </div>
          <div className="mt-4">
            <h2 className="font-display text-4xl md:text-5xl text-vault-900 italic mb-4">Commencez gratuitement</h2>
            <p className="text-vault-600 text-lg mb-8 font-body">Rédigez votre première capsule en moins de 5 minutes.<br/><span className="text-vault-400 italic">Aucune carte bancaire requise.</span></p>
            <Link href="/register" className="inline-flex items-center gap-2 px-10 py-4 rounded text-white text-lg font-display italic transition-all hover:opacity-90 hover:scale-105" style={{ background: 'var(--gold)' }}>
              Écrire ma première lettre
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="border-t border-vault-200 py-12 px-6" style={{ background: 'var(--bg-aged)' }}>
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏺</span>
            <span className="font-display text-xl text-vault-700 italic">LegacyVault</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-vault-500 text-base font-body">
            <Link href="/pricing" className="hover:text-vault-700 transition-colors">Tarifs</Link>
            <Link href="/login" className="hover:text-vault-700 transition-colors">Connexion</Link>
            <Link href="/register" className="hover:text-vault-700 transition-colors">S'inscrire</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-5 text-sm text-vault-400 font-body">
            <Link href="/privacy" className="hover:text-vault-600 transition-colors">Politique de confidentialité</Link>
            <Link href="/terms" className="hover:text-vault-600 transition-colors">Conditions d'utilisation</Link>
            <Link href="/cookies" className="hover:text-vault-600 transition-colors">Politique de cookies</Link>
          </div>
          <p className="text-vault-400 text-sm italic font-body">© 2024 LegacyVault — Vos mots, à travers le temps.</p>
        </div>
      </footer>
    </div>
  )
}
