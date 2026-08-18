import styles from "./ServicesList.module.css";
import ServiceDetailCard from "@/components/services/ServiceDetailCard/ServiceDetailCard";
import EmptyState from "@/components/custom/EmptyState/EmptyState";
import { FiGrid } from "react-icons/fi";
import { getServices } from "@/lib/data/services";

export default async function ServicesList() {
  const services = await getServices();

  if (services.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <EmptyState
            icon={FiGrid}
            title="Services Coming Soon"
            message="We're currently updating our full service offerings. Please check back shortly."
          />
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {services.map((service, index) => (
          <ServiceDetailCard
            key={service._id}
            service={service}
            reversed={index % 2 !== 0}
          />
        ))}
      </div>
    </section>
  );
}