"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { books } from "@/data/books";
import { categories } from "@/data/categories";
import { authors } from "@/data/authors";
import { testimonials } from "@/data/testimonials";
import BookCard from "@/components/BookCard";
import KineticHero from "@/components/KineticHero";
import AnimatedMarquee from "@/components/AnimatedMarquee";
import CursorBookIndex from "@/components/CursorBookIndex";
import StickyScrollExperience from "@/components/StickyScrollExperience";
import InteractiveReadingSimulator from "@/components/InteractiveReadingSimulator";
import SectionDividerRibbon from "@/components/SectionDividerRibbon";
import { useStore } from "@/context/StoreContext";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Zap,
  ShieldCheck,
  Smartphone,
  Library,
  Star,
  ArrowUpRight,
  Compass,
} from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const { formatPrice, openPreview } = useStore();

  const featuredEditorialBook = books[0]; // The Art of Deep Work
  const featuredBooks = books.slice(1, 5);
  const bestSellers = books
    .filter((b) => b.bestSeller)
    .sort((a, b) => (a.bestSellerRank || 99) - (b.bestSellerRank || 99));
  const newReleases = books.filter((b) => b.newRelease);
  const editorialCurated = [books[2], books[4], books[7]]; // Architecture of Silence, Synthetics, Quiet Courage

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. KINETIC HERO SECTION WITH 3D MOUSE-TRACKING BOOK */}
      <KineticHero />

      {/* 2. INFINITE KINETIC MARQUEE */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
      >
        <AnimatedMarquee
          items={[
            "INDEPENDENT DIGITAL EDITIONS",
            "100% DRM-FREE SOVEREIGNTY",
            "85% AUTHOR ROYALTIES",
            "CALM DISTRACTION-FREE READING",
            "EPUB & HIGH-RES PDF",
          ]}
          direction="left"
          speed={32}
          theme="dark"
        />
      </motion.div>

      {/* 3. CURSOR-FOLLOWING EDITORIAL BOOK INDEX */}
      <CursorBookIndex />

      <SectionDividerRibbon />

      {/* 4. STICKY VIEWPORT SCROLLYTELLING (FOCUS → IMMERSION → SOVEREIGNTY → EQUITY) */}
      <StickyScrollExperience />

      {/* 5. TACTILE DRAGGABLE READING EXPERIENCE SIMULATOR */}
      <InteractiveReadingSimulator />

      <SectionDividerRibbon />

      {/* 6. FEATURED BOOKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#EAE3D5]"
        >
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#A84C27] block mb-1">
              Curated Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] font-medium">
              Featured Books
            </h2>
          </div>
          <Link
            href="/books"
            className="mt-3 md:mt-0 text-xs font-semibold uppercase tracking-wider text-[#1E1C1A] hover:text-[#A84C27] flex items-center gap-1.5 transition-colors group"
          >
            <span>View All Titles</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Editorial Feature Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <BookCard book={featuredEditorialBook} variant="editorial" priority />
        </motion.div>

        {/* Companion Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {featuredBooks.map((book, idx) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <BookCard book={book} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. FIND YOUR NEXT READ (CATEGORY-BASED DISCOVERY) */}
      <section
        id="categories"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-[#A84C27] block mb-1">
            Browse by Discipline
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] font-medium">
            Find Your Next Read
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5751] mt-2 leading-relaxed">
            Deliberately curated categories spanning philosophy, technology,
            narrative fiction, and human potential.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 6).map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
            >
              <Link
                href={`/category/${cat.slug}`}
                className="group relative rounded-2xl overflow-hidden border border-[#DDD4C3] bg-[#FAF7F2] p-6 sm:p-7 hover:border-[#1E1C1A] transition-all duration-300 flex flex-col justify-between h-56 shadow-xs hover:shadow-md"
              >
                <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover grayscale group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#7A736B]">
                      {cat.bookCount} Titles
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#F3EFE7] group-hover:bg-[#1E1C1A] group-hover:text-white flex items-center justify-center transition-colors">
                      <ArrowUpRight className="w-4 h-4 text-[#7A736B] group-hover:text-white transition-colors" />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl font-medium text-[#1E1C1A] group-hover:text-[#A84C27] transition-colors mt-4">
                    {cat.name}
                  </h3>
                </div>

                <p className="relative z-10 text-xs text-[#5C5751] line-clamp-2 leading-relaxed mt-2">
                  {cat.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all categories pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {categories.slice(6).map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="px-4 py-2 rounded-full bg-[#F3EFE7] hover:bg-[#EAE3D5] text-xs font-medium text-[#1E1C1A] transition-colors border border-[#DDD4C3]/60 flex items-center gap-1.5"
            >
              <span>{cat.name}</span>
              <span className="text-[10px] text-[#7A736B]">
                ({cat.bookCount})
              </span>
            </Link>
          ))}
        </motion.div>
      </section>

      {/* 8. BEST SELLERS (NUMBERED HORIZONTAL TRACK) */}
      <section className="bg-[#1E1C1A] text-[#FAF7F2] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#2C2926]"
          >
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-[#A84C27] block mb-1">
                Reader Favorites
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium">
                Best Sellers
              </h2>
            </div>
            <p className="mt-2 md:mt-0 text-xs text-[#9C948B] max-w-sm">
              The most widely read and reviewed digital editions across the
              marketplace.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {bestSellers.slice(0, 5).map((book, idx) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative flex flex-col justify-between bg-[#242220] rounded-xl p-4 border border-[#3A3632] hover:border-[#A84C27] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-serif text-xl font-bold text-[#A84C27]">
                      0{idx + 1}
                    </span>
                    <div className="flex items-center text-[#9C948B] text-[11px]">
                      <Star className="w-3 h-3 fill-[#9B783E] text-[#9B783E] mr-1" />
                      <span>{book.rating}</span>
                    </div>
                  </div>

                  <Link
                    href={`/book/${book.slug}`}
                    className="block aspect-[2/3] relative rounded overflow-hidden shadow-md mb-3 bg-[#1E1C1A]"
                  >
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      className="object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                  </Link>

                  <Link href={`/book/${book.slug}`}>
                    <h4 className="font-serif text-base font-medium text-white group-hover:text-[#A84C27] transition-colors line-clamp-1 leading-snug">
                      {book.title}
                    </h4>
                  </Link>

                  <p className="text-xs text-[#9C948B] truncate mt-0.5">
                    {book.author}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#3A3632] flex items-center justify-between">
                  <span className="font-serif text-sm font-semibold text-white">
                    {formatPrice(book.price)}
                  </span>
                  <button
                    onClick={() => openPreview(book)}
                    className="text-[11px] uppercase tracking-wider text-[#A84C27] hover:text-white font-medium"
                  >
                    Sample →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. EDITORIAL RECOMMENDATION ("Curated for Curious Minds") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] rounded-3xl border border-[#DDD4C3] p-8 sm:p-14 overflow-hidden relative paper-grain">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mb-12"
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-[#A84C27] block mb-2">
              The Editor's Dispatch
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1E1C1A] font-medium leading-tight">
              Curated for Curious Minds.
            </h2>
            <p className="text-sm sm:text-base text-[#5C5751] mt-3 leading-relaxed">
              A selection of books chosen for readers who want to learn, grow,
              create, and think differently. Each edition includes formatted notes
              and author commentary.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 bg-[#F3EFE7] rounded-2xl p-6 sm:p-8 border border-[#EAE3D5] flex flex-col sm:flex-row gap-6 items-center"
            >
              <div className="w-40 sm:w-48 aspect-[2/3] relative rounded shadow-xl shrink-0 overflow-hidden bg-[#EAE3D5]">
                <div className="book-spine-effect" />
                <Image
                  src={editorialCurated[0].coverImage}
                  alt={editorialCurated[0].title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-[#A84C27] font-semibold">
                  Literature & Exile
                </span>
                <Link href={`/book/${editorialCurated[0].slug}`}>
                  <h3 className="font-serif text-2xl font-medium text-[#1E1C1A] hover:text-[#A84C27] transition-colors leading-snug">
                    {editorialCurated[0].title}
                  </h3>
                </Link>
                <p className="text-xs text-[#7A736B]">
                  By {editorialCurated[0].author}
                </p>
                <p className="text-xs text-[#5C5751] line-clamp-3 leading-relaxed">
                  {editorialCurated[0].shortDescription}
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <span className="font-serif text-base font-semibold text-[#1E1C1A]">
                    {formatPrice(editorialCurated[0].price)}
                  </span>
                  <Link
                    href={`/book/${editorialCurated[0].slug}`}
                    className="text-xs font-semibold text-[#A84C27] hover:underline"
                  >
                    Explore Edition →
                  </Link>
                </div>
              </div>
            </motion.div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {editorialCurated.slice(1).map((book, idx) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="p-5 rounded-2xl bg-[#F3EFE7] border border-[#EAE3D5] flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[2/3] relative rounded overflow-hidden shadow-md mb-3 bg-[#EAE3D5]">
                      <div className="book-spine-effect" />
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-[#A84C27] font-semibold block">
                      {book.category}
                    </span>
                    <Link href={`/book/${book.slug}`}>
                      <h4 className="font-serif text-lg font-medium text-[#1E1C1A] hover:text-[#A84C27] transition-colors line-clamp-1 mt-1">
                        {book.title}
                      </h4>
                    </Link>
                    <p className="text-xs text-[#7A736B] truncate">
                      {book.author}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#DDD4C3] flex items-center justify-between">
                    <span className="font-serif text-sm font-semibold text-[#1E1C1A]">
                      {formatPrice(book.price)}
                    </span>
                    <Link
                      href={`/book/${book.slug}`}
                      className="text-xs font-semibold text-[#1E1C1A] hover:text-[#A84C27]"
                    >
                      View →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. NEW RELEASES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#EAE3D5]"
        >
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#A84C27] block mb-1">
              Fresh Off the Press
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] font-medium">
              New Releases
            </h2>
          </div>
          <Link
            href="/books?sort=newest"
            className="mt-3 md:mt-0 text-xs font-semibold uppercase tracking-wider text-[#1E1C1A] hover:text-[#A84C27] flex items-center gap-1.5 transition-colors group"
          >
            <span>Explore New Releases</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {newReleases.map((book, idx) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <BookCard book={book} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 11. MEET THE AUTHORS */}
      <section
        id="authors"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-[#A84C27] block mb-1">
            Voices of Consequence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] font-medium">
            Meet the Authors
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5751] mt-2 leading-relaxed">
            Independent researchers, essayists, and novelists writing without
            algorithmic compromise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {authors.slice(0, 4).map((author, idx) => (
            <motion.div
              key={author.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-[#FAF7F2] border border-[#DDD4C3] rounded-2xl p-6 hover:shadow-md hover:border-[#1E1C1A] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-20 h-20 relative rounded-full overflow-hidden mx-auto mb-4 border-2 border-[#EAE3D5] group-hover:border-[#A84C27] transition-colors">
                  <Image
                    src={author.photo}
                    alt={author.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="text-center space-y-1">
                  <h3 className="font-serif text-xl font-medium text-[#1E1C1A] group-hover:text-[#A84C27] transition-colors">
                    {author.name}
                  </h3>
                  <span className="text-[11px] uppercase tracking-wider text-[#A84C27] font-semibold block">
                    {author.primaryGenre}
                  </span>
                  <span className="text-xs text-[#7A736B] block">
                    {author.booksCount} Published Books
                  </span>
                </div>

                <p className="text-xs text-[#5C5751] mt-3 line-clamp-3 text-center leading-relaxed">
                  {author.bio}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EAE3D5] text-center">
                <Link
                  href={`/author/${author.slug}`}
                  className="text-xs font-semibold uppercase tracking-wider text-[#1E1C1A] hover:text-[#A84C27] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Explore Author</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 12. SECONDARY REVERSE MARQUEE (TERRACOTTA) */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
      >
        <AnimatedMarquee
          items={[
            "DISCOVER SOMETHING WORTH READING",
            "85% ROYALTY RATE",
            "SOVEREIGN HUMAN INTELLECT",
            "NO CORPORATE SPONSORS",
          ]}
          direction="right"
          speed={36}
          theme="terracotta"
        />
      </motion.div>

      {/* 13. READER TESTIMONIALS */}
      <section className="bg-[#F3EFE7] py-16 sm:py-20 border-y border-[#DDD4C3]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-[#A84C27]">
            Reader Reflections
          </span>

          <div className="space-y-6">
            <blockquote className="font-serif text-2xl sm:text-4xl text-[#1E1C1A] font-light leading-snug italic">
              "{testimonials[0].quote}"
            </blockquote>

            <div className="pt-2">
              <span className="font-semibold text-sm text-[#1E1C1A] block">
                {testimonials[0].author}
              </span>
              <span className="text-xs text-[#7A736B]">
                {testimonials[0].role} •{" "}
                <span className="text-[#2B453D]">{testimonials[0].source}</span>
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 14. TRUST & GUARANTEES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10 border-t border-[#EAE3D5]">
          {[
            {
              icon: Zap,
              title: "Instant Digital Access",
              desc: "Receive your eBook immediately after successful payment in EPUB and PDF formats.",
              color: "text-[#A84C27]",
            },
            {
              icon: ShieldCheck,
              title: "Secure Payments",
              desc: "Encrypted transactions supporting UPI, Cards, NetBanking, and Stripe worldwide.",
              color: "text-[#2B453D]",
            },
            {
              icon: Smartphone,
              title: "Read Anywhere",
              desc: "Enjoy your titles across Kindle, Apple Books, Kobo, or right in our distraction-free web reader.",
              color: "text-[#9B783E]",
            },
            {
              icon: Library,
              title: "Lifetime Cloud Library",
              desc: "Your purchased library stays synchronized with reading progress and unlimited re-downloads.",
              color: "text-[#1E1C1A]",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex gap-4 items-start"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#DDD4C3] flex items-center justify-center shrink-0 ${item.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-[#1E1C1A]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#5C5751] mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
