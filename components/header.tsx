"use client";
import { getCalApi } from "@calcom/embed-react";
import { BookOpen, Info, Layers, Package, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { ProductsNavContent } from "@/components/products-nav-content";
import { ProgressiveBlur } from "@/components/progressive-blur";
import { ServicesNavContent } from "@/components/services/services-nav-content";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

// Desktop nav items rendered before the Services dropdown
const beforeServiceItems = [
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
];

// Desktop nav items rendered after the Products dropdown
const afterProductsItems: { name: string; href: string }[] = [];

// Mobile bottom bar items (4 items + center booking button)
const mobileNavItems = [
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Services", href: "/services", icon: Layers },
  // slot 2 is center booking button (placeholder)
  { name: "Products", href: "/products", icon: Package },
  { name: "About", href: "/about", icon: Info },
];

export default function Header() {
  const pathname = usePathname();
  const [scrollState, setScrollState] = useState({
    visible: true,
    prevScrollPos: 0,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            scrollState.visible || isMenuOpen
              ? "translate-y-0"
              : "-translate-y-full"
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

              {/* Desktop: logo + nav centered */}
              <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
                <FadeIn duration={0.4} viewOptions={{ margin: "0px" }}>
                  <Link
                    aria-label="home"
                    className="flex items-center"
                    href="/"
                  >
                    <Logo />
                  </Link>
                </FadeIn>

                <FadeIn duration={0.4} viewOptions={{ margin: "0px" }}>
                  <NavigationMenu
                    onValueChange={(value) => setIsMenuOpen(value !== "")}
                    viewport={false}
                  >
                    <NavigationMenuList className="gap-3 text-sm">
                      {beforeServiceItems.map((item) => (
                        <NavigationMenuItem key={item.name}>
                          <Link
                            className="inline-flex h-auto items-center px-2 py-1 text-muted-foreground text-sm duration-150 hover:text-accent-foreground"
                            href={item.href as any}
                          >
                            {item.name}
                          </Link>
                        </NavigationMenuItem>
                      ))}

                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="h-auto bg-transparent px-2 py-1 text-muted-foreground text-sm hover:bg-transparent hover:text-accent-foreground data-[state=open]:bg-transparent data-[state=open]:text-accent-foreground">
                          Services
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ServicesNavContent />
                        </NavigationMenuContent>
                      </NavigationMenuItem>

                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="h-auto bg-transparent px-2 py-1 text-muted-foreground text-sm hover:bg-transparent hover:text-accent-foreground data-[state=open]:bg-transparent data-[state=open]:text-accent-foreground">
                          Products
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ProductsNavContent />
                        </NavigationMenuContent>
                      </NavigationMenuItem>

                      {afterProductsItems.map((item) => (
                        <NavigationMenuItem key={item.name}>
                          {item.href.startsWith("/") ? (
                            <Link
                              className="inline-flex h-auto items-center px-2 py-1 text-muted-foreground text-sm duration-150 hover:text-accent-foreground"
                              href={item.href as any}
                            >
                              {item.name}
                            </Link>
                          ) : (
                            <a
                              className="inline-flex h-auto items-center px-2 py-1 text-muted-foreground text-sm duration-150 hover:text-accent-foreground"
                              href={item.href}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              {item.name}
                            </a>
                          )}
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                </FadeIn>
              </div>

              {/* Desktop: New Project + theme toggle - right */}
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
            {mobileNavItems.slice(0, 2).map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  className={`flex flex-col items-center gap-1 duration-150 hover:text-accent-foreground ${isActive ? "text-foreground" : "text-muted-foreground"}`}
                  href={item.href as any}
                  key={item.name}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-[10px]">{item.name}</span>
                </Link>
              );
            })}

            {/* Slot 2: invisible placeholder - Plus button floats here */}
            <div aria-hidden="true" />

            {/* Slots 3–4: right items */}
            {mobileNavItems.slice(2).map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  className={`flex flex-col items-center gap-1 duration-150 hover:text-accent-foreground ${isActive ? "text-foreground" : "text-muted-foreground"}`}
                  href={item.href as any}
                  key={item.name}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-[10px]">{item.name}</span>
                </Link>
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
