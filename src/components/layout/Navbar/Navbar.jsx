"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import styles from "./Navbar.module.css";
import ThemeToggle from "@/components/custom/ThemeToggle/ThemeToggle";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import MobileDrawer from "@/components/layout/MobileDrawer/MobileDrawer";
import { NAV_LINKS } from "@/lib/constants";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={cn(styles.navbar, scrolled && styles.scrolled)}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoMark}>PT</span>
            <span className={styles.logoText}>{siteConfig.shortName}</span>
          </Link>

          <nav className={styles.navLinks}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(styles.navLink, pathname === link.href && styles.activeLink)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <ThemeToggle />
            <div className={styles.ctaDesktop}>
              <CustomButton href="/contact" variant="primary" size="sm">
                Get Free Consultation
              </CustomButton>
            </div>
            <button
              className={styles.menuBtn}
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}