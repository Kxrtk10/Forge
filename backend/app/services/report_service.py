from app.schemas.project import ProjectContext
from app.services.intelligence import ReportGenerator


class ReportService:
    def __init__(self) -> None:
        self.generator = ReportGenerator()

    def preview_status(self, context: ProjectContext) -> str:
        return self.generator.preview_status(context)
