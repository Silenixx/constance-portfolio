# constance-portfolio

> **À lire avant ce fichier :** [README général](../README.md) — infra VPS, Traefik, configs TVDB, particularités des autres stacks. Un README projet ne suffit pas.

**Cible :** [constance.lukasblanchot.fr](https://constance.lukasblanchot.fr/) (et `.com`)  
**Chemin VPS :** `/var/www/constance-portfolio`

Portfolio de Constance Tahay, design d’objet. Page unique : présentation, parcours, projets, formation, compétences, contact.

Le stack Docker est prêt. Le site n’est en ligne qu’après copie du dossier sur le VPS, enregistrements DNS, puis `./deploy.sh`.

---

## Stack

| Couche | Techno |
|--------|--------|
| Front | React 19, Vite 7, CSS modules |
| Prod | Build Node éphémère → `nginx:alpine` sert `dist/`, Traefik, TLS Let’s Encrypt |

Pas d’API, pas de base.

---

## Architecture

```
deploy.sh → node:20 (npm ci && npm run build) → ./dist
Navigateur
  → Traefik (HTTPS)
    → constance_nginx
      → ./dist
```

Pas de Dockerfile applicatif. Compose monte `dist/` et `nginx/conf.d/`. `dist/` est gitignoré : le deploy rebuild.

Réseau Docker externe `web`. Hosts figés dans `docker-compose.yml` :

- `constance.lukasblanchot.fr`
- `constance.lukasblanchot.com`

Inclus dans `traefik/deploytotal.sh`.

---

## Fonctionnalités

- Page unique, navigation par ancres
- Accueil avec des pièces découpées que l’on peut déplacer
- Grille de projets filtrable (objets, jeux, illustration, édition, identités). Une fiche par projet : galerie, texte, lien vers le PDF pour les livrets et affiches.
- À propos : parcours, formation, compétences. Contact (mail, téléphone, Instagram, LinkedIn, CV).
- Tout le contenu (textes, projets, parcours) est dans `src/data/site.js`.
- Images : les originaux restent dans `public/projets/`, `public/communication/` et `public/logos/`. Le site affiche des versions web (`public/img/`, WebP 640 et 1600 px) fabriquées par `npm run images`. À relancer après l’ajout d’une image, puis commiter `public/img/` et `src/data/images.json`.

---

## Local

```bash
npm install
npm run dev
```

[http://localhost:5173](http://localhost:5173)

---

## Production

Avant le premier passage en ligne :

1. Enregistrements DNS **A** (ou AAAA) de `constance.lukasblanchot.fr` et `constance.lukasblanchot.com` vers le VPS. Let’s Encrypt (challenge HTTP) échoue tant que le nom ne résout pas.
2. Copier ce dossier vers `/var/www/constance-portfolio` (même nom que les autres stacks).
3. Traefik déjà lancé (`/var/www/traefik`).

Puis, sur le VPS :

```bash
cd /var/www/constance-portfolio
./deploy.sh
```

`deploytotal.sh` redéploie aussi ce stack, une fois le dossier présent. S’il est absent, l’étape est ignorée.

---

## Points d’attention

- Canonical et Open Graph dans `index.html` pointent vers `https://constance.lukasblanchot.fr/`. Un autre domaine demande de les aligner avec les labels Traefik.
- `public/` est recopié tel quel dans `dist/`. `outils-pedagogiques/peda1.JPG` (~9,6 Mo) et d’autres fichiers ne sont pas affichés par le site, mais partent quand même en ligne.
- `react-router-dom` est dans `package.json` et n’est pas utilisé : la navigation reste en ancres.
- Pas de secret. Ne rien ajouter dans un `.env` pour ce stack.
