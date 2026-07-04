from sqlalchemy.orm import Session
from fastapi import Depends

from app.database import get_db
from app.dependencies import get_current_user

from app.models.user import User
from app.models.ats_analysis import ATSAnalysis
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
    request: SkillGapRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    result = analyze_skill_gap(
        request.resume,
        request.job_description
    )

    analysis = ATSAnalysis(
        user_id=current_user.id,
        resume_text=request.resume,
        job_description=request.job_description,
        ats_score=int(result.overall_match),
        analysis_feedback=result.improvement_report
    )

    db.add(analysis)
    db.commit()

    return result