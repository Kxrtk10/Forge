from app.schemas.project import ProjectContext


class FutureMentorEngine:
    """Future conversational mentor layer."""

    def next_question(self, context: ProjectContext) -> str | None:
        return context.unknown_areas[0] if context.unknown_areas else None
