from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from datetime import datetime
from db import get_session

router = APIRouter(prefix="/api", tags=["health"])


@router.get("/health")
async def health_check(session: Session = Depends(get_session)):
    """
    Health check endpoint.
    Returns API status and database connectivity.
    """
    try:
        # Test database connection
        session.exec(select(1)).one()
        db_status = "connected"
        status = "healthy"
    except Exception as e:
        db_status = "disconnected"
        status = "unhealthy"

    return {
        "status": status,
        "database": db_status,
        "timestamp": datetime.utcnow().isoformat()
    }