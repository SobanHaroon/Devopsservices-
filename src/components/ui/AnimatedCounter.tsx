import React, { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn } from "../../lib/utils";

export interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number; // in seconds, default 2.0
  decimals?: number;
  delay?: number; // in seconds
  className?: string;
  numberClassName?: string;
  prefixClassName?: string;
  suffixClassName?: string;
  formatThousands?: boolean;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2.0,
  decimals,
  delay = 0,
  className,
  numberClassName,
  prefixClassName,
  suffixClassName,
  formatThousands = false,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Calculate decimals if not explicitly passed
  const calculatedDecimals =
    decimals !== undefined
      ? decimals
      : value.toString().includes(".")
      ? value.toString().split(".")[1].length
      : 0;

  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!isInView) return;

    let animationFrameId: number;
    let startTimestamp: number | null = null;
    const durationMs = duration * 1000;

    const timeoutId = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / durationMs, 1);

        // Ease out cubic: 1 - (1 - t)^3
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = easeOutProgress * value;

        setCount(currentVal);

        if (progress < 1) {
          animationFrameId = window.requestAnimationFrame(step);
        } else {
          setCount(value);
        }
      };

      animationFrameId = window.requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, value, duration, delay]);

  const formattedNumber = calculatedDecimals > 0
    ? count.toFixed(calculatedDecimals)
    : Math.round(count).toString();

  const finalDisplayNumber = formatThousands
    ? Number(formattedNumber).toLocaleString("en-US", {
        minimumFractionDigits: calculatedDecimals,
        maximumFractionDigits: calculatedDecimals,
      })
    : formattedNumber;

  return (
    <span
      ref={ref}
      className={cn("inline-flex items-baseline tabular-nums font-mono font-bold", className)}
    >
      {prefix && (
        <span className={cn("select-none", prefixClassName)}>{prefix}</span>
      )}
      <span className={cn(numberClassName)}>{finalDisplayNumber}</span>
      {suffix && (
        <span className={cn("select-none", suffixClassName)}>{suffix}</span>
      )}
    </span>
  );
}

export default AnimatedCounter;
