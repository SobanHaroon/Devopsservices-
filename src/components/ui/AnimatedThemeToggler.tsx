"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Sun, Moon, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";

export interface AnimatedThemeTogglerProps {
  className?: string;
  theme?: string;
  onToggle?: (theme: string) => void;
}

export function AnimatedThemeToggler({ className, theme = "dark", onToggle }: AnimatedThemeTogglerProps) {
  const [currentTheme, setCurrentTheme] = useState(theme);

  const toggle = () => {
    const next = currentTheme === "dark" ? "midnight" : "dark";
    setCurrentTheme(next);
    if (onToggle) onToggle(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-zinc-900/80 hover:bg-zinc-800 text-xs font-mono text-zinc-300 transition-all cursor-pointer select-none",
        className
      )}
      aria-label="Toggle theme"
    >
      <motion.div
        key={currentTheme}
        initial={{ rotate: -90, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        exit={{ rotate: 90, scale: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-1.5"
      >
        {currentTheme === "dark" ? (
          <>
            <Moon className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Dark</span>
          </>
        ) : (
          <>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Midnight</span>
          </>
        )}
      </motion.div>
    </button>
  );
}

export default AnimatedThemeToggler;
