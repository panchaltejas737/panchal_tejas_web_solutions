import styles from "./ServiceDetailCard.module.css";
import CustomCard from "@/components/custom/CustomCard/CustomCard";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import { FiCheck, FiArrowRight } from "react-icons/fi";
import { getIconComponent } from "@/lib/iconMap";

export default function ServiceDetailCard({ service, reversed = false }) {
  const Icon = getIconComponent(service.icon);

  return (
    <CustomCard
      className={`${styles.card} ${reversed ? styles.reversed : ""}`}
      padding="lg"
    >
      <div className={styles.iconBlock}>
        <div className={styles.iconCircle}>
          <Icon />
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{service.title}</h3>
        <p className={styles.description}>{service.description}</p>

        {service.features && service.features.length > 0 && (
          <ul className={styles.featureList}>
            {service.features.map((feature, i) => (
              <li key={i}>
                <FiCheck className={styles.checkIcon} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <CustomButton href="/contact" variant="outline" icon={FiArrowRight}>
          Get Started
        </CustomButton>
      </div>
    </CustomCard>
  );
}