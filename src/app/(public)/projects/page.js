import styles from "./projects-page.module.css";
import ProjectsHero from "@/components/projects/ProjectsHero/ProjectsHero";
import ProjectsGrid from "@/components/projects/ProjectsGrid/ProjectsGrid";
import CTABanner from "@/components/home/CTABanner/CTABanner";
import { getAllProjects } from "@/lib/data/projects";
import { siteConfig } from "@/config/siteConfig";

const pageTitle = "Our Projects";
const pageDescription =
  "Browse our portfolio of web applications, e-commerce stores, and digital products built for real clients.";

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    url: `${siteConfig.url}/projects`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: pageTitle }],
  },
  twitter: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    images: ["/og-image.png"],
  },
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <>
      <ProjectsHero />
      <section className={styles.section}>
        <div className={styles.container}>
          <ProjectsGrid projects={projects} />
        </div>
      </section>
      <CTABanner />
    </>
  );
}