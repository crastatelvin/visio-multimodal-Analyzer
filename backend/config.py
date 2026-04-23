import os
from functools import lru_cache
from pydantic import BaseModel, Field


class Settings(BaseModel):
    groq_api_key: str = Field(default="")
    allowed_origins: list[str] = Field(default_factory=lambda: ["http://localhost:3000"])
    max_file_size_mb: int = 10
    max_image_dimension: int = 1600
    model_name: str = "meta-llama/llama-4-scout-17b-16e-instruct"
    request_timeout_seconds: int = 120
    db_path: str = "visio.db"
    api_key: str = ""


@lru_cache
def get_settings() -> Settings:
    raw_origins = os.getenv("VISIO_ALLOWED_ORIGINS", "http://localhost:3000")
    origins = [o.strip() for o in raw_origins.split(",") if o.strip()]
    return Settings(
        groq_api_key=os.getenv("GROQ_API_KEY", ""),
        allowed_origins=origins,
        max_file_size_mb=int(os.getenv("VISIO_MAX_FILE_SIZE_MB", "10")),
        max_image_dimension=int(os.getenv("VISIO_MAX_IMAGE_DIMENSION", "1600")),
        model_name=os.getenv("VISIO_MODEL", "meta-llama/llama-4-scout-17b-16e-instruct"),
        request_timeout_seconds=int(os.getenv("VISIO_REQUEST_TIMEOUT_SECONDS", "120")),
        db_path=os.getenv("VISIO_DB_PATH", "visio.db"),
        api_key=os.getenv("VISIO_API_KEY", ""),
    )
