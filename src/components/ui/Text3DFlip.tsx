"use client";

import React from "react";
import { motion, type Transition } from "motion/react";
import { cn } from "../../lib/utils";

export interface Text3DFlipProps {
  children?: React.ReactNode;
  text?: string;
  className?: string;
  textClassName?: string;
  flipTextClassName?: string;
  rotateDirection?: "top" | "bottom" | "left" | "right";
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center";
  transition?: Transition;
}

export function Text3DFlip({
  children,
  text = "Stay hungry, stay foolish",
  className,
  textClassName,
  rotateDirection = "top",
  staggerDuration = 0.03,
  transition = { type: "spring", damping: 25, stiffness: 160 },
}: Text3DFlipProps) {
  const content = (children ? String(children) : text) || "";
  const chars = Array.from(content);

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className={cn("relative inline-flex flex-wrap overflow-hidden cursor-pointer py-1", className)}
    >
      <div className="flex">
        {chars.map((char, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: 0, rotateX: 0 },
              hover: {
                y: rotateDirection === "top" ? "-100%" : "100%",
                rotateX: rotateDirection === "top" ? 90 : -90,
              },
            }}
            transition={{
              ...transition,
              delay: i * staggerDuration,
            }}
            className={cn("inline-block origin-bottom font-display font-bold", textClassName)}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>

      <div className="absolute inset-0 flex">
        {chars.map((char, i) => (
          <motion.span
            key={i}
            variants={{
              initial: {
                y: rotateDirection === "top" ? "100%" : "-100%",
                rotateX: rotateDirection === "top" ? -90 : 90,
              },
              hover: { y: 0, rotateX: 0 },
            }}
            transition={{
              ...transition,
              delay: i * staggerDuration,
            }}
            className={cn("inline-block origin-top font-display font-bold text-blue-400", textClassName)}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default Text3DFlip;
