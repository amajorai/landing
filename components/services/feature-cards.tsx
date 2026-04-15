import {
  Accessibility,
  BarChart2,
  Blocks,
  BookOpen,
  Brain,
  CloudUpload,
  Code2,
  Component,
  Cpu,
  Database,
  FileCode2,
  FileText,
  FlaskConical,
  Gauge,
  GitBranch,
  Globe,
  History,
  Keyboard,
  Layers,
  Layout,
  Link,
  type LucideIcon,
  MessageSquare,
  Monitor,
  Moon,
  MousePointerClick,
  Network,
  Package,
  Paintbrush,
  PenTool,
  Play,
  Puzzle,
  Radio,
  RefreshCw,
  Route,
  Search,
  Server,
  Shield,
  ShoppingCart,
  Smartphone,
  SquareDashedBottom,
  Star,
  Terminal,
  Timer,
  Wand2,
  Workflow,
  Zap,
} from "lucide-react";
import type { ServiceFeature } from "@/lib/services-config";

const iconMap: Record<string, LucideIcon> = {
  Accessibility,
  BarChart2,
  Blocks,
  BookOpen,
  Brain,
  CloudUpload,
  Code2,
  Component,
  Cpu,
  Database,
  FileCode2,
  FileText,
  FlaskConical,
  Gauge,
  GitBranch,
  Globe,
  History,
  Keyboard,
  Layers,
  Layout,
  Link,
  MessageSquare,
  Monitor,
  Moon,
  MousePointerClick,
  Network,
  Package,
  Paintbrush,
  PenTool,
  Play,
  Puzzle,
  Radio,
  RefreshCw,
  Route,
  Search,
  Server,
  Shield,
  ShoppingCart,
  Smartphone,
  SquareDashedBottom,
  Terminal,
  Timer,
  Wand2,
  Workflow,
  Zap,
};

interface FeatureCardsProps {
  features: ServiceFeature[];
}

export function FeatureCards({ features }: FeatureCardsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => {
        const Icon = iconMap[feature.icon] ?? Star;
        return (
          <div className="rounded-lg bg-muted/50 p-4" key={feature.title}>
            <Icon className="mb-4 h-5 w-5 text-muted-foreground" />
            <p className="mb-1.5 font-medium text-lg">{feature.title}</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
