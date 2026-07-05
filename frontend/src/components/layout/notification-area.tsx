"use client";

import { Bell } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const notifications = [
  "Atlas CRM has a new next step",
  "Briefly has a fresh idea note",
  "Northstar has 3 open questions",
];

export function NotificationArea() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Notifications"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <Bell className="h-4 w-4" />
      </Button>
      {open ? (
        <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-white/10 bg-[#090d18] p-3 shadow-2xl shadow-black/40">
          <div className="px-2 py-2">
            <p className="text-sm font-semibold">Notifications</p>
            <p className="mt-1 text-xs text-muted-foreground">Small updates from your workspaces.</p>
          </div>
          <div className="mt-2 grid gap-1">
            {notifications.map((notification) => (
              <button
                key={notification}
                className="rounded-xl px-3 py-2 text-left text-sm text-muted-foreground transition hover:bg-white/[0.06] hover:text-white"
                type="button"
              >
                {notification}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
