interface FeaturesListProps {
  features: string[];
}

export function FeaturesList({ features }: FeaturesListProps) {
  return (
    <ul className="space-y-2.5">
      {features.map((feature) => (
        <li className="flex items-start gap-3" key={feature}>
          <span className="mt-1 flex h-3.5 w-3.5 shrink-0 items-center justify-center">
            {/* Plus/cross mark */}
            <span className="relative inline-block h-3 w-3">
              <span className="absolute top-1/2 right-0 left-0 h-px -translate-y-px bg-muted-foreground/60" />
              <span className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-px bg-muted-foreground/60" />
            </span>
          </span>
          <span className="text-muted-foreground text-sm leading-relaxed">
            {feature}
          </span>
        </li>
      ))}
    </ul>
  );
}
