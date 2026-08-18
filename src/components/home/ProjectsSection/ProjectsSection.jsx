import styles from "./ProjectsSection.module.css";
import SectionHeading from "@/components/custom/SectionHeading/SectionHeading";
import CustomCard from "@/components/custom/CustomCard/CustomCard";
import CustomBadge from "@/components/custom/CustomBadge/CustomBadge";
import EmptyState from "@/components/custom/EmptyState/EmptyState";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import Image from "next/image";
import { FiFolder, FiArrowUpRight } from "react-icons/fi";
import { getFeaturedProjects } from "@/lib/data/projects";

export default async function ProjectsSection() {
  const projects = await getFeaturedProjects();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          eyebrow="Our Work"
          title="Featured Projects"
          subtitle="A glimpse into the solutions we've built for our clients."
        />

        {projects.length === 0 ? (
          <EmptyState
            icon={FiFolder}
            title="Projects Coming Soon"
            message="Our portfolio is being updated. New work will be showcased here shortly."
          />
        ) : (
          <>
            <div className={styles.grid}>
              {projects.map((project, index) => (
                <CustomCard key={project._id} padding="sm" className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      style={{ objectFit: "cover" }}
                      priority={index === 0}
                    />
                    <div className={styles.overlay}>
                      <CustomButton href={`/projects/${project.slug}`} variant="primary" size="sm" icon={FiArrowUpRight}>
                        View Project
                      </CustomButton>
                    </div>
                  </div>
                  <div className={styles.cardBody}>
                    <CustomBadge variant="secondary">{project.category}</CustomBadge>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                  </div>
                </CustomCard>
              ))}
            </div>
            <div className={styles.viewAllWrapper}>
              <CustomButton href="/projects" variant="outline">
                View All Projects
              </CustomButton>
            </div>
          </>
        )}
      </div>
    </section>
  );
}