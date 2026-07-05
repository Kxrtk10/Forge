"use client";

import { ChevronDown, CreditCard, LogOut, Settings, User } from "lucide-react";
import { useState } from "react";

const items = [
  { label: "Profile", icon: User },
  { label: "Settings", icon: Settings },
  { label: "Billing", icon: CreditCard },
  { label: "Log out", icon: LogOut },
];

export function ProfileDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-2 py-1.5 text-sm transition hover:bg-white/[0.07]"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500 text-xs font-semibold text-white">
          MC
        </span>
        <span className="hidden sm:inline">Maya Chen</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </button>
      {open ? (
        <div className="absolute right-0 top-12 z-50 w-56 rounded-2xl border border-white/10 bg-[#090d18] p-2 shadow-2xl shadow-black/40">
          {items.map((item) => (
            <button
              key={item.label}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-muted-foreground transition hover:bg-white/[0.06] hover:text-white"
              type="button"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
