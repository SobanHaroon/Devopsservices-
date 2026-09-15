"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn } from "../../lib/utils";

export interface NumberTickerProps {
  value: number;
  direction?: "up" | "down";
  delay?: number;
  className?: string;
  decimalPlaces?: number;
}

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const [displayValue, setDisplayValue] = useState(direction === "down" ? value : 0);

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      let startTimestamp: number | null = null;
      const duration = 2000; // 2s

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

        const current = direction === "up" ? easeProgress * value : value - easeProgress * value;
        setDisplayValue(current);

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, value, direction, delay]);

  return (
    <span
      ref={ref}
      className={cn("inline-block tabular-nums font-mono", className)}
    >
      {displayValue.toFixed(decimalPlaces)}
    </span>
  );
}

export default NumberTicker;
