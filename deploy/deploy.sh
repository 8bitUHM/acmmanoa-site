#!/usr/bin/env bash
# Run on the VPS from the app root (e.g. /opt/acmmanoa-site).
# Used by GitHub Actions and for manual deploys.
set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$APP_DIR"

COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"
COMPOSE=(docker compose -f "$COMPOSE_FILE")

if [[ ! -f .env ]]; then
  echo "Missing .env in $APP_DIR. Copy .env.example and fill in values."
  exit 1
fi

echo "==> Pulling latest code (if git repo)..."
if [[ -d .git ]]; then
  git fetch --all
  git reset --hard "${DEPLOY_REF:-origin/main}"
fi

echo "==> Building and starting containers..."
"${COMPOSE[@]}" up -d --build --remove-orphans

echo "==> Waiting for database..."
for i in {1..30}; do
  if "${COMPOSE[@]}" exec -T db pg_isready -U "${POSTGRES_USER:-postgres}" >/dev/null 2>&1; then
    break
  fi
  sleep 2
done

echo "==> Running migrations..."
"${COMPOSE[@]}" exec -T web python manage.py migrate --noinput

echo "==> Collecting static files..."
"${COMPOSE[@]}" exec -T web python manage.py collectstatic --noinput

echo "==> Container status:"
"${COMPOSE[@]}" ps

echo "==> Health check..."
curl -fsS "http://127.0.0.1/health/" >/dev/null && echo "OK: nginx /health/"

echo "Deploy finished."
