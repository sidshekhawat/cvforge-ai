from pydantic import BaseModel
from typing import Literal

class ResumeGenerationRequest(BaseModel):
    name: str
    skills: str
    experience: str
    education: str
    template: Literal[
        "software_engineer",
        "cybersecurity_analyst",
        "data_analyst",
        "machine_learning_engineer",
        "fresher"
    ]


class ResumeGenerationResponse(BaseModel):
    resume: str