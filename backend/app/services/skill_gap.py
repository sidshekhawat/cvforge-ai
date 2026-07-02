from app.services.text_utils import extract_keywords
from app.schemas.skill_gap import SkillGapResponse
from app.services.skills import SKILL_KEYWORDS
from app.services.recommendations import (
    SKILL_RECOMMENDATIONS
)
def analyze_skill_gap(
    resume_text: str,
    job_description: str
):
    resume_keywords = {
        word
        for word in extract_keywords(resume_text)
        if word in SKILL_KEYWORDS
    }

    jd_keywords = {
        word
        for word in extract_keywords(job_description)
        if word in SKILL_KEYWORDS
    }
    
    matched_skills = sorted(
        resume_keywords & jd_keywords
    )

    missing_skills = sorted(
        jd_keywords - resume_keywords
    )

    if len(jd_keywords) == 0:
        match_percentage = 0
    else:
        match_percentage = round(
            len(matched_skills)
            / len(jd_keywords)
            * 100,
            2
        )

    recommendations = [
        SKILL_RECOMMENDATIONS.get(
            skill,
            f"Learn {skill}"
        )
        for skill in missing_skills
    ]

    return SkillGapResponse(
        match_percentage=match_percentage,
        matched_skills=matched_skills,
        missing_skills=missing_skills,
        recommendations=recommendations
    )