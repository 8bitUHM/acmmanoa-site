#!/usr/bin/env bash
set -euo pipefail
cd /opt/acmmanoa-site
for i in $(seq 1 18); do
  status="$(docker compose -f docker-compose.prod.yml ps --format '{{.Service}} {{.Status}}' | grep '^web ' || true)"
  echo "$status"
  if echo "$status" | grep -q healthy; then
    break
  fi
  sleep 10
done

echo "=== HTTP redirect ==="
curl -sI http://acmmanoa.org/ | head -n 8
echo "=== HTTPS apex ==="
curl -sI https://acmmanoa.org/ | head -n 15
echo "=== HTTPS www ==="
curl -sI https://www.acmmanoa.org/ | head -n 10
echo "=== HTTPS health ==="
curl -sk https://acmmanoa.org/health/
echo
echo "=== Containers ==="
docker compose -f docker-compose.prod.yml ps
