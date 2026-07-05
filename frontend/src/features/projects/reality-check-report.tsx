"use client";

import { Check, ChevronDown, Clipboard, FileDown, Lightbulb, ShieldAlert, Sparkles, Target } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildRealityCheck } from "@/services/project-service";
import type { ProjectContext, RealityCheckItem, ValidationSuggestion } from "@/types/project";

const sectionIcons = {
  assessment: Sparkles,
  strength: Lightbulb,
  concern: ShieldAlert,
  assumptions: Target,
  missing: ShieldAlert,
  validation: Check,
};

type RealitySectionProps = {
  id: string;
  title: string;
  eyebrow: string;
  children: ReactNode;
  copyText: string;
  icon: keyof typeof sectionIcons;
  defaultOpen?: boolean;
};

export function RealityCheckReport({ context }: { context: ProjectContext }) {
  const realityCheck = useMemo(() => buildRealityCheck(context), [context]);

  return (
    <div className="grid gap-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Badge>Reality Check</Badge>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-4xl">A clearer look at the idea.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            Forge is using the saved project context to find strengths, risks, assumptions, and the next evidence to gather.
          </p>
        </div>
        <Button variant="secondary" disabled>
          <FileDown className="h-4 w-4" />
          Export later
        </Button>
      </div>

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <RealitySection
          id="overall-assessment"
          title="Overall Assessment"
          eyebrow="Current read"
          icon="assessment"
          copyText={realityCheck.overallAssessment}
          defaultOpen
        >
          <p className="text-sm leading-7 text-muted-foreground">{realityCheck.overallAssessment}</p>
        </RealitySection>

        <Card className="p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Confidence meter</p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight">{realityCheck.confidenceMeter.level}</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{realityCheck.confidenceMeter.explanation}</p>
        </Card>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <RealitySection
          id="biggest-strength"
          title="Biggest Strength"
          eyebrow={realityCheck.biggestStrength.title}
          icon="strength"
          copyText={formatItem(realityCheck.biggestStrength)}
          defaultOpen
        >
          <ItemBlock item={realityCheck.biggestStrength} />
        </RealitySection>

        <RealitySection
          id="biggest-concern"
          title="Biggest Concern"
          eyebrow={realityCheck.biggestConcern.title}
          icon="concern"
          copyText={formatItem(realityCheck.biggestConcern)}
          defaultOpen
        >
          <ItemBlock item={realityCheck.biggestConcern} />
        </RealitySection>
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        <RealitySection
          id="hidden-assumptions"
          title="Hidden Assumptions"
          eyebrow={`${realityCheck.hiddenAssumptions.length} assumptions`}
          icon="assumptions"
          copyText={realityCheck.hiddenAssumptions.map(formatItem).join("\n\n")}
          defaultOpen
        >
          <ItemList items={realityCheck.hiddenAssumptions} />
        </RealitySection>

        <RealitySection
          id="missing-information"
          title="Missing Information"
          eyebrow={`${realityCheck.missingInformation.length} gaps`}
          icon="missing"
          copyText={realityCheck.missingInformation.map(formatItem).join("\n\n")}
          defaultOpen
        >
          <ItemList items={realityCheck.missingInformation} />
        </RealitySection>

        <RealitySection
          id="validation-suggestions"
          title="Validation Suggestions"
          eyebrow={`${realityCheck.validationSuggestions.length} next tests`}
          icon="validation"
          copyText={realityCheck.validationSuggestions.map(formatSuggestion).join("\n\n")}
          defaultOpen
        >
          <SuggestionList suggestions={realityCheck.validationSuggestions} />
        </RealitySection>
      </section>
    </div>
  );
}

function RealitySection({ id, title, eyebrow, children, copyText, icon, defaultOpen = false }: RealitySectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [copied, setCopied] = useState(false);
  const Icon = sectionIcons[icon];

  async function copySection() {
    await navigator.clipboard.writeText(`${title}\n${copyText}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex items-start justify-between gap-4 p-6">
        <button className="flex min-w-0 flex-1 items-start gap-4 text-left" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls={id}>
          <span className="rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-indigo-200">
            <Icon className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-xs uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</span>
            <span className="mt-2 block text-lg font-semibold tracking-tight">{title}</span>
          </span>
          <ChevronDown className={`ml-auto mt-2 h-4 w-4 shrink-0 text-muted-foreground transition ${open ? "rotate-180" : ""}`} />
        </button>
        <Button type="button" size="sm" variant="ghost" onClick={copySection} aria-label={`Copy ${title}`}>
          {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      {open ? <div id={id} className="border-t border-white/10 px-6 py-5">{children}</div> : null}
    </Card>
  );
}

function ItemList({ items }: { items: RealityCheckItem[] }) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <ItemBlock key={item.title} item={item} />
      ))}
    </div>
  );
}

function ItemBlock({ item }: { item: RealityCheckItem }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <h4 className="text-sm font-semibold tracking-tight">{item.title}</h4>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.explanation}</p>
    </div>
  );
}

function SuggestionList({ suggestions }: { suggestions: ValidationSuggestion[] }) {
  return (
    <div className="grid gap-4">
      {suggestions.map((suggestion) => (
        <div key={suggestion.task} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <h4 className="text-sm font-semibold tracking-tight">{suggestion.task}</h4>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">{suggestion.why}</p>
        </div>
      ))}
    </div>
  );
}

function formatItem(item: RealityCheckItem) {
  return `${item.title}\n${item.explanation}`;
}

function formatSuggestion(suggestion: ValidationSuggestion) {
  return `${suggestion.task}\nWhy it matters: ${suggestion.why}`;
}

