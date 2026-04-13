"use client";
import { getCalApi } from "@calcom/embed-react";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
  const nextMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1
  );
  const nextMonth = nextMonthDate.toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
  const spots = process.env.NEXT_PUBLIC_SPOTS_REMAINING ?? "1";

  const handleBookCall = async () => {
    const cal = await getCalApi({ namespace: "amajor" });
    cal("modal", {
      calLink: "jiaweing/amajor",
      config: { layout: "month_view" },
    });
  };

  return (
    <section className="py-20" id="contact">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="font-medium text-2xl tracking-tighter">
            Ready to build something that works?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tell us what you&apos;re building. We&apos;ll respond within 24
            hours.
          </p>

          <div className="mx-auto mt-6 max-w-sm">
            <div className="relative grid grid-cols-[1fr_auto] items-center rounded-[calc(var(--radius)+0.75rem)] bg-background pr-3 has-[input:focus]:ring-muted">
              <div className="md:pr-1.5 lg:pr-0">
                <Button onClick={handleBookCall}>Book a Call</Button>
              </div>
            </div>
            <div className="mt-8 flex flex-col items-center gap-2">
              <span className="inline-flex items-center justify-center gap-2 text-muted-foreground text-sm">
                <span className="font-medium text-muted-foreground/60 line-through">
                  {currentMonth} fully booked
                </span>
              </span>
              <span className="inline-flex items-center justify-center gap-2 text-sm">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-green-500" />
                </span>
                <span className="font-medium text-foreground">
                  {spots} spot available in {nextMonth}
                </span>
              </span>
              <p className="text-muted-foreground/70 text-xs">
                We limit intake each month so every project gets the focus it
                deserves.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
