from pydantic import BaseModel, Field


class DiscoveryAnswer(BaseModel):
    question_id: str
    answer: str = ""
    skipped: bool = False


class ProjectContext(BaseModel):
    project_name: str
    one_line_summary: str
    problem: str
    target_audience: str
    current_alternatives: str
    unique_value_proposition: str
    business_model: str
    stage: str
    users: str = "Unknown"
    customer_conversations: str = "No customer learning captured yet"
    known_risks: list[str] = Field(default_factory=list)
    founder_goals: str
    unknown_areas: list[str] = Field(default_factory=list)


class ProjectCreateRequest(BaseModel):
    answers: list[DiscoveryAnswer]


class ProjectOverview(BaseModel):
    project_summary: str
    founder_goal: str
    current_stage: str
    known_unknowns: list[str]
    completion_progress: int
    missing_information: list[str]


class ProjectCreateResponse(BaseModel):
    project_id: str
    context: ProjectContext
    overview: ProjectOverview
