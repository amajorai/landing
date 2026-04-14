import type { CSSProperties } from "react";

interface CrossMarkProps {
  style: CSSProperties;
  className?: string;
}

export function CrossMark({ style, className }: CrossMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 select-none ${className ?? ""}`}
      style={{ width: 24, height: 24, ...style }}
    >
      {/* Horizontal line */}
      <span className="absolute top-1/2 right-0 left-0 h-px -translate-y-px bg-muted-foreground/35" />
      {/* Vertical line */}
      <span className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-px bg-muted-foreground/35" />
    </span>
  );
}
