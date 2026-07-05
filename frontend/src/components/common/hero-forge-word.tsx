"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SESSION_KEY = "forge:intro-seen";
const letters = ["F", "O", "R", "G", "E"];

export function HeroForgeWord() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem(SESSION_KEY) === "true") {
      setVisible(true);
      return;
    }

    const onLanded = () => setVisible(true);
    window.addEventListener("forge:intro-landed", onLanded);

    return () => window.removeEventListener("forge:intro-landed", onLanded);
  }, []);

  return (
    <motion.div
      layoutId="forge-word"
      data-hero-forge-text
      className="grid w-[min(86vw,650px)] select-none grid-cols-5 text-[clamp(4rem,12vw,10.5rem)] font-semibold leading-none tracking-[-0.04em] text-white"
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {letters.map((letter) => (
        <span key={letter} className="block text-center">
          {letter}
        </span>
      ))}
    </motion.div>
  );
}



