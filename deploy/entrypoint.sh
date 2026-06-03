#!/usr/bin/env bash
set -euo pipefail

cd /app

echo "Waiting for database..."
until python - <<'PY'
import os
import psycopg2

psycopg2.connect(
    dbname=os.environ["POSTGRES_DB"],
    user=os.environ["POSTGRES_USER"],
    password=os.environ["POSTGRES_PASSWORD"],
    host=os.environ.get("POSTGRES_HOST", "db"),
    port=os.environ.get("POSTGRES_PORT", "5432"),
)
PY
do
  sleep 2
done

echo "Running migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

exec "$@"
