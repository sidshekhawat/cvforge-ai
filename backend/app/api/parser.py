from fastapi import APIRouter

from app.schemas.resume_parser import (
    ParsedResume
)

from app.services.resume_parser import (
    parse_resume
)

from app.schemas.resume_parser import (
    ResumeParseRequest
)

router = APIRouter(
    prefix="/parser",
    tags=["Parser"]
)


@router.post(
    "/resume",
    response_model=ParsedResume
)
def parse_resume_endpoint(
    request: ResumeParseRequest
):
    return parse_resume(
        request.resume
    )