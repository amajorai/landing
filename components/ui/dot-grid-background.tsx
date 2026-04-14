"use client";
import { useId } from "react";

interface DotGridBackgroundProps {
  className?: string;
  spacing?: number;
  dotRadius?: number;
  variant?: "dots" | "grid";
  fade?: "radial" | "bottom" | "none";
}

export function DotGridBackground({
  className = "",
  spacing = 24,
  dotRadius = 1,
  variant = "dots",
  fade = "radial",
}: DotGridBackgroundProps) {
  const rawId = useId();
  const id = rawId.replace(/:/g, "");
  const patternId = `pattern-${id}`;
  const gradientId = `gradient-${id}`;
  const maskId = `mask-${id}`;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {variant === "dots" ? (
            <pattern
              height={spacing}
              id={patternId}
              patternUnits="userSpaceOnUse"
              width={spacing}
            >
              <circle
                cx={spacing / 2}
                cy={spacing / 2}
                fill="currentColor"
                r={dotRadius}
              />
            </pattern>
          ) : (
            <pattern
              height={spacing}
              id={patternId}
              patternUnits="userSpaceOnUse"
              width={spacing}
            >
              <path
                d={`M ${spacing} 0 L 0 0 0 ${spacing}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          )}
          {fade !== "none" && (
            <>
              {fade === "radial" ? (
                <radialGradient cx="50%" cy="50%" id={gradientId} r="50%">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="65%" stopColor="white" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
              ) : (
                <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="75%" stopColor="white" stopOpacity="1" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              )}
              <mask id={maskId}>
                <rect fill={`url(#${gradientId})`} height="100%" width="100%" />
              </mask>
            </>
          )}
        </defs>
        <rect
          fill={`url(#${patternId})`}
          height="100%"
          mask={fade !== "none" ? `url(#${maskId})` : undefined}
          width="100%"
        />
      </svg>
    </div>
  );
}
