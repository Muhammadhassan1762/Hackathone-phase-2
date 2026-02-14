"""
Simple test to verify backend components are working correctly.
"""
import sys
import os

# Add backend directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def test_imports():
    """Test that all core backend modules can be imported."""
    print("Testing backend imports...")

    try:
        from main import app
        print("OK FastAPI app import successful")
    except Exception as e:
        print(f"X Failed to import app: {e}")
        return False

    try:
        from config import settings
        print("OK Settings import successful")
    except Exception as e:
        print(f"X Failed to import settings: {e}")
        return False

    try:
        from db import engine, get_session
        print("OK Database import successful")
    except Exception as e:
        print(f"X Failed to import database: {e}")
        return False

    try:
        from models.task import Task, TaskCreate, TaskUpdate, TaskResponse
        print("OK Task models import successful")
    except Exception as e:
        print(f"X Failed to import task models: {e}")
        return False

    try:
        from routes.tasks import router
        print("OK Task routes import successful")
    except Exception as e:
        print(f"X Failed to import task routes: {e}")
        return False

    try:
        from middleware.auth import get_current_user
        print("OK Auth middleware import successful")
    except Exception as e:
        print(f"X Failed to import auth middleware: {e}")
        return False

    try:
        from routes.auth import router as auth_router
        print("OK Auth routes import successful")
    except Exception as e:
        print(f"X Failed to import auth routes: {e}")
        return False

    print("\nAll imports successful! Backend components are working.")
    return True

def test_database_connection():
    """Test basic database connection."""
    print("\nTesting database connection...")
    try:
        from db import engine
        from sqlmodel import text

        # Test the connection
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            print("OK Database connection successful")
            return True
    except Exception as e:
        print(f"X Database connection failed: {e}")
        return False

def test_task_operations():
    """Test basic task operations."""
    print("\nTesting task operations...")
    try:
        from models.task import TaskCreate
        from datetime import datetime

        # Test creating a task object
        task_data = TaskCreate(
            title="Test Task",
            description="This is a test task",
            priority="medium",
            due_date=datetime.now().isoformat()
        )

        print("OK Task creation successful")
        return True
    except Exception as e:
        print(f"X Task operations failed: {e}")
        return False

if __name__ == "__main__":
    print("Running backend verification tests...\n")

    # Run all tests
    import_success = test_imports()
    db_success = test_database_connection() if import_success else False
    task_success = test_task_operations() if import_success else False

    print(f"\nResults:")
    print(f"- Import tests: {'PASS' if import_success else 'FAIL'}")
    print(f"- Database tests: {'PASS' if db_success else 'FAIL'}")
    print(f"- Task tests: {'PASS' if task_success else 'FAIL'}")

    if import_success and db_success and task_success:
        print("\nSUCCESS: All backend tests passed! Ready to run the server.")
    else:
        print("\nERROR: Some tests failed. Please check the backend setup.")
        sys.exit(1)