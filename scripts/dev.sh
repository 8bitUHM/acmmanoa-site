#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

case "${1:-up}" in
  up)
    docker compose up --build
    ;;
  down)
    docker compose down
    ;;
  migrate)
    docker compose exec web python manage.py migrate
    ;;
  superuser)
    docker compose exec web python manage.py createsuperuser
    ;;
  logs)
    docker compose logs -f "${2:-web}"
    ;;
  *)
    echo "Usage: $0 {up|down|migrate|superuser|logs [service]}"
    exit 1
    ;;
esac
