import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = "OHIHO Support <notifications@ohiho.fr>";

// Best-effort : un message de ticket est déjà enregistré en base avant cet
// appel, un échec d'email ne doit jamais faire échouer l'action qui l'a
// déclenché.
export async function sendTicketNotificationEmail({
  to,
  subject,
  ticketUrl,
  preview,
}: {
  to: string;
  subject: string;
  ticketUrl: string;
  preview: string;
}) {
  if (!resend) {
    console.warn(
      "[sendTicketNotificationEmail] RESEND_API_KEY manquant, email ignoré."
    );
    return;
  }

  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject,
      html: `<p>${preview}</p><p><a href="${ticketUrl}">Voir le ticket</a></p>`,
    });
  } catch (err) {
    console.error("[sendTicketNotificationEmail] Resend error:", err);
  }
}
