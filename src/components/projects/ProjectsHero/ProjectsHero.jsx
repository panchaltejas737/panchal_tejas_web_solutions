import styles from "./ProjectsHero.module.css";
import CustomBadge from "@/components/custom/CustomBadge/CustomBadge";

export default function ProjectsHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <CustomBadge variant="highlight">Our Work</CustomBadge>
        <h1 className={styles.title}>Featured Projects</h1>
        <p className={styles.subtitle}>
          A showcase of the solutions we&apos;ve designed and built for our clients.
        </p>
      </div>
    </section>
  );
}