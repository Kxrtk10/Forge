from app.schemas.project import ProjectContext


class InsightGenerator:
    """Creates deterministic early insights from project context."""

    def known_unknowns(self, context: ProjectContext) -> list[str]:
        if context.known_risks:
            return context.known_risks
        return ["The most important risks have not been named yet"]
