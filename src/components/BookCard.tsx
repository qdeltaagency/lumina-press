"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Book } from "@/types";
import { useStore } from "@/context/StoreContext";
import {
  Star,
  Bookmark,
  ShoppingBag,
  BookOpen,
  ArrowRight,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";

interface BookCardProps {
  book: Book;
  variant?: "default" | "editorial" | "compact" | "horizontal";
  priority?: boolean;
}

export default function BookCard({
  book,
  variant = "default",
  priority = false,
}: BookCardProps) {
  const {
    formatPrice,
    addToCart,
    isInCart,
    wishlist,
    toggleWishlist,
    openPreview,
  } = useStore();

  const isFavorited = wishlist.includes(book.id);
  const inCart = isInCart(book.id);

  if (variant === "editorial") {
    return (
      <div className="group relative bg-[#FAF7F2] border border-[#DDD4C3] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center hover:shadow-xl transition-all duration-300">
        {/* Book Cover with 3D spine */}
        <div className="w-full md:w-5/12 max-w-[260px] shrink-0">
          <Link href={`/book/${book.slug}`} className="block relative group/cover">
            <div className="book-cover-container relative aspect-[2/3] rounded-r-md rounded-l-xs overflow-hidden book-shadow-lg bg-[#EAE3D5]">
              <div className="book-spine-effect" />
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                priority={priority}
                className="object-cover"
              />
              {book.discount > 0 && (
                <span className="absolute top-3 right-3 bg-[#A84C27] text-white text-[11px] font-semibold tracking-wider px-2 py-1 rounded shadow-xs uppercase">
                  {book.discount}% OFF
                </span>
              )}
            </div>
          </Link>
        </div>

        {/* Book Info */}
        <div className="w-full md:w-7/12 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#A84C27]">
                {book.category}
              </span>
              <span className="text-[#BEB7AE]">•</span>
              <div className="flex items-center text-xs text-[#5C5751]">
                <Star className="w-3.5 h-3.5 fill-[#9B783E] text-[#9B783E] mr-1" />
                <span className="font-semibold text-[#1E1C1A]">
                  {book.rating}
                </span>
                <span className="text-[#7A736B] ml-1">
                  ({book.reviewCount})
                </span>
              </div>
            </div>

            <Link href={`/book/${book.slug}`}>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1E1C1A] hover:text-[#A84C27] transition-colors leading-tight">
                {book.title}
              </h3>
            </Link>

            <Link
              href={`/author/${book.authorId.replace("author-", "")}`}
              className="text-sm font-medium text-[#5C5751] hover:text-[#1E1C1A] transition-colors mt-1 block"
            >
              By {book.author}
            </Link>

            {book.quote && (
              <blockquote className="mt-4 italic font-serif text-sm text-[#7A736B] border-l-2 border-[#A84C27] pl-3 py-0.5">
                "{book.quote}"
              </blockquote>
            )}

            <p className="mt-3 text-xs sm:text-sm text-[#5C5751] line-clamp-3 leading-relaxed">
              {book.shortDescription}
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-[#EAE3D5] flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl font-semibold text-[#1E1C1A]">
                {formatPrice(book.price)}
              </span>
              {book.originalPrice > book.price && (
                <span className="text-sm text-[#9C948B] line-through font-serif">
                  {formatPrice(book.originalPrice)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openPreview(book)}
                className="px-3 py-2 rounded-full border border-[#DDD4C3] hover:border-[#1E1C1A] text-xs font-medium text-[#1E1C1A] hover:bg-[#F3EFE7] transition-all flex items-center gap-1.5"
                title="Read Sample"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Read Sample</span>
              </button>

              <button
                onClick={() => addToCart(book)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
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
                    <span>Buy eBook</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Standard Card
  return (
    <div className="group flex flex-col justify-between bg-[#FAF7F2] rounded-xl transition-all duration-300">
      <div>
        {/* Cover presentation with spine & quick action buttons */}
        <div className="relative aspect-[2/3] w-full rounded-r-md rounded-l-xs overflow-hidden book-shadow group-hover:book-shadow-lg transition-all duration-300 bg-[#EAE3D5]">
          <Link href={`/book/${book.slug}`} className="block w-full h-full">
            <div className="book-spine-effect" />
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              priority={priority}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
            />
          </Link>

          {/* Discount Badge */}
          {book.discount > 0 && (
            <div className="absolute top-2.5 right-2.5 z-20">
              <span className="bg-[#1E1C1A]/90 backdrop-blur-xs text-white text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded shadow-xs uppercase">
                {book.discount}% OFF
              </span>
            </div>
          )}

          {/* Hover Quick Action Overlay */}
          <div className="absolute inset-x-2 bottom-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between gap-1.5 p-1 bg-[#FAF7F2]/90 backdrop-blur-md rounded-lg border border-[#DDD4C3]/80 shadow-md">
            <button
              onClick={() => openPreview(book)}
              className="flex-1 py-1.5 px-2 text-[11px] font-medium text-[#1E1C1A] hover:bg-[#EAE3D5] rounded flex items-center justify-center gap-1 transition-colors"
              title="Preview Sample Pages"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#A84C27]" />
              <span>Preview</span>
            </button>

            <button
              onClick={() => toggleWishlist(book.id)}
              className="p-1.5 text-[#5C5751] hover:text-[#A84C27] hover:bg-[#EAE3D5] rounded transition-colors"
              title={isFavorited ? "Remove from Wishlist" : "Save to Wishlist"}
            >
              <Bookmark
                className={`w-3.5 h-3.5 ${
                  isFavorited ? "fill-[#A84C27] text-[#A84C27]" : ""
                }`}
              />
            </button>

            <button
              onClick={() => addToCart(book)}
              className={`p-1.5 rounded transition-colors ${
                inCart
                  ? "bg-[#2B453D] text-white"
                  : "bg-[#1E1C1A] text-white hover:bg-[#A84C27]"
              }`}
              title={inCart ? "Item in Cart" : "Add to Cart"}
            >
              {inCart ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <ShoppingBag className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Metadata */}
        <div className="mt-3.5 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-[#7A736B]">
            <span className="uppercase tracking-wider font-semibold text-[#A84C27]">
              {book.category}
            </span>
            <div className="flex items-center">
              <Star className="w-3 h-3 fill-[#9B783E] text-[#9B783E] mr-0.5" />
              <span className="font-semibold text-[#1E1C1A]">
                {book.rating}
              </span>
            </div>
          </div>

          <Link href={`/book/${book.slug}`} className="block">
            <h4 className="font-serif text-lg font-medium text-[#1E1C1A] group-hover:text-[#A84C27] transition-colors leading-snug line-clamp-1">
              {book.title}
            </h4>
          </Link>

          <p className="text-xs text-[#5C5751] truncate">
            {book.author}
          </p>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="mt-3 pt-2.5 border-t border-[#EAE3D5]/80 flex items-center justify-between">
        <div className="flex items-baseline gap-1.5">
          <span className="font-serif text-base font-semibold text-[#1E1C1A]">
            {formatPrice(book.price)}
          </span>
          {book.originalPrice > book.price && (
            <span className="text-xs text-[#9C948B] line-through font-serif">
              {formatPrice(book.originalPrice)}
            </span>
          )}
        </div>

        <Link
          href={`/book/${book.slug}`}
          className="text-xs font-medium text-[#7A736B] group-hover:text-[#A84C27] flex items-center gap-1 transition-colors"
        >
          <span>View</span>
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
