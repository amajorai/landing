interface PageHeaderProps {
  line1: string;
  line2: string;
  eyebrow?: string;
  className?: string;
  tag?: React.ReactNode;
}

export function PageHeader({
  line1,
  line2,
  eyebrow,
  className,
  tag,
}: PageHeaderProps) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className="mb-3 font-mono text-muted-foreground text-xs uppercase tracking-wider">
          {eyebrow}
        </p>
      )}
      <h1 className="font-semibold text-2xl tracking-tighter">
        <span className="text-foreground">{line1}</span>
        {tag && <> {tag}</>}
        <span className="block text-muted-foreground">{line2}</span>
      </h1>
    </div>
  );
}
