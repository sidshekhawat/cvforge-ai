import re

STOP_WORDS = {
    "a", "an", "the", "and", "or", "but",
    "is", "are", "was", "were",
    "to", "of", "in", "on", "for",
    "with", "at", "by", "from",
    "have", "has", "had",
    "be", "been", "being",

    "we", "our", "you", "your",
    "looking", "required", "preferred",
    "responsibilities", "responsibility",
    "include", "includes", "including",

    "experience", "job", "role",
    "candidate", "candidates",
    "work", "working", "team",

    "professional", "summary",
    "technology","technologies",

    "skills", "skill",
    "education","knowledge",
    "students","student",
    "projects", "project",
    "certifications", "certification",
    "understanding","familiarity",
}

def extract_keywords(
    text: str
):
    words = re.findall(
        r"\b\w+\b",
        text.lower()
    )

    return {
        word
        for word in words
        if word not in STOP_WORDS
    }