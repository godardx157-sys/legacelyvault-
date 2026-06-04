// app/(marketing)/terms/page.tsx
import Link from 'next/link'

export const metadata = {
  title: "Conditions d'utilisation — LegacyVault",
}

export default function TermsPage() {
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
        <h1 className="font-display text-5xl text-vault-900 mb-3">Conditions d'utilisation</h1>
        <p className="text-vault-400 text-sm mb-12">Dernière mise à jour : juin 2024</p>

        <div className="space-y-10 text-vault-700 leading-relaxed">

          <section>
            <h2 className="font-display text-2xl text-vault-800 mb-3">1. Acceptation des conditions</h2>
            <p>
              En créant un compte sur LegacyVault, vous acceptez les présentes conditions d'utilisation.
              Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-vault-800 mb-3">2. Description du service</h2>
            <p>
              LegacyVault est un service de capsules temporelles numériques permettant de créer, stocker
              et programmer l'envoi de messages, photos et vidéos à des destinataires désignés, à une date
              future ou selon un déclencheur automatique (Dead Man's Switch).
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-vault-800 mb-3">3. Compte utilisateur</h2>
            <p className="mb-3">Pour utiliser LegacyVault, vous devez :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Avoir au moins 18 ans.</li>
              <li>Fournir des informations exactes lors de l'inscription.</li>
              <li>Maintenir la confidentialité de vos identifiants.</li>
              <li>Nous notifier immédiatement de toute utilisation non autorisée.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-vault-800 mb-3">4. Utilisation acceptable</h2>
            <p className="mb-3">Il est interdit d'utiliser LegacyVault pour :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Stocker ou transmettre du contenu illégal, haineux, menaçant ou diffamatoire.</li>
              <li>Harceler ou nuire à des tiers.</li>
              <li>Violer des droits de propriété intellectuelle.</li>
              <li>Tenter de compromettre la sécurité du service.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-vault-800 mb-3">5. Responsabilité du contenu</h2>
            <p>
              Vous êtes seul responsable du contenu de vos capsules. LegacyVault n'est pas responsable
              du contenu créé par ses utilisateurs. Nous nous réservons le droit de supprimer tout
              contenu violant ces conditions.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-vault-800 mb-3">6. Abonnements et paiements</h2>
            <p className="mb-3">
              Les plans payants (Pro, Éternel) sont facturés selon la périodicité choisie. Les paiements
              sont traités par Stripe. Les abonnements se renouvellent automatiquement jusqu'à annulation.
            </p>
            <p>
              En cas de résiliation, vous conservez l'accès jusqu'à la fin de la période payée.
              Aucun remboursement partiel n'est accordé sauf disposition légale contraire.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-vault-800 mb-3">7. Disponibilité du service</h2>
            <p>
              Nous nous efforçons de maintenir le service disponible en permanence. Cependant, nous ne
              garantissons pas une disponibilité ininterrompue. Des maintenances peuvent occasionner
              des interruptions temporaires.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-vault-800 mb-3">8. Garantie de livraison</h2>
            <p>
              LegacyVault s'engage à déployer tous les efforts raisonnables pour assurer la livraison
              des capsules selon les paramètres définis. Toutefois, la livraison peut être affectée par
              des facteurs hors de notre contrôle (adresse email incorrecte, serveur de messagerie du
              destinataire, etc.).
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-vault-800 mb-3">9. Limitation de responsabilité</h2>
            <p>
              LegacyVault ne saurait être tenu responsable des dommages indirects, accessoires ou
              consécutifs résultant de l'utilisation ou de l'impossibilité d'utiliser le service.
              Notre responsabilité est limitée au montant payé par l'utilisateur au cours des 12 derniers mois.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-vault-800 mb-3">10. Modification des conditions</h2>
            <p>
              Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications
              seront notifiées par email 30 jours avant leur entrée en vigueur. La poursuite de
              l'utilisation du service vaut acceptation des nouvelles conditions.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-vault-800 mb-3">11. Droit applicable</h2>
            <p>
              Ces conditions sont régies par le droit français. Tout litige sera soumis à la
              compétence des tribunaux français.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-vault-800 mb-3">12. Contact</h2>
            <p>
              Pour toute question relative à ces conditions : <strong>legal@legacyvault.app</strong>
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
