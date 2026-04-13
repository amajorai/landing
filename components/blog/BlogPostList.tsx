"use client";

import { format } from "date-fns";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { BlogPostHoverCard } from "@/components/blog/BlogPostHoverCard";
import { PostTags } from "@/components/blog/PostTags";
import { FadeIn } from "@/components/ui/fade-in";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import type { BlogPost } from "@/lib/notion";
import { getTagColorClass } from "@/lib/tag-colors";
import { cn } from "@/lib/utils";

interface BlogPostListProps {
  posts: BlogPost[];
}

export function BlogPostList({ posts }: BlogPostListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  // Get selected tags from URL
  const selectedTags = useMemo(() => {
    const tags = searchParams.get("tags");
    return tags ? tags.split(",") : [];
  }, [searchParams]);

  // All unique tags sorted alphabetically
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    for (const post of posts) {
      for (const tag of post.tags ?? []) {
        tags.add(tag);
      }
    }
    return [...tags].sort((a, b) => a.localeCompare(b));
  }, [posts]);

  // Tag name -> notion color
  const tagColors = useMemo(() => {
    const colorMap: Record<string, string> = {};
    for (const post of posts) {
      for (const tag of post.tags ?? []) {
        if (post.tagColors?.[tag] && !colorMap[tag]) {
          colorMap[tag] = post.tagColors[tag];
        }
      }
    }
    return colorMap;
  }, [posts]);

  // Filter posts based on search and tags
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Tag filter
      if (selectedTags.length > 0) {
        const hasAnyTag = selectedTags.some((tag) => post.tags.includes(tag));
        if (!hasAnyTag) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesDescription = post.description
          .toLowerCase()
          .includes(query);
        const matchesTags = post.tags.some((tag) =>
          tag.toLowerCase().includes(query)
        );
        const matchesAuthor = post.authors?.some((a) =>
          a.name.toLowerCase().includes(query)
        );
        return (
          matchesTitle || matchesDescription || matchesTags || matchesAuthor
        );
      }

      return true;
    });
  }, [posts, selectedTags, searchQuery]);

  // Group filtered posts by month
  const groupedPosts = useMemo(() => {
    const groups: { label: string; posts: BlogPost[] }[] = [];
    for (const post of filteredPosts) {
      const label = post.date
        ? format(new Date(post.date), "MMM yyyy")
        : "Unknown";
      const existing = groups.find((g) => g.label === label);
      if (existing) {
        existing.posts.push(post);
      } else {
        groups.push({ label, posts: [post] });
      }
    }
    return groups;
  }, [filteredPosts]);

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    const params = new URLSearchParams(searchParams);
    if (newTags.length > 0) {
      params.set("tags", newTags.join(","));
    } else {
      params.delete("tags");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Update search query in URL (debounced)
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (value.trim()) {
        params.set("q", value);
      } else {
        params.delete("q");
      }
      router.push(`?${params.toString()}`, { scroll: false });
    }, 300);
  };

  return (
    <div className="space-y-6">
      {/* Tag Filters — rendered first so search overlaps via z-index */}
      {allTags.length > 0 && (
        <FadeIn delay={0}>
          <div className="relative z-0 mx-2 -mb-6 flex flex-wrap justify-center rounded-xl rounded-b-none bg-muted/50 px-1 py-2">
            {allTags.map((tag) => (
              <Toggle
                aria-label={`Filter by ${tag}`}
                className="h-7 gap-1.5 border-0 px-2 text-foreground text-xs shadow-none hover:text-current"
                key={tag}
                onPressedChange={() => toggleTag(tag)}
                pressed={selectedTags.includes(tag)}
                size="sm"
                variant="default"
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    getTagColorClass(tag, tagColors[tag])
                  )}
                />
                <span className="capitalize">{tag}</span>
              </Toggle>
            ))}
          </div>
        </FadeIn>
      )}

      {/* Search Input — sits on top of tags card */}
      <FadeIn delay={0.05}>
        <Input
          className="!bg-muted relative z-10 h-12 border-0 shadow-none"
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search"
          value={searchQuery}
        />
      </FadeIn>

      {/* Posts List */}
      {groupedPosts.length === 0 ? (
        !searchQuery &&
        selectedTags.length === 0 && (
          <p className="text-muted-foreground text-sm">No posts found.</p>
        )
      ) : (
        <div className="space-y-6 text-sm leading-relaxed">
          {groupedPosts.map((group, groupIndex) => (
            <FadeIn delay={0.2 + groupIndex * 0.1} key={group.label}>
              <div>
                <p className="mb-2 font-medium text-muted-foreground">
                  {group.label}
                </p>
                <div className="grid gap-1 space-y-1">
                  {group.posts.map((post) => (
                    <article
                      className="group relative flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
                      key={post.id}
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        {post.date && (
                          <time
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded border font-medium text-xs tabular-nums"
                            dateTime={post.date}
                          >
                            {format(new Date(post.date), "d")}
                          </time>
                        )}
                        <BlogPostHoverCard slug={post.slug}>
                          <Link
                            className="min-w-0 truncate font-medium text-foreground hover:underline"
                            href={`/blog/${post.slug}`}
                          >
                            {post.title}
                          </Link>
                        </BlogPostHoverCard>
                        <PostTags tagColors={post.tagColors} tags={post.tags} />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
