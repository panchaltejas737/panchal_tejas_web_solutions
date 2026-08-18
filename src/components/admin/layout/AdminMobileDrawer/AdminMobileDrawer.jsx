"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiX, FiLogOut } from "react-icons/fi";
import styles from "./AdminMobileDrawer.module.css";
import { ADMIN_NAV_LINKS } from "@/lib/constants";
import { useAdminSidebarStore } from "@/store/adminSidebarStore";
import { cn } from "@/lib/utils";

export default function AdminMobileDrawer({ onLogout }) {
  const pathname = usePathname();
  const { mobileOpen, closeMobile } = useAdminSidebarStore();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  useEffect(() => {
    closeMobile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <>
      <div
        className={cn(styles.overlay, mobileOpen && styles.overlayOpen)}
        onClick={closeMobile}
      />
      <div className={cn(styles.drawer, mobileOpen && styles.drawerOpen)}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>PT</span>
            <span className={styles.logoText}>Admin Panel</span>
          </div>
          <button className={styles.closeBtn} onClick={closeMobile} aria-label="Close menu">
            <FiX />
          </button>
        </div>

        <nav className={styles.nav}>
          {ADMIN_NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(styles.navLink, isActive && styles.activeLink)}
              >
                <Icon className={styles.navIcon} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.footer}>
          <button className={styles.logoutBtn} onClick={onLogout}>
            <FiLogOut /> <span>Logout</span>
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}