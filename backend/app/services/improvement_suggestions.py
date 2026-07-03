from typing import List


def generate_improvement_suggestions(
    missing_skills: List[str],
    skills_match: float,
    experience_match: float,
    project_match: float,
    education_match: float,
    certification_match: float,
) -> List[str]:

    improvement_suggestions = []

    SKILL_SUGGESTIONS = {
        "aws": "Gain hands-on AWS experience or earn an AWS certification",
        "docker": "Build and deploy a containerized application using Docker",
        "kubernetes": "Learn container orchestration and deploy applications with Kubernetes",
        "postgresql": "Strengthen database design and PostgreSQL query optimization skills",
        "python": "Develop advanced Python backend and automation projects",
        "fastapi": "Build REST APIs using FastAPI and modern backend practices"
    }

    for skill in missing_skills:
        improvement_suggestions.append(
            SKILL_SUGGESTIONS.get(
                skill,
                f"Develop practical experience with {skill}"
            )
        )

    if education_match < 60:
        improvement_suggestions.append(
            "Highlight coursework, academic achievements, and subjects relevant to the target role"
        )

    if certification_match < 60:
        improvement_suggestions.append(
            "Add industry-recognized certifications relevant to the job requirements"
        )

    if project_match < 60:
        improvement_suggestions.append(
            "Include projects demonstrating practical use of the required technologies"
        )

    if experience_match < 60:
        improvement_suggestions.append(
            "Emphasize experience and accomplishments aligned with the job description"
        )

    return improvement_suggestions