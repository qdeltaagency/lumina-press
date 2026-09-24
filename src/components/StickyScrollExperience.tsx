"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { books } from "@/data/books";
import { useStore } from "@/context/StoreContext";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PILLARS = [
  {
    word: "FOCUS",
    subtitle: "Undivided Cognitive Solitude",
    desc: "In an attention economy engineered for frantic distraction, depth is an act of rebellion. Our digital editions are designed for unbroken concentration.",
    bg: "#FAF7F2",
    textColor: "#1E1C1A",
    accentColor: "#A84C27",
    badgeBg: "rgba(168, 76, 39, 0.12)",
    book: books[0], // The Art of Deep Work
    stat: "Zero Notifications",
  },
  {
    word: "IMMERSION",
    subtitle: "The Sacred Architecture of Prose",
    desc: "Every typeface, margin, and drop cap is calibrated to dissolve the barrier between reader and author. Custom lighting modes protect your circadian rhythm.",
    bg: "#141312",
    textColor: "#FAF7F2",
    accentColor: "#DDD4C3",
    badgeBg: "rgba(221, 212, 195, 0.15)",
    book: books[2], // The Architecture of Silence
    stat: "Custom Typesetting",
  },
  {
    word: "SOVEREIGNTY",
    subtitle: "100% DRM-Free Ownership",
    desc: "You purchase the book, you own the file. Load onto your Kindle, reMarkable, or read in our browser. No corporate licenses that can ever be revoked.",
    bg: "#182822",
    textColor: "#FAF7F2",
    accentColor: "#C25E38",
    badgeBg: "rgba(194, 94, 56, 0.2)",
    book: books[4], // Synthetics & Sovereignty
    stat: "Open EPUB & PDF",
  },
  {
    word: "EQUITY",
    subtitle: "85% Royalties to Authors",
    desc: "Legacy publishers pay writers 12%. We return up to 85% of net proceeds directly to independent creators, preserving intellectual autonomy and fearless thought.",
    bg: "#2A1B14",
    textColor: "#FAF7F2",
    accentColor: "#F4ECD8",
    badgeBg: "rgba(244, 236, 216, 0.18)",
    book: books[1], // The Psychology of Modern Money
    stat: "85% Author Pool",
  },
];

export default function StickyScrollExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const { openPreview } = useStore();

  // Scroll listener that updates activeIdx as user scrolls through the 400vh container
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      // Calculate which segment we are in (4 segments)
      const segment = Math.min(
        PILLARS.length - 1,
        Math.max(0, Math.floor(progress * PILLARS.length))
      );

      setActiveIdx(segment);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial evaluation on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Jump to specific pillar smoothly on tab click
  const scrollToPillar = (idx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    const targetOffset = (idx / PILLARS.length) * totalScrollable + 20;
    const absoluteTop = window.scrollY + rect.top + targetOffset;
    window.scrollTo({ top: absoluteTop, behavior: "smooth" });
    setActiveIdx(idx);
  };

  const currentPillar = PILLARS[activeIdx];

  return (
    <div ref={containerRef} className="relative h-[380vh]">
      {/* Sticky Container pinned beneath top navbar */}
      <div
        className="sticky top-20 h-[calc(100vh-5rem)] w-full flex flex-col justify-between overflow-hidden transition-colors duration-700 ease-out p-6 sm:p-10 lg:p-14 shadow-xs"
        style={{ backgroundColor: currentPillar.bg }}
      >
        {/* Top Header Row */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span
              className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase transition-colors duration-500"
              style={{ color: currentPillar.accentColor }}
            >
              The Four Pillars of Lumina Press
            </span>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {PILLARS.map((p, idx) => (
              <button
                key={p.word}
                onClick={() => scrollToPillar(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIdx === idx
                    ? "w-8 bg-[#A84C27]"
                    : "w-2 bg-current opacity-30 hover:opacity-60"
                }`}
                style={{ color: currentPillar.textColor }}
                aria-label={`Jump to ${p.word}`}
              />
            ))}
          </div>
        </div>

        {/* Center Display: Giant Kinetic Typography & Book Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto z-10">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <span
              className="text-xs font-mono uppercase tracking-widest block opacity-75 transition-colors duration-500"
              style={{ color: currentPillar.textColor }}
            >
              0{activeIdx + 1} / 04 • {currentPillar.subtitle}
            </span>

            {/* Giant Typographic Word with Animated Key Reveal */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentPillar.word}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-6xl sm:text-7xl lg:text-9xl font-bold tracking-tighter leading-none"
                  style={{ color: currentPillar.textColor }}
                >
                  {currentPillar.word}
                </motion.h2>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={currentPillar.desc}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-sm sm:text-base lg:text-lg max-w-xl font-light leading-relaxed opacity-90"
                style={{ color: currentPillar.textColor }}
              >
                {currentPillar.desc}
              </motion.p>
            </AnimatePresence>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => openPreview(currentPillar.book)}
                className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md bg-[#A84C27] hover:bg-[#8E3B1B] text-white"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Read Sample</span>
              </button>

              <Link
                href={`/book/${currentPillar.book.slug}`}
                className="text-xs font-semibold uppercase tracking-wider underline hover:opacity-80 transition-opacity"
                style={{ color: currentPillar.textColor }}
              >
                View Book Edition →
              </Link>
            </div>
          </div>

          {/* Right Column: Physical 3D Book Presentation */}
          <div className="lg:col-span-5 flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPillar.book.id}
                initial={{ opacity: 0, scale: 0.92, rotate: -4, y: 20 }}
                animate={{ opacity: 1, scale: 1, rotate: 2, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, rotate: 4, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-48 sm:w-60 lg:w-64 aspect-[2/3] relative rounded-r-md rounded-l-xs overflow-hidden book-shadow-lg bg-[#EAE3D5]"
              >
                <div className="book-spine-effect" />
                <Image
                  src={currentPillar.book.coverImage}
                  alt={currentPillar.book.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/70 backdrop-blur-md text-white text-xs border border-white/10">
                  <span className="font-serif font-medium block truncate">
                    {currentPillar.book.title}
                  </span>
                  <span className="text-[10px] text-[#DDD4C3] block mt-0.5">
                    {currentPillar.stat}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Bar: Tab Switchers */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-current/15 z-10">
          {/* Clickable Pillar Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-3 overflow-x-auto no-scrollbar max-w-full">
            {PILLARS.map((p, idx) => (
              <button
                key={p.word}
                onClick={() => scrollToPillar(idx)}
                className={`text-xs uppercase tracking-wider font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  activeIdx === idx
                    ? "bg-[#A84C27] text-white font-bold shadow-xs"
                    : "opacity-60 hover:opacity-100 hover:bg-current/10"
                }`}
                style={{
                  color: activeIdx === idx ? "#ffffff" : currentPillar.textColor,
                }}
              >
                {p.word}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
