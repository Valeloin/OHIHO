import nodemailer from "nodemailer";

/**
 * Envoi d'email transactionnel via SMTP (OVH / Zimbra).
 * Config lue depuis les variables d'environnement :
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO
 * Utilisé par le formulaire de contact et le parcours de devis.
 */

type SendMailInput = {
  subject: string;
  text: string;
  /** Destinataire ; par défaut CONTACT_TO puis SMTP_USER. */
  to?: string;
  /** Adresse de réponse (email du client). */
  replyTo?: string;
};

export class EmailConfigError extends Error {}

export async function sendMail({ subject, text, to, replyTo }: SendMailInput) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new EmailConfigError("Variables SMTP manquantes — email non envoyé.");
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"Site OHIHO" <${SMTP_USER}>`,
    to: to || CONTACT_TO || SMTP_USER,
    replyTo,
    subject,
    text,
  });
}
