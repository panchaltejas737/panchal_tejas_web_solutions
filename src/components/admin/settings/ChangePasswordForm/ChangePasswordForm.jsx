"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useState } from "react";
import styles from "./ChangePasswordForm.module.css";
import CustomInput from "@/components/custom/CustomInput/CustomInput";
import CustomButton from "@/components/custom/CustomButton/CustomButton";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ChangePasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to update password");
      }

      toast.success("Password updated successfully");
      reset();
    } catch (error) {
      toast.error(error.message || "Failed to update password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Change Password</h3>
      <p className={styles.subtitle}>Update your admin login password.</p>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <CustomInput
          label="Current Password"
          name="currentPassword"
          type="password"
          error={errors.currentPassword?.message}
          {...register("currentPassword")}
        />
        <CustomInput
          label="New Password"
          name="newPassword"
          type="password"
          error={errors.newPassword?.message}
          {...register("newPassword")}
        />
        <CustomInput
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <CustomButton type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Password"}
        </CustomButton>
      </form>
    </div>
  );
}