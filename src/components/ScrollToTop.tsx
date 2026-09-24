"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          transition={{ duration: 0.25 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-22 lg:bottom-8 right-6 z-40 p-3 rounded-full bg-[#1E1C1A]/90 hover:bg-[#1E1C1A] text-[#FAF7F2] shadow-xl backdrop-blur-md border border-[#DDD4C3]/40 transition-transform hover:scale-105 active:scale-95 group"
        >
          <ArrowUp className="w-4 h-4 text-[#DDD4C3] group-hover:text-white transition-colors" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
