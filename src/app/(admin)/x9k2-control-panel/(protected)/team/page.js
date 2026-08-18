import TeamTable from "@/components/admin/team/TeamTable/TeamTable";

export const metadata = {
  title: "Team | Admin Panel",
  robots: { index: false, follow: false },
};

export default function AdminTeamPage() {
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "4px" }}>Team</h2>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
          Manage team members displayed on the About page.
        </p>
      </div>
      <TeamTable />
    </div>
  );
}