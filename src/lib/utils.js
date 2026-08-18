import clsx from "clsx";

export function cn(...inputs) {
  return clsx(...inputs);
}

export function truncateText(text = "", maxLength = 120) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}