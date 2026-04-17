"use client";
import { useEffect } from "react";

export function WebMCPProvider() {
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const ctx = (navigator as any).modelContext;
    if (!ctx?.provideContext) return;
    ctx.provideContext({
      tools: [
        {
          name: "contact_agency",
          description:
            "Get contact info and book a discovery call with A Major agency",
          inputSchema: { type: "object", properties: {} },
          execute: async () => ({
            email: "contact@amajor.ai",
            bookingUrl: "https://cal.com/jiaweing/amajor",
          }),
        },
        {
          name: "search_blog",
          description: "Search A Major blog posts by keyword",
          inputSchema: {
            type: "object",
            properties: { query: { type: "string" } },
            required: ["query"],
          },
          execute: async ({ query }: { query: string }) => {
            const res = await fetch(
              `/api/search/posts?q=${encodeURIComponent(query)}`
            );
            return res.json();
          },
        },
      ],
    });
  }, []);
  return null;
}
