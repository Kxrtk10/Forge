import re

from app.schemas.project import ProjectContext


class ProjectService:
    def project_id_for(self, context: ProjectContext) -> str:
        slug = re.sub(r"[^a-z0-9]+", "-", context.project_name.lower()).strip("-")
        return slug[:48] or "untitled-project"
