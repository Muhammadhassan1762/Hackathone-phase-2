from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


class User(SQLModel, table=True):
    """
    User model for authentication.
    Manages user accounts with password hashing.
    """
    __tablename__ = "users"

    id: str = Field(primary_key=True)
    email: str = Field(unique=True)
    name: Optional[str] = None
    password_hash: Optional[str] = None  # Store hashed passwords
    email_verified: bool = Field(default=False)
    image: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)