"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/store/themeStore";

export function useTheme() {
  const { theme, setTheme, toggleTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return { theme, setTheme, toggleTheme };
}