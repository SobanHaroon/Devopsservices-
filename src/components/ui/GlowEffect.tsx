"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export interface GlowEffectProps {
  colors?: string[];
  mode?: "rotate" | "pulse" | "static";
  blur?: "soft" | "medium" | "strong" | "strongest";
  duration?: number;
  scale?: number;
  className?: string;
}

export function GlowEffect({
  colors = ["#ff96a9", "#e8b4f0", "#ffb3c6", "#d44d8a", "#ff96a9"],
  mode = "rotate",
  blur = "strongest",
  duration = 5,
  scale = 1,
  className,
}: GlowEffectProps) {
  const blurClasses = {
    soft: "blur-md",
    medium: "blur-lg",
    strong: "blur-xl",
    strongest: "blur-2xl",
  };

  const gradientString = `conic-gradient(from 0deg at 50% 50%, ${colors.join(", ")})`;

  return (
    <div className={cn("relative w-full h-full pointer-events-none overflow-hidden", className)}>
      <motion.div
        className={cn("absolute inset-[-50%] w-[200%] h-[200%]", blurClasses[blur])}
        style={{
          background: gradientString,
          transformOrigin: "center center",
        }}
        animate={
          mode === "rotate"
            ? { rotate: [0, 360] }
            : mode === "pulse"
            ? { scale: [scale, scale * 1.15, scale], opacity: [0.6, 1, 0.6] }
            : {}
        }
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </div>
  );
}

export default GlowEffect;
