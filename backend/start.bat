@echo off
echo Starting Todo Application Backend...

REM Activate virtual environment if it exists
if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate.bat
) else if exist "env\Scripts\activate.bat" (
    call env\Scripts\activate.bat
)

REM Install dependencies if not already installed
pip show fastapi >nul 2>&1
if errorlevel 1 (
    echo Installing dependencies...
    pip install -r requirements.txt
)

REM Run database migrations
echo Running database migrations...
python init_db.py

REM Start the development server
echo Starting server on http://localhost:8000
uvicorn main:app --host 0.0.0.0 --port 8000 --reload