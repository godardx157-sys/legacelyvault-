// lib/email.ts
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
})

interface SendCapsuleEmailParams {
  to: string
  recipientName: string
  senderName: string
  capsuleTitle: string
  message: string
  mediaUrls: string[]
  capsuleId?: string
}

export async function sendCapsuleEmail(params: SendCapsuleEmailParams) {
  const mediaHtml = params.mediaUrls.length > 0
    ? `<div style="margin-top:24px"><p style="color:#7a5f4c;font-size:14px">Médias attachés :</p>${params.mediaUrls.map(url =>
        url.match(/\.(jpg|jpeg|png|gif|webp)$/i)
          ? `<img src="${url}" style="max-width:100%;border-radius:8px;margin:8px 0" />`
          : `<a href="${url}" style="color:#c9972a">${url}</a>`
      ).join('')}</div>`
    : ''

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: params.to,
    subject: `💌 Une capsule temporelle de ${params.senderName} vous attend`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family:Georgia,serif;background:#f5f0eb;margin:0;padding:40px 20px">
        <div style="max-width:600px;margin:0 auto;background:#faf7f2;border:1px solid #d4bc9f;border-radius:12px;padding:48px;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
          <div style="text-align:center;margin-bottom:32px">
            <div style="font-size:48px;margin-bottom:8px">🏺</div>
            <h1 style="color:#362413;font-size:28px;margin:0">LegacyVault</h1>
            <p style="color:#7a5f4c;margin:4px 0">Une capsule temporelle vous a été transmise</p>
          </div>
          <hr style="border:none;border-top:1px solid #d4bc9f;margin:24px 0" />
          <p style="color:#5e4537;font-size:16px">Cher(e) <strong>${params.recipientName}</strong>,</p>
          <p style="color:#5e4537;font-size:16px"><strong>${params.senderName}</strong> vous a laissé un message intitulé :</p>
          <h2 style="color:#362413;font-size:22px;font-style:italic;border-left:3px solid #c9972a;padding-left:16px;margin:24px 0">"${params.capsuleTitle}"</h2>
          <div style="background:#fff;border:1px solid #e8ddd0;border-radius:8px;padding:24px;margin:24px 0;color:#362413;font-size:16px;line-height:1.8;white-space:pre-wrap">${params.message}</div>
          ${mediaHtml}
          <hr style="border:none;border-top:1px solid #d4bc9f;margin:32px 0" />
          ${params.capsuleId ? `<div style="text-align:center;margin:24px 0"><a href="${process.env.NEXT_PUBLIC_APP_URL}/capsule/${params.capsuleId}" style="background:#c9972a;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:15px">Voir la capsule en ligne →</a></div>` : ''}
          <p style="color:#967e6b;font-size:13px;text-align:center">Ce message a été créé avec amour sur <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color:#c9972a">LegacyVault</a>.<br/>Il vous était destiné depuis longtemps.</p>
        </div>
      </body>
      </html>
    `,
  })
}

export async function sendCheckInReminder(to: string, name: string, daysLeft: number, checkInUrl: string) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: `⚠️ Rappel LegacyVault — Confirmez votre présence (${daysLeft} jours restants)`,
    html: `
      <body style="font-family:Georgia,serif;background:#f5f0eb;padding:40px 20px">
        <div style="max-width:500px;margin:0 auto;background:#faf7f2;border:1px solid #d4bc9f;border-radius:12px;padding:40px">
          <h2 style="color:#362413">Bonjour ${name},</h2>
          <p style="color:#5e4537;font-size:16px">Vos capsules temporelles sont configurées avec un <strong>Dead Man's Switch</strong>. Si vous ne vous reconnectez pas dans <strong>${daysLeft} jours</strong>, vos capsules seront automatiquement envoyées à vos destinataires.</p>
          <p style="color:#5e4537">Si tout va bien, cliquez simplement ci-dessous pour confirmer votre présence :</p>
          <div style="text-align:center;margin:32px 0">
            <a href="${checkInUrl}" style="background:#c9972a;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-size:16px;font-family:Georgia,serif">✓ Je suis là, tout va bien</a>
          </div>
          <p style="color:#967e6b;font-size:13px">LegacyVault — Préserver ce qui compte vraiment.</p>
        </div>
      </body>
    `,
  })
}
