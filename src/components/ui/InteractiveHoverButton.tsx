"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

export interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  text?: string;
  className?: string;
}

export function InteractiveHoverButton({
  children,
  text,
  className,
  ...props
}: InteractiveHoverButtonProps) {
  const content = children || text || "Interactive Button";

  return (
    <button
      type="button"
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-full border border-white/20 bg-zinc-900/80 px-7 py-3 text-center font-medium text-white transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-blue-400 transition-all duration-300 group-hover:scale-[100]" />
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 font-mono text-xs uppercase tracking-wider">
          {content}
        </span>
      </div>
      <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-950">
          {content}
        </span>
        <ArrowRight className="h-4 w-4 text-zinc-950" />
      </div>
    </button>
  );
}

export default InteractiveHoverButton;
