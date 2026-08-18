"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiArrowRight, FiLayers, FiTrendingUp } from "react-icons/fi";
import styles from "./HeroSection.module.css";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import CustomBadge from "@/components/custom/CustomBadge/CustomBadge";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CustomBadge variant="highlight">Web Development Agency</CustomBadge>
          <h1 className={styles.heading}>
            Empowering Your Business With Modern Web Technology
          </h1>
          <p className={styles.subtext}>
            We design and build high-performance, scalable websites and web
            applications that help your business grow online — combining
            clean engineering with premium design.
          </p>
          <div className={styles.ctaGroup}>
            <CustomButton href="/contact" variant="primary" size="lg" icon={FiArrowRight}>
              Get Free Consultation
            </CustomButton>
            <CustomButton href="/services" variant="outline" size="lg">
              View Services
            </CustomButton>
          </div>
        </motion.div>

        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className={styles.imageFrame}>
            <Image
              src="/hero-visual.png"
              alt="Web development illustration"
              fill
              sizes="(max-width: 900px) 100vw, 500px"
              style={{ objectFit: "cover" }}
              priority
            />
            <div className={styles.floatIconOne}>
              <FiLayers />
            </div>
            <div className={styles.floatIconTwo}>
              <FiTrendingUp />
            </div>
          </div>
          <div className={styles.floatingBadge}>
            <span className={styles.badgeNumber}>100%</span>
            <span className={styles.badgeLabel}>Client Satisfaction</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}