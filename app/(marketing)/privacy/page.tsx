// app/(marketing)/privacy/page.tsx
import Link from 'next/link'

export const metadata = {
  title: 'Politique de confidentialité — LegacyVault',
}

export default function PrivacyPage() {
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
        <h1 className="font-display text-5xl text-vault-900 mb-3">Politique de confidentialité</h1>
        <p className="text-vault-400 text-sm mb-12">Dernière mise à jour : juin 2024</p>

        <div className="space-y-10 text-vault-700 leading-relaxed">

          <section>
            <h2 className="font-display text-2xl text-vault-800 mb-3">1. Introduction</h2>
            <p>
              LegacyVault ("nous", "notre") s'engage à protéger votre vie privée. Cette politique de confidentialité
              décrit comment nous collectons, utilisons et protégeons vos données personnelles lorsque vous utilisez
              notre service, conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-vault-800 mb-3">2. Données collectées</h2>
            <p className="mb-3">Nous collectons les données suivantes :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Données de compte :</strong> nom, adresse email, mot de passe (haché).</li>
              <li><strong>Données de capsule :</strong> messages, photos, vidéos et fichiers que vous choisissez de stocker.</li>
              <li><strong>Données de destinataires :</strong> noms, emails et numéros de téléphone des personnes que vous désignez.</li>
              <li><strong>Données de connexion :</strong> adresse IP, navigateur, dates et heures de connexion à des fins de sécurité.</li>
              <li><strong>Données de paiement :</strong> traitées par Stripe ; nous ne stockons pas vos coordonnées bancaires.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-vault-800 mb-3">3. Finalités du traitement</h2>
            <p className="mb-3">Vos données sont utilisées pour :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Créer et gérer votre compte utilisateur.</li>
              <li>Stocker et livrer vos capsules temporelles selon vos instructions.</li>
              <li>Gérer votre abonnement et les paiements.</li>
              <li>Vous envoyer des notifications de check-in et de livraison.</li>
              <li>Assurer la sécurité et prévenir les fraudes.</li>
              <li>Améliorer notre service (données anonymisées).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-vault-800 mb-3">4. Base légale</h2>
            <p>
              Le traitement de vos données repose sur : (a) l'exécution du contrat de service,
              (b) votre consentement pour les communications marketing, et (c) nos intérêts légitimes
              pour la sécurité du service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-vault-800 mb-3">5. Conservation des données</h2>
            <p>
              Nous conservons vos données aussi longtemps que votre compte est actif. En cas de
              suppression de compte, toutes vos données sont effacées sous 30 jours, à l'exception
              des données comptables conservées 10 ans conformément à la loi française.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-vault-800 mb-3">6. Partage des données</h2>
            <p className="mb-3">Nous partageons vos données uniquement avec :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Neon (PostgreSQL) :</strong> hébergement de la base de données.</li>
              <li><strong>Cloudinary :</strong> hébergement des médias (photos, vidéos).</li>
              <li><strong>Stripe :</strong> traitement des paiements.</li>
              <li><strong>Vercel :</strong> hébergement de l'application.</li>
            </ul>
            <p className="mt-3">Nous ne vendons jamais vos données à des tiers.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-vault-800 mb-3">7. Vos droits</h2>
            <p className="mb-3">Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Accès :</strong> obtenir une copie de vos données.</li>
              <li><strong>Rectification :</strong> corriger des données inexactes.</li>
              <li><strong>Effacement :</strong> supprimer votre compte et vos données.</li>
              <li><strong>Portabilité :</strong> recevoir vos données dans un format structuré.</li>
              <li><strong>Opposition :</strong> vous opposer à certains traitements.</li>
            </ul>
            <p className="mt-3">
              Pour exercer ces droits, contactez-nous à : <strong>privacy@legacyvault.app</strong>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-vault-800 mb-3">8. Sécurité</h2>
            <p>
              Vos données sont protégées par chiffrement en transit (HTTPS) et au repos. Les mots de
              passe sont hachés avec bcrypt. Vos capsules peuvent être chiffrées avec une clé supplémentaire
              que vous seul connaissez.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-vault-800 mb-3">9. Contact</h2>
            <p>
              Pour toute question relative à cette politique, contactez notre délégué à la protection
              des données : <strong>privacy@legacyvault.app</strong>
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
