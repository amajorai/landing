import { FadeIn } from "@/components/ui/fade-in";

export default function ContentSection() {
  return (
    <section className="py-10 md:py-14" id="about">
      <div className="mx-auto max-w-5xl space-y-4 px-6">
        <FadeIn duration={0.4}>
          <h2 className="relative z-10 max-w-xl font-medium text-2xl tracking-tighter">
            Who we are
          </h2>
        </FadeIn>

        <div>
          <div className="relative space-y-4">
            <FadeIn delay={0.2} direction="left" duration={0.5}>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  A Major is a Singapore-based technology company specialising
                  in{" "}
                  <span className="font-semibold text-accent-foreground">
                    web design, software development, and digital solutions
                  </span>{" "}
                  for businesses.
                </p>
                <p className="text-muted-foreground">
                  We work with organisations across industries to deliver
                  modern, high-performance websites and digital platforms that
                  support their growth. Our team brings together expertise in
                  design, engineering, copywriting, and project management to
                  deliver end-to-end solutions.
                </p>
                <p className="text-muted-foreground">
                  From discovery through to launch, every project is managed
                  with a clear process, transparent communication, and close
                  collaboration with the client.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} duration={0.5}>
              <div className="pt-6">
                <blockquote className="border-l-4 pl-4">
                  <p>
                    In music theory, A Major is the key that defines the
                    structure, letting every instrument play in harmony.
                    That&apos;s what we build.
                  </p>

                  <div className="mt-6 space-y-3">
                    <cite className="block font-medium">
                      Jia Wei Ng, Founder
                    </cite>
                  </div>
                </blockquote>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
