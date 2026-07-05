import type {
  ConfidenceLevel,
  DiscoveryAnswer,
  DiscoveryQuestion,
  ProjectContext,
  ProjectOverview,
  RealityCheck,
  RealityCheckItem,
  ValidationSuggestion,
} from "@/types/project";

export const discoveryQuestions: DiscoveryQuestion[] = [
  {
    id: "what-building",
    prompt: "What are you building?",
    placeholder: "A short name or simple description is enough.",
    contextKey: "projectName",
  },
  {
    id: "problem",
    prompt: "What problem are you solving?",
    placeholder: "What feels painful, slow, confusing, or expensive?",
    contextKey: "problem",
  },
  {
    id: "audience",
    prompt: "Who experiences this problem?",
    placeholder: "Describe the people or teams who feel it most.",
    contextKey: "targetAudience",
  },
  {
    id: "alternatives",
    prompt: "How are they solving it today?",
    placeholder: "Spreadsheets, manual work, another tool, hiring someone, doing nothing...",
    contextKey: "currentAlternatives",
  },
  {
    id: "different",
    prompt: "Why is your solution different?",
    placeholder: "What makes your approach easier, faster, calmer, cheaper, or better?",
    contextKey: "uniqueValueProposition",
  },
  {
    id: "money",
    prompt: "How will you make money?",
    placeholder: "Subscription, services, marketplace fee, usage pricing, not sure yet...",
    contextKey: "businessModel",
  },
  {
    id: "excitement",
    prompt: "Why are you excited about this?",
    placeholder: "What makes this worth your time and energy?",
    contextKey: "founderGoals",
  },
  {
    id: "stage",
    prompt: "What stage are you at?",
    placeholder: "Idea, notes, prototype, MVP, launched, growing...",
    contextKey: "stage",
  },
  {
    id: "users",
    prompt: "Do you already have users?",
    placeholder: "No users yet, a few testers, paying customers, waitlist...",
    contextKey: "users",
  },
  {
    id: "customers",
    prompt: "Have you spoken to potential customers?",
    placeholder: "Tell Forge who you spoke with and what you learned.",
    contextKey: "customerConversations",
  },
  {
    id: "worries",
    prompt: "What worries you the most?",
    placeholder: "Demand, building too much, competition, pricing, finding users...",
    contextKey: "knownRisks",
  },
];

const DRAFT_KEY = "forge:project-discovery-draft";
const PROJECTS_KEY = "forge:projects";

export type DiscoveryDraft = {
  answers: DiscoveryAnswer[];
  currentQuestion: number;
  updatedAt: string;
};

export function getDiscoveryDraft(): DiscoveryDraft | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(DRAFT_KEY);
  return raw ? (JSON.parse(raw) as DiscoveryDraft) : null;
}

export function saveDiscoveryDraft(draft: DiscoveryDraft) {
  window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

export function clearDiscoveryDraft() {
  window.localStorage.removeItem(DRAFT_KEY);
}

export function getProjects(): ProjectContext[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(PROJECTS_KEY);
  return raw ? (JSON.parse(raw) as ProjectContext[]) : [];
}

export function getProject(projectId: string): ProjectContext | null {
  return getProjects().find((project) => project.id === projectId) ?? null;
}

export function saveProjectContext(context: ProjectContext) {
  const projects = getProjects().filter((project) => project.id !== context.id);
  window.localStorage.setItem(PROJECTS_KEY, JSON.stringify([context, ...projects]));
}

export function buildProjectContext(answers: DiscoveryAnswer[]): ProjectContext {
  const now = new Date().toISOString();
  const answerMap = new Map(answers.map((answer) => [answer.questionId, answer]));

  function value(questionId: string) {
    const answer = answerMap.get(questionId);
    return answer && !answer.skipped ? answer.answer.trim() : "";
  }

  const projectName = cleanProjectName(value("what-building"));
  const targetAudience = value("audience");
  const problem = value("problem");
  const stage = value("stage") || "Early idea";
  const knownRisks = splitRisks(value("worries"));
  const unknownAreas = discoveryQuestions
    .filter((question) => {
      const answer = answerMap.get(question.id);
      return !answer || answer.skipped || !answer.answer.trim();
    })
    .map((question) => question.prompt);

  return {
    id: slugify(projectName),
    projectName,
    oneLineSummary: buildSummary(projectName, targetAudience, problem),
    problem: problem || "Not clear yet",
    targetAudience: targetAudience || "Still being explored",
    currentAlternatives: value("alternatives") || "Unknown",
    uniqueValueProposition: value("different") || "Still being shaped",
    businessModel: value("money") || "Not decided yet",
    stage,
    users: value("users") || "Unknown",
    customerConversations: value("customers") || "No customer learning captured yet",
    knownRisks,
    founderGoals: value("excitement") || "Build something people genuinely want",
    unknownAreas,
    createdAt: now,
    updatedAt: now,
  };
}

export function buildProjectOverview(context: ProjectContext): ProjectOverview {
  const missingInformation = context.unknownAreas.slice(0, 5);
  const completionProgress = Math.round(
    ((discoveryQuestions.length - context.unknownAreas.length) / discoveryQuestions.length) * 100,
  );

  return {
    projectSummary: context.oneLineSummary,
    founderGoal: context.founderGoals,
    currentStage: context.stage,
    knownUnknowns: context.knownRisks.length > 0 ? context.knownRisks : ["The biggest risks are not clear yet"],
    completionProgress,
    missingInformation,
  };
}

export function buildRealityCheck(context: ProjectContext): RealityCheck {
  const confidenceMeter = evaluateConfidence(context);

  return {
    overallAssessment: `${context.projectName} is at the ${context.stage.toLowerCase()} stage. Forge understands the core problem as: ${context.problem}. The idea is currently best treated as ${confidenceMeter.level.toLowerCase()}, which means the next work should focus on evidence, not extra features.`,
    biggestStrength: detectBiggestStrength(context),
    biggestConcern: detectBiggestConcern(context),
    hiddenAssumptions: analyzeAssumptions(context),
    missingInformation: findMissingInformation(context),
    validationSuggestions: planValidation(context),
    confidenceMeter,
  };
}

function detectBiggestStrength(context: ProjectContext): RealityCheckItem {
  if (hasCustomerLearning(context)) {
    return {
      title: "You are already learning from real people",
      explanation:
        "Customer conversations are one of the strongest early signals. They keep the idea grounded in real behavior instead of guesses.",
    };
  }

  if (!isUnclear(context.uniqueValueProposition, "Still being shaped")) {
    return {
      title: "The idea has a clear point of difference",
      explanation: `Forge can already see a reason this may feel different: ${context.uniqueValueProposition}. That gives you something specific to test.`,
    };
  }

  return {
    title: "The problem is named clearly enough to begin",
    explanation: "You have a starting problem to investigate. That is enough to begin learning from potential users.",
  };
}

function detectBiggestConcern(context: ProjectContext): RealityCheckItem {
  if (context.knownRisks.length > 0) {
    return {
      title: context.knownRisks[0],
      explanation: "This matters because the first version should reduce the largest risk before adding more scope.",
    };
  }

  if (!hasCustomerLearning(context)) {
    return {
      title: "Not enough customer evidence yet",
      explanation: "The idea may be reasonable, but Forge does not yet see proof that real people feel this pain strongly.",
    };
  }

  if (isUnclear(context.businessModel, "Not decided yet")) {
    return {
      title: "The path to revenue is unclear",
      explanation: "Without a simple money model, it is hard to know who the product must serve first and what value matters most.",
    };
  }

  return {
    title: "The first version may be too broad",
    explanation: "Early products work best when they solve one painful workflow extremely well before expanding.",
  };
}

function analyzeAssumptions(context: ProjectContext): RealityCheckItem[] {
  const assumptions: RealityCheckItem[] = [
    {
      title: "People feel this problem often enough",
      explanation: `Forge only knows that the problem is: ${context.problem}. The next proof is whether this happens often enough for people to change behavior.`,
    },
    {
      title: "The audience is reachable",
      explanation: `The current audience is ${context.targetAudience}. The idea depends on being able to find these people and speak with them directly.`,
    },
    {
      title: "The difference is valuable enough",
      explanation: `Your stated difference is: ${context.uniqueValueProposition}. Customers must see that as meaningfully better than what they do today.`,
    },
  ];

  if (isUnclear(context.businessModel, "Not decided yet")) {
    assumptions.push({
      title: "There is a believable way to make money",
      explanation: "The business model is still unclear, so willingness to pay remains an open question.",
    });
  } else {
    assumptions.push({
      title: "Customers will pay through this model",
      explanation: `The planned model is ${context.businessModel}. Forge still needs evidence that this pricing path fits how customers expect to buy.`,
    });
  }

  return assumptions.slice(0, 5);
}

function findMissingInformation(context: ProjectContext): RealityCheckItem[] {
  const missing: RealityCheckItem[] = context.unknownAreas.slice(0, 4).map((area) => ({
    title: area,
    explanation: "This was skipped or left unclear during discovery.",
  }));

  if (isUnclear(context.businessModel, "Not decided yet")) {
    missing.push({ title: "Pricing", explanation: "Forge needs to know how customers might pay and what feels fair." });
  }

  if (!hasCustomerLearning(context)) {
    missing.push({
      title: "Customer interviews",
      explanation: "Forge needs direct quotes or patterns from people who experience the problem.",
    });
  }

  if (isUnclear(context.currentAlternatives, "Unknown")) {
    missing.push({
      title: "Current alternatives",
      explanation: "Understanding today's workaround shows how painful the problem really is.",
    });
  }

  if (missing.length === 0) {
    missing.push({
      title: "Distribution",
      explanation: "Forge still needs to know how the first users will find and trust this product.",
    });
  }

  return dedupeItems(missing).slice(0, 6);
}

function planValidation(context: ProjectContext): ValidationSuggestion[] {
  const suggestions: ValidationSuggestion[] = [
    {
      task: `Interview five people who match: ${context.targetAudience}`,
      why: "This will show whether the problem is frequent, painful, and described in the customer's own words.",
    },
    {
      task: "Ask how they solve the problem today",
      why: "Current workarounds reveal urgency, budget, and what your first version must replace or improve.",
    },
    {
      task: "Prototype the smallest useful workflow",
      why: "A focused prototype tests value before you spend time building a full product.",
    },
  ];

  if (isUnclear(context.businessModel, "Not decided yet")) {
    suggestions.push({
      task: "Test one simple pricing question",
      why: "Even rough willingness-to-pay feedback will clarify whether this can become a business.",
    });
  } else {
    suggestions.push({
      task: `Check whether ${context.businessModel} fits how buyers expect to pay`,
      why: "A good product can still struggle if the buying motion feels unfamiliar or risky.",
    });
  }

  suggestions.push({
    task: "Create a waitlist or concierge test",
    why: "A real commitment is a stronger signal than compliments or polite interest.",
  });

  return suggestions.slice(0, 5);
}

function evaluateConfidence(context: ProjectContext) {
  let score = 0;
  if (!isUnclear(context.problem, "Not clear yet")) score += 1;
  if (!isUnclear(context.targetAudience, "Still being explored")) score += 1;
  if (!isUnclear(context.currentAlternatives, "Unknown")) score += 1;
  if (!isUnclear(context.uniqueValueProposition, "Still being shaped")) score += 1;
  if (hasCustomerLearning(context)) score += 1;
  if (!isUnclear(context.users, "Unknown") && !context.users.toLowerCase().includes("no users")) score += 1;
  if (!isUnclear(context.businessModel, "Not decided yet")) score += 1;

  let level: ConfidenceLevel = "Early Idea";
  let explanation = "Forge has a starting direction, but the idea still needs clearer customer and problem evidence.";

  if (score > 2 && score <= 4) {
    level = "Needs Validation";
    explanation = "The idea is understandable, but the next step is proving demand with real customer behavior.";
  } else if (score > 4 && score <= 6) {
    level = "Promising";
    explanation = "There are useful signals here. Focus now on narrowing scope and testing willingness to act or pay.";
  } else if (score > 6) {
    level = "Strong Foundation";
    explanation = "Forge sees a clear problem, audience, differentiation, and early evidence. The next challenge is execution focus.";
  }

  return { level, explanation };
}

function cleanProjectName(answer: string) {
  if (!answer) {
    return "Untitled Project";
  }

  return answer.split(/[.!?\n]/)[0]?.trim().slice(0, 72) || "Untitled Project";
}

function buildSummary(projectName: string, targetAudience: string, problem: string) {
  if (targetAudience && problem) {
    return `${projectName} helps ${targetAudience} with ${problem.toLowerCase()}`;
  }

  if (problem) {
    return `${projectName} is focused on ${problem.toLowerCase()}`;
  }

  return `${projectName} is an early product idea that needs clearer context.`;
}

function splitRisks(raw: string) {
  if (!raw) {
    return [];
  }

  return raw
    .split(/[,\.\n]/)
    .map((risk) => risk.trim())
    .filter(Boolean)
    .slice(0, 5);
}

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48);

  return slug || `project-${Date.now()}`;
}

function hasCustomerLearning(context: ProjectContext) {
  const learning = context.customerConversations.toLowerCase();
  return Boolean(learning) && !learning.includes("no customer learning") && !learning.includes("not yet");
}

function isUnclear(value: string, fallback: string) {
  const normalized = value.trim().toLowerCase();
  return !normalized || normalized === fallback.toLowerCase() || normalized === "unknown" || normalized === "not sure yet";
}

function dedupeItems(items: RealityCheckItem[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.title.toLowerCase();
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}
