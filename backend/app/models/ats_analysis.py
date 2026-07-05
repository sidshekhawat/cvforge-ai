from sqlalchemy import Column, Integer, Text, ForeignKey, DateTime
from sqlalchemy.sql import func

from app.database import Base


class ATSAnalysis(Base):
    __tablename__ = "ats_analyses"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    resume_text = Column(Text, nullable=False)

    job_description = Column(Text, nullable=False)

    ats_score = Column(Integer, nullable=False)

    keyword_score = Column(Integer, nullable=True)

    structure_score = Column(Integer, nullable=True)

    skills_score = Column(Integer, nullable=True)

    ai_review_score = Column(Integer, nullable=True)

    analysis_feedback = Column(Text)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )