import {
  BarChart3,
  CheckCircle2,
  FileText,
  Flag,
  Layers3,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from "lucide-react";

export const features = [
  {
    title: "Let's look at your idea.",
    description: "Clarify the promise, the audience, and the first useful version.",
    icon: Lightbulb,
  },
  {
    title: "Is there demand for this?",
    description: "Find who cares, why now, and what proof you need.",
    icon: ShieldCheck,
  },
  {
    title: "Here's what to do next.",
    description: "Choose the next move without building everything.",
    icon: Flag,
  },
  {
    title: "Make the product easier to use.",
    description: "Spot confusion, missing pieces, and obvious improvements.",
    icon: BarChart3,
  },
];

export const journeySteps = [
  "Tell Forge what you want to build.",
  "See what is clear and what is missing.",
  "Learn who it is really for.",
  "Choose the next small step.",
  "Keep improving with each version.",
];


export const recentProjects = [
  {
    id: "atlas-crm",
    name: "Atlas CRM",
    stage: "MVP",
    health: "Strong signal",
    updatedAt: "Updated 2h ago",
    progress: 72,
  },
  {
    id: "briefly",
    name: "Briefly",
    stage: "Prototype",
    health: "Needs validation",
    updatedAt: "Updated yesterday",
    progress: 44,
  },
  {
    id: "northstar",
    name: "Northstar",
    stage: "Idea",
    health: "Early discovery",
    updatedAt: "Updated 3d ago",
    progress: 18,
  },
];

export const quickActions = [
  { title: "Look at an idea", description: "See what feels clear and what needs more thought.", icon: Sparkles },
  { title: "Review a product", description: "Find places where people may get confused.", icon: CheckCircle2 },
  { title: "Choose next steps", description: "Turn a big goal into a few calm moves.", icon: Layers3 },
  { title: "Write a simple summary", description: "Share what you learned with your team.", icon: FileText },
];

export const workspaceTabs = [
  "Overview",
  "The Idea",
  "Next Steps",
  "Notes",
  "Questions",
  "Docs",
  "Files",
  "Settings",
];

export const nextStepItems = [
  { title: "Talk to 12 people who might use this", status: "In progress" },
  { title: "Try a hands-on first version", status: "Planned" },
  { title: "Choose one sign that people find value", status: "Done" },
];

export const projectStats = [
  { label: "How clear it feels", value: "78%" },
  { label: "Open questions", value: "6" },
  { label: "Next steps", value: "14" },
  { label: "Notes saved", value: "3" },
];

export const mentorModes = [
  { title: "Clear thinking", icon: WandSparkles },
  { title: "Launch help", icon: Rocket },
  { title: "What we learned", icon: BarChart3 },
];

