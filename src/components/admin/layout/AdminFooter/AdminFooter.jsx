import { siteConfig } from "@/config/siteConfig";
import styles from "./AdminFooter.module.css";

export default function AdminFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>© {year} {siteConfig.name} — Admin Panel</p>
    </footer>
  );
}