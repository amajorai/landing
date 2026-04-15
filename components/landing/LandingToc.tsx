"use client";

import { List } from "lucide-react";
import { useState } from "react";
import type { TocHeading } from "@/components/notion/TableOfContents";
import { TableOfContents } from "@/components/notion/TableOfContents";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const LANDING_SECTIONS: TocHeading[] = [
  { id: "about", text: "Who we are", level: 1 },
  { id: "process", text: "How we work", level: 1 },
  { id: "portfolio", text: "Our work", level: 1 },
  { id: "ryu", text: "The agency behind Ryu", level: 1 },
  { id: "services", text: "Why businesses choose us", level: 1 },
  { id: "what-we-do", text: "What we do", level: 1 },
  { id: "team", text: "Our founder", level: 1 },
  { id: "faq", text: "You should know these", level: 1 },
  { id: "partners", text: "Our partners", level: 1 },
  { id: "contact", text: "Ready to build?", level: 1 },
];

export function LandingToc() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar - fixed right, shown on xl+ */}
      <div className="fixed top-0 right-6 hidden h-screen w-64 items-center xl:flex">
        <TableOfContents headings={LANDING_SECTIONS} />
      </div>

      {/* Mobile - button bottom right above mobile bottom bar */}
      <div className="fixed right-4 bottom-20 z-[200] xl:hidden">
        <Drawer direction="right" onOpenChange={setOpen} open={open}>
          <DrawerTrigger asChild>
            <button
              className="rounded-full bg-transparent p-3 backdrop-blur-sm"
              type="button"
            >
              <List className="h-5 w-5" />
              <span className="sr-only">Page sections</span>
            </button>
          </DrawerTrigger>
          <DrawerContent className="w-72 overflow-y-auto">
            <DrawerHeader>
              <DrawerTitle>Contents</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-4">
              <TableOfContents
                alwaysExpanded
                headings={LANDING_SECTIONS}
                onItemClick={() => setOpen(false)}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
