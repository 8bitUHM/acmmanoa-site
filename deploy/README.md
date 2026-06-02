# Deploy to DigitalOcean (automated)

This project ships with Docker Compose, nginx, PostgreSQL, and GitHub Actions for push-to-deploy on a VPS droplet.

## Architecture

```text
Internet → nginx:80 → gunicorn (web) → PostgreSQL (db)
                ↘ static/media volumes
```

Push to `main` runs tests, then SSHs into the droplet, extracts code, writes `.env`, and runs `deploy/deploy.sh`.

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

SSH in as root:

```bash
ssh root@YOUR_DROPLET_IP
```

Clone the repo (or upload `deploy/setup-droplet.sh`) and run bootstrap:

```bash
git clone https://github.com/YOUR_ORG/acmmanoa-site.git /opt/acmmanoa-site
cd /opt/acmmanoa-site
bash deploy/setup-droplet.sh
```

Edit production secrets:

```bash
nano /opt/acmmanoa-site/.env
```

Use `.env.example` as a reference. Set at minimum:

- `SECRET_KEY` — same value you use in production (from your team Discord/vault)
- `POSTGRES_PASSWORD` — strong random password
- `ALLOWED_HOSTS` — comma-separated: domain(s) and droplet IP, e.g. `acmmanoa.org,www.acmmanoa.org,123.45.67.89`

First manual deploy:

```bash
sudo -u deploy bash /opt/acmmanoa-site/deploy/deploy.sh
```

Create an admin user:

```bash
cd /opt/acmmanoa-site
sudo -u deploy docker compose -f docker-compose.prod.yml exec web python manage.py createsuperuser
```

Visit `http://YOUR_DROPLET_IP/` and `http://YOUR_DROPLET_IP/admin/`.

---

## Phase 3: GitHub Actions secrets

In the repo: **Settings → Secrets and variables → Actions**, add:

| Secret | Example |
|--------|---------|
| `DO_HOST` | `123.45.67.89` or `acmmanoa.org` |
| `DO_SSH_USER` | `deploy` (created by setup script) or `root` |
| `DO_SSH_KEY` | Full private key matching the droplet’s authorized key |
| `DO_APP_DIR` | `/opt/acmmanoa-site` (optional; default shown) |
| `SECRET_KEY` | Production Django secret |
| `POSTGRES_PASSWORD` | Same as in server `.env` |
| `ALLOWED_HOSTS` | Same as in server `.env` |

Allow the deploy user to run Docker without a password, or run Actions as `root` (less ideal). The setup script adds `deploy` to the `docker` group.

Add the **public** SSH key to `/home/deploy/.ssh/authorized_keys` (or root’s) for the key used in `DO_SSH_KEY`.

After secrets are set, every push to `main` deploys automatically. You can also run the workflow manually under **Actions → Deploy to DigitalOcean Droplet → Run workflow**.

---

## Manual redeploy on the server

```bash
cd /opt/acmmanoa-site
git pull origin main
bash deploy/deploy.sh
```

---

## HTTPS (recommended next step)

For Let’s Encrypt on the host (simplest path):

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
docker compose -f docker-compose.prod.yml logs -f nginx
curl -v http://127.0.0.1/health/
```

**502 / connection refused:** wait for `web` healthcheck; check `docker compose logs web`.

**DisallowedHost:** add your domain/IP to `ALLOWED_HOSTS` in `.env` and redeploy.

**Database errors:** ensure `POSTGRES_PASSWORD` matches in `.env` and was set before the first `docker compose up` (or reset the postgres volume if you changed it after initial create).
