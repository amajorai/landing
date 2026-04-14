import type { CSSProperties } from "react";

type Corner = "tl" | "tr" | "bl" | "br";

interface CornerMarkProps {
  corner: Corner;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

const borderClasses: Record<Corner, string> = {
  tl: "border-t border-l",
  tr: "border-t border-r",
  bl: "border-b border-l",
  br: "border-b border-r",
};

const posStyles: Record<Corner, CSSProperties> = {
  tl: { top: 0, left: 0 },
  tr: { top: 0, right: 0 },
  bl: { bottom: 0, left: 0 },
  br: { bottom: 0, right: 0 },
};

export function CornerMark({
  corner,
  size = 10,
  className,
  style,
}: CornerMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 select-none border-muted-foreground/50 ${borderClasses[corner]} ${className ?? ""}`}
      style={{ width: size, height: size, ...posStyles[corner], ...style }}
    />
  );
}
