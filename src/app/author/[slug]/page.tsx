"use client";

import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { authors } from "@/data/authors";
import { books } from "@/data/books";
import BookCard from "@/components/BookCard";
import { ArrowLeft, BookOpen, Star, Sparkles, Globe } from "lucide-react";

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export default function AuthorProfilePage({ params }: AuthorPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const author = authors.find(
    (a) => a.slug === slug || a.id === `author-${slug}`
  );
  if (!author) {
    notFound();
  }

  const authorBooks = books.filter(
    (b) => b.authorId === author.id || b.author === author.name
  );
  const latestBook = authorBooks.find((b) => b.newRelease) || authorBooks[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-14">
      {/* Back button */}
      <div>
        <Link
          href="/#authors"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#7A736B] hover:text-[#1E1C1A] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Authors</span>
        </Link>
      </div>

      {/* Author Bio Header Card */}
      <div className="p-8 sm:p-14 rounded-3xl bg-[#FAF7F2] border border-[#DDD4C3] paper-grain flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-12">
        {/* Portrait */}
        <div className="w-36 h-36 sm:w-44 sm:h-44 relative rounded-full overflow-hidden border-4 border-[#EAE3D5] shadow-md shrink-0">
          <Image
            src={author.photo}
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="text-xs uppercase tracking-widest text-[#A84C27] font-semibold">
              {author.primaryGenre}
            </span>
            <span className="text-[#DDD4C3]">•</span>
            <span className="text-xs text-[#7A736B]">
              {author.booksCount} Published Editions
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#1E1C1A]">
            {author.name}
          </h1>

          {author.quote && (
            <blockquote className="italic font-serif text-base sm:text-lg text-[#5C5751] border-l-2 border-[#A84C27] pl-3 py-1">
              "{author.quote}"
            </blockquote>
          )}

          <p className="text-xs sm:text-sm text-[#423E3A] leading-relaxed max-w-2xl font-light">
            {author.bio}
          </p>
        </div>
      </div>

      {/* Latest Release Spotlight (if exists) */}
      {latestBook && (
        <div className="space-y-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#A84C27] block">
            Spotlight Edition
          </span>
          <BookCard book={latestBook} variant="editorial" />
        </div>
      )}

      {/* Books by Author Grid */}
      <div className="space-y-8 pt-6 border-t border-[#EAE3D5]">
        <div className="flex items-center justify-between pb-4 border-b border-[#EAE3D5]">
          <h2 className="font-serif text-3xl font-medium text-[#1E1C1A]">
            Books by {author.name}
          </h2>
          <span className="text-xs font-mono text-[#7A736B]">
            {authorBooks.length} Available Digital Editions
          </span>
        </div>

        {authorBooks.length === 0 ? (
          <p className="text-sm text-[#7A736B] italic">
            Additional works by this author are currently undergoing editorial
            typesetting.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {authorBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
