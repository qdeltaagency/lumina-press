"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { books } from "@/data/books";
import BookCard from "@/components/BookCard";
import { ArrowLeft, BookOpen, Sparkles, ArrowUpDown } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryDetailPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const category = categories.find((c) => c.slug === slug);

  const [sortBy, setSortBy] = useState("featured");

  if (!category) {
    notFound();
  }

  const categoryBooks = books
    .filter((b) => b.categorySlug === slug)
    .sort((a, b) => {
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "priceHigh") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return a.featured ? -1 : 1;
    });

  const otherCategories = categories.filter((c) => c.slug !== slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Back button */}
      <div>
        <Link
          href="/books"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#7A736B] hover:text-[#1E1C1A] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Categories</span>
        </Link>
      </div>

      {/* Category Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#DDD4C3] bg-[#FAF7F2] p-8 sm:p-14 paper-grain">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A84C27] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Discipline</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#1E1C1A]">
            {category.name}
          </h1>

          <p className="text-sm sm:text-base text-[#5C5751] font-light leading-relaxed">
            {category.description}
          </p>

          <div className="pt-2 flex items-center gap-3 text-xs font-mono text-[#7A736B]">
            <span>{categoryBooks.length} Available Digital Editions</span>
            <span>•</span>
            <span>Instant EPUB & PDF</span>
          </div>
        </div>
      </div>

      {/* Sort & Book Grid */}
      <div>
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#EAE3D5]">
          <h2 className="font-serif text-2xl text-[#1E1C1A] font-medium">
            Books in {category.name}
          </h2>

          <div className="flex items-center gap-2 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#7A736B]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-1.5 px-3 rounded-lg border border-[#DDD4C3] bg-[#FAF7F2] text-[#1E1C1A] focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="rating">Highest Rated</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>
        </div>

        {categoryBooks.length === 0 ? (
          <div className="py-16 text-center bg-[#FAF7F2] rounded-2xl border border-[#DDD4C3] p-6">
            <BookOpen className="w-10 h-10 text-[#DDD4C3] mx-auto mb-3" />
            <h3 className="font-serif text-xl text-[#1E1C1A]">
              New editions arriving soon
            </h3>
            <p className="text-xs text-[#7A736B] mt-1">
              Our editors are currently curating more independent releases in this
              category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {categoryBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>

      {/* Other Categories Carousel / Grid */}
      <div className="pt-12 border-t border-[#EAE3D5]">
        <h3 className="font-serif text-2xl text-[#1E1C1A] mb-6">
          Explore Other Categories
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {otherCategories.slice(0, 6).map((c) => (
            <Link
              key={c.id}
              href={`/category/${c.slug}`}
              className="p-3.5 rounded-xl border border-[#DDD4C3] bg-[#FAF7F2] hover:bg-[#F3EFE7] transition-colors text-center group"
            >
              <span className="font-serif text-sm font-medium text-[#1E1C1A] group-hover:text-[#A84C27] block truncate">
                {c.name}
              </span>
              <span className="text-[10px] text-[#7A736B] block mt-1">
                {c.bookCount} Books
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
