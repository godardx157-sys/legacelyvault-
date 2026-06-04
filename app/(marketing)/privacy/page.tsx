import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-paper)' }}>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-vault-500 hover:text-vault-700 mb-8 transition-colors text-sm">
          <ArrowLeft size={16} /> Retour à l&apos;accueil
        </Link>
        <h1 className="font-display text-5xl text-vault-900 mb-2">Politique de confidentialité</h1>
        <p className="text-vault-400 text-sm mb-12">Dernière mise à jour : 4 juin 2024</p>
        <div className="space-y-8">
          {[
            { title: '1. Données collectées', content: 'LegacyVault collecte les informations fournies lors de la création de compte (nom, adresse email, mot de passe chiffré), ainsi que le contenu de vos capsules temporelles (messages, médias uploadés). Nous collectons également des données techniques nécessaires au fonctionnement du service (logs de connexion, adresse IP, données de navigation).' },
            { title: '2. Utilisation des données', content: 'Vos données sont utilisées exclusivement pour fournir et améliorer le service LegacyVault, livrer vos capsules aux destinataires désignés, vous envoyer des notifications de service (rappels de connexion, confirmations de livraison) et gérer votre abonnement.' },
            { title: '3. Protection des données', content: 'Les mots de passe sont stockés de manière sécurisée via un algorithme de hashage bcrypt. Les connexions sont chiffrées via SSL/TLS. Vos capsules peuvent être chiffrées avec une clé personnelle. Nous ne stockons aucune donnée bancaire (gérées par Stripe).' },
            { title: '4. Partage des données', content: 'Nous ne vendons jamais vos données personnelles. Elles peuvent être partagées uniquement avec nos prestataires techniques (Vercel pour l\'hébergement, Neon pour la base de données, Cloudinary pour les médias, Stripe pour les paiements) dans le strict respect du RGPD.' },
            { title: '5. Vos droits (RGPD)', content: 'Conformément au Règlement Général sur la Protection des Données, vous disposez d\'un droit d\'accès, de rectification, d\'effacement, de portabilité et d\'opposition. Vous pouvez supprimer votre compte et toutes vos données directement depuis vos Paramètres. Pour toute demande : privacy@legacyvault.app' },
            { title: '6. Conservation', content: 'Vos données sont conservées tant que votre compte est actif. En cas de suppression de compte, toutes vos données personnelles et capsules sont effacées définitivement dans un délai de 30 jours.' },
            { title: '7. Contact', content: 'Pour toute question relative à vos données personnelles : privacy@legacyvault.app' },
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
          <Link href="/privacy" className="text-vault-700 font-medium">Confidentialité</Link>
          <Link href="/terms" className="hover:text-vault-600 transition-colors">CGU</Link>
          <Link href="/cookies" className="hover:text-vault-600 transition-colors">Cookies</Link>
        </div>
      </footer>
    </div>
  )
}
