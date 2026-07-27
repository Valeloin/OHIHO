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
    <div className="card-surface flex flex-col items-center p-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-sky via-brand-teal to-brand-emerald text-xl font-semibold text-background">
        {initials(firstName, lastName, email)}
      </div>

      <h2 className="mt-5 break-words text-lg font-semibold">
        {fullName || email}
      </h2>
      <p className="mt-1 break-all text-[14px] text-muted">{email}</p>
      {company && (
        <p className="mt-1 break-words text-[14px] text-muted">{company}</p>
      )}

      <p className="mt-6 text-[14px] text-muted">
        Client depuis {memberSince(createdAt)}
      </p>
    </div>
  );
}
