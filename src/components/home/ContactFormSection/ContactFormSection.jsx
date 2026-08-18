"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import styles from "./ContactFormSection.module.css";
import SectionHeading from "@/components/custom/SectionHeading/SectionHeading";
import CustomInput from "@/components/custom/CustomInput/CustomInput";
import CustomTextarea from "@/components/custom/CustomTextarea/CustomTextarea";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import CustomCard from "@/components/custom/CustomCard/CustomCard";
import { FiSend, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { siteConfig } from "@/config/siteConfig";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(15, "Enter a valid phone number"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactFormSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.message || "Something went wrong");
      }

      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch (error) {
      toast.error(error.message || "Failed to send message. Try again.");
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's Start Your Project"
          subtitle="Fill out the form below and our team will get back to you within 24 hours."
        />

        <div className={styles.grid}>
          <CustomCard className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Contact Information</h3>
            <div className={styles.infoItem}>
              <FiMail /> <span>{siteConfig.contact.email}</span>
            </div>
            <div className={styles.infoItem}>
              <FiPhone /> <span>{siteConfig.contact.phone}</span>
            </div>
            <div className={styles.infoItem}>
              <FiMapPin /> <span>{siteConfig.contact.address}</span>
            </div>
          </CustomCard>

          <CustomCard className={styles.formCard}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className={styles.row}>
                <CustomInput
                  label="Full Name"
                  name="name"
                  placeholder="Enter Your Name"
                  error={errors.name?.message}
                  {...register("name")}
                />
                <CustomInput
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Enter Your Email"
                  error={errors.email?.message}
                  {...register("email")}
                />
              </div>

              <div className={styles.row}>
                <CustomInput
                  label="Phone Number"
                  name="phone"
                  placeholder="Enter Your Phone Number"
                  error={errors.phone?.message}
                  {...register("phone")}
                />
                <CustomInput
                  label="Subject"
                  name="subject"
                  placeholder="Enter Your Subject"
                  error={errors.subject?.message}
                  {...register("subject")}
                />
              </div>

              <CustomTextarea
                label="Message"
                name="message"
                placeholder="Enter Message In Details"
                error={errors.message?.message}
                {...register("message")}
              />

              <CustomButton
                type="submit"
                variant="primary"
                size="lg"
                icon={FiSend}
                disabled={isSubmitting}
                fullWidth
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </CustomButton>
            </form>
          </CustomCard>
        </div>
      </div>
    </section>
  );
}