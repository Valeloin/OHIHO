function initials(firstName: string | null, lastName: string | null, email: string) {
  const first = firstName?.trim()?.[0];
  const last = lastName?.trim()?.[0];
  if (first || last) return `${first ?? ""}${last ?? ""}`.toUpperCase();
  return email[0]?.toUpperCase() ?? "?";
}

function memberSince(createdAt: string) {
  return new Date(createdAt).toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
}

export default function ProfileSummary({
  firstName,
  lastName,
  email,
  company,
  createdAt,
}: {
  firstName: string | null;
  lastName: string | null;
  email: string;
  company: string | null;
  createdAt: string;
}) {
  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  return (
    <div className="card-dark flex flex-col items-center p-8 text-center">
      {/* Avatar au dégradé de marque : mêmes teintes que le reste du site
          (bleu ciel → teal → émeraude), initiales en blanc au centre. */}
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-sky via-brand-teal to-brand-emerald text-2xl font-semibold tracking-display text-background shadow-[var(--card-shadow)]">
        {initials(firstName, lastName, email)}
      </div>

      <h2 className="mt-5 break-words text-xl font-semibold tracking-display">
        {fullName || email}
      </h2>
      <p className="mt-1.5 break-all text-sm text-muted">{email}</p>

      {company && (
        <span className="pill mt-4 max-w-full break-words px-3 py-1.5 text-[11px]">
          {company}
        </span>
      )}

      <div className="mt-6 flex w-full items-center justify-center gap-2 border-t border-border pt-5 text-xs text-muted">
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-emerald shadow-[0_0_8px_rgba(52,211,153,0.8)]"
          aria-hidden="true"
        />
        Client depuis {memberSince(createdAt)}
      </div>
    </div>
  );
}
