import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateProjectMetadata } from "@/lib/metadata";
import { getProject, getProjects } from "@/lib/notion";
import ProjectModalClient from "./project-modal-client";

interface ProjectModalProps {
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
}: ProjectModalProps): Promise<Metadata> {
  const { slug } = await params;
  const { project } = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return generateProjectMetadata(project);
}

export default async function ProjectModal({ params }: ProjectModalProps) {
  const { slug } = await params;
  const { project, blocks } = await getProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectModalClient blocks={blocks} project={project} />;
}
