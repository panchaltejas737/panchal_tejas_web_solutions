import TestimonialsTable from "@/components/admin/testimonials/TestimonialsTable/TestimonialsTable";

export const metadata = {
  title: "Testimonials | Admin Panel",
  robots: { index: false, follow: false },
};

export default function AdminTestimonialsPage() {
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "4px" }}>Testimonials</h2>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
          Manage client reviews displayed on your public website.
        </p>
      </div>
      <TestimonialsTable />
    </div>
  );
}