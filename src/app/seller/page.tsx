"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { books } from "@/data/books";
import {
  DollarSign,
  BookOpen,
  ShoppingBag,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Plus,
  Eye,
  CheckCircle,
  BarChart3,
  Users,
  Settings,
  Star,
} from "lucide-react";

export default function SellerDashboardPage() {
  const authorBooks = books.slice(0, 4); // sample active books for seller
  const [activeTab, setActiveTab] = useState<"overview" | "books" | "orders">(
    "overview"
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="pb-6 border-b border-[#EAE3D5] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#A84C27] font-semibold block mb-1">
            Verified Independent Publishing
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#1E1C1A]">
            Author Dashboard
          </h1>
          <p className="text-xs text-[#7A736B] mt-1">
            James Anderson • Active Seller ID: SEL-0941
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/sell#apply"
            className="px-4 py-2.5 bg-[#1E1C1A] hover:bg-[#A84C27] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Publish New eBook</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#DDD4C3] space-y-2">
          <span className="text-xs text-[#7A736B] font-medium block">
            Total Revenue
          </span>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1C1A] block">
            ₹3,48,250
          </span>
          <span className="text-[11px] text-[#2B453D] font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.4% vs last month
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#DDD4C3] space-y-2">
          <span className="text-xs text-[#7A736B] font-medium block">
            Books Sold
          </span>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1C1A] block">
            742 Copies
          </span>
          <span className="text-[11px] text-[#7A736B]">Direct downloads</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#DDD4C3] space-y-2">
          <span className="text-xs text-[#7A736B] font-medium block">
            Active Titles
          </span>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1C1A] block">
            4 Editions
          </span>
          <span className="text-[11px] text-[#2B453D]">All live & approved</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#DDD4C3] space-y-2">
          <span className="text-xs text-[#7A736B] font-medium block">
            Pending Payout
          </span>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-[#A84C27] block">
            ₹42,800
          </span>
          <span className="text-[11px] text-[#7A736B]">Releases 1st March</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#DDD4C3] space-y-2 col-span-2 lg:col-span-1">
          <span className="text-xs text-[#7A736B] font-medium block">
            Reader Rating
          </span>
          <div className="flex items-center gap-1">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1C1A]">
              4.9
            </span>
            <Star className="w-4 h-4 fill-[#9B783E] text-[#9B783E]" />
          </div>
          <span className="text-[11px] text-[#7A736B]">Across 582 reviews</span>
        </div>
      </div>

      {/* Visual Chart / Sales Over Time */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-[#DDD4C3] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAE3D5]">
          <div>
            <h3 className="font-serif text-xl font-medium text-[#1E1C1A]">
              Sales Velocity & Compounding
            </h3>
            <p className="text-xs text-[#7A736B]">
              Daily unit volume and revenue progression for current quarter
            </p>
          </div>
          <span className="text-xs font-mono text-[#2B453D] bg-[#2B453D]/10 px-3 py-1 rounded-full font-medium">
            85% Direct Author Royalty Rate Active
          </span>
        </div>

        {/* Minimalist Bar Chart */}
        <div className="h-44 sm:h-52 flex items-end gap-3 sm:gap-4 pt-4 px-2">
          {[
            { month: "Sep", val: 40, amt: "₹38k" },
            { month: "Oct", val: 55, amt: "₹52k" },
            { month: "Nov", val: 70, amt: "₹68k" },
            { month: "Dec", val: 88, amt: "₹89k" },
            { month: "Jan", val: 95, amt: "₹96k" },
            { month: "Feb", val: 100, amt: "₹104k" },
          ].map((bar) => (
            <div
              key={bar.month}
              className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
            >
              <span className="text-[10px] font-mono text-[#7A736B] opacity-0 group-hover:opacity-100 transition-opacity">
                {bar.amt}
              </span>
              <div
                className="w-full bg-[#EAE3D5] group-hover:bg-[#A84C27] rounded-t-lg transition-all duration-300"
                style={{ height: `${bar.val}%` }}
              />
              <span className="text-xs font-medium text-[#5C5751] mt-1">
                {bar.month}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Active Titles Catalog Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D5]">
          <h3 className="font-serif text-2xl font-medium text-[#1E1C1A]">
            Your Published Titles
          </h3>
          <span className="text-xs font-mono text-[#7A736B]">
            4 Active Books
          </span>
        </div>

        <div className="overflow-x-auto bg-[#FAF7F2] rounded-2xl border border-[#DDD4C3]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#EAE3D5] bg-[#F3EFE7] text-[#7A736B] uppercase font-semibold text-[10px] tracking-wider">
                <th className="p-4">Book Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Total Copies</th>
                <th className="p-4">Revenue</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE3D5]">
              {authorBooks.map((book, idx) => (
                <tr key={book.id} className="hover:bg-[#F3EFE7]/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 aspect-[2/3] relative rounded overflow-hidden shadow-xs shrink-0 bg-[#EAE3D5]">
                        <Image
                          src={book.coverImage}
                          alt={book.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-serif font-medium text-[#1E1C1A] text-sm block">
                          {book.title}
                        </span>
                        <span className="text-[10px] text-[#7A736B]">
                          ISBN: {book.isbn}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-[#5C5751]">{book.category}</td>
                  <td className="p-4 font-serif font-semibold text-[#1E1C1A]">
                    ₹{book.price}
                  </td>
                  <td className="p-4 font-mono">{240 - idx * 45} sold</td>
                  <td className="p-4 font-serif font-semibold text-[#2B453D]">
                    ₹{((240 - idx * 45) * book.price * 0.85).toLocaleString("en-IN")}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#2B453D]/10 text-[#2B453D] flex items-center gap-1 w-max">
                      <CheckCircle className="w-3 h-3" /> Published
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/book/${book.slug}`}
                      className="text-xs text-[#A84C27] hover:underline font-medium"
                    >
                      View Page →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
