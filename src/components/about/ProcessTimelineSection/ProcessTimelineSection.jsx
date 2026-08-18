import styles from "./ProcessTimelineSection.module.css";
import SectionHeading from "@/components/custom/SectionHeading/SectionHeading";
import { PROCESS_STEPS } from "@/lib/constants";

export default function ProcessTimelineSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          eyebrow="How We Work"
          title="Our Process"
          subtitle="A clear, structured approach from first conversation to final launch."
        />

        <div className={styles.timeline}>
          {PROCESS_STEPS.map((step) => (
            <div key={step.id} className={styles.step}>
              <div className={styles.stepNumber}>{step.step}</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}