"use client";

import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

export interface TypingAnimationProps {
  children?: string;
  text?: string;
  duration?: number;
  className?: string;
  delay?: number;
}

export function TypingAnimation({
  children,
  text,
  duration = 100,
  className,
  delay = 0,
}: TypingAnimationProps) {
  const content = text || children || "";
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < content.length) {
        setDisplayedText(content.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, duration);

    return () => clearInterval(typingInterval);
  }, [content, duration, started]);

  return (
    <span className={cn("font-mono leading-normal tracking-tight", className)}>
      {displayedText}
      <span className="animate-pulse text-blue-400 font-bold ml-0.5">|</span>
    </span>
  );
}

export default TypingAnimation;
