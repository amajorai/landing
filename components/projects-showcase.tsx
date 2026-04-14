"use client";

import { ProjectCard } from "@/components/project-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { StarMark } from "@/components/ui/star-mark";
import type { Project } from "@/lib/notion";

interface ProjectsShowcaseProps {
  projects: Project[];
}

export default function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className="relative py-16" id="portfolio">
      <StarMark
        style={{ top: 0, left: 0, transform: "translate(-50%, -50%)" }}
      />
      <StarMark
        style={{ top: 0, right: 0, transform: "translate(50%, -50%)" }}
      />
      <StarMark
        style={{ bottom: 0, left: 0, transform: "translate(-50%, 50%)" }}
      />
      <StarMark
        style={{ bottom: 0, right: 0, transform: "translate(50%, 50%)" }}
      />
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
        <div className="relative z-10 flex flex-row">
          <h2 className="font-medium text-2xl tracking-tighter">our work</h2>
        </div>

        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {projects.map((project, index) => (
              <CarouselItem className="pl-4 md:basis-1/2" key={project.id}>
                <div className="h-full">
                  <ProjectCard index={index} project={project} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex items-center justify-end gap-2">
            <CarouselPrevious
              className="static translate-y-0 border-0 bg-transparent shadow-none"
              variant="ghost"
            />
            <CarouselNext
              className="static translate-y-0 border-0 bg-transparent shadow-none"
              variant="ghost"
            />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
