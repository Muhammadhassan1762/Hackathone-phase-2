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