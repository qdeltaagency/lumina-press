"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { books } from "@/data/books";
import { useStore } from "@/context/StoreContext";
import {
  CheckCircle,
  Download,
  BookOpen,
  ArrowRight,
  Sparkles,
  Zap,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

interface OrderSuccessProps {
  params: Promise<{ orderId: string }>;
}

export default function OrderSuccessPage({ params }: OrderSuccessProps) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.orderId;
  const { library } = useStore();

  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  // Newly purchased books are in library or fallback to featured book
  const deliveredBooks =
    library.length > 0 ? library.slice(0, 2).map((i) => i.book) : [books[0]];

  const handleDownload = (bookTitle: string, format: string) => {
    setDownloadMsg(
      `Downloading "${bookTitle}" (${format.toUpperCase()}). File saved to your downloads.`
    );
    setTimeout(() => setDownloadMsg(null), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="w-16 h-16 rounded-full bg-[#2B453D]/15 text-[#2B453D] flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle className="w-9 h-9 text-[#2B453D]" />
        </div>

        <span className="text-xs uppercase tracking-widest text-[#A84C27] font-semibold block">
          Order Reference: {orderId}
        </span>

        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#1E1C1A]">
          Your book is ready.
        </h1>

        <p className="text-sm sm:text-base text-[#5C5751] max-w-lg mx-auto leading-relaxed">
          Thank you for supporting independent authors. Your permanent digital
          license is active and added to your cloud library.
        </p>
      </motion.div>

      {downloadMsg && (
        <div className="p-4 rounded-xl bg-[#2B453D] text-white text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#DDD4C3]" />
            <span>{downloadMsg}</span>
          </div>
          <button
            onClick={() => setDownloadMsg(null)}
            className="text-[11px] underline opacity-80"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Delivered Books Cards */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-medium text-[#1E1C1A] pb-3 border-b border-[#EAE3D5]">
          Purchased Digital Editions
        </h2>

        <div className="space-y-4">
          {deliveredBooks.map((book) => (
            <div
              key={book.id}
              className="p-6 sm:p-7 rounded-3xl bg-[#FAF7F2] border border-[#DDD4C3] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-5 min-w-0">
                <div className="w-20 sm:w-24 aspect-[2/3] relative rounded overflow-hidden shadow-md shrink-0 bg-[#EAE3D5]">
                  <div className="book-spine-effect" />
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-1.5 min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-[#A84C27] font-semibold">
                    {book.category}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#1E1C1A] leading-snug">
                    {book.title}
                  </h3>
                  <p className="text-xs text-[#7A736B]">By {book.author}</p>
                  <p className="text-[11px] text-[#2B453D] font-medium flex items-center gap-1 pt-1">
                    <Zap className="w-3.5 h-3.5 text-[#A84C27]" />
                    <span>
                      Includes EPUB, PDF & In-Browser Web Reader License
                    </span>
                  </p>
                </div>
              </div>

              {/* Instant CTAs: Read Online & Download */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-[#EAE3D5]">
                <Link
                  href={`/reader/${book.slug}`}
                  className="py-3 px-5 rounded-full bg-[#1E1C1A] hover:bg-[#A84C27] text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Online Now</span>
                </Link>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownload(book.title, "epub")}
                    className="flex-1 py-3 px-4 rounded-full border border-[#DDD4C3] bg-[#FAF7F2] hover:bg-[#EAE3D5] text-xs font-semibold text-[#1E1C1A] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-[#7A736B]" />
                    <span>Download EPUB</span>
                  </button>

                  <button
                    onClick={() => handleDownload(book.title, "pdf")}
                    className="flex-1 py-3 px-4 rounded-full border border-[#DDD4C3] bg-[#FAF7F2] hover:bg-[#EAE3D5] text-xs font-semibold text-[#1E1C1A] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-[#7A736B]" />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Access to Library & Customer Advice */}
      <div className="p-8 rounded-3xl bg-[#F3EFE7] border border-[#DDD4C3] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-serif text-xl font-medium text-[#1E1C1A]">
            Access Anytime in Your Library
          </h3>
          <p className="text-xs text-[#5C5751] max-w-md leading-relaxed">
            All purchased editions are permanently preserved with unlimited
            re-downloads and reading progress synchronization.
          </p>
        </div>

        <Link
          href="/library"
          className="py-3 px-6 rounded-full border border-[#1E1C1A] bg-[#FAF7F2] hover:bg-[#1E1C1A] hover:text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 shadow-xs"
        >
          <span>Go to My Library</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
