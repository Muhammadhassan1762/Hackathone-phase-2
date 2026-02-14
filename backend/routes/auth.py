"""
Authentication routes for integration with Better Auth.
These endpoints are for compatibility with frontend auth components.
Actual authentication is handled by Better Auth.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from pydantic import BaseModel
from datetime import datetime
import bcrypt

from db import get_session
from models.user import User
from middleware.auth import get_current_user
from schemas.error import ErrorResponse, SuccessResponse
from utils.jwt_utils import create_access_token


# Separate response model for user profile (without token)
class UserProfileResponse(BaseModel):
    success: bool
    user: dict
    message: str

router = APIRouter(prefix="/api/auth", tags=["auth"])

# Pydantic models for auth
class SignUpRequest(BaseModel):
    email: str
    password: str
    name: str


class SignInRequest(BaseModel):
    email: str
    password: str


class AuthResponse(BaseModel):
    success: bool
    user: dict
    message: str
    token: str = None  # Optional token field for authentication




@router.post("/signup", response_model=AuthResponse)
async def signup(
    request: SignUpRequest,
    session: Session = Depends(get_session)
):
    """
    Register a new user.
    Creates the user in the database and returns JWT token.
    """
    # Check if user already exists
    existing_user = session.exec(
        select(User).where(User.email == request.email)
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "success": False,
                "error": {
                    "code": "USER_EXISTS",
                    "message": "User with this email already exists"
                }
            }
        )

    # Hash the password properly
    import bcrypt
    hashed_password = bcrypt.hashpw(request.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    import uuid
    # Create new user with a unique UUID
    user = User(
        id=str(uuid.uuid4()),  # Generate a unique ID for the user
        email=request.email,
        name=request.name,
        password_hash=hashed_password  # Store the hashed password
    )

    session.add(user)
    session.commit()
    session.refresh(user)

    # Create JWT token
    access_token = create_access_token(data={"sub": user.id, "name": user.name})

    return AuthResponse(
        success=True,
        user={
            "id": user.id,
            "email": user.email,
            "name": user.name
        },
        token=access_token,
        message="User registered successfully"
    )


@router.post("/signin", response_model=AuthResponse)
async def signin(
    request: SignInRequest,
    session: Session = Depends(get_session)
):
    """
    Authenticate user and return JWT token.
    Checks credentials against the database.
    """
    # Find user by email
    user = session.exec(
        select(User).where(User.email == request.email)
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "success": False,
                "error": {
                    "code": "INVALID_CREDENTIALS",
                    "message": "Invalid email or password"
                }
            }
        )

    # Verify the password using bcrypt
    if not user.password_hash or not bcrypt.checkpw(request.password.encode('utf-8'), user.password_hash.encode('utf-8')):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "success": False,
                "error": {
                    "code": "INVALID_CREDENTIALS",
                    "message": "Invalid email or password"
                }
            }
        )

    # Create JWT token
    access_token = create_access_token(data={"sub": user.id, "name": user.name or user.email.split('@')[0]})

    return AuthResponse(
        success=True,
        user={
            "id": user.id,
            "email": user.email,
            "name": user.name or user.email.split('@')[0]
        },
        token=access_token,
        message="User signed in successfully"
    )


@router.get("/me", response_model=UserProfileResponse)
async def get_user_profile(
    current_user_data: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Get current user profile information.
    Requires valid JWT token.
    """
    # The get_current_user middleware extracts user info from JWT
    # It returns the user ID from the token's 'sub' field
    user_id = current_user_data

    # Query the database to get the full user information
    user = session.exec(select(User).where(User.id == user_id)).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "success": False,
                "error": {
                    "code": "USER_NOT_FOUND",
                    "message": "User not found"
                }
            }
        )

    return UserProfileResponse(
        success=True,
        user={
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "email_verified": user.email_verified,
            "image": user.image,
            "created_at": user.created_at.isoformat() if user.created_at else datetime.utcnow().isoformat()
        },
        message="User profile retrieved successfully"
    )


@router.post("/signout")
async def sign_out():
    """
    Sign out endpoint - mainly for API documentation.
    Actual signout is handled by Better Auth on the frontend.
    """
    return {"success": True, "message": "Signed out successfully"}