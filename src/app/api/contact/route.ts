import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, company, email, phone, need, message } = body ?? {};

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !email.trim() ||
    typeof message !== "string" ||
    !message.trim()
  ) {
    return NextResponse.json(
      { error: "Nom, email et message sont requis." },
      { status: 400 }
    );
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } =
    process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.error(
      "Variables SMTP manquantes — email non envoyé.",
      body
    );
    return NextResponse.json(
      { error: "Configuration email manquante côté serveur." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Site OHIHO" <${SMTP_USER}>`,
      to: CONTACT_TO || SMTP_USER,
      replyTo: email,
      subject: `Nouvelle demande de contact — ${need || "Non précisé"}`,
      text: [
        `Nom : ${name}`,
        `Entreprise : ${company || "-"}`,
        `Email : ${email}`,
        `Téléphone : ${phone || "-"}`,
        `Type de besoin : ${need || "-"}`,
        "",
        "Message :",
        message,
      ].join("\n"),
    });
  } catch (err) {
    console.error("Échec de l'envoi de l'email de contact:", err);
    return NextResponse.json(
      { error: "Échec de l'envoi de l'email." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
