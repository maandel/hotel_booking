#!/usr/bin/env bash
# exit on error
set -o errexit

# Install Poetry
pip install poetry==1.8.3

# Install dependencies
poetry install --no-root

# Navigate to the Django project directory
cd myhotel

# Run migrations
poetry run python manage.py migrate

# Collect static files
poetry run python manage.py collectstatic --noinput