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