"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import CustomModal from "@/components/custom/CustomModal/CustomModal";
import CustomInput from "@/components/custom/CustomInput/CustomInput";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import { useCreateTeamMember, useUpdateTeamMember } from "@/hooks/admin/useTeam";
import { FiUploadCloud } from "react-icons/fi";
import styles from "./TeamFormModal.module.css";

const DEPARTMENTS = ["Developers", "Designers", "Management"];

const teamMemberSchema = z.object({
  name: z.string().min(2, "Name is required"),
  role: z.string().min(2, "Role is required"),
  department: z.enum(DEPARTMENTS),
  githubUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  isActive: z.boolean(),
});

export default function TeamFormModal({ isOpen, onClose, editingMember }) {
  const createMember = useCreateTeamMember();
  const updateMember = useUpdateTeamMember();
  const isEditMode = !!editingMember;

  const [corporatePhoto, setCorporatePhoto] = useState("");
  const [funPhoto, setFunPhoto] = useState("");
  const [uploadingCorporate, setUploadingCorporate] = useState(false);
  const [uploadingFun, setUploadingFun] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: "",
      role: "",
      department: "Developers",
      githubUrl: "",
      linkedinUrl: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (editingMember) {
      reset({
        name: editingMember.name,
        role: editingMember.role,
        department: editingMember.department,
        githubUrl: editingMember.githubUrl || "",
        linkedinUrl: editingMember.linkedinUrl || "",
        isActive: editingMember.isActive,
      });
      setCorporatePhoto(editingMember.corporatePhoto || "");
      setFunPhoto(editingMember.funPhoto || "");
    } else {
      reset({ name: "", role: "", department: "Developers", githubUrl: "", linkedinUrl: "", isActive: true });
      setCorporatePhoto("");
      setFunPhoto("");
    }
  }, [editingMember, reset]);

  const uploadFile = async (file, setUrl, setLoading) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Upload failed");

      setUrl(result.url);
      toast.success("Photo uploaded successfully");
    } catch (error) {
      toast.error(error.message || "Failed to upload photo");
    } finally {
      setLoading(false);
    }
  };

  const handleCorporateChange = (e) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file, setCorporatePhoto, setUploadingCorporate);
  };

  const handleFunChange = (e) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file, setFunPhoto, setUploadingFun);
  };

  const onSubmit = async (formData) => {
    if (!corporatePhoto || !funPhoto) {
      toast.error("Please upload both photos");
      return;
    }

    const payload = {
      name: formData.name,
      role: formData.role,
      department: formData.department,
      corporatePhoto,
      funPhoto,
      githubUrl: formData.githubUrl,
      linkedinUrl: formData.linkedinUrl,
      isActive: formData.isActive,
    };

    try {
      if (isEditMode) {
        await updateMember.mutateAsync({ id: editingMember._id, data: payload });
      } else {
        await createMember.mutateAsync(payload);
      }
      onClose();
    } catch (error) {
      // error toast already handled in hook
    }
  };

  const isSubmitting = createMember.isPending || updateMember.isPending;
  const isUploading = uploadingCorporate || uploadingFun;

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Team Member" : "Add New Team Member"}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.photoRow}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Corporate Photo</label>
            <div className={styles.uploadArea}>
              {corporatePhoto ? (
                <div className={styles.previewWrapper}>
                  <Image src={corporatePhoto} alt="Corporate preview" fill sizes="140px" style={{ objectFit: "cover" }} />
                </div>
              ) : (
                <div className={styles.uploadPlaceholder}>
                  <FiUploadCloud />
                </div>
              )}
              <label className={styles.uploadBtn}>
                {uploadingCorporate ? "Uploading..." : corporatePhoto ? "Change" : "Upload"}
                <input type="file" accept="image/*" onChange={handleCorporateChange} hidden disabled={uploadingCorporate} />
              </label>
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Fun Photo</label>
            <div className={styles.uploadArea}>
              {funPhoto ? (
                <div className={styles.previewWrapper}>
                  <Image src={funPhoto} alt="Fun preview" fill sizes="140px" style={{ objectFit: "cover" }} />
                </div>
              ) : (
                <div className={styles.uploadPlaceholder}>
                  <FiUploadCloud />
                </div>
              )}
              <label className={styles.uploadBtn}>
                {uploadingFun ? "Uploading..." : funPhoto ? "Change" : "Upload"}
                <input type="file" accept="image/*" onChange={handleFunChange} hidden disabled={uploadingFun} />
              </label>
            </div>
          </div>
        </div>

        <CustomInput label="Name" name="name" placeholder="e.g. Tejas Panchal" error={errors.name?.message} {...register("name")} />
        <CustomInput label="Role" name="role" placeholder="e.g. Lead Developer" error={errors.role?.message} {...register("role")} />

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Department</label>
          <select className={styles.select} {...register("department")}>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <CustomInput label="GitHub URL (optional)" name="githubUrl" placeholder="https://github.com/username" {...register("githubUrl")} />
        <CustomInput label="LinkedIn URL (optional)" name="linkedinUrl" placeholder="https://linkedin.com/in/username" {...register("linkedinUrl")} />

        <div className={styles.checkboxRow}>
          <input type="checkbox" id="teamActive" {...register("isActive")} />
          <label htmlFor="teamActive">Active (visible on public website)</label>
        </div>

        <CustomButton type="submit" variant="primary" fullWidth disabled={isSubmitting || isUploading}>
          {isSubmitting ? "Saving..." : isEditMode ? "Update Team Member" : "Add Team Member"}
        </CustomButton>
      </form>
    </CustomModal>
  );
}