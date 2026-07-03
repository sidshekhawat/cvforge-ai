from pydantic import BaseModel

class SkillGapResponse(BaseModel):
    overall_match: float

    skills_match: float
    experience_match: float
    project_match: float
    education_match: float
    certification_match: float

    matched_skills: list[str]
    missing_skills: list[str]

    recommendations: list[str]
