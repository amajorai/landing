"use client";
import { getCalApi } from "@calcom/embed-react";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ServiceCtaProps {
  techName: string;
}

export function ServiceCta({ techName }: ServiceCtaProps) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "amajor" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="relative overflow-hidden rounded-lg border border-border border-dashed p-8 text-center">
      <h2 className="mb-2 font-semibold text-2xl tracking-tight">
        Start a {techName} project
      </h2>
      <p className="mb-6 text-muted-foreground">
        Book a free discovery call and let&apos;s scope your project together.
      </p>
      <Button
        className="rounded-full px-6"
        data-cal-config='{"layout":"month_view"}'
        data-cal-link="jiaweing/amajor"
        data-cal-namespace="amajor"
        onClick={async () => {
          const cal = await getCalApi({ namespace: "amajor" });
          cal("modal", {
            calLink: "jiaweing/amajor",
            config: { layout: "month_view" },
          });
        }}
        size="lg"
      >
        Book a call
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
