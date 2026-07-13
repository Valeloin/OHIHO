"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "@/lib/tickets/constants";

export default function TicketFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function setFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-3">
      <select
        defaultValue={searchParams.get("status") ?? ""}
        onChange={(e) => setFilter("status", e.target.value)}
        className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent-cyan"
      >
        <option value="">Tous les statuts</option>
        {STATUS_OPTIONS.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <select
        defaultValue={searchParams.get("priority") ?? ""}
        onChange={(e) => setFilter("priority", e.target.value)}
        className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent-cyan"
      >
        <option value="">Toutes les priorités</option>
        {PRIORITY_OPTIONS.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
