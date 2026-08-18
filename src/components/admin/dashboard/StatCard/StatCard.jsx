import styles from "./StatCard.module.css";

export default function StatCard({ icon: Icon, label, value, accent = "primary" }) {
  return (
    <div className={styles.card}>
      <div className={`${styles.iconCircle} ${styles[accent]}`}>
        <Icon />
      </div>
      <div className={styles.info}>
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
}