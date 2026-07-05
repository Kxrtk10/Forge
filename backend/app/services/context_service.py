from app.schemas.project import DiscoveryAnswer, ProjectContext
from app.services.intelligence import ContextBuilder, IdeaUnderstandingEngine


class ContextService:
    def __init__(self) -> None:
        self.idea_engine = IdeaUnderstandingEngine()
        self.context_builder = ContextBuilder()

    def build_context(self, answers: list[DiscoveryAnswer]) -> ProjectContext:
        understood = self.idea_engine.understand(answers)
        return self.context_builder.build(understood)
