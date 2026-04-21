// components/sections/Projects.jsx
//
// WHAT THIS IS:
// The full Projects section. It:
//  1. Reads projects from portfolio.json
//  2. Shows featured projects first with a "⭐ Featured" highlight
//  3. Has filter tabs (All / Web App / CLI Tool / E-commerce…)
//  4. Animates the grid when filters change (AnimatePresence)
//
// NEW FRAMER MOTION CONCEPT: AnimatePresence
// When items are added/removed from the DOM (e.g. filtering),
// AnimatePresence lets them animate OUT before disappearing.
// Without it, items just vanish instantly.

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers } from "lucide-react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import data from "@/data/portfolio.json";

export function Projects() {
  // activeFilter controls which category tab is selected
  // "All" shows every project
  const [activeFilter, setActiveFilter] = useState("All");

  // Build the list of filter tabs dynamically from the JSON data
  // 1. Map each project to its category: ["Web App", "Web App", "CLI Tool", …]
  // 2. new Set() removes duplicates: {"Web App", "CLI Tool", "E-commerce"}
  // 3. Spread into an array and add "All" at the front
  const categories = [
    "All",
    ...new Set(data.projects.map((p) => p.category)),
  ];

  // Filter the projects array based on the active tab
  // If "All" is selected, show everything. Otherwise match the category.
  const filteredProjects =
    activeFilter === "All"
      ? data.projects
      : data.projects.filter((p) => p.category === activeFilter);

  // Featured projects — shown in a highlight row above the main grid
  const featuredProjects = data.projects.filter((p) => p.featured);

  return (
    // id="projects" is what the nav dropdown links to
    <section id="projects" className="py-16">

      {/* ── SECTION HEADER ── */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          {/* Eyebrow label above the heading */}
          <div className="flex items-center gap-2 mb-2">
            <Layers size={14} className="text-blue-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
              Work
            </span>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 leading-tight">
            Projects
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {data.projects.length} projects · {featuredProjects.length} featured
          </p>
        </div>

        {/* ── FILTER TABS ── */}
        {/* These are just buttons that update activeFilter state */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`
                px-3.5 py-1.5 rounded-full text-xs font-medium
                transition-all duration-200
                ${activeFilter === cat
                  // Active tab: filled style
                  ? "bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 shadow-sm"
                  // Inactive tab: ghost style
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── FEATURED BANNER (only visible on "All" tab) ── */}
      {activeFilter === "All" && featuredProjects.length > 0 && (
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-500 mb-3 flex items-center gap-1.5">
            <span>⭐</span> Featured
          </p>
          {/* Featured projects get a 2-column layout on medium screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* ── MAIN GRID ── */}
      {/*
        AnimatePresence mode="popLayout":
        - "popLayout" = when a card is removed, the remaining cards
          smoothly slide into the gap. This is what makes the filter
          feel fluid instead of janky.
      */}
      <AnimatePresence mode="popLayout">

        {/* Divider + "All Projects" label when in All tab */}
        {activeFilter === "All" && (
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
            <span className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-widest whitespace-nowrap">
              All Projects
            </span>
            <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
          </div>
        )}

        {filteredProjects.length > 0 ? (
          // Responsive grid: 1 col mobile → 2 col tablet → 3 col desktop
          <motion.div
            // key changes when the filter changes, which re-triggers the animation
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredProjects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
              />
            ))}
          </motion.div>
        ) : (
          // Empty state — shown when no projects match the filter
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-neutral-400 dark:text-neutral-600"
          >
            <p className="text-4xl mb-3">🗂️</p>
            <p className="text-sm font-medium">No projects in this category yet.</p>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}