"use client";
import useThemeStore from "@/store/theme";
import React, { ReactNode, useEffect } from "react";

export default function ThemeProvider({ children }: { children?: ReactNode }) {
  const theme = useThemeStore((state) => state.theme);
  useEffect(() => {
    document.body.classList.remove(theme === "dark" ? "light" : "dark");
    document.body.classList.add(theme);
  }, [theme]);
  return null;
}
