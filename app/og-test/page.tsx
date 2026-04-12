import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OGTestPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-6 font-bold text-3xl">OG Image Test</h1>

      <div className="grid gap-8">
        <div>
          <h2 className="mb-4 font-semibold text-xl">Default OG Image</h2>
          <div className="relative mb-4 aspect-[1200/630] w-full max-w-3xl overflow-hidden rounded-lg border border-gray-200">
            <Image
              alt="Default OG Image"
              className="object-cover"
              fill
              src="/api/og"
            />
          </div>
          <Button asChild>
            <Link href="/api/og" target="_blank">
              View Full Size
            </Link>
          </Button>
        </div>

        <div>
          <h2 className="mb-4 font-semibold text-xl">Custom Title OG Image</h2>
          <div className="relative mb-4 aspect-[1200/630] w-full max-w-3xl overflow-hidden rounded-lg border border-gray-200">
            <Image
              alt="Custom Title OG Image"
              className="object-cover"
              fill
              src="/api/og?title=Custom%20Title%20Example"
            />
          </div>
          <Button asChild>
            <Link href="/api/og?title=Custom%20Title%20Example" target="_blank">
              View Full Size
            </Link>
          </Button>
        </div>

        <div>
          <h2 className="mb-4 font-semibold text-xl">
            Fully Customized OG Image
          </h2>
          <div className="relative mb-4 aspect-[1200/630] w-full max-w-3xl overflow-hidden rounded-lg border border-gray-200">
            <Image
              alt="Fully Customized OG Image"
              className="object-cover"
              fill
              src="/api/og?title=Fully%20Customized%20Example&subtitle=with%20custom%20subtitle&tagline=This%20is%20a%20custom%20tagline%20for%20testing"
            />
          </div>
          <Button asChild>
            <Link
              href="/api/og?title=Fully%20Customized%20Example&subtitle=with%20custom%20subtitle&tagline=This%20is%20a%20custom%20tagline%20for%20testing"
              target="_blank"
            >
              View Full Size
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
