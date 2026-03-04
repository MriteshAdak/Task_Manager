from fastapi import Depends
from sqlalchemy.orm import Session

from app.application.task_service import TaskService
from app.database import get_db
from app.infrastructure.db.repositories import SqlAlchemyTaskRepository


def get_task_service(db: Session = Depends(get_db)) -> TaskService:
    repository = SqlAlchemyTaskRepository(db)
    return TaskService(repository)
