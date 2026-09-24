"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import {
  X,
  Trash2,
  Zap,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    formatPrice,
  } = useStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#1E1C1A]/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#DDD4C3] shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#EAE3D5] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#A84C27]" />
                  <h3 className="font-serif text-xl font-medium text-[#1E1C1A]">
                    Your Digital Cart
                  </h3>
                  <span className="text-xs text-[#7A736B] font-mono">
                    ({cart.length})
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 text-[#7A736B] hover:text-[#1E1C1A] hover:bg-[#F3EFE7] rounded-full transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Digital Delivery Reassurance Pill */}
              <div className="bg-[#2B453D]/10 border-b border-[#2B453D]/15 px-6 py-2.5 flex items-center gap-2 text-xs text-[#2B453D] font-medium">
                <Zap className="w-3.5 h-3.5 text-[#A84C27] shrink-0" />
                <span>Instant Digital Delivery • EPUB, PDF & Web Reader</span>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-[#F3EFE7] flex items-center justify-center mb-4 text-[#DDD4C3]">
                      <ShoppingBag className="w-8 h-8 text-[#9C948B]" />
                    </div>
                    <h4 className="font-serif text-xl text-[#1E1C1A]">
                      Your cart is empty
                    </h4>
                    <p className="text-xs text-[#7A736B] mt-2 max-w-xs">
                      Your next great read is waiting. Explore our curated
                      collection of independent digital books.
                    </p>
                    <Link
                      href="/books"
                      onClick={() => setIsCartOpen(false)}
                      className="mt-6 inline-flex items-center gap-2 bg-[#1E1C1A] hover:bg-[#A84C27] text-white text-xs font-medium px-5 py-2.5 rounded-full transition-colors"
                    >
                      <span>Explore Catalog</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center text-xs text-[#7A736B] pb-2">
                      <span>Selected eBooks</span>
                      <button
                        onClick={clearCart}
                        className="hover:text-[#A84C27] underline transition-colors"
                      >
                        Clear all
                      </button>
                    </div>

                    <div className="divide-y divide-[#EAE3D5]">
                      {cart.map(({ book }) => (
                        <div
                          key={book.id}
                          className="py-4 flex gap-4 items-start group"
                        >
                          {/* Book Thumbnail */}
                          <div className="w-14 aspect-[2/3] relative rounded overflow-hidden shadow-xs shrink-0 bg-[#EAE3D5]">
                            <Image
                              src={book.coverImage}
                              alt={book.title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <h5 className="font-serif text-sm font-medium text-[#1E1C1A] leading-snug line-clamp-1">
                              {book.title}
                            </h5>
                            <p className="text-xs text-[#7A736B] truncate">
                              {book.author}
                            </p>
                            <div className="mt-1 flex items-center gap-2 text-[10px] text-[#2B453D] font-medium">
                              <span className="bg-[#2B453D]/10 px-1.5 py-0.5 rounded">
                                {book.format}
                              </span>
                              <span>Instant Download</span>
                            </div>

                            <div className="mt-2 flex items-center justify-between">
                              <div className="flex items-baseline gap-1.5">
                                <span className="font-serif text-sm font-semibold text-[#1E1C1A]">
                                  {formatPrice(book.price)}
                                </span>
                                {book.originalPrice > book.price && (
                                  <span className="text-[11px] text-[#9C948B] line-through font-serif">
                                    {formatPrice(book.originalPrice)}
                                  </span>
                                )}
                              </div>

                              <button
                                onClick={() => removeFromCart(book.id)}
                                className="text-xs text-[#9C948B] hover:text-[#A84C27] p-1 transition-colors"
                                title="Remove eBook"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {cart.length > 0 && (
                <div className="p-6 bg-[#F3EFE7] border-t border-[#EAE3D5] space-y-4">
                  <div className="space-y-1.5 text-xs text-[#5C5751]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-serif text-sm text-[#1E1C1A]">
                        {formatPrice(cartSubtotal)}
                      </span>
                    </div>

                    {cartDiscount > 0 && (
                      <div className="flex justify-between text-[#A84C27]">
                        <span>eBook Discount Savings</span>
                        <span className="font-serif text-sm font-medium">
                          -{formatPrice(cartDiscount)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-xs pt-1">
                      <span>Delivery</span>
                      <span className="text-[#2B453D] font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Free Digital Delivery
                      </span>
                    </div>

                    <div className="pt-2 border-t border-[#DDD4C3] flex justify-between items-baseline text-sm font-semibold text-[#1E1C1A]">
                      <span className="font-serif text-base">Total</span>
                      <span className="font-serif text-xl font-bold text-[#1E1C1A]">
                        {formatPrice(cartTotal)}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-3.5 px-4 bg-[#1E1C1A] hover:bg-[#A84C27] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#7A736B]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2B453D]" />
                    <span>256-bit Secure Checkout • 100% Digital Access</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
