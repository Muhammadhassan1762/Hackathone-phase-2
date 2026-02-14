"""
Start script for the Todo API backend server.
"""
import uvicorn
import sys
import os

# Add backend directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def main():
    """Start the FastAPI server."""
    print("Starting Todo API server...")
    print("Loading configuration...")

    try:
        from config import settings
        print(f"Server will run on {settings.host}:{settings.port}")
        print(f"Environment: {'production' if settings.is_production else 'development'}")

        # Start the server
        uvicorn.run(
            "main:app",
            host=settings.host,
            port=settings.port,
            reload=not settings.is_production,
            log_level="info"
        )
    except ImportError as e:
        print(f"Failed to import configuration: {e}")
        print("Make sure all dependencies are installed: pip install -r requirements.txt")
        sys.exit(1)
    except Exception as e:
        print(f"Failed to start server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()