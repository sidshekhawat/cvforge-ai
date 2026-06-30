from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import getSampleStyleSheet

from reportlab.lib.styles import ParagraphStyle

from reportlab.platypus import HRFlowable


def generate_resume_pdf(
    resume_content: str,
    file_path: str,
    theme: str,
    name: str,
    email: str,
    phone: str,
    linkedin: str | None,
    github: str | None,
    location: str | None
):
    doc = SimpleDocTemplate(file_path)

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
    "CVForgeTitle",
    parent=styles["Title"],
    fontSize=24,
    leading=28
    )

    heading_style = ParagraphStyle(
    "CVForgeHeading",
    parent=styles["Heading2"],
    fontSize=15,
    leading=18,
    spaceAfter=4
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
            file_path,
            name,
            email,
            phone,
            linkedin,
            github,
            location
        )
        return
    
    elif theme == "modern":
        generate_modern_pdf(
            sections,
            file_path,
            name,
            email,
            phone,
            linkedin,
            github,
            location
        )
        return

    elif theme == "minimal":
        generate_minimal_pdf(
            sections,
            file_path,
            name,
            email,
            phone,
            linkedin,
            github,
            location
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
    file_path,
     name,
     email,
     phone,
     linkedin,
     github,
     location
):
     
    doc = SimpleDocTemplate(file_path)

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        "CVForgeTitle",
        parent=styles["Title"],
        fontSize=24,
        leading=28
    )

    heading_style = ParagraphStyle(
        "CVForgeHeading",
        parent=styles["Heading2"],
        fontSize=16,
        leading=18,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        "CVForgeBody",
        parent=styles["BodyText"],
        fontSize=11,
        leading=14
    )

    header_style = ParagraphStyle(
        "CVForgeHeader",
        parent=styles["BodyText"],
        fontSize=10,
        leading=12,
        alignment=1
    )
    story = []

    story.append(
            Paragraph(
                name,
                title_style
            )
        )
    
    contact_info = f"{phone} | {email}"
    story.append(
        Paragraph(
            contact_info,
            header_style
        )
    )
    story.append(
            Spacer(1, 20)
        )
    
    links = []

    if linkedin:
        links.append(linkedin)
    if github:
        links.append(github)
    if location:
        links.append(location)
    
    if links:
        story.append(
            Paragraph(
                " | ".join(links),
                header_style
            )
        )
        story.append(
            Spacer(1, 6)
        )

        story.append(
            HRFlowable(
                width="100%"
            )
        )

        story.append(
            Spacer(1, 10)
        )

    section_titles = {
        "summary": "PROFESSIONAL SUMMARY",
        "skills": "SKILLS",
        "experience": "EXPERIENCE",
        "education": "EDUCATION",
        "projects": "PROJECTS"
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
    file_path,
    name,
    email,
    phone,
    linkedin,
    github,
    location
):
    
    doc = SimpleDocTemplate(file_path)

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        "CVForgeTitle",
        parent=styles["Title"],
        fontSize=32,
        leading=36,
        alignment=0
    )

    heading_style = ParagraphStyle(
        "CVForgeHeading",
        parent=styles["Heading2"],
        fontSize=18,
        leading=18,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        "CVForgeBody",
        parent=styles["BodyText"],
        fontSize=11,
        leading=14
    )

    header_style = ParagraphStyle(
        "CVForgeHeader",
        parent=styles["BodyText"],
        fontSize=12,
        leading=14,
        alignment=0
    )
    story = []

    story.append(
            Paragraph(
                name,
                title_style
            )
        )
    
    contact_info = f"{phone} | {email}"
    story.append(
        Paragraph(
            contact_info,
            header_style
        )
    )
    story.append(
            Spacer(1, 20)
        )
    
    links = []

    if linkedin:
        links.append(linkedin)
    if github:
        links.append(github)
    if location:
        links.append(location)
    
    if links:
        story.append(
            Paragraph(
                " | ".join(links),
                header_style
            )
        )
        story.append(
            Spacer(1, 6)
        )

        story.append(
            HRFlowable(
                width="100%",
                thickness=4
            )
        )

        story.append(
            Spacer(1, 10)
        )

    section_titles = {
        "summary": "Summary",
        "skills": "Skills",
        "experience": "Experience",
        "education": "Educaton",
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
                    Spacer(1, 6)
                )
    story.append(
                    Spacer(1, 10)
                )
    doc.build(story)

def generate_minimal_pdf(
    sections,
    file_path,
    name,
    email,
    phone,
    linkedin,
    github,
    location
):
    doc = SimpleDocTemplate(file_path)

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        "CVForgeTitle",
        parent=styles["Title"],
        fontSize=28,
        leading=24,
        alignment=0
    )

    heading_style = ParagraphStyle(
        "CVForgeHeading",
        parent=styles["Heading2"],
        fontSize=13,
        leading=18,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        "CVForgeBody",
        parent=styles["BodyText"],
        fontSize=10,
        leading=14
    )

    header_style = ParagraphStyle(
        "CVForgeHeader",
        parent=styles["BodyText"],
        fontSize=12,
        leading=14,
        alignment=0
    )
    story = []

    story.append(
            Paragraph(
                name,
                title_style
            )
        )
    
    contact_info = f"{phone} | {email}"
    story.append(
        Paragraph(
            contact_info,
            header_style
        )
    )
    story.append(
            Spacer(1, 20)
        )
    
    links = []

    if linkedin:
        links.append(linkedin)
    if github:
        links.append(github)
    if location:
        links.append(location)
    
    if links:
        story.append(
            Paragraph(
                " | ".join(links),
                header_style
            )
        )
        story.append(
            Spacer(1, 6)
        )

        story.append(
            Spacer(1, 4)
        )

    section_titles = {
        "summary": "Summary",
        "skills": "Skills",
        "experience": "Experience",
        "education": "Educaton",
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
                    Spacer(1, 6)
                )
    story.append(
                    Spacer(1, 10)
                )
    doc.build(story)
