import StatsSettingsForm from "@/components/admin/settings/StatsSettingsForm/StatsSettingsForm";
import ChangePasswordForm from "@/components/admin/settings/ChangePasswordForm/ChangePasswordForm";

export const metadata = {
  title: "Settings | Admin Panel",
  robots: { index: false, follow: false },
};

export default function AdminSettingsPage() {
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "4px" }}>Settings</h2>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
          Manage site-wide stats and your admin account.
        </p>
      </div>
      <StatsSettingsForm />
      <ChangePasswordForm />
    </div>
  );
}