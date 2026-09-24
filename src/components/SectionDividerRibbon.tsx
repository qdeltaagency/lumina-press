"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bookmark, Sparkles } from "lucide-react";

export default function SectionDividerRibbon() {
  return (
    <div className="relative py-8 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#DDD4C3] to-transparent" />
      
      <motion.div
        whileHover={{ scale: 1.1, rotate: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative z-10 w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#DDD4C3] shadow-md flex items-center justify-center text-[#A84C27]"
        title="Lumina Press Seal"
      >
        <Bookmark className="w-4 h-4 fill-[#A84C27]" />
      </motion.div>
    </div>
  );
}
