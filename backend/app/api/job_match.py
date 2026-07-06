from fastapi import APIRouter
from pydantic import BaseModel

from app.services.ai_services import (
    analyze_resume_keywords,
    review_resume,
    parse_review,
    calculate_structure_score,
    calculate_skills_score,
    calculate_final_ats_score
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

from app.services.certification_scorer import (
    calculate_certification_score
)

router = APIRouter()

class JobMatchRequest(BaseModel):
    resume: str
    job_description: str


class JobMatchResponse(BaseModel):
    match_score: int

    matched_skills: list[str]
    missing_skills: list[str]

    recommendations: list[str]

    experience_score: int
    project_score: int
    education_score: int
    certification_score: int

@router.post(
    "/job-match",
    response_model=JobMatchResponse
)
async def job_match(
    data: JobMatchRequest
):
    matched_keywords, missing_keywords = (
    analyze_resume_keywords(
        data.resume,
        data.job_description
    )
)

    experience_score, _, _ = (
        calculate_experience_score(
            data.resume,
            data.job_description
        )
    )

    project_score, _, _ = (
        calculate_project_score(
            data.resume,
            data.job_description
        )
    )

    education_score, _, _ = (
        calculate_education_score(
            data.resume,
            data.job_description
        )
    )

    certification_score, _, _ = (
        calculate_certification_score(
            data.resume,
            data.job_description
        )
    )

    analyze_resume_keywords(
        data.resume,
        data.job_description
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

    match_score = calculate_final_ats_score(
        matched_keywords,
        missing_keywords,
        structure_score,
        skills_score,
        weaknesses
    )

    return JobMatchResponse(
        match_score=match_score,

        matched_skills=matched_keywords,
        missing_skills=missing_keywords,

        recommendations=suggestions,

        experience_score=experience_score,
        project_score=project_score,
        education_score=education_score,
        certification_score=certification_score
    )