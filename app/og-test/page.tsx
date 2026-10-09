import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OGTestPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-6 font-bold text-3xl">OG Image Test</h1>
      <p className="mb-8">OG images are generated when the site is built.</p>
      <div className="grid gap-8">
        {[
          { title: "Default OG Image", url: "/og/index.png" },
          { title: "Agency OG Image", url: "/og/agency.png" },
        ].map((image) => (
          <div key={image.url}>
            <h2 className="mb-4 font-semibold text-xl">{image.title}</h2>
            <div className="relative mb-4 aspect-[1200/630] w-full max-w-3xl overflow-hidden rounded-lg border border-gray-200">
              <Image
                alt={image.title}
                className="object-cover"
                fill
                src={image.url}
              />
            </div>
            <Button asChild>
              <a href={image.url} rel="noopener noreferrer" target="_blank">
                View Full Size
              </a>
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
