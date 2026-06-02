#!/usr/bin/env bash
# One-time bootstrap for a fresh Ubuntu DigitalOcean droplet.
# Run as root: curl -fsSL ... | bash   OR   bash deploy/setup-droplet.sh
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/acmmanoa-site}"
DEPLOY_USER="${DEPLOY_USER:-deploy}"
COMPOSE_FILE="docker-compose.prod.yml"

echo "==> Updating system packages..."
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get upgrade -y

echo "==> Installing Docker..."
if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sh
fi

echo "==> Installing Git and utilities..."
apt-get install -y git curl ufw

if ! id "$DEPLOY_USER" &>/dev/null; then
  echo "==> Creating deploy user: $DEPLOY_USER"
  useradd -m -s /bin/bash "$DEPLOY_USER"
fi
usermod -aG docker "$DEPLOY_USER"

echo "==> Creating application directory: $APP_DIR"
mkdir -p "$APP_DIR"
mkdir -p "$APP_DIR/ssl"
chown -R "$DEPLOY_USER:$DEPLOY_USER" "$APP_DIR"

echo "==> Configuring firewall..."
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo "==> Installing systemd service..."
cat > /etc/systemd/system/acmmanoa.service <<EOF
[Unit]
Description=ACM at UH Manoa web application
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$APP_DIR
ExecStart=/usr/bin/docker compose -f $COMPOSE_FILE up -d
ExecStop=/usr/bin/docker compose -f $COMPOSE_FILE down
TimeoutStartSec=0
User=$DEPLOY_USER
Group=$DEPLOY_USER

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable acmmanoa.service

if [[ ! -f "$APP_DIR/.env" ]]; then
  echo "==> Creating .env template at $APP_DIR/.env"
  cp "$APP_DIR/.env.example" "$APP_DIR/.env" 2>/dev/null || cat > "$APP_DIR/.env" <<'ENVEOF'
SECRET_KEY=CHANGE_ME
DEBUG=0
ALLOWED_HOSTS=yourdomain.com
POSTGRES_DB=acmmanoa
POSTGRES_USER=postgres
POSTGRES_PASSWORD=CHANGE_ME
ENVEOF
  chown "$DEPLOY_USER:$DEPLOY_USER" "$APP_DIR/.env"
  chmod 600 "$APP_DIR/.env"
fi

echo ""
echo "Bootstrap complete."
echo ""
echo "Next steps:"
echo "  1. Edit secrets:  nano $APP_DIR/.env"
echo "  2. Clone repo:    sudo -u $DEPLOY_USER git clone <your-repo-url> $APP_DIR"
echo "  3. First deploy:  sudo -u $DEPLOY_USER bash $APP_DIR/deploy/deploy.sh"
echo "  4. Create admin:  sudo -u $DEPLOY_USER docker compose -f $APP_DIR/$COMPOSE_FILE exec web python manage.py createsuperuser"
