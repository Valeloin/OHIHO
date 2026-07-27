import type { Metadata } from "next";
import NewTicketForm from "@/components/portail/NewTicketForm";

export const metadata: Metadata = {
  title: "Nouveau ticket · OHIHO",
  robots: { index: false, follow: false },
};

export default function NouveauTicketPage() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold tracking-display">
        Nouveau ticket
      </h1>
      <NewTicketForm />
    </div>
  );
}
