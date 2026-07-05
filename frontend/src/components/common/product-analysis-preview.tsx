"use client";

import { motion } from "framer-motion";
import { ArrowRight, Flag, Layers3, ShieldAlert, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const reportSections = [
  {
    label: "Project",
    value: "Forge",
    detail: "A calm product mentor for founders shaping an idea into something real.",
    icon: Layers3,
  },
  {
    label: "Biggest Strength",
    value: "The problem is easy to feel",
    detail: "Founders know the early stage is messy. Forge gives that uncertainty a place to become clear.",
    icon: Sparkles,
  },
  {
    label: "Biggest Risk",
    value: "Feeling like a generic chat tool",
    detail: "Forge needs a clear point of view: review the idea, name the risk, and guide the next move.",
    icon: ShieldAlert,
  },
  {
    label: "Recommended Next Step",
    value: "Make the first report unforgettable",
    detail: "Help a founder see what is strong, what is unclear, and what to do next in under five minutes.",
    icon: Flag,
  },
];

export function ProductAnalysisPreview() {
  return (
    <Card className="w-full max-w-[610px] overflow-hidden rounded-[2rem]">
      <div className="border-b border-white/10 p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Forge Review</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Founder report</h2>
          </div>
          <Badge className="border-indigo-300/20 bg-indigo-400/10 text-indigo-100">
            Preview
          </Badge>
        </div>
      </div>
      <div className="grid gap-5 p-7">
        {reportSections.map((section, index) => (
          <motion.div
            key={section.label}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.68, ease: "easeInOut", delay: 0.32 + index * 0.46 }}
          >
            <div className="flex items-start gap-5">
              <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3 text-indigo-200">
                <section.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {section.label}
                </p>
                <p className="mt-3 text-[1.05rem] font-semibold text-white">{section.value}</p>
                <p className="mt-4 text-base leading-7 text-muted-foreground">{section.detail}</p>
              </div>
            </div>
          </motion.div>
        ))}
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.025] px-6 py-4 text-sm text-muted-foreground">
          <span>Continue Analysis</span>
          <ArrowRight className="h-4 w-4 text-indigo-200" />
        </div>
      </div>
    </Card>
  );
}
