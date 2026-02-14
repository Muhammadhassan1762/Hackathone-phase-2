from pydantic import BaseModel
from typing import Optional, Dict, Any


class ErrorDetail(BaseModel):
    code: str
    message: str
    details: Optional[Dict[str, Any]] = None


class ErrorResponse(BaseModel):
    success: bool = False
    error: ErrorDetail


class SuccessResponse(BaseModel):
    success: bool = True
    data: Optional[Dict[str, Any]] = None
    message: Optional[str] = None