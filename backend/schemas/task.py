from pydantic import BaseModel, Field, validator
from typing import Optional
from datetime import datetime


class TaskCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    priority: str = Field(default="medium")
    due_date: Optional[datetime] = None

    @validator('priority')
    def validate_priority(cls, v):
        if v not in ['low', 'medium', 'high']:
            raise ValueError('Priority must be low, medium, or high')
        return v


class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    priority: Optional[str] = None
    due_date: Optional[datetime] = None
    completed: Optional[bool] = None

    @validator('priority')
    def validate_priority(cls, v):
        if v and v not in ['low', 'medium', 'high']:
            raise ValueError('Priority must be low, medium, or high')
        return v


class TaskResponse(BaseModel):
    id: int
    user_id: str
    title: str
    description: Optional[str]
    completed: bool
    priority: str
    due_date: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True