// Client serveur pour l'API BugTrack (bugtrack.ohiho.fr) — le vrai produit
// de suivi de tickets de Valentin, pas une table Supabase. Jamais importé
// depuis un fichier "use client" : site_key ne doit jamais atteindre le
// navigateur (pas de préfixe NEXT_PUBLIC_ sur les variables d'env).

export type BugTrackStatus =
  | "Nouveau"
  | "En analyse"
  | "En cours"
  | "En attente d'informations"
  | "Informations reçues"
  | "Livré"
  | "Clos"
  | "Réouvert";

export type BugTrackPriority = "faible" | "moyen" | "élevé" | "bloquant";

export type BugTrackTicketSummary = {
  id: string;
  number: string;
  title: string;
  status: BugTrackStatus;
  priority: BugTrackPriority;
  created_at: string;
  updated_at: string;
};

export type BugTrackMessage = {
  id: string;
  author_type: "admin" | "user";
  author_name: string;
  message: string;
  created_at: string;
};

export class BugTrackError extends Error {
  status?: number;
  details?: { field: string; message: string }[];

  constructor(
    message: string,
    status?: number,
    details?: { field: string; message: string }[]
  ) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

function config() {
  const apiUrl = process.env.BUGTRACK_API_URL;
  const siteKey = process.env.BUGTRACK_SITE_KEY;
  if (!apiUrl || !siteKey) {
    throw new BugTrackError(
      "Configuration BugTrack manquante (BUGTRACK_API_URL / BUGTRACK_SITE_KEY)."
    );
  }
  return { apiUrl, siteKey };
}

async function parseErrorBody(response: Response): Promise<BugTrackError> {
  let body: {
    error?: string;
    details?: { field: string; message: string }[];
  } = {};
  try {
    body = await response.json();
  } catch {
    // corps non-JSON, on garde le message générique
  }
  return new BugTrackError(
    body.error ?? "Erreur BugTrack, veuillez réessayer.",
    response.status,
    body.details
  );
}

async function bugtrackGet<T>(path: string, params: Record<string, string>) {
  const { apiUrl, siteKey } = config();
  const query = new URLSearchParams({ site_key: siteKey, ...params });
  const response = await fetch(`${apiUrl}${path}?${query.toString()}`, {
    cache: "no-store",
  });
  if (!response.ok) throw await parseErrorBody(response);
  return (await response.json()) as T;
}

async function bugtrackPost<T>(path: string, body: Record<string, unknown>) {
  const { apiUrl, siteKey } = config();
  const response = await fetch(`${apiUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ site_key: siteKey, ...body }),
  });
  if (!response.ok) throw await parseErrorBody(response);
  return (await response.json()) as T;
}

export async function createTicket(input: {
  user_id: string;
  user_email: string;
  user_name: string;
  title: string;
  description: string;
  software: string;
  version?: string | null;
  priority: BugTrackPriority;
}) {
  const data = await bugtrackPost<{
    success: true;
    ticket: { id: string; number: string; status: BugTrackStatus };
  }>("/api/tickets/create", input);
  return data.ticket;
}

export async function listTickets(userId: string) {
  const data = await bugtrackGet<{ tickets: BugTrackTicketSummary[] }>(
    "/api/tickets/list",
    { user_id: userId }
  );
  return data.tickets;
}

export async function getThread(ticketId: string, userId: string) {
  const data = await bugtrackGet<{ messages: BugTrackMessage[] }>(
    `/api/tickets/${ticketId}/thread`,
    { user_id: userId }
  );
  return data.messages;
}

export async function postMessage(
  ticketId: string,
  userId: string,
  message: string
) {
  const data = await bugtrackPost<{ message: BugTrackMessage }>(
    `/api/tickets/${ticketId}/thread`,
    { user_id: userId, message }
  );
  return data.message;
}

export async function closeTicket(ticketId: string, userId: string) {
  const data = await bugtrackPost<{
    success: true;
    ticket: { id: string; status: BugTrackStatus };
  }>(`/api/tickets/${ticketId}/close`, { user_id: userId });
  return data.ticket;
}

export async function reopenTicket(
  ticketId: string,
  userId: string,
  message?: string
) {
  const data = await bugtrackPost<{
    success: true;
    ticket: { id: string; status: BugTrackStatus };
  }>(`/api/tickets/${ticketId}/reopen`, {
    user_id: userId,
    ...(message ? { message } : {}),
  });
  return data.ticket;
}
