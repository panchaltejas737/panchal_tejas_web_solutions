"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./ProjectsTable.module.css";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import CustomBadge from "@/components/custom/CustomBadge/CustomBadge";
import Loader from "@/components/custom/Loader/Loader";
import EmptyState from "@/components/custom/EmptyState/EmptyState";
import ProjectFormModal from "@/components/admin/projects/ProjectFormModal/ProjectFormModal";
import { useProjects, useDeleteProject } from "@/hooks/admin/useProjects";
import { FiPlus, FiEdit2, FiTrash2, FiFolder } from "react-icons/fi";

export default function ProjectsTable() {
  const { data: projects, isLoading, isError } = useProjects();
  const deleteProject = useDeleteProject();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const openCreateModal = () => {
    setEditingProject(null);
    setModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteProject.mutate(id);
    setConfirmDeleteId(null);
  };

  if (isLoading) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader size="lg" />
      </div>
    );
  }

  if (isError) {
    return <p className={styles.errorText}>Failed to load projects. Please refresh the page.</p>;
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>All Projects</h3>
        <CustomButton variant="primary" size="sm" icon={FiPlus} onClick={openCreateModal}>
          Add New Project
        </CustomButton>
      </div>

      {projects.length === 0 ? (
        <EmptyState icon={FiFolder} title="No Projects Yet" message="Add your first project to build your portfolio." />
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Title</th>
                <th>Category</th>
                <th>Featured</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id}>
                  <td>
                    <div className={styles.thumbWrapper}>
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        sizes="64px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </td>
                  <td className={styles.titleCell}>{project.title}</td>
                  <td>{project.category}</td>
                  <td>
                    <CustomBadge variant={project.featured ? "highlight" : "secondary"}>
                      {project.featured ? "Yes" : "No"}
                    </CustomBadge>
                  </td>
                  <td>
                    <CustomBadge variant={project.isActive ? "success" : "highlight"}>
                      {project.isActive ? "Active" : "Inactive"}
                    </CustomBadge>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.iconBtn} onClick={() => openEditModal(project)} aria-label="Edit">
                        <FiEdit2 />
                      </button>
                      {confirmDeleteId === project._id ? (
                        <div className={styles.confirmRow}>
                          <button className={styles.confirmYes} onClick={() => handleDelete(project._id)}>
                            Confirm
                          </button>
                          <button className={styles.confirmNo} onClick={() => setConfirmDeleteId(null)}>
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          className={`${styles.iconBtn} ${styles.deleteBtn}`}
                          onClick={() => setConfirmDeleteId(project._id)}
                          aria-label="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ProjectFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} editingProject={editingProject} />
    </div>
  );
}