import Image from "next/image";

interface CompareLogoProps {
  alt: string;
  logo: string;
  logoDark?: string | null;
  size?: number;
  className?: string;
}

export function CompareLogo({
  alt,
  logo,
  logoDark,
  size = 20,
  className = "",
}: CompareLogoProps) {
  const hasDark = !!logoDark && logoDark !== logo;

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        alt={alt}
        className={`max-h-full max-w-full object-contain${hasDark ? "dark:hidden" : ""}`}
        height={size}
        src={logo}
        width={size}
      />
      {hasDark && (
        <Image
          alt={alt}
          className="hidden max-h-full max-w-full object-contain dark:block"
          height={size}
          src={logoDark!}
          width={size}
        />
      )}
    </span>
  );
}
