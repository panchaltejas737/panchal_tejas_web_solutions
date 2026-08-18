"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

async function fetchLeads() {
  const res = await fetch("/api/leads");
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Failed to fetch leads");
  return result.data;
}

export function useLeads() {
  return useQuery({
    queryKey: ["leads"],
    queryFn: fetchLeads,
  });
}

export function useUpdateLeadStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to update lead");
      return result.data;
    },
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ["leads"] });
      const previousLeads = queryClient.getQueryData(["leads"]);

      queryClient.setQueryData(["leads"], (old) =>
        old?.map((lead) => (lead._id === id ? { ...lead, status } : lead))
      );

      return { previousLeads };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["leads"], context.previousLeads);
      toast.error(err.message || "Failed to update status");
    },
    onSuccess: () => {
      toast.success("Lead status updated");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}

export function useDeleteLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to delete lead");
      return id;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["leads"] });
      const previousLeads = queryClient.getQueryData(["leads"]);

      queryClient.setQueryData(["leads"], (old) => old?.filter((lead) => lead._id !== id));

      return { previousLeads };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["leads"], context.previousLeads);
      toast.error(err.message || "Failed to delete lead");
    },
    onSuccess: () => {
      toast.success("Lead deleted");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}