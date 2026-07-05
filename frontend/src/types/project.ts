export type DiscoveryQuestion = {
  id: string;
  prompt: string;
  placeholder: string;
  contextKey:
    | "projectName"
    | "oneLineSummary"
    | "problem"
    | "targetAudience"
    | "currentAlternatives"
    | "uniqueValueProposition"
    | "businessModel"
    | "stage"
    | "users"
    | "customerConversations"
    | "knownRisks"
    | "founderGoals";
};

export type DiscoveryAnswer = {
  questionId: string;
  answer: string;
  skipped: boolean;
};

export type ProjectContext = {
  id: string;
  projectName: string;
  oneLineSummary: string;
  problem: string;
  targetAudience: string;
  currentAlternatives: string;
  uniqueValueProposition: string;
  businessModel: string;
  stage: string;
  users: string;
  customerConversations: string;
  knownRisks: string[];
  founderGoals: string;
  unknownAreas: string[];
  createdAt: string;
  updatedAt: string;
};

export type ProjectOverview = {
  projectSummary: string;
  founderGoal: string;
  currentStage: string;
  knownUnknowns: string[];
  completionProgress: number;
  missingInformation: string[];
};

export type RealityCheckItem = {
  title: string;
  explanation: string;
};

export type ValidationSuggestion = {
  task: string;
  why: string;
};

export type ConfidenceLevel = "Early Idea" | "Needs Validation" | "Promising" | "Strong Foundation";

export type ConfidenceMeter = {
  level: ConfidenceLevel;
  explanation: string;
};

export type RealityCheck = {
  overallAssessment: string;
  biggestStrength: RealityCheckItem;
  biggestConcern: RealityCheckItem;
  hiddenAssumptions: RealityCheckItem[];
  missingInformation: RealityCheckItem[];
  validationSuggestions: ValidationSuggestion[];
  confidenceMeter: ConfidenceMeter;
};
