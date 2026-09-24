"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import {
  BookOpen,
  Download,
  ArrowRight,
  Clock,
  CheckCircle,
  FileText,
  Sparkles,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";

export default function LibraryPage() {
  const { library } = useStore();
  const [activeTab, setActiveTab] = useState<
    "all" | "reading" | "completed" | "unread"
  >("all");
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const filteredItems = library.filter((item) => {
    if (activeTab === "all") return true;
    return item.status === activeTab;
  });

  const handleDownload = (title: string, format: string) => {
    // Generate mock EPUB/PDF download notification
    setDownloadNotice(
      `Preparing "${title}" (${format.toUpperCase()}). DRM-free file ready.`
    );
    setTimeout(() => setDownloadNotice(null), 4000);
  };

  // Find most recent reading book
  const activeBook = library.find((i) => i.status === "reading") || library[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="pb-6 border-b border-[#EAE3D5]">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A84C27] font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Cloud Reading Sanctuary</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#1E1C1A]">
              My Library
            </h1>
            <p className="text-xs sm:text-sm text-[#5C5751] mt-2 leading-relaxed">
              Your permanent digital collection. Sync reading progress, read
              distraction-free online, or download DRM-free EPUB & PDF files.
            </p>
          </div>
          <span className="text-xs font-mono text-[#7A736B]">
            {library.length} {library.length === 1 ? "Edition" : "Editions"} Owned
          </span>
        </div>
      </div>

      {downloadNotice && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-[#2B453D] text-white text-xs flex items-center justify-between shadow-md"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#DDD4C3]" />
            <span>{downloadNotice}</span>
          </div>
          <button
            onClick={() => setDownloadNotice(null)}
            className="text-[11px] underline opacity-80 hover:opacity-100"
          >
            Dismiss
          </button>
        </motion.div>
      )}

      {/* "Continue Reading" Featured Spotlight Card (as specified in prompt) */}
      {activeBook && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#F3EFE7] border border-[#DDD4C3] flex flex-col md:flex-row items-center gap-8 shadow-xs">
          <div className="w-36 sm:w-44 aspect-[2/3] relative rounded-r-md rounded-l-xs overflow-hidden book-shadow-lg shrink-0 bg-[#EAE3D5]">
            <div className="book-spine-effect" />
            <Image
              src={activeBook.book.coverImage}
              alt={activeBook.book.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 w-full space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A84C27] font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Continue Reading</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1E1C1A]">
              {activeBook.book.title}
            </h2>

            <p className="text-xs sm:text-sm text-[#7A736B]">
              By {activeBook.book.author} • Opened {activeBook.lastOpenedAt}
            </p>

            <blockquote className="border-l-2 border-[#A84C27] pl-3 py-0.5 text-xs sm:text-sm font-serif italic text-[#5C5751]">
              You are {activeBook.progress}% through this book.
            </blockquote>

            {/* Progress Bar */}
            <div className="space-y-1.5 max-w-md">
              <div className="flex justify-between text-xs text-[#7A736B]">
                <span>Reading Progress</span>
                <span className="font-mono font-medium text-[#1E1C1A]">
                  {activeBook.progress}%
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-[#EAE3D5] overflow-hidden">
                <div
                  className="h-full bg-[#A84C27] rounded-full transition-all duration-500"
                  style={{ width: `${activeBook.progress}%` }}
                />
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href={`/reader/${activeBook.book.slug}`}
                className="py-3 px-6 rounded-full bg-[#1E1C1A] hover:bg-[#A84C27] text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
              >
                <span>Continue Reading</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() =>
                  handleDownload(activeBook.book.title, "epub")
                }
                className="py-3 px-4 rounded-full border border-[#DDD4C3] bg-[#FAF7F2] hover:bg-[#EAE3D5] text-xs font-semibold text-[#1E1C1A] transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-[#7A736B]" />
                <span>Download EPUB</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#EAE3D5] pb-2 overflow-x-auto no-scrollbar">
        {[
          { label: "All Books", value: "all" },
          { label: "Currently Reading", value: "reading" },
          { label: "Unread", value: "unread" },
          { label: "Completed", value: "completed" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value as any)}
            className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-colors whitespace-nowrap ${
              activeTab === tab.value
                ? "bg-[#1E1C1A] text-white font-semibold"
                : "text-[#5C5751] hover:bg-[#F3EFE7] hover:text-[#1E1C1A]"
            }`}
          >
            {tab.label} (
            {tab.value === "all"
              ? library.length
              : library.filter((i) => i.status === tab.value).length}
            )
          </button>
        ))}
      </div>

      {/* Books Grid */}
      {filteredItems.length === 0 ? (
        <div className="py-20 text-center bg-[#FAF7F2] rounded-3xl border border-[#DDD4C3] p-8">
          <BookOpen className="w-12 h-12 text-[#DDD4C3] mx-auto mb-4" />
          <h3 className="font-serif text-2xl text-[#1E1C1A]">
            No books in this view
          </h3>
          <p className="text-xs sm:text-sm text-[#7A736B] mt-2 max-w-sm mx-auto">
            Purchase your first eBook or check another tab to view your titles.
          </p>
          <Link
            href="/books"
            className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-[#1E1C1A] hover:bg-[#A84C27] text-white text-xs font-semibold uppercase tracking-wider rounded-full transition-colors"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map(({ book, progress, lastOpenedAt, status }) => (
            <div
              key={book.id}
              className="bg-[#FAF7F2] border border-[#DDD4C3] rounded-2xl p-5 hover:shadow-md transition-all flex gap-5 items-start"
            >
              {/* Cover */}
              <Link
                href={`/reader/${book.slug}`}
                className="w-24 sm:w-28 aspect-[2/3] relative rounded overflow-hidden shadow-sm shrink-0 bg-[#EAE3D5] group"
              >
                <div className="book-spine-effect" />
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              {/* Information & Action buttons */}
              <div className="flex-1 min-w-0 flex flex-col justify-between h-full space-y-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#A84C27] font-semibold">
                    {book.category}
                  </span>
                  <Link href={`/reader/${book.slug}`}>
                    <h4 className="font-serif text-base font-semibold text-[#1E1C1A] hover:text-[#A84C27] transition-colors leading-snug line-clamp-2">
                      {book.title}
                    </h4>
                  </Link>
                  <p className="text-xs text-[#7A736B] truncate mt-0.5">
                    {book.author}
                  </p>
                </div>

                {/* Progress Mini Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-[#7A736B]">
                    <span>{progress}% finished</span>
                    <span className="capitalize">{status}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#EAE3D5] overflow-hidden">
                    <div
                      className="h-full bg-[#A84C27] rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="pt-2 border-t border-[#EAE3D5] flex items-center justify-between gap-2">
                  <Link
                    href={`/reader/${book.slug}`}
                    className="py-1.5 px-3 rounded-lg bg-[#1E1C1A] hover:bg-[#A84C27] text-white text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center gap-1"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>Read</span>
                  </Link>

                  <div className="flex items-center gap-1 text-[11px]">
                    <button
                      onClick={() => handleDownload(book.title, "epub")}
                      className="p-1.5 text-[#5C5751] hover:text-[#1E1C1A] hover:bg-[#F3EFE7] rounded"
                      title="Download EPUB file"
                    >
                      EPUB
                    </button>
                    <span className="text-[#DDD4C3]">|</span>
                    <button
                      onClick={() => handleDownload(book.title, "pdf")}
                      className="p-1.5 text-[#5C5751] hover:text-[#1E1C1A] hover:bg-[#F3EFE7] rounded"
                      title="Download PDF file"
                    >
                      PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
