import {
  Command,
  FolderKanban,
  Home,
  LifeBuoy,
  Plus,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { BrandMark } from "@/components/layout/brand-mark";
import { NotificationArea } from "@/components/layout/notification-area";
import { ProfileDropdown } from "@/components/layout/profile-dropdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Projects", href: "/dashboard/projects/atlas-crm", icon: FolderKanban },
  { label: "Mentor", href: "/dashboard", icon: Sparkles },
  { label: "Settings", href: "/dashboard/projects/atlas-crm", icon: Settings },
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background/95">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-white/10 bg-black/20 px-4 py-5 backdrop-blur-xl lg:block">
        <BrandMark />
        <Button asChild className="mt-8 w-full justify-start">
          <Link href="/dashboard/create">
            <Plus className="h-4 w-4" />
            New idea
          </Link>
        </Button>
        <nav className="mt-8 grid gap-1" aria-label="Application navigation">
          {navigation.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-white/[0.06] hover:text-white",
                index === 0 && "bg-white/[0.06] text-white",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute inset-x-4 bottom-5 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
          <div className="flex items-center gap-3 text-sm font-medium">
            <LifeBuoy className="h-4 w-4 text-indigo-200" />
            Founder support
          </div>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            A quiet place to think through what you are building.
          </p>
        </div>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-background/70 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="lg:hidden">
              <BrandMark />
            </div>
            <div className="hidden h-10 w-full max-w-md items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm text-muted-foreground md:flex">
              <Search className="h-4 w-4" />
              Search ideas, notes, files
              <span className="ml-auto flex items-center gap-1 rounded-md border border-white/10 px-1.5 py-0.5 text-xs">
                <Command className="h-3 w-3" /> K
              </span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <NotificationArea />
              <ProfileDropdown />
            </div>
          </div>
        </header>
        <main className="px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
