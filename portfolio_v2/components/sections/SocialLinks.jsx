// components/sections/SocialLinks.jsx
//
// Renders social platform links from data.socials.
// Uses lucide-react for the mail icon; other brand icons use Simple Icons CDN.

"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight, Share2 } from "lucide-react";
import data from "@/data/portfolio.json";

// Maps our JSON icon key to a Simple Icons CDN slug
const ICON_SLUG = {
  github:   "github",
  linkedin: "linkedin",
  twitter:  "x",        // Twitter rebranded to X
  devto:    "devdotto",
};

export function SocialLinks() {
  const visibleSocials = data.socials.filter((s) => s.display);

  return (
    <section id="socials" className="py-12">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Share2 size={13} className="text-indigo-500" />
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500">
          Connect
        </span>
      </div>
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-6">
        Find me online
      </h2>

      <div className="flex flex-col gap-2">
        {visibleSocials.map((social, i) => (
          <motion.a
            key={social.platform}
            href={social.url}
            target={social.icon === "mail" ? "_self" : "_blank"}
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
            whileHover={{ x: 4 }}
            className="group flex items-center gap-3 p-3.5 rounded-xl
              border border-neutral-200 dark:border-neutral-800
              bg-white dark:bg-neutral-900
              hover:border-neutral-300 dark:hover:border-neutral-600
              hover:shadow-sm dark:hover:shadow-black/20
              transition-all duration-200"
          >
            {/* Icon */}
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800
              flex items-center justify-center flex-shrink-0">
              {social.icon === "mail" ? (
                <Mail size={15} className="text-neutral-600 dark:text-neutral-400" />
              ) : (
                <img
                  src={`https://cdn.simpleicons.org/${ICON_SLUG[social.icon] ?? social.icon}`}
                  alt={social.platform}
                  className="w-4 h-4 object-contain dark:invert"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              )}
            </div>

            {/* Platform + handle */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                {social.platform}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                {social.handle}
              </p>
            </div>

            {/* Arrow — slides in on hover */}
            <ArrowUpRight size={15}
              className="text-neutral-300 dark:text-neutral-600
                group-hover:text-neutral-600 dark:group-hover:text-neutral-300
                transition-colors duration-200 flex-shrink-0" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}