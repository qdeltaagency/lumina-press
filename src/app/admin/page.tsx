"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { books } from "@/data/books";
import { authors } from "@/data/authors";
import { categories } from "@/data/categories";
import {
  ShieldAlert,
  BarChart3,
  BookOpen,
  Users,
  ShoppingBag,
  CreditCard,
  CheckCircle,
  XCircle,
  Eye,
  Settings,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

interface PendingSubmission {
  id: string;
  title: string;
  author: string;
  category: string;
  submittedAt: string;
  price: number;
  status: "pending" | "approved" | "rejected";
}

const INITIAL_SUBMISSIONS: PendingSubmission[] = [
  {
    id: "sub-1",
    title: "Meditations on Quantum Logic",
    author: "Dr. Arvind Subramanian",
    category: "Technology & AI",
    submittedAt: "2 hours ago",
    price: 699,
    status: "pending",
  },
  {
    id: "sub-2",
    title: "The Silent Cathedral: Venetian Architecture",
    author: "Matteo Bianchi",
    category: "Fiction & Literature",
    submittedAt: "5 hours ago",
    price: 549,
    status: "pending",
  },
  {
    id: "sub-3",
    title: "The Sovereign Investor Handbook",
    author: "Nadia Rostova",
    category: "Finance & Economics",
    submittedAt: "Yesterday",
    price: 899,
    status: "pending",
  },
];

export default function AdminDashboardPage() {
  const [submissions, setSubmissions] =
    useState<PendingSubmission[]>(INITIAL_SUBMISSIONS);

  const handleApprove = (id: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "approved" } : s))
    );
  };

  const handleReject = (id: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "rejected" } : s))
    );
  };

  const pendingCount = submissions.filter((s) => s.status === "pending").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="pb-6 border-b border-[#EAE3D5] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#A84C27] font-semibold block mb-1">
            Platform Governance & Administration
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#1E1C1A]">
            Admin Control Center
          </h1>
          <p className="text-xs text-[#7A736B] mt-1">
            Global Marketplace Statistics • Editorial Approvals
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1 bg-[#2B453D]/10 text-[#2B453D] rounded-full font-medium">
            System Operational • 99.98% SLA
          </span>
        </div>
      </div>

      {/* Global Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#DDD4C3] space-y-1">
          <span className="text-xs text-[#7A736B]">Total Platform GMV</span>
          <span className="font-serif text-2xl font-bold text-[#1E1C1A] block">
            ₹42.8 Lakh
          </span>
          <span className="text-[10px] text-[#2B453D]">+24% MoM</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#DDD4C3] space-y-1">
          <span className="text-xs text-[#7A736B]">Total Orders</span>
          <span className="font-serif text-2xl font-bold text-[#1E1C1A] block">
            8,419
          </span>
          <span className="text-[10px] text-[#7A736B]">Instant downloads</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#DDD4C3] space-y-1">
          <span className="text-xs text-[#7A736B]">Active Readers</span>
          <span className="font-serif text-2xl font-bold text-[#1E1C1A] block">
            14,290
          </span>
          <span className="text-[10px] text-[#7A736B]">Registered accounts</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#DDD4C3] space-y-1">
          <span className="text-xs text-[#7A736B]">Catalog Titles</span>
          <span className="font-serif text-2xl font-bold text-[#1E1C1A] block">
            {books.length} Active
          </span>
          <span className="text-[10px] text-[#7A736B]">Across 10 genres</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#DDD4C3] space-y-1">
          <span className="text-xs text-[#7A736B]">Active Authors</span>
          <span className="font-serif text-2xl font-bold text-[#1E1C1A] block">
            {authors.length} Verified
          </span>
          <span className="text-[10px] text-[#7A736B]">85% Royalty pool</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#DDD4C3] space-y-1">
          <span className="text-xs text-[#7A736B]">Pending Review</span>
          <span className="font-serif text-2xl font-bold text-[#A84C27] block">
            {pendingCount}
          </span>
          <span className="text-[10px] text-[#A84C27]">Requires action</span>
        </div>
      </div>

      {/* Pending Author Book Submissions Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D5]">
          <div>
            <h3 className="font-serif text-2xl font-medium text-[#1E1C1A]">
              Editorial Review Queue
            </h3>
            <p className="text-xs text-[#7A736B]">
              Submissions from new independent authors awaiting platform approval
            </p>
          </div>
          <span className="text-xs font-mono text-[#A84C27]">
            {pendingCount} Pending Approval
          </span>
        </div>

        <div className="overflow-x-auto bg-[#FAF7F2] rounded-2xl border border-[#DDD4C3]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#EAE3D5] bg-[#F3EFE7] text-[#7A736B] uppercase font-semibold text-[10px] tracking-wider">
                <th className="p-4">Proposed Title</th>
                <th className="p-4">Author</th>
                <th className="p-4">Category</th>
                <th className="p-4">Retail Price</th>
                <th className="p-4">Submitted</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Editorial Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE3D5]">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-[#F3EFE7]/50">
                  <td className="p-4 font-serif font-medium text-sm text-[#1E1C1A]">
                    {sub.title}
                  </td>
                  <td className="p-4 text-[#5C5751]">{sub.author}</td>
                  <td className="p-4 text-[#5C5751]">{sub.category}</td>
                  <td className="p-4 font-serif font-bold text-[#1E1C1A]">
                    ₹{sub.price}
                  </td>
                  <td className="p-4 text-[#7A736B]">{sub.submittedAt}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                        sub.status === "approved"
                          ? "bg-[#2B453D]/15 text-[#2B453D]"
                          : sub.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {sub.status === "pending" ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleApprove(sub.id)}
                          className="px-3 py-1 bg-[#2B453D] hover:bg-[#1E1C1A] text-white text-[11px] font-semibold rounded-lg transition-colors flex items-center gap-1"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleReject(sub.id)}
                          className="px-3 py-1 border border-[#DDD4C3] hover:bg-red-50 hover:text-red-700 text-[#7A736B] text-[11px] font-semibold rounded-lg transition-colors flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Decline</span>
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-[#7A736B] italic">
                        Action recorded
                      </span>
                    )}
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
