"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { books } from "@/data/books";
import { categories } from "@/data/categories";
import BookCard from "@/components/BookCard";
import { useStore } from "@/context/StoreContext";
import {
  Search,
  SlidersHorizontal,
  X,
  Grid3X3,
  List,
  Sparkles,
  ArrowUpDown,
  BookOpen,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function BooksCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSort = searchParams.get("sort") || "featured";
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedFormat, setSelectedFormat] = useState<string>("all");
  const [sortBy, setSortBy] = useState(initialSort);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { formatPrice } = useStore();

  // Filter and sort computation
  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = book.title.toLowerCase().includes(q);
          const matchAuthor = book.author.toLowerCase().includes(q);
          const matchCategory = book.category.toLowerCase().includes(q);
          const matchGenre = book.genres.some((g) =>
            g.toLowerCase().includes(q)
          );
          if (!matchTitle && !matchAuthor && !matchCategory && !matchGenre) {
            return false;
          }
        }

        // Category
        if (
          selectedCategory !== "all" &&
          book.categorySlug !== selectedCategory
        ) {
          return false;
        }

        // Rating
        if (selectedRating > 0 && book.rating < selectedRating) {
          return false;
        }

        // Format
        if (
          selectedFormat !== "all" &&
          !book.format.toLowerCase().includes(selectedFormat.toLowerCase())
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "bestSeller") {
          return (a.bestSellerRank || 99) - (b.bestSellerRank || 99);
        }
        if (sortBy === "newest") {
          return a.newRelease === b.newRelease ? 0 : a.newRelease ? -1 : 1;
        }
        if (sortBy === "priceLow") {
          return a.price - b.price;
        }
        if (sortBy === "priceHigh") {
          return b.price - a.price;
        }
        if (sortBy === "rating") {
          return b.rating - a.rating;
        }
        // Default "featured"
        return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
      });
  }, [
    searchQuery,
    selectedCategory,
    selectedRating,
    selectedFormat,
    sortBy,
  ]);

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedRating > 0 ? 1 : 0) +
    (selectedFormat !== "all" ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedRating(0);
    setSelectedFormat("all");
    setSortBy("featured");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Title & Editorial Header */}
      <div className="mb-8 pb-6 border-b border-[#EAE3D5]">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A84C27] font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Digital Archive</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#1E1C1A]">
              All eBooks
            </h1>
            <p className="text-xs sm:text-sm text-[#5C5751] mt-2 max-w-xl leading-relaxed">
              Explore our complete collection of independent literary, technical,
              and philosophical editions. Instant delivery directly to your
              library.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#7A736B]">
              Showing {filteredBooks.length} of {books.length} titles
            </span>
          </div>
        </div>
      </div>

      {/* Search & Action Bar */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1 max-w-xl">
          <Search className="w-4 h-4 text-[#7A736B] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search books, authors, or topics..."
            className="w-full pl-11 pr-10 py-3 rounded-xl bg-[#FAF7F2] border border-[#DDD4C3] text-sm text-[#1E1C1A] placeholder-[#9C948B] focus:outline-none focus:border-[#A84C27] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#7A736B] hover:text-[#1E1C1A]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort and View Mode */}
        <div className="flex items-center gap-3 justify-between md:justify-end">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden px-4 py-2.5 rounded-xl border border-[#DDD4C3] bg-[#FAF7F2] text-xs font-medium text-[#1E1C1A] flex items-center gap-2"
          >
            <Filter className="w-4 h-4 text-[#A84C27]" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#A84C27] text-white text-[10px] flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#7A736B] hidden sm:inline" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-medium py-2.5 px-3 rounded-xl bg-[#FAF7F2] border border-[#DDD4C3] text-[#1E1C1A] focus:outline-none focus:border-[#A84C27]"
            >
              <option value="featured">Sort: Featured</option>
              <option value="bestSeller">Sort: Best Selling</option>
              <option value="newest">Sort: Newest</option>
              <option value="priceLow">Sort: Price: Low to High</option>
              <option value="priceHigh">Sort: Price: High to Low</option>
              <option value="rating">Sort: Highest Rated</option>
            </select>
          </div>

          {/* Grid / List Switcher */}
          <div className="hidden sm:flex items-center bg-[#EAE3D5] p-1 rounded-xl">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-[#FAF7F2] text-[#1E1C1A] shadow-xs"
                  : "text-[#7A736B]"
              }`}
              title="Grid View"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-[#FAF7F2] text-[#1E1C1A] shadow-xs"
                  : "text-[#7A736B]"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout with Sidebar Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6">
          <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#DDD4C3] space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D5]">
              <span className="font-serif text-lg font-medium text-[#1E1C1A] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#A84C27]" />
                Filter Catalog
              </span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#A84C27] hover:underline"
                >
                  Clear all ({activeFiltersCount})
                </button>
              )}
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A736B] mb-3">
                Category
              </h4>
              <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition-colors flex items-center justify-between ${
                    selectedCategory === "all"
                      ? "bg-[#1E1C1A] text-white font-medium"
                      : "text-[#5C5751] hover:bg-[#F3EFE7] hover:text-[#1E1C1A]"
                  }`}
                >
                  <span>All Categories</span>
                  <span className="font-mono text-[10px]">{books.length}</span>
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategory === cat.slug
                        ? "bg-[#1E1C1A] text-white font-medium"
                        : "text-[#5C5751] hover:bg-[#F3EFE7] hover:text-[#1E1C1A]"
                    }`}
                  >
                    <span className="truncate pr-2">{cat.name}</span>
                    <span className="font-mono text-[10px]">
                      {
                        books.filter((b) => b.categorySlug === cat.slug).length
                      }
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Format Filter */}
            <div className="pt-4 border-t border-[#EAE3D5]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A736B] mb-3">
                File Format
              </h4>
              <div className="space-y-1.5">
                {[
                  { label: "All Formats", value: "all" },
                  { label: "EPUB (e-Readers & iPad)", value: "epub" },
                  { label: "PDF (Print-fidelity)", value: "pdf" },
                  { label: "MOBI (Kindle Legacy)", value: "mobi" },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setSelectedFormat(item.value)}
                    className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition-colors ${
                      selectedFormat === item.value
                        ? "bg-[#EAE3D5] text-[#1E1C1A] font-semibold"
                        : "text-[#5C5751] hover:bg-[#F3EFE7]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Minimum Rating */}
            <div className="pt-4 border-t border-[#EAE3D5]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A736B] mb-3">
                Reader Rating
              </h4>
              <div className="space-y-1.5">
                {[
                  { label: "All Ratings", value: 0 },
                  { label: "4.8 ★ & above", value: 4.8 },
                  { label: "4.5 ★ & above", value: 4.5 },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setSelectedRating(item.value)}
                    className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition-colors ${
                      selectedRating === item.value
                        ? "bg-[#EAE3D5] text-[#1E1C1A] font-semibold"
                        : "text-[#5C5751] hover:bg-[#F3EFE7]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Books Grid / List Content */}
        <div className="lg:col-span-3">
          {/* Active Filter Chips */}
          {activeFiltersCount > 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#7A736B]">Active filters:</span>
              {selectedCategory !== "all" && (
                <span className="bg-[#EAE3D5] text-[#1E1C1A] px-2.5 py-1 rounded-full flex items-center gap-1">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory("all")}>
                    <X className="w-3 h-3 text-[#7A736B] hover:text-[#1E1C1A]" />
                  </button>
                </span>
              )}
              {selectedRating > 0 && (
                <span className="bg-[#EAE3D5] text-[#1E1C1A] px-2.5 py-1 rounded-full flex items-center gap-1">
                  Rating: {selectedRating}+
                  <button onClick={() => setSelectedRating(0)}>
                    <X className="w-3 h-3 text-[#7A736B] hover:text-[#1E1C1A]" />
                  </button>
                </span>
              )}
              {selectedFormat !== "all" && (
                <span className="bg-[#EAE3D5] text-[#1E1C1A] px-2.5 py-1 rounded-full flex items-center gap-1">
                  Format: {selectedFormat.toUpperCase()}
                  <button onClick={() => setSelectedFormat("all")}>
                    <X className="w-3 h-3 text-[#7A736B] hover:text-[#1E1C1A]" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="bg-[#EAE3D5] text-[#1E1C1A] px-2.5 py-1 rounded-full flex items-center gap-1">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery("")}>
                    <X className="w-3 h-3 text-[#7A736B] hover:text-[#1E1C1A]" />
                  </button>
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-xs text-[#A84C27] hover:underline ml-2"
              >
                Reset all
              </button>
            </div>
          )}

          {/* Empty state */}
          {filteredBooks.length === 0 ? (
            <div className="py-20 text-center bg-[#FAF7F2] border border-[#DDD4C3] rounded-2xl p-8">
              <BookOpen className="w-12 h-12 text-[#DDD4C3] mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-[#1E1C1A]">
                No books found
              </h3>
              <p className="text-xs sm:text-sm text-[#7A736B] mt-2 max-w-sm mx-auto">
                We couldn't find any books matching your exact search or filter
                criteria. Try clearing filters to explore our full catalog.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 px-6 py-2.5 bg-[#1E1C1A] hover:bg-[#A84C27] text-white text-xs font-semibold uppercase tracking-wider rounded-full transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            /* Grid View */
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            /* Editorial List View */
            <div className="space-y-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} variant="editorial" />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Slide-over */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#1E1C1A]/50 backdrop-blur-xs"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                className="w-screen max-w-xs bg-[#FAF7F2] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D5]">
                    <h3 className="font-serif text-xl font-medium text-[#1E1C1A]">
                      Filter Catalog
                    </h3>
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="p-1 text-[#7A736B]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A736B] mb-2">
                      Categories
                    </h4>
                    <div className="space-y-1">
                      <button
                        onClick={() => setSelectedCategory("all")}
                        className={`w-full text-left text-xs py-1.5 px-2 rounded ${
                          selectedCategory === "all"
                            ? "bg-[#1E1C1A] text-white"
                            : "text-[#5C5751]"
                        }`}
                      >
                        All Categories
                      </button>
                      {categories.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setSelectedCategory(c.slug)}
                          className={`w-full text-left text-xs py-1.5 px-2 rounded ${
                            selectedCategory === c.slug
                              ? "bg-[#1E1C1A] text-white"
                              : "text-[#5C5751]"
                          }`}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#EAE3D5] flex gap-2">
                  <button
                    onClick={resetFilters}
                    className="flex-1 py-2 text-xs border border-[#DDD4C3] rounded-lg"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="flex-1 py-2 text-xs bg-[#1E1C1A] text-white rounded-lg"
                  >
                    Apply
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function BooksPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center font-serif text-xl text-[#7A736B]">
          Loading catalog...
        </div>
      }
    >
      <BooksCatalogContent />
    </Suspense>
  );
}
