"use client";
import { getCalApi } from "@calcom/embed-react";
import { Calendar } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function FloatingBookingButton() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  const handleBookCall = async () => {
    const cal = await getCalApi({ namespace: "amajor" });
    cal("modal", {
      calLink: "jiaweing/amajor",
      config: { layout: "month_view" },
    });
  };

  return (
    <>
      <style>{`
        .bubble-btn {
          transition: transform 2s cubic-bezier(0.34, 1.56, 0.64, 1),
                      width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
                      padding 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .bubble-btn .morph-text {
          max-width: 0;
          margin-left: 0;
          opacity: 0;
          transition: max-width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
                      margin-left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
                      opacity 0.4s ease-out;
        }
        .bubble-btn:hover .morph-text {
          max-width: 120px;
          margin-left: 8px;
          opacity: 1;
        }
      `}</style>
      <Button
        className="bubble-btn group !p-0 hover:!px-5 fixed right-6 bottom-6 z-50 hidden h-14 w-14 items-center justify-center gap-0 overflow-hidden rounded-full shadow-lg hover:w-44 lg:flex"
        onClick={handleBookCall}
      >
        <Calendar className="h-5 w-5 shrink-0" />
        <span className="morph-text overflow-hidden whitespace-nowrap font-medium text-sm">
          Book a Call
        </span>
      </Button>
    </>
  );
}
