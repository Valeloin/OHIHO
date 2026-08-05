const services = [
  {
    number: "01",
    title: "Landing page",
    text: "Une page précise, pensée pour transformer une visite en prise de contact.",
    delay: "1—2 semaines",
  },
  {
    number: "02",
    title: "Site vitrine",
    text: "Un site complet qui raconte votre activité et inspire confiance dès le premier regard.",
    delay: "3—4 semaines",
  },
  {
    number: "03",
    title: "Refonte",
    text: "Une nouvelle identité, de meilleures performances et une expérience mobile irréprochable.",
    delay: "2—4 semaines",
  },
  {
    number: "04",
    title: "Application web",
    text: "Un outil métier sur mesure : espace client, réservation, dashboard ou plateforme interne.",
    delay: "Sur devis",
  },
];

const steps = [
  ["01", "Échange", "On clarifie vos objectifs, votre public et les contours du projet."],
  ["02", "Direction", "Je transforme vos idées en une direction visuelle et un devis clair."],
  ["03", "Création", "Le site prend forme avec des points d’étape simples et réguliers."],
  ["04", "Mise en ligne", "Je déploie, vérifie et reste disponible pour faire évoluer votre projet."],
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
        <a className="header-cta" href="#contact">Parlons de votre projet <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <h1 className="sr-only">OHIHO — Sites web et applications sur mesure</h1>
        <div className="hero-media" aria-label="Aperçu de la direction artistique OHIHO">
          <img src="/hero-main.png" alt="Construisons quelque chose de remarquable — direction artistique OHIHO" />
          <div className="fireflies" aria-hidden="true">
            {Array.from({ length: 18 }, (_, index) => <span key={index} />)}
          </div>
          <div className="hero-studio"><span /> Studio web indépendant · Montpellier</div>
          <a className="hero-contact" href="#contact">Parlons de votre projet <span>↗</span></a>
        </div>
      </section>

      <section className="service-preview" aria-label="Aperçu animé des services OHIHO">
        <div className="preview-title-stack" aria-live="off">
          <span>Landing page</span><span>Site intermédiaire</span><span>Refonte de site</span><span>Application web</span>
        </div>
        <div className="preview-progress" aria-hidden="true"><i/><i/><i/><i/></div>
        <div className="preview-browser">
          <div className="browser-top"><div className="browser-dots"><i/><i/><i/></div><span>votre-projet.fr</span></div>
          <div className="preview-stage">
            <div className="preview-scene scene-landing">
              <div className="mock-nav"/><div className="mock-hero-lines"><i/><i/><i/></div><div className="mock-cta"/>
              <div className="mock-card"><b/><i/><i/></div><div className="mock-check">✓</div>
            </div>
            <div className="preview-scene scene-pages">
              <div className="mock-nav wide"/><div className="page-grid"><i/><i/><i/><i/><i/><i/></div><div className="mock-cursor">↖</div>
            </div>
            <div className="preview-scene scene-refonte">
              <div className="before-panel"><small>Avant</small><i/><i/><i/></div><div className="after-panel"><small>Après</small><i/><i/><i/></div><div className="shine"/>
            </div>
            <div className="preview-scene scene-app">
              <div className="app-side"><i/><i/><i/><i/></div><div className="app-main"><div className="app-kpis"><i/><i/><i/></div><div className="app-chart"><b/><b/><b/><b/><b/></div><div className="app-line"/></div>
            </div>
          </div>
        </div>
        <div className="preview-caption"><span>Une page, un objectif</span><span>Plusieurs pages</span><span>Un site à rafraîchir</span><span>Sur mesure</span></div>
      </section>

      <section className="intro section-pad">
        <p className="section-label">Le studio</p>
        <div className="intro-copy">
          <h2>De l’idée à la mise en ligne,<br /><span>un seul interlocuteur.</span></h2>
          <div>
            <p>OHIHO accompagne entreprises et indépendants dans la création d’expériences web singulières. Pas de solution générique : chaque détail répond à votre histoire, vos objectifs et vos utilisateurs.</p>
            <a className="text-link" href="#contact">Démarrer un projet <span>↗</span></a>
          </div>
        </div>
      </section>

      <section className="services section-pad" id="services">
        <div className="section-head">
          <p className="section-label">Ce que je crée</p>
          <p className="section-count">04 expertises</p>
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
          <h2>Simple.<br />Transparent.<br /><em>Humain.</em></h2>
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
          <p className="section-label">Projets choisis</p>
          <p className="section-count">Réalisations récentes</p>
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
          <h2>Construisons quelque<br />chose de <em>remarquable.</em></h2>
          <div className="contact-side">
            <p>Une idée, une refonte ou simplement une question ? Écrivez-moi. Je vous réponds sous 24h ouvrées.</p>
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
