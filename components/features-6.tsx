import {
  Globe,
  Layers,
  Lightbulb,
  Paintbrush,
  Timer,
  User,
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

const features = [
  {
    icon: Paintbrush,
    title: "Web design",
    description:
      "Modern, high-performance websites designed to support your growth.",
  },
  {
    icon: Layers,
    title: "Software development",
    description:
      "Web apps, mobile apps, and desktop software. Built from discovery to launch.",
  },
  {
    icon: Globe,
    title: "Digital solutions",
    description:
      "End-to-end delivery for businesses. Design, engineering, copywriting, and project management.",
  },
  {
    icon: Lightbulb,
    title: "Discovery and planning",
    description:
      "We start by understanding your goals. Clear planning before a single line of code.",
  },
  {
    icon: Timer,
    title: "Rapid delivery",
    description:
      "Most projects go from discovery to launch in under 30 days.",
  },
  {
    icon: User,
    title: "Founder-led",
    description:
      "Every project is led personally by the founder. You are not handed off to a junior team.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-5xl space-y-6 px-6">
        <FadeIn duration={0.4}>
          <div className="space-y-3">
            <h2 className="font-medium text-2xl tracking-tighter">
              We also build software
            </h2>
            <p className="text-muted-foreground">
              A Major is a Singapore-based software company. We work with
              organisations to deliver modern websites and digital platforms
              that support their growth, from discovery through to launch.
            </p>
          </div>
        </FadeIn>

        <div className="relative mx-auto grid grid-cols-1 gap-y-8 pt-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <FadeIn delay={0.1 * index} duration={0.4} key={index}>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon className="size-4" />
                    <h3 className="font-medium text-sm">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
