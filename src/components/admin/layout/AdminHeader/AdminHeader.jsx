"use client";

import { FiMenu, FiUser } from "react-icons/fi";
import styles from "./AdminHeader.module.css";
import ThemeToggle from "@/components/custom/ThemeToggle/ThemeToggle";
import { useAdminSidebarStore } from "@/store/adminSidebarStore";

export default function AdminHeader({ pageTitle = "Dashboard", adminName = "Admin" }) {
  const { openMobile } = useAdminSidebarStore();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={openMobile} aria-label="Open menu">
          <FiMenu />
        </button>
        <h1 className={styles.pageTitle}>{pageTitle}</h1>
      </div>

      <div className={styles.right}>
        <ThemeToggle />
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <FiUser />
          </div>
          <span className={styles.profileName}>{adminName}</span>
        </div>
      </div>
    </header>
  );
}