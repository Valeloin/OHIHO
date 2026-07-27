import type { Metadata } from "next";
import BugTrack from "@/components/BugTrack";

export const metadata: Metadata = {
  title: "BugTrack · OHIHO",
  description:
    "BugTrack, notre outil de suivi des demandes et des anomalies, livré avec les sites que nous développons.",
};

export default function BugTrackPage() {
  return (
    <main>
      <BugTrack />
    </main>
  );
}
