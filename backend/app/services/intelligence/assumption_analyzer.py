from app.schemas.project import ProjectContext
from app.schemas.reality_check import RealityCheckItem


class AssumptionAnalyzer:
    def analyze(self, context: ProjectContext) -> list[RealityCheckItem]:
        assumptions = [
            RealityCheckItem(
                title="People feel this problem often enough",
                explanation=(
                    f"Forge only knows that the problem is: {context.problem}. The next proof is whether "
                    "this happens often enough for people to change behavior."
                ),
            ),
            RealityCheckItem(
                title="The audience is reachable",
                explanation=(
                    f"The current audience is {context.target_audience}. The idea depends on being able to find "
                    "these people and speak with them directly."
                ),
            ),
            RealityCheckItem(
                title="The difference is valuable enough",
                explanation=(
                    f"Your stated difference is: {context.unique_value_proposition}. Customers must see that as "
                    "meaningfully better than what they do today."
                ),
            ),
        ]

        if context.business_model.lower() in {"not decided yet", "unknown", "not sure yet"}:
            assumptions.append(
                RealityCheckItem(
                    title="There is a believable way to make money",
                    explanation="The business model is still unclear, so willingness to pay remains an open question.",
                )
            )
        else:
            assumptions.append(
                RealityCheckItem(
                    title="Customers will pay through this model",
                    explanation=(
                        f"The planned model is {context.business_model}. Forge still needs evidence that this "
                        "pricing path fits how customers expect to buy."
                    ),
                )
            )

        return assumptions[:5]
