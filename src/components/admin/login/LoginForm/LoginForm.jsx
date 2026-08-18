"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { FiLock, FiMail, FiLogIn } from "react-icons/fi";
import styles from "./LoginForm.module.css";
import CustomInput from "@/components/custom/CustomInput/CustomInput";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import { siteConfig } from "@/config/siteConfig";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.message || "Login failed");
      }

      toast.success("Welcome back!");
      router.push("/x9k2-control-panel/dashboard");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Invalid credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.logoMark}>PT</div>
        <h1 className={styles.title}>Admin Panel</h1>
        <p className={styles.subtitle}>{siteConfig.name}</p>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <CustomInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="admin@example.com"
            error={errors.email?.message}
            {...register("email")}
          />
          <CustomInput
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password")}
          />

          <CustomButton
            type="submit"
            variant="primary"
            size="lg"
            icon={FiLogIn}
            disabled={isSubmitting}
            fullWidth
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </CustomButton>
        </form>

        <div className={styles.securityNote}>
          <FiLock /> <span>This is a restricted area. Unauthorized access is prohibited.</span>
        </div>
      </div>
    </div>
  );
}