from app.schemas.project import ProjectContext


QUESTION_LABELS = {
    "what-building": "What are you building?",
    "problem": "What problem are you solving?",
    "audience": "Who experiences this problem?",
    "alternatives": "How are they solving it today?",
    "different": "Why is your solution different?",
    "money": "How will you make money?",
    "excitement": "Why are you excited about this?",
    "stage": "What stage are you at?",
    "users": "Do you already have users?",
    "customers": "Have you spoken to potential customers?",
    "worries": "What worries you the most?",
}


class ContextBuilder:
    """Builds the permanent project context used by future intelligence calls."""

    def build(self, understood: dict[str, str]) -> ProjectContext:
        project_name = self._project_name(understood.get("what-building", ""))
        problem = understood.get("problem", "Not clear yet")
        target = understood.get("audience", "Still being explored")
        unknown_areas = [label for key, label in QUESTION_LABELS.items() if not understood.get(key)]

        return ProjectContext(
            project_name=project_name,
            one_line_summary=self._summary(project_name, target, problem),
            problem=problem,
            target_audience=target,
            current_alternatives=understood.get("alternatives", "Unknown"),
            unique_value_proposition=understood.get("different", "Still being shaped"),
            business_model=understood.get("money", "Not decided yet"),
            stage=understood.get("stage", "Early idea"),
            users=understood.get("users", "Unknown"),
            customer_conversations=understood.get("customers", "No customer learning captured yet"),
            known_risks=self._risks(understood.get("worries", "")),
            founder_goals=understood.get("excitement", "Build something people genuinely want"),
            unknown_areas=unknown_areas,
        )

    def _project_name(self, value: str) -> str:
        if not value:
            return "Untitled Project"
        return value.replace("\n", " ").split(".")[0].strip()[:72] or "Untitled Project"

    def _summary(self, name: str, target: str, problem: str) -> str:
        if target != "Still being explored" and problem != "Not clear yet":
            return f"{name} helps {target} with {problem.lower()}"
        if problem != "Not clear yet":
            return f"{name} is focused on {problem.lower()}"
        return f"{name} is an early idea that needs clearer context."

    def _risks(self, value: str) -> list[str]:
        if not value:
            return []
        return [risk.strip() for risk in value.replace("\n", ",").split(",") if risk.strip()][:5]
