from fastapi import APIRouter

from app.schemas.skill_gap_request import (
    SkillGapRequest
)

from app.services.skill_gap import (
    analyze_skill_gap
)

router = APIRouter(
    prefix="/skill-gap",
    tags=["Skill Gap"]
)


@router.post("/")
def skill_gap_analysis(
    request: SkillGapRequest
):
    return analyze_skill_gap(
        request.resume,
        request.job_description
    )