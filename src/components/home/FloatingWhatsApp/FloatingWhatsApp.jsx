"use client";

import { FaWhatsapp } from "react-icons/fa";
import styles from "./FloatingWhatsApp.module.css";
import { siteConfig } from "@/config/siteConfig";

const DEFAULT_MESSAGE =
  "Hi PTWS! 👋 I visited your website and I'm interested in discussing a web development project. Could you share more details?";

export default function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    DEFAULT_MESSAGE,
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
      aria-label="Chat with us on WhatsApp"
    >
      <span className={styles.pulse}></span>
      <FaWhatsapp className={styles.icon} />
      <span className={styles.tooltip}>Chat with us on WhatsApp</span>
    </a>
  );
}
