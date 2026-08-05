import Image from "next/image";
import LinkedInQr from "@/components/LinkedInQr";
import type { ContactContent } from "@/lib/content/types";

export default function ContactSection({ data }: { data: ContactContent }) {
  const linkedin = data.linkedinUrl || "https://www.linkedin.com/in/valentin-condamy-966656423/";

  return (
    <section className="codex-contact" id="contact">
      <div className="codex-contact-waves" aria-hidden="true"><i /><i /><i /></div>
      <div className="codex-contact-flies" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => <span key={index} />)}
      </div>

      <div className="codex-contact-head">
        <p>Votre projet</p>
        <span>Disponible pour de nouveaux projets</span>
      </div>

      <div className="codex-contact-grid">
        <div className="codex-contact-main">
          <h2><span>Un projet</span><span>en tête&nbsp;?</span><em>Parlons-en.</em></h2>
          <p>Une idée à lancer, un site à repenser ou un outil à imaginer&nbsp;? Racontez-moi où vous en êtes. Je vous réponds avec un premier regard clair et des pistes concrètes.</p>
          <div className="codex-contact-answer"><i />{data.responseNote || "Réponse sous 24h ouvrées"}</div>
        </div>

        <div className="codex-contact-core" aria-hidden="true">
          <Image src="/logo-mark.svg" alt="" width={72} height={72} />
          <span><i />Une idée</span>
          <span><i />Un échange</span>
          <span><i />Un projet</span>
          <b />
        </div>

        <div className="codex-contact-side">
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="codex-linkedin-card" aria-label={`Ouvrir le profil LinkedIn de ${data.personName}`}>
            <span className="codex-linkedin-head"><i>in</i><span><small>Le plus simple pour commencer</small><b>Échangeons sur LinkedIn</b></span><strong>↗</strong></span>
            <span className="codex-qr-frame"><LinkedInQr url={linkedin} size={300} /></span>
            <span className="codex-linkedin-copy"><span><b>{data.personName || "Valentin Condamy"}</b><small>Fondateur &amp; designer-développeur · OHIHO</small></span><strong>Scannez<br />ou cliquez <i>↗</i></strong></span>
          </a>
        </div>
      </div>

      <div className="codex-contact-footer">
        <p><span>01</span>Premier échange libre, sans engagement.</p>
        <div><span>Site vitrine</span><i /><span>Landing page</span><i /><span>Refonte</span><i /><span>Application web</span></div>
      </div>
    </section>
  );
}
