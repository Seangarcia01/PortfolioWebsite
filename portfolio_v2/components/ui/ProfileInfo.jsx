// components/ui/ProfileInfo.jsx
//
// WHAT THIS IS:
// The centre column of the Header. Shows your name, location, and occupation.
// Reads directly from portfolio.json so you never hard-code personal details.
//
// LAYOUT:
//   Alex Rivera                ← name (h1 for SEO — only one h1 per page)
//   📍 Manila, PH  ·  💼 Full Stack Developer   ← meta row
//
// On mobile the occupation label is shortened to avoid overflow.
// On sm+ screens the full occupation string is shown.

"use client";

import { motion } from "framer-motion";
import { MapPin, Briefcase } from "lucide-react";
import data from "@/data/portfolio.json";

// Animation: each child staggers in slightly after the previous
// `custom` prop lets us pass the index (0, 1, 2) to the variant
const itemVariants = {
  hidden:  { opacity: 0, y: -6 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.08, // 0s, 0.08s, 0.16s — creates a subtle cascade
      ease: "easeOut",
    },
  }),
};

export function ProfileInfo() {
  const { name, location, occupation, title } = data.profile;

  // Shorten the occupation for small screens
  // "Full Stack Developer" → "Developer"
  // We take the last word — works for most job titles
  const shortOccupation = occupation.split(" ").at(-1);

  return (
    <div className="text-center min-w-0 px-1">

      {/* ── NAME ── */}
      {/*
        This is an <h1> — the most important heading on the page.
        There should only be one <h1> per page (SEO rule).
        `truncate` stops long names from overflowing on small screens.
      */}
      <motion.h1
        custom={0}           // passed as `i` to itemVariants
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="
          font-semibold leading-tight truncate
          text-sm sm:text-[15px]
          text-neutral-900 dark:text-neutral-50
          tracking-tight
        "
      >
        {name}
      </motion.h1>

      {/* ── META ROW: location + divider dot + occupation ── */}
      <motion.div
        custom={1}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="
          flex items-center justify-center
          flex-wrap gap-x-2.5 gap-y-0.5
          mt-0.5
        "
      >
        {/* LOCATION */}
        <span className="
          flex items-center gap-1
          text-[11px] text-neutral-500 dark:text-neutral-400
          whitespace-nowrap
        ">
          <MapPin
            size={10}
            className="text-rose-400 flex-shrink-0"
            aria-hidden="true"
          />
          {location}
        </span>

        {/* DOT DIVIDER — hidden on very small screens */}
        <span
          aria-hidden="true"
          className="hidden xs:block w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600"
        />

        {/* OCCUPATION */}
        <span className="
          flex items-center gap-1
          text-[11px] text-neutral-500 dark:text-neutral-400
          whitespace-nowrap
        ">
          <Briefcase
            size={10}
            className="text-blue-400 flex-shrink-0"
            aria-hidden="true"
          />
          {/* Full label on sm+, shortened on xs */}
          <span className="hidden sm:inline">{occupation}</span>
          <span className="sm:hidden">{shortOccupation}</span>
        </span>
      </motion.div>

      {/* ── TITLE BADGE (optional) ── */}
      {/* A subtle pill under the meta row — shows your role at a glance */}
      <motion.div
        custom={2}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="flex justify-center mt-1.5"
      >
        <span className="
          inline-block
          px-2.5 py-0.5
          rounded-full
          text-[10px] font-medium
          bg-blue-50 dark:bg-blue-950
          text-blue-600 dark:text-blue-400
          border border-blue-100 dark:border-blue-900
          whitespace-nowrap
        ">
          {title}
        </span>
      </motion.div>

    </div>
  );
}