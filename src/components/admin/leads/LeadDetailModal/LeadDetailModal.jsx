import CustomModal from "@/components/custom/CustomModal/CustomModal";
import CustomBadge from "@/components/custom/CustomBadge/CustomBadge";
import styles from "./LeadDetailModal.module.css";
import { formatDate } from "@/lib/utils";
import { FiMail, FiPhone, FiCalendar } from "react-icons/fi";

const STATUS_VARIANT = {
  pending: "highlight",
  reviewed: "secondary",
  closed: "success",
};

export default function LeadDetailModal({ lead, isOpen, onClose }) {
  if (!lead) return null;

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Lead Details">
      <div className={styles.wrapper}>
        <div className={styles.headerRow}>
          <h3 className={styles.name}>{lead.name}</h3>
          <CustomBadge variant={STATUS_VARIANT[lead.status]}>{lead.status}</CustomBadge>
        </div>

        <div className={styles.metaRow}>
          <span><FiMail /> {lead.email}</span>
          <span><FiPhone /> {lead.phone}</span>
          <span><FiCalendar /> {formatDate(lead.createdAt)}</span>
        </div>

        <div className={styles.block}>
          <span className={styles.blockLabel}>Subject</span>
          <p className={styles.blockValue}>{lead.subject}</p>
        </div>

        <div className={styles.block}>
          <span className={styles.blockLabel}>Message</span>
          <p className={styles.messageText}>{lead.message}</p>
        </div>
      </div>
    </CustomModal>
  );
}