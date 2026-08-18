"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomModal from "@/components/custom/CustomModal/CustomModal";
import CustomInput from "@/components/custom/CustomInput/CustomInput";
import CustomTextarea from "@/components/custom/CustomTextarea/CustomTextarea";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import { useCreateService, useUpdateService } from "@/hooks/admin/useServices";
import { ICON_MAP } from "@/lib/iconMap";
import styles from "./ServiceFormModal.module.css";

const serviceSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  icon: z.string().min(1, "Select an icon"),
  category: z.string().optional(),
  featuresText: z.string().optional(),
  isActive: z.boolean(),
});

export default function ServiceFormModal({ isOpen, onClose, editingService }) {
  const createService = useCreateService();
  const updateService = useUpdateService();
  const isEditMode = !!editingService;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      description: "",
      icon: "code",
      category: "",
      featuresText: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (editingService) {
      reset({
        title: editingService.title,
        description: editingService.description,
        icon: editingService.icon,
        category: editingService.category || "",
        featuresText: (editingService.features || []).join("\n"),
        isActive: editingService.isActive,
      });
    } else {
      reset({ title: "", description: "", icon: "code", category: "", featuresText: "", isActive: true });
    }
  }, [editingService, reset]);

  const onSubmit = async (formData) => {
    const payload = {
      title: formData.title,
      description: formData.description,
      icon: formData.icon,
      category: formData.category,
      features: formData.featuresText
        ? formData.featuresText.split("\n").map((f) => f.trim()).filter(Boolean)
        : [],
      isActive: formData.isActive,
    };

    if (isEditMode) {
      await updateService.mutateAsync({ id: editingService._id, data: payload });
    } else {
      await createService.mutateAsync(payload);
    }
    onClose();
  };

  const isSubmitting = createService.isPending || updateService.isPending;

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Service" : "Add New Service"}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <CustomInput label="Title" name="title" placeholder="e.g. Web Development" error={errors.title?.message} {...register("title")} />

        <CustomTextarea
          label="Description"
          name="description"
          placeholder="Describe this service..."
          error={errors.description?.message}
          {...register("description")}
        />

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Icon</label>
          <select className={styles.select} {...register("icon")}>
            {Object.keys(ICON_MAP).map((key) => (
              <option key={key} value={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <CustomInput label="Category (optional)" name="category" placeholder="e.g. Web, Mobile" {...register("category")} />

        <CustomTextarea
          label="Features (one per line, optional)"
          name="featuresText"
          placeholder={"Responsive Design\nSEO Optimized\nFast Loading"}
          rows={4}
          {...register("featuresText")}
        />

        <div className={styles.checkboxRow}>
          <input type="checkbox" id="isActive" {...register("isActive")} />
          <label htmlFor="isActive">Active (visible on public website)</label>
        </div>

        <CustomButton type="submit" variant="primary" fullWidth disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : isEditMode ? "Update Service" : "Create Service"}
        </CustomButton>
      </form>
    </CustomModal>
  );
}