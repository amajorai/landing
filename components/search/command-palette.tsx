"use client";

import { BookOpen, FileText, Globe, Info, Layers, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ServiceLogo } from "@/components/services/service-logo";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
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
  {
    name: "About",
    href: "/about",
    icon: Info,
    description: "Who we are",
  },
  {
    name: "Consultancy",
    href: "/consultancy",
    icon: FileText,
    description: "Get expert advice",
  },
];

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
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

  return (
    <CommandDialog
      description="Search pages, services, tech stack, and blog posts"
      onOpenChange={onOpenChange}
      open={open}
      title="Search"
    >
      <CommandInput placeholder="Search pages, services, blog posts..." />
      <CommandList className="max-h-[min(60vh,420px)]">
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
                <span>{page.name}</span>
                <span className="ml-1 text-muted-foreground text-xs">
                  {page.description}
                </span>
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />

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

        <CommandSeparator />

        <CommandGroup heading="Tech Stack">
          {servicesConfig.map((service) => (
            <CommandItem
              className="gap-3"
              key={service.slug}
              onSelect={() => navigate(`/services/${service.slug}`)}
              value={`tech ${service.name} ${service.category} ${service.tagline}`}
            >
              <ServiceLogo service={service} size={16} />
              <span>{service.name}</span>
              <span className="ml-auto shrink-0 text-muted-foreground text-xs capitalize">
                {service.category}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        {blogPosts.length > 0 && (
          <>
            <CommandSeparator />
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
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
