import styles from "./StatsSection.module.css";
import AnimatedCounter from "@/components/custom/AnimatedCounter/AnimatedCounter";
import { getSiteStats } from "@/lib/data/settings";

export default async function StatsSection() {
  const stats = await getSiteStats();

  // Section stays completely hidden until admin sets real stats via Settings page.
  if (!stats) return null;

  const statItems = [
    { id: 1, end: stats.projectsDelivered, suffix: "+", label: "Projects Delivered" },
    { id: 2, end: stats.happyClients, suffix: "+", label: "Happy Clients" },
    { id: 3, end: stats.yearsExperience, suffix: "+", label: "Years Experience" },
    { id: 4, end: stats.clientSatisfaction, suffix: "%", label: "Client Satisfaction" },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {statItems.map((stat) => (
            <AnimatedCounter key={stat.id} end={stat.end} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}