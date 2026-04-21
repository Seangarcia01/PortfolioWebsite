// components/ui/NavDropdown.jsx
//
// WHAT THIS DOES:
// A "Menu" button that opens a dropdown list of anchor links.
// Clicking a link scrolls the user to that section on the page.
// Clicking outside the dropdown closes it.

"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";

// These are the sections on your page.
// The `href` matches the `id` you'll give each section, e.g. <section id="projects">
const NAV_LINKS = [
  { label: "About",          href: "#about"          },
  { label: "Tech Stack",     href: "#tech-stack"     },
  { label: "Skills",         href: "#skills"         },
  { label: "Projects",       href: "#projects"       },
  { label: "Certifications", href: "#certifications" },
  { label: "Experience",     href: "#experience"     },
  { label: "Gallery",        href: "#gallery"        },
];

export function NavDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // We attach this to the dropdown container

  // Close the dropdown when the user clicks anywhere outside it
  useEffect(() => {
    function handleClickOutside(event) {
      // dropdownRef.current is the actual DOM element
      // .contains() checks if the click was inside it
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup: remove the listener when this component unmounts
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    // ref={dropdownRef} connects our useRef to this div
    <div className="relative" ref={dropdownRef}>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        className="
          flex items-center justify-center
          w-9 h-9 rounded-full
          bg-neutral-100 dark:bg-neutral-800
          text-neutral-600 dark:text-neutral-300
          hover:bg-neutral-200 dark:hover:bg-neutral-700
          hover:scale-110
          transition-all duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        "
      >
        {/* Show X icon when open, Menu icon when closed */}
        {isOpen ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* Dropdown panel — only renders when isOpen is true */}
      {isOpen && (
        <div
          className="
            absolute right-0 top-11 z-50
            w-48 py-1
            bg-white dark:bg-neutral-900
            border border-neutral-200 dark:border-neutral-700
            rounded-xl shadow-xl shadow-black/10 dark:shadow-black/40
            animate-in fade-in slide-in-from-top-2 duration-150
          "
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)} // Close after clicking a link
              className="
                block px-4 py-2.5
                text-sm text-neutral-700 dark:text-neutral-300
                hover:bg-neutral-50 dark:hover:bg-neutral-800
                hover:text-neutral-900 dark:hover:text-white
                transition-colors duration-100
              "
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}