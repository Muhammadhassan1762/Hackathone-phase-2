from sqlmodel import create_engine, Session
from typing import Generator
from config import settings


# Create database engine with connection pooling
engine = create_engine(
    settings.database_url,
    echo=settings.debug,
    pool_size=20,
    max_overflow=10,
    pool_pre_ping=True,
    pool_recycle=3600
)


def get_session() -> Generator[Session, None, None]:
    """
    Dependency that provides database session.
    """
    with Session(engine) as session:
        yield session