"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

async function fetchTestimonials() {
  const res = await fetch("/api/testimonials");
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Failed to fetch testimonials");
  return result.data;
}

export function useTestimonials() {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });
}

export function useCreateTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to create testimonial");
      return result.data;
    },
    onSuccess: () => {
      toast.success("Testimonial created successfully");
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
    onError: (err) => toast.error(err.message),
  });
}

export function useUpdateTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to update testimonial");
      return result.data;
    },
    onSuccess: () => {
      toast.success("Testimonial updated successfully");
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
    onError: (err) => toast.error(err.message),
  });
}

export function useDeleteTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to delete testimonial");
      return id;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["testimonials"] });
      const previous = queryClient.getQueryData(["testimonials"]);
      queryClient.setQueryData(["testimonials"], (old) => old?.filter((t) => t._id !== id));
      return { previous };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["testimonials"], context.previous);
      toast.error(err.message || "Failed to delete testimonial");
    },
    onSuccess: () => toast.success("Testimonial deleted"),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}