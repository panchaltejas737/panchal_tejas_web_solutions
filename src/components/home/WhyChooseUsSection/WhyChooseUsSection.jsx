import styles from "./WhyChooseUsSection.module.css";
import SectionHeading from "@/components/custom/SectionHeading/SectionHeading";
import { WHY_CHOOSE_US } from "@/lib/constants";

export default function WhyChooseUsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Built On Trust & Technical Excellence"
          subtitle="What sets us apart from a typical development agency."
        />

        <div className={styles.grid}>
          {WHY_CHOOSE_US.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className={styles.item}>
                <div className={styles.iconCircle}>
                  <Icon />
                </div>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemDesc}>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}