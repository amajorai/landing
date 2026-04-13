"use client";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function FloatingBookingButton() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "amajor" });
      cal("floatingButton", {
        calLink: "jiaweing/amajor",
        config: { layout: "month_view" },
        buttonText: "Book a Call",
      });
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#09090b" },
          dark: { "cal-brand": "#ffffff" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return null;
}
