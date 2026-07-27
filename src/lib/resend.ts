import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = "OHIHO <contact@ohiho.fr>";

export async function sendContactEmail({
  to,
  name,
  email,
  message,
}: {
  to: string;
  name: string;
  email: string;
  message: string;
}) {
  if (!resend) {
    throw new Error("Configuration email manquante (RESEND_API_KEY).");
  }

  await resend.emails.send({
    from: FROM,
    to,
    replyTo: email,
    subject: `Nouveau message de ${name} (via ohiho.fr)`,
    html: `<p><strong>${name}</strong> (${email}) a écrit :</p><p>${message.replace(/\n/g, "<br />")}</p>`,
  });
}
