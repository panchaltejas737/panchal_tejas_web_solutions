import Image from "next/image";
import Link from "next/link";
import styles from "./ProjectDetailView.module.css";
import CustomBadge from "@/components/custom/CustomBadge/CustomBadge";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";

export default function ProjectDetailView({ project }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Link href="/projects" className={styles.backLink}>
          <FiArrowLeft /> Back to Projects
        </Link>

        <div className={styles.header}>
          <CustomBadge variant="secondary">{project.category}</CustomBadge>
          <h1 className={styles.title}>{project.title}</h1>
          {project.techUsed && project.techUsed.length > 0 && (
            <div className={styles.techChips}>
              {project.techUsed.map((tech) => (
                <span key={tech} className={styles.techChip}>
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className={styles.imageWrapper}>
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.mainContent}>
            {project.challenge && (
              <div className={styles.block}>
                <h3>The Challenge</h3>
                <p>{project.challenge}</p>
              </div>
            )}
            {project.solution && (
              <div className={styles.block}>
                <h3>Our Solution</h3>
                <p>{project.solution}</p>
              </div>
            )}
            {project.result && (
              <div className={styles.block}>
                <h3>The Result</h3>
                <p>{project.result}</p>
              </div>
            )}
          </div>

          <div className={styles.sidebar}>
            {project.clientName && (
              <div className={styles.sidebarItem}>
                <span className={styles.sidebarLabel}>Client</span>
                <span className={styles.sidebarValue}>{project.clientName}</span>
              </div>
            )}
            {project.liveUrl && (
              <CustomButton
                href={project.liveUrl}
                variant="primary"
                fullWidth
                icon={FiExternalLink}
                target="_blank"
              >
                Visit Live Site
              </CustomButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}