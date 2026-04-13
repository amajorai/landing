import Link from "next/link";
import type { BlogPost } from "@/lib/notion";

type Author = BlogPost["authors"][number];

interface BlogAuthorProps {
  authors: Author[];
  avatarSize?: "small" | "medium" | "large";
}

const sizeClass = {
  small: "h-5 w-5",
  medium: "h-6 w-6",
  large: "h-24 w-24",
};

export function BlogAuthor({
  authors,
  avatarSize = "medium",
}: BlogAuthorProps) {
  if (!authors || authors.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      {authors[0].avatar && (
        <img
          alt={authors[0].name}
          className={`${sizeClass[avatarSize]} rounded-full object-cover`}
          src={authors[0].avatar}
        />
      )}
      <span className="font-medium text-foreground">
        {authors.map((author, i) => (
          <span key={author.slug}>
            {i > 0 && ", "}
            <Link
              className="hover:underline"
              href={`/blog/author/${author.slug}` as any}
            >
              {author.name}
            </Link>
          </span>
        ))}
      </span>
    </div>
  );
}
