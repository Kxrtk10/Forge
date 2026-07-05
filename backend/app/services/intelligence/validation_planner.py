from app.schemas.project import ProjectContext
from app.schemas.reality_check import ValidationSuggestion


class ValidationPlanner:
    def plan(self, context: ProjectContext) -> list[ValidationSuggestion]:
        tasks = [
            ValidationSuggestion(
                task=f"Interview five people who match: {context.target_audience}",
                why="This will show whether the problem is frequent, painful, and described in the customer's own words.",
            ),
            ValidationSuggestion(
                task="Ask how they solve the problem today",
                why="Current workarounds reveal urgency, budget, and what your first version must replace or improve.",
            ),
            ValidationSuggestion(
                task="Prototype the smallest useful workflow",
                why="A focused prototype tests value before you spend time building a full product.",
            ),
        ]

        if context.business_model.lower() in {"not decided yet", "unknown", "not sure yet"}:
            tasks.append(
                ValidationSuggestion(
                    task="Test one simple pricing question",
                    why="Even rough willingness-to-pay feedback will clarify whether this can become a business.",
                )
            )
        else:
            tasks.append(
                ValidationSuggestion(
                    task=f"Check whether {context.business_model} fits how buyers expect to pay",
                    why="A good product can still struggle if the buying motion feels unfamiliar or risky.",
                )
            )

        tasks.append(
            ValidationSuggestion(
                task="Create a waitlist or concierge test",
                why="A real commitment is a stronger signal than compliments or polite interest.",
            )
        )

        return tasks[:5]
