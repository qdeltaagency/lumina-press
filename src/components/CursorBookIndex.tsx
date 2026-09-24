"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { books } from "@/data/books";
import { useStore } from "@/context/StoreContext";
import { ArrowUpRight, BookOpen, Star, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorBookIndex() {
  const { formatPrice, openPreview } = useStore();
  const spotlightBooks = books.slice(0, 5);

  const [activeBook, setActiveBook] = useState<(typeof books)[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse cursor tracking with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 250, damping: 22, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#EAE3D5]">
        <div>
          <span className="text-xs font-semibold tracking-widest uppercase text-[#A84C27] block mb-1">
            The Editorial Index
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1E1C1A] font-medium">
            Curated Masterworks
          </h2>
        </div>
        <p className="mt-2 md:mt-0 text-xs sm:text-sm text-[#7A736B] max-w-md">
          Hover over any volume to reveal edition specifics, author insights, and
          digital preview files.
        </p>
      </div>

      {/* Interactive Cursor-Following Book Card (Desktop only) */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          pointerEvents: "none",
        }}
        className={`hidden lg:block absolute top-0 left-0 z-30 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
          activeBook ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {activeBook && (
          <div className="w-64 p-4 rounded-2xl bg-[#FAF7F2]/95 backdrop-blur-md border border-[#DDD4C3] shadow-2xl space-y-3">
            <div className="aspect-[2/3] w-full relative rounded overflow-hidden shadow-md bg-[#EAE3D5]">
              <div className="book-spine-effect" />
              <Image
                src={activeBook.coverImage}
                alt={activeBook.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#A84C27] font-semibold block">
                {activeBook.category}
              </span>
              <h4 className="font-serif text-base font-semibold text-[#1E1C1A] truncate">
                {activeBook.title}
              </h4>
              <p className="text-xs text-[#7A736B] truncate">
                By {activeBook.author}
              </p>
            </div>
            <div className="pt-2 border-t border-[#EAE3D5] flex items-center justify-between text-xs font-semibold">
              <span className="font-serif text-sm text-[#1E1C1A]">
                {formatPrice(activeBook.price)}
              </span>
              <span className="text-[#2B453D] text-[11px]">
                {activeBook.format}
              </span>
            </div>
          </div>
        )}
      </motion.div>

      {/* The Interactive List */}
      <div className="divide-y divide-[#EAE3D5]">
        {spotlightBooks.map((book, idx) => (
          <div
            key={book.id}
            onMouseEnter={() => setActiveBook(book)}
            onMouseLeave={() => setActiveBook(null)}
            className="group py-8 sm:py-10 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
          >
            {/* Number & Title */}
            <div className="flex items-start sm:items-center gap-4 sm:gap-8 min-w-0">
              <span className="font-serif text-xl sm:text-2xl text-[#9C948B] group-hover:text-[#A84C27] transition-colors font-medium">
                0{idx + 1}
              </span>

              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#A84C27]">
                    {book.category}
                  </span>
                  <span className="text-xs text-[#7A736B] hidden sm:inline">
                    • {book.pages} pages
                  </span>
                </div>

                <Link href={`/book/${book.slug}`}>
                  <h3 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-medium text-[#1E1C1A] group-hover:text-[#A84C27] group-hover:translate-x-2 transition-all duration-300 leading-tight">
                    {book.title}
                  </h3>
                </Link>

                <p className="text-xs sm:text-sm text-[#7A736B]">
                  By {book.author}
                </p>
              </div>
            </div>

            {/* Price and CTA */}
            <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 pt-3 md:pt-0">
              <div className="text-left md:text-right">
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#1E1C1A] block">
                  {formatPrice(book.price)}
                </span>
                {book.discount > 0 && (
                  <span className="text-xs font-semibold text-[#A84C27]">
                    Save {book.discount}%
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openPreview(book)}
                  className="px-4 py-2 rounded-full border border-[#DDD4C3] bg-[#FAF7F2] hover:bg-[#EAE3D5] text-xs font-semibold text-[#1E1C1A] transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#A84C27]" />
                  <span>Sample</span>
                </button>

                <Link
                  href={`/book/${book.slug}`}
                  className="w-10 h-10 rounded-full bg-[#1E1C1A] group-hover:bg-[#A84C27] text-white flex items-center justify-center transition-colors"
                  aria-label="View Edition"
                >
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
