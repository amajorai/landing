import { FadeIn } from "@/components/ui/fade-in";

const services = [
  {
    title: "web design",
    description:
      "Modern, high-performance websites built to support your growth. Design and engineering under one roof.",
  },
  {
    title: "software development",
    description:
      "Websites, mobile and desktop apps, browser extensions, enterprise systems. If it runs on a screen, we can build it.",
  },
  {
    title: "digital solutions",
    description:
      "End-to-end delivery for businesses across industries. Design, engineering, copywriting, and project management.",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 md:py-24" id="services">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn duration={0.4}>
          <h2 className="text-2xl tracking-tighter lg:text-3xl">
            we also build software
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            A Major is a Singapore-based software agency. We work with
            organisations to deliver modern websites and digital platforms that
            support their growth, from discovery through to launch.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} duration={0.4}>
          <div className="mt-12 grid gap-8 border-t border-dashed pt-10 sm:grid-cols-3">
            {services.map((service, index) => (
              <div key={index}>
                <h3 className="font-medium text-sm">{service.title}</h3>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2} duration={0.4}>
          <div className="mt-12 rounded-2xl bg-muted px-8 py-7 dark:bg-muted/50">
            <p className="font-medium text-sm">founder-led, hands-on</p>
            <p className="mt-2 max-w-2xl text-muted-foreground text-sm leading-relaxed">
              Every engagement is led personally by Jia Wei Ng, founder,
              software engineer, CS graduate from the University of Glasgow with
              7+ years across web, mobile, and enterprise platforms. You are not
              handed off to a junior designer or an outsourced team.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
