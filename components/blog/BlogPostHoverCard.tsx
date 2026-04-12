"use client";

import { format } from "date-fns";
import { Clock } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface BlogPostHoverCardProps {
  slug: string;
  children: ReactNode;
}

interface PreviewData {
  title: string;
  date: string;
  description: string;
  readingTime: number;
  cover?: string;
}

export function BlogPostHoverCard({ slug, children }: BlogPostHoverCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && !preview && !loading) {
      setLoading(true);
      fetch(`/api/blog/preview/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          setPreview(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [isVisible, preview, loading, slug]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY + 16 });
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY + 16 });

    hoverTimeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 250);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsVisible(false);
  };

  return (
    <div
      className="inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={triggerRef}
    >
      {children}
      {isVisible &&
        createPortal(
          <div
            className="fixed z-[999] w-80 rounded-lg border bg-background p-4 shadow-lg"
            style={{
              left: position.x,
              top: position.y,
              transform: "translateX(-50%)",
            }}
          >
            {loading ? (
              <div className="space-y-2">
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
              </div>
            ) : preview ? (
              <div className="space-y-3">
                {preview.cover && (
                  <img
                    alt=""
                    className="h-32 w-full rounded object-cover"
                    src={preview.cover}
                  />
                )}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm leading-tight">
                    {preview.title}
                  </h4>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <time dateTime={preview.date}>
                      {format(new Date(preview.date), "MMM d, yyyy")}
                    </time>
                    <span className="inline-flex items-center gap-1">
                      <Clock aria-hidden="true" className="size-3" />
                      <span>{preview.readingTime} min read</span>
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {preview.description}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                Unable to load preview
              </p>
            )}
          </div>,
          document.body
        )}
    </div>
  );
}
