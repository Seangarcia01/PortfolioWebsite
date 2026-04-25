// components/ui/ProjectCard.jsx
//
// WHAT THIS IS:
// A single project card. It receives one project object as a prop
// and renders the thumbnail, title, description, tech tags, and links.
//
// FRAMER MOTION CONCEPTS USED:
// - motion.div   → a regular <div> that can be animated
// - whileHover   → styles applied when the mouse is over it
// - initial      → the starting state before animation plays
// - whileInView  → animates when the card scrolls into view
// - transition   → controls speed, easing, delay of the animation

"use client";

import { motion } from "framer-motion";

// AFTER — FIXED
import { ExternalLink, Star } from "lucide-react"; // Github removed

// This is the animation config for each card fading up into view.
// We define it OUTSIDE the component so it's not recreated on every render.
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 24, // starts 24px below its final position
  },
  visible: {
    opacity: 1,
    y: 0,
    // transition applies to THIS specific animation (the scroll-in)
    transition: {
      duration: 0.45,
      ease: [0.25, 0.1, 0.25, 1], // cubic-bezier — feels natural, not robotic
    },
  },
};

export function ProjectCard({ project, index }) {
  // Destructure the fields we need from the project object
  const {
    title,
    description,
    tags,
    category,
    githubUrl,
    liveUrl,
    status,
    year,
    featured,
  } = project;

  // STATUS COLOR MAP
  // Maps the status string from JSON to a Tailwind color combo
  const statusColors = {
    Live:          "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
    "Open Source": "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
    "In Progress": "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    Archived:      "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",
  };

  return (
    // motion.div with whileInView triggers the fade-up when scrolled into view
    // viewport={{ once: true }} means it only animates once, not every scroll
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      // The delay staggers cards: card 0 = 0s, card 1 = 0.1s, card 2 = 0.2s
      // This creates a "cascade" effect when the section loads
      transition={{ delay: (index % 3) * 0.1 }}
      // whileHover lifts the card up slightly and deepens the shadow
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      className="group relative flex flex-col h-full
        bg-white dark:bg-neutral-900
        border border-neutral-200 dark:border-neutral-800
        rounded-2xl overflow-hidden
        shadow-sm hover:shadow-xl hover:shadow-black/8 dark:hover:shadow-black/40
        transition-shadow duration-300"
    >
      {/* ── CARD HEADER: color bar + category + number ── */}
      <div className="relative h-2 bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500" />

      <div className="flex flex-col flex-1 p-5 min-h-0">

        {/* Top row: category badge + year + featured star */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-medium tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
            {category}
          </span>
          <div className="flex items-center gap-2">
            {featured && (
              // Star icon only renders for featured: true projects
              <Star size={12} className="text-amber-400 fill-amber-400" aria-label="Featured project" />
            )}
            <span className="text-[11px] text-neutral-400 dark:text-neutral-500 font-mono">
              {year}
            </span>
          </div>
        </div>

        {/* Project title */}
        <h3 className="font-semibold text-[15px] text-neutral-900 dark:text-neutral-50 mb-2 leading-snug
          group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {title}
        </h3>

        {/* Description — flex-1 pushes tags and links to the bottom */}
        <p className="text-[13px] text-neutral-500 dark:text-neutral-400 leading-relaxed flex-1 mb-4">
          {description}
        </p>

        {/* Tech tags */}
        {/* flex-wrap lets tags wrap to a second line if there are many */}
        <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium
                bg-neutral-100 dark:bg-neutral-800
                text-neutral-600 dark:text-neutral-300
                border border-neutral-200 dark:border-neutral-700"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom row: status badge + action links */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800">

          {/* Status badge — color comes from our statusColors map above */}
          {/* Was removed to better showcase the website cleanly. TODO */}
          {/* <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${statusColors[status] ?? statusColors["Archived"]}`}>
            {status}
          </span> */}

          {/* Links — only render if the URL exists in the JSON */}
          <div className="flex items-center gap-1">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"       // opens in new tab
                rel="noopener noreferrer" // security best practice for target="_blank"
                aria-label={`${title} GitHub repository`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium
                  text-neutral-600 dark:text-neutral-300
                  hover:bg-neutral-100 dark:hover:bg-neutral-800
                  hover:text-neutral-900 dark:hover:text-white
                  transition-colors duration-150"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61
                    c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77
                    5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0
                    C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0
                    0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
                Code
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} live demo`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium
                  bg-blue-600 hover:bg-blue-700
                  text-white
                  transition-colors duration-150"
              >
                <ExternalLink size={13} />
                Demo
              </a>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}