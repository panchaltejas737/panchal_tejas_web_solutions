"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import styles from "./ProjectsGrid.module.css";
import ProjectsFilterBar from "@/components/projects/ProjectsFilterBar/ProjectsFilterBar";
import CustomCard from "@/components/custom/CustomCard/CustomCard";
import CustomBadge from "@/components/custom/CustomBadge/CustomBadge";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import EmptyState from "@/components/custom/EmptyState/EmptyState";
import { FiFolder, FiArrowUpRight } from "react-icons/fi";

export default function ProjectsGrid({ projects }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  if (!projects || projects.length === 0) {
    return (
      <EmptyState
        icon={FiFolder}
        title="Projects Coming Soon"
        message="Our portfolio is being updated. New work will be showcased here shortly."
      />
    );
  }

  return (
    <>
      <ProjectsFilterBar activeCategory={activeCategory} onChange={setActiveCategory} />

      {filteredProjects.length === 0 ? (
        <EmptyState
          icon={FiFolder}
          title="No Projects In This Category"
          message="Try selecting a different category filter."
        />
      ) : (
        <div className={styles.grid}>
          {filteredProjects.map((project, index) => (
            <CustomCard key={project._id} padding="sm" className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  style={{ objectFit: "cover" }}
                  priority={index === 0}
                />
                <div className={styles.overlay}>
                  <CustomButton
                    href={`/projects/${project.slug}`}
                    variant="primary"
                    size="sm"
                    icon={FiArrowUpRight}
                  >
                    View Project
                  </CustomButton>
                </div>
              </div>
              <div className={styles.cardBody}>
                <CustomBadge variant="secondary">{project.category}</CustomBadge>
                <h3 className={styles.cardTitle}>{project.title}</h3>
              </div>
            </CustomCard>
          ))}
        </div>
      )}
    </>
  );
}