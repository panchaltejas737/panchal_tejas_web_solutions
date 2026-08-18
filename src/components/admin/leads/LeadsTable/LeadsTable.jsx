"use client";

import { useState, useMemo } from "react";
import styles from "./LeadsTable.module.css";
import CustomBadge from "@/components/custom/CustomBadge/CustomBadge";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import Loader from "@/components/custom/Loader/Loader";
import EmptyState from "@/components/custom/EmptyState/EmptyState";
import LeadDetailModal from "@/components/admin/leads/LeadDetailModal/LeadDetailModal";
import { useLeads, useUpdateLeadStatus, useDeleteLead } from "@/hooks/admin/useLeads";
import { formatDate } from "@/lib/utils";
import { FiEye, FiTrash2, FiInbox, FiSearch, FiX } from "react-icons/fi";

const STATUS_VARIANT = {
  pending: "highlight",
  reviewed: "secondary",
  closed: "success",
};

const STATUS_OPTIONS = ["pending", "reviewed", "closed"];

export default function LeadsTable() {
  const { data: leads, isLoading, isError } = useLeads();
  const updateStatus = useUpdateLeadStatus();
  const deleteLead = useDeleteLead();

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedLead, setSelectedLead] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const hasActiveFilters =
    filter !== "all" || searchTerm.trim() !== "" || dateFrom !== "" || dateTo !== "" || sortOrder !== "newest";

  const handleClearFilters = () => {
    setFilter("all");
    setSearchTerm("");
    setDateFrom("");
    setDateTo("");
    setSortOrder("newest");
  };

  const filteredLeads = useMemo(() => {
    if (!leads) return [];

    let result = [...leads];

    // Status chip filter
    if (filter !== "all") {
      result = result.filter((lead) => lead.status === filter);
    }

    // Search across name, email, phone, subject
    if (searchTerm.trim() !== "") {
      const term = searchTerm.trim().toLowerCase();
      result = result.filter(
        (lead) =>
          lead.name.toLowerCase().includes(term) ||
          lead.email.toLowerCase().includes(term) ||
          lead.phone.toLowerCase().includes(term) ||
          lead.subject.toLowerCase().includes(term)
      );
    }

    // Date range filter
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      fromDate.setHours(0, 0, 0, 0);
      result = result.filter((lead) => new Date(lead.createdAt) >= fromDate);
    }
    if (dateTo) {
      const toDate = new Date(dateTo);
      toDate.setHours(23, 59, 59, 999);
      result = result.filter((lead) => new Date(lead.createdAt) <= toDate);
    }

    // Sort
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [leads, filter, searchTerm, dateFrom, dateTo, sortOrder]);

  if (isLoading) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader size="lg" />
      </div>
    );
  }

  if (isError) {
    return <p className={styles.errorText}>Failed to load leads. Please refresh the page.</p>;
  }

  const handleDelete = (id) => {
    deleteLead.mutate(id);
    setConfirmDeleteId(null);
  };

  return (
    <div className={styles.card}>
      <div className={styles.filterBar}>
        {["all", "pending", "reviewed", "closed"].map((status) => (
          <button
            key={status}
            className={`${styles.filterChip} ${filter === status ? styles.activeChip : ""}`}
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className={styles.toolsBar}>
        <div className={styles.searchWrapper}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by name, email, phone, or subject..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className={styles.clearSearchBtn} onClick={() => setSearchTerm("")} aria-label="Clear search">
              <FiX />
            </button>
          )}
        </div>

        <div className={styles.dateGroup}>
          <div className={styles.dateField}>
            <label>From</label>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className={styles.dateInput} />
          </div>
          <div className={styles.dateField}>
            <label>To</label>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className={styles.dateInput} />
          </div>
        </div>

        <select className={styles.sortSelect} value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>

        {hasActiveFilters && (
          <button className={styles.clearFiltersBtn} onClick={handleClearFilters}>
            <FiX /> Clear Filters
          </button>
        )}
      </div>

      <div className={styles.resultCount}>
        Showing {filteredLeads.length} of {leads.length} leads
      </div>

      {filteredLeads.length === 0 ? (
        <EmptyState icon={FiInbox} title="No Leads Found" message="No leads match your current filters." />
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead._id}>
                  <td>{lead.name}</td>
                  <td>
                    <div className={styles.contactCell}>
                      <span>{lead.email}</span>
                      <span className={styles.phoneText}>{lead.phone}</span>
                    </div>
                  </td>
                  <td className={styles.subjectCell}>{lead.subject}</td>
                  <td>
                    <select
                      className={styles.statusSelect}
                      value={lead.status}
                      onChange={(e) => updateStatus.mutate({ id: lead._id, status: e.target.value })}
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt.charAt(0).toUpperCase() + opt.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{formatDate(lead.createdAt)}</td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.iconBtn} onClick={() => setSelectedLead(lead)} aria-label="View lead">
                        <FiEye />
                      </button>
                      {confirmDeleteId === lead._id ? (
                        <div className={styles.confirmRow}>
                          <button className={styles.confirmYes} onClick={() => handleDelete(lead._id)}>
                            Confirm
                          </button>
                          <button className={styles.confirmNo} onClick={() => setConfirmDeleteId(null)}>
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          className={`${styles.iconBtn} ${styles.deleteBtn}`}
                          onClick={() => setConfirmDeleteId(lead._id)}
                          aria-label="Delete lead"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <LeadDetailModal lead={selectedLead} isOpen={!!selectedLead} onClose={() => setSelectedLead(null)} />
    </div>
  );
}