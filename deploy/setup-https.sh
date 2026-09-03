#!/usr/bin/env bash
# Issue / renew Let's Encrypt certs and install them for nginx.
# Run as deploy (Docker group required). Temporarily stops nginx for --standalone.
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/acmmanoa-site}"
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"
EMAIL="${CERTBOT_EMAIL:-admin@acmmanoa.org}"
DOMAINS=(-d acmmanoa.org -d www.acmmanoa.org)

cd "$APP_DIR"
COMPOSE=(docker compose -f "$COMPOSE_FILE")

mkdir -p "$APP_DIR/ssl" "$APP_DIR/letsencrypt"

echo "==> Stopping nginx (port 80 needed for standalone challenge)..."
"${COMPOSE[@]}" stop nginx || true

echo "==> Requesting certificates..."
docker run --rm \
  -p 80:80 \
  -v "$APP_DIR/letsencrypt:/etc/letsencrypt" \
  certbot/certbot certonly --standalone \
  "${DOMAINS[@]}" \
  --email "$EMAIL" \
  --agree-tos \
  --non-interactive \
  --keep-until-expiring \
  --preferred-challenges http

echo "==> Installing certs for nginx..."
# Certbot writes root-owned files; copy via container so deploy user can install them
docker run --rm \
  -v "$APP_DIR/letsencrypt:/etc/letsencrypt:ro" \
  -v "$APP_DIR/ssl:/out" \
  alpine:3.20 \
  sh -c "cp /etc/letsencrypt/live/acmmanoa.org/fullchain.pem /out/cert.pem && \
         cp /etc/letsencrypt/live/acmmanoa.org/privkey.pem /out/key.pem && \
         chmod 644 /out/cert.pem && chmod 600 /out/key.pem"

echo "==> Starting nginx..."
"${COMPOSE[@]}" up -d nginx

echo "==> Done. Test: curl -I https://acmmanoa.org/"
