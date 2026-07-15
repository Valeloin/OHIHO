export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  content: string[];
};

export const posts: Post[] = [
  {
    slug: "comprendre-intelligence-artificielle",
    title: "Comprendre l'intelligence artificielle en entreprise",
    excerpt:
      "Les notions essentielles pour parler d'IA sans jargon : ce qu'elle sait faire, ce qu'elle ne sait pas faire, et comment l'aborder sereinement dans votre activité.",
    category: "Intelligence artificielle",
    readTime: "6 min",
    date: "2026-05-12",
    content: [
      "L'intelligence artificielle est souvent présentée comme une rupture radicale. En pratique, il s'agit d'un ensemble d'outils qui automatisent des tâches répétitives, analysent de grands volumes de données ou génèrent du texte et des images à partir d'exemples.",
      "Pour une entreprise, la question n'est pas « faut-il faire de l'IA ? » mais « quel problème concret cherchons-nous à résoudre ? ». Un chatbot de support, un outil de tri de documents ou un assistant de rédaction répondent à des besoins très différents.",
      "Notre rôle chez OHIHO est d'abord pédagogique : démystifier ces outils et identifier les cas d'usage pertinents pour votre activité, avant de parler d'intégration technique.",
      "Trois questions simples permettent de démarrer : quelles tâches répétitives consomment le plus de temps dans vos équipes ? Quelles données fiables avez-vous déjà à disposition ? Et quel niveau de contrôle humain souhaitez-vous garder sur les décisions finales ?",
    ],
  },
  {
    slug: "cybersecurite-bases-pme",
    title: "Cybersécurité pour PME : les bases à ne pas négliger",
    excerpt:
      "Mots de passe, sauvegardes, mises à jour : un tour d'horizon des réflexes simples qui réduisent la majorité des risques informatiques courants.",
    category: "Cybersécurité",
    readTime: "5 min",
    date: "2026-04-03",
    content: [
      "La majorité des incidents de sécurité en entreprise ne viennent pas d'attaques sophistiquées, mais de négligences simples : mots de passe réutilisés, logiciels non mis à jour, ou absence de sauvegarde récente.",
      "Un gestionnaire de mots de passe et l'activation de la double authentification sur les comptes sensibles (messagerie, banque, outils de gestion) réduisent déjà une grande partie du risque.",
      "Les sauvegardes doivent suivre la règle du 3-2-1 : trois copies des données, sur deux supports différents, dont une hors site. C'est ce qui permet de repartir rapidement après un incident, qu'il s'agisse d'une panne matérielle ou d'un rançongiciel.",
      "Enfin, la sensibilisation des équipes reste le levier le plus rentable : savoir reconnaître un email de phishing évite souvent plus de dégâts qu'un outil de sécurité supplémentaire.",
    ],
  },
  {
    slug: "cloud-computing-par-ou-commencer",
    title: "Cloud computing : par où commencer quand on n'y connaît rien",
    excerpt:
      "Stockage en ligne, serveurs distants, SaaS : on remet les choses à plat pour comprendre ce que le cloud change concrètement pour une petite structure.",
    category: "Cloud & infrastructure",
    readTime: "7 min",
    date: "2026-02-18",
    content: [
      "« Le cloud », c'est simplement l'informatique de quelqu'un d'autre : au lieu d'acheter et d'entretenir vos propres serveurs, vous louez de la capacité de calcul, de stockage ou des logiciels déjà installés, accessibles depuis Internet.",
      "Pour une petite entreprise, cela se traduit souvent par des outils du quotidien : messagerie professionnelle, stockage de documents partagés, logiciels de facturation ou de gestion client accessibles depuis n'importe quel poste.",
      "L'avantage principal est de ne plus avoir à gérer soi-même la maintenance matérielle, les mises à jour de sécurité ou les sauvegardes techniques : cela devient la responsabilité du fournisseur, dans le cadre défini par son contrat.",
      "Le point de vigilance porte sur le choix des prestataires, la localisation des données et la réversibilité : pouvoir récupérer facilement ses données si l'on change d'outil. C'est un point que nous vérifions systématiquement avant de recommander une solution à un client.",
    ],
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
