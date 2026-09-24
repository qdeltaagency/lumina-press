"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  Mail,
  MessageSquare,
  Sparkles,
  Phone,
  MapPin,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Reader Inquiries & Downloads");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: "How soon do I receive access to my purchased eBooks?",
      a: "Instantly. As soon as your payment is processed, the eBook is deposited directly into your 'My Library' account and a permanent download link (EPUB and PDF) is delivered to your email.",
    },
    {
      q: "Can I transfer these eBooks to my Kindle or Kobo?",
      a: "Yes. All our digital editions are 100% DRM-free. You can use Amazon's Send-to-Kindle tool, email it to your Kindle address, or drag-and-drop the EPUB file via USB into any e-reader.",
    },
    {
      q: "What is your refund policy on digital purchases?",
      a: "We offer a 14-day refund guarantee if you experience technical file corruption or formatting flaws that our support team cannot resolve within 24 hours.",
    },
    {
      q: "How can I publish my book on Lumina?",
      a: "Visit our 'Sell Your eBook' page to submit your manuscript for editorial review. Approved authors receive up to 85% in direct royalties with monthly automated deposits.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {/* Editorial Headline */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAE3D5] text-xs font-semibold text-[#1E1C1A]">
          <MessageSquare className="w-3.5 h-3.5 text-[#A84C27]" />
          <span>Reader & Author Relations</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl text-[#1E1C1A] font-medium">
          Let's Talk
        </h1>

        <p className="text-sm sm:text-base text-[#5C5751] font-light leading-relaxed">
          Questions about your digital library, author submissions, or institutional
          licensing? Our editorial desk is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-[#FAF7F2] p-8 rounded-3xl border border-[#DDD4C3] shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-[#2B453D] mx-auto" />
              <h3 className="font-serif text-2xl font-medium text-[#1E1C1A]">
                Message Delivered
              </h3>
              <p className="text-xs text-[#5C5751] max-w-sm mx-auto">
                Thank you, {name}. A member of our editorial support team will
                reply to {email} within one business day.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs text-[#A84C27] hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A736B] mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Siddharth Mehta"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full text-xs px-4 py-3 rounded-xl border border-[#DDD4C3] bg-[#FAF7F2] text-[#1E1C1A] focus:outline-none focus:border-[#A84C27]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A736B] mb-1">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs px-4 py-3 rounded-xl border border-[#DDD4C3] bg-[#FAF7F2] text-[#1E1C1A] focus:outline-none focus:border-[#A84C27]"
                >
                  <option>Reader Inquiries & Downloads</option>
                  <option>Author Submission Support</option>
                  <option>EPUB / Kindle Formatting Help</option>
                  <option>Press & Media</option>
                  <option>General Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A736B] mb-1">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you with our publications or reading platform?"
                  className="w-full text-xs px-4 py-3 rounded-xl border border-[#DDD4C3] bg-[#FAF7F2] text-[#1E1C1A] focus:outline-none focus:border-[#A84C27]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#1E1C1A] hover:bg-[#A84C27] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Contact Info & Office Details */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 rounded-3xl bg-[#F3EFE7] border border-[#DDD4C3] space-y-6">
            <h3 className="font-serif text-2xl font-medium text-[#1E1C1A]">
              Editorial Contact Points
            </h3>

            <div className="space-y-4 text-xs text-[#5C5751]">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#A84C27] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1E1C1A] block">
                    Reader Care & Orders
                  </span>
                  <span className="font-mono text-[#7A736B]">
                    {siteConfig.contact.supportEmail}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#A84C27] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1E1C1A] block">
                    Author Submissions & Licensing
                  </span>
                  <span className="font-mono text-[#7A736B]">
                    {siteConfig.contact.email}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#A84C27] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1E1C1A] block">
                    Editorial Locations
                  </span>
                  <span>{siteConfig.contact.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mini FAQ Accordion */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#7A736B] font-semibold">
              Frequently Asked Questions
            </h4>
            <div className="space-y-2">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#DDD4C3] text-xs"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left font-medium text-[#1E1C1A] flex items-center justify-between gap-2"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-3.5 h-3.5 text-[#7A736B] shrink-0" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-[#7A736B] shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <p className="mt-2 text-[#5C5751] leading-relaxed pt-2 border-t border-[#EAE3D5]">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
