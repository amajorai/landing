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
      {features.map((feature, index) => {
        const Icon = iconMap[feature.icon] ?? Star;
        return (
          <div
            className="relative flex h-48 flex-col justify-between rounded-xl bg-muted/50 p-4 backdrop-blur-sm transition-all duration-200 hover:bg-muted/70"
            key={index}
          >
            <div>
              <h3 className="mb-1 flex flex-row justify-between font-semibold text-foreground text-lg">
                {feature.title}
                <Icon className="inline-block h-4 text-muted-foreground" />
              </h3>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
