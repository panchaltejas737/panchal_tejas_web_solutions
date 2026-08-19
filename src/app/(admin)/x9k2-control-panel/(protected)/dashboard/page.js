import styles from "./dashboard-page.module.css";
import StatCard from "@/components/admin/dashboard/StatCard/StatCard";
import RecentLeadsTable from "@/components/admin/dashboard/RecentLeadsTable/RecentLeadsTable";
import dbConnect from "@/lib/dbConnect";
import Lead from "@/models/Lead";
import Service from "@/models/Service";
import Project from "@/models/Project";
import Testimonial from "@/models/Testimonial";
import { FiInbox, FiClock, FiLayers, FiFolder, FiMessageSquare } from "react-icons/fi";

// Admin data must always be live/fresh — never cache this page.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard | Admin Panel",
  robots: { index: false, follow: false },
};

async function getDashboardData() {
  try {
    await dbConnect();

    const [totalLeads, pendingLeads, totalServices, totalProjects, totalTestimonials, recentLeads] =
      await Promise.all([
        Lead.countDocuments(),
        Lead.countDocuments({ status: "pending" }),
        Service.countDocuments(),
        Project.countDocuments(),
        Testimonial.countDocuments(),
        Lead.find().sort({ createdAt: -1 }).limit(5).lean(),
      ]);

    return {
      totalLeads,
      pendingLeads,
      totalServices,
      totalProjects,
      totalTestimonials,
      recentLeads: JSON.parse(JSON.stringify(recentLeads)),
    };
  } catch (error) {
    console.error("Dashboard data fetch error:", error);
    return {
      totalLeads: 0,
      pendingLeads: 0,
      totalServices: 0,
      totalProjects: 0,
      totalTestimonials: 0,
      recentLeads: [],
    };
  }
}

export default async function AdminDashboardPage() {
  const data = await getDashboardData();

  return (
    <div>
      <div className={styles.welcome}>
        <h2 className={styles.welcomeTitle}>Welcome back 👋</h2>
        <p className={styles.welcomeSubtitle}>Here&apos;s what&apos;s happening with your website.</p>
      </div>

      <div className={styles.statsGrid}>
        <StatCard icon={FiInbox} label="Total Leads" value={data.totalLeads} accent="primary" />
        <StatCard icon={FiClock} label="Pending Leads" value={data.pendingLeads} accent="highlight" />
        <StatCard icon={FiLayers} label="Services" value={data.totalServices} accent="secondary" />
        <StatCard icon={FiFolder} label="Projects" value={data.totalProjects} accent="success" />
        <StatCard icon={FiMessageSquare} label="Testimonials" value={data.totalTestimonials} accent="primary" />
      </div>

      <RecentLeadsTable leads={data.recentLeads} />
    </div>
  );
}