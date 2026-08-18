import LeadsTable from "@/components/admin/leads/LeadsTable/LeadsTable";

export const metadata = {
  title: "Leads | Admin Panel",
  robots: { index: false, follow: false },
};

export default function AdminLeadsPage() {
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "4px" }}>Leads</h2>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
          Manage and respond to inquiries submitted through your website.
        </p>
      </div>
      <LeadsTable />
    </div>
  );
}