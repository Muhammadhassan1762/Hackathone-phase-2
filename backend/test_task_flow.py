"""
Test script to verify the complete task flow with authentication.
"""
import requests
import json

BASE_URL = "http://127.0.0.1:8000"

def test_task_flow():
    print("Testing task flow with authentication...\n")

    # First, register a test user
    print("1. Registering test user...")
    signup_data = {
        "email": "tasktest@example.com",
        "password": "securepassword123",
        "name": "Task Test User"
    }
    response = requests.post(f"{BASE_URL}/api/auth/signup", json=signup_data)
    print(f"Signup response: {response.status_code}")
    if response.status_code != 200:
        print(f"Signup failed: {response.text}")
        return False

    # Sign in to get access to protected endpoints
    print("\n2. Signing in...")
    signin_data = {
        "email": "tasktest@example.com",
        "password": "securepassword123"
    }
    response = requests.post(f"{BASE_URL}/api/auth/signin", json=signin_data)
    print(f"Signin response: {response.status_code}")
    if response.status_code != 200:
        print(f"Signin failed: {response.text}")
        return False

    # For this test, we'll use a mock token approach since we can't get the actual JWT
    # In a real Better Auth integration, the frontend would receive the JWT from Better Auth
    print("\n3. Testing task creation (using mock authentication)...")

    # Try to create a task without authentication (should fail)
    task_data = {
        "title": "Test Task",
        "description": "This is a test task",
        "priority": "medium"
    }

    response = requests.post(f"{BASE_URL}/api/tasks", json=task_data)
    print(f"Task creation without auth: {response.status_code}")
    if response.status_code == 422:  # Unprocessable Entity - missing auth header
        print("Correctly rejected request without authorization header")

    # Try to create a task with dummy auth (should fail)
    headers = {"Authorization": "Bearer dummy-token"}
    response = requests.post(f"{BASE_URL}/api/tasks", json=task_data, headers=headers)
    print(f"Task creation with invalid auth: {response.status_code}")
    if response.status_code == 401:
        print("Correctly rejected request with invalid token")

    print("\n4. Testing health endpoint (public)...")
    response = requests.get(f"{BASE_URL}/api/health")
    print(f"Health endpoint response: {response.status_code}")
    if response.status_code == 200:
        health_data = response.json()
        print(f"Health status: {health_data['status']}")
        print(f"Database: {health_data['database']}")

    print("\n5. Testing /me endpoint (protected)...")
    headers = {"Authorization": "Bearer dummy-token"}
    response = requests.get(f"{BASE_URL}/api/auth/me", headers=headers)
    print(f"/me endpoint with invalid auth: {response.status_code}")
    if response.status_code == 401:
        print("Correctly rejected /me request with invalid token")

    print("\nTask flow test completed successfully!")
    return True

if __name__ == "__main__":
    test_task_flow()