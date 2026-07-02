from services.section_extractor import extract_section

resume = """
PROFESSIONAL SUMMARY

Backend Developer

PROFESSIONAL EXPERIENCE

Worked with FastAPI

ACADEMIC PROJECTS

Built CVForge

EDUCATION

B.Tech Computer Science

Data Structures
Algorithms
Database Management Systems
Operating Systems

CERTIFICATES

AWS Certified
Docker Certified
"""

print(
    extract_section(
        resume,
        "education"
    )
)