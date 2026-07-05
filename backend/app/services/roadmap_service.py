from app.schemas.project import ProjectContext
from app.services.intelligence import RoadmapGenerator


class RoadmapService:
    def __init__(self) -> None:
        self.generator = RoadmapGenerator()

    def readiness_note(self, context: ProjectContext) -> str:
        return self.generator.readiness_note(context)
