"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/hooks/useTheme";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={styles.toggle}
      aria-label="Toggle dark/light mode"
    >
      {theme === "light" ? <FiMoon /> : <FiSun />}
    </button>
  );
}