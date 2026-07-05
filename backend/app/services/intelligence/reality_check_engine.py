from app.schemas.project import ProjectContext
from app.schemas.reality_check import RealityCheck
from app.services.intelligence.assumption_analyzer import AssumptionAnalyzer
from app.services.intelligence.confidence_evaluator import ConfidenceEvaluator
from app.services.intelligence.risk_detector import RiskDetector
from app.services.intelligence.validation_planner import ValidationPlanner


class RealityCheckEngine:
    def __init__(self) -> None:
        self.assumptions = AssumptionAnalyzer()
        self.risks = RiskDetector()
        self.validation = ValidationPlanner()
        self.confidence = ConfidenceEvaluator()

    def generate(self, context: ProjectContext) -> RealityCheck:
        biggest_strength = self.risks.biggest_strength(context)
        biggest_concern = self.risks.biggest_concern(context)
        confidence = self.confidence.evaluate(context)

        return RealityCheck(
            overall_assessment=self._overall_assessment(context, confidence.level),
            biggest_strength=biggest_strength,
            biggest_concern=biggest_concern,
            hidden_assumptions=self.assumptions.analyze(context),
            missing_information=self.risks.missing_information(context),
            validation_suggestions=self.validation.plan(context),
            confidence_meter=confidence,
        )

    def _overall_assessment(self, context: ProjectContext, confidence_level: str) -> str:
        return (
            f"{context.project_name} is at the {context.stage.lower()} stage. "
            f"Forge understands the core problem as: {context.problem}. "
            f"The idea is currently best treated as {confidence_level.lower()}, which means the next work should focus on evidence, not extra features."
        )
