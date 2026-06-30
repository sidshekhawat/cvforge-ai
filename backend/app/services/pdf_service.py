from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import getSampleStyleSheet

from reportlab.lib.styles import ParagraphStyle


def generate_resume_pdf(
    resume_content: str,
    file_path: str,
    theme: str
):
    doc = SimpleDocTemplate(file_path)

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
    "CVForgeTitle",
    parent=styles["Title"],
    fontSize=22,
    leading=26
    )

    heading_style = ParagraphStyle(
    "CVForgeHeading",
    parent=styles["Heading2"],
    fontSize=14,
    leading=18
    )

    body_style = ParagraphStyle(
    "CVForgeBody",
    parent=styles["BodyText"],
    fontSize=11,
    leading=14
    )

    sections = parse_resume_sections(
    resume_content
    )

    if theme == "classic":
        generate_classic_pdf(
            sections,
            file_path
        )
        return
    
    elif theme == "modern":
        generate_modern_pdf(
            sections,
            file_path
        )
        return

    elif theme == "minimal":
        generate_minimal_pdf(
            sections,
            file_path
        )
        return

def parse_resume_sections(
    resume_content: str
):
    sections = {
        "summary": "",
        "skills": "",
        "experience": "",
        "education": "",
        "projects": ""
    }

    current_section = None

    for line in resume_content.splitlines():

        line_lower = line.lower().strip().rstrip(":")

        if line_lower == "summary":
            current_section = "summary"
            continue

        if line_lower == "skills":
            current_section = "skills"
            continue

        if line_lower == "experience":
            current_section = "experience"
            continue

        if line_lower == "education":
            current_section = "education"
            continue

        if line_lower == "projects":
            current_section = "projects"
            continue

        if current_section:
            sections[current_section] += line + "\n"

    return sections

def generate_classic_pdf(
    sections,
    file_path
):
     
    doc = SimpleDocTemplate(file_path)

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        "CVForgeTitle",
        parent=styles["Title"],
        fontSize=22,
        leading=26
    )

    heading_style = ParagraphStyle(
        "CVForgeHeading",
        parent=styles["Heading2"],
        fontSize=16,
        leading=18
    )

    body_style = ParagraphStyle(
        "CVForgeBody",
        parent=styles["BodyText"],
        fontSize=11,
        leading=14
    )
    story = []

    story.append(
            Paragraph(
                "CVForge AI Resume",
                title_style
            )
        )
    story.append(
            Spacer(1, 20)
        )

    section_titles = {
        "summary": "PROFESSIONAL SUMMARY",
        "skills": "SKILLS",
        "experience": "EXPERIENCE",
        "education": "EDUCATION",
        "projects": "Projects"
        }

    for key, title in section_titles.items():

            if sections[key].strip():
                story.append(
                    Paragraph(
                        title,
                        heading_style
                    )
                )
                story.append(
                    Paragraph(
                        sections[key].replace(
                            "\n",
                            "<br/>"
                        ),
                        body_style
                    )
                )
                story.append(
                    Spacer(1, 12)
                )
    story.append(
                    Spacer(1, 10)
                )
    doc.build(story)

def generate_modern_pdf(
    sections,
    file_path
):
    pass

def generate_minimal_pdf(
    sections,
    file_path
):
    pass