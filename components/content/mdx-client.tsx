"use client";

import { Check, Copy, Link2 } from "lucide-react";
import * as React from "react";
import { sileo } from "sileo";
import { Frame, FramePanel } from "@/components/ui/frame";
import { cn } from "@/lib/utils";

const HEADING_CLASSES = {
  h1: "mt-8 mb-4 text-2xl",
  h2: "mt-6 mb-3 text-xl",
  h3: "mt-4 mb-2 text-lg",
} as const;

export function Heading({
  as: Tag,
  id,
  children,
  className,
  ...props
}: React.ComponentProps<"h2"> & { as: keyof typeof HEADING_CLASSES }) {
  const copyLink = () => {
    if (!id) return;
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
    sileo.success({
      title: "Copied to clipboard",
      description: "Share this link to skip to this point on the page",
    });
  };

  return (
    <Tag
      className={cn(
        "group/heading flex cursor-pointer scroll-mt-44 items-center gap-2 font-medium",
        HEADING_CLASSES[Tag],
        className
      )}
      id={id}
      onClick={copyLink}
      {...props}
    >
      <span>{children}</span>
      <Link2 className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/heading:opacity-100" />
    </Tag>
  );
}

export function CodeBlock({
  children,
  className,
  title,
  icon: _icon,
  ...props
}: React.ComponentProps<"pre"> & { icon?: unknown }) {
  const ref = React.useRef<HTMLPreElement>(null);
  const [didCopy, setDidCopy] = React.useState(false);
  const codeClass = React.isValidElement<{ className?: string }>(children)
    ? children.props.className
    : undefined;
  const language = codeClass?.match(/language-([\w-]+)/)?.[1] ?? "plain text";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(ref.current?.textContent ?? "");
    setDidCopy(true);
    sileo.success({
      title: "Copied to clipboard",
      description: "Code block copied successfully",
    });
    window.setTimeout(() => setDidCopy(false), 1500);
  };

  return (
    <Frame className="my-4">
      <div className="flex items-center justify-between gap-2 px-4 py-2">
        <div className="font-mono text-muted-foreground text-xs">
          {title ?? language}
        </div>
        <button
          aria-label="Copy code"
          className="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          onClick={handleCopy}
          type="button"
        >
          {didCopy ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
      <FramePanel className="overflow-hidden p-0">
        <pre
          className={cn(
            "!my-0 !bg-transparent overflow-x-auto p-4 text-sm [&_code]:font-mono",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </pre>
      </FramePanel>
    </Frame>
  );
}
