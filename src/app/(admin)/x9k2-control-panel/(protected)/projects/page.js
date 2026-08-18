import ProjectsTable from "@/components/admin/projects/ProjectsTable/ProjectsTable";

export const metadata = {
  title: "Projects | Admin Panel",
  robots: { index: false, follow: false },
};

export default function AdminProjectsPage() {
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "4px" }}>Projects</h2>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
          Manage your portfolio projects shown on the public website.
        </p>
      </div>
      <ProjectsTable />
    </div>
  );
}