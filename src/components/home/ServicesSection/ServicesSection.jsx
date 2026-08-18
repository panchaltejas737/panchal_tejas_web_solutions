import styles from "./ServicesSection.module.css";
import SectionHeading from "@/components/custom/SectionHeading/SectionHeading";
import CustomCard from "@/components/custom/CustomCard/CustomCard";
import EmptyState from "@/components/custom/EmptyState/EmptyState";
import { FiGrid } from "react-icons/fi";
import { getServices } from "@/lib/data/services";
import { getIconComponent } from "@/lib/iconMap";

export default async function ServicesSection() {
  const services = (await getServices()).slice(0, 6); // homepage shows top 6

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          eyebrow="What We Do"
          title="Our Services"
          subtitle="End-to-end digital solutions tailored to help your business scale — from concept to deployment."
        />

        {services.length === 0 ? (
          <EmptyState
            icon={FiGrid}
            title="Services Coming Soon"
            message="We're currently updating our service offerings. Please check back shortly."
          />
        ) : (
          <div className={styles.grid}>
            {services.map((service) => {
              const Icon = getIconComponent(service.icon);
              return (
                <CustomCard key={service._id} className={styles.card}>
                  <Icon className={styles.cardIcon} />
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDesc}>{service.description}</p>
                </CustomCard>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}