"use client";
import { useState } from "react";

const darken = (hex: string, pct: number) => {
  let c = hex.startsWith("#") ? hex.slice(1) : hex;
  if (c.length === 3)
    c = c
      .split("")
      .map((x) => x + x)
      .join("");
  const n = Number.parseInt(c, 16);
  const clamp = (v: number) =>
    Math.max(0, Math.min(255, Math.floor(v * (1 - pct))));
  const r = clamp((n >> 16) & 0xff);
  const g = clamp((n >> 8) & 0xff);
  const b = clamp(n & 0xff);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
};

interface FolderProps {
  color?: string;
  size?: number;
  items?: React.ReactNode[];
  className?: string;
}

export default function Folder({
  color = "#5227FF",
  size = 1,
  items = [],
  className = "",
}: FolderProps) {
  const papers = [...items.slice(0, 3)];
  while (papers.length < 3) papers.push(null);

  const [open, setOpen] = useState(false);
  const [offsets, setOffsets] = useState(
    Array.from({ length: 3 }, () => ({ x: 0, y: 0 }))
  );

  const backColor = darken(color, 0.08);

  const paperStyles = [
    { background: darken("#ffffff", 0.1) },
    { background: darken("#ffffff", 0.05) },
    { background: "#ffffff" },
  ];

  const openPaperTransforms = [
    "translate(-120%, -70%) rotateZ(-15deg)",
    "translate(10%, -70%) rotateZ(15deg)",
    "translate(-50%, -100%) rotateZ(5deg)",
  ];

  const onMouseMove = (e: React.MouseEvent, i: number) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ox = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const oy = (e.clientY - rect.top - rect.height / 2) * 0.15;
    setOffsets((prev) => {
      const n = [...prev];
      n[i] = { x: ox, y: oy };
      return n;
    });
  };

  const onMouseLeave = (_e: React.MouseEvent, i: number) => {
    setOffsets((prev) => {
      const n = [...prev];
      n[i] = { x: 0, y: 0 };
      return n;
    });
  };

  return (
    <div
      className={className}
      style={{ transform: `scale(${size})`, display: "inline-block" }}
    >
      <div
        onClick={() => {
          setOpen((p) => !p);
          if (open)
            setOffsets(Array.from({ length: 3 }, () => ({ x: 0, y: 0 })));
        }}
        style={{
          transition: "all 0.2s ease-in",
          cursor: "pointer",
          transform: open ? "translateY(-8px)" : undefined,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 100,
            height: 80,
            background: backColor,
            borderRadius: "0 10px 10px 10px",
          }}
        >
          {/* Tab */}
          <div
            style={{
              position: "absolute",
              bottom: "98%",
              left: 0,
              width: 30,
              height: 10,
              background: backColor,
              borderRadius: "5px 5px 0 0",
            }}
          />

          {/* Papers */}
          {papers.map((item, i) => (
            <div
              key={i}
              onMouseLeave={(e) => onMouseLeave(e, i)}
              onMouseMove={(e) => onMouseMove(e, i)}
              style={{
                position: "absolute",
                zIndex: 2,
                bottom: "10%",
                left: "50%",
                width: `${70 + i * 10}%`,
                height: `${80 - i * 10}%`,
                borderRadius: 10,
                transition: "all 0.3s ease-in-out",
                ...paperStyles[i],
                transform: open
                  ? `${openPaperTransforms[i]} translate(${offsets[i].x}px, ${offsets[i].y}px)`
                  : "translate(-50%, 10%)",
              }}
            >
              {item}
            </div>
          ))}

          {/* Front faces */}
          <div
            style={{
              position: "absolute",
              zIndex: 3,
              inset: 0,
              background: color,
              borderRadius: "5px 10px 10px 10px",
              transformOrigin: "bottom",
              transition: "all 0.3s ease-in-out",
              transform: open ? "skew(15deg) scaleY(0.6)" : undefined,
            }}
          />
          <div
            style={{
              position: "absolute",
              zIndex: 3,
              inset: 0,
              background: color,
              borderRadius: "5px 10px 10px 10px",
              transformOrigin: "bottom",
              transition: "all 0.3s ease-in-out",
              transform: open ? "skew(-15deg) scaleY(0.6)" : undefined,
            }}
          />
        </div>
      </div>
    </div>
  );
}
