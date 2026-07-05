"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

const SESSION_KEY = "forge:intro-seen";

export function HeroEntrance({
  children,
  className,
  delay = 0,
  mountOnEnter = false,
  fromX = 0,
  fromY = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  mountOnEnter?: boolean;
  fromX?: number;
  fromY?: number;
}) {
  const [entered, setEntered] = useState(false);
  const [mounted, setMounted] = useState(!mountOnEnter);

  useEffect(() => {
    if (window.sessionStorage.getItem(SESSION_KEY) === "true") {
      setMounted(true);
      setEntered(true);
      return;
    }

    const onComplete = () => {
      window.setTimeout(() => {
        setMounted(true);
        setEntered(true);
      }, delay * 1000);
    };

    window.addEventListener("forge:intro-complete", onComplete);

    return () => window.removeEventListener("forge:intro-complete", onComplete);
  }, [delay]);

  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={false}
      animate={entered ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: fromX, y: fromY }}
      transition={{ duration: 0.85, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
