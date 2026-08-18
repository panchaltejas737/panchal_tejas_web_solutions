import ServicesTable from "@/components/admin/services/ServicesTable/ServicesTable";

export const metadata = {
  title: "Services | Admin Panel",
  robots: { index: false, follow: false },
};

export default function AdminServicesPage() {
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "4px" }}>Services</h2>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
          Manage the services displayed on your public website.
        </p>
      </div>
      <ServicesTable />
    </div>
  );
}