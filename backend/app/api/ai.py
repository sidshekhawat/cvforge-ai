from fastapi import APIRouter

from app.schemas.ai import (
    ResumeGenerationRequest,
    ResumeGenerationResponse,
    ResumeAnalysisRequest,
    ResumeAnalysisResponse
)

from app.services.ai_services import generate_resume
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.models.resume import Resume
from app.models.user import User

from fastapi import Depends

from app.schemas.resume import ResumeResponse
router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)

from app.services.ai_services import (
    generate_resume,
    analyze_resume_keywords,
    review_resume,
    parse_review
)


@router.post(

    "/generate",

    response_model=ResumeGenerationResponse
)
def generate_resume_api(
    data: ResumeGenerationRequest
):
    resume = generate_resume(
        name=data.name,
        skills=data.skills,
        experience=data.experience,
        education=data.education,
        template=data.template
    )

    return {"resume": resume}

@router.post(

    "/generate-and-save",

    response_model=ResumeResponse

)
def generate_and_save_resume(
    data: ResumeGenerationRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    generated_resume = generate_resume(
        name=data.name,
        skills=data.skills,
        experience=data.experience,
        education=data.education,
        template=data.template
    )

    resume = Resume(
        title="AI Generated Resume",
        content=generated_resume,
        owner_id=current_user.id
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    return resume

@router.post(
    "/analyze-resume",
    response_model=ResumeAnalysisResponse
)
def analyze_resume(
    data: ResumeAnalysisRequest
):
    matched_keywords, missing_keywords = (
        analyze_resume_keywords(
            data.resume,
            data.job_description
        )
    )
    review = review_resume(
    data.resume,
    data.job_description
    )
    strengths, weaknesses, suggestions = (
    parse_review(review)
    )
    return {
        "ats_score": 0,
        "matched_keywords": matched_keywords,
        "missing_keywords": missing_keywords,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "suggestions": suggestions
    }