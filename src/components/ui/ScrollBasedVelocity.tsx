"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "motion/react";
import { cn } from "../../lib/utils";

export interface ScrollVelocityContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollVelocityContainer({
  children,
  className,
}: ScrollVelocityContainerProps) {
  return (
    <div className={cn("relative w-full overflow-hidden py-4", className)}>
      {children}
    </div>
  );
}

export interface ScrollVelocityRowProps {
  children: React.ReactNode;
  baseVelocity?: number;
  direction?: 1 | -1;
  className?: string;
}

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export function ScrollVelocityRow({
  children,
  baseVelocity = 3,
  direction = 1,
  className,
}: ScrollVelocityRowProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 300,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 1.5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(direction);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1 * direction;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1 * direction;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex flex-nowrap whitespace-nowrap overflow-hidden my-2">
      <motion.div
        className={cn("flex flex-nowrap whitespace-nowrap gap-8 text-white font-display font-bold uppercase tracking-widest", className)}
        style={{ x }}
      >
        <span>{children}</span>
        <span>•</span>
        <span>{children}</span>
        <span>•</span>
        <span>{children}</span>
        <span>•</span>
        <span>{children}</span>
        <span>•</span>
      </motion.div>
    </div>
  );
}
