import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export const ATTACHMENTS_BUCKET = "ticket-attachments";
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 Mo
export const ALLOWED_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "application/pdf",
];

export function isAllowedFile(file: File): boolean {
  return (
    ALLOWED_MIME_TYPES.includes(file.type) &&
    file.size > 0 &&
    file.size <= MAX_FILE_SIZE_BYTES
  );
}

export function buildAttachmentPath(ticketId: string, filename: string) {
  const safeName = filename.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  return `${ticketId}/${crypto.randomUUID()}-${safeName}`;
}

export async function getSignedAttachmentUrl(
  supabase: SupabaseClient<Database>,
  filePath: string,
  expiresInSeconds = 60 * 10
) {
  const { data, error } = await supabase.storage
    .from(ATTACHMENTS_BUCKET)
    .createSignedUrl(filePath, expiresInSeconds);

  if (error) return null;
  return data.signedUrl;
}
