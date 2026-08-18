import { FiInbox } from "react-icons/fi";
import styles from "./EmptyState.module.css";

export default function EmptyState({
  icon: Icon = FiInbox,
  title = "Nothing here yet",
  message = "This section will be updated soon.",
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.iconCircle}>
        <Icon />
      </div>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.message}>{message}</p>
    </div>
  );
}