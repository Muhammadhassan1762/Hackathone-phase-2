import jwt
from datetime import datetime, timedelta
from config import settings
from typing import Dict, Any


def decode_jwt(token: str) -> Dict[str, Any]:
    """
    Decode and verify JWT token.
    Raises jwt exceptions if invalid.
    """
    payload = jwt.decode(
        token,
        settings.better_auth_secret,
        algorithms=["HS256"]
    )
    return payload


def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    """
    Create a JWT access token.
    """
    to_encode = data.copy()

    # Set expiration
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=30)  # Default 30 minutes

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        settings.better_auth_secret,
        algorithm="HS256"
    )
    return encoded_jwt


def create_test_token(user_id: str = "test_user") -> str:
    """
    Create a test JWT token for development.
    DO NOT use in production.
    """
    payload = {
        "userId": user_id,
        "email": f"{user_id}@example.com",
        "iat": datetime.utcnow(),
        "exp": datetime.utcnow() + timedelta(hours=24)
    }
    return jwt.encode(
        payload,
        settings.better_auth_secret,
        algorithm="HS256"
    )