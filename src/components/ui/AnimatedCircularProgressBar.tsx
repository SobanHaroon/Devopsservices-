"use client";

import React from "react";
import { cn } from "../../lib/utils";

export interface AnimatedCircularProgressBarProps {
  max?: number;
  value: number;
  min?: number;
  gaugePrimaryColor?: string;
  gaugeSecondaryColor?: string;
  className?: string;
}

export function AnimatedCircularProgressBar({
  max = 100,
  value,
  min = 0,
  gaugePrimaryColor = "#3b82f6",
  gaugeSecondaryColor = "rgba(255, 255, 255, 0.1)",
  className,
}: AnimatedCircularProgressBarProps) {
  const circumference = 2 * Math.PI * 40;
  const normalizedValue = Math.min(Math.max(value, min), max);
  const percentage = ((normalizedValue - min) / (max - min)) * 100;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke={gaugeSecondaryColor}
          strokeWidth="8"
          fill="transparent"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke={gaugePrimaryColor}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span className="absolute font-mono text-sm font-bold text-white">
        {Math.round(percentage)}%
      </span>
    </div>
  );
}

export default AnimatedCircularProgressBar;
