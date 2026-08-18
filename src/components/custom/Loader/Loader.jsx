import styles from "./Loader.module.css";
import { cn } from "@/lib/utils";

export default function Loader({ size = "md" }) {
  return (
    <div className={cn(styles.loader, styles[size])} role="status" aria-label="Loading">
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
    </div>
  );
}