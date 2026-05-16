"use client";

import {
  ExternalLink,
  Film,
  Github,
  ImageIcon,
  Layers,
  Sparkles,
  Wand2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { DotGridBackground } from "@/components/ui/dot-grid-background";
import { FadeIn } from "@/components/ui/fade-in";
import { StarMark } from "@/components/ui/star-mark";
import Link from "next/link";

// ── Feature cards ─────────────────────────────────────────────────────────────

function LayerEditorVisual() {
  const [active, setActive] = useState(0);
  const layers = ["Background", "Image", "Text", "Overlay"];

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % layers.length), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-full flex-col justify-center gap-1 px-4 py-4">
      {layers.map((layer, i) => (
        <div
          key={layer}
          className={`flex items-center gap-2 rounded px-3 py-1.5 text-xs transition-all duration-300 ${
            i === active
              ? "bg-foreground/10 font-medium text-foreground"
              : "text-muted-foreground/60"
          }`}
        >
          <Layers className="h-3 w-3 shrink-0" />
          {layer}
        </div>
      ))}
    </div>
  );
}

function FrameExtractVisual() {
  const [frame, setFrame] = useState(0);
  const total = 24;

  useEffect(() => {
    const id = setInterval(
      () => setFrame((p) => (p + 1) % total),
      120
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-4 py-4">
      <div className="relative h-16 w-28 overflow-hidden rounded border border-border bg-muted/30">
        <div
          className="absolute inset-0 transition-all duration-100"
          style={{
            background: `hsl(${(frame / total) * 60 + 200}deg 40% 30%)`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Film className="h-5 w-5 text-white/50" />
        </div>
      </div>
      <div className="flex items-center gap-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`h-1 w-4 rounded-full transition-all duration-100 ${
              Math.floor((frame / total) * 8) === i
                ? "bg-foreground"
                : "bg-muted-foreground/20"
            }`}
          />
        ))}
      </div>
      <p className="text-[10px] text-muted-foreground">
        Frame {frame + 1} / {total}
      </p>
    </div>
  );
}

function AIRemovalVisual() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 0;
        return p + 2;
      });
    }, 60);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-6 py-4">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full bg-muted/30" />
        <div
          className="absolute inset-0 rounded-full bg-foreground/10 transition-all duration-100"
          style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Wand2 className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
      <div className="w-full">
        <div className="mb-1 flex justify-between text-[10px] text-muted-foreground">
          <span>Background removal</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-muted/30">
          <div
            className="h-full rounded-full bg-foreground/60 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function AIGenerationVisual() {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setDots((p) => (p + 1) % 4), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-4 py-4">
      <div className="flex h-20 w-28 items-center justify-center rounded border border-dashed border-border bg-muted/10">
        <Sparkles className="h-6 w-6 text-muted-foreground/50" />
      </div>
      <p className="text-center text-[11px] text-muted-foreground">
        Generating image{".".repeat(dots)}
      </p>
      <p className="text-center text-[10px] text-muted-foreground/50">
        Powered by Gemini
      </p>
    </div>
  );
}

function ExportVisual() {
  const formats = ["PNG", "JPEG", "WebP", "APNG", "GIF"];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % formats.length), 700);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-4 py-4">
      <ImageIcon className="h-6 w-6 text-muted-foreground/50" />
      <div className="flex flex-wrap justify-center gap-1">
        {formats.map((fmt, i) => (
          <span
            key={fmt}
            className={`rounded px-2 py-0.5 text-[10px] font-medium transition-all duration-300 ${
              i === active
                ? "bg-foreground text-background"
                : "bg-muted/30 text-muted-foreground"
            }`}
          >
            {fmt}
          </span>
        ))}
      </div>
      <p className="text-[10px] text-muted-foreground">Multi-format export</p>
    </div>
  );
}

function CarouselVisual() {
  const [page, setPage] = useState(0);
  const pages = 4;

  useEffect(() => {
    const id = setInterval(() => setPage((p) => (p + 1) % pages), 800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-4 py-4">
      <div className="relative flex h-16 w-36 items-center justify-center">
        {Array.from({ length: pages }).map((_, i) => (
          <div
            key={i}
            className="absolute h-12 w-24 rounded border border-border bg-muted/20 transition-all duration-500"
            style={{
              transform: `translateX(${(i - page + pages) % pages === 0 ? 0 : ((i - page + pages) % pages) * 8 - 4}px) scale(${(i - page + pages) % pages === 0 ? 1 : 0.85})`,
              zIndex: pages - ((i - page + pages) % pages),
              opacity: (i - page + pages) % pages < 3 ? 1 : 0,
            }}
          />
        ))}
      </div>
      <div className="flex gap-1">
        {Array.from({ length: pages }).map((_, i) => (
          <div
            key={i}
            className={`h-1 w-4 rounded-full transition-all duration-300 ${
              i === page ? "bg-foreground" : "bg-muted-foreground/20"
            }`}
          />
        ))}
      </div>
      <p className="text-[10px] text-muted-foreground">Carousel generator</p>
    </div>
  );
}

const FEATURES = [
  {
    title: "Layer-Based Editor",
    description:
      "Drag, resize, and rotate elements with a professional layer system — undo/redo and auto-save included.",
    visual: <LayerEditorVisual />,
  },
  {
    title: "Video Frame Extraction",
    description:
      "Scrub through any video and export frames as high-resolution images directly into your thumbnail.",
    visual: <FrameExtractVisual />,
  },
  {
    title: "AI Background Removal",
    description:
      "Remove backgrounds instantly with WebAssembly-based inference or the BRIA RMBG-1.4 model — no cloud required.",
    visual: <AIRemovalVisual />,
  },
  {
    title: "AI Image Generation",
    description:
      "Generate images with Gemini directly inside the editor. Bring your own API key.",
    visual: <AIGenerationVisual />,
  },
  {
    title: "Multi-Format Export",
    description:
      "Export thumbnails as PNG, JPEG, WebP, APNG, or GIF at any resolution.",
    visual: <ExportVisual />,
  },
  {
    title: "Carousel Generator",
    description:
      "Create multi-page thumbnail layouts for carousel-style YouTube content in one session.",
    visual: <CarouselVisual />,
  },
];

function BackstageSection() {
  return (
    <section className="relative border-border border-t border-dashed">
      <StarMark
        style={{ top: 0, left: 0, transform: "translate(-50%, -50%)" }}
      />
      <StarMark
        style={{ top: 0, right: 0, transform: "translate(50%, -50%)" }}
      />
      <div className="mx-auto max-w-5xl px-6 py-16">
        <p className="mb-8 text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Features
        </p>
        <div className="grid grid-cols-1 gap-px border-border border border-dashed sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col border-border border-dashed bg-background"
            >
              <div className="h-36 border-b border-dashed border-border">
                {feature.visual}
              </div>
              <div className="flex flex-col gap-1 p-5">
                <p className="font-medium text-sm">{feature.title}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function BackstagePage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <DotGridBackground
          className="text-zinc-950 opacity-[0.05] dark:text-white dark:opacity-[0.09]"
          dotRadius={1}
          spacing={28}
        />
        <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-16 lg:pt-28">
          <StarMark
            style={{ top: 0, left: 0, transform: "translate(-50%, -50%)" }}
          />
          <StarMark
            style={{ top: 0, right: 0, transform: "translate(50%, -50%)" }}
          />

          <FadeIn>
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <Link className="hover:text-foreground" href="/products">
                  Products
                </Link>
                <span>/</span>
                <span>Backstage</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                  <svg
                    className="h-6 w-6 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="font-semibold text-3xl tracking-tighter">
                      Backstage
                    </h1>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 font-medium text-muted-foreground text-xs">
                      <span className="relative flex size-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/75" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                      </span>
                      Available Now
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    The open-source YouTube thumbnail studio
                  </p>
                </div>
              </div>

              <p className="max-w-2xl text-muted-foreground leading-relaxed">
                Backstage is a free, open-source desktop application for
                designing high-performing YouTube thumbnails. Layer-based
                editing, AI-powered background removal, video frame extraction,
                and AI image generation — all running locally on your machine.
                No cloud subscriptions, no data leaving your device.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 font-medium text-background text-sm transition-opacity hover:opacity-80"
                  href="https://github.com/amajorai/backstage"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Github className="h-3.5 w-3.5" />
                  View on GitHub
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <span>Free &amp; open-source</span>
                  <span>·</span>
                  <span>Windows · macOS · Linux</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <FadeIn>
        <BackstageSection />
      </FadeIn>

      <FadeIn>
        <section className="relative overflow-hidden py-20" id="get-started">
          <StarMark
            style={{ top: 0, left: 0, transform: "translate(-50%, -50%)" }}
          />
          <StarMark
            style={{ top: 0, right: 0, transform: "translate(50%, -50%)" }}
          />
          <StarMark
            style={{ bottom: 0, left: 0, transform: "translate(-50%, 50%)" }}
          />
          <StarMark
            style={{ bottom: 0, right: 0, transform: "translate(50%, 50%)" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 opacity-30 [background:radial-gradient(125%_125%_at_50%_0%,transparent_40%,var(--color-red-600),var(--color-white)_100%)] dark:opacity-100"
          />
          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
            <h2 className="font-medium text-2xl tracking-tighter">
              Professional thumbnails. Zero subscriptions.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Free, open-source, and runs entirely on your machine.
            </p>
            <div className="mt-6 flex justify-center">
              <a
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 font-medium text-background text-sm transition-opacity hover:opacity-80"
                href="https://github.com/amajorai/backstage"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Github className="h-3.5 w-3.5" />
                Get Backstage on GitHub
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
