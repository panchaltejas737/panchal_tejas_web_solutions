"use client";

import { useState } from "react";
import styles from "./ServicesTable.module.css";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import CustomBadge from "@/components/custom/CustomBadge/CustomBadge";
import Loader from "@/components/custom/Loader/Loader";
import EmptyState from "@/components/custom/EmptyState/EmptyState";
import ServiceFormModal from "@/components/admin/services/ServiceFormModal/ServiceFormModal";
import { useServices, useDeleteService } from "@/hooks/admin/useServices";
import { getIconComponent } from "@/lib/iconMap";
import { FiPlus, FiEdit2, FiTrash2, FiGrid } from "react-icons/fi";

export default function ServicesTable() {
  const { data: services, isLoading, isError } = useServices();
  const deleteService = useDeleteService();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const openCreateModal = () => {
    setEditingService(null);
    setModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteService.mutate(id);
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
    return <p className={styles.errorText}>Failed to load services. Please refresh the page.</p>;
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>All Services</h3>
        <CustomButton variant="primary" size="sm" icon={FiPlus} onClick={openCreateModal}>
          Add New Service
        </CustomButton>
      </div>

      {services.length === 0 ? (
        <EmptyState icon={FiGrid} title="No Services Yet" message="Add your first service to get started." />
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Icon</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => {
                const Icon = getIconComponent(service.icon);
                return (
                  <tr key={service._id}>
                    <td>
                      <div className={styles.iconCircle}>
                        <Icon />
                      </div>
                    </td>
                    <td className={styles.titleCell}>{service.title}</td>
                    <td>{service.category || "—"}</td>
                    <td>
                      <CustomBadge variant={service.isActive ? "success" : "highlight"}>
                        {service.isActive ? "Active" : "Inactive"}
                      </CustomBadge>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.iconBtn} onClick={() => openEditModal(service)} aria-label="Edit">
                          <FiEdit2 />
                        </button>
                        {confirmDeleteId === service._id ? (
                          <div className={styles.confirmRow}>
                            <button className={styles.confirmYes} onClick={() => handleDelete(service._id)}>
                              Confirm
                            </button>
                            <button className={styles.confirmNo} onClick={() => setConfirmDeleteId(null)}>
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            className={`${styles.iconBtn} ${styles.deleteBtn}`}
                            onClick={() => setConfirmDeleteId(service._id)}
                            aria-label="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <ServiceFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} editingService={editingService} />
    </div>
  );
}