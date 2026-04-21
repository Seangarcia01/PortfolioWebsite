// components/sections/Certifications.jsx
//
// Renders certification cards from data.certifications.
// Featured certs appear first with a gold ring.
// Each card has issuer, date range, credential ID, and a verify link.

"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";
import data from "@/data/portfolio.json";

// Formats "2024-01" → "Jan 2024"
function formatDate(dateStr) {
  if (!dateStr) return "No Expiry";
  const [year, month] = dateStr.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function Certifications() {
  // Sort: featured first, then by issue date descending
  const sorted = [...data.certifications].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.issueDate.localeCompare(a.issueDate);
  });

  return (
    <section id="certifications" className="py-12">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Award size={13} className="text-rose-500" />
        <span className="text-xs font-semibold uppercase tracking-widest text-rose-500">
          Certifications
        </span>
      </div>
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-8">
        Credentials
      </h2>

      <div className="flex flex-col gap-3">
        {sorted.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className={`relative flex items-start gap-4 p-4 rounded-2xl
              border transition-all duration-200
              bg-white dark:bg-neutral-900
              hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/30
              ${cert.featured
                ? "border-amber-300 dark:border-amber-700"
                : "border-neutral-200 dark:border-neutral-800"
              }`}
          >
            {/* Featured crown badge */}
            {cert.featured && (
              <span className="absolute -top-2 -right-2 bg-amber-400 text-[9px] font-bold
                text-amber-900 px-2 py-0.5 rounded-full uppercase tracking-wide">
                ⭐ Top
              </span>
            )}

            {/* Icon placeholder (replace with <img src={cert.badgeUrl} /> when you have images) */}
            <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
              ${cert.featured
                ? "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
              }`}>
              <ShieldCheck size={20} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50 leading-snug mb-1">
                {cert.title}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                {cert.issuer}
              </p>

              {/* Date range */}
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-400 dark:text-neutral-500">
                <span>Issued {formatDate(cert.issueDate)}</span>
                {cert.expiryDate && (
                  <>
                    <span>·</span>
                    <span>Expires {formatDate(cert.expiryDate)}</span>
                  </>
                )}
                {!cert.expiryDate && (
                  <>
                    <span>·</span>
                    <span className="text-emerald-500">No expiry</span>
                  </>
                )}
              </div>

              {/* Credential ID */}
              {cert.credentialId && (
                <p className="text-[10px] font-mono text-neutral-400 dark:text-neutral-600 mt-1 truncate">
                  ID: {cert.credentialId}
                </p>
              )}
            </div>

            {/* Verify link */}
            {cert.verifyUrl && (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Verify ${cert.title}`}
                className="flex-shrink-0 flex items-center gap-1 text-[11px] font-medium
                  text-blue-600 dark:text-blue-400 hover:underline"
              >
                <ExternalLink size={12} />
                Verify
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}