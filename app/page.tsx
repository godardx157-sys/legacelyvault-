// app/page.tsx
import Link from 'next/link'
import { ArrowRight, Clock, Shield, Heart, Users, Lock, Zap } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-paper)' }}>
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-vault-200/60 backdrop-blur-sm" style={{ background: 'rgba(250,247,242,0.9)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏺</span>
            <span className="font-display text-xl text-vault-800">LegacyVault</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/pricing" className="text-vault-600 hover:text-vault-800 transition-colors text-base">Tarifs</Link>
            <Link href="/login" className="text-vault-600 hover:text-vault-800 transition-colors text-base">Connexion</Link>
            <Link href="/register" className="px-5 py-2 rounded-lg text-white text-base transition-all hover:opacity-90" style={{ background: 'var(--gold)' }}>
              Commencer
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-400/40 text-gold-600 text-sm mb-8" style={{ background: 'rgba(201,151,42,0.08)' }}>
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
            <span className="font-body">Plus de 10 000 capsules créées</span>
          </div>
          <h1 className="font-display text-6xl md:text-8xl leading-none text-vault-900 mb-6">
            Vos mots,<br />
            <span className="shimmer-text">à travers le temps</span>
          </h1>
          <p className="text-xl text-vault-600 max-w-2xl mx-auto mb-10 font-body leading-relaxed">
            Créez des capsules temporelles numériques — messages, photos, vidéos — à transmettre à vos proches 
            à une date précise ou après votre décès. Votre héritage, préservé pour toujours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white text-lg font-medium transition-all hover:scale-105 hover:shadow-lg" style={{ background: 'var(--gold)' }}>
              Créer ma première capsule
              <ArrowRight size={20} />
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-vault-700 text-lg border border-vault-300 hover:border-vault-400 transition-all">
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>

      {/* Visual */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="paper-card rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-4 right-4 w-12 h-12 rounded-full wax-seal flex items-center justify-center text-white text-xl">🔒</div>
            <p className="text-vault-500 text-sm font-mono mb-2">Capsule scellée le 15 mars 2024</p>
            <h3 className="font-display text-2xl text-vault-800 mb-1">Pour ma fille, le jour de ses 18 ans</h3>
            <p className="text-vault-500 text-sm mb-6">Destinataire : Emma • À ouvrir le 15 mars 2036</p>
            <div className="bg-white/60 rounded-xl p-6 border border-vault-200">
              <p className="text-vault-700 italic leading-relaxed">
                "Ma chérie, quand tu liras ces mots, tu auras 18 ans et moi... qui sait. 
                Voici tout ce que je voudrais que tu saches sur ce qui compte vraiment dans la vie..."
              </p>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <span className="px-3 py-1 rounded-full text-xs border border-vault-300 text-vault-600">📷 3 photos</span>
              <span className="px-3 py-1 rounded-full text-xs border border-vault-300 text-vault-600">🎵 1 audio</span>
              <span className="px-3 py-1 rounded-full text-xs bg-vault-100 text-vault-700 border border-vault-200">Scellée & Chiffrée</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-5xl text-center text-vault-900 mb-4">Comment ça fonctionne</h2>
          <p className="text-center text-vault-500 mb-16 text-lg">Simple comme écrire une lettre. Puissant comme l'éternité.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '✍️', step: '01', title: 'Créez votre capsule', desc: 'Rédigez votre message, ajoutez des photos et vidéos. Choisissez vos destinataires et la date de livraison.' },
              { icon: '🔒', step: '02', title: 'Scellez & protégez', desc: 'Chiffrez votre capsule. Activez le Dead Man\'s Switch pour une livraison automatique si vous cessez de vous connecter.' },
              { icon: '💌', step: '03', title: 'Livraison garantie', desc: 'Vos proches reçoivent un email élégant au bon moment. Votre message traverse le temps, intact.' },
            ].map(f => (
              <div key={f.step} className="paper-card rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{f.icon}</div>
                <p className="text-gold-600 font-mono text-sm mb-2">{f.step}</p>
                <h3 className="font-display text-2xl text-vault-800 mb-3">{f.title}</h3>
                <p className="text-vault-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dead Man's Switch explanation */}
      <section className="py-24 px-6" style={{ background: 'linear-gradient(to bottom, var(--bg-paper), #f0e8dc)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-6">⚙️</div>
          <h2 className="font-display text-5xl text-vault-900 mb-4">Dead Man's Switch</h2>
          <p className="text-vault-600 text-xl mb-8 leading-relaxed">
            La fonctionnalité la plus puissante que personne n'avait encore construite simplement.
            Si vous ne vous connectez pas pendant X jours, LegacyVault envoie automatiquement 
            vos capsules à vos proches. Aucune intervention requise.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            {[
              { t: 'J-30', d: 'Rappel par email' },
              { t: 'J-7', d: '3 rappels urgents' },
              { t: 'J-0', d: 'Livraison automatique' },
            ].map(s => (
              <div key={s.t} className="paper-card rounded-xl p-6">
                <p className="text-gold-600 font-display text-3xl mb-1">{s.t}</p>
                <p className="text-vault-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-5xl text-center text-vault-900 mb-16">Tout ce dont vous avez besoin</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Clock, t: 'Livraison programmée', d: 'À une date précise, anniversaire, mariage ou événement futur.' },
              { icon: Shield, t: 'Chiffrement de bout en bout', d: 'Vos messages sont chiffrés. Personne d\'autre ne peut les lire.' },
              { icon: Heart, t: 'Messages riches', d: 'Texte, photos, vidéos, fichiers audio. Tout ce qui vous représente.' },
              { icon: Users, t: 'Plusieurs destinataires', d: 'Envoyez à votre famille, amis, collègues — tous en même temps.' },
              { icon: Lock, t: 'Dead Man\'s Switch', d: 'Livraison automatique si vous ne vous reconnectez plus.' },
              { icon: Zap, t: 'Rapide à créer', d: 'Moins de 5 minutes pour créer et sceller votre première capsule.' },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="paper-card rounded-xl p-6 flex gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201,151,42,0.12)' }}>
                  <Icon size={20} style={{ color: 'var(--gold)' }} />
                </div>
                <div>
                  <h3 className="font-display text-lg text-vault-800 mb-1">{t}</h3>
                  <p className="text-vault-500 text-base leading-relaxed">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center paper-card rounded-3xl p-12">
          <div className="text-5xl mb-6">🏺</div>
          <h2 className="font-display text-5xl text-vault-900 mb-4">Commencez gratuitement</h2>
          <p className="text-vault-600 text-lg mb-8">Créez votre première capsule en moins de 5 minutes. Aucune carte bancaire requise.</p>
          <Link href="/register" className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-white text-lg font-medium transition-all hover:scale-105" style={{ background: 'var(--gold)' }}>
            Créer mon compte gratuitement
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-vault-200 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏺</span>
            <span className="font-display text-xl text-vault-700">LegacyVault</span>
          </div>
          <div className="flex gap-6 text-vault-500 text-base">
            <Link href="/pricing" className="hover:text-vault-700 transition-colors">Tarifs</Link>
            <Link href="/login" className="hover:text-vault-700 transition-colors">Connexion</Link>
            <Link href="/register" className="hover:text-vault-700 transition-colors">S'inscrire</Link>
          </div>
          <p className="text-vault-400 text-sm">© 2024 LegacyVault. Fait avec ❤️</p>
        </div>
      </footer>
    </div>
  )
}
