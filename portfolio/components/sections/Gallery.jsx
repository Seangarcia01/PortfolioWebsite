// components/sections/Gallery.jsx
//
// Photo carousel using Embla Carousel (the library we installed in Phase 1).
// Features: autoplay, prev/next buttons, dot indicators, category filter.
//
// HOW EMBLA WORKS:
// 1. You give it a container ref (emblaRef)
// 2. It turns that container into a scrollable carousel
// 3. `emblaApi` is the object with methods like .scrollNext(), .scrollPrev()

"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import data from "@/data/portfolio.json";

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Get unique categories from gallery data
  const categories = ["All", ...new Set(data.gallery.map((g) => g.category))];

  // Filter gallery items
  const items =
    activeCategory === "All"
      ? data.gallery
      : data.gallery.filter((g) => g.category === activeCategory);

  // Autoplay plugin — pauses on hover, resumes on mouse leave
  // The ref lets us access the plugin instance to control it
  const autoplayPlugin = Autoplay({ delay: 3500, stopOnInteraction: false });

  // useEmblaCarousel returns [ref to attach to DOM, API object]
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [autoplayPlugin]
  );

  // Track which slide is active (for dots)
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Sync selectedIndex with carousel scroll position
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect(); // run once on mount

    // Cleanup
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  // Reset carousel when category filter changes
  useEffect(() => {
    if (emblaApi) emblaApi.scrollTo(0);
    setSelectedIndex(0);
  }, [activeCategory, emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="gallery" className="py-12">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Images size={13} className="text-pink-500" />
        <span className="text-xs font-semibold uppercase tracking-widest text-pink-500">
          Gallery
        </span>
      </div>
      <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
          Moments
        </h2>
        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200
                ${activeCategory === cat
                  ? "bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Carousel wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* The overflow-hidden is required — Embla slides horizontally inside */}
        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          {/* This inner div must NOT shrink — it holds all slides in a row */}
          <div className="flex">
            {items.map((item) => (
              <div
                key={item.id}
                // flex-[0_0_85%] means "don't grow, don't shrink, be 85% wide"
                // On sm screens: 60%, on lg: 45% — shows partial next slide
                className="flex-[0_0_85%] sm:flex-[0_0_60%] lg:flex-[0_0_45%] mr-3 relative"
              >
                {/* Image container */}
                <div className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                  {/* The actual image from your portfolio.json */}
                  {item.src ? (
                    <img
                      src={item.src}
                      alt={item.alt || "Gallery Image"}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-neutral-300 dark:bg-neutral-700">
                      <span className="text-xs text-neutral-500">Image Missing</span>
                    </div>
                  )}

                  {/* Caption overlay — slides up on hover */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-4 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-xs font-medium text-white">{item.caption}</p>
                  </div>
                </div>

                {/* Caption below */}
                <div className="mt-2 px-1">
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
                    {item.caption}
                  </p>
                  <span className="text-[10px] text-neutral-400 dark:text-neutral-600 uppercase tracking-wide">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls row: prev/next buttons + dot indicators */}
        <div className="flex items-center justify-between mt-4">
          {/* Dot indicators */}
          <div className="flex gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300
                  ${i === selectedIndex
                    ? "w-5 h-1.5 bg-neutral-900 dark:bg-neutral-100"
                    : "w-1.5 h-1.5 bg-neutral-300 dark:bg-neutral-700"
                  }`}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              aria-label="Previous slide"
              className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-700
                bg-white dark:bg-neutral-900 flex items-center justify-center
                text-neutral-600 dark:text-neutral-400
                hover:bg-neutral-50 dark:hover:bg-neutral-800
                hover:scale-105 transition-all duration-200"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next slide"
              className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-700
                bg-white dark:bg-neutral-900 flex items-center justify-center
                text-neutral-600 dark:text-neutral-400
                hover:bg-neutral-50 dark:hover:bg-neutral-800
                hover:scale-105 transition-all duration-200"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}