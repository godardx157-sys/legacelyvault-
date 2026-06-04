// app/(marketing)/cookies/page.tsx
import Link from 'next/link'

export const metadata = {
  title: 'Politique de cookies — LegacyVault',
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-paper)' }}>
      <nav className="border-b border-vault-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏺</span>
            <span className="font-display text-xl text-vault-800">LegacyVault</span>
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display text-5xl text-vault-900 mb-3">Politique de cookies</h1>
        <p className="text-vault-400 text-sm mb-12">Dernière mise à jour : juin 2024</p>

        <div className="space-y-10 text-vault-700 leading-relaxed">

          <section>
            <h2 className="font-display text-2xl text-vault-800 mb-3">1. Qu'est-ce qu'un cookie ?</h2>
            <p>
              Un cookie est un petit fichier texte déposé sur votre appareil lors de votre visite
              sur un site web. Il permet au site de mémoriser certaines informations vous concernant,
              comme vos préférences ou votre session de connexion.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-vault-800 mb-3">2. Cookies utilisés</h2>

            <h3 className="font-medium text-vault-800 mb-2 mt-4">Cookies essentiels</h3>
            <p className="mb-3">Ces cookies sont indispensables au fonctionnement du service. Ils ne peuvent pas être désactivés.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-vault-200">
                    <th className="text-left py-2 pr-4 text-vault-600 font-medium">Nom</th>
                    <th className="text-left py-2 pr-4 text-vault-600 font-medium">Finalité</th>
                    <th className="text-left py-2 text-vault-600 font-medium">Durée</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-vault-100">
                  <tr>
                    <td className="py-2 pr-4 font-mono text-xs">next-auth.session-token</td>
                    <td className="py-2 pr-4">Maintien de la session utilisateur</td>
                    <td className="py-2">30 jours</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-xs">next-auth.csrf-token</td>
                    <td className="py-2 pr-4">Protection contre les attaques CSRF</td>
                    <td className="py-2">Session</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-xs">next-auth.callback-url</td>
                    <td className="py-2 pr-4">Redirection après connexion</td>
                    <td className="py-2">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-medium text-vault-800 mb-2 mt-6">Cookies analytiques</h3>
            <p>
              Actuellement, LegacyVault n'utilise pas de cookies analytiques tiers (pas de Google Analytics,
              pas de traceurs publicitaires). Si cela devait changer, cette politique sera mise à jour
              et votre consentement sera sollicité.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-vault-800 mb-3">3. Gestion des cookies</h2>
            <p className="mb-3">
              Vous pouvez contrôler et supprimer les cookies via les paramètres de votre navigateur.
              Notez que la désactivation des cookies essentiels empêchera la connexion au service.
            </p>
            <p className="mb-2">Instructions par navigateur :</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Chrome : Paramètres → Confidentialité → Cookies</li>
              <li>Firefox : Options → Vie privée → Cookies</li>
              <li>Safari : Préférences → Confidentialité</li>
              <li>Edge : Paramètres → Confidentialité → Cookies</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-vault-800 mb-3">4. Stockage local</h2>
            <p>
              En complément des cookies, LegacyVault peut utiliser le stockage local (localStorage) de
              votre navigateur pour mémoriser certaines préférences d'interface. Ces données restent
              sur votre appareil et ne sont pas transmises à nos serveurs.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-vault-800 mb-3">5. Contact</h2>
            <p>
              Pour toute question sur notre utilisation des cookies : <strong>privacy@legacyvault.app</strong>
            </p>
          </section>

        </div>
      </main>

      <footer className="border-t border-vault-200 py-8 px-6 mt-16">
        <div className="max-w-3xl mx-auto flex flex-wrap gap-4 text-sm text-vault-400 justify-center">
          <Link href="/privacy" className="hover:text-vault-600 transition-colors">Confidentialité</Link>
          <Link href="/terms" className="hover:text-vault-600 transition-colors">CGU</Link>
          <Link href="/cookies" className="hover:text-vault-600 transition-colors">Cookies</Link>
          <Link href="/" className="hover:text-vault-600 transition-colors">Accueil</Link>
        </div>
      </footer>
    </div>
  )
}
