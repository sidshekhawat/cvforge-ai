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

class ResumeAnalysisRequest(BaseModel):

    resume: str

    job_description: str

class ResumeAnalysisResponse(BaseModel):

    ats_score: int

    matched_keywords: list[str]

    missing_keywords: list[str]

    strengths: list[str]

    weaknesses: list[str]

    suggestions: list[str]

class ResumeOptimizationRequest(BaseModel):
    resume: str
    job_description: str

class ResumeOptimizationResponse(BaseModel):
    optimized_resume: str

class ResumePDFRequest(BaseModel):
    resume_content: str

    theme: Literal[
        "classic",
        "modern",
        "minimal"
    ] = "classic"

class CoverLetterRequest(BaseModel):
    resume: str
    job_description: str

class CoverLetterResponse(BaseModel):
    cover_letter: str