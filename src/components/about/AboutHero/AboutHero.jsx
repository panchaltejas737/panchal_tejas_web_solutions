import styles from "./AboutHero.module.css";
import CustomBadge from "@/components/custom/CustomBadge/CustomBadge";

export default function AboutHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <CustomBadge variant="highlight">About Us</CustomBadge>
        <h1 className={styles.title}>
          We Build Digital Products That Drive Real Business Growth
        </h1>
        <p className={styles.subtitle}>
          Panchal Tejas Web Solution is a web development agency focused on
          combining clean engineering with premium design to help businesses
          succeed online.
        </p>
      </div>
    </section>
  );
}