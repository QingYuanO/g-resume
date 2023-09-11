"use client";
import useThemeStore from "@/store/theme";
import React from "react";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggleBtn() {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const theme = useThemeStore((state) => state.theme);
  return (
    <Button
      variant="outline"
      className=" fixed bottom-32 right-4 z-50 flex-shrink-0 rounded-full opacity-90 shadow md:relative md:bottom-0 md:right-0"
      onClick={() => toggleTheme()}
      size="icon"
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </Button>
  );
}
