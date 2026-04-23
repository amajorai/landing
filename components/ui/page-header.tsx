interface PageHeaderProps {
  line1: string;
  line2?: string;
  eyebrow?: string;
  className?: string;
  tag?: React.ReactNode;
  line2Tag?: React.ReactNode;
  size?: "xl" | "2xl";
  as?: "h1" | "h2" | "div";
}

const sizeClass = { xl: "text-xl", "2xl": "text-2xl" } as const;

export function PageHeader({
  line1,
  line2,
  eyebrow,
  className,
  tag,
  line2Tag,
  size = "2xl",
  as: Tag = "h1",
}: PageHeaderProps) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className="mb-3 font-mono text-muted-foreground text-xs uppercase tracking-wider">
          {eyebrow}
        </p>
      )}
      <Tag className={`font-medium ${sizeClass[size]} tracking-tighter`}>
        <span
          className={`text-foreground${tag ? "flex items-center gap-2" : ""}`}
        >
          {line1}
          {tag}
        </span>
        {(line2 || line2Tag) && (
          <span
            className={`text-muted-foreground${line2Tag ? "flex items-center gap-2" : "block"}`}
          >
            {line2}
            {line2Tag}
          </span>
        )}
      </Tag>
    </div>
  );
}
