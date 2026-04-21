// components/ui/ThemeToggle.jsx
//
// WHAT THIS DOES:
// A single button that shows a Sun icon in dark mode (click to go light)
// and a Moon icon in light mode (click to go dark).
// Uses lucide-react for the icons (run: npm i lucide-react)

"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      // aria-label is important for accessibility — screen readers will read this
      className="
        relative flex items-center justify-center
        w-9 h-9 rounded-full
        bg-neutral-100 dark:bg-neutral-800
        text-neutral-600 dark:text-neutral-300
        hover:bg-neutral-200 dark:hover:bg-neutral-700
        hover:scale-110
        transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
      "
    >
      {/* We show Sun in dark mode (because clicking it goes to light) */}
      {/* We show Moon in light mode (because clicking it goes to dark) */}
      {theme === "dark" ? (
        <Sun size={16} strokeWidth={2} />
      ) : (
        <Moon size={16} strokeWidth={2} />
      )}
    </button>
  );
}