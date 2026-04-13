export default function StatsSection() {
  return (
    <section className="pt-10 md:pt-14" id="services">
      <div className="mx-auto mb-6 max-w-5xl px-6">
        <div className="relative z-10 max-w-xl space-y-3">
          <h2 className="font-medium text-2xl tracking-tighter">
            Built on experience
          </h2>
          <p className="text-muted-foreground">
            A Major brings together design, engineering, and project management
            to deliver software that works for businesses across industries,
            from Singapore and beyond.
          </p>
          <p className="text-muted-foreground">
            Our team includes professional software engineers and UX/UI
            designers, each with many years of industry experience. Every
            project is backed by a team that knows what it&apos;s doing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 border-border border-y border-dashed">
        <div className="space-y-2 border-border border-r border-b border-dashed p-6">
          <div className="bg-linear-to-r from-zinc-950 to-zinc-600 bg-clip-text font-medium text-5xl text-transparent dark:from-white dark:to-zinc-800">
            7+
          </div>
          <p className="text-muted-foreground text-sm">
            years of engineering experience
          </p>
        </div>
        <div className="space-y-2 border-border border-b border-dashed p-6">
          <div className="bg-linear-to-r from-zinc-950 to-zinc-600 bg-clip-text font-medium text-5xl text-transparent dark:from-white dark:to-zinc-800">
            30
          </div>
          <p className="text-muted-foreground text-sm">
            days from idea to launch
          </p>
        </div>
        <div className="col-span-2 p-6">
          <blockquote className="space-y-2 border-l-4 pl-4">
            <p className="text-muted-foreground text-sm">
              We don&apos;t just build software and hand it over. Every
              engagement is managed end-to-end, with direct access to the
              founder throughout, and a clear process from discovery to launch.
            </p>
            <cite className="block font-medium text-sm">
              Jia Wei Ng, Founder
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
