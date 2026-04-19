"use client";
import { getCalApi } from "@calcom/embed-react";
import {
  BookOpen,
  Home,
  Info,
  Layers,
  Package,
  Plus,
  Scale,
  Scroll,
  Search,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Logo } from "@/components/logo";
import { ProductsNavContent } from "@/components/products-nav-content";
import { ProgressiveBlur } from "@/components/progressive-blur";
import { CommandPalette } from "@/components/search/command-palette";
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
import type { NavProduct } from "@/lib/notion";

// Nav items for non-agency pages (home, products, blog, generic)
const generalNavItems = [
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Manifesto", href: "/manifesto" },
  {
    name: "Careers",
    href: "https://www.notion.so/42d020b872164c31aaae5aa30b2c30fc?pvs=106",
  },
];

// Agency-only additional items
const agencyExtraItems = [
  { name: "Services", href: "/services" },
  { name: "Compare", href: "/compare" },
];

// Desktop nav items rendered after the Products dropdown
const afterProductsItems: { name: string; href: string }[] = [];

interface HeaderProps {
  products?: NavProduct[];
}

export default function Header({ products = [] }: HeaderProps) {
  const hasProducts = products.length > 0;
  const pathname = usePathname();

  const isAgencyRealm =
    pathname.startsWith("/agency") ||
    pathname.startsWith("/services") ||
    pathname.startsWith("/compare");
  const isConsultancyRealm = pathname.startsWith("/consultancy");
  const isProductsRealm = pathname.startsWith("/products");

  const mobileNavItems = useMemo(() => {
    if (isConsultancyRealm) {
      return [
        { name: "Blog", href: "/blog", icon: BookOpen },
        { name: "Services", href: "/services", icon: Layers },
        { name: "Compare", href: "/compare", icon: Scale },
        { name: "About", href: "/about", icon: Info },
      ];
    }
    if (isAgencyRealm) {
      return [
        { name: "Blog", href: "/blog", icon: BookOpen },
        { name: "Services", href: "/services", icon: Layers },
        { name: "Compare", href: "/compare", icon: Scale },
        { name: "About", href: "/about", icon: Info },
      ];
    }
    if (isProductsRealm) {
      return [
        { name: "Blog", href: "/blog", icon: BookOpen },
        { name: "About", href: "/about", icon: Info },
        { name: "Manifesto", href: "/manifesto", icon: Scroll },
        {
          name: "Careers",
          href: "https://www.notion.so/42d020b872164c31aaae5aa30b2c30fc?pvs=106",
          icon: Users,
        },
        ...(hasProducts
          ? [{ name: "Products", href: "/products", icon: Package }]
          : []),
      ];
    }
    return [
      { name: "Blog", href: "/blog", icon: BookOpen },
      { name: "About", href: "/about", icon: Info },
      { name: "Manifesto", href: "/manifesto", icon: Scroll },
      {
        name: "Careers",
        href: "https://www.notion.so/42d020b872164c31aaae5aa30b2c30fc?pvs=106",
        icon: Users,
      },
    ];
  }, [isAgencyRealm, isConsultancyRealm, isProductsRealm, hasProducts]);
  const router = useRouter();
  const [scrollState, setScrollState] = useState({
    visible: true,
    prevScrollPos: 0,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <CommandPalette onOpenChange={setIsSearchOpen} open={isSearchOpen} />
      <header>
        <nav
          className={`fixed z-[46] w-full transition-transform duration-300 ${
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
          <div className="relative z-[46] m-auto px-6 py-2">
            <div className="relative flex items-center pt-6 pb-3 lg:py-4">
              {/* Mobile left: search button */}
              <button
                aria-label="Search"
                className="flex items-center text-muted-foreground duration-150 hover:text-foreground lg:hidden"
                onClick={() => setIsSearchOpen(true)}
                type="button"
              >
                <Search className="h-5 w-5" />
              </button>

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

              {/* Desktop: logo tab pills - left */}
              <div className="ml-2 hidden lg:flex">
                <FadeIn duration={0.4} viewOptions={{ margin: "0px" }}>
                  <div className="flex items-center gap-0.5 rounded-full bg-muted/30 p-0.5 text-xs">
                    <Link
                      aria-label="Home"
                      className={`flex items-center rounded-full px-2.5 py-1.5 transition-colors duration-150 ${
                        pathname === "/"
                          ? "bg-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      href="/"
                    >
                      <Image
                        alt="A Major"
                        className={`mt-0.5 h-3.5 w-3.5 ${pathname === "/" ? "invert dark:invert-0" : "dark:invert"}`}
                        height={14}
                        src="/logos/amajor-submark.svg"
                        width={14}
                      />
                    </Link>
                    <Link
                      className={`rounded-full px-3 py-1 font-medium transition-colors duration-150 ${
                        isProductsRealm
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      href="/products"
                    >
                      Products
                    </Link>
                    <Link
                      className={`rounded-full px-3 py-1 font-medium transition-colors duration-150 ${
                        isAgencyRealm
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      href="/agency"
                    >
                      Agency
                    </Link>
                    {/* <Link
                      className={`rounded-full px-3 py-1 font-medium transition-colors duration-150 ${
                        isConsultancyRealm
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      href="/consultancy"
                    >
                      Consultancy
                    </Link> */}
                  </div>
                </FadeIn>
              </div>

              {/* Desktop: nav links - centered */}
              <div className="absolute left-1/2 hidden -translate-x-1/2 lg:flex">
                <FadeIn duration={0.4} viewOptions={{ margin: "0px" }}>
                  <NavigationMenu
                    onValueChange={(value) => setIsMenuOpen(value !== "")}
                    viewport={false}
                  >
                    <NavigationMenuList className="gap-3 text-sm">
                      {isConsultancyRealm
                        ? [
                            ...generalNavItems.slice(0, 2),
                            ...agencyExtraItems,
                          ].map((item) => (
                            <NavigationMenuItem key={item.name}>
                              <Link
                                className="inline-flex h-auto items-center px-2 py-1 text-muted-foreground text-sm duration-150 hover:text-accent-foreground"
                                href={item.href as any}
                              >
                                {item.name}
                              </Link>
                            </NavigationMenuItem>
                          ))
                        : isAgencyRealm
                          ? [
                              ...generalNavItems.slice(0, 2),
                              ...agencyExtraItems,
                            ].map((item) => (
                              <NavigationMenuItem key={item.name}>
                                <Link
                                  className="inline-flex h-auto items-center px-2 py-1 text-muted-foreground text-sm duration-150 hover:text-accent-foreground"
                                  href={item.href as any}
                                >
                                  {item.name}
                                </Link>
                              </NavigationMenuItem>
                            ))
                          : generalNavItems.map((item) => (
                              <NavigationMenuItem key={item.name}>
                                <Link
                                  className="inline-flex h-auto items-center px-2 py-1 text-muted-foreground text-sm duration-150 hover:text-accent-foreground"
                                  href={item.href as any}
                                >
                                  {item.name}
                                </Link>
                              </NavigationMenuItem>
                            ))}

                      {hasProducts && (
                        <NavigationMenuItem>
                          <NavigationMenuTrigger
                            className="h-auto cursor-pointer bg-transparent px-2 py-1 text-muted-foreground text-sm hover:bg-transparent hover:text-accent-foreground data-[state=open]:bg-transparent data-[state=open]:text-accent-foreground"
                            onClick={(e) => {
                              e.preventDefault();
                              router.push("/products");
                            }}
                          >
                            Products
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ProductsNavContent products={products} />
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      )}

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

              {/* Desktop: realm selector - left */}

              {/* Desktop: New Project + theme toggle - right */}
              <div className="ml-auto flex items-center gap-3">
                {isAgencyRealm && (
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
                )}
                {isConsultancyRealm && (
                  <FadeIn duration={0.4} viewOptions={{ margin: "0px" }}>
                    <Button
                      className="h-8 rounded-full px-3 text-xs"
                      onClick={async () => {
                        const cal = await getCalApi({ namespace: "amajor" });
                        cal("modal", {
                          calLink: "jiaweing/amajor",
                          config: { layout: "month_view" },
                        });
                      }}
                      size="sm"
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      Book Session
                    </Button>
                  </FadeIn>
                )}
                <button
                  aria-label="Search (⌘K)"
                  className="hidden items-center text-muted-foreground duration-150 hover:text-foreground lg:flex"
                  onClick={() => setIsSearchOpen(true)}
                  type="button"
                >
                  <Search className="h-4 w-4" />
                </button>
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
          <div
            className={"relative grid items-center px-6 pt-3 pb-6"}
            style={{
              gridTemplateColumns: `repeat(${mobileNavItems.length + 1}, minmax(0, 1fr))`,
            }}
          >
            {/* Left items */}
            {mobileNavItems
              .slice(0, Math.ceil(mobileNavItems.length / 2))
              .map((item) => {
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

            {/* Center placeholder for floating Plus button */}
            <div aria-hidden="true" />

            {/* Right items */}
            {mobileNavItems
              .slice(Math.ceil(mobileNavItems.length / 2))
              .map((item) => {
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

            {/* Floating center button - plus (booking) on home, home icon elsewhere */}
            {pathname === "/" ? (
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
            ) : (
              <Link
                className="absolute top-0 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-background shadow-lg duration-150 active:scale-95"
                href="/"
              >
                <Home className="h-6 w-6" />
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
