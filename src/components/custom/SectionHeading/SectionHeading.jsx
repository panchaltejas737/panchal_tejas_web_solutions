import styles from "./SectionHeading.module.css";
import CustomBadge from "@/components/custom/CustomBadge/CustomBadge";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}) {
  return (
    <div className={cn(styles.wrapper, styles[align], className)}>
      {eyebrow && <CustomBadge variant="primary">{eyebrow}</CustomBadge>}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}