import re

STOP_WORDS = {
    "a", "an", "the", "and", "or", "but",
    "is", "are", "was", "were",
    "to", "of", "in", "on", "for",
    "with", "at", "by", "from",
    "have", "has", "had",
    "be", "been", "being",
    "able","build",
    "building","should",
    "plus","services",
    "service","teams",
    "collaborate","collaboration",
    "intern","internship",
    "plus",
    "should","services",
    "service","teams",
    "team","scalable",
    "web","looking",
    "required","preferred",
    "opportunity","opportunities",

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
    "developer","year",
    "developers","backend",
    "frontend","engineer",
    "engineers","candidate",
    "candidates","role",
    "position","looking",
    "experience","years",
    "required","preferred",
    "clean","cloud",
    "code","write",
    "develop","good",
    "maintain","maintainable",
    "problem","requirements",
    "reviews","solving",
    "strong","version",
    "control","participate",
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