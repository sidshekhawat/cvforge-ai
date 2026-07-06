from groq import Groq

from app.config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)

from app.services.text_utils import (
    extract_keywords
)

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
   
    resume_words = extract_keywords(
            resume
        )

    jd_words = extract_keywords(
            job_description
        )

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

    Your task is to improve the resume while keeping it 100% truthful.

    ABSOLUTE RULES:

    1. Every piece of information in the output must already exist in the original resume.
    2. Do NOT invent skills.
    3. Do NOT invent technologies.
    4. Do NOT invent certifications.
    5. Do NOT invent education.
    6. Do NOT invent projects.
    7. Do NOT invent companies.
    8. Do NOT invent internships.
    9. Do NOT invent work experience.
    10. Do NOT invent job titles.
    11. Do NOT invent achievements.
    12. Do NOT invent responsibilities.
    13. Do NOT invent contact information.
    14. Do NOT add placeholder text.
    15. If information is missing, leave it missing.
    16. Every statement in the optimized resume must be traceable to the original resume.

    JOB DESCRIPTION RULES:

    The job description is ONLY provided to:

    - improve wording
    - improve keyword placement
    - improve organization
    - improve ATS readability

    The job description must NEVER be used to:

    - create new skills
    - create new experience
    - create new projects
    - create new education
    - create new certifications
    - create new job titles
    - create new internships

    FORMATTING RULES:

    1. Do NOT use markdown.
    2. Do NOT use **.
    3. Do NOT use # headings.
    4. Do NOT use ###.
    5. Do NOT use placeholder sections.
    6. Do NOT write notes.
    7. Do NOT write explanations.
    8. Do NOT write recommendations.
    9. Do NOT write "Not Provided".
    10. Do NOT write "Contact Information" unless contact information already exists in the resume.
    11. Return ONLY the optimized resume text.
    12. Do not explain your reasoning.
    13. Do not describe your changes.
    14. Do not provide a summary.
    15. Do not provide notes.
    16. Do not provide commentary.

    ATS OPTIMIZATION RULES:

    1. Improve grammar.
    2. Improve clarity.
    3. Improve professional wording.
    4. Improve section organization.
    5. Strengthen existing bullet points.
    6. Improve keyword placement using keywords already present in the resume.
    7. Preserve all facts.
    8. Preserve all technologies already mentioned.
    9. Preserve all projects already mentioned.

    RESUME:
    {resume}

    JOB DESCRIPTION:
    {job_description}

    FINAL INSTRUCTION:

    Your response must contain ONLY the final optimized resume.

    Do NOT write:
    - Notes
    - Explanations
    - Comments
    - Recommendations
    - Introductions
    - Conclusions
    - Statements about what you changed

    The last line of your response must be part of the resume itself.

    If you write anything outside the resume, your response is incorrect.
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