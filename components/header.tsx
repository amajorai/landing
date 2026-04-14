"use client";
import { getCalApi } from "@calcom/embed-react";
import { BookOpen, Briefcase, Info, Layers, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { ProgressiveBlur } from "@/components/progressive-blur";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";

const menuItems = [
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "About", href: "/about", icon: Info },
  {
    name: "Careers",
    href: "https://www.notion.so/42d020b872164c31aaae5aa30b2c30fc?pvs=106",
    icon: Briefcase,
  },
  {
    name: "Brand Kit",
    href: "https://amajor.notion.site/7917e0bbe55683feb1bb019132b83c9d?v=5b97e0bbe55682e09fc308819305d413",
    icon: Layers,
  },
];

export default function Header() {
  const [scrollState, setScrollState] = useState({
    visible: true,
    prevScrollPos: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = currentScrollPos > scrollState.prevScrollPos;
      const isScrolledPastThreshold = currentScrollPos > 50;

      setScrollState({
        visible:
          (!isScrollingDown && isScrolledPastThreshold) ||
          currentScrollPos < 50,
        prevScrollPos: currentScrollPos,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollState.prevScrollPos]);

  return (
    <>
      <header>
        <nav
          className={`fixed z-60 w-full transition-transform duration-300 ${
            scrollState.visible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <ProgressiveBlur
            className="lg:hidden"
            height="90px"
            useThemeBackground={true}
          />
          <ProgressiveBlur
            className="hidden lg:block"
            useThemeBackground={true}
          />
          <div className="relative z-[60] m-auto px-6 py-2">
            <div className="relative flex items-center pt-6 pb-3 lg:py-4">
              {/* Mobile logo - centered, hidden on desktop */}
              <div className="absolute left-1/2 -translate-x-1/2 lg:hidden">
                <FadeIn duration={0.4} viewOptions={{ margin: "0px" }}>
                  <Link
                    aria-label="home"
                    className="flex items-center"
                    href="/"
                  >
                    <Logo />
                  </Link>
                </FadeIn>
              </div>

              {/* Logo + Nav links - centered */}
              <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 lg:flex">
                <FadeIn duration={0.4} viewOptions={{ margin: "0px" }}>
                  <Link
                    aria-label="home"
                    className="flex items-center"
                    href="/"
                  >
                    <Logo />
                  </Link>
                </FadeIn>

                <ul className="flex items-center gap-8 text-sm">
                  {menuItems.map((item, index) => (
                    <FadeIn
                      delay={0.1 * index}
                      duration={0.4}
                      key={index}
                      viewOptions={{ margin: "0px" }}
                    >
                      <li>
                        {item.href.startsWith("/") ? (
                          <Link
                            className="text-muted-foreground duration-150 hover:text-accent-foreground"
                            href={item.href as any}
                          >
                            {item.name}
                          </Link>
                        ) : (
                          <a
                            className="text-muted-foreground duration-150 hover:text-accent-foreground"
                            href={item.href}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {item.name}
                          </a>
                        )}
                      </li>
                    </FadeIn>
                  ))}
                </ul>
              </div>

              {/* New Project button + Theme toggle - right */}
              <div className="ml-auto hidden items-center gap-3 lg:flex">
                <FadeIn duration={0.4} viewOptions={{ margin: "0px" }}>
                  <Button
                    asChild
                    className="h-8 rounded-full px-3 text-xs"
                    size="sm"
                  >
                    <a
                      href="https://www.notion.so/f9ac6e86fafa4ca28ed6c2af11d498cf?pvs=106"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      New Project
                    </a>
                  </Button>
                </FadeIn>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile bottom app bar */}
      <div className="lg:hidden">
        <ProgressiveBlur
          height="100px"
          position="bottom"
          useThemeBackground={true}
        />
        <nav className="fixed bottom-0 z-60 w-full">
          <div className="relative grid grid-cols-5 items-center px-6 pt-3 pb-6">
            {/* Slots 0–1: left items */}
            {menuItems.slice(0, 2).map((item, index) => {
              const Icon = item.icon;
              return item.href.startsWith("/") ? (
                <Link
                  className="flex flex-col items-center gap-1 text-muted-foreground duration-150 hover:text-accent-foreground"
                  href={item.href as any}
                  key={index}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-[10px]">{item.name}</span>
                </Link>
              ) : (
                <a
                  className="flex flex-col items-center gap-1 text-muted-foreground duration-150 hover:text-accent-foreground"
                  href={item.href}
                  key={index}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-[10px]">{item.name}</span>
                </a>
              );
            })}

            {/* Slot 2: invisible placeholder - Plus button floats here */}
            <div aria-hidden="true" />

            {/* Slots 3–4: right items */}
            {menuItems.slice(2).map((item, index) => {
              const Icon = item.icon;
              return item.href.startsWith("/") ? (
                <Link
                  className="flex flex-col items-center gap-1 text-muted-foreground duration-150 hover:text-accent-foreground"
                  href={item.href as any}
                  key={index}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-[10px]">{item.name}</span>
                </Link>
              ) : (
                <a
                  className="flex flex-col items-center gap-1 text-muted-foreground duration-150 hover:text-accent-foreground"
                  href={item.href}
                  key={index}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-[10px]">{item.name}</span>
                </a>
              );
            })}

            {/* Floating center Book button - elevated above the bar */}
            <button
              className="absolute top-0 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-background shadow-lg duration-150 active:scale-95"
              onClick={async () => {
                const cal = await getCalApi({ namespace: "amajor" });
                cal("modal", {
                  calLink: "jiaweing/amajor",
                  config: { layout: "month_view" },
                });
              }}
              type="button"
            >
              <Plus className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
