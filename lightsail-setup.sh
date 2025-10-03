#!/bin/bash

# AWS Lightsail Instance Setup Script
# Run this script on your Lightsail instance to prepare it for deployment

set -e

echo "🚀 Setting up AWS Lightsail instance for ACM at UH Mānoa deployment..."

# Update system packages
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Docker
echo "🐳 Installing Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# Install Docker Compose
echo "🔧 Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Git
echo "📚 Installing Git..."
sudo apt install git -y

# Create application directory
echo "📁 Creating application directory..."
mkdir -p /home/ubuntu/acmmanoa-site
cd /home/ubuntu/acmmanoa-site

# Create environment file template
echo "⚙️ Creating environment file template..."
cat > .env << 'EOF'
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=0
ALLOWED_HOSTS=localhost,127.0.0.1,your-domain.com

# Database Settings
POSTGRES_PASSWORD=your-secure-postgres-password

# Optional: SSL Settings
SSL_CERT_PATH=/etc/nginx/ssl/cert.pem
SSL_KEY_PATH=/etc/nginx/ssl/key.pem
EOF

# Create SSL directory
echo "🔒 Creating SSL directory..."
sudo mkdir -p /etc/nginx/ssl

# Set up firewall
echo "🔥 Configuring firewall..."
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

# Create systemd service for auto-start
echo "🔄 Creating systemd service..."
sudo tee /etc/systemd/system/acmmanoa.service > /dev/null << 'EOF'
[Unit]
Description=ACM at UH Mānoa Application
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/ubuntu/acmmanoa-site
ExecStart=/usr/local/bin/docker-compose -f docker-compose.lightsail.yml up -d
ExecStop=/usr/local/bin/docker-compose -f docker-compose.lightsail.yml down
TimeoutStartSec=0
User=ubuntu

[Install]
WantedBy=multi-user.target
EOF

# Enable the service
sudo systemctl enable acmmanoa.service

# Create backup script
echo "💾 Creating backup script..."
cat > backup.sh << 'EOF'
#!/bin/bash
# Database backup script
BACKUP_DIR="/home/ubuntu/backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup database
docker-compose -f docker-compose.lightsail.yml exec -T db pg_dump -U postgres acmmanoa > $BACKUP_DIR/db_backup_$DATE.sql

# Keep only last 7 days of backups
find $BACKUP_DIR -name "db_backup_*.sql" -mtime +7 -delete

echo "Backup completed: db_backup_$DATE.sql"
EOF

chmod +x backup.sh

# Create log rotation script
echo "📝 Setting up log rotation..."
sudo tee /etc/logrotate.d/acmmanoa > /dev/null << 'EOF'
/home/ubuntu/acmmanoa-site/logs/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 644 ubuntu ubuntu
}
EOF

# Create monitoring script
echo "📊 Creating monitoring script..."
cat > monitor.sh << 'EOF'
#!/bin/bash
# Simple monitoring script

echo "=== ACM at UH Mānoa System Status ==="
echo "Date: $(date)"
echo

echo "=== Docker Containers ==="
docker-compose -f docker-compose.lightsail.yml ps

echo
echo "=== Disk Usage ==="
df -h

echo
echo "=== Memory Usage ==="
free -h

echo
echo "=== Application Health ==="
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://localhost/health/ || echo "Health check failed"

echo
echo "=== Recent Logs ==="
docker-compose -f docker-compose.lightsail.yml logs --tail=10
EOF

chmod +x monitor.sh

# Set proper permissions
echo "🔐 Setting permissions..."
sudo chown -R ubuntu:ubuntu /home/ubuntu/acmmanoa-site

echo "✅ Setup completed successfully!"
echo
echo "📋 Next steps:"
echo "1. Edit .env file with your actual values:"
echo "   nano .env"
echo
echo "2. Clone your repository:"
echo "   git clone https://github.com/yourusername/acmmanoa-site.git ."
echo
echo "3. Start the application:"
echo "   docker-compose -f docker-compose.lightsail.yml up -d"
echo
echo "4. Run initial setup:"
echo "   docker-compose -f docker-compose.lightsail.yml exec web python manage.py migrate"
echo "   docker-compose -f docker-compose.lightsail.yml exec web python manage.py collectstatic --noinput"
echo "   docker-compose -f docker-compose.lightsail.yml exec web python manage.py createsuperuser"
echo
echo "5. Monitor your application:"
echo "   ./monitor.sh"
echo
echo "🔗 Your application will be available at: http://$(curl -s ifconfig.me)"
