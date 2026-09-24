"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Tag,
  CheckCircle,
  BookOpen,
} from "lucide-react";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    formatPrice,
  } = useStore();

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toLowerCase() === "lumina10" || promoCode.trim().toLowerCase() === "read") {
      setPromoApplied(true);
    }
  };

  const finalDiscount = promoApplied ? cartDiscount + cartTotal * 0.1 : cartDiscount;
  const finalTotal = promoApplied ? Math.max(0, cartTotal * 0.9) : cartTotal;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="pb-6 border-b border-[#EAE3D5]">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A84C27] font-semibold mb-2">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Review Order</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#1E1C1A]">
              Shopping Cart
            </h1>
            <p className="text-xs sm:text-sm text-[#5C5751] mt-2 leading-relaxed">
              Instant digital delivery to your personal library upon checkout.
            </p>
          </div>
          <span className="text-xs font-mono text-[#7A736B]">
            {cart.length} {cart.length === 1 ? "eBook" : "eBooks"} Selected
          </span>
        </div>
      </div>

      {cart.length === 0 ? (
        /* Empty State */
        <div className="py-24 text-center bg-[#FAF7F2] rounded-3xl border border-[#DDD4C3] p-8 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#F3EFE7] flex items-center justify-center mx-auto mb-4 text-[#7A736B]">
            <ShoppingBag className="w-8 h-8 text-[#9C948B]" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1E1C1A]">
            Your cart is empty
          </h2>
          <p className="text-xs sm:text-sm text-[#7A736B] mt-2 max-w-sm mx-auto leading-relaxed">
            Your next great read is waiting. Explore our carefully curated
            catalogue of independent publications.
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
        /* Cart Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Items list */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between text-xs text-[#7A736B] px-2">
              <span>Selected Digital Titles</span>
              <button
                onClick={clearCart}
                className="hover:text-[#A84C27] underline transition-colors"
              >
                Clear all items
              </button>
            </div>

            <div className="divide-y divide-[#EAE3D5] bg-[#FAF7F2] rounded-2xl border border-[#DDD4C3] overflow-hidden">
              {cart.map(({ book }) => (
                <div
                  key={book.id}
                  className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4 min-w-0">
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
                        <h3 className="font-serif text-lg font-medium text-[#1E1C1A] hover:text-[#A84C27] transition-colors leading-snug line-clamp-1">
                          {book.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-[#7A736B]">By {book.author}</p>
                      <div className="mt-1 flex items-center gap-2 text-[10px] text-[#2B453D] font-medium">
                        <span className="bg-[#2B453D]/10 px-1.5 py-0.5 rounded">
                          {book.format}
                        </span>
                        <span>• Instant Digital Access</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-[#EAE3D5]">
                    <div className="text-left sm:text-right">
                      <span className="font-serif text-lg font-bold text-[#1E1C1A] block">
                        {formatPrice(book.price)}
                      </span>
                      {book.originalPrice > book.price && (
                        <span className="text-xs text-[#9C948B] line-through font-serif">
                          {formatPrice(book.originalPrice)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => removeFromCart(book.id)}
                      className="p-2 text-[#9C948B] hover:text-[#A84C27] transition-colors rounded-lg hover:bg-[#F3EFE7]"
                      title="Remove eBook"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Instant Delivery Notice */}
            <div className="p-4 rounded-xl bg-[#2B453D]/10 border border-[#2B453D]/20 text-xs text-[#2B453D] flex items-center gap-3">
              <Zap className="w-4 h-4 text-[#A84C27] shrink-0" />
              <span>
                <strong>Digital Delivery Notice:</strong> No shipping address or
                delivery charges. eBooks will be accessible instantly in your
                library and sent to your email.
              </span>
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-[#F3EFE7] border border-[#DDD4C3] space-y-6">
            <h3 className="font-serif text-xl font-medium text-[#1E1C1A] pb-3 border-b border-[#DDD4C3]">
              Order Summary
            </h3>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#7A736B] block">
                Promo Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Try: LUMINA10"
                  className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-[#DDD4C3] bg-[#FAF7F2] text-[#1E1C1A] uppercase focus:outline-none focus:border-[#A84C27]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1E1C1A] hover:bg-[#A84C27] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <span className="text-[11px] text-[#2B453D] font-medium block">
                  ✓ 10% Reader Discount applied!
                </span>
              )}
            </form>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-[#5C5751] pt-3 border-t border-[#DDD4C3]">
              <div className="flex justify-between">
                <span>Total Catalog Value</span>
                <span className="font-serif text-sm text-[#1E1C1A]">
                  {formatPrice(cartSubtotal)}
                </span>
              </div>

              {finalDiscount > 0 && (
                <div className="flex justify-between text-[#A84C27]">
                  <span>Total Discount Savings</span>
                  <span className="font-serif text-sm font-semibold">
                    -{formatPrice(finalDiscount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-xs pt-1">
                <span>Digital Delivery</span>
                <span className="text-[#2B453D] font-semibold">FREE</span>
              </div>

              <div className="pt-3 border-t border-[#DDD4C3] flex justify-between items-baseline text-base font-bold text-[#1E1C1A]">
                <span className="font-serif text-lg">Total Due</span>
                <span className="font-serif text-2xl font-bold text-[#1E1C1A]">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-4 px-6 bg-[#1E1C1A] hover:bg-[#A84C27] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#7A736B]">
              <ShieldCheck className="w-4 h-4 text-[#2B453D]" />
              <span>256-bit Encrypted Checkout • Instant Download</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
