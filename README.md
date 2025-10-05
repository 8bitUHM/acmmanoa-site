# ACM at UH Mānoa Website

This is the official website for the Association for Computing Machinery (ACM) chapter at the University of Hawaiʻi at Mānoa.

## 🚀 Quick Start

### **Prerequisites**
- Python 3.8+ 
- pip (Python package manager)
- Node.js 16+ (for Tailwind CSS compilation)

### **Local Development Setup**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/acmmanoa-site.git
   cd acmmanoa-site
   ```

2. **Create and activate a virtual environment**:
   ```bash
   # On Windows
   python -m venv venv
   venv\Scripts\activate
   
   # On macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Install and build Tailwind CSS**:
   ```bash
   cd theme/static_src
   npm install
   npm run build
   cd ../..
   ```

5. **Run database migrations**:
   ```bash
   python manage.py migrate
   ```

6. **Create a superuser (optional)**:
   ```bash
   python manage.py createsuperuser
   ```

7. **Start the development server**:
   ```bash
   python manage.py runserver
   ```

8. **Access the application**:
   - Website: http://127.0.0.1:8000
   - Admin: http://127.0.0.1:8000/admin

### **Project Structure**

- `website/` - Main Django application
- `core/` - Django project settings
- `theme/` - Tailwind CSS theme and static files
- `static/` - Static files (CSS, JS, images)
- `requirements.txt` - Python dependencies
- `manage.py` - Django management script

### **Technologies Used**

- **Backend**: Django 4.2
- **Frontend**: Tailwind CSS, HTML5, JavaScript
- **Database**: SQLite (development), PostgreSQL (production)
- **Styling**: Custom CSS with Tailwind utilities

### **Development Commands**

```bash
# Run the development server
python manage.py runserver

# Create database migrations
python manage.py makemigrations

# Apply database migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic

# Build Tailwind CSS (if you make changes)
cd theme/static_src && npm run build
```

### **Troubleshooting**

- **Port already in use**: Change the port with `python manage.py runserver 8001`
- **Database errors**: Delete `db.sqlite3` and run `python manage.py migrate` again
- **Static files not loading**: Run `python manage.py collectstatic`
- **Tailwind styles not updating**: Rebuild with `cd theme/static_src && npm run build`

---

### **License**
This project is maintained by ***8bit***.