"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { books } from "@/data/books";
import { useStore } from "@/context/StoreContext";
import MagneticButton from "@/components/MagneticButton";
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  Zap,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function KineticHero() {
  const { openPreview } = useStore();
  const featuredBook = books[0]; // The Art of Deep Work

  // Mouse 3D tilt tracking for desktop
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="relative pt-8 sm:pt-14 pb-16 sm:pb-24 overflow-hidden border-b border-[#EAE3D5]/80 paper-grain">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#EAE3D5]/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Eyebrow Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE3D5] border border-[#DDD4C3] text-xs font-semibold text-[#1E1C1A]">
            <span className="w-2 h-2 rounded-full bg-[#A84C27] animate-pulse" />
            <span className="tracking-wide">Independent Digital Publishing House</span>
          </div>
        </motion.div>

        {/* Colossal Display Typography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-medium text-[#1E1C1A] leading-[1.02] tracking-tight"
            >
              Stories, Ideas &{" "}
              <span className="italic font-normal text-[#A84C27] underline decoration-1 underline-offset-8">
                Knowledge
              </span>{" "}
              — All in One Place.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-base sm:text-lg text-[#5C5751] font-light leading-relaxed max-w-xl"
            >
              Discover thoughtfully selected eBooks from independent authors and
              publishers. Pure typography, distraction-free reading, and open DRM-free
              sovereignty across any device.
            </motion.p>

            {/* CTAs with Magnetic physics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              <MagneticButton strength={25}>
                <Link
                  href="/books"
                  className="px-8 py-4 rounded-full bg-[#1E1C1A] hover:bg-[#A84C27] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md flex items-center gap-3 group"
                >
                  <span>Explore eBooks</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>

              <MagneticButton strength={20}>
                <button
                  onClick={() => openPreview(featuredBook)}
                  className="px-7 py-4 rounded-full border border-[#DDD4C3] bg-[#FAF7F2] hover:bg-[#F3EFE7] text-[#1E1C1A] text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs"
                >
                  <BookOpen className="w-4 h-4 text-[#A84C27]" />
                  <span>Read Free Sample</span>
                </button>
              </MagneticButton>
            </motion.div>

            {/* Subtle Metrics Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="pt-8 border-t border-[#EAE3D5] grid grid-cols-3 gap-6 text-xs text-[#7A736B]"
            >
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1C1A] block">
                  100%
                </span>
                <span className="text-[11px] text-[#5C5751] mt-0.5 block">
                  Instant DRM-Free Access
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1C1A] block">
                  85%
                </span>
                <span className="text-[11px] text-[#5C5751] mt-0.5 block">
                  Royalty to Authors
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1C1A] block">
                  4.9★
                </span>
                <span className="text-[11px] text-[#5C5751] mt-0.5 block">
                  Reader Satisfaction
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive 3D Gyroscope/Mouse Floating Book */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-5 flex justify-center items-center py-6 perspective-1000"
          >
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full max-w-sm sm:max-w-md h-[440px] sm:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing"
            >
              {/* Secondary Layered Book (Background Tilt) */}
              <div
                style={{ transform: "translateZ(-40px) rotate(-8deg)" }}
                className="absolute left-6 top-10 w-44 sm:w-52 aspect-[2/3] rounded-r-md rounded-l-xs overflow-hidden book-shadow-lg bg-[#EAE3D5] opacity-90 transition-transform"
              >
                <div className="book-spine-effect" />
                <Image
                  src={books[2].coverImage}
                  alt={books[2].title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Main Prominent 3D Book */}
              <div
                style={{ transform: "translateZ(30px) rotate(4deg)" }}
                className="absolute right-6 top-4 w-48 sm:w-56 aspect-[2/3] rounded-r-md rounded-l-xs overflow-hidden book-shadow-lg bg-[#EAE3D5] transition-transform"
              >
                <div className="book-spine-effect" />
                <Image
                  src={featuredBook.coverImage}
                  alt={featuredBook.title}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-[#A84C27] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                  38% OFF
                </div>
              </div>

              {/* Interactive Floating Badge (Foreground Z-depth) */}
              <motion.div
                style={{ transform: "translateZ(60px)" }}
                className="absolute -bottom-2 inset-x-4 p-4 rounded-2xl bg-[#FAF7F2]/95 backdrop-blur-md border border-[#DDD4C3] shadow-xl flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#A84C27]/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-[#A84C27]" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#A84C27] font-semibold block">
                    Featured Edition
                  </span>
                  <p className="font-serif text-xs sm:text-sm font-medium text-[#1E1C1A] truncate">
                    {featuredBook.title}
                  </p>
                </div>
                <button
                  onClick={() => openPreview(featuredBook)}
                  className="px-3 py-1.5 rounded-full bg-[#1E1C1A] hover:bg-[#A84C27] text-white text-[11px] font-semibold uppercase tracking-wider transition-colors shrink-0"
                >
                  Preview
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
