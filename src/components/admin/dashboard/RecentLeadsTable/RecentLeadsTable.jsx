import Link from "next/link";
import styles from "./RecentLeadsTable.module.css";
import CustomBadge from "@/components/custom/CustomBadge/CustomBadge";
import EmptyState from "@/components/custom/EmptyState/EmptyState";
import { FiInbox } from "react-icons/fi";
import { formatDate } from "@/lib/utils";

const STATUS_VARIANT = {
  pending: "highlight",
  reviewed: "secondary",
  closed: "success",
};

export default function RecentLeadsTable({ leads }) {
  if (!leads || leads.length === 0) {
    return (
      <div className={styles.card}>
        <EmptyState icon={FiInbox} title="No Leads Yet" message="New inquiries from your website will appear here." />
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Recent Leads</h3>
        <Link href="/x9k2-control-panel/leads" className={styles.viewAll}>
          View All
        </Link>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.name}</td>
                <td className={styles.subjectCell}>{lead.subject}</td>
                <td>
                  <CustomBadge variant={STATUS_VARIANT[lead.status]}>{lead.status}</CustomBadge>
                </td>
                <td>{formatDate(lead.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}