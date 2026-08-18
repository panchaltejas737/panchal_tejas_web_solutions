import styles from "./TechStackSection.module.css";
import { TECH_STACK } from "@/lib/constants";

export default function TechStackSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.label}>Technologies We Work With</p>
        <div className={styles.strip}>
          {TECH_STACK.map((tech) => (
            <span key={tech} className={styles.techItem}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}