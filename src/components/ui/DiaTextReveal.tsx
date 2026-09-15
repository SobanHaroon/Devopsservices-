"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export interface DiaTextRevealProps {
  text: string;
  colors?: string[];
  className?: string;
}

export function DiaTextReveal({
  text,
  colors = ["#3b82f6", "#60a5fa", "#93c5fd"],
  className,
}: DiaTextRevealProps) {
  const letters = Array.from(text);

  return (
    <div className={cn("inline-flex flex-wrap items-center justify-center gap-x-1", className)}>
      {letters.map((letter, idx) => {
        const color = colors[idx % colors.length];
        return (
          <motion.span
            key={idx}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: idx * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ color }}
            className="inline-block"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        );
      })}
    </div>
  );
}

export default DiaTextReveal;
