#!/usr/bin/env bash
set -euo pipefail
APP=/opt/acmmanoa-site
cp /tmp/nginx.prod.conf "$APP/nginx.prod.conf"
cp /tmp/base.html "$APP/website/templates/base.html"
cd "$APP"
docker compose -f docker-compose.prod.yml exec -T nginx nginx -t
docker compose -f docker-compose.prod.yml exec -T nginx nginx -s reload
docker compose -f docker-compose.prod.yml restart web
echo "Waiting for web..."
for i in $(seq 1 24); do
  status="$(docker compose -f docker-compose.prod.yml ps --format '{{.Service}} {{.Status}}' | grep '^web ' || true)"
  echo "$status"
  echo "$status" | grep -q healthy && break
  sleep 5
done
echo "=== CSS headers ==="
curl -skI "https://acmmanoa.org/static/css/air-theme.css" | head -15
echo "=== HTML css link ==="
curl -sk "https://acmmanoa.org/" | tr '"' '\n' | grep air-theme | head -5
echo "=== CSS has 252px ==="
curl -sk "https://acmmanoa.org/static/css/air-theme.css?v=20260903c" | grep -c 252px || true
