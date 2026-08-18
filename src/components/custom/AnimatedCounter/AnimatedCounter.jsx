"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import styles from "./AnimatedCounter.module.css";

export default function AnimatedCounter({ end, suffix = "", label, duration = 2.5 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className={styles.wrapper}>
      <div className={styles.number}>
        {inView && <CountUp end={end} duration={duration} suffix={suffix} />}
        {!inView && <span>0{suffix}</span>}
      </div>
      <p className={styles.label}>{label}</p>
    </div>
  );
}