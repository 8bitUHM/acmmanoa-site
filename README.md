# **The Association for Computing Machinery at the University of Hawaii at Manoa (ACM)**

This is the ACM website, ported from the old site [here](https://acmmanoa.org/) to Django.  
The old site repository can be found [here]()

## **Table of Contents**
1. [Project Structure](#project-structure)
2. [Getting the App Running](#getting-the-app-running)

---

## **Project Structure**

The project is organized into several components:

- **`core/`**: The main Django project directory.
  - `settings.py`: Configuration settings for the project, including database settings, middleware, installed apps, and other configurations.
  - `urls.py`: URL configuration for the project, mapping URLs to views.

- **`db_file_storage/`**: A file storage system that allows storing files as raw bytes and mimetypes in the database.

- **`website/`**: The Django app for the website.
  - `migrations/`: Database migration files.
  - `static/`: Static files (CSS, JavaScript, images).
  - `templates/`: HTML templates.
  - `admin.py`: Admin interface configuration.
  - `forms.py`: Defines forms for user input and validation.
  - `models.py`: Defines database structure and interactions.
  - `serializers.py`: Converts complex data types into JSON, XML, or other formats.
  - `tests.py`: Unit tests.
  - `urls.py`: URL configuration for the website app.
  - `views.py`: Handles HTTP requests and returns responses.

- **Project root files:**
  - `manage.py`: Django’s command-line utility for administrative tasks.
  - `requirements.txt`: Contains project dependencies.

---

## **Getting the App Running**

### **Prerequisites**
Ensure you have **Python 3.8+** installed. You can check your Python version with:

```sh
python --version
```

or

```sh
python3 --version
```

If Python is not installed, download and install it from [python.org](https://www.python.org/downloads/).

---

### **Setup Instructions**

1. **Clone the repository**  
   Open a terminal and run:

   ```sh
   git clone https://github.com/your-repo/acmmanoa-site.git
   cd acmmanoa-site
   ```

2. **Create a virtual environment (recommended)**  
   ```sh
   python -m venv venv
   source venv/bin/activate  # On macOS/Linux
   venv\Scripts\activate  # On Windows
   ```

3. **Install dependencies**  
   ```sh
   pip install -r requirements.txt
   ```

4. **Create a local settings file**  
   Inside the `core/` directory, create a new file named `local_settings.py` and add the following:

   ```python
   from pathlib import Path

   BASE_DIR = Path(__file__).resolve().parent.parent

   DEBUG = True

   DATABASES = {
       "default": {
           "ENGINE": "django.db.backends.sqlite3",
           "NAME": BASE_DIR / "db.sqlite3",
       }
   }
   ```

5. **Create a `.env` file**  
   In the `core/` directory, create a new file named `.env` and add the required environment variables.  
   These variables can be found in the *acmmanoa* project Discord channel.

6. **Apply database migrations**  
   ```sh
   python manage.py migrate
   ```

7. **Collect static files**  
   ```sh
   python manage.py collectstatic
   ```

8. **Create a superuser (optional, for admin access)**  
   ```sh
   python manage.py createsuperuser
   ```
   Follow the prompts to set up an admin account.

9. **Run the development server**  
   ```sh
   python manage.py runserver
   ```
   The app should now be running locally at **[http://127.0.0.1:8000](http://127.0.0.1:8000/)**.

---

### **Development Notes**
- The **admin panel** is accessible at **[http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)**.
- If you make changes to the models, run:

  ```sh
  python manage.py makemigrations
  python manage.py migrate
  ```

- If you add new static files, re-run:

  ```sh
  python manage.py collectstatic
  ```

---

### **License**
This project is maintained by ***8bit***.
