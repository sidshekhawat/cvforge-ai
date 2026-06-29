from groq import Groq

from app.config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)


def generate_resume(
    name: str,
    skills: str,
    experience: str,
    education: str,
    template: str
):
    template_instructions = {
    "software_engineer":
        "Focus on programming languages, software development, APIs, databases, Git, projects, and engineering achievements.",

    "cybersecurity_analyst":
        "Focus on cybersecurity, network security, vulnerability assessment, incident response, threat detection, digital forensics, and security projects.",

    "data_analyst":
        "Focus on SQL, Excel, Power BI, Tableau, Python, data visualization, reporting, and analytics projects.",

    "machine_learning_engineer":
        "Focus on machine learning, deep learning, AI models, data science, Python, TensorFlow, PyTorch, and AI projects.",

    "fresher":
        "Focus on education, academic achievements, internships, certifications, technical skills, and student projects."
}
    

    selected_template = template_instructions.get(
    template,
    template_instructions["software_engineer"]
)
    prompt = f"""
Generate an ATS-friendly professional resume.

Candidate Information:

Name: {name}

Skills:
{skills}

Experience:
{experience}

Education:
{education}

Requirements:
- Do NOT use markdown.
- Do NOT use ** symbols.
- Do NOT use # headings.
- Do NOT invent phone numbers.
- Do NOT invent email addresses.
- Do NOT invent LinkedIn profiles.
- Do NOT add placeholder fields such as "Not Provided".

Formatting Rules:
- Keep the resume ATS-friendly.
- Use clear section headings.
- Use bullet points for Skills.
- Use bullet points for Experience.
- Use bullet points for Projects.
- Limit the Professional Summary to 2-3 lines.
- Keep descriptions concise and professional.
- Do not write large paragraphs.

Resume Format:

First line must be the candidate's name in uppercase.

Then use these section headings:

PROFESSIONAL SUMMARY
SKILLS
EXPERIENCE
EDUCATION
PROJECTS

For SKILLS, EXPERIENCE and PROJECTS use bullet points.

Example format:

SIDDHANT SINGH

PROFESSIONAL SUMMARY
Short 2-3 line summary.

SKILLS
• Python
• FastAPI
• PostgreSQL

EXPERIENCE
• Achievement 1
• Achievement 2

PROJECTS
CVForge AI
• Achievement

SecureVision
• Achievement

Convert the provided experience into strong resume bullet points.

Template Guidance:

{selected_template}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content

import re


def analyze_resume_keywords(
    resume: str,
    job_description: str
):
    resume_words = set(
        re.findall(r"\b\w+\b", resume.lower())
    )

    jd_words = set(
        re.findall(r"\b\w+\b", job_description.lower())
    )

    stop_words = {
    "a", "an", "the", "and", "or", "but",
    "is", "are", "was", "were",
    "to", "of", "in", "on", "for",
    "with", "at", "by", "from",
    "have", "has", "had",
    "be", "been", "being"

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
    "development"
}
    resume_words = resume_words - stop_words
    jd_words = jd_words - stop_words

    matched_keywords = sorted(
        list(resume_words & jd_words)
    )

    missing_keywords = sorted(
        list(jd_words - resume_words)
    )

    return matched_keywords, missing_keywords

def review_resume(
    resume: str,
    job_description: str
):
    prompt = f"""
    You are an ATS resume reviewer.

Analyze the resume against the job description.

Resume:
{resume}

Job Description:
{job_description}

Return your response EXACTLY in this format:

STRENGTHS:
- strength 1
- strength 2
- strength 3

WEAKNESSES:
- weakness 1
- weakness 2
- weakness 3

SUGGESTIONS:
- suggestion 1
- suggestion 2
- suggestion 3

Do not include any introduction or conclusion.
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content

def parse_review(review_text: str):
    strengths = []
    weaknesses = []
    suggestions = []

    current_section = None

    for line in review_text.splitlines():
        line = line.strip()

        if line.startswith("STRENGTHS"):
            current_section = "strengths"
            continue

        elif line.startswith("WEAKNESSES"):
            current_section = "weaknesses"
            continue

        elif line.startswith("SUGGESTIONS"):
            current_section = "suggestions"
            continue

        elif line.startswith("-"):
            item = line.lstrip("- ").strip()

            if current_section == "strengths":
                strengths.append(item)

            elif current_section == "weaknesses":
                weaknesses.append(item)

            elif current_section == "suggestions":
                suggestions.append(item)

    return strengths, weaknesses, suggestions

def calculate_structure_score(
    resume: str
):
    score = 0

    sections = [
        "summary",
        "skills",
        "experience",
        "education",
        "projects"
    ]

    resume_lower = resume.lower()

    for section in sections:
        if section in resume_lower:
            score += 4

    return score

def calculate_skills_score(
    matched_keywords,
    missing_keywords
):
    total_skills = (
        len(matched_keywords)
        + len(missing_keywords)
    )

    if total_skills == 0:
        return 0

    return int(
        (len(matched_keywords) / total_skills)
        * 20
    )

def calculate_final_ats_score(
    matched_keywords,
    missing_keywords,
    structure_score,
    skills_score,
    weaknesses
):
    total_keywords = (
        len(matched_keywords)
        + len(missing_keywords)
    )

    # Keyword Score (50)
    if total_keywords == 0:
        keyword_score = 0
    else:
        keyword_score = int(
            (len(matched_keywords) / total_keywords)
            * 50
        )

    # AI Review Score (10)
    if len(weaknesses) <= 1:
        review_score = 10
    elif len(weaknesses) == 2:
        review_score = 8
    elif len(weaknesses) == 3:
        review_score = 6
    else:
        review_score = 4

    final_score = (
        keyword_score
        + structure_score
        + skills_score
        + review_score
    )

    return min(final_score, 100)

def optimize_resume(
    resume: str,
    job_description: str
):
    prompt = f"""
    You are an expert ATS resume optimizer.

    Your task is to improve the resume while keeping it completely truthful.

    Rules:
    1. Improve formatting and readability.
    2. Improve ATS compatibility.
    3. Reorganize information where useful.
    4. Preserve all existing facts.
    5. Do NOT invent skills, technologies, certifications, education, projects, companies, or job experience.
    6. Do NOT claim knowledge of tools not present in the original resume.
    7. If a skill is missing from the resume, do not add it.
    8. Return only the optimized resume.

    RESUME:
    {resume}

    JOB DESCRIPTION:
    {job_description}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )
    return response.choices[0].message.content

def generate_cover_letter(
    resume: str,
    job_description: str
):
    prompt = f"""
    You are an expert career coach and recruiter.

    Using the resume and job description:

    1. Write a professional cover letter.
    2. Keep it concise.
    3. Tailor it to the job.
    4. Highlight relevant experience.
    5. Do not invent qualifications.
    6. Return only the cover letter.

    RESUME:
    {resume}

    JOB DESCRIPTION:
    {job_description}
    """
    response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {
            "role": "user",
            "content": prompt
        }
    ]
)

    return response.choices[0].message.content