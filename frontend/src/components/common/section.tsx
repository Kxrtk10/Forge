import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Section({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mx-auto w-full max-w-7xl px-6 py-20 lg:px-8", className)}>
      {(eyebrow || title || description) && (
        <div className="mb-12 max-w-3xl">
          {eyebrow ? (
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-indigo-200">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      )}
      {children}
    </section>
  );
}
