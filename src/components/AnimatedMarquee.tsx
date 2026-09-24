"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedMarqueeProps {
  items: string[];
  direction?: "left" | "right";
  speed?: number; // duration in seconds
  className?: string;
  separator?: string;
  theme?: "dark" | "light" | "terracotta";
}

export default function AnimatedMarquee({
  items,
  direction = "left",
  speed = 28,
  className = "",
  separator = "✦",
  theme = "dark",
}: AnimatedMarqueeProps) {
  const repeatedItems = [...items, ...items, ...items, ...items];

  const themeStyles = {
    dark: "bg-[#141312] text-[#FAF7F2] border-y border-[#2C2926]",
    light: "bg-[#F3EFE7] text-[#1E1C1A] border-y border-[#DDD4C3]",
    terracotta: "bg-[#A84C27] text-white border-y border-[#8E3B1B]",
  };

  const xInitial = direction === "left" ? "0%" : "-50%";
  const xAnimate = direction === "left" ? "-50%" : "0%";

  return (
    <div
      className={`overflow-hidden whitespace-nowrap py-4 sm:py-6 select-none ${themeStyles[theme]} ${className}`}
    >
      <motion.div
        className="flex items-center gap-8 w-max"
        initial={{ x: xInitial }}
        animate={{ x: xAnimate }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="font-serif text-xl sm:text-3xl lg:text-4xl tracking-tight uppercase font-medium">
              {item}
            </span>
            <span className="text-[#A84C27] text-sm sm:text-base opacity-75">
              {separator}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
