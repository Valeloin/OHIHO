import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { contactSchema, labelSujet } from "@/lib/contact";
import { SITE } from "@/lib/site";

// Limite simple, en mémoire : cinq envois par adresse IP et par quart
// d'heure. Elle disparaît à chaque redémarrage et n'est pas partagée entre
// les instances — c'est suffisant contre un robot bavard, ce n'est pas une
// protection contre une attaque décidée.
const FENETRE_MS = 15 * 60 * 1000;
const MAX_ENVOIS = 5;
const envois = new Map<string, number[]>();

function tropDEnvois(ip: string): boolean {
  const maintenant = Date.now();
  const recents = (envois.get(ip) ?? []).filter((t) => maintenant - t < FENETRE_MS);
  recents.push(maintenant);
  envois.set(ip, recents);
  return recents.length > MAX_ENVOIS;
}

export async function POST(request: NextRequest) {
  const cle = process.env.RESEND_API_KEY;
  if (!cle) {
    // Sans clé, le formulaire n'aurait pas dû s'afficher (voir Contact.tsx) :
    // on répond quand même proprement plutôt que de lever une exception.
    return NextResponse.json(
      { erreur: "Le formulaire est momentanément indisponible." },
      { status: 503 }
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "inconnue";
  if (tropDEnvois(ip)) {
    return NextResponse.json(
      { erreur: "Trop de messages envoyés. Réessayez dans quelques minutes." },
      { status: 429 }
    );
  }

  let brut: unknown;
  try {
    brut = await request.json();
  } catch {
    return NextResponse.json({ erreur: "Requête illisible." }, { status: 400 });
  }

  const resultat = contactSchema.safeParse(brut);
  if (!resultat.success) {
    return NextResponse.json(
      { erreur: "Le formulaire contient une erreur." },
      { status: 400 }
    );
  }

  const { nom, email, sujet, message, societe } = resultat.data;

  // Champ piège rempli : on répond « envoyé » sans rien envoyer. Un robot ne
  // doit pas apprendre qu'il a été repéré.
  if (societe) return NextResponse.json({ ok: true });

  const resend = new Resend(cle);
  const destinataire = process.env.CONTACT_TO ?? SITE.email;

  const { error } = await resend.emails.send({
    // Expéditeur sur le domaine vérifié ; l'adresse du visiteur passe en
    // « répondre à », pour pouvoir lui répondre directement.
    from: `Formulaire OHIHO <contact@ohiho.fr>`,
    to: destinataire,
    replyTo: email,
    subject: `Nouvelle demande — ${labelSujet(sujet)} — ${nom}`,
    text: [
      `Nom : ${nom}`,
      `Email : ${email}`,
      `Sujet : ${labelSujet(sujet)}`,
      "",
      message,
    ].join("\n"),
  });

  if (error) {
    console.error("Envoi du formulaire de contact impossible :", error);
    return NextResponse.json(
      { erreur: "L'envoi a échoué. Écrivez-nous directement par email." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
