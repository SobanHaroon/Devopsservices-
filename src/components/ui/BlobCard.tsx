"use client";

import * as React from "react";
import { FluidBlobs } from "./FluidBlobs";
import { GlowEffect } from "./GlowEffect";
import { cn } from "../../lib/utils";

export interface BlobCardProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
  headerHeight?: number;
  lightColors?: string[];
  darkColors?: string[];
  glowColors?: string[];
  className?: string;
}

const DEFAULT_LIGHT = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"];
const DEFAULT_DARK = ["#1e3a8a", "#1d4ed8", "#2563eb", "#3b82f6"];
const DEFAULT_GLOW = ["#3b82f6", "#60a5fa", "#06b6d4", "#2563eb", "#3b82f6"];

export function BlobCard({
  header,
  children,
  headerHeight = 200,
  lightColors = DEFAULT_LIGHT,
  darkColors = DEFAULT_DARK,
  glowColors = DEFAULT_GLOW,
  className,
}: BlobCardProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="absolute -inset-[1.5px] rounded-[21.5px] overflow-hidden z-0">
        <GlowEffect
          colors={glowColors}
          mode="rotate"
          blur="strongest"
          duration={6}
          scale={1}
        />
      </div>

      <div className="relative z-10 rounded-[20px] overflow-hidden bg-zinc-950 border border-white/10">
        <div
          className="relative overflow-hidden rounded-t-[20px]"
          style={{ height: headerHeight }}
        >
          <FluidBlobs
            lightColors={lightColors}
            darkColors={darkColors}
            origins={[
              { x: 50, y: -55 },
              { x: 50, y: -25 },
              { x: 50, y: -25 },
              { x: 50, y: -25 },
            ]}
            margin={60}
            blur={50}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950 pointer-events-none" />
          {header && <div className="relative z-10 p-8 pb-0">{header}</div>}
        </div>

        {children && <div>{children}</div>}
      </div>
    </div>
  );
}

export default BlobCard;
