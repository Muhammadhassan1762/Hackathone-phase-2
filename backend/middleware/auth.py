from fastapi import HTTPException, Header, status
from typing import Optional
import jwt
from config import settings


async def get_current_user(authorization: Optional[str] = Header(None)) -> str:
    """
    Dependency that extracts and verifies JWT token from Authorization header.
    Returns user_id if valid, raises 401 if not.
    """
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "success": False,
                "error": {
                    "code": "UNAUTHORIZED",
                    "message": "Missing authorization header"
                }
            }
        )

    try:
        # Extract token (format: "Bearer <token>")
        parts = authorization.split()
        if len(parts) != 2 or parts[0].lower() != "bearer":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail={
                    "success": False,
                    "error": {
                        "code": "UNAUTHORIZED",
                        "message": "Invalid authorization header format"
                    }
                }
            )

        token = parts[1]

        # Verify signature and decode
        payload = jwt.decode(
            token,
            settings.better_auth_secret,
            algorithms=["HS256"]
        )

        # Extract user ID - try both 'sub' and 'userId' fields
        user_id = payload.get("sub") or payload.get("userId")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail={
                    "success": False,
                    "error": {
                        "code": "UNAUTHORIZED",
                        "message": "Invalid token payload - missing user identifier"
                    }
                }
            )

        return user_id

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "success": False,
                "error": {
                    "code": "UNAUTHORIZED",
                    "message": "Token has expired"
                }
            }
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "success": False,
                "error": {
                    "code": "UNAUTHORIZED",
                    "message": "Invalid token"
                }
            }
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "success": False,
                "error": {
                    "code": "UNAUTHORIZED",
                    "message": "Invalid token"
                }
            }
        )