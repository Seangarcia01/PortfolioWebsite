// components/ui/ProfileAvatar.jsx
//
// WHAT THIS IS:
// A circular avatar that shows your profile picture.
// If the image fails to load (or no src is set), it falls back
// to showing your initials on a coloured background.
//
// It also shows a small pulsing green dot if `availableForWork` is true
// in your portfolio.json — a subtle but effective signal to recruiters.
//
// PROPS (values passed in from the parent component):
// - src      → the image path, e.g. "/images/profile.jpg"
// - name     → your name, used for alt text and initial fallback
// - size     → "sm" | "md" | "lg" — controls the diameter
// - showBadge → true/false — whether to show the availability dot

"use client";

import { useState } from "react";
import Image from "next/image";
import data from "@/data/portfolio.json";

// SIZE VARIANTS — maps the size prop to Tailwind classes
// This pattern (a lookup object) is cleaner than a long if/else chain
const SIZE = {
  sm: { wrapper: "w-9 h-9",  ring: "ring-2", dot: "w-2.5 h-2.5 border-[1.5px]", text: "text-sm"  },
  md: { wrapper: "w-11 h-11", ring: "ring-2", dot: "w-3 h-3   border-2",         text: "text-base" },
  lg: { wrapper: "w-16 h-16", ring: "ring-2", dot: "w-3.5 h-3.5 border-2",       text: "text-xl"  },
};

export function ProfileAvatar({ size = "md", showBadge = true }) {
  // Pull profile data straight from JSON — no props needed for these
  const { avatar, name, availableForWork } = data.profile;

  // `imageError` tracks whether the <img> failed to load
  // If it does, we flip this to true and show the initials fallback
  const [imageError, setImageError] = useState(false);

  // Pick the right size classes from our lookup object above
  const s = SIZE[size] ?? SIZE.md;

  // Build the initials from the name: "Alex Rivera" → "AR"
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2); // max 2 characters

  const shouldShowImage = avatar && !imageError;

  return (
    // `relative` on the wrapper lets us absolutely position the badge dot
    <div className={`relative flex-shrink-0 ${s.wrapper}`}>

      {/* ── AVATAR CIRCLE ── */}
      <div
        className={`
          w-full h-full rounded-full overflow-hidden
          ${s.ring}
          ring-neutral-200 dark:ring-neutral-700
          transition-all duration-300
          hover:ring-blue-400 dark:hover:ring-blue-500
          hover:scale-105
        `}
      >
        {shouldShowImage ? (
          // next/image is always preferred over <img> in Next.js:
          // - Automatically compresses and resizes the image
          // - Lazy loads by default (only downloads when near the viewport)
          // - fill + object-cover = fills the circle without distortion
          <Image
            src={avatar}
            alt={`${name}'s profile picture`}
            fill
            className="object-cover"
            priority   // load immediately — it's above the fold in the header
            onError={() => setImageError(true)} // flip to fallback on failure
          />
        ) : (
          // FALLBACK: gradient circle with initials
          // The gradient direction changes slightly on dark mode via CSS
          <div
            aria-label={`${name}'s avatar — initials ${initials}`}
            className={`
              w-full h-full flex items-center justify-center
              bg-gradient-to-br from-blue-400 via-violet-500 to-pink-500
              text-white font-semibold ${s.text} select-none
            `}
          >
            {initials}
          </div>
        )}
      </div>

      {/* ── AVAILABILITY DOT ── */}
      {/* Only renders when showBadge=true AND availableForWork=true in JSON */}
      {showBadge && availableForWork && (
        // Positioned at the bottom-right of the avatar circle
        // `translate-x-0.5 translate-y-0.5` nudges it slightly outward
        <span
          aria-label="Available for work"
          className={`
            absolute bottom-0 right-0
            ${s.dot}
            rounded-full
            bg-emerald-500
            border-white dark:border-neutral-950
            translate-x-0.5 translate-y-0.5
          `}
        >
          {/* The ping animation creates a ripple/pulse effect */}
          <span className="
            absolute inset-0 rounded-full
            bg-emerald-400 animate-ping opacity-75
          " />
        </span>
      )}

    </div>
  );
}