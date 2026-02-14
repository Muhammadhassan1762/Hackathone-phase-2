"""
Database initialization script.
Creates all tables in the database.
"""
from sqlmodel import SQLModel
from db import engine

# Import all models to ensure they're registered with SQLModel metadata
from models.user import User
from models.task import Task


def create_tables():
    """Create all tables in the database."""
    print("Creating database tables...")
    SQLModel.metadata.create_all(engine)
    print("Database tables created successfully!")


if __name__ == "__main__":
    create_tables()