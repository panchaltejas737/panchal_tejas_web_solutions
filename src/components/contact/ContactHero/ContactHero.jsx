import styles from "./ContactHero.module.css";
import CustomBadge from "@/components/custom/CustomBadge/CustomBadge";

export default function ContactHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <CustomBadge variant="highlight">Get In Touch</CustomBadge>
        <h1 className={styles.title}>Let&apos;s Start Your Project</h1>
        <p className={styles.subtitle}>
          Have a project in mind? Fill out the form below or reach out
          directly — we&apos;d love to hear from you.
        </p>
      </div>
    </section>
  );
}