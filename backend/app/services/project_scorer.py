import re

def extract_projects_section(
    resume: str
):
    lines = resume.splitlines()

    project_lines = []

    in_projects = False

    for line in lines:

        line_lower = (
            line.lower()
            .strip()
            .rstrip(":")
        )

        if line_lower == "projects":
            in_projects = True
            continue

        if (
            in_projects
            and line_lower in {
                "summary",
                "skills",
                "education",
                "experience"
            }
        ):
            break

        if in_projects:
            project_lines.append(line)

    return "\n".join(
        project_lines
    )

def calculate_project_score(
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
        "project", "projects"
    }

    project_text = extract_projects_section(
        resume
    )

    project_words = {
        word
        for word in re.findall(
            r"\b\w+\b",
            project_text.lower()
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

    matched_project_keywords = list(
        project_words.intersection(
            jd_words
        )
    )

    missing_project_keywords = list(
        jd_words - project_words
    )

    if len(jd_words) == 0:
        project_score = 0
    else:
        project_score = int(
            (
                len(
                    matched_project_keywords
                )
                / len(jd_words)
            ) * 100
        )

    return (
        project_score,
        matched_project_keywords,
        missing_project_keywords
    )