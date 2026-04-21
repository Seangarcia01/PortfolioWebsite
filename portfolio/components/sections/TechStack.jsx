// components/sections/TechStack.jsx
//
// Renders a grid of tech icons from data.techStack.
// Uses https://cdn.simpleicons.org/{slug} for brand logos — free, no install needed.
// The slug is the icon name from simple-icons.org (e.g. "nextdotjs", "tailwindcss").

"use client";

import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import data from "@/data/portfolio.json";

// Maps our JSON icon keys to Simple Icons slugs.
// Full list: https://simpleicons.org
const ICON_SLUG_MAP = {
  react:      "react",
  nextjs:     "nextdotjs",
  typescript: "typescript",
  tailwind:   "tailwindcss",
  nodejs:     "nodedotjs",
  postgresql: "postgresql",
  docker:     "docker",
  supabase:   "supabase",
  figma:      "figma",
  vercel:     "vercel",
  mongodb:    "mongodb",
  laravel:    "laravel",
  aws:        "amazonaws",
  github:     "github",
};

export function TechStack() {
  return (
    <section id="tech-stack" className="py-12">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-2">
        <Cpu size={13} className="text-cyan-500" />
        <span className="text-xs font-semibold uppercase tracking-widest text-cyan-500">
          Tech Stack
        </span>
      </div>
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-1">
        Tools I work with
      </h2>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8">
        My go-to technologies for building full stack applications.
      </p>

      {/* Icon grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
        {data.techStack.map((tech, i) => {
          const slug = ICON_SLUG_MAP[tech.icon] ?? tech.icon;
          const iconUrl = `https://cdn.simpleicons.org/${slug}`;

          return (
            <motion.a
              key={tech.name}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tech.name}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ scale: 1.1, y: -3 }}
              className="flex flex-col items-center gap-2 p-3 rounded-xl
                border border-neutral-200 dark:border-neutral-800
                bg-white dark:bg-neutral-900
                hover:border-neutral-300 dark:hover:border-neutral-600
                hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/30
                transition-shadow duration-200 group"
            >
              {/* Simple Icons CDN — automatically coloured to the brand colour */}
              <img
                src={iconUrl}
                alt={tech.name}
                className="w-7 h-7 object-contain dark:invert"
                // dark:invert flips white icons to black and vice versa
                // not perfect for all logos but works for most
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <span className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400
                group-hover:text-neutral-700 dark:group-hover:text-neutral-200
                transition-colors text-center leading-tight">
                {tech.name}
              </span>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}