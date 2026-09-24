"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import {
  Sparkles,
  BookOpen,
  Feather,
  ShieldCheck,
  Zap,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
      {/* Editorial Headline */}
      <div className="space-y-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAE3D5] text-xs font-semibold text-[#1E1C1A]">
          <Feather className="w-3.5 h-3.5 text-[#A84C27]" />
          <span>Our Publishing Manifesto</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl text-[#1E1C1A] font-medium leading-[1.1]">
          A Better Way to Discover Digital Books.
        </h1>

        <p className="text-base sm:text-lg text-[#5C5751] font-light leading-relaxed">
          We built Lumina Press because reading has been fractured by algorithms,
          ad clutter, and generic eCommerce conglomerates. We wanted an
          environment as calm, deliberate, and dignified as a high-ceilinged
          independent bookstore.
        </p>
      </div>

      {/* Atmospheric Editorial Image */}
      <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-xl border border-[#DDD4C3] bg-[#EAE3D5]">
        <Image
          src="https://images.unsplash.com/photo-1507842229450-7907e4d5da61?auto=format&fit=crop&w=1600&q=85"
          alt="Quiet library reading hall"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
          <p className="font-serif italic text-white text-base sm:text-lg max-w-xl">
            "A room without books is like a body without a soul." — Cicero
          </p>
        </div>
      </div>

      {/* 4 Pillars of Difference */}
      <div className="space-y-8">
        <h2 className="font-serif text-3xl font-medium text-[#1E1C1A] text-center">
          What Makes Our Bookstore Different
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#DDD4C3] space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#A84C27] font-semibold">
              Pillar 01
            </span>
            <h3 className="font-serif text-2xl font-medium text-[#1E1C1A]">
              Radical Editorial Curation
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5751] leading-relaxed">
              We do not list two million auto-scraped pamphlets. Every volume in
              our catalog has been read, vetted, and approved by human editors who
              care about rigor, beauty, and lasting significance.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#DDD4C3] space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#A84C27] font-semibold">
              Pillar 02
            </span>
            <h3 className="font-serif text-2xl font-medium text-[#1E1C1A]">
              85% Royalty to Authors
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5751] leading-relaxed">
              Conventional publishing gatekeepers pay authors 10% to 15%. Legacy
              eBook distributors take massive cuts. We return up to 85% of net
              royalties directly to independent authors and translators.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#DDD4C3] space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#A84C27] font-semibold">
              Pillar 03
            </span>
            <h3 className="font-serif text-2xl font-medium text-[#1E1C1A]">
              DRM-Free Reader Sovereignty
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5751] leading-relaxed">
              When you purchase an eBook here, you own the file. We provide
              open EPUB and PDF formats that you can load onto any Kindle, Kobo,
              reMarkable tablet, or read in our distraction-free web reader.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#DDD4C3] space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#A84C27] font-semibold">
              Pillar 04
            </span>
            <h3 className="font-serif text-2xl font-medium text-[#1E1C1A]">
              The Craft of Typesetting
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5751] leading-relaxed">
              Digital typography should not be an afterthought. Every edition
              features carefully kerned serif fonts, proper drop caps, balanced
              line spacing, and multiple lighting modes designed to honor the text.
            </p>
          </div>
        </div>
      </div>

      {/* Call to action for Authors and Readers */}
      <div className="p-10 sm:p-14 rounded-3xl bg-[#F3EFE7] border border-[#DDD4C3] text-center space-y-6">
        <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1E1C1A]">
          Join the Independent Reading Movement
        </h2>
        <p className="text-xs sm:text-sm text-[#5C5751] max-w-lg mx-auto leading-relaxed">
          Whether you are an author seeking a dignified publishing home or a
          reader searching for your next deep immersion, we welcome you.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/books"
            className="px-7 py-3.5 bg-[#1E1C1A] hover:bg-[#A84C27] text-white text-xs font-semibold uppercase tracking-wider rounded-full transition-all shadow-sm"
          >
            Explore Catalog
          </Link>
          <Link
            href="/sell"
            className="px-6 py-3.5 border border-[#1E1C1A] text-[#1E1C1A] hover:bg-[#FAF7F2] text-xs font-semibold uppercase tracking-wider rounded-full transition-all"
          >
            Publish With Us
          </Link>
        </div>
      </div>
    </div>
  );
}
