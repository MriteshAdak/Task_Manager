from __future__ import annotations

from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class TaskRequest(BaseModel):
    title: str
    status: str = "todo"
    dueDate: Optional[datetime] = None


class TaskResponse(TaskRequest):
    id: str


class DeleteResponse(BaseModel):
    message: str
