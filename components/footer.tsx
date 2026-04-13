import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { FadeIn } from "@/components/ui/fade-in";

const links = [
  { title: "manifesto", href: "/manifesto" },
  { title: "about", href: "/about" },
  { title: "brand story", href: "/story" },
];

export default function FooterSection() {
  return (
    <footer className="border-border border-t border-dashed bg-background pt-10 pb-16 md:pt-14 md:pb-20">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn duration={0.4}>
          <Link
            aria-label="go home"
            className="mx-auto block size-fit"
            href="/"
          >
            <Logo />
          </Link>
        </FadeIn>

        <FadeIn delay={0.1} duration={0.4}>
          <div className="my-8 flex flex-col flex-wrap items-center justify-center gap-4 text-sm sm:flex-row md:gap-6">
            {links.map((link, index) => (
              <>
                {link.href.startsWith("/") ? (
                  <Link
                    className="block px-2 py-1 text-center text-muted-foreground duration-150 hover:text-primary"
                    href={link.href as any}
                    key={index}
                  >
                    <span>{link.title}</span>
                  </Link>
                ) : (
                  <a
                    className="block px-2 py-1 text-center text-muted-foreground duration-150 hover:text-primary"
                    href={link.href}
                    key={index}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>{link.title}</span>
                  </a>
                )}
              </>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.2} duration={0.4}>
          <div className="my-8 flex flex-row flex-wrap items-center justify-center gap-6 md:gap-10">
            <a
              aria-label="X/Twitter"
              className="flex h-6 w-6 items-center justify-center text-center text-muted-foreground hover:text-primary"
              href="https://x.com/amajorai"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                alt="X/Twitter - Follow A Major"
                className="h-5 w-5 opacity-50 grayscale transition-colors duration-300 hover:opacity-100 dark:invert"
                height={16}
                src="/logos/x.svg"
                width={16}
              />
            </a>
            <a
              aria-label="LinkedIn"
              className="flex h-6 w-6 items-center justify-center text-center text-muted-foreground hover:text-primary"
              href="https://www.linkedin.com/company/amajor"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                alt="LinkedIn - Connect with A Major"
                className="h-5 w-5 opacity-50 grayscale transition-colors duration-300 hover:opacity-100 dark:invert"
                height={16}
                src="/logos/linkedin.svg"
                width={16}
              />
            </a>
            {/* <a
              aria-label="Threads"
              className="flex h-6 w-6 items-center justify-center text-center text-muted-foreground hover:text-primary"
              href="https://www.threads.net/@j14.wei"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                alt="Threads - Follow A Major Updates"
                className="h-5 w-5 opacity-50 grayscale transition-colors duration-300 hover:opacity-100 dark:invert"
                height={16}
                src="/logos/threads.svg"
                width={16}
              />
            </a>
            <a
              aria-label="Instagram"
              className="flex h-6 w-6 items-center justify-center text-center text-muted-foreground hover:text-primary"
              href="https://instagram.com/base7llp"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                alt="Instagram - Follow A Major"
                className="h-5 w-5 opacity-50 grayscale transition-colors duration-300 hover:opacity-100 dark:invert"
                height={16}
                src="/logos/instagram.svg"
                width={16}
              />
            </a>
            <a
              aria-label="TikTok"
              className="flex h-6 w-6 items-center justify-center text-center text-muted-foreground hover:text-primary"
              href="https://www.tiktok.com/@j14.wei"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                alt="TikTok - Follow A Major"
                className="h-5 w-5 opacity-50 grayscale transition-colors duration-300 hover:opacity-100 dark:invert"
                height={16}
                src="/logos/tiktok.svg"
                width={16}
              />
            </a>
            <a
              aria-label="YouTube"
              className="flex h-6 w-6 items-center justify-center text-center text-muted-foreground hover:text-primary"
              href="https://www.youtube.com/@j14wei"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                alt="YouTube - Watch A Major Videos"
                className="h-5 w-5 opacity-50 grayscale transition-colors duration-300 hover:opacity-100 dark:invert"
                height={16}
                src="/logos/youtube.svg"
                width={16}
              />
            </a> */}
          </div>
        </FadeIn>
        <div className="mt-8 mb-4 px-4 text-center text-muted-foreground text-sm">
          <span itemScope itemType="http://schema.org/Organization">
            © {new Date().getFullYear()}{" "}
            <span itemProp="name">A Major Pte. Ltd.</span>,{" "}
            <span itemProp="location">Singapore</span>. <br />
            (UEN: <span itemProp="taxID">202616096G</span>)
            <meta content="2025-01-01" itemProp="foundingDate" />
            <meta content="https://amajor.ai" itemProp="url" />
            <meta
              content="A Major is a Singapore-based software company specialising in web design, software development, and digital solutions for businesses."
              itemProp="description"
            />
          </span>
        </div>
      </div>
    </footer>
  );
}
