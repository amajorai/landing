import Link from "next/link";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

const products = [
  {
    name: "Ryu App",
    description: "Training log for martial artists",
    href: "/projects/ryu-app",
    emoji: "🥋",
  },
];

export function ProductsNavContent() {
  return (
    <div className="w-[220px] p-3">
      <div className="space-y-0.5">
        {products.map((product) => (
          <NavigationMenuLink
            asChild
            className="flex-row items-center gap-2.5 p-0"
            key={product.name}
          >
            <Link
              className="flex items-start gap-3 rounded-sm px-2 py-2 transition-colors hover:bg-accent"
              href={product.href as any}
            >
              <span className="mt-0.5 text-base leading-none">
                {product.emoji}
              </span>
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

      <div className="mt-3 border-border border-t pt-2">
        <NavigationMenuLink asChild className="flex-row items-center gap-0 p-0">
          <Link
            className="block rounded-sm px-2 py-1.5 text-muted-foreground text-xs transition-colors hover:bg-accent hover:text-accent-foreground"
            href={"/products" as any}
          >
            View all products →
          </Link>
        </NavigationMenuLink>
      </div>
    </div>
  );
}
