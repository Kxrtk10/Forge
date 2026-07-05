"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const letters = ["F", "O", "R", "G", "E"];
const SESSION_KEY = "forge:intro-seen";

export function IntroScreen() {
  const [visible, setVisible] = useState(true);
  const [letterCount, setLetterCount] = useState(0);
  const [showLine, setShowLine] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [emerging, setEmerging] = useState(false);
  const [moving, setMoving] = useState(false);
  const [landed, setLanded] = useState(false);
  const [brandMotion, setBrandMotion] = useState({ x: 0, y: 0, scale: 1 });
  const wordRef = useRef<HTMLDivElement>(null);
  const startRectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    if (window.sessionStorage.getItem(SESSION_KEY) === "true") {
      setVisible(false);
      return;
    }

    const timers = letters.map((_, index) =>
      window.setTimeout(() => setLetterCount(index + 1), 420 + index * 420),
    );

    timers.push(window.setTimeout(() => setShowLine(true), 2850));
    timers.push(window.setTimeout(() => setShowPrompt(true), 4300));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  function begin() {
    if (!showPrompt || transitioning) {
      return;
    }

    setTransitioning(true);
    setShowPrompt(false);
    setShowLine(false);
    startRectRef.current = wordRef.current?.getBoundingClientRect() ?? null;
    setBrandMotion({ x: 0, y: 0, scale: 1.045 });

    window.setTimeout(() => setEmerging(true), 320);

    window.setTimeout(() => {
      const startRect = startRectRef.current;
      const target = document.querySelector("[data-hero-forge-text]");

      if (!startRect || !target) {
        window.sessionStorage.setItem(SESSION_KEY, "true");
        window.dispatchEvent(new Event("forge:intro-complete"));
        setVisible(false);
        return;
      }

      const targetRect = target.getBoundingClientRect();

      setMoving(true);
      setBrandMotion({
        x: targetRect.left - startRect.left,
        y: targetRect.top - startRect.top,
        scale: targetRect.width / startRect.width,
      });
    }, 620);
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] grid cursor-default place-items-center bg-[#000000]"
          initial={{ opacity: 1 }}
          animate={{ backgroundColor: emerging ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 1)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.05, ease: "easeInOut" }}
          onClick={begin}
          role="button"
          tabIndex={0}
          aria-label="Enter Forge"
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              begin();
            }
          }}
        >
          <div className="w-full px-6 text-center">
            <motion.div
              ref={wordRef}
              layoutId="forge-word"
              className="mx-auto grid w-[min(88vw,760px)] grid-cols-5 text-[clamp(5rem,15vw,11.25rem)] font-semibold leading-none tracking-[-0.04em] text-white"
              aria-label="FORGE"
              animate={brandMotion}
              transition={{ duration: moving ? 1.32 : 0.62, ease: "easeInOut" }}
              style={{ transformOrigin: "top left" }}
              onAnimationComplete={() => {
                if (!moving) {
                  return;
                }

                window.sessionStorage.setItem(SESSION_KEY, "true");
                setLanded(true);
                window.dispatchEvent(new Event("forge:intro-landed"));
                window.setTimeout(() => {
                  window.dispatchEvent(new Event("forge:intro-complete"));
                  setVisible(false);
                }, 480);
              }}
            >
              {letters.map((letter, index) => (
                <span key={letter} className="block text-center">
                  <AnimatePresence>
                    {index < letterCount ? (
                      <motion.span
                        className="inline-block"
                        initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {letter}
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </span>
              ))}
            </motion.div>
            <AnimatePresence>
              {showLine ? (
                <motion.p
                  className="mt-8 text-base font-normal text-white/70 md:text-xl"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                >
                  Forge your ideas into reality.
                </motion.p>
              ) : null}
            </AnimatePresence>
            <AnimatePresence>
              {showPrompt ? (
                <motion.p
                  className="fixed inset-x-0 bottom-10 text-center text-sm text-white/42 md:bottom-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                >
                  Click anywhere to begin
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
          {landed ? <span className="sr-only">Forge entered</span> : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}



