import styles from "./LocationMap.module.css";
import SectionHeading from "@/components/custom/SectionHeading/SectionHeading";
import { siteConfig } from "@/config/siteConfig";

export default function LocationMap() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          eyebrow="Find Us"
          title="Our Location"
          subtitle="Visit us or drop a message — we're happy to connect."
        />

        <div className={styles.mapWrapper}>
          <iframe
            src={siteConfig.map.embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${siteConfig.name} Location Map`}
          />
        </div>
      </div>
    </section>
  );
}