from fastapi import FastAPI
from config import settings
from middleware.cors import setup_cors
from middleware.error_handler import (
    validation_exception_handler,
    http_exception_handler,
    general_exception_handler
)
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from middleware.logging import log_requests

app = FastAPI(
    title="Todo API",
    version="1.0.0",
    description="RESTful API for todo application",
    debug=settings.debug,
    docs_url="/docs" if not settings.is_production else None,
    redoc_url="/redoc" if not settings.is_production else None
)

# Setup CORS
setup_cors(app)

# Add logging middleware
app.middleware("http")(log_requests)

# Add exception handlers
app.add_exception_handler(
    RequestValidationError,
    validation_exception_handler
)
app.add_exception_handler(
    StarletteHTTPException,
    http_exception_handler
)
app.add_exception_handler(
    Exception,
    general_exception_handler
)

# Include routers
from routes import health, tasks, auth
app.include_router(health)
app.include_router(tasks)
app.include_router(auth)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)