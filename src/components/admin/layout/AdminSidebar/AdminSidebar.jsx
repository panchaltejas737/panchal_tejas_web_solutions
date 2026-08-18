"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronsLeft, FiChevronsRight, FiLogOut } from "react-icons/fi";
import styles from "./AdminSidebar.module.css";
import { ADMIN_NAV_LINKS } from "@/lib/constants";
import { useAdminSidebarStore } from "@/store/adminSidebarStore";
import { cn } from "@/lib/utils";

export default function AdminSidebar({ onLogout }) {
  const pathname = usePathname();
  const { collapsed, toggleCollapsed } = useAdminSidebarStore();

  return (
    <aside className={cn(styles.sidebar, collapsed && styles.collapsed)}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <span className={styles.logoMark}>PT</span>
          {!collapsed && <span className={styles.logoText}>Admin Panel</span>}
        </div>
        <button
          className={styles.collapseBtn}
          onClick={toggleCollapsed}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <FiChevronsRight /> : <FiChevronsLeft />}
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
              title={collapsed ? link.label : undefined}
            >
              <Icon className={styles.navIcon} />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className={styles.bottom}>
        <button className={styles.logoutBtn} onClick={onLogout} title={collapsed ? "Logout" : undefined}>
          <FiLogOut className={styles.navIcon} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}