// hooks/useTheme.js
//
// WHAT IS A HOOK?
// A hook is a special React function that lets you "plug in" a feature
// to any component. This one manages dark/light mode for the whole app.
//
// HOW THIS WORKS (plain English):
// 1. When the page loads, we check if the user already chose a theme
//    (stored in localStorage from their last visit).
// 2. If not, we check if their OS is in dark mode.
// 3. We apply the correct class to the <html> element.
// 4. We expose a `toggleTheme` function any component can call.

"use client"; // Required in Next.js App Router for hooks that use browser APIs

import { useState, useEffect } from "react";

export function useTheme() {
  // useState holds the current theme: "dark" or "light"
  // The function inside is the INITIAL value — it runs once on first load
  const [theme, setTheme] = useState(() => {
    // Safety check: localStorage only exists in the browser, not on the server
    if (typeof window === "undefined") return "light";

    // Step 1: Did the user pick a theme before? Use that.
    const saved = localStorage.getItem("portfolio-theme");
    if (saved) return saved;

    // Step 2: No saved preference — check the OS setting
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  // useEffect runs AFTER the component renders, whenever `theme` changes
  useEffect(() => {
    const root = document.documentElement; // This is the <html> element

    if (theme === "dark") {
      root.classList.add("dark");    // Tailwind reads this class for dark: styles
    } else {
      root.classList.remove("dark");
    }

    // Save the user's choice so it persists on refresh
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]); // The [theme] means: only re-run when `theme` changes

  // This function flips between dark and light
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // We return the current theme AND the toggle function
  // Any component that calls useTheme() gets access to both
  return { theme, toggleTheme };
}