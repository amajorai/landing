import { FadeIn } from "@/components/ui/fade-in";

const features = [
  {
    title: "Web design",
    description:
      "Websites that load fast, look sharp, and turn visitors into leads. Not just good-looking mockups.",
  },
  {
    title: "Software development",
    description:
      "Web apps, mobile apps, and desktop software. We own the full process so you're not managing three vendors.",
  },
  {
    title: "Digital solutions",
    description:
      "Design, engineering, copywriting, and project management under one roof. One contact. Full accountability.",
  },
  {
    title: "Discovery and planning",
    description:
      "We map out exactly what we're building before writing a single line of code. No scope creep, no surprises.",
  },
  {
    title: "30-day delivery",
    description:
      "Discovery to launch in under a month. We scope everything upfront and hold ourselves to it.",
  },
  {
    title: "Founder-led",
    description:
      "The founder leads every project personally, backed by a lean team of engineers and designers. You are never handed off to juniors or outsourced.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="pt-10 md:pt-14">
      <div className="mx-auto mb-6 max-w-5xl px-6">
        <FadeIn duration={0.4}>
          <h2 className="font-medium text-2xl tracking-tighter">
            What you get
          </h2>
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
