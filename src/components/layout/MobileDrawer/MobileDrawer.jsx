"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiX } from "react-icons/fi";
import styles from "./MobileDrawer.module.css";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function MobileDrawer({ isOpen, onClose }) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <>
      <div
        className={cn(styles.overlay, isOpen && styles.overlayOpen)}
        onClick={onClose}
      />
      <div className={cn(styles.drawer, isOpen && styles.drawerOpen)}>
        <div className={styles.header}>
          <span className={styles.title}>Menu</span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
            <FiX />
          </button>
        </div>

        <nav className={styles.links}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(styles.link, pathname === link.href && styles.activeLink)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.footer}>
          <CustomButton href="/contact" variant="primary" fullWidth>
            Get Free Consultation
          </CustomButton>
        </div>
      </div>
    </>,
    document.body
  );
}