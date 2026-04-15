import Link from "next/link";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import type { NavProduct } from "@/lib/notion";

interface ProductsNavContentProps {
  products: NavProduct[];
}

export function ProductsNavContent({ products }: ProductsNavContentProps) {
  if (!products.length) return null;

  return (
    <div className="w-[220px] p-3">
      <div className="space-y-0.5">
        {products.map((product) => (
          <NavigationMenuLink
            asChild
            className="flex-row items-center gap-2.5 p-0"
            key={product.id}
          >
            <Link
              className="flex items-start gap-3 rounded-sm px-2 py-2 transition-colors hover:bg-accent"
              href={(product.url || `/products/${product.slug}`) as any}
            >
              {product.emoji && (
                <span className="mt-0.5 text-base leading-none">
                  {product.emoji}
                </span>
              )}
              <div>
                <p className="font-medium text-sm leading-tight">
                  {product.name}
                </p>
                <p className="mt-0.5 text-muted-foreground text-xs leading-snug">
                  {product.description}
                </p>
              </div>
            </Link>
          </NavigationMenuLink>
        ))}
      </div>
    </div>
  );
}
