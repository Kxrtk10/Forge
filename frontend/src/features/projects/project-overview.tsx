"use client";

import { AlertCircle, CheckCircle2, CircleHelp, Target } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { RealityCheckReport } from "@/features/projects/reality-check-report";
import { cn } from "@/lib/utils";
import { buildProjectOverview, getProject } from "@/services/project-service";
import type { ProjectContext } from "@/types/project";

const fallbackProject: ProjectContext = {
  id: "atlas-crm",
  projectName: "Atlas CRM",
  oneLineSummary: "Atlas CRM helps small teams remember who to follow up with and what to do next.",
  problem: "Small teams lose track of customer follow-ups.",
  targetAudience: "Founder-led sales teams",
  currentAlternatives: "Spreadsheets, notes, and memory",
  uniqueValueProposition: "A calmer first sales workspace before a full CRM is needed.",
  businessModel: "Monthly subscription",
  stage: "First version",
  users: "A few testers",
  customerConversations: "Early conversations with founder-led teams",
  knownRisks: ["Teams may already have a workaround", "The first version may try to do too much"],
  founderGoals: "Make weekly customer follow-up easier to manage.",
  unknownAreas: ["Pricing", "Retention signal", "Best first workflow"],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

type WorkspaceTab = "overview" | "reality-check";

const workspaceTabs: { id: WorkspaceTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "reality-check", label: "Reality Check" },
];

export function ProjectOverview({ projectId }: { projectId: string }) {
  const [project, setProject] = useState<ProjectContext | null>(null);
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("overview");

  useEffect(() => {
    setProject(getProject(projectId) ?? fallbackProject);
  }, [projectId]);

  const context = project ?? fallbackProject;
  const overview = useMemo(() => buildProjectOverview(context), [context]);

  return (
    <div className="mx-auto grid max-w-7xl gap-8">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <Badge>{overview.currentStage}</Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">{context.projectName}</h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">{overview.projectSummary}</p>
        </div>
        <Button asChild variant="secondary">
          <Link href="/dashboard/create">Refine context</Link>
        </Button>
      </div>

      <div className="flex w-fit rounded-2xl border border-white/10 bg-white/[0.035] p-1">
        {workspaceTabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground",
              activeTab === tab.id && "bg-white/[0.08] text-foreground shadow-sm",
            )}
            onClick={() => setActiveTab(tab.id)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" ? <OverviewContent context={context} overview={overview} /> : <RealityCheckReport context={context} />}
    </div>
  );
}

function OverviewContent({ context, overview }: { context: ProjectContext; overview: ReturnType<typeof buildProjectOverview> }) {
  return (
    <>
      <section className="grid gap-4 md:grid-cols-4">
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Context complete</p>
          <p className="mt-3 text-3xl font-semibold">{overview.completionProgress}%</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Known risks</p>
          <p className="mt-3 text-3xl font-semibold">{overview.knownUnknowns.length}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Missing areas</p>
          <p className="mt-3 text-3xl font-semibold">{overview.missingInformation.length}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted-foreground">Users</p>
          <p className="mt-3 text-xl font-semibold">{context.users}</p>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="grid gap-6">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-indigo-200">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Project summary</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{overview.projectSummary}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-indigo-200">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Founder goal</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{overview.founderGoal}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold">Permanent project context</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {[
                ["Problem", context.problem],
                ["Target audience", context.targetAudience],
                ["Current alternatives", context.currentAlternatives],
                ["Different because", context.uniqueValueProposition],
                ["Business model", context.businessModel],
                ["Customer learning", context.customerConversations],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
                  <p className="mt-2 text-sm leading-6">{value}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid content-start gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold">Known unknowns</h2>
            <div className="mt-4 grid gap-3">
              {overview.knownUnknowns.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-indigo-200" />
                  <p className="text-sm leading-6 text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </Card>

          <EmptyState
            icon={<CircleHelp className="h-5 w-5" />}
            title="Missing information"
            description={
              overview.missingInformation.length > 0
                ? overview.missingInformation.join(" ")
                : "Forge has enough context to begin deeper analysis in the next sprint."
            }
          />
        </div>
      </section>
    </>
  );
}
