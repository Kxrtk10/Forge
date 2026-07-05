from app.schemas.project import DiscoveryAnswer


class IdeaUnderstandingEngine:
    """Normalizes discovery answers before downstream context building."""

    def understand(self, answers: list[DiscoveryAnswer]) -> dict[str, str]:
        return {
            answer.question_id: answer.answer.strip()
            for answer in answers
            if not answer.skipped and answer.answer.strip()
        }
