// components/layout/Header.jsx

"use client";

import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import { ProfileInfo } from "@/components/ui/ProfileInfo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NavDropdown } from "@/components/ui/NavDropdown";
import data from "@/data/portfolio.json";

export function Header() {
  const { name, location, occupation, avatar } = data.profile;

  return (
    <header
      className="
        sticky top-0 z-40 w-full
        bg-white/80 dark:bg-neutral-950/80
        backdrop-blur-md
        border-b border-neutral-200 dark:border-neutral-800
        transition-colors duration-300
      "
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* 3-column layout */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-4 h-16 sm:h-[72px]">

          {/* LEFT: Avatar */}
          <ProfileAvatar 
            src={avatar}
            name={name}
            size="md"
            showBadge={true}
          />

          {/* CENTER: Info */}
          <ProfileInfo 
            name={name}
            location={location}
            occupation={occupation}
          />

          {/* RIGHT: Controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <NavDropdown />
          </div>

        </div>
      </div>
    </header>
  );
}