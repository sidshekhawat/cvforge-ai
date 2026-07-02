from pydantic import BaseModel


class SkillGapResponse(BaseModel):
    match_percentage: float

    matched_skills: list[str]
    missing_skills: list[str]

    recommendations: list[str]