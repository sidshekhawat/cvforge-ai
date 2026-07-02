from pydantic import BaseModel

class ResumeParseRequest(BaseModel):
    resume: str

class ParsedResume(BaseModel):
    name: str | None = None
    email: str | None = None
    phone: str | None = None

    skills: list[str] = []

    experience: str = ""
    projects: str = ""
    education: str = ""
    certifications: str = ""