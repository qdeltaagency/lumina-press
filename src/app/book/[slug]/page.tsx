"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { books } from "@/data/books";
import { initialReviews } from "@/data/reviews";
import { useStore } from "@/context/StoreContext";
import BookCard from "@/components/BookCard";
import { Review } from "@/types";
import {
  Star,
  Bookmark,
  ShoppingBag,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle,
  Clock,
  Globe,
  FileText,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Sparkles,
  Maximize2,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BookDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function BookDetailPage({ params }: BookDetailPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const router = useRouter();

  const book = books.find((b) => b.slug === slug);
  if (!book) {
    notFound();
  }

  const {
    formatPrice,
    addToCart,
    isInCart,
    wishlist,
    toggleWishlist,
    openPreview,
    isInLibrary,
  } = useStore();

  const isFavorited = wishlist.includes(book.id);
  const inCart = isInCart(book.id);
  const isOwned = isInLibrary(book.id);

  const [expandedDesc, setExpandedDesc] = useState(false);
  const [reviewsList, setReviewsList] = useState<Review[]>(() =>
    initialReviews.filter((r) => r.bookId === book.id)
  );
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [showReviewSuccess, setShowReviewSuccess] = useState(false);

  // Related books (same category or author)
  const relatedBooks = books
    .filter((b) => b.id !== book.id && b.categorySlug === book.categorySlug)
    .slice(0, 4);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      bookId: book.id,
      userName: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      comment: newReviewComment.trim(),
      verifiedPurchase: true,
      helpfulCount: 1,
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewAuthor("");
    setNewReviewComment("");
    setShowReviewSuccess(true);
    setTimeout(() => setShowReviewSuccess(false), 4000);
  };

  const handleInstantBuy = () => {
    if (!inCart) {
      addToCart(book);
    }
    router.push("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-[#7A736B]">
        <Link href="/" className="hover:text-[#1E1C1A]">
          Home
        </Link>
        <span>/</span>
        <Link href="/books" className="hover:text-[#1E1C1A]">
          eBooks
        </Link>
        <span>/</span>
        <Link
          href={`/category/${book.categorySlug}`}
          className="hover:text-[#1E1C1A]"
        >
          {book.category}
        </Link>
        <span>/</span>
        <span className="text-[#1E1C1A] font-medium truncate max-w-xs">
          {book.title}
        </span>
      </nav>

      {/* Main Book Presentation Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: 3D Book Cover & Preview triggers */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-sm sticky top-28">
            <div className="book-cover-container relative aspect-[2/3] w-full rounded-r-lg rounded-l-xs overflow-hidden book-shadow-lg bg-[#EAE3D5]">
              <div className="book-spine-effect" />
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                priority
                className="object-cover"
              />
              {book.discount > 0 && (
                <div className="absolute top-4 right-4 bg-[#A84C27] text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-md">
                  {book.discount}% OFF
                </div>
              )}
            </div>

            {/* Quick Action Badges beneath cover */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => openPreview(book)}
                className="py-3 px-4 rounded-xl border border-[#DDD4C3] bg-[#FAF7F2] hover:bg-[#F3EFE7] text-xs font-semibold uppercase tracking-wider text-[#1E1C1A] transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <BookOpen className="w-4 h-4 text-[#A84C27]" />
                <span>Read Free Sample</span>
              </button>

              <Link
                href={`/reader/${book.slug}`}
                className="py-3 px-4 rounded-xl border border-[#DDD4C3] bg-[#FAF7F2] hover:bg-[#F3EFE7] text-xs font-semibold uppercase tracking-wider text-[#1E1C1A] transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <Maximize2 className="w-4 h-4 text-[#2B453D]" />
                <span>Web Reader</span>
              </Link>
            </div>

            {/* Digital Delivery Guarantee Box */}
            <div className="mt-6 p-4 rounded-xl bg-[#F3EFE7] border border-[#DDD4C3] space-y-2 text-xs text-[#5C5751]">
              <div className="flex items-center gap-2 text-[#2B453D] font-semibold">
                <Zap className="w-4 h-4 text-[#A84C27]" />
                <span>Instant Digital Delivery</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Immediately available in your personal library. Includes DRM-free
                EPUB for e-readers & high-res PDF.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Metadata, Pricing, Actions */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link
                href={`/category/${book.categorySlug}`}
                className="text-xs uppercase tracking-widest font-semibold text-[#A84C27] hover:underline"
              >
                {book.category}
              </Link>
              <span className="text-[#DDD4C3]">•</span>
              <span className="text-xs text-[#7A736B]">
                Published {book.publishedDate}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#1E1C1A] leading-[1.12]">
              {book.title}
            </h1>

            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-[#7A736B]">By</span>
              <Link
                href={`/author/${book.authorId.replace("author-", "")}`}
                className="text-sm font-medium text-[#1E1C1A] hover:text-[#A84C27] hover:underline transition-colors"
              >
                {book.author}
              </Link>
            </div>

            {/* Rating Stars & Stats */}
            <div className="mt-4 flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1 bg-[#F3EFE7] px-2.5 py-1 rounded-md">
                <Star className="w-4 h-4 fill-[#9B783E] text-[#9B783E]" />
                <span className="font-semibold text-sm text-[#1E1C1A]">
                  {book.rating}
                </span>
                <span className="text-[#7A736B]">
                  ({book.reviewCount} verified reader reviews)
                </span>
              </div>
              <span className="text-[#7A736B] font-mono">
                {book.pages} Pages
              </span>
              <span className="text-[#7A736B]">
                Format: {book.format}
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-6 rounded-2xl bg-[#F3EFE7] border border-[#DDD4C3] space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1C1A]">
                {formatPrice(book.price)}
              </span>
              {book.originalPrice > book.price && (
                <>
                  <span className="text-lg text-[#9C948B] line-through font-serif">
                    {formatPrice(book.originalPrice)}
                  </span>
                  <span className="text-xs font-semibold text-[#A84C27] uppercase tracking-wider bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#DDD4C3]">
                    Save {book.discount}%
                  </span>
                </>
              )}
            </div>

            <p className="text-xs text-[#5C5751] flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#2B453D]" />
              <span>
                One-time purchase • Unlimited cloud access • Read on any device
              </span>
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {/* Buy eBook Primary CTA */}
              <button
                onClick={handleInstantBuy}
                className="flex-1 py-4 px-6 rounded-xl bg-[#1E1C1A] hover:bg-[#A84C27] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buy eBook for {formatPrice(book.price)}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Add to Cart secondary */}
              <button
                onClick={() => addToCart(book)}
                className={`py-4 px-5 rounded-xl border border-[#DDD4C3] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  inCart
                    ? "bg-[#2B453D] text-white"
                    : "bg-[#FAF7F2] hover:bg-[#EAE3D5] text-[#1E1C1A]"
                }`}
                title={inCart ? "In your cart" : "Add to cart"}
              >
                {inCart ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>In Cart</span>
                  </>
                ) : (
                  <span>Add to Cart</span>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(book.id)}
                className="p-4 rounded-xl border border-[#DDD4C3] bg-[#FAF7F2] hover:bg-[#EAE3D5] text-[#5C5751] hover:text-[#A84C27] transition-colors"
                title={isFavorited ? "Saved in wishlist" : "Add to wishlist"}
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    isFavorited ? "fill-[#A84C27] text-[#A84C27]" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* About This Book (Editorial Prose) */}
          <div className="space-y-4 pt-2">
            <h2 className="font-serif text-2xl font-medium text-[#1E1C1A]">
              About This Book
            </h2>

            {book.quote && (
              <blockquote className="italic font-serif text-lg text-[#5C5751] border-l-2 border-[#A84C27] pl-4 py-1">
                "{book.quote}"
              </blockquote>
            )}

            <div className="space-y-4 font-serif text-base text-[#2C2926] leading-relaxed">
              <p>{book.description.split("\n\n")[0]}</p>
              {expandedDesc && book.description.split("\n\n")[1] && (
                <p>{book.description.split("\n\n")[1]}</p>
              )}
            </div>

            {book.description.split("\n\n").length > 1 && (
              <button
                onClick={() => setExpandedDesc(!expandedDesc)}
                className="text-xs font-semibold uppercase tracking-wider text-[#A84C27] hover:underline flex items-center gap-1 pt-1"
              >
                <span>{expandedDesc ? "Show less" : "Read full overview"}</span>
                {expandedDesc ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>

          {/* Book Information Specifications Table */}
          <div className="pt-6 border-t border-[#EAE3D5] space-y-4">
            <h3 className="font-serif text-xl font-medium text-[#1E1C1A]">
              Book Details & Specifications
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#FAF7F2] border border-[#DDD4C3] text-xs">
              <div>
                <span className="text-[#7A736B] block">Author</span>
                <span className="font-medium text-[#1E1C1A] mt-0.5 block truncate">
                  {book.author}
                </span>
              </div>
              <div>
                <span className="text-[#7A736B] block">Publisher</span>
                <span className="font-medium text-[#1E1C1A] mt-0.5 block">
                  Lumina Editions
                </span>
              </div>
              <div>
                <span className="text-[#7A736B] block">Publication Date</span>
                <span className="font-medium text-[#1E1C1A] mt-0.5 block">
                  {book.publishedDate}
                </span>
              </div>
              <div>
                <span className="text-[#7A736B] block">Language</span>
                <span className="font-medium text-[#1E1C1A] mt-0.5 block">
                  {book.language}
                </span>
              </div>
              <div className="pt-3 border-t border-[#EAE3D5]">
                <span className="text-[#7A736B] block">Print Length</span>
                <span className="font-medium text-[#1E1C1A] mt-0.5 block">
                  {book.pages} pages
                </span>
              </div>
              <div className="pt-3 border-t border-[#EAE3D5]">
                <span className="text-[#7A736B] block">File Format</span>
                <span className="font-medium text-[#1E1C1A] mt-0.5 block">
                  {book.format}
                </span>
              </div>
              <div className="pt-3 border-t border-[#EAE3D5]">
                <span className="text-[#7A736B] block">ISBN</span>
                <span className="font-mono text-[11px] text-[#1E1C1A] mt-0.5 block">
                  {book.isbn}
                </span>
              </div>
              <div className="pt-3 border-t border-[#EAE3D5]">
                <span className="text-[#7A736B] block">Delivery</span>
                <span className="font-medium text-[#2B453D] mt-0.5 block">
                  Instant Access
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reader Reviews & Rating Section */}
      <section className="pt-12 border-t border-[#EAE3D5] space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#A84C27] block mb-1">
              Community Discourse
            </span>
            <h2 className="font-serif text-3xl font-medium text-[#1E1C1A]">
              Reader Reviews
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#7A736B]">
            <Star className="w-4 h-4 fill-[#9B783E] text-[#9B783E]" />
            <span className="font-bold text-sm text-[#1E1C1A]">
              {book.rating} out of 5
            </span>
            <span>• Based on {book.reviewCount} verified purchases</span>
          </div>
        </div>

        {/* Rating Breakdown Bars */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 rounded-2xl bg-[#FAF7F2] border border-[#DDD4C3]">
          <div className="md:col-span-4 flex flex-col justify-center items-center text-center p-4 border-b md:border-b-0 md:border-r border-[#EAE3D5]">
            <span className="font-serif text-5xl font-bold text-[#1E1C1A]">
              {book.rating}
            </span>
            <div className="flex items-center gap-1 my-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className="w-4 h-4 fill-[#9B783E] text-[#9B783E]"
                />
              ))}
            </div>
            <span className="text-xs text-[#7A736B]">
              98% of readers recommend this edition
            </span>
          </div>

          <div className="md:col-span-8 space-y-2 justify-center flex flex-col">
            {[
              { stars: 5, pct: 86 },
              { stars: 4, pct: 11 },
              { stars: 3, pct: 2 },
              { stars: 2, pct: 1 },
              { stars: 1, pct: 0 },
            ].map(({ stars, pct }) => (
              <div key={stars} className="flex items-center gap-3 text-xs">
                <span className="w-12 text-[#7A736B]">{stars} stars</span>
                <div className="flex-1 h-2 rounded-full bg-[#EAE3D5] overflow-hidden">
                  <div
                    className="h-full bg-[#A84C27] rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-8 text-right font-mono text-[#7A736B]">
                  {pct}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviewsList.length === 0 ? (
            <p className="text-xs text-[#7A736B] italic">
              No reviews written yet. Be the first reader to share reflections.
            </p>
          ) : (
            reviewsList.map((review) => (
              <div
                key={review.id}
                className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#DDD4C3] space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#1E1C1A]">
                      {review.userName}
                    </span>
                    {review.verifiedPurchase && (
                      <span className="bg-[#2B453D]/10 text-[#2B453D] text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="text-[#9C948B]">{review.date}</span>
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-[#9B783E] text-[#9B783E]"
                    />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#423E3A] font-serif leading-relaxed pt-1">
                  "{review.comment}"
                </p>
              </div>
            ))
          )}
        </div>

        {/* Interactive "Write a Review" Form */}
        <div className="p-6 rounded-2xl bg-[#F3EFE7] border border-[#DDD4C3]">
          <h3 className="font-serif text-xl font-medium text-[#1E1C1A] mb-1">
            Write a Reader Review
          </h3>
          <p className="text-xs text-[#7A736B] mb-4">
            Share your thoughts on the typography, prose, and ideas in this
            edition.
          </p>

          {showReviewSuccess && (
            <div className="mb-4 p-3 bg-[#2B453D]/20 text-[#2B453D] text-xs rounded-xl flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Thank you. Your review has been added to this edition.</span>
            </div>
          )}

          <form onSubmit={handleAddReview} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A736B] mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g., Vikram Roy"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#DDD4C3] bg-[#FAF7F2] text-[#1E1C1A] focus:outline-none focus:border-[#A84C27]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A736B] mb-1">
                  Rating
                </label>
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#DDD4C3] bg-[#FAF7F2] text-[#1E1C1A] focus:outline-none focus:border-[#A84C27]"
                >
                  <option value={5}>5 Stars — Masterpiece</option>
                  <option value={4}>4 Stars — Recommended</option>
                  <option value={3}>3 Stars — Satisfactory</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A736B] mb-1">
                Your Review
              </label>
              <textarea
                required
                rows={3}
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                placeholder="What resonated with you? How was the reading experience?"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#DDD4C3] bg-[#FAF7F2] text-[#1E1C1A] focus:outline-none focus:border-[#A84C27]"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#1E1C1A] hover:bg-[#A84C27] text-white text-xs font-semibold uppercase tracking-wider rounded-full transition-colors"
            >
              Submit Review
            </button>
          </form>
        </div>
      </section>

      {/* "You May Also Like" Related Books */}
      {relatedBooks.length > 0 && (
        <section className="pt-12 border-t border-[#EAE3D5]">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#EAE3D5]">
            <h2 className="font-serif text-3xl font-medium text-[#1E1C1A]">
              You May Also Like
            </h2>
            <Link
              href={`/category/${book.categorySlug}`}
              className="text-xs font-semibold uppercase tracking-wider text-[#A84C27] hover:underline"
            >
              More in {book.category} →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {relatedBooks.map((relBook) => (
              <BookCard key={relBook.id} book={relBook} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
