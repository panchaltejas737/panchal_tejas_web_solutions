"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

async function fetchTeamMembers() {
  const res = await fetch("/api/team");
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Failed to fetch team members");
  return result.data;
}

export function useTeamMembers() {
  return useQuery({
    queryKey: ["team"],
    queryFn: fetchTeamMembers,
  });
}

export function useCreateTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const res = await fetch("/api/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to create team member");
      return result.data;
    },
    onSuccess: () => {
      toast.success("Team member added successfully");
      queryClient.invalidateQueries({ queryKey: ["team"] });
    },
    onError: (err) => toast.error(err.message),
  });
}

export function useUpdateTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await fetch(`/api/team/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to update team member");
      return result.data;
    },
    onSuccess: () => {
      toast.success("Team member updated successfully");
      queryClient.invalidateQueries({ queryKey: ["team"] });
    },
    onError: (err) => toast.error(err.message),
  });
}

export function useDeleteTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to delete team member");
      return id;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["team"] });
      const previous = queryClient.getQueryData(["team"]);
      queryClient.setQueryData(["team"], (old) => old?.filter((m) => m._id !== id));
      return { previous };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["team"], context.previous);
      toast.error(err.message || "Failed to delete team member");
    },
    onSuccess: () => toast.success("Team member deleted"),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["team"] }),
  });
}