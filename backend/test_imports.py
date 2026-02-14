try:
    from pydantic_settings import BaseSettings
    print("pydantic_settings import successful")
except ImportError as e:
    print(f"Failed to import pydantic_settings: {e}")

try:
    from config import settings
    print("config import successful")
except ImportError as e:
    print(f"Failed to import config: {e}")

try:
    from sqlmodel import SQLModel, Field
    print("sqlmodel import successful")
except ImportError as e:
    print(f"Failed to import sqlmodel: {e}")

try:
    from fastapi import FastAPI
    print("fastapi import successful")
except ImportError as e:
    print(f"Failed to import fastapi: {e}")