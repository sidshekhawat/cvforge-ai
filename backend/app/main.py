from fastapi import FastAPI

from app.api.auth import router as auth_router

from app.api.resume import router as resume_router

from app.api.ai import router as ai_router

from app.api.parser import (
    router as parser_router
)

from app.api.skill_gap import router as skill_gap_router

from fastapi.middleware.cors import CORSMiddleware

from fastapi import UploadFile, File
from app.services.file_parser import (
    extract_text_from_pdf,
    extract_text_from_docx,
)
from app.api import job_match

app = FastAPI(
    title="CVForge AI API",
    description="Backend API for CVForge AI",
    version="1.0.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(resume_router)
app.include_router(ai_router)
app.include_router(
    parser_router
)
app.include_router(
    skill_gap_router
)
app.include_router(
    job_match.router,
    prefix="/ai",
    tags=["Job Match"]
)

@app.get("/")
def root():
    return {"message": "Welcome to CVForge AI"}

@app.post("/upload-resume/")
async def upload_resume(
    file: UploadFile = File(...)
):
    file_bytes = await file.read()

    filename = file.filename.lower()

    if filename.endswith(".pdf"):
        text = extract_text_from_pdf(
            file_bytes
        )

    elif filename.endswith(".docx"):
        text = extract_text_from_docx(
            file_bytes
        )

    else:
        return {
            "error": "Unsupported file format"
        }

    return {
        "text": text
    }