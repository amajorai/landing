"use client";

import { getCalApi } from "@calcom/embed-react";
import {
  AtSign,
  BookOpen,
  Briefcase,
  CalendarDays,
  Code2,
  FileText,
  Globe,
  Info,
  Layers,
  Mail,
  Monitor,
  Moon,
  Package,
  Plus,
  Sun,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { ScrollFadeEffect } from "@/components/scroll-fade-effect";
import { ServiceLogo } from "@/components/services/service-logo";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { offeringsConfig } from "@/lib/offerings-config";
import { servicesConfig } from "@/lib/services-config";

interface SearchableBlogPost {
  slug: string;
  title: string;
  description: string;
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PAGES = [
  { name: "Home", href: "/", icon: Globe, description: "Return to homepage" },
  {
    name: "Blog",
    href: "/blog",
    icon: BookOpen,
    description: "Articles and insights",
  },
  {
    name: "Services",
    href: "/services",
    icon: Layers,
    description: "Everything we build",
  },
  {
    name: "Products",
    href: "/products",
    icon: Package,
    description: "Our products",
  },
  { name: "About", href: "/about", icon: Info, description: "Who we are" },
  {
    name: "Consultancy",
    href: "/consultancy",
    icon: FileText,
    description: "Get expert advice",
  },
  {
    name: "Manifesto",
    href: "/manifesto",
    icon: FileText,
    description: "What we believe",
  },
];

const ACTIONS = [
  {
    name: "Email Us",
    href: "mailto:contact@amajor.ai",
    icon: Mail,
    description: "contact@amajor.ai",
  },
];

const SOCIAL = [
  {
    name: "X / Twitter",
    href: "https://x.com/amajorai",
    icon: AtSign,
    description: "@amajorai",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/amajor",
    icon: Briefcase,
    description: "linkedin.com/company/amajor",
  },
  {
    name: "GitHub",
    href: "https://github.com/amajor",
    icon: Code2,
    description: "github.com/amajor",
  },
];

function searchFilter(value: string, search: string): number {
  if (!search.trim()) return 1;
  const v = value.toLowerCase();
  const s = search.toLowerCase().trim();
  if (v.includes(s)) return 1;
  const words = s.split(/\s+/);
  if (words.length > 1 && words.every((w) => v.includes(w))) return 0.8;
  let si = 0;
  for (let i = 0; i < v.length && si < s.length; i++) {
    if (v[i] === s[si]) si++;
  }
  return si === s.length ? 0.5 : 0;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [blogPosts, setBlogPosts] = useState<SearchableBlogPost[]>([]);
  const [hasFetchedPosts, setHasFetchedPosts] = useState(false);

  useEffect(() => {
    if (open && !hasFetchedPosts) {
      setHasFetchedPosts(true);
      fetch("/api/search/posts")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setBlogPosts(data);
        })
        .catch(() => {});
    }
  }, [open, hasFetchedPosts]);

  const navigate = useCallback(
    (href: string) => {
      onOpenChange(false);
      router.push(href as any);
    },
    [onOpenChange, router]
  );

  const openExternal = useCallback(
    (href: string) => {
      onOpenChange(false);
      window.open(href, "_blank", "noopener,noreferrer");
    },
    [onOpenChange]
  );

  const openBooking = useCallback(async () => {
    onOpenChange(false);
    const calTheme = (resolvedTheme as "dark" | "light") ?? "light";
    const cal = await getCalApi({ namespace: `amajor-${calTheme}` });
    cal("modal", {
      calLink: "jiaweing/amajor",
      config: { layout: "month_view", theme: calTheme },
    });
  }, [onOpenChange, resolvedTheme]);

  const runTheme = useCallback(
    (theme: string) => {
      setTheme(theme);
    },
    [setTheme]
  );

  return (
    <CommandDialog
      commandClassName="p-0"
      description="Search pages, services, tech stack, and blog posts"
      filter={searchFilter}
      onOpenChange={onOpenChange}
      open={open}
      title="Search"
    >
      <CommandInput placeholder="Search pages, services, blog posts..." />
      <CommandList className="relative z-10 -mt-4 max-h-none overflow-y-hidden rounded-2xl border-foreground/10 border-t border-b bg-popover bg-clip-padding [&_[cmdk-group-heading]]:px-4 [&_[cmdk-group]]:p-0 [&_[cmdk-item]]:rounded-none [&_[cmdk-item]]:px-4">
        <ScrollFadeEffect className="max-h-[min(60vh,420px)]">
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Pages">
            {PAGES.map((page) => {
              const Icon = page.icon;
              return (
                <CommandItem
                  className="gap-3 py-2"
                  key={page.href}
                  onSelect={() => navigate(page.href)}
                  value={`page ${page.name} ${page.description}`}
                >
                  <Icon className="size-4 shrink-0 text-muted-foreground" />
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate">{page.name}</span>
                    <span className="truncate text-muted-foreground text-xs">
                      {page.description}
                    </span>
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>

          <CommandGroup heading="Actions">
            <CommandItem
              className="gap-3 py-2"
              onSelect={() =>
                openExternal(
                  "https://www.notion.so/f9ac6e86fafa4ca28ed6c2af11d498cf?pvs=106"
                )
              }
              value="action new project start hire build"
            >
              <Plus className="size-4 shrink-0 text-muted-foreground" />
              <div className="flex min-w-0 flex-col">
                <span className="truncate">New Project</span>
                <span className="truncate text-muted-foreground text-xs">
                  Start something with us
                </span>
              </div>
              <CommandShortcut>⌃.</CommandShortcut>
            </CommandItem>
            <CommandItem
              className="gap-3 py-2"
              onSelect={openBooking}
              value="action book a call schedule meeting session"
            >
              <CalendarDays className="size-4 shrink-0 text-muted-foreground" />
              <div className="flex min-w-0 flex-col">
                <span className="truncate">Book a Call</span>
                <span className="truncate text-muted-foreground text-xs">
                  Schedule a session with us
                </span>
              </div>
              <CommandShortcut>⌃B</CommandShortcut>
            </CommandItem>
            {ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <CommandItem
                  className="gap-3 py-2"
                  key={action.href}
                  onSelect={() => openExternal(action.href)}
                  value={`action ${action.name} ${action.description}`}
                >
                  <Icon className="size-4 shrink-0 text-muted-foreground" />
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate">{action.name}</span>
                    <span className="truncate text-muted-foreground text-xs">
                      {action.description}
                    </span>
                  </div>
                  <CommandShortcut>⌃,</CommandShortcut>
                </CommandItem>
              );
            })}
          </CommandGroup>

          <CommandGroup heading="Social">
            {SOCIAL.map((link) => {
              const Icon = link.icon;
              return (
                <CommandItem
                  className="gap-3 py-2"
                  key={link.href}
                  onSelect={() => openExternal(link.href)}
                  value={`social ${link.name} ${link.description}`}
                >
                  <Icon className="size-4 shrink-0 text-muted-foreground" />
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate">{link.name}</span>
                    <span className="truncate text-muted-foreground text-xs">
                      {link.description}
                    </span>
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>

          <CommandGroup heading="Services">
            {offeringsConfig.map((offering) => (
              <CommandItem
                className="gap-3 py-2"
                key={offering.slug}
                onSelect={() => navigate(`/services/${offering.slug}`)}
                value={`service ${offering.name} ${offering.tagline} ${offering.category}`}
              >
                <ServiceLogo service={offering as any} size={16} />
                <div className="flex min-w-0 flex-col">
                  <span className="truncate">{offering.name}</span>
                  <span className="truncate text-muted-foreground text-xs">
                    {offering.tagline}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Tech Stack">
            {servicesConfig.map((service) => (
              <CommandItem
                className="gap-3 py-2"
                key={service.slug}
                onSelect={() => navigate(`/services/${service.slug}`)}
                value={`tech ${service.name} ${service.category} ${service.tagline}`}
              >
                <ServiceLogo service={service} size={16} />
                <div className="flex min-w-0 flex-col">
                  <span className="truncate">{service.name}</span>
                  <span className="truncate text-muted-foreground text-xs">
                    {service.tagline}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          {blogPosts.length > 0 && (
            <CommandGroup heading="Blog Posts">
              {blogPosts.map((post) => (
                <CommandItem
                  className="gap-3 py-2"
                  key={post.slug}
                  onSelect={() => navigate(`/blog/${post.slug}`)}
                  value={`blog ${post.title} ${post.description ?? ""}`}
                >
                  <BookOpen className="size-4 shrink-0 text-muted-foreground" />
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate">{post.title}</span>
                    {post.description && (
                      <span className="truncate text-muted-foreground text-xs">
                        {post.description}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          <CommandGroup heading="Preferences">
            <CommandItem
              className="gap-3 py-2"
              onSelect={() => runTheme("light")}
              value="theme light mode appearance"
            >
              <Sun className="size-4 shrink-0 text-muted-foreground" />
              <div className="flex min-w-0 flex-col">
                <span className="truncate">Light Mode</span>
                <span className="truncate text-muted-foreground text-xs">
                  Switch to light theme
                </span>
              </div>
            </CommandItem>
            <CommandItem
              className="gap-3 py-2"
              onSelect={() => runTheme("dark")}
              value="theme dark mode appearance"
            >
              <Moon className="size-4 shrink-0 text-muted-foreground" />
              <div className="flex min-w-0 flex-col">
                <span className="truncate">Dark Mode</span>
                <span className="truncate text-muted-foreground text-xs">
                  Switch to dark theme
                </span>
              </div>
            </CommandItem>
            <CommandItem
              className="gap-3 py-2"
              onSelect={() => runTheme("system")}
              value="theme system mode appearance auto"
            >
              <Monitor className="size-4 shrink-0 text-muted-foreground" />
              <div className="flex min-w-0 flex-col">
                <span className="truncate">System Theme</span>
                <span className="truncate text-muted-foreground text-xs">
                  Follow system preference
                </span>
              </div>
            </CommandItem>
          </CommandGroup>
        </ScrollFadeEffect>
      </CommandList>
      <div className="hidden items-center gap-4 px-4 py-2 text-muted-foreground sm:flex">
        <span className="flex items-center gap-1 text-muted-foreground text-xs">
          <kbd className="rounded bg-popover px-1 py-0.5 font-mono text-[10px]">
            ⌃B
          </kbd>
          Book a Call
        </span>
        <span className="flex items-center gap-1 text-muted-foreground text-xs">
          <kbd className="rounded bg-popover px-1 py-0.5 font-mono text-[10px]">
            ⌃.
          </kbd>
          New Project
        </span>
        <span className="flex items-center gap-1 text-muted-foreground text-xs">
          <kbd className="rounded bg-popover px-1 py-0.5 font-mono text-[10px]">
            ⌃,
          </kbd>
          Send Email
        </span>
      </div>
    </CommandDialog>
  );
}
