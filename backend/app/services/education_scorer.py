import re

from app.services.text_utils import extract_keywords

from app.services.section_extractor import (
    extract_section
)

def extract_education_section(
    resume: str
):
    lines = resume.splitlines()

    education_lines = []

    in_education = False

    for line in lines:

        line_lower = (
            line.lower()
            .strip()
            .rstrip(":")
        )

        if line_lower == "education":
            in_education = True
            continue

        if (
            in_education
            and line_lower in {
                "summary",
                "skills",
                "experience",
                "projects"
            }
        ):
            break

        if in_education:
            education_lines.append(line)

    return "\n".join(
        education_lines
    )

def calculate_education_score(
    resume: str,
    job_description: str
):

    education_text = extract_section(
        resume,
        "education"
    )

    education_words = extract_keywords(
        education_text
    )

    jd_words = extract_keywords(
        job_description
    )

    matched_education_keywords = list(
        education_words.intersection(
            jd_words
        )
    )

    missing_education_keywords = list(
        jd_words - education_words
    )

    if len(jd_words) == 0:
        education_score = 0
    else:
        education_score = int(
            (
                len(
                    matched_education_keywords
                )
                / len(jd_words)
            ) * 100
        )

    return (
        education_score,
        matched_education_keywords,
        missing_education_keywords
    )