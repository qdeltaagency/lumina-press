"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { BookOpen, Sparkles, Sliders, Sun, Moon, ArrowRight } from "lucide-react";

export default function InteractiveReadingSimulator() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [fontSize, setFontSize] = useState<number>(18);
  const [fontFamily, setFontFamily] = useState<"serif" | "sans" | "mono">("serif");

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  // Window-level dragging listeners for silky smooth drag response
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    };
    const onMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("touchend", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);
    };
  }, [isDragging, handleMove]);

  const fontClasses = {
    serif: "font-serif",
    sans: "font-sans",
    mono: "font-mono",
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-semibold tracking-widest uppercase text-[#A84C27] block">
          Tactile Reading Simulator
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#1E1C1A]">
          Read in the Light That Suits Your Mind.
        </h2>
        <p className="text-xs sm:text-sm text-[#5C5751] leading-relaxed">
          Drag the interactive divider below to compare our warm daylight parchment
          with our distraction-free OLED dark mode.
        </p>
      </div>

      {/* Simulator Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#F3EFE7] border border-[#DDD4C3] text-xs">
        <div className="flex items-center gap-3">
          <span className="font-semibold uppercase tracking-wider text-[#7A736B]">
            Font Family:
          </span>
          {(["serif", "sans", "mono"] as const).map((font) => (
            <button
              key={font}
              onClick={() => setFontFamily(font)}
              className={`px-3 py-1 rounded-lg border capitalize transition-colors ${
                fontFamily === font
                  ? "bg-[#1E1C1A] text-white border-[#1E1C1A] font-semibold"
                  : "bg-[#FAF7F2] text-[#5C5751] border-[#DDD4C3] hover:text-[#1E1C1A]"
              }`}
            >
              {font}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="font-semibold uppercase tracking-wider text-[#7A736B]">
            Text Size:
          </span>
          <div className="flex items-center gap-2">
            {[16, 18, 22].map((sz) => (
              <button
                key={sz}
                onClick={() => setFontSize(sz)}
                className={`px-2.5 py-1 rounded-lg border transition-colors ${
                  fontSize === sz
                    ? "bg-[#1E1C1A] text-white border-[#1E1C1A] font-semibold"
                    : "bg-[#FAF7F2] text-[#5C5751] border-[#DDD4C3]"
                }`}
              >
                {sz === 16 ? "Normal" : sz === 18 ? "Large" : "Reading"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Draggable Comparison Viewport */}
      <div
        ref={containerRef}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
        className="relative h-[400px] sm:h-[460px] rounded-3xl overflow-hidden border border-[#DDD4C3] shadow-2xl select-none cursor-ew-resize"
      >
        {/* Layer 1 (Base): Dark OLED Mode */}
        <div className="absolute inset-0 bg-[#141312] text-[#E2DDD5] p-8 sm:p-12 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-[#DDD4C3] font-medium">
              <Moon className="w-4 h-4 text-[#A84C27]" />
              <span>OLED Distraction-Free Dark Mode</span>
            </span>
            <span className="font-mono text-[#7A736B]">Chapter 1 • 288 pages</span>
          </div>

          <div
            className={`max-w-2xl mx-auto space-y-4 ${fontClasses[fontFamily]}`}
            style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
          >
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white mb-2">
              The Architecture of Silence
            </h3>
            <p>
              When you look at the archives of intellectual achievement—from
              Darwin’s unhurried walks down the Sandwalk to Virginia Woolf’s silent
              mornings in Monk’s House—you notice an identical architectural
              feature: a deliberate refusal to allow the outside world
              uninterrupted access to the mind.
            </p>
            <p className="opacity-80 hidden sm:block">
              Depth is not merely an efficiency tactic for completing tasks
              faster; it is a psychological state of total coherence.
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#7A736B]">
            <span>Drag slider to compare modes</span>
            <span>Pure OLED Contrast • Zero Eye Fatigue</span>
          </div>
        </div>

        {/* Layer 2 (Overlay): Warm Ivory Daylight Mode (Exact coordinate-matched with clip-path) */}
        <div
          className="absolute inset-0 bg-[#FAF7F2] text-[#1E1C1A] p-8 sm:p-12 flex flex-col justify-between pointer-events-none paper-grain"
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            WebkitClipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        >
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-[#1E1C1A] font-semibold">
              <Sun className="w-4 h-4 text-[#A84C27]" />
              <span>Warm Ivory Daylight Paper</span>
            </span>
            <span className="font-mono text-[#7A736B]">Chapter 1 • 288 pages</span>
          </div>

          <div
            className={`max-w-2xl mx-auto space-y-4 ${fontClasses[fontFamily]}`}
            style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
          >
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1E1C1A] mb-2">
              The Architecture of Silence
            </h3>
            <p>
              When you look at the archives of intellectual achievement—from
              Darwin’s unhurried walks down the Sandwalk to Virginia Woolf’s
              silent mornings in Monk’s House—you notice an identical
              architectural feature: a deliberate refusal to allow the outside
              world uninterrupted access to the mind.
            </p>
            <p className="opacity-80 hidden sm:block">
              Depth is not merely an efficiency tactic for completing tasks
              faster; it is a psychological state of total coherence.
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#A84C27] font-medium">
              Natural Paper Grain Texture
            </span>
            <span className="text-[#7A736B]">
              Calibrated Serif Contrast
            </span>
          </div>
        </div>

        {/* Draggable Divider Line & Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-[#A84C27] shadow-2xl z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#1E1C1A] text-white border-2 border-white shadow-xl flex items-center justify-center">
            <Sliders className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      <div className="text-center pt-2">
        <Link
          href="/reader/the-art-of-deep-work"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#1E1C1A] hover:text-[#A84C27] transition-colors"
        >
          <span>Launch Full-Screen Distraction-Free Web Reader</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
