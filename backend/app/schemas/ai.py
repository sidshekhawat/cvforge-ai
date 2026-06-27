from pydantic import BaseModel


class ResumeGenerationRequest(BaseModel):
    name: str
    skills: str
    experience: str
    education: str


class ResumeGenerationResponse(BaseModel):
    resume: str