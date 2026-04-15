import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/ui/fade-in";
import { PageHeader } from "@/components/ui/page-header";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { getNavProducts } from "@/lib/notion";

export const revalidate = 1800;

export const metadata = genMeta({
  title: "Products",
  description:
    "Software products built by A Major — including Ryu App and more coming soon.",
  url: "/products",
});

export default async function ProductsPage() {
  const products = await getNavProducts();

  if (!products.length) {
    notFound();
  }

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
          {products.map((product) => {
            const isExternal = !!product.url;
            const href = product.url || `/projects/${product.slug}`;

            return (
              <div
                className="group border-border border-r border-b border-dashed p-6 transition-colors hover:bg-muted/30"
                key={product.id}
              >
                {product.status && (
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 font-medium text-[10px] uppercase tracking-wider ${
                        product.status.toLowerCase() === "live"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-amber-500/10 text-amber-500"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
                )}
                <h2 className="mb-1 font-semibold text-xl">{product.name}</h2>
                {product.tagline && (
                  <p className="mb-2 text-muted-foreground text-sm">
                    {product.tagline}
                  </p>
                )}
                {product.description && (
                  <p className="mb-4 text-muted-foreground text-sm leading-relaxed">
                    {product.description}
                  </p>
                )}
                {isExternal ? (
                  <a
                    className="inline-flex items-center gap-1.5 font-medium text-sm transition-colors hover:text-foreground"
                    href={href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    View product
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <Link
                    className="inline-flex items-center gap-1.5 font-medium text-sm transition-colors hover:text-foreground"
                    href={href as any}
                  >
                    View project →
                  </Link>
                )}
              </div>
            );
          })}

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
