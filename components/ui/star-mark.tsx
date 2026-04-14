import type { CSSProperties } from "react";

function StarSvg() {
  return (
    <svg className="h-full w-full" viewBox="0 0 30 30">
      <path
        d="M15 0 C19 9 21 11 30 15 C21 19 19 21 15 30 C11 21 9 19 0 15 C9 11 11 9 15 0 Z"
        fill="currentColor"
      />
    </svg>
  );
}

interface StarMarkProps {
  style: CSSProperties;
  className?: string;
  size?: number;
}

export function StarMark({ style, className, size = 14 }: StarMarkProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-20 select-none text-muted-foreground ${className ?? ""}`}
      style={{ width: size, height: size, ...style }}
    >
      <StarSvg />
    </div>
  );
}
