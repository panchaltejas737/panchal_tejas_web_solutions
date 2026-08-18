import styles from "./ServicesHero.module.css";
import CustomBadge from "@/components/custom/CustomBadge/CustomBadge";

export default function ServicesHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <CustomBadge variant="highlight">What We Offer</CustomBadge>
        <h1 className={styles.title}>Our Services</h1>
        <p className={styles.subtitle}>
          End-to-end digital solutions designed to help your business grow —
          from concept and design to development and ongoing support.
        </p>
      </div>
    </section>
  );
}