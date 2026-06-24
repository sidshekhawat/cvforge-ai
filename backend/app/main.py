from fastapi import FastAPI

app = FastAPI(
    title="CVForge AI API",
    description="Backend API for CVForge AI",
    version="1.0.0"
)

@app.get("/")
def root():
    return {
        "message": "Welcome to CVForge AI "
    }