#!/usr/bin/env bash
set -euo pipefail
cd /opt/acmmanoa-site
echo "=== host nginx static block ==="
grep -A6 'location /static/' nginx.prod.conf
echo "=== recreate nginx ==="
docker compose -f docker-compose.prod.yml up -d --force-recreate nginx
sleep 4
echo "=== container nginx static block ==="
docker compose -f docker-compose.prod.yml exec -T nginx grep -A6 'location /static/' /etc/nginx/nginx.conf
echo "=== CSS headers ==="
curl -skI https://acmmanoa.org/static/css/air-theme.css | head -15
echo "=== HTML css href ==="
curl -sk https://acmmanoa.org/ | tr '"' '\n' | grep air-theme | head -5
echo "=== web template base ==="
grep air-theme website/templates/base.html
docker compose -f docker-compose.prod.yml exec -T web grep air-theme /app/website/templates/base.html || true
