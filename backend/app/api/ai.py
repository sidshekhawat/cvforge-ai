from fastapi import APIRouter

from app.schemas.ai import (
    ResumeGenerationRequest,
    ResumeGenerationResponse
)

from app.services.ai_services import generate_resume

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
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
        education=data.education
    )

    return {"resume": resume}