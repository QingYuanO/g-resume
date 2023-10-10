"use client";
import React from "react";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes"

export default function ThemeToggleBtn() {
  const { setTheme,theme } = useTheme()
  return (
    <Button
      variant="outline"
      className=" fixed bottom-32 right-4 z-50 flex-shrink-0 rounded-full opacity-90 shadow md:relative md:bottom-0 md:right-0"
      onClick={() => setTheme(theme === "light" ? 'dark' : 'light')}
      size="icon"
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </Button>
  );
}
