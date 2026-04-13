"use client";
import { getCalApi } from "@calcom/embed-react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingBookingButton() {
  const handleBookCall = async () => {
    const cal = await getCalApi({ namespace: "amajor" });
    cal("modal", {
      calLink: "jiaweing/amajor",
      config: { layout: "month_view" },
    });
  };

  return (
    <Button
      className="fixed right-6 bottom-24 z-50 hidden rounded-full shadow-lg lg:flex"
      onClick={handleBookCall}
    >
      <Calendar className="h-4 w-4" />
      Book a Call
    </Button>
  );
}
