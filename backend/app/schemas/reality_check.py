from pydantic import BaseModel, Field

from app.schemas.project import ProjectContext


class RealityCheckItem(BaseModel):
    title: str
    explanation: str


class ValidationSuggestion(BaseModel):
    task: str
    why: str


class ConfidenceMeter(BaseModel):
    level: str
    explanation: str


class RealityCheck(BaseModel):
    overall_assessment: str
    biggest_strength: RealityCheckItem
    biggest_concern: RealityCheckItem
    hidden_assumptions: list[RealityCheckItem] = Field(default_factory=list)
    missing_information: list[RealityCheckItem] = Field(default_factory=list)
    validation_suggestions: list[ValidationSuggestion] = Field(default_factory=list)
    confidence_meter: ConfidenceMeter


class RealityCheckRequest(BaseModel):
    context: ProjectContext


class RealityCheckResponse(BaseModel):
    reality_check: RealityCheck
