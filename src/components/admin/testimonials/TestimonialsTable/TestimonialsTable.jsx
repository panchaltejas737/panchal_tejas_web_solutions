"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./TestimonialsTable.module.css";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import CustomBadge from "@/components/custom/CustomBadge/CustomBadge";
import Loader from "@/components/custom/Loader/Loader";
import EmptyState from "@/components/custom/EmptyState/EmptyState";
import TestimonialFormModal from "@/components/admin/testimonials/TestimonialFormModal/TestimonialFormModal";
import { useTestimonials, useDeleteTestimonial } from "@/hooks/admin/useTestimonials";
import { FiPlus, FiEdit2, FiTrash2, FiMessageSquare, FiStar, FiUser } from "react-icons/fi";

export default function TestimonialsTable() {
  const { data: testimonials, isLoading, isError } = useTestimonials();
  const deleteTestimonial = useDeleteTestimonial();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const openCreateModal = () => {
    setEditingTestimonial(null);
    setModalOpen(true);
  };

  const openEditModal = (testimonial) => {
    setEditingTestimonial(testimonial);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteTestimonial.mutate(id);
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
    return <p className={styles.errorText}>Failed to load testimonials. Please refresh the page.</p>;
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>All Testimonials</h3>
        <CustomButton variant="primary" size="sm" icon={FiPlus} onClick={openCreateModal}>
          Add New Testimonial
        </CustomButton>
      </div>

      {testimonials.length === 0 ? (
        <EmptyState icon={FiMessageSquare} title="No Testimonials Yet" message="Add your first client review to build trust." />
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Company</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((testimonial) => (
                <tr key={testimonial._id}>
                  <td>
                    <div className={styles.avatarWrapper}>
                      {testimonial.avatar ? (
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          fill
                          sizes="40px"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <FiUser className={styles.avatarPlaceholder} />
                      )}
                    </div>
                  </td>
                  <td className={styles.titleCell}>{testimonial.name}</td>
                  <td>{testimonial.company || "—"}</td>
                  <td>
                    <div className={styles.ratingCell}>
                      <FiStar className={styles.starIcon} /> {testimonial.rating}
                    </div>
                  </td>
                  <td>
                    <CustomBadge variant={testimonial.isActive ? "success" : "highlight"}>
                      {testimonial.isActive ? "Active" : "Inactive"}
                    </CustomBadge>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.iconBtn} onClick={() => openEditModal(testimonial)} aria-label="Edit">
                        <FiEdit2 />
                      </button>
                      {confirmDeleteId === testimonial._id ? (
                        <div className={styles.confirmRow}>
                          <button className={styles.confirmYes} onClick={() => handleDelete(testimonial._id)}>
                            Confirm
                          </button>
                          <button className={styles.confirmNo} onClick={() => setConfirmDeleteId(null)}>
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          className={`${styles.iconBtn} ${styles.deleteBtn}`}
                          onClick={() => setConfirmDeleteId(testimonial._id)}
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

      <TestimonialFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} editingTestimonial={editingTestimonial} />
    </div>
  );
}