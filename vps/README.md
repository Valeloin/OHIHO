# Mettre ohiho.fr en ligne sur le VPS

Migration depuis Vercel vers le serveur OVH `137.74.166.6`, qui héberge déjà
bugtrack.fr et les sous-domaines ohiho.fr.

**Ce serveur héberge des sites en production — ne jamais casser l'existant.**
La règle absolue : on **ajoute** un bloc au Caddyfile, on ne réécrit jamais le fichier.

---

## Comment le serveur est organisé

- Accès : `ssh ubuntu@137.74.166.6`, `sudo` sans mot de passe.
- **Caddy** est installé comme service système (pas en conteneur) et détient les
  ports 80/443. C'est lui qui obtient les certificats HTTPS tout seul et qui
  distribue les visiteurs vers le bon site selon le nom de domaine demandé.
- Chaque site vit dans `~/apps/<nom>/` avec son propre `docker-compose`, et écoute
  sur un port local à lui, **uniquement sur `127.0.0.1`**.

### Ports attribués

| Port | Site |
|---|---|
| 3000 | bugtrack.fr (SaaS) |
| 3001 | socle.ohiho.fr (socle SaaS) |
| 3002 | myprospect.ohiho.fr |
| 3003 | homelab.ohiho.fr |
| 3004 | vitrine.ohiho.fr (socle vitrine) |
| 3005 | mycalories.ohiho.fr |
| 3006 | **ohiho.fr** ← ce site |

**Tenir ce tableau à jour** en ajoutant chaque nouveau site : deux sites sur le
même port ne démarreraient pas.

---

## Première installation

### 1. Envoyer le code

Depuis ce dossier, sur le poste de travail :

```bash
ssh ubuntu@137.74.166.6 'git init --bare ~/apps/ohiho.git'
git remote add vps ubuntu@137.74.166.6:apps/ohiho.git
git push vps HEAD:main
ssh ubuntu@137.74.166.6 'cd ~/apps && git clone ohiho.git ohiho'
```

### 2. Créer le fichier `.env` sur le serveur

Contenu, d'après `.env.example` :

```
APP_NAME="ohiho"
APP_PORT="3006"
NEXT_PUBLIC_APP_URL="https://ohiho.fr"
RESEND_API_KEY="re_..."
EMAIL_FROM="Formulaire OHIHO <contact@ohiho.fr>"
CONTACT_EMAIL="valentin.condamy@ohiho.fr"
EN_CONSTRUCTION=true
```

Puis restreindre les droits : `chmod 600 ~/apps/ohiho/.env`.

`EN_CONSTRUCTION` reste à `true` tant que les mentions légales ne sont pas
complètes. Le passer à `false` **suffit à ouvrir le site** : il n'y a pas
besoin de reconstruire l'image, la variable est lue à chaque requête.

### 3. Construire et démarrer

```bash
ssh ubuntu@137.74.166.6 'cd ~/apps/ohiho && docker compose build && docker compose up -d'
ssh ubuntu@137.74.166.6 'curl -s localhost:3006/api/health'
```

La sonde doit répondre `{"status":"ok","url":"https://ohiho.fr"}`. Si elle
affiche `localhost`, le `.env` a été rempli après le build : refaire
`docker compose build && docker compose up -d`.

### 4. Basculer le DNS (chez le registrar)

`ohiho.fr` pointe aujourd'hui sur Vercel. Dans la zone DNS :

- enregistrement **A** pour `@` → `137.74.166.6` ;
- enregistrement **A** pour `www` → `137.74.166.6` (remplace le CNAME Vercel).

Compter jusqu'à quelques heures de propagation. Le site reste servi par
Vercel pendant ce temps : aucune coupure.

### 5. Ajouter le bloc Caddy — APRÈS la bascule DNS

**Caddy ne peut pas obtenir le certificat tant que le domaine ne pointe pas
sur le serveur**, et les échecs répétés comptent dans les quotas Let's Encrypt.
Faire l'étape 4 en premier, et vérifier que `dig +short ohiho.fr` renvoie bien
`137.74.166.6` avant de continuer.

```bash
ssh ubuntu@137.74.166.6 'sudo cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.sauvegarde-$(date +%F)'
```

Bloc à ajouter **à la fin** du fichier :

```
ohiho.fr, www.ohiho.fr {
	encode zstd gzip

	header {
		Strict-Transport-Security "max-age=31536000; includeSubDomains"
		X-Frame-Options "DENY"
		X-Content-Type-Options "nosniff"
		Referrer-Policy "strict-origin-when-cross-origin"
		-Server
	}

	reverse_proxy 127.0.0.1:3006

	handle_errors {
		@indisponible expression {err.status_code} in [502, 503, 504]
		respond @indisponible "Le site est momentanement indisponible. Reessayez dans quelques instants." 503
	}
}
```

Valider **avant** de recharger — c'est ce qui évite de faire tomber les autres sites :

```bash
ssh ubuntu@137.74.166.6 'sudo caddy validate --config /etc/caddy/Caddyfile'
ssh ubuntu@137.74.166.6 'sudo systemctl reload caddy'
```

### 6. Vérifier

- `https://ohiho.fr` s'affiche en HTTPS (cadenas dans le navigateur).
- `https://ohiho.fr/api/health` répond `{"status":"ok","url":"https://ohiho.fr"}`.
- Envoyer un vrai message via le formulaire de contact et vérifier qu'il arrive,
  et que « Répondre » vise bien le visiteur.
- Ajouter le site à UptimeRobot sur `/api/health`.
- Supprimer le projet sur Vercel une fois la bascule confirmée, pour ne pas
  laisser deux déploiements du même site en vie.

---

## Mettre à jour le site

Depuis ce dossier, sur le poste de travail :

```bash
git add -A && git commit -m "Description de la modification"
git push vps HEAD:main
bash scripts/deploy.sh
```

Le script reconstruit, redémarre, vérifie que le site répond, et affiche la
procédure de retour en arrière en cas d'échec.
