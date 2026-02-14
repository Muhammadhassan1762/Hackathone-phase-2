from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings


def setup_cors(app: FastAPI):
    """
    Configure CORS middleware for the application.
    """
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allow_headers=["Authorization", "Content-Type"],
        max_age=600  # Cache preflight requests for 10 minutes
    )