"use client";
import { Children } from "react";

interface LogoLoopProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // pixels per second, default 40
}

export default function LogoLoop({
  children,
  className,
  speed = 40,
}: LogoLoopProps) {
  const logos = Children.toArray(children);
  const count = logos.length;

  if (count === 0) return null;

  // Estimate total width: each logo ~120px + 48px gap (gap-12)
  const estimatedWidth = count * (120 + 48);
  const duration = estimatedWidth / speed;

  return (
    <div
      className={["relative overflow-hidden", className ?? ""].join(" ")}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <style>{`
        @keyframes logo-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
      <div
        className="flex w-max items-center gap-12"
        style={{
          animation: `logo-scroll ${duration}s linear infinite`,
        }}
      >
        {/* First copy */}
        {logos.map((logo, i) => (
          <div className="flex shrink-0 items-center" key={`a-${i}`}>
            {logo}
          </div>
        ))}
        {/* Second copy for seamless loop */}
        {logos.map((logo, i) => (
          <div
            aria-hidden
            className="flex shrink-0 items-center"
            key={`b-${i}`}
          >
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
}
