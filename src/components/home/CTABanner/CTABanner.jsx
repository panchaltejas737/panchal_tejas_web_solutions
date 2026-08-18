import styles from "./CTABanner.module.css";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import { FiArrowRight } from "react-icons/fi";

export default function CTABanner() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Ready to Build Something Great?</h2>
        <p className={styles.subtitle}>
          Let&apos;s discuss your project and turn your idea into a
          high-performing digital product.
        </p>
        <CustomButton href="/contact" variant="primary" size="lg" icon={FiArrowRight}>
          Start Your Project
        </CustomButton>
      </div>
    </section>
  );
}