from __future__ import annotations

from app.application.ports import TaskRepositoryPort
from app.domain.task import Task


class TaskService:
    def __init__(self, repository: TaskRepositoryPort):
        self.repository = repository

    def list_tasks(self) -> list[Task]:
        return self.repository.list_tasks()

    def create_task(self, title: str, status: str, due_date):
        return self.repository.create_task(title=title, status=status, due_date=due_date)

    def update_task(self, task_id: str, title: str, status: str, due_date):
        return self.repository.update_task(task_id=task_id, title=title, status=status, due_date=due_date)

    def delete_task(self, task_id: str) -> bool:
        return self.repository.delete_task(task_id)
