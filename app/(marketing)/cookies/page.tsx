import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function CookiesPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-paper)' }}>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-vault-500 hover:text-vault-700 mb-8 transition-colors text-sm">
          <ArrowLeft size={16} /> Retour à l&apos;accueil
        </Link>
        <h1 className="font-display text-5xl text-vault-900 mb-2">Politique de cookies</h1>
        <p className="text-vault-400 text-sm mb-12">Dernière mise à jour : 4 juin 2024</p>
        <div className="space-y-8">
          {[
            { title: '1. Qu\'est-ce qu\'un cookie ?', content: 'Un cookie est un petit fichier texte stocké sur votre appareil lors de votre visite sur un site web. Il permet au site de mémoriser vos préférences et de fonctionner correctement.' },
            { title: '2. Cookies utilisés par LegacyVault', content: 'Nous utilisons uniquement des cookies strictement nécessaires au fonctionnement du service. Aucun cookie publicitaire ou de tracking tiers n\'est utilisé.' },
            { title: '3. Cookie de session (next-auth.session-token)', content: 'Ce cookie est essentiel pour maintenir votre connexion. Il est créé lors de votre authentification et supprimé lors de votre déconnexion. Sans ce cookie, vous ne pouvez pas rester connecté à votre compte.' },
            { title: '4. Cookie CSRF (next-auth.csrf-token)', content: 'Ce cookie de sécurité protège votre compte contre les attaques de type Cross-Site Request Forgery. Il est automatiquement généré et ne contient aucune information personnelle.' },
            { title: '5. Cookies de paiement (Stripe)', content: 'Lors d\'un paiement, Stripe peut déposer des cookies nécessaires à la sécurisation de la transaction. Ces cookies sont gérés par Stripe et sont soumis à leur propre politique de confidentialité.' },
            { title: '6. Gestion des cookies', content: 'Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela empêchera votre connexion à LegacyVault. La plupart des navigateurs permettent de gérer les cookies via Paramètres > Confidentialité.' },
            { title: '7. Contact', content: 'Pour toute question sur notre utilisation des cookies : privacy@legacyvault.app' },
          ].map(section => (
            <section key={section.title}>
              <h2 className="font-display text-2xl text-vault-800 mb-3">{section.title}</h2>
              <p className="text-vault-600 leading-relaxed">{section.content}</p>
            </section>
          ))}
        </div>
      </div>
      <footer className="border-t border-vault-200 py-8 px-6 mt-8">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6 text-vault-400 text-sm">
          <Link href="/" className="hover:text-vault-600 transition-colors">Accueil</Link>
          <Link href="/privacy" className="hover:text-vault-600 transition-colors">Confidentialité</Link>
          <Link href="/terms" className="hover:text-vault-600 transition-colors">CGU</Link>
          <Link href="/cookies" className="text-vault-700 font-medium">Cookies</Link>
        </div>
      </footer>
    </div>
  )
}
