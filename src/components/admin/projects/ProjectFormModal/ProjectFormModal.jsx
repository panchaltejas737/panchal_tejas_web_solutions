"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import CustomModal from "@/components/custom/CustomModal/CustomModal";
import CustomInput from "@/components/custom/CustomInput/CustomInput";
import CustomTextarea from "@/components/custom/CustomTextarea/CustomTextarea";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import { useCreateProject, useUpdateProject } from "@/hooks/admin/useProjects";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import { FiUploadCloud } from "react-icons/fi";
import styles from "./ProjectFormModal.module.css";

const projectSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  category: z.string().min(1, "Select a category"),
  techUsedText: z.string().optional(),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  result: z.string().optional(),
  clientName: z.string().optional(),
  liveUrl: z.string().optional(),
  featured: z.boolean(),
  isActive: z.boolean(),
});

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProjectFormModal({ isOpen, onClose, editingProject }) {
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const isEditMode = !!editingProject;

  const [thumbnail, setThumbnail] = useState("");
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      slug: "",
      category: PROJECT_CATEGORIES[1],
      techUsedText: "",
      challenge: "",
      solution: "",
      result: "",
      clientName: "",
      liveUrl: "",
      featured: false,
      isActive: true,
    },
  });

  const titleValue = watch("title");

  useEffect(() => {
    if (!isEditMode && titleValue) {
      setValue("slug", slugify(titleValue));
    }
  }, [titleValue, isEditMode, setValue]);

  useEffect(() => {
    if (editingProject) {
      reset({
        title: editingProject.title,
        slug: editingProject.slug,
        category: editingProject.category,
        techUsedText: (editingProject.techUsed || []).join(", "),
        challenge: editingProject.challenge || "",
        solution: editingProject.solution || "",
        result: editingProject.result || "",
        clientName: editingProject.clientName || "",
        liveUrl: editingProject.liveUrl || "",
        featured: editingProject.featured,
        isActive: editingProject.isActive,
      });
      setThumbnail(editingProject.thumbnail || "");
    } else {
      reset({
        title: "",
        slug: "",
        category: PROJECT_CATEGORIES[1],
        techUsedText: "",
        challenge: "",
        solution: "",
        result: "",
        clientName: "",
        liveUrl: "",
        featured: false,
        isActive: true,
      });
      setThumbnail("");
    }
  }, [editingProject, reset]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Upload failed");

      setThumbnail(result.url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error(error.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (formData) => {
    if (!thumbnail) {
      toast.error("Please upload a thumbnail image");
      return;
    }

    const payload = {
      title: formData.title,
      slug: formData.slug,
      category: formData.category,
      techUsed: formData.techUsedText
        ? formData.techUsedText.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      thumbnail,
      challenge: formData.challenge,
      solution: formData.solution,
      result: formData.result,
      clientName: formData.clientName,
      liveUrl: formData.liveUrl,
      featured: formData.featured,
      isActive: formData.isActive,
    };

    try {
      if (isEditMode) {
        await updateProject.mutateAsync({ id: editingProject._id, data: payload });
      } else {
        await createProject.mutateAsync(payload);
      }
      onClose();
    } catch (error) {
      // error toast already handled in hook
    }
  };

  const isSubmitting = createProject.isPending || updateProject.isPending;

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Project" : "Add New Project"}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Thumbnail Image</label>
          <div className={styles.uploadArea}>
            {thumbnail ? (
              <div className={styles.previewWrapper}>
                <Image
                  src={thumbnail}
                  alt="Thumbnail preview"
                  fill
                  sizes="(max-width: 600px) 100vw, 480px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : (
              <div className={styles.uploadPlaceholder}>
                <FiUploadCloud />
                <span>No image uploaded</span>
              </div>
            )}
            <label className={styles.uploadBtn}>
              {uploading ? "Uploading..." : thumbnail ? "Change Image" : "Upload Image"}
              <input type="file" accept="image/*" onChange={handleFileChange} hidden disabled={uploading} />
            </label>
          </div>
        </div>

        <CustomInput label="Title" name="title" placeholder="e.g. E-commerce Platform" error={errors.title?.message} {...register("title")} />
        <CustomInput label="Slug" name="slug" placeholder="e-commerce-platform" error={errors.slug?.message} {...register("slug")} />

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Category</label>
          <select className={styles.select} {...register("category")}>
            {PROJECT_CATEGORIES.filter((c) => c !== "All").map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <CustomInput
          label="Tech Used (comma-separated, optional)"
          name="techUsedText"
          placeholder="Next.js, MongoDB, Node.js"
          {...register("techUsedText")}
        />

        <CustomTextarea label="Challenge (optional)" name="challenge" placeholder="What problem did the client have?" rows={3} {...register("challenge")} />
        <CustomTextarea label="Solution (optional)" name="solution" placeholder="How did you solve it?" rows={3} {...register("solution")} />
        <CustomTextarea label="Result (optional)" name="result" placeholder="What was the outcome?" rows={3} {...register("result")} />

        <CustomInput label="Client Name (optional)" name="clientName" placeholder="Client or company name" {...register("clientName")} />
        <CustomInput label="Live URL (optional)" name="liveUrl" placeholder="https://example.com" {...register("liveUrl")} />

        <div className={styles.checkboxRow}>
          <input type="checkbox" id="featured" {...register("featured")} />
          <label htmlFor="featured">Featured (show on homepage)</label>
        </div>

        <div className={styles.checkboxRow}>
          <input type="checkbox" id="isActive" {...register("isActive")} />
          <label htmlFor="isActive">Active (visible on public website)</label>
        </div>

        <CustomButton type="submit" variant="primary" fullWidth disabled={isSubmitting || uploading}>
          {isSubmitting ? "Saving..." : isEditMode ? "Update Project" : "Create Project"}
        </CustomButton>
      </form>
    </CustomModal>
  );
}