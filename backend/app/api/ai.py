from fastapi import APIRouter

from app.schemas.ai import (
    ResumeGenerationRequest,
    ResumeGenerationResponse,
    ResumeAnalysisRequest,
    ResumeAnalysisResponse,
    ResumeOptimizationRequest,
    ResumeOptimizationResponse,
    CoverLetterRequest,
    CoverLetterResponse
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
    parse_review,
    calculate_structure_score,
    calculate_skills_score,
    calculate_final_ats_score,
    optimize_resume,
    generate_cover_letter
)
from fastapi.responses import FileResponse
from app.services.pdf_service import (
    generate_resume_pdf
)
from app.schemas.ai import (
    ResumePDFRequest
)

from app.services.experience_scorer import (
    calculate_experience_score
)

from app.services.project_scorer import (
    calculate_project_score
)
from app.services.education_scorer import (
    calculate_education_score
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
    experience_score, \
    matched_experience_keywords, \
    missing_experience_keywords = (
        calculate_experience_score(
            data.resume,
            data.job_description
        )
    )
    project_score, \
    matched_project_keywords, \
    missing_project_keywords = (
        calculate_project_score(
            data.resume,
            data.job_description
        )
    )
    education_score, \
    matched_education_keywords, \
    missing_education_keywords = (
        calculate_education_score(
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
    structure_score = calculate_structure_score(
    data.resume
    )
    skills_score = calculate_skills_score(
        matched_keywords,
        missing_keywords
    )
    ats_score = calculate_final_ats_score(
        matched_keywords,
        missing_keywords,
        structure_score,
        skills_score,
        weaknesses
    )
    return {
        "ats_score": ats_score,
        "education_score": education_score,
        "experience_score": experience_score,
        "project_score": project_score,
        "matched_keywords": matched_keywords,
        "missing_keywords": missing_keywords,
        "matched_education_keywords": matched_education_keywords,
        "missing_education_keywords": missing_education_keywords,
        "matched_experience_keywords": matched_experience_keywords,
        "missing_experience_keywords": missing_experience_keywords,
        "matched_project_keywords": matched_project_keywords,
        "missing_project_keywords": missing_project_keywords,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "suggestions": suggestions
        }

@router.post(
    "/optimize-resume",
    response_model=ResumeOptimizationResponse
)
def optimize_resume_endpoint(
    data: ResumeOptimizationRequest
):
    optimized_resume = optimize_resume(
    data.resume,
    data.job_description
    )
    return {
        "optimized_resume": optimized_resume
    }

@router.post("/export-pdf")
def export_pdf(
    data: ResumePDFRequest
):
    file_path = "resume.pdf"

    generate_resume_pdf(
        data.resume_content,
        file_path,
        data.theme,
        data.name,
        data.email,
        data.phone,
        data.linkedin,
        data.github,
        data.location
    )

    return FileResponse(
        file_path,
        media_type="application/pdf",
        filename="resume.pdf"
    )

@router.post(
    "/generate-cover-letter",
    response_model=CoverLetterResponse
)
def generate_cover_letter_endpoint(
    data: CoverLetterRequest
):
    cover_letter = generate_cover_letter(
        data.resume,
        data.job_description
    )

    return {
        "cover_letter": cover_letter
    }