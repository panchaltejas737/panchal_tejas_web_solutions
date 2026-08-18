import styles from "./CoreValuesSection.module.css";
import SectionHeading from "@/components/custom/SectionHeading/SectionHeading";
import { CORE_VALUES } from "@/lib/constants";

export default function CoreValuesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          eyebrow="Our Values"
          title="What Drives Everything We Build"
          subtitle="The principles that shape how we work with every client."
        />

        <div className={styles.grid}>
          {CORE_VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <div key={value.id} className={styles.card}>
                <div className={styles.iconCircle}>
                  <Icon />
                </div>
                <h3 className={styles.title}>{value.title}</h3>
                <p className={styles.description}>{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}