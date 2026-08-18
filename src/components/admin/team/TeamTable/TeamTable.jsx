"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./TeamTable.module.css";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import CustomBadge from "@/components/custom/CustomBadge/CustomBadge";
import Loader from "@/components/custom/Loader/Loader";
import EmptyState from "@/components/custom/EmptyState/EmptyState";
import TeamFormModal from "@/components/admin/team/TeamFormModal/TeamFormModal";
import { useTeamMembers, useDeleteTeamMember } from "@/hooks/admin/useTeam";
import { FiPlus, FiEdit2, FiTrash2, FiUsers } from "react-icons/fi";

export default function TeamTable() {
  const { data: members, isLoading, isError } = useTeamMembers();
  const deleteMember = useDeleteTeamMember();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const openCreateModal = () => {
    setEditingMember(null);
    setModalOpen(true);
  };

  const openEditModal = (member) => {
    setEditingMember(member);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteMember.mutate(id);
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
    return <p className={styles.errorText}>Failed to load team members. Please refresh the page.</p>;
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>All Team Members</h3>
        <CustomButton variant="primary" size="sm" icon={FiPlus} onClick={openCreateModal}>
          Add New Member
        </CustomButton>
      </div>

      {members.length === 0 ? (
        <EmptyState icon={FiUsers} title="No Team Members Yet" message="Add your first team member to show them on the About page." />
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member._id}>
                  <td>
                    <div className={styles.avatarWrapper}>
                      <Image src={member.corporatePhoto} alt={member.name} fill sizes="40px" style={{ objectFit: "cover" }} />
                    </div>
                  </td>
                  <td className={styles.titleCell}>{member.name}</td>
                  <td>{member.role}</td>
                  <td>{member.department}</td>
                  <td>
                    <CustomBadge variant={member.isActive ? "success" : "highlight"}>
                      {member.isActive ? "Active" : "Inactive"}
                    </CustomBadge>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.iconBtn} onClick={() => openEditModal(member)} aria-label="Edit">
                        <FiEdit2 />
                      </button>
                      {confirmDeleteId === member._id ? (
                        <div className={styles.confirmRow}>
                          <button className={styles.confirmYes} onClick={() => handleDelete(member._id)}>
                            Confirm
                          </button>
                          <button className={styles.confirmNo} onClick={() => setConfirmDeleteId(null)}>
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          className={`${styles.iconBtn} ${styles.deleteBtn}`}
                          onClick={() => setConfirmDeleteId(member._id)}
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

      <TeamFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} editingMember={editingMember} />
    </div>
  );
}