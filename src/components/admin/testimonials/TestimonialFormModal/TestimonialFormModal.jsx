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
import { useCreateTestimonial, useUpdateTestimonial } from "@/hooks/admin/useTestimonials";
import { FiUploadCloud, FiStar } from "react-icons/fi";
import styles from "./TestimonialFormModal.module.css";
import { cn } from "@/lib/utils";

const testimonialSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().optional(),
  review: z.string().min(10, "Review must be at least 10 characters"),
  isActive: z.boolean(),
});

export default function TestimonialFormModal({ isOpen, onClose, editingTestimonial }) {
  const createTestimonial = useCreateTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const isEditMode = !!editingTestimonial;

  const [avatar, setAvatar] = useState("");
  const [uploading, setUploading] = useState(false);
  const [rating, setRating] = useState(5);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(testimonialSchema),
    defaultValues: { name: "", company: "", review: "", isActive: true },
  });

  useEffect(() => {
    if (editingTestimonial) {
      reset({
        name: editingTestimonial.name,
        company: editingTestimonial.company || "",
        review: editingTestimonial.review,
        isActive: editingTestimonial.isActive,
      });
      setAvatar(editingTestimonial.avatar || "");
      setRating(editingTestimonial.rating || 5);
    } else {
      reset({ name: "", company: "", review: "", isActive: true });
      setAvatar("");
      setRating(5);
    }
  }, [editingTestimonial, reset]);

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

      setAvatar(result.url);
      toast.success("Avatar uploaded successfully");
    } catch (error) {
      toast.error(error.message || "Failed to upload avatar");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (formData) => {
    const payload = {
      name: formData.name,
      company: formData.company,
      review: formData.review,
      rating,
      avatar,
      isActive: formData.isActive,
    };

    if (isEditMode) {
      await updateTestimonial.mutateAsync({ id: editingTestimonial._id, data: payload });
    } else {
      await createTestimonial.mutateAsync(payload);
    }
    onClose();
  };

  const isSubmitting = createTestimonial.isPending || updateTestimonial.isPending;

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Testimonial" : "Add New Testimonial"}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Avatar (optional)</label>
          <div className={styles.uploadArea}>
            {avatar ? (
              <div className={styles.previewWrapper}>
                <Image src={avatar} alt="Avatar preview" fill sizes="64px" style={{ objectFit: "cover" }} />
              </div>
            ) : (
              <div className={styles.uploadPlaceholder}>
                <FiUploadCloud />
              </div>
            )}
            <label className={styles.uploadBtn}>
              {uploading ? "Uploading..." : avatar ? "Change" : "Upload"}
              <input type="file" accept="image/*" onChange={handleFileChange} hidden disabled={uploading} />
            </label>
          </div>
        </div>

        <CustomInput label="Client Name" name="name" placeholder="e.g. Rahul Mehta" error={errors.name?.message} {...register("name")} />
        <CustomInput label="Company (optional)" name="company" placeholder="e.g. Acme Pvt Ltd" {...register("company")} />

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Rating</label>
          <div className={styles.starPicker}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={styles.starBtn}
                onClick={() => setRating(star)}
                aria-label={`${star} stars`}
              >
                <FiStar className={cn(styles.star, star <= rating && styles.starFilled)} />
              </button>
            ))}
          </div>
        </div>

        <CustomTextarea label="Review" name="review" placeholder="What did the client say?" error={errors.review?.message} {...register("review")} />

        <div className={styles.checkboxRow}>
          <input type="checkbox" id="testimonialActive" {...register("isActive")} />
          <label htmlFor="testimonialActive">Active (visible on public website)</label>
        </div>

        <CustomButton type="submit" variant="primary" fullWidth disabled={isSubmitting || uploading}>
          {isSubmitting ? "Saving..." : isEditMode ? "Update Testimonial" : "Create Testimonial"}
        </CustomButton>
      </form>
    </CustomModal>
  );
}