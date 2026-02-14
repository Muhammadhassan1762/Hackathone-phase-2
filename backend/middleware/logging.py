from fastapi import Request
from datetime import datetime
import logging


logger = logging.getLogger(__name__)


async def log_requests(request: Request, call_next):
    """
    Log all incoming requests with method, path, status, and duration.
    """
    start_time = datetime.utcnow()

    # Process request
    response = await call_next(request)

    # Calculate duration
    duration = (datetime.utcnow() - start_time).total_seconds()

    # Log request details
    logger.info(
        f"{request.method} {request.url.path} - "
        f"Status: {response.status_code} - "
        f"Duration: {duration:.3f}s"
    )

    return response