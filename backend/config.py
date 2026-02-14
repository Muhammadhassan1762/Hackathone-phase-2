from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Database
    database_url: str

    # Authentication
    better_auth_secret: str

    # CORS
    allowed_origins: str = "http://localhost:3000"

    # Application
    env: str = "development"
    debug: bool = True
    log_level: str = "INFO"
    host: str = "0.0.0.0"
    port: int = 8000

    class Config:
        env_file = ".env"

    @property
    def is_production(self) -> bool:
        return self.env == "production"

    @property
    def cors_origins(self) -> list:
        return self.allowed_origins.split(",")


settings = Settings()