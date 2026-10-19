# **The Association for Computing Machinery at the University of Hawaii at Manoa (ACM)**

This is the ACM website, ported from the old site [here](https://acmmanoa.org/) to Django.  
The old site repository can be found [here](https://github.com/ACManoa/acmanoa.github.io)

## **Table of Contents**
1. [Project Structure](#project-structure)
2. [Getting the App Running](#getting-the-app-running)
3. [Production Deployment](#production-deployment)
4. [Calendar Subscription](#calendar-subscription)

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
  - `docker-compose.yml`: Local development stack (Postgres + Django).
  - `docker-compose.prod.yml`: Production stack (Postgres + Gunicorn + nginx).

---

## **Getting the App Running**

### **Prerequisites**
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows/macOS) or Docker Engine (Linux)

---

### **Setup Instructions**

1. **Clone the repository**

   ```sh
   git clone https://github.com/8bitUHM/acmmanoa-site.git
   cd acmmanoa-site
   ```

2. **Create environment file**

   ```sh
   cp .env.example .env   # macOS/Linux
   copy .env.example .env # Windows
   ```

   Edit `.env` and set at minimum `SECRET_KEY` and `POSTGRES_PASSWORD`.  
   Production secrets can be found in the **acmmanoa** project Discord channel.

3. **Start the development stack**

   ```sh
   docker compose up --build
   ```

   Or use the helper scripts:

   ```sh
   ./scripts/dev.sh up           # macOS/Linux
   .\scripts\dev.ps1 up          # Windows PowerShell
   ```

4. **Create a superuser (optional, for admin access)**

   ```sh
   docker compose exec web python manage.py createsuperuser
   ```

5. **Open the site**

   - App: **[http://127.0.0.1:8000](http://127.0.0.1:8000/)**
   - Admin: **[http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)**

---

### **Development Notes**

- PostgreSQL runs in a Docker container (`db` service); Django runs in the `web` container with source mounted for live reload.
- Optional: create `core/local_settings.py` with `DEBUG = True` if you need to override settings when running outside Docker.
- After model changes:

  ```sh
  docker compose exec web python manage.py makemigrations
  docker compose exec web python manage.py migrate
  ```

- Stop containers: `docker compose down`

---

## **Production Deployment**

Production uses the same PostgreSQL-in-Docker pattern via `docker-compose.prod.yml`. See [deploy/README.md](deploy/README.md) for DigitalOcean VPS setup and GitHub Actions automated deploy.

---

## **Calendar Subscription**

The Events page's **Subscribe to calendar** button opens a software chooser with
instructions for Google Calendar, Apple Calendar on Mac, Apple Calendar on iPhone
or iPad, and Microsoft Outlook on Windows (new and classic). Each option links to
official Google, Apple, or Microsoft help. A copyable feed URL is available, with
manual selection if clipboard access is unavailable. Apple users can also launch
Calendar directly using a `webcal://` link. Google users can open the official
“From URL” settings page, then paste the feed URL.

The public iCalendar feed is:

```text
https://acmmanoa.org/events/calendar.ics
```

On iOS, open Calendar, choose **Calendars → Add Calendar → Add Subscription
Calendar**, and paste the HTTPS URL above. Subscribe rather than importing a
downloaded `.ics` file to receive subsequent updates. Other clients can use the
same URL in their calendar subscription or “From URL” settings.

The feed is generated from the existing Event records, including both general
ACM and SIG events. Admin additions, edits, and deletions appear on the client's
next refresh; refresh frequency is controlled by the calendar app. Past events
remain in the feed. The Events page's filter chips do not filter the subscription,
and recurring SIG meeting schedules are not separate Event records.

Event times are exported in UTC, preserving the Honolulu times entered in admin;
calendar apps display them in the subscriber's chosen time zone. Since events
currently have only a start time, the feed does not invent end times. No database
migration or additional service is needed. Install the updated `requirements.txt`
(or rebuild the Docker image) when deploying.

---

### **License**
This project is maintained by ***8bit***.
