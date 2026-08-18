import styles from "./TestimonialsSection.module.css";
import SectionHeading from "@/components/custom/SectionHeading/SectionHeading";
import EmptyState from "@/components/custom/EmptyState/EmptyState";
import { FiMessageSquare } from "react-icons/fi";
import TestimonialsSlider from "./TestimonialsSlider";
import { getTestimonials } from "@/lib/data/testimonials";

export default async function TestimonialsSection() {
  const testimonials = await getTestimonials();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          eyebrow="Client Feedback"
          title="What Our Clients Say"
          subtitle="Real feedback from businesses we've worked with."
        />

        {testimonials.length === 0 ? (
          <EmptyState
            icon={FiMessageSquare}
            title="No Reviews Yet"
            message="Client testimonials will appear here as we complete more projects."
          />
        ) : (
          <TestimonialsSlider testimonials={testimonials} />
        )}
      </div>
    </section>
  );
}