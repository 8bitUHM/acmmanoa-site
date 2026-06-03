# Use the official Python image from the Docker Hub
FROM python:3.12-slim

# Project secret key define for build argument
ARG PROJECT_SECRET
ARG BUILD_DATE
ARG VERSION

# Set environment variables for Python to run in unbuffered mode
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV DEBIAN_FRONTEND=noninteractive

# Set the working directory within the container
WORKDIR /app

# Install system dependencies including PostgreSQL client
RUN apt-get update && apt-get install -y \
    curl \
    postgresql-client \
    build-essential \
    libpq-dev \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better Docker layer caching
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy app into image
COPY . /app/

# Install Node.js dependencies for Tailwind CSS
WORKDIR /app/theme/static_src
RUN npm install

# Build Tailwind CSS
RUN npm run build

# Change back to the app directory
WORKDIR /app

# Collect static files
RUN python manage.py collectstatic --noinput

# Create a non-root user for security
RUN adduser --disabled-password --gecos '' appuser
RUN chown -R appuser:appuser /app
USER appuser

# Expose port 8000 for the Django application
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/ || exit 1

# Command to run the Django application with gunicorn for production
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "--timeout", "120", "core.wsgi:app"]
