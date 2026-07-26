const EUR_FORMATTER = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export function formatCents(cents: number): string {
  return EUR_FORMATTER.format(cents / 100);
}

// Accepte "1234,56" ou "1234.56" et renvoie des centimes entiers.
export function eurosToCents(input: string): number {
  const normalized = input.trim().replace(",", ".");
  const euros = Number.parseFloat(normalized);
  if (Number.isNaN(euros)) return 0;
  return Math.round(euros * 100);
}
