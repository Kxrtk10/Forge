from app.schemas.project import ProjectContext
from app.schemas.reality_check import RealityCheck
from app.services.intelligence.reality_check_engine import RealityCheckEngine


class RealityCheckService:
    def __init__(self) -> None:
        self.engine = RealityCheckEngine()

    def generate(self, context: ProjectContext) -> RealityCheck:
        return self.engine.generate(context)
