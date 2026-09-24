"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { siteConfig } from "@/config/site";
import {
  Search,
  Bookmark,
  ShoppingBag,
  BookOpen,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const {
    cart,
    wishlist,
    library,
    currency,
    setCurrency,
    setIsCartOpen,
    setIsSearchOpen,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const totalCartCount = cart.length;
  const totalWishlistCount = wishlist.length;

  return (
    <>
      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EAE3D5] shadow-xs"
            : "bg-[#FAF7F2] border-b border-[#EAE3D5]/70"
        }`}
      >
        <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-12 h-20 sm:h-22 flex items-center justify-between gap-4 lg:gap-8">
          {/* Left: Brand Logo & Search */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            <Link href="/" className="flex flex-col group shrink-0">
              <span className="font-serif text-2xl sm:text-[27px] tracking-tight text-[#1E1C1A] group-hover:text-[#A84C27] transition-colors leading-none">
                {siteConfig.name}
              </span>
              <span className="text-[9.5px] tracking-[0.22em] uppercase text-[#857C70] font-sans font-medium mt-1">
                {siteConfig.descriptor}
              </span>
            </Link>

            {/* Quick Search Button (Moved to Left, clean placeholder) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center gap-2 text-xs text-[#6B655D] hover:text-[#1E1C1A] bg-[#F4EFE6] hover:bg-[#EAE3D5] px-3.5 py-2 rounded-full border border-[#DDD4C3]/80 transition-all group"
              aria-label="Search catalog"
            >
              <Search className="w-3.5 h-3.5 text-[#7A736B] group-hover:text-[#1E1C1A] transition-colors" />
              <span className="font-normal text-[12px]">Search books...</span>
            </button>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 shrink-0">
            {siteConfig.navLinks.map((link) => {
              const isHome = link.name === "Home";
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[13px] tracking-[0.03em] transition-colors relative py-1.5 font-medium ${
                    isHome ? "hidden xl:inline-block" : "inline-block"
                  } ${
                    isActive
                      ? "text-[#1E1C1A]"
                      : "text-[#635D56] hover:text-[#1E1C1A]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A84C27] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions Cluster */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 shrink-0">
            {/* Mobile Search Icon Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 text-[#5C5751] hover:text-[#1E1C1A] hover:bg-[#F3EFE7] rounded-full transition-colors"
              aria-label="Search catalog"
            >
              <Search className="w-5 h-5 text-[#7A736B]" />
            </button>

            {/* Price / Currency Switcher (Shows both INR & USD clearly) */}
            <div
              className="hidden sm:flex items-center bg-[#F3EFE7] border border-[#DDD4C3]/80 p-0.5 rounded-full text-xs shadow-2xs"
              title="Select pricing currency"
            >
              <button
                onClick={() => setCurrency("INR")}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                  currency === "INR"
                    ? "bg-[#1E1C1A] text-[#FAF7F2] shadow-xs"
                    : "text-[#7A736B] hover:text-[#1E1C1A]"
                }`}
              >
                ₹ INR
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                  currency === "USD"
                    ? "bg-[#1E1C1A] text-[#FAF7F2] shadow-xs"
                    : "text-[#7A736B] hover:text-[#1E1C1A]"
                }`}
              >
                $ USD
              </button>
            </div>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="relative p-2 text-[#5C5751] hover:text-[#1E1C1A] hover:bg-[#F3EFE7] rounded-full transition-colors"
              aria-label="Wishlist"
            >
              <Bookmark className="w-[18px] h-[18px]" />
              {totalWishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#A84C27] text-white text-[10px] flex items-center justify-center font-medium shadow-xs">
                  {totalWishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon & Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#5C5751] hover:text-[#1E1C1A] hover:bg-[#F3EFE7] rounded-full transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              {totalCartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#1E1C1A] text-white text-[10px] flex items-center justify-center font-medium shadow-xs">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* My Library Link (Desktop) */}
            <Link
              href="/library"
              className="hidden md:inline-flex items-center gap-2 bg-[#1E1C1A] hover:bg-[#2C2926] text-[#FAF7F2] px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all shadow-xs hover:shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#DDD4C3]" />
              <span>My Library</span>
            </Link>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1E1C1A]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Slide-down Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden fixed inset-x-0 top-22 sm:top-24 z-30 bg-[#FAF7F2] border-b border-[#DDD4C3] shadow-lg px-6 py-6 overflow-hidden"
          >
            <div className="flex flex-col space-y-4">
              {siteConfig.navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-serif text-xl text-[#1E1C1A] hover:text-[#A84C27] transition-colors py-1 border-b border-[#EAE3D5]/60"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-2 flex flex-col space-y-3">
                <Link
                  href="/library"
                  className="flex items-center justify-between text-sm text-[#1E1C1A] font-medium py-2 px-3 bg-[#F3EFE7] rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#A84C27]" />
                    My Digital Library
                  </span>
                  <span className="text-xs text-[#7A736B]">
                    {library.length} books
                  </span>
                </Link>

                <Link
                  href="/sell"
                  className="flex items-center justify-between text-sm text-[#7A736B] hover:text-[#1E1C1A] py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Sell Your eBook (Authors)</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#A84C27]" />
                </Link>
              </div>

              {/* Currency selector for mobile */}
              <div className="pt-4 border-t border-[#DDD4C3]/60 flex items-center justify-between text-xs text-[#7A736B]">
                <span>Currency</span>
                <div className="flex items-center gap-2 bg-[#EAE3D5] p-1 rounded-md">
                  <button
                    onClick={() => setCurrency("INR")}
                    className={`px-2 py-0.5 rounded text-xs ${
                      currency === "INR"
                        ? "bg-[#FAF7F2] text-[#1E1C1A] font-medium shadow-xs"
                        : "text-[#7A736B]"
                    }`}
                  >
                    ₹ INR
                  </button>
                  <button
                    onClick={() => setCurrency("USD")}
                    className={`px-2 py-0.5 rounded text-xs ${
                      currency === "USD"
                        ? "bg-[#FAF7F2] text-[#1E1C1A] font-medium shadow-xs"
                        : "text-[#7A736B]"
                    }`}
                  >
                    $ USD
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
