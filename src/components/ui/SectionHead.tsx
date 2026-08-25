import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  kicker: string;
  title: ReactNode;
  lede?: string;
  /** Sur fond bleu nuit, le libellé et le texte d'intro s'éclaircissent. */
  onDeep?: boolean;
};

// En-tête de section : le même patron partout (libellé mono, titre, intro).
// C'est ce qui donne son pas régulier à la page.
export default function SectionHead({ kicker, title, lede, onDeep }: Props) {
  return (
    <Reveal className="max-w-3xl">
      <p className={`kicker ${onDeep ? "text-on-deep-muted" : ""}`}>{kicker}</p>
      <h2 className="h-section mt-5">{title}</h2>
      {lede ? (
        <p className={`lede mt-5 ${onDeep ? "text-on-deep-muted" : ""}`}>
          {lede}
        </p>
      ) : null}
    </Reveal>
  );
}
