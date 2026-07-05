from app.schemas.project import ProjectContext


class ReportGenerator:
    """Placeholder for future full reports. Disabled for Sprint 2."""

    def preview_status(self, context: ProjectContext) -> str:
        return f"{context.project_name} is ready for deeper analysis after discovery."
