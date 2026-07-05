from fastapi import APIRouter

from app.schemas.project import ProjectCreateRequest, ProjectCreateResponse
from app.services.analysis_service import AnalysisService
from app.services.context_service import ContextService
from app.services.project_service import ProjectService

router = APIRouter()

context_service = ContextService()
analysis_service = AnalysisService()
project_service = ProjectService()


@router.post("/discover", response_model=ProjectCreateResponse)
async def create_project_context(payload: ProjectCreateRequest) -> ProjectCreateResponse:
    context = context_service.build_context(payload.answers)
    overview = analysis_service.build_overview(context)
    project_id = project_service.project_id_for(context)

    return ProjectCreateResponse(project_id=project_id, context=context, overview=overview)
