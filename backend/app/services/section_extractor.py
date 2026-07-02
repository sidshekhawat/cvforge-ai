SECTION_ALIASES = {
    "experience": [
        "experience",
        "work experience",
        "professional experience",
        "employment history"
    ],

    "projects": [
        "projects",
        "personal projects",
        "academic projects"
    ],

    "education": [
        "education",
        "academic background"
    ],

    "certifications": [
        "certifications",
        "certificates",
        "licenses & certifications",
        "licenses and certifications"
    ]
}

ALL_SECTION_HEADERS = {
    alias
    for aliases in SECTION_ALIASES.values()
    for alias in aliases
}

ALL_SECTION_HEADERS.update(
    {
        "summary",
        "professional summary",
        "skills",
        "technical skills"
    }
)


def extract_section(
    resume_text: str,
    section_name: str
):
    lines = resume_text.splitlines()

    section_lines = []

    in_section = False

    target_headers = SECTION_ALIASES.get(
        section_name,
        []
    )

    for line in lines:

        line_lower = (
            line.lower()
            .strip()
            .rstrip(":")
        )

        # Start target section
        if line_lower in target_headers:
            in_section = True
            continue

        # Stop when next section begins
        if (
            in_section
            and line_lower in ALL_SECTION_HEADERS
        ):
            break

        if in_section:
            section_lines.append(line)

    return "\n".join(
        section_lines
    ).strip()