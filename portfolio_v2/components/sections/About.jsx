// components/sections/About.jsx
"use client";

import { motion } from "framer-motion";
import { Download, Briefcase } from "lucide-react";
import data from "@/data/portfolio.json";

export function About() {
  const { name, bio, resumeUrl, availableForWork, title } = data.profile;

  return (
    <section id="about" className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-3">
          <Briefcase size={13} className="text-violet-500" />
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-500">
            About Me
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
          Hi, I&apos;m {name} 👋
        </h2>

        {/* Bio */}
        <p className="text-[15px] text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl mb-6">
          {bio}
        </p>

        {/* Availability badge + Resume button */}
        <div className="flex flex-wrap items-center gap-3">
          {availableForWork && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
              bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400
              border border-emerald-200 dark:border-emerald-800">
              {/* Pulsing green dot */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for work
            </span>
          )}

          {resumeUrl && (
            <a
              href={resumeUrl}
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                bg-neutral-900 dark:bg-neutral-50
                text-white dark:text-neutral-900
                hover:bg-neutral-700 dark:hover:bg-neutral-200
                transition-colors duration-200"
            >
              <Download size={14} />
              Download Resume
            </a>
          )}
        </div>

        {/* Quick stat pills */}
        <div className="flex flex-wrap gap-3 mt-6">
          {[
            { label: "Years exp.",   value: "4+"  },
            { label: "Projects",     value: `${data.projects.length}` },
            { label: "Certifications", value: `${data.certifications.length}` },
          ].map((stat) => (
            <div key={stat.label}
              className="px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800
                bg-neutral-50 dark:bg-neutral-900 text-center min-w-[80px]">
              <div className="text-xl font-bold text-neutral-900 dark:text-neutral-50">{stat.value}</div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}