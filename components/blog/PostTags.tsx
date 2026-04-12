import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getTagColorClass } from "@/lib/tag-colors";

export function PostTags({
  tags,
  tagColors,
}: {
  tags: string[];
  tagColors?: Record<string, string>;
}) {
  if (!tags.length) return null;
  return (
    <div className="flex gap-1">
      {tags.map((tag, index) => (
        <Tooltip key={`${tag}-${index}`}>
          <TooltipTrigger asChild>
            <span
              className={`h-2 w-2 rounded-full ${getTagColorClass(tag, tagColors?.[tag])}`}
            />
          </TooltipTrigger>
          <TooltipContent>{tag}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
