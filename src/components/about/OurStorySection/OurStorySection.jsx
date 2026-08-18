import styles from "./OurStorySection.module.css";
import { FiCode } from "react-icons/fi";
import SectionHeading from "@/components/custom/SectionHeading/SectionHeading";
import StatsSection from "@/components/home/StatsSection/StatsSection";

export default function OurStorySection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.visual}>
            <div className={styles.iconFrame}>
              <FiCode />
            </div>
          </div>

          <div className={styles.content}>
            <SectionHeading
              eyebrow="Our Story"
              title="Built On Passion For Clean, Scalable Web Development"
              align="left"
            />
            <p className={styles.paragraph}>
              Panchal Tejas Web Solution started with a simple goal: help
              businesses get a professional, high-performing online presence
              without the complexity and inflated costs of traditional
              agencies.
            </p>
            <p className={styles.paragraph}>
              We focus on modern technology, transparent communication, and
              long-term partnerships — every project is treated as if it were
              our own product, built to scale and last.
            </p>
          </div>
        </div>
      </div>

      <StatsSection />
    </section>
  );
}