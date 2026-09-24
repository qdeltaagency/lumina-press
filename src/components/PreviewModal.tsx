"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import {
  X,
  BookOpen,
  ArrowRight,
  ShoppingBag,
  Check,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PreviewModal() {
  const {
    previewBook,
    closePreview,
    formatPrice,
    addToCart,
    isInCart,
  } = useStore();

  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  if (!previewBook) return null;

  const chapters = previewBook.sampleChapters || [];
  const currentChapter = chapters[currentChapterIndex] || chapters[0];
  const inCart = isInCart(previewBook.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#1E1C1A]/75 backdrop-blur-md"
          onClick={closePreview}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-4xl max-h-[92vh] bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#DDD4C3] flex flex-col overflow-hidden z-10"
        >
          {/* Top Bar */}
          <div className="px-6 py-4 bg-[#F3EFE7] border-b border-[#EAE3D5] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="p-1.5 bg-[#FAF7F2] rounded-md text-[#A84C27] border border-[#DDD4C3]">
                <BookOpen className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#A84C27] font-semibold">
                  Free eBook Sample
                </span>
                <h3 className="font-serif text-base font-semibold text-[#1E1C1A] truncate max-w-xs sm:max-w-md">
                  {previewBook.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/reader/${previewBook.slug}`}
                onClick={closePreview}
                className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-[#5C5751] hover:text-[#1E1C1A] px-3 py-1.5 rounded-full border border-[#DDD4C3] bg-[#FAF7F2] transition-colors"
                title="Open in full distraction-free web reader"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Full Web Reader</span>
              </Link>

              <button
                onClick={closePreview}
                className="p-1.5 text-[#7A736B] hover:text-[#1E1C1A] rounded-full hover:bg-[#EAE3D5] transition-colors"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Reading Content Area */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-12 py-8 bg-[#FAF7F2] max-h-[64vh]">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Chapter Header */}
              <div className="text-center pb-6 border-b border-[#EAE3D5]/80 space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#7A736B]">
                  Sample Preview
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1E1C1A]">
                  {currentChapter?.title}
                </h2>
                {currentChapter?.subtitle && (
                  <p className="italic font-serif text-sm text-[#7A736B]">
                    {currentChapter.subtitle}
                  </p>
                )}
              </div>

              {/* Sample Paragraphs */}
              <div className="space-y-5 font-serif text-base sm:text-lg text-[#2C2926] leading-relaxed">
                {currentChapter?.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === 0
                        ? "first-letter:font-serif first-letter:text-4xl sm:first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:font-bold first-letter:text-[#A84C27]"
                        : ""
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* End of Sample Notice */}
              <div className="mt-12 p-6 rounded-xl bg-[#F3EFE7] border border-[#DDD4C3] text-center space-y-3">
                <h4 className="font-serif text-lg font-medium text-[#1E1C1A]">
                  Enjoying this preview?
                </h4>
                <p className="text-xs sm:text-sm text-[#5C5751] max-w-md mx-auto">
                  Unlock all {previewBook.pages} pages, DRM-free EPUB & PDF formats,
                  and lifetime cloud access in your library.
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      addToCart(previewBook);
                      closePreview();
                    }}
                    className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs ${
                      inCart
                        ? "bg-[#2B453D] text-white"
                        : "bg-[#1E1C1A] hover:bg-[#A84C27] text-white"
                    }`}
                  >
                    {inCart ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Already In Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Buy eBook for {formatPrice(previewBook.price)}</span>
                      </>
                    )}
                  </button>
                  <Link
                    href={`/book/${previewBook.slug}`}
                    onClick={closePreview}
                    className="px-4 py-2 text-xs font-medium text-[#1E1C1A] hover:underline flex items-center gap-1"
                  >
                    <span>View Book Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation & Pagination Bar */}
          <div className="px-6 py-3 bg-[#F3EFE7] border-t border-[#EAE3D5] flex items-center justify-between text-xs text-[#7A736B]">
            <div className="flex items-center gap-2">
              <span className="font-medium text-[#1E1C1A]">
                Chapter {currentChapterIndex + 1} of {chapters.length}
              </span>
              <span>•</span>
              <span>Format: EPUB & PDF</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentChapterIndex === 0}
                onClick={() =>
                  setCurrentChapterIndex((prev) => Math.max(0, prev - 1))
                }
                className="p-1 rounded hover:bg-[#EAE3D5] disabled:opacity-40 disabled:hover:bg-transparent"
                title="Previous chapter"
              >
                <ChevronLeft className="w-4 h-4 text-[#1E1C1A]" />
              </button>
              <button
                disabled={currentChapterIndex >= chapters.length - 1}
                onClick={() =>
                  setCurrentChapterIndex((prev) =>
                    Math.min(chapters.length - 1, prev + 1)
                  )
                }
                className="p-1 rounded hover:bg-[#EAE3D5] disabled:opacity-40 disabled:hover:bg-transparent"
                title="Next chapter"
              >
                <ChevronRight className="w-4 h-4 text-[#1E1C1A]" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
