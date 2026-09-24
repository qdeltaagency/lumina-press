"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Check,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#1E1C1A] text-[#FAF7F2] border-t border-[#2C2926] pt-16 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section: "Discover Something Worth Reading" */}
        <div className="pb-16 border-b border-[#2C2926] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#A84C27] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              The Lumina Dispatch
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
              Discover Something Worth Reading
            </h3>
            <p className="text-xs sm:text-sm text-[#9C948B] max-w-md leading-relaxed">
              Get occasional recommendations, new releases, author stories, and
              exclusive offers. Zero spam, ever.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-4 rounded-xl bg-[#2B453D]/30 border border-[#2B453D] text-[#DDD4C3] flex items-center gap-3">
                <Check className="w-5 h-5 text-[#A84C27]" />
                <span className="text-sm font-medium">
                  Welcome to the readers circle. Check your inbox for your first curated dispatch.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-[#2C2926] border border-[#423E3A] rounded-xl px-4 py-3 text-sm text-white placeholder-[#7A736B] focus:outline-none focus:border-[#A84C27] transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#FAF7F2] hover:bg-[#A84C27] hover:text-white text-[#1E1C1A] px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 border-b border-[#2C2926]">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl tracking-tight text-white block">
                {siteConfig.name}
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#9C948B] font-medium block">
                {siteConfig.descriptor}
              </span>
            </Link>
            <p className="text-xs text-[#9C948B] leading-relaxed max-w-sm">
              Digital Books • Ideas • Stories • Knowledge. A curated digital
              publishing platform championing independent authors and calm,
              distraction-free reading.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-[#7A736B]">
              <div className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-[#A84C27]" />
                <span>Instant Delivery</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2B453D]" />
                <span>DRM-Free Freedom</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#DDD4C3]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#9C948B]">
              <li>
                <Link href="/books" className="hover:text-white transition-colors">
                  All eBooks
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/#authors" className="hover:text-white transition-colors">
                  Meet Authors
                </Link>
              </li>
              <li>
                <Link href="/books?sort=bestSeller" className="hover:text-white transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/books?sort=newest" className="hover:text-white transition-colors">
                  New Releases
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Lumina
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Reading Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#DDD4C3]">
              Customer
            </h4>
            <ul className="space-y-2 text-xs text-[#9C948B]">
              <li>
                <Link href="/library" className="hover:text-white transition-colors">
                  My Library
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-white transition-colors">
                  Reading Wishlist
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  Digital Cart
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Reader Support
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* For Authors / Publishing */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#DDD4C3]">
              For Authors
            </h4>
            <ul className="space-y-2 text-xs text-[#9C948B]">
              <li>
                <Link href="/sell" className="hover:text-white transition-colors">
                  Sell Your eBook
                </Link>
              </li>
              <li>
                <Link href="/seller" className="hover:text-white transition-colors">
                  Author Dashboard
                </Link>
              </li>
              <li>
                <Link href="/sell#calculator" className="hover:text-white transition-colors">
                  Royalty Calculator
                </Link>
              </li>
              <li>
                <Link href="/sell#guidelines" className="hover:text-white transition-colors">
                  Publishing Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#7A736B] gap-4">
          <div className="flex items-center gap-1">
            <span>© 2026 {siteConfig.name}. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              Digital Refund Policy
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
