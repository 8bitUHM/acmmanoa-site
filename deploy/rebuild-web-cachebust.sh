#!/usr/bin/env bash
set -euo pipefail
cd /opt/acmmanoa-site
# Ensure host files are current
cp /tmp/base.html website/templates/base.html
cp /tmp/nginx.prod.conf nginx.prod.conf

echo "==> Rebuilding web image (templates are baked into image)..."
docker compose -f docker-compose.prod.yml up -d --build web
echo "==> Waiting for healthy web..."
for i in $(seq 1 36); do
  status="$(docker compose -f docker-compose.prod.yml ps --format '{{.Service}} {{.Status}}' | grep '^web ' || true)"
  echo "$status"
  echo "$status" | grep -q healthy && break
  sleep 5
done

docker compose -f docker-compose.prod.yml up -d nginx
sleep 2

echo "=== container base.html ==="
docker compose -f docker-compose.prod.yml exec -T web grep air-theme /app/website/templates/base.html
echo "=== live HTML ==="
curl -sk https://acmmanoa.org/ | tr '"' '\n' | grep air-theme | head -5
echo "=== live CSS markers ==="
curl -sk 'https://acmmanoa.org/static/css/air-theme.css?v=20260903c' | grep -E '252px|max-height:min|foot-credit-link' | head -10
echo "=== footer on live site ==="
curl -sk https://acmmanoa.org/ | tr '>' '\n' | grep -E 'foot-credit|8bit|Made with' | head -10
