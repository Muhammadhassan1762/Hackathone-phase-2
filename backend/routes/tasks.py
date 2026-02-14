from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List
from datetime import datetime

from db import get_session
from middleware.auth import get_current_user
from models.task import Task, TaskCreate, TaskUpdate, TaskResponse
from schemas.error import ErrorResponse, SuccessResponse

router = APIRouter(prefix="/api", tags=["tasks"])


@router.get("/tasks", response_model=List[TaskResponse])
async def list_tasks(
    status: str = "all",
    sort: str = "created",
    order: str = "desc",
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    List all tasks for authenticated user.
    Query params:
    - status: all|pending|completed
    - sort: created|title|due_date
    - order: asc|desc
    """
    # Base query - ALWAYS filter by user
    query = select(Task).where(Task.user_id == current_user)

    # Apply status filter
    if status == "pending":
        query = query.where(Task.completed == False)
    elif status == "completed":
        query = query.where(Task.completed == True)

    # Apply sorting
    if sort == "title":
        if order == "desc":
            query = query.order_by(Task.title.desc())
        else:
            query = query.order_by(Task.title)
    elif sort == "due_date":
        if order == "desc":
            query = query.order_by(Task.due_date.desc())
        else:
            query = query.order_by(Task.due_date)
    else:  # default to created_at
        if order == "desc":
            query = query.order_by(Task.created_at.desc())
        else:
            query = query.order_by(Task.created_at)

    # Execute query
    tasks = session.exec(query).all()

    return tasks


@router.post("/tasks", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    task_data: TaskCreate,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Create a new task for authenticated user.
    """
    # Create task with user_id from token
    task = Task(
        **task_data.model_dump(),
        user_id=current_user,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    # Save to database
    session.add(task)
    session.commit()
    session.refresh(task)

    return task


@router.get("/tasks/{task_id}", response_model=TaskResponse)
async def get_task(
    task_id: int,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Get a single task by ID.
    Returns 404 if not found, 403 if not owned by user.
    """
    # Get task
    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "success": False,
                "error": {
                    "code": "NOT_FOUND",
                    "message": "Task not found"
                }
            }
        )

    # Verify ownership
    if task.user_id != current_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={
                "success": False,
                "error": {
                    "code": "FORBIDDEN",
                    "message": "You don't have permission to access this task"
                }
            }
        )

    return task


@router.put("/tasks/{task_id}", response_model=TaskResponse)
async def update_task(
    task_id: int,
    task_data: TaskUpdate,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Update a task.
    Only provided fields are updated.
    """
    # Get task
    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "success": False,
                "error": {
                    "code": "NOT_FOUND",
                    "message": "Task not found"
                }
            }
        )

    # Verify ownership
    if task.user_id != current_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={
                "success": False,
                "error": {
                    "code": "FORBIDDEN",
                    "message": "You don't have permission to update this task"
                }
            }
        )

    # Update fields
    update_data = task_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(task, key, value)

    # Update timestamp
    task.updated_at = datetime.utcnow()

    # Save
    session.add(task)
    session.commit()
    session.refresh(task)

    return task


@router.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    task_id: int,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Delete a task.
    Returns 204 on success, 404 if not found, 403 if not owned.
    """
    # Get task
    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "success": False,
                "error": {
                    "code": "NOT_FOUND",
                    "message": "Task not found"
                }
            }
        )

    # Verify ownership
    if task.user_id != current_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={
                "success": False,
                "error": {
                    "code": "FORBIDDEN",
                    "message": "You don't have permission to delete this task"
                }
            }
        )

    # Delete
    session.delete(task)
    session.commit()

    return None


@router.patch("/tasks/{task_id}/complete", response_model=TaskResponse)
async def toggle_complete(
    task_id: int,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Toggle task completion status.
    """
    # Get task
    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "success": False,
                "error": {
                    "code": "NOT_FOUND",
                    "message": "Task not found"
                }
            }
        )

    # Verify ownership
    if task.user_id != current_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={
                "success": False,
                "error": {
                    "code": "FORBIDDEN",
                    "message": "You don't have permission to modify this task"
                }
            }
        )

    # Toggle completed
    task.completed = not task.completed
    task.updated_at = datetime.utcnow()

    # Save
    session.add(task)
    session.commit()
    session.refresh(task)

    return task