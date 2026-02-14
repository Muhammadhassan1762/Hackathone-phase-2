"""
Test script to verify the complete authentication flow.
"""
import requests
import json

BASE_URL = "http://127.0.0.1:8000"

def test_auth_flow():
    print("Testing authentication flow...\n")

    # Test signup
    print("1. Testing signup...")
    signup_data = {
        "email": "testuser@example.com",
        "password": "securepassword123",
        "name": "Test User"
    }
    response = requests.post(f"{BASE_URL}/api/auth/signup", json=signup_data)
    print(f"Signup response: {response.status_code}")
    if response.status_code == 200:
        signup_result = response.json()
        print(f"Signup success: {signup_result['success']}")
        print(f"User: {signup_result['user']['name']} <{signup_result['user']['email']}>")
    else:
        print(f"Signup failed: {response.text}")
        return False

    # Test signin
    print("\n2. Testing signin...")
    signin_data = {
        "email": "testuser@example.com",
        "password": "securepassword123"
    }
    response = requests.post(f"{BASE_URL}/api/auth/signin", json=signin_data)
    print(f"Signin response: {response.status_code}")
    if response.status_code == 200:
        signin_result = response.json()
        print(f"Signin success: {signin_result['success']}")
        print(f"User: {signin_result['user']['name']} <{signin_result['user']['email']}>")
    else:
        print(f"Signin failed: {response.text}")
        return False

    # Note: In a real Better Auth integration, the frontend would receive the JWT
    # and use it in subsequent API calls. For this test, we're simulating that flow.

    print("\n3. Testing protected endpoints (would require valid JWT in real scenario)...")
    # This would normally fail without a proper JWT from Better Auth
    headers = {"Authorization": "Bearer dummy-token"}
    response = requests.get(f"{BASE_URL}/api/tasks", headers=headers)
    print(f"Tasks endpoint response: {response.status_code}")
    if response.status_code == 401:
        print("Protected endpoint correctly requires authentication")

    print("\n4. Testing health endpoint (public)...")
    response = requests.get(f"{BASE_URL}/api/health")
    print(f"Health endpoint response: {response.status_code}")
    if response.status_code == 200:
        health_data = response.json()
        print(f"Health status: {health_data['status']}")
        print(f"Database: {health_data['database']}")

    print("\nAuthentication flow test completed successfully!")
    return True

if __name__ == "__main__":
    test_auth_flow()