// components/ui/TimelineItem.jsx
//
// WHAT THIS IS:
// A single job/experience entry in the timeline.
// It renders: dot on the line, role, company, dates, description, highlights, tags.
//
// PROPS:
// - experience  → one object from data.experience[]
// - index       → position in the array (0 = most recent)
// - isLast      → true for the final item (hides the connecting line below it)
//
// HOW THE VERTICAL LINE WORKS:
// The line is a `border-l-2` on the left side of a container div.
// Each dot is a circle (w-3 h-3 rounded-full) absolutely positioned
// on that border. It looks like:
//
//   ● ← dot sits on the line
//   │
//   ● ← next dot
//   │
//   ● ← last dot (no line below)

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, CalendarDays, MapPin, ChevronDown } from "lucide-react";

// Converts "2023-03" to "Mar 2023"
function formatDate(str) {
  if (!str) return "Present";
  const [y, m] = str.split("-");
  return new Date(Number(y), Number(m) - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

// Converts two date strings into a human duration: "2 yrs · 3 mos"
function getDuration(start, end) {
  const s = new Date(start.replace("-", "/") + "/01");
  const e = end ? new Date(end.replace("-", "/") + "/01") : new Date();
  const months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  const yrs = Math.floor(months / 12);
  const mos = months % 12;
  return [yrs && `${yrs} yr${yrs > 1 ? "s" : ""}`, mos && `${mos} mo${mos > 1 ? "s" : ""}`]
    .filter(Boolean)
    .join(" · ");
}

export function TimelineItem({ experience, index, isLast }) {
  // Toggle: show/hide the highlights list
  const [expanded, setExpanded] = useState(index === 0); // first item open by default

  const {
    role, company, type, location,
    startDate, endDate, current,
    description, highlights, techUsed,
  } = experience;

  return (
    // The outer div is `relative` so we can position the dot and the line
    <motion.div
      className="relative pl-7" // pl-7 = 28px left padding to make room for the dot+line
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
    >

      {/* ── VERTICAL LINE ── */}
      {/* Only drawn when this is NOT the last item */}
      {!isLast && (
        <div className="
          absolute left-[9px] top-5
          w-px bottom-0
          bg-gradient-to-b from-neutral-300 to-transparent
          dark:from-neutral-700 dark:to-transparent
        " />
        // left-[9px]: the line sits at 9px from the left (center of the 18px dot area)
        // top-5: starts below the dot
        // bg-gradient-to-b: fades out at the bottom — looks less abrupt
      )}

      {/* ── DOT ── */}
      <div className="
        absolute left-0 top-1
        w-[18px] h-[18px]
        flex items-center justify-center
      ">
        <div className={`
          w-3 h-3 rounded-full border-2
          transition-colors duration-300
          ${current
            // Current job: filled blue dot
            ? "bg-blue-500 border-blue-500 shadow-sm shadow-blue-500/50"
            // Past jobs: hollow dot with border
            : "bg-white dark:bg-neutral-950 border-neutral-300 dark:border-neutral-600"
          }
        `} />
      </div>

      {/* ── CARD CONTENT ── */}
      <div className="
        mb-6 pb-6
        border-b border-neutral-100 dark:border-neutral-800 last:border-0
      ">

        {/* TOP ROW: current badge + type pill */}
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          {current && (
            <span className="
              px-2 py-0.5 rounded-full
              text-[10px] font-semibold uppercase tracking-wide
              bg-blue-50 dark:bg-blue-950
              text-blue-600 dark:text-blue-400
              border border-blue-200 dark:border-blue-800
            ">
              Now
            </span>
          )}
          <span className="
            px-2 py-0.5 rounded-full
            text-[10px] font-medium
            bg-neutral-100 dark:bg-neutral-800
            text-neutral-500 dark:text-neutral-400
          ">
            {type}
          </span>
        </div>

        {/* ROLE */}
        <h3 className="
          text-[13px] font-semibold leading-snug
          text-neutral-900 dark:text-neutral-50
          mb-0.5
        ">
          {role}
        </h3>

        {/* COMPANY */}
        <div className="flex items-center gap-1 mb-2">
          <Briefcase size={11} className="text-neutral-400 flex-shrink-0" />
          <span className="text-[12px] font-medium text-neutral-600 dark:text-neutral-300">
            {company}
          </span>
        </div>

        {/* DATE RANGE + LOCATION */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
          <span className="flex items-center gap-1 text-[11px] text-neutral-400 dark:text-neutral-500">
            <CalendarDays size={11} className="flex-shrink-0" />
            {formatDate(startDate)} — {formatDate(endDate)}
            <span className="text-neutral-300 dark:text-neutral-600 mx-1">·</span>
            {getDuration(startDate, endDate)}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-neutral-400 dark:text-neutral-500">
            <MapPin size={11} className="flex-shrink-0" />
            {location}
          </span>
        </div>

        {/* DESCRIPTION */}
        <p className="text-[12px] text-neutral-500 dark:text-neutral-400 leading-relaxed mb-2">
          {description}
        </p>

        {/* EXPAND/COLLAPSE HIGHLIGHTS */}
        {highlights && highlights.length > 0 && (
          <div>
            <button
              onClick={() => setExpanded((p) => !p)}
              className="
                flex items-center gap-1
                text-[11px] font-medium
                text-blue-500 dark:text-blue-400
                hover:text-blue-600 dark:hover:text-blue-300
                transition-colors duration-150 mb-2
              "
              aria-expanded={expanded}
            >
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
              />
              {expanded ? "Hide" : "Show"} highlights
            </button>

            {/* AnimatePresence lets the list animate in/out smoothly */}
            <AnimatePresence>
              {expanded && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden space-y-1.5 mb-3"
                >
                  {highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[11.5px] text-neutral-500 dark:text-neutral-400 leading-relaxed"
                    >
                      {/* Small arrow bullet */}
                      <span className="text-blue-400 mt-0.5 flex-shrink-0">›</span>
                      {h}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* TECH TAGS */}
        {techUsed && techUsed.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {techUsed.map((tech) => (
              <span
                key={tech}
                className="
                  px-2 py-0.5 rounded-md
                  text-[10px] font-medium
                  bg-neutral-100 dark:bg-neutral-800
                  text-neutral-500 dark:text-neutral-400
                  border border-neutral-200 dark:border-neutral-700
                "
              >
                {tech}
              </span>
            ))}
          </div>
        )}

      </div>
    </motion.div>
  );
}