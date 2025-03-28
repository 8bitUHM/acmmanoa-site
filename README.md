# Django Starter Template App with db-file-store, Whitenoise & Deployment to Vercel

1. [Contents](#contents)
3. [How to Use](#how-to-use)

## Contents

This devplate contains a start Django project with Whitenoise, db-file-store(https://github.com/shortxmas/db_file_store) and deployment to Vercel

## How to Use

1. Make sure you have python installed
2. Run ```python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'``` to generate a project secret_key then add to .env as SECRET_KEY
3. Create local_settings.py file in core and add local development configuration
```
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

DEBUG=True

DATABASES = {
  "default":{
    'ENGINE': 'django.db.backends.sqlite3',
    'NAME': BASE_DIR / 'db.sqlite3',
  }
}

```
3. Run ```pip install -r requirements.txt``` or ```pip3 install -r requirements.txt``` 
4. Run ```python manage.py runserver``` or ```python3 manage.py runserver``` to start the app locally
5. Edit the Database config in settings.py starting at line 90 for production database, make sure to use ENV variables as well

