import Image from "next/image";

type Props = {
  /** Taille de l'anneau en pixels. Le texte suit. */
  size?: number;
  className?: string;
};

// Anneau du logo + wordmark. Le « I » est la seule lettre en dégradé : c'est
// l'une des quatre occurrences autorisées du dégradé de marque (voir
// l'en-tête de globals.css).
export default function Wordmark({ size = 28, className = "" }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/logo-mark.svg"
        alt=""
        width={size}
        height={size}
        priority
        style={{ width: size, height: size }}
      />
      <span
        className="font-medium tracking-[0.06em]"
        style={{ fontSize: Math.round(size * 0.68) }}
      >
        OH<span className="accent-text">I</span>HO
      </span>
    </span>
  );
}
