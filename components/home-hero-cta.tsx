import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HomeHeroCta() {
  return (
    <div className="mt-8 flex items-center gap-4">
      <Button asChild className="!py-0 !h-9 rounded-full px-4" size="lg">
        <a href="mailto:contact@amajor.ai">
          <span className="btn-label">Contact Us</span>
        </a>
      </Button>
      <a
        aria-label="X/Twitter"
        className="flex h-6 w-6 items-center justify-center text-muted-foreground opacity-50 grayscale transition-all hover:opacity-100"
        href="https://x.com/amajorhq"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image
          alt="X/Twitter"
          className="h-5 w-5 dark:invert"
          height={16}
          src="/logos/x.svg"
          width={16}
        />
      </a>
      <a
        aria-label="LinkedIn"
        className="flex h-6 w-6 items-center justify-center text-muted-foreground opacity-50 grayscale transition-all hover:opacity-100"
        href="https://www.linkedin.com/company/amajor"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image
          alt="LinkedIn"
          className="h-5 w-5 dark:invert"
          height={16}
          src="/logos/linkedin.svg"
          width={16}
        />
      </a>
    </div>
  );
}
