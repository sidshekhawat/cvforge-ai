import re

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
    
    stop_words = {
    "a", "an", "the", "and", "or", "but",
    "is", "are", "was", "were",
    "to", "of", "in", "on", "for",
    "with", "at", "by", "from",
    "have", "has", "had",
    "be", "been", "being",

    # ATS noise words
    "we", "our", "you", "your", "looking",
    "required", "preferred", "responsibilities",
    "responsibility", "include", "includes",
    "including", "skills", "skill",
    "experience", "job", "role",
    "candidate", "candidates", "work",
    "working", "team", "ability",

    # Generic resume words
    "professional", "summary",
    "education", "projects",
    "project",

    # Generic tech hiring words
    "software", "engineer",
    "engineering", "developer",
    "development",
    }
    experience_text = (
        extract_experience_section(
            resume
        ) 
    )

    experience_words = {
        word
        for word in re.findall(
            r"\b\w+\b",
            experience_text.lower()
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