import re

from app.services.section_extractor import (
    extract_section
)

from app.schemas.resume_parser import (
    ParsedResume
)

def extract_email(
    resume_text: str
):
    match = re.search(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        resume_text
    )

    return match.group(0) if match else None


def extract_phone(
    resume_text: str
):
    match = re.search(
        r"(\+91[- ]?)?[6-9]\d{9}",
        resume_text
    )

    return match.group(0) if match else None


def extract_name(
    resume_text: str
):
    lines = [
        line.strip()
        for line in resume_text.splitlines()
        if line.strip()
    ]

    return lines[0] if lines else None

def parse_resume(
    resume_text: str
):
   return ParsedResume(
    name=extract_name(resume_text),
    email=extract_email(resume_text),
    phone=extract_phone(resume_text),

    skills=extract_skills(resume_text),

    experience=extract_section(
        resume_text,
        "experience"
    ),

    projects=extract_section(
        resume_text,
        "projects"
    ),

    education=extract_section(
        resume_text,
        "education"
    ),

    certifications=extract_section(
        resume_text,
        "certifications"
    )
)

SKILL_KEYWORDS = {
    "python",
    "fastapi",
    "postgresql",
    "docker",
    "git",
    "github",
    "aws",
    "streamlit",
    "sql",
    "javascript",
    "typescript",
    "react",
    "nextjs",
    "nodejs",
    "mongodb",
    "jwt",
    "html",
    "css"
}

from app.services.text_utils import (
    extract_keywords
)


def extract_skills(
    resume_text: str
):
    words = extract_keywords(
        resume_text
    )

    return sorted(
        skill
        for skill in SKILL_KEYWORDS
        if skill in words
    )