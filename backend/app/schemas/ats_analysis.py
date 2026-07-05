from pydantic import BaseModel
from datetime import datetime


class ATSAnalysisResponse(BaseModel):
    id: int
    ats_score: int

    keyword_score: int | None = None
    structure_score: int | None = None
    skills_score: int | None = None
    ai_review_score: int | None = None
    
    analysis_feedback: str | None = None

    resume_text: str
    job_description: str

    created_at: datetime

    class Config:
        from_attributes = True