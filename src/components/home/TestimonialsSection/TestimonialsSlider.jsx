"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { FiStar } from "react-icons/fi";
import CustomCard from "@/components/custom/CustomCard/CustomCard";
import styles from "./TestimonialsSection.module.css";

export default function TestimonialsSlider({ testimonials }) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={24}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 4500, disableOnInteraction: false }}
      breakpoints={{
        768: { slidesPerView: 2 },
        1100: { slidesPerView: 3 },
      }}
      className={styles.swiper}
    >
      {testimonials.map((t) => (
        <SwiperSlide key={t._id}>
          <CustomCard className={styles.testimonialCard}>
            <div className={styles.stars}>
              {Array.from({ length: t.rating || 5 }).map((_, i) => (
                <FiStar key={i} className={styles.star} />
              ))}
            </div>
            <p className={styles.reviewText}>&ldquo;{t.review}&rdquo;</p>
            <div className={styles.author}>
              {t.avatar && (
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={44}
                  height={44}
                  className={styles.avatar}
                />
              )}
              <div>
                <p className={styles.authorName}>{t.name}</p>
                <p className={styles.authorCompany}>{t.company}</p>
              </div>
            </div>
          </CustomCard>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}