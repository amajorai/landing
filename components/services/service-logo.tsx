import {
  ArrowRightLeft,
  BookOpen,
  Building2,
  CloudUpload,
  Component,
  Cpu,
  Database,
  FileBox,
  Gauge,
  Globe,
  Lightbulb,
  type LucideIcon,
  MessageCircle,
  Monitor,
  Network,
  Palette,
  Puzzle,
  RefreshCw,
  Rocket,
  Search,
  Server,
  Smartphone,
  Star,
  Terminal,
  Upload,
} from "lucide-react";
import Image from "next/image";
import type { ServiceConfig } from "@/lib/services-config";

const lucideMap: Record<string, LucideIcon> = {
  ArrowRightLeft,
  BookOpen,
  Building2,
  CloudUpload,
  Component,
  Cpu,
  Database,
  Figma: Palette,
  FileBox,
  Gauge,
  Globe,
  Lightbulb,
  MessageCircle,
  Monitor,
  Network,
  Palette,
  Puzzle,
  RefreshCw,
  Rocket,
  Search,
  Server,
  Smartphone,
  Star,
  Terminal,
  Upload,
};

interface ServiceLogoProps {
  service: ServiceConfig;
  size?: number; // px, default 16
  className?: string;
}

export function ServiceLogo({
  service,
  size = 16,
  className = "",
}: ServiceLogoProps) {
  if (service.logo) {
    const hasDark = !!service.logoDark && service.logoDark !== service.logo;
    const invertDark = !hasDark && service.logoDarkInvert;
    return (
      <span
        className={`relative shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        <Image
          alt={service.name}
          className={`object-contain${hasDark ? "dark:hidden" : ""}${invertDark ? "dark:invert" : ""}`}
          height={size}
          src={service.logo}
          width={size}
        />
        {hasDark && (
          <Image
            alt={service.name}
            className="hidden object-contain dark:block"
            height={size}
            src={service.logoDark!}
            width={size}
          />
        )}
      </span>
    );
  }

  // Same logo for light and dark (e.g. react-router — both point to same file)
  if (service.logoDark) {
    return (
      <span
        className={`relative shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        <Image
          alt={service.name}
          className="object-contain"
          height={size}
          src={service.logoDark}
          width={size}
        />
      </span>
    );
  }

  if (service.lucideIcon) {
    const Icon = lucideMap[service.lucideIcon] ?? Star;
    return (
      <Icon
        className={`shrink-0 text-muted-foreground ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      className={`shrink-0 rounded-sm bg-muted-foreground/20 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
