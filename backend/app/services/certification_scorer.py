import re
from app.services.text_utils import extract_keywords

def extract_certifications_section(
    resume: str
):
    lines = resume.splitlines()

    certification_lines = []

    in_certifications = False

    for line in lines:

        line_lower = (
            line.lower()
            .strip()
            .rstrip(":")
        )

        if line_lower in {
            "certifications",
            "certification"
        }:
            in_certifications = True
            continue

        if (
            in_certifications
            and line_lower in {
                "summary",
                "skills",
                "experience",
                "projects",
                "education"
            }
        ):
            break

        if in_certifications:
            certification_lines.append(line)

    return "\n".join(
        certification_lines
    )

def calculate_certification_score(
    resume: str,
    job_description: str
):

    certification_text = (
        extract_certifications_section(
            resume
        )
    )

    certification_words = extract_keywords(
        certification_text
    )

    jd_words = extract_keywords(
        job_description
    )

    matched_certification_keywords = list(
        certification_words.intersection(
            jd_words
        )
    )

    missing_certification_keywords = list(
        jd_words - certification_words
    )

    if len(jd_words) == 0:
        certification_score = 0
    else:
        certification_score = int(
            (
                len(
                    matched_certification_keywords
                )
                / len(jd_words)
            ) * 100
        )

    return (
        certification_score,
        matched_certification_keywords,
        missing_certification_keywords
    )