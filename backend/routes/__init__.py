from .health import router as health
from .tasks import router as tasks
from .auth import router as auth

__all__ = ["health", "tasks", "auth"]