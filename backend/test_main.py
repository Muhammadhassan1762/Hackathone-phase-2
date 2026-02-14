"""
Basic tests for the backend API
"""
import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine
from sqlmodel.pool import StaticPool

from main import app
from db import get_session
from models.task import Task


@pytest.fixture(name="engine")
def engine_fixture():
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    SQLModel.metadata.create_all(bind=engine)
    yield engine


@pytest.fixture(name="session")
def session_fixture(engine):
    with Session(engine) as session:
        yield session


@pytest.fixture(name="client")
def client_fixture(session):
    def get_session_override():
        return session

    app.dependency_overrides[get_session] = get_session_override
    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()


def test_health_endpoint(client):
    """Test health check endpoint"""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] in ["healthy", "unhealthy"]
    assert "database" in data
    assert "timestamp" in data


def test_create_task_without_auth(client):
    """Test that creating a task without auth returns 401"""
    response = client.post("/api/tasks", json={"title": "Test"})
    assert response.status_code == 401  # Unauthorized


def test_list_tasks_without_auth(client):
    """Test that listing tasks without auth returns 401"""
    response = client.get("/api/tasks")
    assert response.status_code == 401  # Unauthorized