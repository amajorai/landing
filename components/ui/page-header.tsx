interface PageHeaderProps {
  line1: string;
  line2: string;
  eyebrow?: string;
  className?: string;
}

export function PageHeader({
  line1,
  line2,
  eyebrow,
  className,
}: PageHeaderProps) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className="mb-3 font-mono text-muted-foreground text-xs uppercase tracking-wider">
          {eyebrow}
        </p>
      )}
      <h1 className="font-semibold text-3xl tracking-tighter lg:text-4xl">
        <span className="block text-foreground">{line1}</span>
        <span className="block text-muted-foreground">{line2}</span>
      </h1>
    </div>
  );
}
