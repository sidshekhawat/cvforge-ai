from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user

from app.models.resume import Resume
from app.models.user import User

from app.schemas.resume import (
    ResumeCreate,
    ResumeResponse
)

router = APIRouter(
    prefix="/resumes",
    tags=["Resumes"]
)


@router.post(
    "/",
    response_model=ResumeResponse
)
def create_resume(
    resume: ResumeCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_resume = Resume(
        title=resume.title,
        content=resume.content,
        owner_id=current_user.id
    )

    db.add(new_resume)
    db.commit()
    db.refresh(new_resume)

    return new_resume


@router.get(
    "/",
    response_model=list[ResumeResponse]
)
def get_my_resumes(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    resumes = (
        db.query(Resume)
        .filter(
            Resume.owner_id == current_user.id
        )
        .all()
    )

    return resumes