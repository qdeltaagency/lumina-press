"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { books } from "@/data/books";
import { authors } from "@/data/authors";
import { categories } from "@/data/categories";
import { Search, X, BookOpen, User, Tag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const POPULAR_SEARCHES = [
  "Self-Development",
  "Deep Work",
  "Business",
  "Technology & AI",
  "Finance",
  "Fiction",
  "Elena Rostova",
  "James Anderson",
];

export default function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen, formatPrice } = useStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
  }, [isSearchOpen]);

  const cleanQuery = query.toLowerCase().trim();

  // Matched books
  const matchedBooks = cleanQuery
    ? books.filter(
        (b) =>
          b.title.toLowerCase().includes(cleanQuery) ||
          b.author.toLowerCase().includes(cleanQuery) ||
          b.category.toLowerCase().includes(cleanQuery) ||
          b.genres.some((g) => g.toLowerCase().includes(cleanQuery))
      )
    : [];

  // Matched authors
  const matchedAuthors = cleanQuery
    ? authors.filter(
        (a) =>
          a.name.toLowerCase().includes(cleanQuery) ||
          a.primaryGenre.toLowerCase().includes(cleanQuery)
      )
    : [];

  // Matched categories
  const matchedCategories = cleanQuery
    ? categories.filter(
        (c) =>
          c.name.toLowerCase().includes(cleanQuery) ||
          c.description.toLowerCase().includes(cleanQuery)
      )
    : [];

  const handleSelectPopular = (term: string) => {
    setQuery(term);
  };

  const handleClose = () => {
    setIsSearchOpen(false);
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-[#1E1C1A]/70 backdrop-blur-md flex items-start justify-center pt-12 sm:pt-20 px-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full max-w-3xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#DDD4C3] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input Header */}
            <div className="relative border-b border-[#EAE3D5] p-5 flex items-center gap-4">
              <Search className="w-6 h-6 text-[#7A736B] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search books, authors, topics..."
                className="w-full bg-transparent text-lg sm:text-xl font-serif text-[#1E1C1A] placeholder-[#9C948B] focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-xs text-[#7A736B] hover:text-[#1E1C1A] px-2 py-1 bg-[#EAE3D5] rounded-md"
                >
                  Clear
                </button>
              )}
              <button
                onClick={handleClose}
                className="p-1.5 text-[#7A736B] hover:text-[#1E1C1A] rounded-full hover:bg-[#F3EFE7]"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="max-h-[68vh] overflow-y-auto p-6 space-y-6">
              {!cleanQuery ? (
                /* Popular Searches & Suggestions */
                <div>
                  <h4 className="text-xs font-semibold tracking-wider uppercase text-[#7A736B] mb-3">
                    Popular Searches
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map((term) => (
                      <button
                        key={term}
                        onClick={() => handleSelectPopular(term)}
                        className="px-3 py-1.5 rounded-full bg-[#F3EFE7] hover:bg-[#EAE3D5] text-[#1E1C1A] text-xs font-medium transition-colors border border-[#DDD4C3]/50 flex items-center gap-1.5"
                      >
                        <span>{term}</span>
                        <ArrowRight className="w-3 h-3 text-[#7A736B]" />
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#EAE3D5]">
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-[#7A736B] mb-3">
                      Featured Recommendations
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {books.slice(0, 4).map((book) => (
                        <Link
                          key={book.id}
                          href={`/book/${book.slug}`}
                          onClick={handleClose}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F3EFE7] transition-colors group"
                        >
                          <div className="w-10 h-14 relative shrink-0 rounded overflow-hidden shadow-xs bg-[#EAE3D5]">
                            <Image
                              src={book.coverImage}
                              alt={book.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="overflow-hidden">
                            <h5 className="font-serif text-sm font-medium text-[#1E1C1A] group-hover:text-[#A84C27] truncate">
                              {book.title}
                            </h5>
                            <p className="text-xs text-[#7A736B] truncate">
                              {book.author}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Active Search Results */
                <div className="space-y-6">
                  {matchedBooks.length === 0 &&
                  matchedAuthors.length === 0 &&
                  matchedCategories.length === 0 ? (
                    <div className="py-12 text-center">
                      <BookOpen className="w-10 h-10 text-[#DDD4C3] mx-auto mb-3" />
                      <h4 className="font-serif text-xl text-[#1E1C1A]">
                        No matches found
                      </h4>
                      <p className="text-sm text-[#7A736B] mt-1 max-w-sm mx-auto">
                        Try searching by book title, author surname, or genre like
                        "Productivity" or "Philosophy".
                      </p>
                    </div>
                  ) : null}

                  {/* Books List */}
                  {matchedBooks.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-semibold tracking-wider uppercase text-[#7A736B] flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-[#A84C27]" />
                          Books ({matchedBooks.length})
                        </h4>
                        <Link
                          href={`/books?q=${encodeURIComponent(query)}`}
                          onClick={handleClose}
                          className="text-xs text-[#A84C27] hover:underline"
                        >
                          View all in catalog →
                        </Link>
                      </div>

                      <div className="divide-y divide-[#EAE3D5]">
                        {matchedBooks.slice(0, 6).map((book) => (
                          <Link
                            key={book.id}
                            href={`/book/${book.slug}`}
                            onClick={handleClose}
                            className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-[#F3EFE7] transition-colors group"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-14 relative shrink-0 rounded overflow-hidden shadow-xs bg-[#EAE3D5]">
                                <Image
                                  src={book.coverImage}
                                  alt={book.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <h5 className="font-serif text-base font-medium text-[#1E1C1A] group-hover:text-[#A84C27] truncate">
                                  {book.title}
                                </h5>
                                <p className="text-xs text-[#7A736B]">
                                  {book.author} •{" "}
                                  <span className="text-[#A84C27]">
                                    {book.category}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className="text-right shrink-0 pl-3">
                              <span className="font-serif text-sm font-semibold text-[#1E1C1A]">
                                {formatPrice(book.price)}
                              </span>
                              {book.discount > 0 && (
                                <span className="block text-[10px] text-[#A84C27] font-medium">
                                  {book.discount}% OFF
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Authors List */}
                  {matchedAuthors.length > 0 && (
                    <div className="pt-4 border-t border-[#EAE3D5]">
                      <h4 className="text-xs font-semibold tracking-wider uppercase text-[#7A736B] mb-3 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#A84C27]" />
                        Authors
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {matchedAuthors.map((author) => (
                          <Link
                            key={author.id}
                            href={`/author/${author.slug}`}
                            onClick={handleClose}
                            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F3EFE7] transition-colors group border border-[#DDD4C3]/50"
                          >
                            <div className="w-10 h-10 rounded-full relative shrink-0 overflow-hidden bg-[#EAE3D5]">
                              <Image
                                src={author.photo}
                                alt={author.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <h5 className="font-serif text-sm font-medium text-[#1E1C1A] group-hover:text-[#A84C27]">
                                {author.name}
                              </h5>
                              <p className="text-[11px] text-[#7A736B] truncate">
                                {author.primaryGenre}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Categories List */}
                  {matchedCategories.length > 0 && (
                    <div className="pt-4 border-t border-[#EAE3D5]">
                      <h4 className="text-xs font-semibold tracking-wider uppercase text-[#7A736B] mb-3 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-[#A84C27]" />
                        Categories
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {matchedCategories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/category/${cat.slug}`}
                            onClick={handleClose}
                            className="px-3 py-1.5 bg-[#F3EFE7] hover:bg-[#EAE3D5] rounded-lg text-xs font-medium text-[#1E1C1A] transition-colors"
                          >
                            {cat.name} ({cat.bookCount})
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Tip */}
            <div className="bg-[#F3EFE7] border-t border-[#EAE3D5] px-6 py-3 flex items-center justify-between text-[11px] text-[#7A736B]">
              <span>Press ESC to close</span>
              <span>Instant digital delivery on all titles</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
