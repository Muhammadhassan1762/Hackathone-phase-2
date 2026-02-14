from fastapi import Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
import logging


logger = logging.getLogger(__name__)


async def validation_exception_handler(
    request: Request,
    exc: RequestValidationError
):
    """
    Handle Pydantic validation errors.
    """
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "success": False,
            "error": {
                "code": "VALIDATION_ERROR",
                "message": "Invalid input data",
                "details": exc.errors()
            }
        }
    )


async def http_exception_handler(
    request: Request,
    exc: StarletteHTTPException
):
    """
    Handle HTTP exceptions.
    """
    if isinstance(exc.detail, dict):
        return JSONResponse(
            status_code=exc.status_code,
            content=exc.detail
        )

    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": {
                "code": "HTTP_ERROR",
                "message": str(exc.detail)
            }
        }
    )


async def general_exception_handler(
    request: Request,
    exc: Exception
):
    """
    Catch-all for unexpected errors.
    """
    logger.error(f"Unexpected error: {exc}", exc_info=True)

    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "error": {
                "code": "INTERNAL_ERROR",
                "message": "An unexpected error occurred"
            }
        }
    )