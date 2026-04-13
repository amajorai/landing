"use client";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { ProgressiveBlur } from "@/components/progressive-blur";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";

const menuItems = [
  { name: "blog", href: "/blog" },
  { name: "about", href: "/about" },
  {
    name: "careers",
    href: "https://www.notion.so/42d020b872164c31aaae5aa30b2c30fc?pvs=106",
  },
  {
    name: "brand kit",
    href: "https://amajor.notion.site/7917e0bbe55683feb1bb019132b83c9d?v=5b97e0bbe55682e09fc308819305d413",
  },
];

export default function Header() {
  const [menuState, setMenuState] = useState(false);
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
        // Show header when scrolling up or at the top of the page
        // Always show header when menu is open
        visible:
          (!isScrollingDown && isScrolledPastThreshold) ||
          currentScrollPos < 50 ||
          menuState,
        prevScrollPos: currentScrollPos,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollState.prevScrollPos, menuState]);

  return (
    <header>
      <nav
        className={`fixed z-60 w-full transition-transform duration-300 ${
          scrollState.visible ? "translate-y-0" : "-translate-y-full"
        }`}
        data-state={menuState && "active"}
      >
        <ProgressiveBlur useThemeBackground={true} />
        <div className="relative z-[60] m-auto px-6 py-2">
          <div className="relative flex items-center py-3 lg:py-4">
            {/* Logo + Nav links — centered */}
            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 lg:flex">
              <FadeIn duration={0.4} viewOptions={{ margin: "0px" }}>
                <Link aria-label="home" className="flex items-center" href="/">
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

            {/* New Project button + Theme toggle — right */}
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
  );
}
