import { FadeIn } from "@/components/ui/fade-in";

const features = [
  {
    title: "Web design",
    description:
      "Modern, high-performance websites designed to support your growth.",
  },
  {
    title: "Software development",
    description:
      "Web apps, mobile apps, and desktop software. Built from discovery to launch.",
  },
  {
    title: "Digital solutions",
    description:
      "End-to-end delivery for businesses. Design, engineering, copywriting, and project management.",
  },
  {
    title: "Discovery and planning",
    description:
      "We start by understanding your goals. Clear planning before a single line of code.",
  },
  {
    title: "Rapid delivery",
    description: "Most projects go from discovery to launch in under 30 days.",
  },
  {
    title: "Founder-led",
    description:
      "Every project is led personally by the founder. You are not handed off to a junior team.",
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
        <div className="grid grid-cols-2 border-border border-y border-dashed">
          {features.map((feature, index) => (
            <div
              className={[
                "space-y-2 p-6",
                index % 2 === 0 ? "border-border border-r border-dashed" : "",
                index < features.length - 2
                  ? "border-border border-b border-dashed"
                  : "",
              ].join(" ")}
              key={index}
            >
              <h3 className="font-medium text-sm">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
