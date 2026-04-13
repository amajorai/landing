import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  const month = new Date().toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
  const spots = process.env.NEXT_PUBLIC_SPOTS_REMAINING ?? "2";

  return (
    <section className="py-20" id="contact">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="font-medium text-2xl tracking-tighter">
            Your next project starts here.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tell us what you're building. We'll get back to you within 24 hours.
          </p>
          <p className="mt-3 text-muted-foreground text-sm">
            We limit intake each month so every client gets the full team, the
            full attention, and a finished product that actually works.
          </p>

          <div className="mx-auto mt-10 max-w-sm space-y-4 lg:mt-12">
            <div className="relative grid grid-cols-[1fr_auto] items-center rounded-[calc(var(--radius)+0.75rem)] bg-background pr-3 has-[input:focus]:ring-muted">
              <div className="md:pr-1.5 lg:pr-0">
                <Link href="https://tally.so/r/wLoJKj">
                  <Button>Start a project</Button>
                </Link>
              </div>
            </div>
            <span className="inline-flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-green-500" />
              </span>
              <span>
                <span className="font-medium text-foreground">
                  {spots} client spots
                </span>{" "}
                remaining in {month}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
