# Use the official Python image from the Docker Hub
FROM python:3.12-slim

ARG PROJECT_SECRET
ARG BUILD_DATE
ARG VERSION

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /app

RUN apt-get update && apt-get install -y \
    curl \
    postgresql-client \
    build-essential \
    libpq-dev \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

WORKDIR /app/theme/static_src
RUN npm install && npm run build

WORKDIR /app

# Placeholder for collectstatic at build time (runtime uses .env)
ENV SECRET_KEY=build-time-placeholder
RUN python manage.py collectstatic --noinput

RUN chmod +x /app/deploy/entrypoint.sh

RUN adduser --disabled-password --gecos '' appuser
RUN chown -R appuser:appuser /app
USER appuser

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:8000/health/ || exit 1

ENTRYPOINT ["/app/deploy/entrypoint.sh"]
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "2", "--timeout", "120", "core.wsgi:app"]
