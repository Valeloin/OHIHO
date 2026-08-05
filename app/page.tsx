import HeroShowcase from "./components/HeroShowcase";

const services = [
  {
    number: "01",
    title: "Landing page",
    text: "Une page pour présenter une offre clairement et obtenir plus de demandes.",
    delay: "1—2 semaines",
  },
  {
    number: "02",
    title: "Site vitrine",
    text: "Un site complet pour expliquer votre activité, rassurer et faciliter la prise de contact.",
    delay: "3—4 semaines",
  },
  {
    number: "03",
    title: "Refonte",
    text: "Un site plus clair, plus rapide et plus simple à utiliser, sur mobile comme sur ordinateur.",
    delay: "2—4 semaines",
  },
  {
    number: "04",
    title: "Application web",
    text: "Un outil adapté à votre façon de travailler : espace client, réservation ou gestion interne.",
    delay: "Sur devis",
  },
];

const steps = [
  ["01", "Cadrage", "On précise ce que le site doit faire, pour qui et avec quelles priorités."],
  ["02", "Proposition", "Vous recevez une direction claire, un périmètre précis et un devis détaillé."],
  ["03", "Conception", "Je conçois et développe le site. Vous suivez l’avancement à chaque étape."],
  ["04", "Mise en ligne", "Je vérifie, publie et vous accompagne pour la prise en main et la suite."],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Ohiho, accueil">
          <img className="brand-logo" src="/logo-mark.svg" alt="" />
          <span>OHIHO</span>
        </a>
        <nav aria-label="Navigation principale">
          <a href="#services">Services</a>
          <a href="#methode">Méthode</a>
          <a href="#realisations">Réalisations</a>
        </nav>
        <a className="header-cta" href="#contact">Discuter de votre projet <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <h1 className="sr-only">OHIHO — Sites web et applications sur mesure</h1>
        <div className="hero-media" aria-label="Aperçu de la direction artistique OHIHO">
          <img src="/hero-main.png" alt="Construisons quelque chose de remarquable — direction artistique OHIHO" />
          <div className="fireflies" aria-hidden="true">
            {Array.from({ length: 18 }, (_, index) => <span key={index} />)}
          </div>
          <div className="hero-studio"><span /> Studio web indépendant · Montpellier</div>
          <a className="hero-contact" href="#contact">Discuter de votre projet <span>↗</span></a>
        </div>
      </section>

      <section className="service-preview" aria-label="Aperçu animé des services OHIHO">
        <div className="claude-preview-title" aria-hidden="true">
          <span className="pv-title-1">Landing page</span><span className="pv-title-2">Site intermédiaire</span><span className="pv-title-3">Refonte de site</span><span className="pv-title-4">Application web</span>
        </div>
        <div className="claude-preview-progress" aria-hidden="true">
          {[1, 2, 3, 4].map((scene) => <i key={scene}><span className={`pv-scene-${scene}`} /></i>)}
        </div>
        <div className="claude-preview-frame"><HeroShowcase /></div>
        <div className="claude-preview-caption" aria-hidden="true">
          <span className="pv-title-1">Présenter une offre et générer des contacts</span><span className="pv-title-2">Expliquer votre activité sans perdre le visiteur</span><span className="pv-title-3">Repartir sur une base claire et efficace</span><span className="pv-title-4">Un outil construit autour de vos besoins</span>
        </div>
      </section>

      <section className="intro section-pad">
        <p className="section-label">Le studio</p>
        <div className="intro-copy">
          <h2>Un site utile à votre activité.<br /><span>Un seul interlocuteur.</span></h2>
          <div>
            <p>Je conçois et développe des sites et des applications web pour les entreprises et les indépendants. L’objectif : présenter votre offre clairement, faciliter les contacts et vous donner un outil simple à faire évoluer.</p>
            <a className="text-link" href="#contact">Me parler de votre projet <span>↗</span></a>
          </div>
        </div>
      </section>

      <section className="services section-pad" id="services">
        <div className="section-head">
          <p className="section-label">Les solutions</p>
          <p className="section-count">Selon vos besoins</p>
        </div>
        <div className="service-list">
          {services.map((service) => (
            <article className="service-row" key={service.number}>
              <span className="service-number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <span className="service-delay">{service.delay}</span>
              <span className="service-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="method section-pad" id="methode">
        <div className="method-title">
          <p className="section-label light">La méthode</p>
          <h2>Vous savez<br />où l’on va.<br /><em>Et pourquoi.</em></h2>
        </div>
        <div className="steps">
          {steps.map(([number, title, text]) => (
            <article className="step" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="work section-pad" id="realisations">
        <div className="section-head">
          <p className="section-label">Réalisations</p>
          <p className="section-count">Des projets concrets</p>
        </div>
        <div className="project-grid">
          <a className="project project-cadance" href="https://cadance-coaching.vercel.app" target="_blank" rel="noreferrer">
            <div className="project-visual">
              <span className="cadance-c">C</span>
              <div className="project-tag">Site vitrine · Sport</div>
            </div>
            <div className="project-info"><h3>Cadance Coaching</h3><span>Design · Développement · Admin ↗</span></div>
          </a>
          <a className="project project-bug" href="https://www.ohiho.fr/bugtrack" target="_blank" rel="noreferrer">
            <div className="project-visual">
              <div className="bug-window">
                <div className="bug-dots"><i/><i/><i/></div>
                <div className="bug-content"><span/><span/><span/></div>
              </div>
              <div className="project-tag">Application web · SaaS</div>
            </div>
            <div className="project-info"><h3>BugTrack</h3><span>Produit · UX/UI · Développement ↗</span></div>
          </a>
        </div>
      </section>

      <section className="contact section-pad" id="contact">
        <p className="section-label light">Votre projet</p>
        <div className="contact-copy">
          <h2>Un projet en tête ?<br /><em>Parlons-en.</em></h2>
          <div className="contact-side">
            <p>Expliquez-moi votre besoin, même s’il n’est pas encore complètement défini. Je vous réponds sous 24 heures ouvrées.</p>
            <a className="mail-link" href="mailto:valentin.condamy@ohiho.fr">valentin.condamy@ohiho.fr <span>↗</span></a>
          </div>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><img className="brand-logo" src="/logo-mark.svg" alt="" /><span>OHIHO</span></a>
        <div className="footer-meta"><span>Valentin Condamy · Montpellier</span><span>© 2026 OHIHO</span><a href="https://www.linkedin.com/in/valentin-condamy-966656423/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
      </footer>
    </main>
  );
}
