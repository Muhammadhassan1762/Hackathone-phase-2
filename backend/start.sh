#!/bin/bash
# Startup script for the backend

echo "Starting Todo Application Backend..."

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    source venv/bin/activate
elif [ -d "env" ]; then
    source env/bin/activate
fi

# Install dependencies if not already installed
if ! pip show fastapi >/dev/null 2>&1; then
    echo "Installing dependencies..."
    pip install -r requirements.txt
fi

# Run database migrations
echo "Running database migrations..."
python init_db.py

# Start the development server
echo "Starting server on http://localhost:8000"
uvicorn main:app --host 0.0.0.0 --port 8000 --reload