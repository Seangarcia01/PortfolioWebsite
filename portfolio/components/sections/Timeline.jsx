// components/sections/Timeline.jsx
//
// WHAT THIS IS:
// The sticky right-column sidebar. It maps over data.experience and
// renders a TimelineItem for each job.
//
// WHY STICKY?
// `sticky top-24 h-fit` means:
//   - `sticky`: the element scrolls WITH the page UNTIL it hits...
//   - `top-24`: ...24 * 4 = 96px from the top of the viewport (just below the header)
//   - `h-fit`: only as tall as its content (not full-page height)
//
// This means as you scroll the left column (About, Skills, Projects...),
// the Experience sidebar stays anchored in view — great UX for recruiters
// who want to see your history while reading your projects.
//
// HOW TO USE IN page.jsx:
// <aside className="hidden lg:block lg:sticky lg:top-24 lg:h-fit">
//   <Timeline />
// </aside>

"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness } from "lucide-react";
import { TimelineItem } from "@/components/ui/TimelineItem";
import data from "@/data/portfolio.json";

export function Timeline() {
  // Sort experience: current jobs first, then by most recent start date
  const sorted = [...data.experience].sort((a, b) => {
    if (a.current && !b.current) return -1;
    if (!a.current && b.current) return 1;
    return b.startDate.localeCompare(a.startDate);
  });

  // Total months worked across all roles — for the "X yrs experience" stat
  const totalMonths = data.experience.reduce((acc, exp) => {
    const s = new Date(exp.startDate.replace("-", "/") + "/01");
    const e = exp.endDate
      ? new Date(exp.endDate.replace("-", "/") + "/01")
      : new Date();
    return acc + (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  }, 0);
  const totalYears = (totalMonths / 12).toFixed(1);

  return (
    // The section itself is NOT sticky — the <aside> wrapper in page.jsx handles that
    <section id="experience" aria-label="Work experience">

      {/* ── HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <div className="flex items-center gap-2 mb-1">
          <BriefcaseBusiness size={13} className="text-orange-500" />
          <span className="text-xs font-semibold uppercase tracking-widest text-orange-500">
            Experience
          </span>
        </div>

        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 leading-tight">
          Work History
        </h2>

        {/* Quick stats row */}
        <div className="flex items-center gap-3 mt-2">
          <div className="text-center">
            <div className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
              {totalYears}
            </div>
            <div className="text-[10px] text-neutral-500 dark:text-neutral-400">yrs total</div>
          </div>
          <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-800" />
          <div className="text-center">
            <div className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
              {data.experience.length}
            </div>
            <div className="text-[10px] text-neutral-500 dark:text-neutral-400">roles</div>
          </div>
          <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-800" />
          <div className="text-center">
            <div className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
              {data.experience.filter((e) => e.type === "Full-time").length}
            </div>
            <div className="text-[10px] text-neutral-500 dark:text-neutral-400">full-time</div>
          </div>
        </div>
      </motion.div>

      {/* ── TIMELINE ITEMS ── */}
      <div>
        {sorted.map((exp, i) => (
          <TimelineItem
            key={exp.id}
            experience={exp}
            index={i}
            isLast={i === sorted.length - 1}
          />
        ))}
      </div>

      {/* ── FOOTER: started journey label ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="pl-7 mt-1"
      >
        <p className="text-[11px] text-neutral-400 dark:text-neutral-600 italic">
          Started coding in {new Date(
            Math.min(...data.experience.map((e) => new Date(e.startDate.replace("-", "/") + "/01")))
          ).getFullYear()}
        </p>
      </motion.div>

    </section>
  );
}