"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggleBtn() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();
  useEffect(() => {
    if (theme === "system") {
      const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
      if (themeMedia.matches) {
        setTheme("light");
      } else {
        setTheme("dark");
      }
    }
    setMounted(true);
  }, [setTheme, theme]);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outline"
      className=" fixed bottom-32 right-4 z-50 flex-shrink-0 rounded-full opacity-90 shadow md:relative md:bottom-0 md:right-0"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      size="icon"
    >
      {theme === "light" ? <Sun /> : <Moon />}
    </Button>
  );
}
