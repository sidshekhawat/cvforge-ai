from app.services.text_utils import extract_keywords
from app.schemas.skill_gap import SkillGapResponse
from app.services.skills import SKILL_KEYWORDS
from app.services.recommendations import (
    SKILL_RECOMMENDATIONS
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
WEIGHTS = {
    "skills": 40,
    "experience": 25,
    "projects": 15,
    "education": 10,
    "certifications": 10
}

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

    skills_match = match_percentage
    experience_match, _, _ = (
        calculate_experience_score(
            resume_text,
            job_description
        )
    )
    project_match, _, _ = (
        calculate_project_score(
            resume_text,
            job_description
        )
    )
    education_match, _, _ = (
        calculate_education_score(
            resume_text,
            job_description
        )
    )
    certification_match, _, _ = (
        calculate_certification_score(
            resume_text,
            job_description
        )
    )

    overall_match = round(
        (
            skills_match * WEIGHTS["skills"]
            + experience_match * WEIGHTS["experience"]
            + project_match * WEIGHTS["projects"]
            + education_match * WEIGHTS["education"]
            + certification_match * WEIGHTS["certifications"]
        )
        / 100,
        2
    )

    verdict = ""
    if overall_match >= 90:
        verdict = "Excellent Match"

    elif overall_match >= 75:
        verdict = "Strong Match"

    elif overall_match >= 60:
        verdict = "Good Match"

    elif overall_match >= 40:
        verdict = "Moderate Match"

    else:
        verdict = "Weak Match"


    strengths = []
    if skills_match >= 80:
        strengths.append(
            "Excellent skill alignment"
        )

    if experience_match >= 70:
        strengths.append(
            "Strong experience relevance"
        )

    if project_match >= 70:
        strengths.append(
            "Strong project relevance"
        )

    if education_match >= 70:
        strengths.append(
            "Strong educational alignment"
        )

    if certification_match >= 70:
        strengths.append(
            "Strong certification coverage"
        )


    weaknesses = []
    if skills_match < 60:
        weaknesses.append(
            "Skill alignment needs improvement"
        )

    if experience_match < 60:
        weaknesses.append(
            "Experience relevance is limited"
        )

    if project_match < 60:
        weaknesses.append(
            "Project relevance could be improved"
        )

    if education_match < 60:
        weaknesses.append(
            "Educational alignment is below expectations"
        )

    if certification_match < 60:
        weaknesses.append(
            "Certification coverage is limited"
        )

    analysis_summary = (
        f"This resume is a {verdict.lower()} "
        f"with an overall match score of "
        f"{overall_match}%."
    )

    return SkillGapResponse(
        overall_match=overall_match,
        analysis_summary=analysis_summary,

        verdict=verdict,
        strengths=strengths,
        weaknesses=weaknesses,
    
        skills_match=skills_match,
        experience_match=experience_match,
        project_match=project_match,
        education_match=education_match,
        certification_match=certification_match,

        matched_skills=matched_skills,
        missing_skills=missing_skills,

        recommendations=recommendations
    )