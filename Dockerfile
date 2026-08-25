# ============================================================
# IMAGE DOCKER DU SITE — construction en 3 étapes.
#
# Calquée sur celle du socle vitrine du VPS (~/apps/vitrine) : pas de base
# de données, donc pas de client à générer ni de migration à appliquer au
# démarrage. Le conteneur lance directement le serveur Next.js.
# ============================================================

# ---------- Étape 1 : "deps" — installation des dépendances ----------
FROM node:22-alpine AS deps
WORKDIR /app

# On ne copie que les manifestes : Docker ne ré-exécute cette étape que si
# les dépendances changent (cache de build). Modifier une page ne relance
# donc pas l'installation complète.
COPY package.json package-lock.json ./

# npm ci = installation EXACTE d'après package-lock.json.
# On installe tout, devDependencies incluses : Next, TypeScript et Tailwind
# sont nécessaires au build.
RUN npm ci

# ---------- Étape 2 : "build" — compilation du site ----------
FROM node:22-alpine AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ATTENTION : Next.js FIGE les variables NEXT_PUBLIC_* dans le code au moment
# du build. L'URL publique doit donc être fournie ICI, en argument de build —
# docker-compose.yml la transmet depuis le .env du VPS (voir build.args).
# La changer plus tard OBLIGE à reconstruire l'image.
ARG NEXT_PUBLIC_APP_URL=http://localhost:3000
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}

ENV NODE_ENV=production

RUN npm run build

# ---------- Étape 3 : image finale ----------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# On copie TOUT le résultat du build : code + node_modules + .next.
# --chown=node:node : l'utilisateur non-root "node" doit pouvoir écrire
# dans .next/cache au démarrage du serveur.
COPY --from=build --chown=node:node /app ./

# Sécurité : le serveur ne tourne jamais en root dans le conteneur.
USER node

EXPOSE 3000

# Pas de script d'entrée : rien à préparer avant de démarrer (pas de base).
CMD ["npm", "run", "start"]
