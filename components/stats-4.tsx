export default function StatsSection() {
  return (
    <section className="py-10 md:py-14" id="services">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
        <div className="relative z-10 max-w-xl space-y-6">
          <h2 className="font-medium text-2xl tracking-tighter">
            Built on experience
          </h2>
          <p className="text-muted-foreground">
            A Major brings together design, engineering, and project management
            to deliver software that works for businesses across industries,
            from Singapore and beyond.
          </p>
        </div>
        <div className="space-y-10">
          <p className="text-muted-foreground">
            We turn complicated problems into simple solutions. No tech
            jargon, no unnecessary features. Just well-built software that
            solves real problems and grows with your business.
          </p>
          <div className="flex gap-12">
            <div className="space-y-2">
              <div className="bg-linear-to-r from-zinc-950 to-zinc-600 bg-clip-text text-5xl text-transparent dark:from-white dark:to-zinc-800">
                7+
              </div>
              <p className="text-muted-foreground text-sm">years of engineering experience</p>
            </div>
            <div className="space-y-2">
              <div className="bg-linear-to-r from-zinc-950 to-zinc-600 bg-clip-text text-5xl text-transparent dark:from-white dark:to-zinc-800">
                30
              </div>
              <p className="text-muted-foreground text-sm">days from idea to launch</p>
            </div>
          </div>
          <blockquote className="space-y-2 border-l-4 pl-4">
            <p className="text-muted-foreground text-sm">
              We don&apos;t just build software and hand it over. Every
              engagement is managed end-to-end, with direct access to the
              founder throughout, and a clear process from discovery to
              launch.
            </p>
            <cite className="block font-medium text-sm">Jia Wei Ng, Founder</cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
