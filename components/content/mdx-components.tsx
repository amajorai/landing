import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type * as React from "react";
import { Frame } from "@/components/ui/frame";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CodeBlock, Heading } from "./mdx-client";

export function Callout({
  icon,
  children,
}: {
  icon?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-4 flex items-start gap-3 rounded-md bg-gray-50 p-4 leading-relaxed dark:bg-gray-800/60">
      {icon && <span className="text-base">{icon}</span>}
      <div className="flex-1 text-muted-foreground [&>*:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}

function Anchor({ href = "", children, ...props }: React.ComponentProps<"a">) {
  const className =
    "text-foreground underline underline-offset-2 transition-opacity hover:opacity-70";
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link className={className} href={href as any} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a
      className={className}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    >
      {children}
    </a>
  );
}

export const mdxComponents: MDXComponents = {
  h1: (props) => <Heading as="h1" {...props} />,
  h2: (props) => <Heading as="h2" {...props} />,
  h3: (props) => <Heading as="h3" {...props} />,
  p: ({ className, ...props }) => (
    <p
      className={cn("mb-4 text-muted-foreground leading-7", className)}
      {...props}
    />
  ),
  a: Anchor,
  strong: (props) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        "my-4 ml-1 list-disc space-y-1",
        className?.includes("contains-task-list") && "ml-0 list-none",
        className
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn("my-4 ml-1 list-decimal space-y-1", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li
      className={cn(
        "mt-2 text-muted-foreground",
        className?.includes("task-list-item") &&
          "flex items-center gap-2 text-foreground",
        className
      )}
      {...props}
    />
  ),
  input: (props) => <input className="h-4 w-4" readOnly {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-4 border-primary border-l-4 pl-4 italic"
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-border border-dashed" />,
  code: ({ className, ...props }) =>
    // Fenced blocks are styled by `pre`; only inline code gets the pill.
    className ? (
      <code className={className} {...props} />
    ) : (
      <code
        className="rounded bg-muted px-1 py-0.5 font-mono text-foreground text-sm"
        {...props}
      />
    ),
  pre: CodeBlock,
  img: ({ alt, src, ...props }) => (
    // biome-ignore lint/performance/noImgElement: MDX images may be remote or SVG
    <img
      alt={alt ?? ""}
      className="my-6 h-auto w-full rounded-lg"
      loading="lazy"
      // Local images are compiled to static imports ({ src, width, height })
      src={typeof src === "string" ? src : (src as { src?: string })?.src}
      {...props}
    />
  ),
  table: ({ children }) => (
    <Frame className="my-4 w-full overflow-hidden py-0">
      <Table className="!mt-1.5 mb-1">{children}</Table>
    </Frame>
  ),
  thead: (props) => <TableHeader {...props} />,
  tbody: (props) => <TableBody {...props} />,
  tr: (props) => <TableRow {...props} />,
  th: ({ style: _style, ...props }) => (
    <TableHead className="whitespace-normal break-words" {...props} />
  ),
  td: ({ style: _style, ...props }) => (
    <TableCell className="whitespace-normal break-words" {...props} />
  ),
  Callout,
};
