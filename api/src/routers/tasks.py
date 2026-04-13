"""
HTTP route definitions for the /tasks resource
"""

from fastapi import APIRouter, Depends, Header, HTTPException, status

from src.dependencies import get_task_service
from src.services.task_service import TaskServices
from src.schema.task_create import TaskCreate
from src.schema.task_update import TaskUpdate
from src.schema.task_response import TaskResponse

router: APIRouter = APIRouter(prefix="/tasks", tags=["Tasks"])


def require_user_id(x_user_id: str = Header(..., alias="x-user-id")) -> str:
    user_id = x_user_id.strip()
    if not user_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="x-user-id header is required")
    return user_id

@router.get(
    "", 
    response_model=list[TaskResponse], 
    status_code=status.HTTP_200_OK, 
    summary="Retrieve all tasks")
def get_tasks(
    user_id: str = Depends(require_user_id),
    service: TaskServices = Depends(get_task_service),
) -> list[TaskResponse]:
    """
    Retrieve a list of all tasks in the system
    """
    return service.get_all_tasks(user_id)

@router.get(
    "/{task_id}",
    response_model=TaskResponse,
    status_code=status.HTTP_200_OK,
    summary="Retrieve a task by ID")
def get_task(
    task_id: str,
    user_id: str = Depends(require_user_id),
    service: TaskServices = Depends(get_task_service),
) -> TaskResponse:
    """
    Retrieve a single task by ID.
    """
    return service.get_task_by_id(task_id, user_id)

@router.post(
    "", 
    response_model=TaskResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new task")
def create_task(
    task_data: TaskCreate,
    user_id: str = Depends(require_user_id),
    service: TaskServices = Depends(get_task_service),
) -> TaskResponse:
    """
    Create a new task with the provided data
    """
    return service.create_task(task_data, user_id)

@router.put("/{task_id}", 
            response_model=TaskResponse, 
            status_code=status.HTTP_200_OK, 
            summary="Update an existing task")
def update_task(
    task_id: str,
    task_data: TaskUpdate,
    user_id: str = Depends(require_user_id),
    service: TaskServices = Depends(get_task_service),
) -> TaskResponse:
    """
    Update an existing task with the provided data

    Parameters
    ----------
    task_id : str
        The UUID of the task to update
    task_data : TaskUpdate
        Validated inbound request data containing the replacement values

    Returns
    -------
    TaskResponse
        The updated task as persisted

    Raises
    ------
    HTTPException 404
        If no task with the given ID exists
    """
    return service.update_task(task_id, task_data, user_id)
 
    
@router.delete("/{task_id}", 
               status_code=status.HTTP_204_NO_CONTENT, 
               summary="Delete an existing task")
def delete_task(
    task_id: str,
    user_id: str = Depends(require_user_id),
    service: TaskServices = Depends(get_task_service),
) -> None:
    """
    Delete a task by ID.

    Returns HTTP 204 No Content on success (no body).
    Returns HTTP 404 if the task does not exist.
    """
    service.delete_task(task_id, user_id)