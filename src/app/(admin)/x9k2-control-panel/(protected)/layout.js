"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import styles from "./protected-layout.module.css";
import AdminSidebar from "@/components/admin/layout/AdminSidebar/AdminSidebar";
import AdminHeader from "@/components/admin/layout/AdminHeader/AdminHeader";
import AdminFooter from "@/components/admin/layout/AdminFooter/AdminFooter";
import AdminMobileDrawer from "@/components/admin/layout/AdminMobileDrawer/AdminMobileDrawer";

export default function ProtectedAdminLayout({ children }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast.success("Logged out successfully");
      router.push("/x9k2-control-panel/login");
      router.refresh();
    } catch (error) {
      toast.error("Failed to logout. Try again.");
    }
  };

  return (
    <div className={styles.shell}>
      <AdminSidebar onLogout={handleLogout} />
      <AdminMobileDrawer onLogout={handleLogout} />

      <div className={styles.main}>
        <AdminHeader />
        <main className={styles.content}>{children}</main>
        <AdminFooter />
      </div>
    </div>
  );
}