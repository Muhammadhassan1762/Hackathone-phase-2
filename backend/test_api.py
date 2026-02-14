"""
Test script to verify API endpoints and authentication flow.
"""
import requests
import json
import time

BASE_URL = "http://localhost:8000"

def test_health_endpoint():
    """Test the health endpoint."""
    print("Testing health endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/api/health")
        print(f"Health check: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Status: {data.get('status', 'unknown')}")
            print(f"Database: {data.get('database', 'unknown')}")
            return True
        else:
            print(f"Health check failed: {response.text}")
            return False
    except Exception as e:
        print(f"Error testing health endpoint: {e}")
        return False

def test_auth_endpoints():
    """Test authentication endpoints."""
    print("\nTesting auth endpoints...")

    # Test signup endpoint (should return 501 as it's redirected to Better Auth)
    try:
        response = requests.post(f"{BASE_URL}/api/auth/signup", json={
            "email": "test@example.com",
            "password": "password123",
            "name": "Test User"
        })
        print(f"Signup endpoint: {response.status_code}")
        if response.status_code == 501:
            print("Signup correctly redirects to Better Auth")
        else:
            print(f"Unexpected signup response: {response.status_code}")
    except Exception as e:
        print(f"Error testing signup endpoint: {e}")

    # Test signin endpoint (should return 501 as it's redirected to Better Auth)
    try:
        response = requests.post(f"{BASE_URL}/api/auth/signin", json={
            "email": "test@example.com",
            "password": "password123"
        })
        print(f"Signin endpoint: {response.status_code}")
        if response.status_code == 501:
            print("Signin correctly redirects to Better Auth")
        else:
            print(f"Unexpected signin response: {response.status_code}")
    except Exception as e:
        print(f"Error testing signin endpoint: {e}")

def test_protected_endpoints_without_auth():
    """Test that protected endpoints require authentication."""
    print("\nTesting protected endpoints without auth...")

    # Try to access tasks endpoint without auth
    try:
        response = requests.get(f"{BASE_URL}/api/tasks")
        print(f"Tasks endpoint without auth: {response.status_code}")
        if response.status_code == 401:
            print("Tasks endpoint correctly requires authentication")
        else:
            print(f"Tasks endpoint should require auth but returned: {response.status_code}")
    except Exception as e:
        print(f"Error testing tasks endpoint: {e}")

    # Try to access user profile endpoint without auth
    try:
        response = requests.get(f"{BASE_URL}/api/auth/me")
        print(f"Profile endpoint without auth: {response.status_code}")
        if response.status_code == 401:
            print("Profile endpoint correctly requires authentication")
        else:
            print(f"Profile endpoint should require auth but returned: {response.status_code}")
    except Exception as e:
        print(f"Error testing profile endpoint: {e}")

def test_api_docs():
    """Test that API documentation is available."""
    print("\nTesting API documentation...")

    try:
        response = requests.get(f"{BASE_URL}/docs")
        print(f"Swagger docs: {response.status_code}")
        if response.status_code == 200:
            print("API documentation is accessible")
        else:
            print(f"API docs not accessible: {response.status_code}")
    except Exception as e:
        print(f"Error accessing API docs: {e}")

    try:
        response = requests.get(f"{BASE_URL}/redoc")
        print(f"ReDoc: {response.status_code}")
        if response.status_code == 200:
            print("ReDoc is accessible")
        else:
            print(f"ReDoc not accessible: {response.status_code}")
    except Exception as e:
        print(f"Error accessing ReDoc: {e}")

def main():
    """Run all tests."""
    print("Starting API endpoint tests...\n")

    # Wait a moment for the server to be ready (if running)
    time.sleep(1)

    # Run tests
    health_ok = test_health_endpoint()
    test_auth_endpoints()
    test_protected_endpoints_without_auth()
    test_api_docs()

    print(f"\nHealth endpoint test: {'PASS' if health_ok else 'FAIL'}")
    print("\nManual verification needed:")
    print("- Start the backend server: cd backend && python start_server.py")
    print("- Start the frontend server: cd frontend && npm run dev")
    print("- Access the app at http://localhost:3001")
    print("- Test signup/signin through the UI (handled by Better Auth)")
    print("- Verify task management works after authentication")

if __name__ == "__main__":
    main()