// components/sections/Skills.jsx
//
// Renders skills grouped by category (Frontend / Backend / Tools).
// Each skill has an animated progress bar driven by the `level` value in JSON.
//
// KEY CONCEPT: The bar animation uses CSS `width` transition triggered by
// whileInView. The bar starts at width 0, then animates to the level %.

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import data from "@/data/portfolio.json";

const CATEGORIES = ["frontend", "backend", "tools"];

// Human-friendly label for each category key
const LABELS = {
  frontend: "Frontend",
  backend:  "Backend",
  tools:    "Tools & DevOps",
};

// Color for the progress bar per category
const BAR_COLORS = {
  frontend: "from-blue-500 to-violet-500",
  backend:  "from-emerald-500 to-cyan-500",
  tools:    "from-orange-400 to-pink-500",
};

export function Skills() {
  const [activeTab, setActiveTab] = useState("frontend");
  const skills = data.skills[activeTab] ?? [];

  return (
    <section id="skills" className="py-12">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Zap size={13} className="text-amber-500" />
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
          Skills
        </span>
      </div>
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-6">
        What I know
      </h2>

      {/* Category tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200
              ${activeTab === cat
                ? "bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
          >
            {LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Skill bars */}
      {/* AnimatePresence here would require importing it — for simplicity we use a key */}
      <motion.div
        key={activeTab}  // re-mounts when tab changes, replaying animations
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col gap-4"
      >
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
          >
            {/* Name + percentage */}
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {skill.name}
              </span>
              <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                {skill.level}%
              </span>
            </div>

            {/* Track (grey background) */}
            <div className="h-1.5 w-full rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
              {/* Filled bar — animates from 0 to the skill level */}
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${BAR_COLORS[activeTab]}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.07, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}