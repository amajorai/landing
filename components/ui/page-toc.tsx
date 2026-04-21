"use client";

import { List } from "lucide-react";
import { useRef, useState } from "react";
import type { TocHeading } from "@/components/notion/TableOfContents";
import { TableOfContents } from "@/components/notion/TableOfContents";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function PageToc({ headings }: { headings: TocHeading[] }) {
  const [open, setOpen] = useState(false);
  const pendingId = useRef<string | null>(null);

  function handleOpenChange(val: boolean) {
    setOpen(val);
    if (!val && pendingId.current) {
      const id = pendingId.current;
      pendingId.current = null;
      window.history.replaceState(null, "", `#${id}`);
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 96;
        window.scrollTo({ top, behavior: "smooth" });
      });
    }
  }

  if (headings.length === 0) return null;

  return (
    <>
      {/* Desktop sidebar — fixed right, xl+ only */}
      <div className="fixed top-0 right-6 hidden h-screen w-64 items-center xl:flex">
        <TableOfContents headings={headings} />
      </div>

      {/* Mobile — button bottom-right above nav bar */}
      <div className="fixed right-4 bottom-20 z-[200] xl:hidden">
        <Drawer direction="right" onOpenChange={handleOpenChange} open={open}>
          <DrawerTrigger asChild>
            <button
              className="rounded-full bg-transparent p-4 shadow-xs backdrop-blur-sm"
              type="button"
            >
              <List className="h-6 w-6" />
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
                headings={headings}
                onItemClick={(id) => {
                  pendingId.current = id;
                  setOpen(false);
                }}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
