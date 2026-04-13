"use client";

import { useEffect, useRef, useState } from "react";

export function useActiveHeading(headingIds: string[]): string {
  const [activeId, setActiveId] = useState<string>("");
  const visibleHeadings = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (headingIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleHeadings.current.add(entry.target.id);
          } else {
            visibleHeadings.current.delete(entry.target.id);
          }
        }

        const firstVisible = headingIds.find((id) =>
          visibleHeadings.current.has(id)
        );
        const next =
          firstVisible ?? Array.from(visibleHeadings.current)[0] ?? "";
        setActiveId(next);
      },
      {
        rootMargin: "-100px 0px -40% 0px",
        threshold: 0,
      }
    );

    for (const id of headingIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headingIds]);

  return activeId;
}
