"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export interface FluidBlobsProps {
  lightColors?: string[];
  darkColors?: string[];
  origins?: { x: number; y: number }[];
  margin?: number;
  blur?: number;
  className?: string;
}

const DEFAULT_LIGHT = ["#ff0020", "#fc0f60", "#e8227a", "#ff85b3"];

export function FluidBlobs({
  lightColors = DEFAULT_LIGHT,
  origins = [
    { x: 30, y: 20 },
    { x: 70, y: 30 },
    { x: 50, y: 70 },
    { x: 20, y: 80 },
  ],
  blur = 50,
  className,
}: FluidBlobsProps) {
  return (
    <div
      className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0", className)}
      style={{ filter: `blur(${blur}px)` }}
    >
      {lightColors.map((color, index) => {
        const origin = origins[index % origins.length];
        return (
          <motion.div
            key={index}
            className="absolute rounded-full opacity-60 mix-blend-screen"
            style={{
              backgroundColor: color,
              left: `${origin.x}%`,
              top: `${origin.y}%`,
              width: "180px",
              height: "180px",
              marginTop: "-90px",
              marginLeft: "-90px",
            }}
            animate={{
              x: [0, (index % 2 === 0 ? 30 : -30), (index % 2 === 0 ? -20 : 20), 0],
              y: [0, (index % 2 === 0 ? -25 : 25), (index % 2 === 0 ? 30 : -30), 0],
              scale: [1, 1.25, 0.9, 1],
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

export default FluidBlobs;
