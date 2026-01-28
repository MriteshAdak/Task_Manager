from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TaskCreate(BaseModel):
    title: str
    status: str = "todo"
    dueDate: Optional[datetime] = None

class TaskResponse(TaskCreate):
    id: str

    class Config:
        from_attributes = True