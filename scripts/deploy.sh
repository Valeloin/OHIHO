#!/usr/bin/env bash
# ============================================================
# DÉPLOIEMENT / MISE À JOUR DE ohiho.fr — à lancer DEPUIS le poste de travail.
#
#   bash scripts/deploy.sh
#
# Les valeurs par défaut ci-dessous peuvent être surchargées ponctuellement :
#   BRANCH=refonte-ciel bash scripts/deploy.sh
#
# Ce que fait ce script, via SSH :
#   1. Récupère la dernière version du code (git)
#   2. Reconstruit l'image Docker
#   3. Redémarre le conteneur
#   4. Vérifie que le site répond (/api/health) — ÉCHOUE BRUYAMMENT sinon,
#      en affichant la marche à suivre pour revenir en arrière
#
# Prérequis : le site a déjà été installé une première fois sur le VPS
# (voir vps/README.md, section « Première installation »).
# ============================================================
set -euo pipefail

VPS_HOST="${VPS_HOST:-ubuntu@137.74.166.6}"
APP_DIR="${APP_DIR:-~/apps/ohiho}"
BRANCH="${BRANCH:-main}"

echo "=== Déploiement de ${APP_DIR} sur ${VPS_HOST} (branche ${BRANCH}) ==="

# Tout le bloc ci-dessous s'exécute SUR LE VPS. Le délimiteur entre
# apostrophes ('SCRIPT_DISTANT') envoie le texte tel quel : les variables
# $1/$2 sont interprétées côté serveur, pas côté poste de travail.
ssh "${VPS_HOST}" bash -s -- "${APP_DIR}" "${BRANCH}" <<'SCRIPT_DISTANT'
set -euo pipefail
APP_DIR="$1"
BRANCH="$2"

# Le "~" éventuel de APP_DIR est remplacé par le vrai dossier personnel
# (un ~ entre guillemets n'est pas résolu automatiquement par le shell).
cd "${APP_DIR/#\~/$HOME}"

echo "--- Récupération du code (origin/${BRANCH}) ---"
git fetch origin "${BRANCH}"
git reset --hard "origin/${BRANCH}"
echo "Version déployée : $(git log --oneline -1)"

echo "--- Construction de l'image Docker (peut prendre quelques minutes) ---"
docker compose build --pull

echo "--- Redémarrage du conteneur ---"
docker compose up -d

echo "--- Attente du démarrage (8 s) ---"
sleep 8

# Nom du conteneur = <APP_NAME>-app (APP_NAME lu dans le .env du VPS).
APP_NAME="$(grep -E '^APP_NAME=' .env | tail -n 1 | cut -d= -f2- | tr -d '"' || true)"
APP_NAME="${APP_NAME:-ohiho}"
CONTENEUR="${APP_NAME}-app"

echo "--- Test de santé de ${CONTENEUR} (/api/health) ---"
# L'image Alpine n'a pas curl : on essaie wget, puis node en dernier recours.
verifier_sante() {
  docker exec "${CONTENEUR}" sh -c '
    if command -v wget >/dev/null 2>&1; then
      wget -q -O - http://localhost:3000/api/health
    else
      node -e "fetch(\"http://localhost:3000/api/health\").then(r=>{if(!r.ok)process.exit(1);return r.text()}).then(t=>console.log(t)).catch(()=>process.exit(1))"
    fi'
}

SANTE_OK=0
for tentative in 1 2 3; do
  if REPONSE="$(verifier_sante)"; then
    SANTE_OK=1
    echo ""
    echo "Réponse du site : ${REPONSE}"
    break
  fi
  echo "Tentative ${tentative}/3 échouée, nouvel essai dans 5 s…"
  sleep 5
done

if [ "${SANTE_OK}" -ne 1 ]; then
  echo ""
  echo "!!! ÉCHEC DU DÉPLOIEMENT : le site ne répond pas sur /api/health !!!"
  echo "Dernières lignes de journal :"
  docker compose logs --tail=50 app
  echo ""
  echo "Cause la plus fréquente : NEXT_PUBLIC_APP_URL absente ou pointant"
  echo "encore vers localhost dans le .env (le garde-fou bloque alors le site)."
  echo ""
  echo "ROLLBACK (retour à la version précédente) — sur le VPS :"
  echo "  cd ${APP_DIR}"
  echo "  git log --oneline -5              # repérer le commit précédent"
  echo "  git reset --hard <commit_precedent>"
  echo "  docker compose build && docker compose up -d"
  exit 1
fi

echo ""
echo "=== Déploiement réussi ==="
echo "En cas de problème constaté APRÈS coup, ROLLBACK — sur le VPS :"
echo "  cd ${APP_DIR}"
echo "  git log --oneline -5"
echo "  git reset --hard <commit_precedent>"
echo "  docker compose build && docker compose up -d"
SCRIPT_DISTANT
