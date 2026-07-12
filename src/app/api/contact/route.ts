import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message } = body ?? {};

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

  // TODO: brancher un service d'envoi d'email (ex: Resend, SendGrid) ou un CRM.
  console.log("Nouvelle demande de contact OHIHO:", body);

  return NextResponse.json({ ok: true });
}
