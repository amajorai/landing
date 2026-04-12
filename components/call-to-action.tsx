import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="py-20" id="contact">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="font-medium text-2xl tracking-tighter">
            Let's build something.
          </h2>
          <p className="mt-4">Software, digital platforms, or AI infrastructure. Reach out and let's talk.</p>

          <div className="mx-auto mt-10 max-w-sm lg:mt-12">
            <div className="relative grid grid-cols-[1fr_auto] items-center rounded-[calc(var(--radius)+0.75rem)] bg-background pr-3 has-[input:focus]:ring-muted">
              <div className="md:pr-1.5 lg:pr-0">
                <Link href="https://tally.so/r/wLoJKj">
                  <Button>Get in touch</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
