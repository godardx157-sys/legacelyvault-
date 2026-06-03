// app/(dashboard)/dashboard/capsules/new/page.tsx
import { NewCapsuleForm } from '@/components/capsule/NewCapsuleForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function NewCapsulePage() {
  const session = await getServerSession(authOptions)
  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h2 className="font-display text-3xl text-vault-800 mb-2">Créer une capsule</h2>
        <p className="text-vault-500">Vos mots, figés dans le temps, prêts à traverser les années.</p>
      </div>
      <NewCapsuleForm plan={session?.user?.plan ?? 'FREE'} />
    </div>
  )
}
