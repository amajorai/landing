"use client";

import { format } from "date-fns";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { BlogPostHoverCard } from "@/components/blog/BlogPostHoverCard";
import { PostTags } from "@/components/blog/PostTags";
import { FadeIn } from "@/components/ui/fade-in";
import { Input } from "@/components/ui/input";
import type { BlogPost } from "@/lib/notion";
import { getTagColorClass } from "@/lib/tag-colors";

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

  // Extract all unique tags from posts with their colors
  const tagsWithColors = useMemo(() => {
    const tagMap = new Map<string, string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        if (post.tagColors?.[tag]) {
          tagMap.set(tag, post.tagColors[tag]);
        }
      });
    });
    return Array.from(tagMap.entries()).map(([name, color]) => ({
      name,
      color,
    }));
  }, [posts]);

  // Filter posts based on search and tags
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Tag filter
      if (selectedTags.length > 0) {
        const hasAllTags = selectedTags.every((tag) => post.tags.includes(tag));
        if (!hasAllTags) return false;
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
        return matchesTitle || matchesDescription || matchesTags;
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

  // Update search query in URL
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    const params = new URLSearchParams(searchParams);
    if (value.trim()) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Input */}
        <FadeIn delay={0}>
          <div className="relative">
            <Input
              className="border-0 bg-muted"
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search posts..."
              value={searchQuery}
            />
          </div>
        </FadeIn>

        {/* Tag Filters */}
        {tagsWithColors.length > 0 && (
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {tagsWithColors.map(({ name, color }) => (
                <button
                  className={`rounded-full px-3 py-1 text-sm transition-colors ${
                    selectedTags.includes(name) ? "bg-muted" : "hover:bg-muted"
                  }`}
                  key={name}
                  onClick={() => toggleTag(name)}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${getTagColorClass(name, color)}`}
                    />
                    <span>{name}</span>
                  </span>
                </button>
              ))}
            </div>
          </FadeIn>
        )}
      </div>

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
