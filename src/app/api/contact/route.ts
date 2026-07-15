import { NextResponse } from "next/server";
import { sendMail, EmailConfigError } from "@/lib/email";

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

  try {
    await sendMail({
      subject: `Nouvelle demande de contact — ${need || "Non précisé"}`,
      replyTo: email,
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
    if (err instanceof EmailConfigError) {
      console.error(err.message, body);
      return NextResponse.json(
        { error: "Configuration email manquante côté serveur." },
        { status: 500 }
      );
    }
    console.error("Échec de l'envoi de l'email de contact:", err);
    return NextResponse.json(
      { error: "Échec de l'envoi de l'email." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
