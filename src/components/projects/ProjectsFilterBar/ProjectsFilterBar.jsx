"use client";

import styles from "./ProjectsFilterBar.module.css";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function ProjectsFilterBar({ activeCategory, onChange }) {
  return (
    <div className={styles.filterBar}>
      {PROJECT_CATEGORIES.map((category) => (
        <button
          key={category}
          className={cn(styles.chip, activeCategory === category && styles.active)}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}