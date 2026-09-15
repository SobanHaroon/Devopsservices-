"use client";

import React from "react";
import { cn } from "../../lib/utils";

export interface HighlighterProps {
  children: React.ReactNode;
  action?: "underline" | "highlight";
  color?: string;
  className?: string;
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#3b82f6",
  className,
}: HighlighterProps) {
  if (action === "underline") {
    return (
      <span
        className={cn("relative inline-block px-1", className)}
        style={{
          borderBottom: `2.5px solid ${color}`,
        }}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={cn("relative inline-block px-1.5 py-0.5 rounded font-semibold text-white", className)}
      style={{
        backgroundColor: color,
      }}
    >
      {children}
    </span>
  );
}

export default Highlighter;
