from pydantic import BaseModel
from typing import Optional


class ResumeCreate(BaseModel):
    title: str
    content: Optional[str] = None

class ResumeUpdate(BaseModel):
    title: str
    content: Optional[str] = None


class ResumeResponse(BaseModel):
    id: int
    title: str
    content: Optional[str]
    owner_id: int

    class Config:
        from_attributes = True