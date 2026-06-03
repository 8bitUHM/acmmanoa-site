# Deploy to DigitalOcean (automated)

This project ships with Docker Compose, nginx, PostgreSQL, and GitHub Actions for push-to-deploy on a VPS droplet.

## Architecture

PostgreSQL runs **inside Docker** on the same droplet (not an external/managed database):

```text
Internet → nginx:80 → gunicorn (web) → PostgreSQL (db container)
                ↘ static/media volumes
```

Push to `main` runs tests, then SSHs into the droplet, extracts code, writes `.env`, and runs `deploy/deploy.sh`.

---

## Environment variables

Same keys in dev (`.env` + `docker-compose.yml`) and prod (`.env` + `docker-compose.prod.yml`):

| Variable | Dev (local) | Production (server) | GitHub Secret |
|----------|-------------|---------------------|---------------|
| `SECRET_KEY` | dev value | production value | `SECRET_KEY` |
| `DEBUG` | `1` | `0` | hardcoded `0` in workflow |
| `ALLOWED_HOSTS` | `127.0.0.1,localhost` | IP + domain | `ALLOWED_HOSTS` |
| `POSTGRES_DB` | `acmmanoa` | `acmmanoa` | hardcoded in workflow |
| `POSTGRES_USER` | `postgres` | `postgres` | hardcoded in workflow |
| `POSTGRES_PASSWORD` | dev password | strong password | `POSTGRES_PASSWORD` |
| `POSTGRES_HOST` | `db` | `db` | hardcoded in workflow |
| `POSTGRES_PORT` | `5432` | `5432` | hardcoded in workflow |

Copy [.env.example](../.env.example) as a starting point.

---

## Phase 1: Create the droplet

1. In [DigitalOcean](https://cloud.digitalocean.com/), create a **Droplet**:
   - **Image:** Ubuntu 22.04 or 24.04 LTS
   - **Size:** at least 1 GB RAM (2 GB recommended)
   - **Authentication:** SSH key (recommended) or password
2. Point your domain’s **A record** at the droplet IP (optional but recommended).
3. Open firewall ports **22**, **80**, **443** in the DO cloud firewall if you use one.

---

## Phase 2: Bootstrap the server (one time)

SSH in as `deploy` (or root for initial setup):

```bash
git clone https://github.com/8bitUHM/acmmanoa-site.git /opt/acmmanoa-site
cd /opt/acmmanoa-site
bash deploy/setup-droplet.sh
```

Edit production secrets:

```bash
nano /opt/acmmanoa-site/.env
```

Set at minimum:

- `SECRET_KEY` — production Django secret
- `DEBUG=0`
- `POSTGRES_PASSWORD` — strong random password
- `POSTGRES_HOST=db`
- `ALLOWED_HOSTS` — comma-separated: domain(s) and droplet IP

First manual deploy:

```bash
bash /opt/acmmanoa-site/deploy/deploy.sh
```

Create an admin user:

```bash
cd /opt/acmmanoa-site
docker compose -f docker-compose.prod.yml exec web python manage.py createsuperuser
```

Visit `http://YOUR_DROPLET_IP/` and `http://YOUR_DROPLET_IP/admin/`.

---

## Phase 3: GitHub Actions secrets

In the repo: **Settings → Secrets and variables → Actions**, add:

| Secret | Example |
|--------|---------|
| `DO_HOST` | `123.45.67.89` or `acmmanoa.org` |
| `DO_SSH_USER` | `deploy` |
| `DO_SSH_KEY` | Full private key matching the droplet’s authorized key |
| `DO_APP_DIR` | `/opt/acmmanoa-site` (optional) |
| `SECRET_KEY` | Production Django secret |
| `POSTGRES_PASSWORD` | Same as in server `.env` |
| `ALLOWED_HOSTS` | Same as in server `.env` |

After secrets are set, every push to `main` deploys automatically.

---

## Manual redeploy on the server

```bash
cd /opt/acmmanoa-site
git pull origin main
bash deploy/deploy.sh
```

---

## HTTPS (recommended next step)

For Let’s Encrypt on the host:

```bash
apt install certbot
certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com
```

Copy certs into `/opt/acmmanoa-site/ssl/` and extend `nginx.prod.conf` with a `listen 443 ssl` server block, then:

```bash
docker compose -f docker-compose.prod.yml restart nginx
```

---

## Troubleshooting

```bash
cd /opt/acmmanoa-site
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f web
docker compose -f docker-compose.prod.yml logs -f db
docker compose -f docker-compose.prod.yml logs -f nginx
curl -v http://127.0.0.1/health/
```

**502 / connection refused:** wait for `web` healthcheck; check `docker compose logs web`.

**DisallowedHost:** add your domain/IP to `ALLOWED_HOSTS` in `.env` and redeploy.

**Database errors:** ensure `POSTGRES_PASSWORD` matches in `.env` and was set before the first `docker compose up`. The `db` container stores data in a Docker volume — changing the password after first boot requires resetting the volume or updating Postgres manually.
