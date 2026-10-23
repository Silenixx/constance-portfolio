#!/usr/bin/env bash
set -euo pipefail

########################################
#  CONFIG
########################################
DOMAIN_FR=${DOMAIN_FR:-constance.lukasblanchot.fr}
DOMAIN_COM=${DOMAIN_COM:-constance.lukasblanchot.com}
CONTAINER=${CONTAINER:-constance_nginx}

# Colors
GREEN="\e[32m"
RED="\e[31m"
YELLOW="\e[33m"
BLUE="\e[36m"
NC="\e[0m"

########################################
#  LOGGING HELPERS
########################################
info()  { echo -e "${BLUE}==>${NC} $1"; }
ok()    { echo -e "${GREEN}✔${NC} $1"; }
warn()  { echo -e "${YELLOW}⚠${NC} $1"; }
err()   { echo -e "${RED}✘${NC} $1"; exit 1; }

########################################
# 0) PRECHECKS
########################################
info "0) Préchecks"

command -v docker >/dev/null || err "Docker requis"
command -v docker compose >/dev/null || err "Docker Compose requis"

cd "$(dirname "$0")"

[ -f docker-compose.yml ] || err "docker-compose.yml introuvable"
[ -f nginx/conf.d/default.conf ] || err "nginx/conf.d/default.conf introuvable"
[ -f package.json ] || err "package.json introuvable"

########################################
# 0.5) Vérification réseau web
########################################
info "Vérification réseau 'web'"

if ! docker network inspect web >/dev/null 2>&1; then
  warn "Réseau 'web' manquant → création"
  docker network create web >/dev/null
  ok "Réseau créé"
else
  ok "Réseau OK"
fi

########################################
# 0.6) Vérifier que Traefik tourne
########################################
info "Vérification Traefik"

if ! docker ps --format '{{.Names}}' | grep -q "^traefik$"; then
  err "Traefik non lancé. Lancer via : cd /var/www/traefik && docker compose up -d"
fi
ok "Traefik est actif"

########################################
# 1) Build Vite
########################################
info "1) Build Vite (npm ci + build)"

docker run --rm \
  -v "$(pwd):/var/www/app" \
  -w /var/www/app \
  node:20 bash -lc "
    set -e
    npm ci
    npm run build
  "

[ -f dist/index.html ] || err "dist/index.html introuvable après build"

# le container Node écrit en root → on rend dist/ et node_modules à l’utilisateur
sudo chown -R "$(id -u):$(id -g)" dist node_modules 2>/dev/null || \
  chown -R "$(id -u):$(id -g)" dist node_modules
ok "Build Vite terminé"

########################################
# 2) Docker compose up
########################################
info "2) Démarrage stack Docker (Nginx + Traefik labels)"

docker compose up -d --force-recreate
docker compose exec -T "$CONTAINER" nginx -s reload >/dev/null 2>&1 || true

ok "Stack démarrée"

########################################
# 3) Tests rapides internes
########################################
info "3) Tests rapides Nginx (interne conteneur)"

docker compose exec -T "$CONTAINER" nginx -t \
  && ok "Config Nginx OK" \
  || err "Config Nginx invalide"

docker compose exec -T "$CONTAINER" wget -q -O /dev/null http://127.0.0.1/ \
  && ok "Nginx répond en interne" \
  || warn "Nginx interne ne répond pas (voir logs: docker logs -f ${CONTAINER})"

########################################
# 4) Tests rapides via domaines (optionnel)
########################################
info "4) Tests rapides via domaines (HTTPS)"

curl -fsI "https://${DOMAIN_FR}/" >/dev/null \
  && ok "HTTPS OK → https://${DOMAIN_FR}/" \
  || warn "HTTPS KO sur ${DOMAIN_FR} (DNS, propagation ou certificat ?)"

curl -fsI "https://${DOMAIN_COM}/" >/dev/null \
  && ok "HTTPS OK → https://${DOMAIN_COM}/" \
  || warn "HTTPS KO sur ${DOMAIN_COM} (DNS, propagation ou certificat ?)"

########################################
# FIN
########################################
ok "Déploiement terminé → ${GREEN}https://${DOMAIN_FR}/${NC} (et .com)"
