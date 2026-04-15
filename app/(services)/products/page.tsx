import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { PageHeader } from "@/components/ui/page-header";
import { generateMetadata as genMeta } from "@/lib/metadata";

export const metadata = genMeta({
  title: "Products",
  description:
    "Software products built by A Major — including Ryu App and more coming soon.",
  url: "/products",
});

const products = [
  {
    name: "Ryu App",
    tagline: "Training log for martial artists",
    description:
      "Track sessions, techniques, and sparring rounds across disciplines. Built for BJJ, Muay Thai, MMA, and more.",
    status: "live" as const,
    href: "/projects/ryu-app",
    external: false,
  },
];

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <FadeIn>
        <div className="mb-12 pt-4">
          <PageHeader
            eyebrow="Products"
            line1="What we build for ourselves."
            line2="Products that scratch our own itch and grow into businesses."
          />
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 border-border border-t border-l border-dashed sm:grid-cols-2">
          {products.map((product) => (
            <div
              className="group border-border border-r border-b border-dashed p-6 transition-colors hover:bg-muted/30"
              key={product.name}
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 font-medium text-[10px] uppercase tracking-wider ${
                      product.status === "live"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-amber-500/10 text-amber-500"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
              </div>
              <h2 className="mb-1 font-semibold text-xl">{product.name}</h2>
              <p className="mb-2 text-muted-foreground text-sm">
                {product.tagline}
              </p>
              <p className="mb-4 text-muted-foreground text-sm leading-relaxed">
                {product.description}
              </p>
              {product.external ? (
                <a
                  className="inline-flex items-center gap-1.5 font-medium text-sm transition-colors hover:text-foreground"
                  href={product.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  View product
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : (
                <Link
                  className="inline-flex items-center gap-1.5 font-medium text-sm transition-colors hover:text-foreground"
                  href={product.href as any}
                >
                  View project →
                </Link>
              )}
            </div>
          ))}

          {/* Placeholder */}
          <div className="flex items-center justify-center border-border border-r border-b border-dashed p-6 text-center">
            <div>
              <p className="font-medium text-muted-foreground text-sm">
                More products in the works
              </p>
              <p className="mt-1 text-muted-foreground text-xs">
                Follow us for updates
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
