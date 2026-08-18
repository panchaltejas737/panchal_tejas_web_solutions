import Link from "next/link";
import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import styles from "./Footer.module.css";
import { siteConfig } from "@/config/siteConfig";
import { NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <div className={styles.logo}>
              <span className={styles.logoMark}>PT</span>
              <span className={styles.logoText}>{siteConfig.name}</span>
            </div>
            <p className={styles.tagline}>{siteConfig.tagline}</p>
            <div className={styles.socials}>
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FiFacebook /></a>
              <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FiTwitter /></a>
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FiInstagram /></a>
            </div>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact</h4>
            <ul className={styles.contactList}>
              <li>
                <FiMail /> <span>{siteConfig.contact.email}</span>
              </li>
              <li>
                <FiPhone /> <span>{siteConfig.contact.phone}</span>
              </li>
              <li>
                <FiMapPin /> <span>{siteConfig.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}