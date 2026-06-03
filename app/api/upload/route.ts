// app/api/upload/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PLANS } from '@/lib/stripe'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const plan = (session.user.plan ?? 'FREE') as keyof typeof PLANS
  if (plan === 'FREE') {
    return NextResponse.json({ error: 'L\'upload de médias nécessite un plan payant.' }, { status: 403 })
  }

  const formData = await req.formData()
  const file = formData.get('file') as File
  if (!file) return NextResponse.json({ error: 'Fichier manquant' }, { status: 400 })

  // 20MB limit
  if (file.size > 20 * 1024 * 1024) {
    return NextResponse.json({ error: 'Fichier trop volumineux (max 20 MB)' }, { status: 400 })
  }

  const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'audio/mpeg', 'audio/wav', 'application/pdf']
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: 'Type de fichier non supporté' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const base64 = `data:${file.type};base64,${buffer.toString('base64')}`

  const cloudRes = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/auto/upload`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        file: base64,
        api_key: process.env.CLOUDINARY_API_KEY,
        upload_preset: 'legacyvault_uploads',
        folder: `legacyvault/${session.user.id}`,
      }),
    }
  )

  if (!cloudRes.ok) {
    const err = await cloudRes.json()
    console.error('Cloudinary error:', err)
    return NextResponse.json({ error: 'Échec de l\'upload' }, { status: 500 })
  }

  const data = await cloudRes.json()
  return NextResponse.json({ url: data.secure_url, publicId: data.public_id })
}
