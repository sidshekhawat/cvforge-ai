import re

from app.services.text_utils import (
    extract_keywords
)

def extract_experience_section(
    resume: str
):
    lines = resume.splitlines()

    experience_lines = []

    in_experience = False

    for line in lines:

        line_lower = line.lower().strip().rstrip(":")

        if line_lower == "experience":
            in_experience = True
            continue

        if (
            in_experience
            and line_lower in {
                "summary",
                "skills",
                "education",
                "projects"
            }
        ):
            break

        if in_experience:
            experience_lines.append(line)

    return "\n".join(
        experience_lines
    )

def calculate_experience_score(
    resume: str,
    job_description: str
):
    
    experience_text = (
        extract_experience_section(
            resume
        ) 
    )

    experience_words = extract_keywords(
        experience_text
    )
    
    jd_words = extract_keywords(
        job_description
    )
    
    matched_experience_keywords = list(
        experience_words.intersection(
            jd_words
        )
    )

    missing_experience_keywords = list(
        jd_words - experience_words
    )

    if len(jd_words) == 0:
        experience_score = 0
    else:
        experience_score = int(
            (
                len(
                    matched_experience_keywords
                )
                / len(jd_words)
            )
            * 100
        )

    return (
        experience_score,
        matched_experience_keywords,
        missing_experience_keywords
    )