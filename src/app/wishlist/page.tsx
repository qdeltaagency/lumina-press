"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { books } from "@/data/books";
import { useStore } from "@/context/StoreContext";
import {
  Bookmark,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Sparkles,
  BookOpen,
  Check,
} from "lucide-react";

export default function WishlistPage() {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
    isInCart,
    formatPrice,
    openPreview,
  } = useStore();

  const wishlistBooks = books.filter((b) => wishlist.includes(b.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="pb-6 border-b border-[#EAE3D5]">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A84C27] font-semibold mb-2">
          <Bookmark className="w-3.5 h-3.5 fill-[#A84C27]" />
          <span>Curated Reading Queue</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#1E1C1A]">
              Your Wishlist
            </h1>
            <p className="text-xs sm:text-sm text-[#5C5751] mt-2 leading-relaxed">
              Books you intend to explore, purchase, and reflect upon.
            </p>
          </div>
          <span className="text-xs font-mono text-[#7A736B]">
            {wishlistBooks.length}{" "}
            {wishlistBooks.length === 1 ? "Book" : "Books"} Saved
          </span>
        </div>
      </div>

      {wishlistBooks.length === 0 ? (
        /* Empty State */
        <div className="py-24 text-center bg-[#FAF7F2] rounded-3xl border border-[#DDD4C3] p-8 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#F3EFE7] flex items-center justify-center mx-auto mb-4 text-[#A84C27]">
            <Bookmark className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1E1C1A]">
            Your reading list is waiting.
          </h2>
          <p className="text-xs sm:text-sm text-[#7A736B] mt-2 max-w-sm mx-auto leading-relaxed">
            Save books you want to explore later. Click the bookmark icon on any
            edition to keep it close at hand.
          </p>
          <Link
            href="/books"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#1E1C1A] hover:bg-[#A84C27] text-white text-xs font-semibold uppercase tracking-wider rounded-full transition-colors shadow-xs"
          >
            <span>Explore eBooks</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* Wishlist Items List */
        <div className="divide-y divide-[#EAE3D5] bg-[#FAF7F2] rounded-2xl border border-[#DDD4C3] overflow-hidden">
          {wishlistBooks.map((book) => {
            const inCart = isInCart(book.id);
            return (
              <div
                key={book.id}
                className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:bg-[#F3EFE7]/50 transition-colors"
              >
                <div className="flex items-start gap-5 min-w-0">
                  <Link
                    href={`/book/${book.slug}`}
                    className="w-16 sm:w-20 aspect-[2/3] relative rounded overflow-hidden shadow-xs shrink-0 bg-[#EAE3D5]"
                  >
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-[#A84C27] font-semibold">
                      {book.category}
                    </span>
                    <Link href={`/book/${book.slug}`}>
                      <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1E1C1A] hover:text-[#A84C27] transition-colors leading-snug line-clamp-1">
                        {book.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#7A736B]">By {book.author}</p>
                    <div className="flex items-center gap-2 text-[11px] text-[#2B453D] pt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2B453D]" />
                      <span>Instant Digital Availability (EPUB / PDF)</span>
                    </div>
                  </div>
                </div>

                {/* Right price and actions */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-[#EAE3D5]">
                  <div className="text-left sm:text-right">
                    <span className="font-serif text-lg font-bold text-[#1E1C1A] block">
                      {formatPrice(book.price)}
                    </span>
                    {book.discount > 0 && (
                      <span className="text-[11px] text-[#A84C27] font-medium">
                        {book.discount}% OFF
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openPreview(book)}
                      className="p-2.5 rounded-xl border border-[#DDD4C3] bg-[#FAF7F2] hover:bg-[#EAE3D5] text-[#1E1C1A] text-xs transition-colors"
                      title="Preview Book Sample"
                    >
                      <BookOpen className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => addToCart(book)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-xs ${
                        inCart
                          ? "bg-[#2B453D] text-white"
                          : "bg-[#1E1C1A] hover:bg-[#A84C27] text-white"
                      }`}
                    >
                      {inCart ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>In Cart</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => toggleWishlist(book.id)}
                      className="p-2.5 text-[#9C948B] hover:text-[#A84C27] transition-colors rounded-xl hover:bg-[#EAE3D5]"
                      title="Remove from Wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
