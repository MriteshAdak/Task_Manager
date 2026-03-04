from __future__ import annotations

from datetime import datetime
from typing import Optional, Protocol

from app.domain.task import Task


class TaskRepositoryPort(Protocol):
    def list_tasks(self) -> list[Task]:
        ...

    def create_task(self, title: str, status: str, due_date: Optional[datetime]) -> Task:
        ...

    def update_task(self, task_id: str, title: str, status: str, due_date: Optional[datetime]) -> Task | None:
        ...

    def delete_task(self, task_id: str) -> bool:
        ...
