"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "./StatsSettingsForm.module.css";
import CustomInput from "@/components/custom/CustomInput/CustomInput";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import Loader from "@/components/custom/Loader/Loader";
import { useSettings, useUpdateSettings } from "@/hooks/admin/useSettings";

const settingsSchema = z.object({
  projectsDelivered: z.coerce.number().min(0, "Must be 0 or greater"),
  happyClients: z.coerce.number().min(0, "Must be 0 or greater"),
  yearsExperience: z.coerce.number().min(0, "Must be 0 or greater"),
  clientSatisfaction: z.coerce.number().min(0).max(100, "Must be between 0-100"),
});

export default function StatsSettingsForm() {
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(settingsSchema),
  });

  useEffect(() => {
    if (settings) {
      reset({
        projectsDelivered: settings.projectsDelivered,
        happyClients: settings.happyClients,
        yearsExperience: settings.yearsExperience,
        clientSatisfaction: settings.clientSatisfaction,
      });
    }
  }, [settings, reset]);

  const onSubmit = (data) => {
    updateSettings.mutate(data);
  };

  if (isLoading) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Homepage Stats</h3>
      <p className={styles.subtitle}>
        These numbers appear on your homepage and About page. Update them anytime — no fake or placeholder values are ever shown until you save real numbers here.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.grid}>
          <CustomInput
            label="Projects Delivered"
            name="projectsDelivered"
            type="number"
            error={errors.projectsDelivered?.message}
            {...register("projectsDelivered")}
          />
          <CustomInput
            label="Happy Clients"
            name="happyClients"
            type="number"
            error={errors.happyClients?.message}
            {...register("happyClients")}
          />
          <CustomInput
            label="Years Experience"
            name="yearsExperience"
            type="number"
            error={errors.yearsExperience?.message}
            {...register("yearsExperience")}
          />
          <CustomInput
            label="Client Satisfaction (%)"
            name="clientSatisfaction"
            type="number"
            error={errors.clientSatisfaction?.message}
            {...register("clientSatisfaction")}
          />
        </div>

        <CustomButton type="submit" variant="primary" disabled={updateSettings.isPending}>
          {updateSettings.isPending ? "Saving..." : "Save Stats"}
        </CustomButton>
      </form>
    </div>
  );
}