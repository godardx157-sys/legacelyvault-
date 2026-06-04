import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-paper)' }}>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-vault-500 hover:text-vault-700 mb-8 transition-colors text-sm">
          <ArrowLeft size={16} /> Retour à l&apos;accueil
        </Link>
        <h1 className="font-display text-5xl text-vault-900 mb-2">Conditions d&apos;utilisation</h1>
        <p className="text-vault-400 text-sm mb-12">Dernière mise à jour : 4 juin 2024</p>
        <div className="space-y-8">
          {[
            { title: '1. Acceptation des conditions', content: 'En accédant et en utilisant LegacyVault, vous acceptez d\'être lié par ces Conditions d\'Utilisation. Si vous n\'acceptez pas ces conditions, veuillez ne pas utiliser le service.' },
            { title: '2. Description du service', content: 'LegacyVault est une plateforme de création et de livraison de capsules temporelles numériques. Le service permet de créer des messages, d\'y joindre des médias, de désigner des destinataires et de programmer leur livraison à une date future ou via un système automatique (Dead Man\'s Switch).' },
            { title: '3. Compte utilisateur', content: 'Vous devez avoir au moins 18 ans pour utiliser LegacyVault. Vous êtes responsable de la confidentialité de votre mot de passe et de toute activité sur votre compte. Vous vous engagez à fournir des informations exactes lors de l\'inscription.' },
            { title: '4. Contenu utilisateur', content: 'Vous conservez tous les droits sur le contenu que vous créez. En utilisant le service, vous accordez à LegacyVault une licence limitée pour stocker et transmettre votre contenu aux destinataires désignés. Vous vous engagez à ne pas utiliser le service pour diffuser du contenu illégal, haineux ou portant atteinte aux droits de tiers.' },
            { title: '5. Abonnements et paiements', content: 'Le plan Gratuit est disponible sans engagement. Les plans payants (Héritage et Éternel) sont facturés mensuellement via Stripe. Vous pouvez annuler votre abonnement à tout moment depuis vos paramètres. Le remboursement n\'est pas applicable pour les périodes déjà facturées.' },
            { title: '6. Disponibilité du service', content: 'LegacyVault s\'efforce de maintenir une disponibilité maximale mais ne garantit pas un service ininterrompu. Nous ne sommes pas responsables des pertes liées à une interruption de service non programmée.' },
            { title: '7. Limitation de responsabilité', content: 'LegacyVault ne peut être tenu responsable de la non-livraison de capsules due à des adresses email incorrectes, des boîtes mail pleines ou des filtres anti-spam. Il est de votre responsabilité de vérifier régulièrement les coordonnées de vos destinataires.' },
            { title: '8. Résiliation', content: 'Vous pouvez supprimer votre compte à tout moment depuis vos paramètres. LegacyVault se réserve le droit de suspendre ou résilier un compte en cas de violation de ces conditions.' },
            { title: '9. Droit applicable', content: 'Ces conditions sont régies par le droit français. Tout litige sera soumis aux tribunaux compétents de Paris.' },
            { title: '10. Contact', content: 'Pour toute question : legal@legacyvault.app' },
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
          <Link href="/terms" className="text-vault-700 font-medium">CGU</Link>
          <Link href="/cookies" className="hover:text-vault-600 transition-colors">Cookies</Link>
        </div>
      </footer>
    </div>
  )
}
