# ACM at UH Mānoa Website

This is the official website for the Association for Computing Machinery (ACM) chapter at the University of Hawaiʻi at Mānoa.

## 🚀 Deployment

This project is configured for automated deployment to AWS Lightsail using GitHub Actions and Docker Compose.

### Quick Start

1. **Local Development**:
   ```bash
   docker-compose -f docker-compose.lightsail.yml up -d
   ```

2. **Production Deployment**:
   - Push to `main` branch
   - GitHub Actions automatically deploys to AWS Lightsail

### 📁 Project Structure

- `docker-compose.lightsail.yml` - Production deployment configuration
- `nginx.lightsail.conf` - Nginx reverse proxy configuration
- `lightsail-setup.sh` - AWS Lightsail instance setup script
- `LIGHTSAIL_DEPLOYMENT_GUIDE.md` - Complete deployment guide

### 🔧 Technologies

- **Backend**: Django 4.2
- **Frontend**: Tailwind CSS
- **Database**: PostgreSQL
- **Web Server**: Nginx + Gunicorn
- **Deployment**: Docker Compose on AWS Lightsail
- **CI/CD**: GitHub Actions

### 📖 Documentation

See `LIGHTSAIL_DEPLOYMENT_GUIDE.md` for complete deployment instructions.

---

## **Development Setup**

### **Prerequisites**
- Python 3.12+
- Docker & Docker Compose
- Node.js 18+ (for Tailwind CSS)

### **Local Development**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/acmmanoa-site.git
   cd acmmanoa-site
   ```

2. **Create environment file**:
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

3. **Run with Docker**:
   ```bash
   docker-compose -f docker-compose.lightsail.yml up -d
   ```

4. **Access the application**:
   - Website: http://localhost:8000
   - Admin: http://localhost:8000/admin

### **Manual Setup (Alternative)**

1. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   cd theme/static_src && npm install
   ```

2. **Build Tailwind CSS**:
   ```bash
   cd theme/static_src && npm run build
   ```

3. **Run migrations**:
   ```bash
   python manage.py migrate
   ```

4. **Start development server**:
   ```bash
   python manage.py runserver
   ```

---

### **License**
This project is maintained by ***8bit***.