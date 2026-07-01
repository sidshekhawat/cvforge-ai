import re

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
    stop_words = {
        "a", "an", "the", "and", "or", "but",
        "is", "are", "was", "were",
        "to", "of", "in", "on", "for",
        "with", "at", "by", "from",
        "have", "has", "had",
        "be", "been", "being",
        "we", "our", "you", "your",
        "looking", "required", "preferred",
        "experience", "job", "role",
        "candidate", "candidates",
        "education"
    }

    education_text = extract_education_section(
        resume
    )

    education_words = {
        word
        for word in re.findall(
            r"\b\w+\b",
            education_text.lower()
        )
        if word not in stop_words
    }

    jd_words = {
        word
        for word in re.findall(
            r"\b\w+\b",
            job_description.lower()
        )
        if word not in stop_words
    }

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