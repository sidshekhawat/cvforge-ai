from fastapi import FastAPI

from app.api.auth import router as auth_router

from app.api.resume import router as resume_router

app = FastAPI(
    title="CVForge AI API",
    description="Backend API for CVForge AI",
    version="1.0.0",
)

app.include_router(auth_router)
app.include_router(resume_router)


@app.get("/")
def root():
    return {"message": "Welcome to CVForge AI"}