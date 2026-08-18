import { notFound } from "next/navigation";
import ProjectDetailView from "@/components/projects/ProjectDetailView/ProjectDetailView";
import CTABanner from "@/components/home/CTABanner/CTABanner";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/data/projects";
import { siteConfig } from "@/config/siteConfig";

// ISR: pages regenerate in the background at most once every 60 seconds
// when visited, so admin edits/new projects show up without a full redeploy.
export const revalidate = 60;

// Pre-builds a static page for every active project at build time —
// these load instantly instead of being rendered fresh on each request.
// Any project added after build still works fine: Next.js renders it
// on-demand on first visit, then caches it for subsequent visitors.
export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const description =
    project.solution || project.challenge || `${project.title} — a project by ${siteConfig.name}.`;

  return {
    title: project.title,
    description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/projects/${project.slug}`,
      images: [
        {
          url: project.thumbnail,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${siteConfig.name}`,
      description,
      images: [project.thumbnail],
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <ProjectDetailView project={project} />
      <CTABanner />
    </>
  );
}