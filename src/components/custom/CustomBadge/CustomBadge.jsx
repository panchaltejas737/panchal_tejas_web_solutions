import styles from "./CustomBadge.module.css";
import { cn } from "@/lib/utils";

export default function CustomBadge({ children, variant = "primary", className }) {
  return (
    <span className={cn(styles.badge, styles[variant], className)}>
      {children}
    </span>
  );
}