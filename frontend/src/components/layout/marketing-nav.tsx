"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

import { BrandMark } from "@/components/layout/brand-mark";
import { Button } from "@/components/ui/button";

const SESSION_KEY = "forge:intro-seen";

const links = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#steps" },
  { label: "Pricing", href: "#pricing" },
];

export function MarketingNav() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem(SESSION_KEY) === "true") {
      setRevealed(true);
      return;
    }

    const onComplete = () => {
      window.setTimeout(() => setRevealed(true), 3200);
    };
    window.addEventListener("forge:intro-complete", onComplete);

    return () => window.removeEventListener("forge:intro-complete", onComplete);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <motion.div
          initial={false}
          animate={revealed ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          <BrandMark />
        </motion.div>
        <motion.nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary navigation"
          initial={false}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </motion.nav>
        <motion.div
          className="flex items-center gap-3"
          initial={false}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
        >
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/register">Get Started</Link>
          </Button>
        </motion.div>
      </div>
    </header>
  );
}
