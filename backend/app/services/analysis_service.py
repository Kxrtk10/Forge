from app.schemas.project import ProjectContext, ProjectOverview
from app.services.intelligence import InsightGenerator


class AnalysisService:
    def __init__(self) -> None:
        self.insights = InsightGenerator()

    def build_overview(self, context: ProjectContext) -> ProjectOverview:
        total_questions = 11
        missing = context.unknown_areas[:5]
        progress = round(((total_questions - len(context.unknown_areas)) / total_questions) * 100)

        return ProjectOverview(
            project_summary=context.one_line_summary,
            founder_goal=context.founder_goals,
            current_stage=context.stage,
            known_unknowns=self.insights.known_unknowns(context),
            completion_progress=max(0, min(100, progress)),
            missing_information=missing,
        )
