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
      <a href="https://x.com/amajorhq" target="_blank" rel="noopener noreferrer" aria-label="X/Twitter" className="flex h-6 w-6 items-center justify-center text-muted-foreground opacity-50 grayscale transition-all hover:opacity-100">
        <Image alt="X/Twitter" src="/logos/x.svg" width={16} height={16} className="h-5 w-5 dark:invert" />
      </a>
      <a href="https://www.linkedin.com/company/amajor" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-6 w-6 items-center justify-center text-muted-foreground opacity-50 grayscale transition-all hover:opacity-100">
        <Image alt="LinkedIn" src="/logos/linkedin.svg" width={16} height={16} className="h-5 w-5 dark:invert" />
      </a>
    </div>
  );
}
