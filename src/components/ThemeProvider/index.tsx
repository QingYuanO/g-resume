'use client'
import useThemeStore from "@/store/theme";
import React, { ReactNode } from "react";

export default function ThemeProvider({ children }: { children?: ReactNode }) {
  const theme = useThemeStore((state) => state.theme);
  return (
    <div className={`${theme} bg-background text-foreground w-full h-full`}>{children}</div>
  );
}
