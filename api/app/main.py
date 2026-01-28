# import os
from fastapi import FastAPI, Depends#, HTTPException
from fastapi.staticfiles import StaticFiles
from app.database import get_db, engine, Base
from app.repository import TaskRepository
from app.schemas import TaskCreate#, TaskResponse
from sqlalchemy.orm import Session

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.post("/tasks")#, response_model=TaskResponse)
def create_task(task_data: TaskCreate, db: Session = Depends(get_db)):
    repo = TaskRepository(db)
    return repo.add(task_data.title, task_data.status, task_data.dueDate)

@app.get("/tasks")#, response_model=[TaskResponse])
def get_tasks(db: Session = Depends(get_db)):
    repo = TaskRepository(db)
    return repo.get()

@app.put("/tasks/{task_id}")
def update_task(task_id: str, task_data: TaskCreate, db: Session = Depends(get_db)):
    repo = TaskRepository(db)
    updated_task = repo.update(task_id, task_data.title, task_data.status, task_data.dueDate)
    if updated_task:
        return updated_task
    return {"error": "Task not found"}

@app.delete("/tasks/{task_id}")
def delete_task(task_id: str, db: Session = Depends(get_db)):
    repo = TaskRepository(db)
    repo.remove(task_id)
