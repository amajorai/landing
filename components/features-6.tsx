import type { LucideIcon } from "lucide-react";
import {
  ArrowRightLeft,
  Building2,
  FileBox,
  Gauge,
  Globe,
  Lightbulb,
  MessageCircle,
  Palette,
  Puzzle,
  RefreshCw,
  Rocket,
  Search,
  Server,
  Smartphone,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";

interface FeatureLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
  darkInvert?: boolean;
}

interface Feature {
  title: string;
  description: string;
  className: string;
  icon: LucideIcon;
  logos?: FeatureLogo[];
}

const features: Feature[] = [
  {
    title: "Web design",
    description:
      "Websites that load fast, look sharp, and turn visitors into leads. Not just good-looking mockups.",
    className: "col-span-2 md:row-span-2",
    icon: Palette,
  },
  {
    title: "Web apps",
    description:
      "Full-stack web applications built for real users. From simple tools to complex platforms.",
    className: "col-span-1",
    icon: Globe,
  },
  {
    title: "Mobile apps",
    description:
      "iOS and Android apps, built natively or cross-platform depending on what your users need.",
    className: "col-span-1",
    icon: Smartphone,
    logos: [
      {
        src: "/logos/apple.svg",
        alt: "Apple",
        width: 16,
        height: 16,
        darkInvert: true,
      },
      {
        src: "/logos/android.svg",
        alt: "Android",
        width: 16,
        height: 16,
        darkInvert: true,
      },
    ],
  },
  {
    title: "Browser extensions",
    description:
      "Chrome, Firefox, and Edge extensions that integrate directly into the tools your users already use.",
    className: "col-span-1",
    icon: Puzzle,
    logos: [
      { src: "/logos/chrome.svg", alt: "Chrome", width: 16, height: 16 },
      { src: "/logos/firefox.svg", alt: "Firefox", width: 16, height: 16 },
      { src: "/logos/edge.svg", alt: "Edge", width: 16, height: 16 },
    ],
  },
  {
    title: "Enterprise systems",
    description:
      "Internal tools, dashboards, and integrations built to handle real business complexity.",
    className: "col-span-1",
    icon: Building2,
  },
  {
    title: "SaaS products",
    description:
      "Subscription software built to scale. Auth, billing, multi-tenancy, and everything else included.",
    className: "col-span-2",
    icon: Rocket,
  },
  {
    title: "UI/UX design",
    description:
      "Standalone design work. User flows, wireframes, prototypes, and high-fidelity interfaces.",
    className: "col-span-1",
    icon: Palette,
  },
  {
    title: "DevOps & infrastructure",
    description:
      "CI/CD pipelines, cloud setup on AWS, GCP, or Azure, and infrastructure that doesn't fall over.",
    className: "col-span-1",
    icon: Server,
    logos: [
      { src: "/logos/aws_light.svg", alt: "AWS", width: 28, height: 16 },
      { src: "/logos/azure.svg", alt: "Azure", width: 24, height: 16 },
      {
        src: "/logos/google-cloud.svg",
        alt: "Google Cloud",
        width: 24,
        height: 16,
      },
    ],
  },
  {
    title: "Performance optimisation",
    description:
      "Slow software loses users. We find the bottlenecks and fix them in code, queries, or infrastructure.",
    className: "col-span-1",
    icon: Gauge,
  },
  {
    title: "MVP scoping",
    description:
      "Not sure what to build first? We'll help you define the smallest version that proves the idea.",
    className: "col-span-2 md:row-span-2",
    icon: Lightbulb,
  },
  {
    title: "Legacy modernisation",
    description:
      "Old, brittle software rebuilt on a stack that can actually support where your business is going.",
    className: "col-span-1",
    icon: RefreshCw,
  },
  {
    title: "Digital transformation",
    description:
      "Moving offline or manual processes online. We've done it for hospitals, logistics, and finance.",
    className: "col-span-1",
    icon: ArrowRightLeft,
  },
  {
    title: "White-label builds",
    description:
      "Software built for agencies or businesses to rebrand and resell as their own product.",
    className: "col-span-1",
    icon: FileBox,
  },
  {
    title: "SEO optimisation",
    description:
      "Technical SEO baked in from the start. Fast sites, clean markup, structured data, and content that ranks.",
    className: "col-span-1",
    icon: Search,
  },
  {
    title: "Full deployment",
    description:
      "We don't just hand over code. We ship it, host it, and make sure it runs in production.",
    className: "col-span-1",
    icon: Upload,
  },
  {
    title: "Consultancy",
    description:
      "Not sure what you need? We'll help you figure it out before you spend a dollar on development.",
    className: "col-span-2",
    icon: MessageCircle,
  },
];

export default function FeaturesSection() {
  return (
    <section className="pt-10 md:pt-14">
      <div className="mx-auto mb-6 max-w-5xl px-6">
        <FadeIn duration={0.4}>
          <h2 className="font-medium text-2xl tracking-tighter">What we do</h2>
        </FadeIn>
      </div>

      <FadeIn duration={0.4}>
        <div className="grid grid-cols-2 border-border border-t border-l border-dashed md:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                className={[
                  "space-y-3 border-border border-r border-b border-dashed p-6 transition-colors duration-200 hover:bg-accent/50",
                  feature.className,
                ].join(" ")}
                key={index}
              >
                <div className="flex items-center gap-2">
                  <Icon className="size-4 shrink-0 text-muted-foreground" />
                  <h3 className="font-medium text-sm">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
                {feature.logos && feature.logos.length > 0 && (
                  <div className="flex items-center gap-2 pt-1">
                    {feature.logos.map((logo, logoIndex) => (
                      <Image
                        alt={logo.alt}
                        className={`h-4 w-auto${logo.darkInvert ? "dark:invert" : ""}`}
                        height={logo.height}
                        key={logoIndex}
                        src={logo.src}
                        width={logo.width}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}
