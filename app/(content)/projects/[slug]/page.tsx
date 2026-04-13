import { ChevronLeft, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NotionRenderer } from "@/components/markdown-renderer";
import ProjectGallery from "@/components/project-gallery";
import { FadeIn } from "@/components/ui/fade-in";
import { generateProjectMetadata } from "@/lib/metadata";
import {
  extractDescriptionFromBlocks,
  getProject,
  getProjects,
} from "@/lib/notion";

export const revalidate = 60; // Revalidate every minute

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { project, blocks } = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const description =
    project.description || extractDescriptionFromBlocks(blocks);
  return generateProjectMetadata({ ...project, description });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const { project, blocks } = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <article>
      <div className="space-y-8">
        {/* Title and Date */}
        <FadeIn>
          <Link
            className="mb-4 inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
            href="/"
          >
            <ChevronLeft className="h-4 w-4" />
            back to home
          </Link>
        </FadeIn>
        <div className="space-y-4">
          <FadeIn delay={0.1}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="font-medium text-3xl tracking-tight md:text-4xl">
                  {project.title}
                </h1>
                <span className="text-muted-foreground">{project.year}</span>
              </div>
            </div>
          </FadeIn>

          {/* Description */}
          <FadeIn delay={0.2}>
            <div className="text-foreground/90 leading-relaxed">
              {project.description}
            </div>
          </FadeIn>
        </div>
        <div className="flex flex-row items-center justify-between">
          {/* Links */}
          <FadeIn delay={0.45}>
            <div className="flex items-center gap-4 pt-2">
              {project.url && (
                <a
                  className="inline-flex items-center gap-2 font-medium text-primary text-sm hover:underline"
                  href={project.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <ExternalLink className="h-4 w-4" />
                  Website
                </a>
              )}

              {project.github && (
                <a
                  className="inline-flex items-center gap-2 font-medium text-primary text-sm hover:underline"
                  href={project.github}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <ExternalLink className="h-4 w-4" />
                  GitHub
                </a>
              )}
            </div>
          </FadeIn>

          {/* Technologies */}
          {project.techStack && project.techStack.length > 0 && (
            <FadeIn delay={0.4}>
              <div className="space-y-4 pt-4">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      className="inline-flex items-center rounded-full bg-secondary px-3 py-1 font-medium text-secondary-foreground text-sm"
                      key={tech}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}
        </div>

        {/* Header Image & Gallery */}
        {(project.cover ||
          (project.screenshots && project.screenshots.length > 0)) && (
          <FadeIn delay={0.3}>
            <ProjectGallery
              images={[project.cover, ...(project.screenshots || [])].filter(
                (img): img is string => !!img
              )}
            />
          </FadeIn>
        )}
        {/* Markdown Content */}
        {blocks && blocks.length > 0 && (
          <FadeIn delay={0.5}>
            <div className="mt-12">
              <NotionRenderer blocks={blocks} />
            </div>
          </FadeIn>
        )}
      </div>
    </article>
  );
}
