"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import {
  Feather,
  Sparkles,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function SellPage() {
  const { formatPrice } = useStore();

  // Interactive Royalty Calculator State
  const [estimatedPrice, setEstimatedPrice] = useState(499);
  const [monthlyCopies, setMonthlyCopies] = useState(250);

  const royaltyRate = 0.85; // 85%
  const monthlyEarnings = Math.round(
    estimatedPrice * monthlyCopies * royaltyRate
  );
  const annualEarnings = monthlyEarnings * 12;

  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [bookGenre, setBookGenre] = useState("Productivity & Self-Development");
  const [sampleLink, setSampleLink] = useState("");

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationSubmitted(true);
  };

  const steps = [
    {
      num: "01",
      title: "Create Author Profile",
      desc: "Establish your dedicated verified writer profile with portrait and bibliography.",
    },
    {
      num: "02",
      title: "Upload Your eBook",
      desc: "Upload EPUB, PDF, or Markdown files. Our automated engine validates typography.",
    },
    {
      num: "03",
      title: "Add Book Information",
      desc: "Provide synopsis, category taxonomy, quotes, and author commentary.",
    },
    {
      num: "04",
      title: "Set Your Price",
      desc: "You retain total pricing autonomy across global currencies with zero lock-in.",
    },
    {
      num: "05",
      title: "Editorial Review",
      desc: "Our human editors verify formatting and readability within 48 hours.",
    },
    {
      num: "06",
      title: "Start Selling",
      desc: "Begin receiving 85% royalties with automated bi-weekly direct deposits.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAE3D5] text-xs font-semibold text-[#1E1C1A]">
          <Sparkles className="w-3.5 h-3.5 text-[#A84C27]" />
          <span>Independent Author Program</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-medium text-[#1E1C1A] leading-[1.1]">
          Turn Your Words Into a Digital Business.
        </h1>

        <p className="text-base sm:text-lg text-[#5C5751] font-light leading-relaxed">
          Publish your eBooks in a platform that honors your craft. Keep 85% of
          every sale, retain 100% of your copyright, and reach thoughtful
          readers worldwide.
        </p>

        <div className="pt-2">
          <a
            href="#apply"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1E1C1A] hover:bg-[#A84C27] text-white text-xs font-semibold uppercase tracking-wider rounded-full transition-all shadow-md"
          >
            <span>Become a Seller →</span>
          </a>
        </div>
      </div>

      {/* 6-Step Roadmap */}
      <div className="space-y-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#A84C27] font-semibold block mb-1">
            Simple, Transparent Publishing
          </span>
          <h2 className="font-serif text-3xl font-medium text-[#1E1C1A]">
            How Publishing With Lumina Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#DDD4C3] space-y-3"
            >
              <span className="font-serif text-2xl font-bold text-[#A84C27] block">
                {step.num}
              </span>
              <h3 className="font-serif text-lg font-medium text-[#1E1C1A]">
                {step.title}
              </h3>
              <p className="text-xs text-[#5C5751] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Royalty Calculator */}
      <div
        id="calculator"
        className="p-8 sm:p-12 rounded-3xl bg-[#F3EFE7] border border-[#DDD4C3] space-y-8 scroll-mt-24"
      >
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#A84C27] font-semibold block mb-1">
            Fair Compensation
          </span>
          <h2 className="font-serif text-3xl font-medium text-[#1E1C1A]">
            Interactive Author Royalty Calculator
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5751] mt-2">
            Calculate your estimated earnings at our industry-leading 85% author
            royalty rate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Sliders */}
          <div className="lg:col-span-7 space-y-6 bg-[#FAF7F2] p-6 rounded-2xl border border-[#DDD4C3]">
            <div>
              <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-[#7A736B] mb-2">
                <span>Book Retail Price</span>
                <span className="text-sm font-serif font-bold text-[#1E1C1A]">
                  ₹{estimatedPrice}
                </span>
              </div>
              <input
                type="range"
                min="199"
                max="1999"
                step="50"
                value={estimatedPrice}
                onChange={(e) => setEstimatedPrice(Number(e.target.value))}
                className="w-full accent-[#A84C27]"
              />
              <div className="flex justify-between text-[11px] text-[#7A736B] mt-1">
                <span>₹199 (Introductory)</span>
                <span>₹1,999 (Comprehensive)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-[#7A736B] mb-2">
                <span>Estimated Monthly Copies Sold</span>
                <span className="text-sm font-serif font-bold text-[#1E1C1A]">
                  {monthlyCopies} Copies
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="2500"
                step="50"
                value={monthlyCopies}
                onChange={(e) => setMonthlyCopies(Number(e.target.value))}
                className="w-full accent-[#A84C27]"
              />
              <div className="flex justify-between text-[11px] text-[#7A736B] mt-1">
                <span>50 copies</span>
                <span>2,500 copies</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-[#7A736B] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2B453D]" />
              <span>
                85% direct payout • No hidden bandwidth or hosting deductions
              </span>
            </div>
          </div>

          {/* Earnings Projection Card */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#1E1C1A] text-white space-y-6 text-center">
            <span className="text-[11px] uppercase tracking-widest text-[#DDD4C3] font-medium block">
              Projected Earnings (85% Royalty)
            </span>

            <div>
              <span className="font-serif text-4xl sm:text-5xl font-bold text-[#FAF7F2] block">
                ₹{monthlyEarnings.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-[#9C948B] block mt-1">
                Estimated Monthly Revenue
              </span>
            </div>

            <div className="pt-4 border-t border-[#3A3632]">
              <span className="font-serif text-2xl font-semibold text-[#A84C27] block">
                ₹{annualEarnings.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-[#9C948B] block mt-1">
                Annual Compounded Potential
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Seller Application Form */}
      <div
        id="apply"
        className="p-8 sm:p-12 rounded-3xl bg-[#FAF7F2] border border-[#DDD4C3] max-w-2xl mx-auto space-y-6 scroll-mt-24"
      >
        <div className="text-center space-y-2">
          <h2 className="font-serif text-3xl font-medium text-[#1E1C1A]">
            Apply for Author Review
          </h2>
          <p className="text-xs text-[#7A736B]">
            Submit your manuscript outline or preview. We reply within 48 hours.
          </p>
        </div>

        {applicationSubmitted ? (
          <div className="p-6 bg-[#2B453D]/10 border border-[#2B453D] rounded-2xl text-center space-y-2 text-[#2B453D]">
            <CheckCircle className="w-8 h-8 mx-auto" />
            <h3 className="font-serif text-xl font-medium text-[#1E1C1A]">
              Application Received
            </h3>
            <p className="text-xs text-[#5C5751]">
              Thank you, {authorName}. An editor will review your sample and email
              you at {authorEmail} with onboarding instructions.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmitApplication} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A736B] mb-1">
                Author / Legal Name
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Elena Rostova"
                className="w-full text-xs px-4 py-3 rounded-xl border border-[#DDD4C3] bg-[#FAF7F2] text-[#1E1C1A] focus:outline-none focus:border-[#A84C27]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A736B] mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                placeholder="author@example.com"
                className="w-full text-xs px-4 py-3 rounded-xl border border-[#DDD4C3] bg-[#FAF7F2] text-[#1E1C1A] focus:outline-none focus:border-[#A84C27]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A736B] mb-1">
                  Book Title
                </label>
                <input
                  type="text"
                  required
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  placeholder="e.g. The Architecture of Silence"
                  className="w-full text-xs px-4 py-3 rounded-xl border border-[#DDD4C3] bg-[#FAF7F2] text-[#1E1C1A] focus:outline-none focus:border-[#A84C27]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A736B] mb-1">
                  Primary Category
                </label>
                <select
                  value={bookGenre}
                  onChange={(e) => setBookGenre(e.target.value)}
                  className="w-full text-xs px-4 py-3 rounded-xl border border-[#DDD4C3] bg-[#FAF7F2] text-[#1E1C1A] focus:outline-none focus:border-[#A84C27]"
                >
                  <option>Self-Development & Mindset</option>
                  <option>Business & Strategy</option>
                  <option>Technology & AI</option>
                  <option>Finance & Economics</option>
                  <option>Fiction & Literature</option>
                  <option>Mystery & Thriller</option>
                  <option>Biography & Memoir</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A736B] mb-1">
                Manuscript or Sample Link (Google Drive, Notion, PDF link)
              </label>
              <input
                type="url"
                required
                value={sampleLink}
                onChange={(e) => setSampleLink(e.target.value)}
                placeholder="https://..."
                className="w-full text-xs px-4 py-3 rounded-xl border border-[#DDD4C3] bg-[#FAF7F2] text-[#1E1C1A] focus:outline-none focus:border-[#A84C27]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#1E1C1A] hover:bg-[#A84C27] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md"
            >
              Submit for Editorial Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
