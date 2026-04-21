/** @type {import('tailwindcss').Config} */
module.exports = {

  // CRITICAL: makes dark: classes activate when <html> has class="dark"
  darkMode: "class",

  // Tells Tailwind which files to scan for class names
  // (unused classes are stripped in production — keeps CSS tiny)
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      // Font variable — matches what you'll set in layout.js
      fontFamily: {
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
      },

      // Smooth max-width container for your content
      maxWidth: {
        "portfolio": "1100px",
      },

      // Custom animation for dropdowns and modals
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in":    "fadeIn 0.2s ease",
        "slide-down": "slideDown 0.15s ease",
        "slide-up":   "slideUp 0.3s ease both",
      },
    },
  },

  plugins: [],
};
