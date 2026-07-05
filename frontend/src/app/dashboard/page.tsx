import { ArrowUpRight, FolderPlus, Inbox, Plus, Sparkles } from "lucide-react";
import Link from "next/link";

import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { quickActions, recentProjects } from "@/lib/placeholder-data";

export default function DashboardPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Badge>Founder workspace</Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            Good morning, Maya.
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Your ideas, notes, next steps, and open questions are all in one calm place.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/create">
            <Plus className="h-4 w-4" />
            New idea
          </Link>
        </Button>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        {quickActions.map((action) => (
          <Card key={action.title} className="p-5 transition hover:-translate-y-0.5 hover:bg-white/[0.055]">
            <action.icon className="h-5 w-5 text-indigo-200" />
            <h2 className="mt-4 font-semibold">{action.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{action.description}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <Card className="p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Recent ideas</h2>
              <p className="mt-1 text-sm text-muted-foreground">Continue where you left off.</p>
            </div>
            <Button asChild variant="secondary" size="sm">
              <Link href="/dashboard/projects/atlas-crm">
                View all <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-3">
            {recentProjects.map((project) => (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}`}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:bg-white/[0.06]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-medium">{project.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {project.stage} - {project.health}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{project.updatedAt}</span>
                </div>
                <div className="mt-4 h-2 rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <div className="grid gap-6">
          <EmptyState
            icon={<Inbox className="h-5 w-5" />}
            title="No new notes"
            description="When Forge has something useful to show you, it will appear here."
          />
          <EmptyState
            icon={<FolderPlus className="h-5 w-5" />}
            title="Start with a rough idea"
            description="A few words are enough. Forge will help you make sense of the rest."
            action={
              <Button asChild variant="secondary" size="sm">
                <Link href="/dashboard/create">
                  <Sparkles className="h-4 w-4" />
                  Start
                </Link>
              </Button>
            }
          />
        </div>
      </section>
    </div>
  );
}
