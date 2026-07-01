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
    education_score: int
    experience_score: int
    project_score: int

    matched_keywords: list[str]
    missing_keywords: list[str]

    matched_education_keywords: list[str]
    missing_education_keywords: list[str]

    matched_experience_keywords: list[str]
    missing_experience_keywords: list[str]

    matched_project_keywords: list[str]
    missing_project_keywords: list[str]

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

    name: str
    email: str
    phone: str
    
    linkedin: str | None = None
    github: str | None = None
    location: str | None = None    

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