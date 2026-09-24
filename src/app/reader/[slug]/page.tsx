"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { books } from "@/data/books";
import { useStore } from "@/context/StoreContext";
import {
  ArrowLeft,
  Settings,
  List,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Check,
  X,
  Type,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ReaderPageProps {
  params: Promise<{ slug: string }>;
}

export default function ReaderPage({ params }: ReaderPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const router = useRouter();

  const book = books.find((b) => b.slug === slug);
  if (!book) {
    notFound();
  }

  const { library, updateReadingProgress, addToLibrary } = useStore();

  // Reader Settings State
  const [theme, setTheme] = useState<"ivory" | "sepia" | "dark">("ivory");
  const [fontSize, setFontSize] = useState<number>(19); // in px
  const [fontFamily, setFontFamily] = useState<"serif" | "sans" | "mono">(
    "serif"
  );
  const [maxWidth, setMaxWidth] = useState<"narrow" | "medium" | "wide">(
    "medium"
  );
  const [showSettings, setShowSettings] = useState(false);
  const [showToc, setShowToc] = useState(false);
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);

  const chapters = book.sampleChapters || [];
  const currentChapter = chapters[currentChapterIdx] || chapters[0];

  // Calculate simulated progress
  const progressPercent = Math.round(
    ((currentChapterIdx + 1) / chapters.length) * 100
  );

  // Sync progress with user's library
  useEffect(() => {
    addToLibrary(book);
    updateReadingProgress(book.id, progressPercent);
  }, [currentChapterIdx, book]);

  // Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (currentChapterIdx < chapters.length - 1) {
          setCurrentChapterIdx((prev) => prev + 1);
        }
      } else if (e.key === "ArrowLeft") {
        if (currentChapterIdx > 0) {
          setCurrentChapterIdx((prev) => prev - 1);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentChapterIdx, chapters.length]);

  const themeClasses = {
    ivory: "bg-[#FAF7F2] text-[#1E1C1A]",
    sepia: "bg-[#F4ECD8] text-[#433222]",
    dark: "bg-[#141312] text-[#E2DDD5]",
  };

  const headerThemeClasses = {
    ivory: "bg-[#FAF7F2]/95 border-[#EAE3D5] text-[#1E1C1A]",
    sepia: "bg-[#F4ECD8]/95 border-[#DDD0B8] text-[#433222]",
    dark: "bg-[#141312]/95 border-[#282725] text-[#E2DDD5]",
  };

  const panelThemeClasses = {
    ivory: "bg-[#FAF7F2] border-[#DDD4C3] text-[#1E1C1A]",
    sepia: "bg-[#EFE5CE] border-[#D9CDB2] text-[#433222]",
    dark: "bg-[#1E1C1A] border-[#383531] text-[#E2DDD5]",
  };

  const maxWidthClasses = {
    narrow: "max-w-xl",
    medium: "max-w-2xl",
    wide: "max-w-3xl",
  };

  const fontClasses = {
    serif: "font-serif",
    sans: "font-sans",
    mono: "font-mono",
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 flex flex-col ${themeClasses[theme]}`}
    >
      {/* Top Distraction-Free Header */}
      <header
        className={`sticky top-0 z-30 px-4 sm:px-8 py-3.5 border-b backdrop-blur-md flex items-center justify-between transition-colors ${headerThemeClasses[theme]}`}
      >
        <div className="flex items-center gap-3">
          <Link
            href={`/book/${book.slug}`}
            className="p-1.5 rounded-lg hover:opacity-70 transition-opacity"
            title="Exit Reader"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="border-l border-current/20 pl-3">
            <h1 className="font-serif text-sm font-semibold truncate max-w-[200px] sm:max-w-sm">
              {book.title}
            </h1>
            <span className="text-[11px] opacity-70 block truncate">
              {currentChapter.title}
            </span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Table of Contents trigger */}
          <button
            onClick={() => setShowToc(!showToc)}
            className="p-2 rounded-lg hover:opacity-75 transition-opacity"
            title="Table of Contents"
          >
            <List className="w-4 h-4" />
          </button>

          {/* Reading Appearance Settings trigger */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg hover:opacity-75 transition-opacity"
            title="Typography & Appearance"
          >
            <Settings className="w-4 h-4" />
          </button>

          <Link
            href="/library"
            className="text-xs px-3 py-1 rounded-full border border-current/30 hover:opacity-80 transition-opacity ml-2 hidden sm:inline"
          >
            My Library
          </Link>
        </div>
      </header>

      {/* Settings Dropdown Drawer */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`fixed top-14 right-4 sm:right-8 z-40 w-72 p-5 rounded-2xl shadow-xl border space-y-4 ${panelThemeClasses[theme]}`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-current/15">
              <span className="text-xs uppercase tracking-wider font-semibold">
                Reading Settings
              </span>
              <button onClick={() => setShowSettings(false)}>
                <X className="w-4 h-4 opacity-70" />
              </button>
            </div>

            {/* Themes */}
            <div>
              <span className="text-[11px] uppercase tracking-wider opacity-70 block mb-2 font-medium">
                Theme
              </span>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  onClick={() => setTheme("ivory")}
                  className={`py-2 px-3 rounded-lg border flex items-center justify-center font-serif ${
                    theme === "ivory"
                      ? "border-[#A84C27] ring-1 ring-[#A84C27] bg-[#FAF7F2] text-[#1E1C1A]"
                      : "bg-[#FAF7F2] text-[#1E1C1A] border-gray-300"
                  }`}
                >
                  Ivory
                </button>
                <button
                  onClick={() => setTheme("sepia")}
                  className={`py-2 px-3 rounded-lg border flex items-center justify-center font-serif ${
                    theme === "sepia"
                      ? "border-[#A84C27] ring-1 ring-[#A84C27] bg-[#F4ECD8] text-[#433222]"
                      : "bg-[#F4ECD8] text-[#433222] border-[#D9CDB2]"
                  }`}
                >
                  Sepia
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`py-2 px-3 rounded-lg border flex items-center justify-center font-serif ${
                    theme === "dark"
                      ? "border-[#A84C27] ring-1 ring-[#A84C27] bg-[#141312] text-[#E2DDD5]"
                      : "bg-[#141312] text-[#E2DDD5] border-[#383531]"
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>

            {/* Font Family */}
            <div>
              <span className="text-[11px] uppercase tracking-wider opacity-70 block mb-2 font-medium">
                Typeface
              </span>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(["serif", "sans", "mono"] as const).map((font) => (
                  <button
                    key={font}
                    onClick={() => setFontFamily(font)}
                    className={`py-1.5 rounded-lg border capitalize ${
                      fontFamily === font
                        ? "border-[#A84C27] font-semibold"
                        : "border-current/20 opacity-80"
                    }`}
                  >
                    {font}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div>
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider opacity-70 mb-2">
                <span>Font Size</span>
                <span>{fontSize}px</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFontSize((s) => Math.max(15, s - 1))}
                  className="px-3 py-1 rounded-lg border border-current/20 text-xs font-semibold"
                >
                  A-
                </button>
                <input
                  type="range"
                  min="15"
                  max="28"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="flex-1 accent-[#A84C27]"
                />
                <button
                  onClick={() => setFontSize((s) => Math.min(28, s + 1))}
                  className="px-3 py-1 rounded-lg border border-current/20 text-xs font-semibold"
                >
                  A+
                </button>
              </div>
            </div>

            {/* Width */}
            <div>
              <span className="text-[11px] uppercase tracking-wider opacity-70 block mb-2 font-medium">
                Reading Width
              </span>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(["narrow", "medium", "wide"] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => setMaxWidth(w)}
                    className={`py-1.5 rounded-lg border capitalize ${
                      maxWidth === w
                        ? "border-[#A84C27] font-semibold"
                        : "border-current/20 opacity-80"
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table of Contents Drawer */}
      <AnimatePresence>
        {showToc && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`fixed top-14 left-4 sm:left-8 z-40 w-80 p-5 rounded-2xl shadow-xl border space-y-4 ${panelThemeClasses[theme]}`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-current/15">
              <span className="text-xs uppercase tracking-wider font-semibold">
                Table of Contents
              </span>
              <button onClick={() => setShowToc(false)}>
                <X className="w-4 h-4 opacity-70" />
              </button>
            </div>

            <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
              {chapters.map((ch, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentChapterIdx(idx);
                    setShowToc(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition-colors flex items-center justify-between ${
                    currentChapterIdx === idx
                      ? "bg-[#A84C27]/15 font-semibold text-[#A84C27]"
                      : "hover:bg-current/5"
                  }`}
                >
                  <span className="truncate pr-2">{ch.title}</span>
                  {currentChapterIdx === idx && (
                    <Check className="w-3.5 h-3.5 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Prose Reading Surface */}
      <main className="flex-1 py-12 sm:py-20 px-6 sm:px-12">
        <article
          className={`mx-auto space-y-8 ${maxWidthClasses[maxWidth]} ${fontClasses[fontFamily]}`}
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
        >
          {/* Chapter Heading */}
          <div className="text-center pb-8 border-b border-current/15 space-y-2">
            <span className="text-xs uppercase tracking-widest opacity-60 block">
              Chapter {currentChapterIdx + 1} of {chapters.length}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight">
              {currentChapter.title}
            </h2>
            {currentChapter.subtitle && (
              <p className="italic text-base opacity-75">
                {currentChapter.subtitle}
              </p>
            )}
          </div>

          {/* Paragraphs */}
          <div className="space-y-6">
            {currentChapter.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={
                  idx === 0
                    ? "first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:font-bold first-letter:leading-none"
                    : ""
                }
              >
                {p}
              </p>
            ))}
          </div>

          {/* Chapter Navigation Buttons */}
          <div className="pt-12 border-t border-current/15 flex items-center justify-between">
            <button
              disabled={currentChapterIdx === 0}
              onClick={() =>
                setCurrentChapterIdx((prev) => Math.max(0, prev - 1))
              }
              className="px-4 py-2 rounded-xl border border-current/25 hover:border-current disabled:opacity-30 disabled:pointer-events-none text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Chapter</span>
            </button>

            <span className="text-xs opacity-60 font-mono">
              {progressPercent}% Complete
            </span>

            <button
              disabled={currentChapterIdx >= chapters.length - 1}
              onClick={() =>
                setCurrentChapterIdx((prev) =>
                  Math.min(chapters.length - 1, prev + 1)
                )
              }
              className="px-4 py-2 rounded-xl border border-current/25 hover:border-current disabled:opacity-30 disabled:pointer-events-none text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>Next Chapter</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </article>
      </main>

      {/* Bottom Minimal Progress Bar */}
      <footer
        className={`sticky bottom-0 z-30 px-6 py-2.5 border-t text-xs flex items-center justify-between ${headerThemeClasses[theme]}`}
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 opacity-60" />
          <span className="opacity-70 text-[11px]">
            Reading progress saved to your Library
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-32 sm:w-48 h-1.5 rounded-full bg-current/20 overflow-hidden">
            <div
              className="h-full bg-[#A84C27] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="font-mono text-[11px] opacity-80">
            {progressPercent}%
          </span>
        </div>
      </footer>
    </div>
  );
}
