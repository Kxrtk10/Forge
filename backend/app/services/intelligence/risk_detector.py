from app.schemas.project import ProjectContext
from app.schemas.reality_check import RealityCheckItem


class RiskDetector:
    def biggest_strength(self, context: ProjectContext) -> RealityCheckItem:
        if context.customer_conversations and "no customer learning" not in context.customer_conversations.lower():
            return RealityCheckItem(
                title="You are already learning from real people",
                explanation=(
                    "Customer conversations are one of the strongest early signals. They keep the idea grounded "
                    "in real behavior instead of guesses."
                ),
            )

        if context.unique_value_proposition and "still being shaped" not in context.unique_value_proposition.lower():
            return RealityCheckItem(
                title="The idea has a clear point of difference",
                explanation=(
                    f"Forge can already see a reason this may feel different: {context.unique_value_proposition}. "
                    "That gives you something specific to test."
                ),
            )

        return RealityCheckItem(
            title="The problem is named clearly enough to begin",
            explanation="You have a starting problem to investigate. That is enough to begin learning from potential users.",
        )

    def biggest_concern(self, context: ProjectContext) -> RealityCheckItem:
        if context.known_risks:
            return RealityCheckItem(
                title=context.known_risks[0],
                explanation="This matters because the first version should reduce the largest risk before adding more scope.",
            )

        if context.customer_conversations.lower().startswith("no customer"):
            return RealityCheckItem(
                title="Not enough customer evidence yet",
                explanation="The idea may be reasonable, but Forge does not yet see proof that real people feel this pain strongly.",
            )

        if context.business_model.lower() in {"not decided yet", "unknown", "not sure yet"}:
            return RealityCheckItem(
                title="The path to revenue is unclear",
                explanation="Without a simple money model, it is hard to know who the product must serve first and what value matters most.",
            )

        return RealityCheckItem(
            title="The first version may be too broad",
            explanation="Early products work best when they solve one painful workflow extremely well before expanding.",
        )

    def missing_information(self, context: ProjectContext) -> list[RealityCheckItem]:
        missing = [RealityCheckItem(title=area, explanation="This was skipped or left unclear during discovery.") for area in context.unknown_areas[:4]]

        if "pricing" not in " ".join(item.title.lower() for item in missing) and context.business_model.lower() in {
            "not decided yet",
            "unknown",
            "not sure yet",
        }:
            missing.append(RealityCheckItem(title="Pricing", explanation="Forge needs to know how customers might pay and what feels fair."))

        if "customer" not in context.customer_conversations.lower() or context.customer_conversations.lower().startswith("no customer"):
            missing.append(
                RealityCheckItem(
                    title="Customer interviews",
                    explanation="Forge needs direct quotes or patterns from people who experience the problem.",
                )
            )

        if context.current_alternatives.lower() in {"unknown", "not clear yet"}:
            missing.append(
                RealityCheckItem(
                    title="Current alternatives",
                    explanation="Understanding today's workaround shows how painful the problem really is.",
                )
            )

        if not missing:
            missing.append(
                RealityCheckItem(
                    title="Distribution",
                    explanation="Forge still needs to know how the first users will find and trust this product.",
                )
            )

        unique: list[RealityCheckItem] = []
        seen: set[str] = set()
        for item in missing:
            key = item.title.lower()
            if key not in seen:
                unique.append(item)
                seen.add(key)

        return unique[:6]
