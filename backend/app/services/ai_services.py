from groq import Groq

from app.config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)


def generate_resume(
    name: str,
    skills: str,
    experience: str,
    education: str
):
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

Make the resume look suitable for software engineering and technology roles.
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