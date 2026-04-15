"use client";
import { Check, Copy } from "lucide-react";
import { useCallback, useState } from "react";
import { Frame, FramePanel } from "@/components/ui/frame";

interface QuickstartBlockProps {
  code: string;
  language?: string;
  docsUrl?: string;
}

export function QuickstartBlock({
  code,
  language = "bash",
  docsUrl,
}: QuickstartBlockProps) {
  const [didCopy, setDidCopy] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setDidCopy(true);
    window.setTimeout(() => setDidCopy(false), 1500);
  }, [code]);

  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-lg">Quick start</h2>
      <Frame>
        <div className="flex items-center justify-between gap-2 px-4 py-2">
          <div className="font-mono text-muted-foreground text-xs">
            {language}
          </div>
          <button
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
          <pre className="!my-0 overflow-x-auto bg-transparent p-4 text-foreground text-sm">
            <code className="font-mono">{code}</code>
          </pre>
        </FramePanel>
      </Frame>
      {docsUrl && (
        <p className="text-muted-foreground text-sm">
          Read the full documentation at{" "}
          <a
            className="font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
            href={docsUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            {docsUrl.replace(/^https?:\/\//, "")}
          </a>
        </p>
      )}
    </div>
  );
}
