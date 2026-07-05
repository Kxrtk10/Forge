from app.schemas.project import ProjectContext
from app.schemas.reality_check import ConfidenceMeter


class ConfidenceEvaluator:
    def evaluate(self, context: ProjectContext) -> ConfidenceMeter:
        score = 0
        if context.problem and context.problem != "Not clear yet":
            score += 1
        if context.target_audience and context.target_audience != "Still being explored":
            score += 1
        if context.current_alternatives and context.current_alternatives != "Unknown":
            score += 1
        if context.unique_value_proposition and context.unique_value_proposition != "Still being shaped":
            score += 1
        if context.customer_conversations and "no customer learning" not in context.customer_conversations.lower():
            score += 1
        if context.users and context.users != "Unknown" and "no users" not in context.users.lower():
            score += 1
        if context.business_model and context.business_model != "Not decided yet":
            score += 1

        if score <= 2:
            return ConfidenceMeter(
                level="Early Idea",
                explanation="Forge has a starting direction, but the idea still needs clearer customer and problem evidence.",
            )
        if score <= 4:
            return ConfidenceMeter(
                level="Needs Validation",
                explanation="The idea is understandable, but the next step is proving demand with real customer behavior.",
            )
        if score <= 6:
            return ConfidenceMeter(
                level="Promising",
                explanation="There are useful signals here. Focus now on narrowing scope and testing willingness to act or pay.",
            )
        return ConfidenceMeter(
            level="Strong Foundation",
            explanation="Forge sees a clear problem, audience, differentiation, and early evidence. The next challenge is execution focus.",
        )
