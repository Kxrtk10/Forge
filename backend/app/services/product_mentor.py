class ProductMentorService:
    """Coordinates product mentoring workflows without coupling them to HTTP routes."""

    def validate_idea(self, idea: str) -> dict[str, str]:
        return {"status": "pending", "idea": idea}
