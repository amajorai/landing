"use client";

import { format } from "date-fns";
import { LoaderIcon } from "lucide-react";
import { use } from "react";
import type { Activity } from "@/components/contribution-graph";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
  GREEN_COLORS,
} from "@/components/contribution-graph";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function GitHubContributions({
  contributions,
  githubProfileUrl,
}: {
  contributions: Promise<Activity[]>;
  githubProfileUrl: string;
}) {
  const data = use(contributions);

  return (
    <ContributionGraph
      blockMargin={3}
      blockRadius={2}
      blockSize={11}
      className="w-full py-2"
      colors={GREEN_COLORS}
      data={data}
    >
      <ContributionGraphCalendar
        className="no-scrollbar px-6"
        title="GitHub Contributions"
      >
        {({ activity, dayIndex, weekIndex }) => (
          <Tooltip>
            <TooltipTrigger asChild>
              <g>
                <ContributionGraphBlock
                  activity={activity}
                  dayIndex={dayIndex}
                  weekIndex={weekIndex}
                />
              </g>
            </TooltipTrigger>
            <TooltipContent className="font-sans">
              <p>
                {activity.count} contribution{activity.count > 1 ? "s" : null}{" "}
                on {format(new Date(activity.date), "dd.MM.yyyy")}
              </p>
            </TooltipContent>
          </Tooltip>
        )}
      </ContributionGraphCalendar>

      <ContributionGraphFooter className="px-6">
        <ContributionGraphTotalCount>
          {({ totalCount, year }) => (
            <div className="text-muted-foreground">
              {totalCount.toLocaleString("en")} contributions in {year} on{" "}
              <a
                className="link-underline text-foreground"
                href={githubProfileUrl}
                rel="noopener"
                target="_blank"
              >
                GitHub
              </a>
              .
            </div>
          )}
        </ContributionGraphTotalCount>

        <ContributionGraphLegend />
      </ContributionGraphFooter>
    </ContributionGraph>
  );
}

export function GitHubContributionsFallback() {
  return (
    <div className="flex h-40.5 w-full items-center justify-center">
      <LoaderIcon className="animate-spin text-muted-foreground" />
    </div>
  );
}
