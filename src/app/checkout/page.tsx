"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { books } from "@/data/books";
import {
  ShieldCheck,
  Zap,
  CreditCard,
  QrCode,
  Smartphone,
  CheckCircle,
  ArrowRight,
  Lock,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    formatPrice,
    addToLibrary,
    clearCart,
  } = useStore();

  // If cart is empty, fallback to demo book for review purposes
  const checkoutItems =
    cart.length > 0 ? cart.map((i) => i.book) : [books[0]];

  const activeTotal =
    cart.length > 0 ? cartTotal : books[0].price;
  const activeDiscount =
    cart.length > 0
      ? cartDiscount
      : books[0].originalPrice - books[0].price;

  // Step state: 1 (Order Review), 2 (Payment Details), 3 (Processing)
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [paymentRegion, setPaymentRegion] = useState<"india" | "international">(
    "india"
  );
  const [paymentMethod, setPaymentMethod] = useState<string>("upi");

  // Form Fields
  const [customerEmail, setCustomerEmail] = useState("reader@lumina.io");
  const [customerName, setCustomerName] = useState("Vikram Malhotra");
  const [upiId, setUpiId] = useState("vikram@okaxis");
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("942");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate instant secure payment verification & digital file license generation
    setTimeout(() => {
      // Add all purchased books to user's local cloud library
      checkoutItems.forEach((b) => addToLibrary(b));
      clearCart();
      const orderId = `LUM-${Math.floor(100000 + Math.random() * 900000)}`;
      router.push(`/order-success/${orderId}`);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Back button */}
      <div>
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#7A736B] hover:text-[#1E1C1A] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Cart</span>
        </Link>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center gap-2">
          <span
            className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
              currentStep === 1
                ? "bg-[#1E1C1A] text-white"
                : "bg-[#2B453D] text-white"
            }`}
          >
            01
          </span>
          <span className="text-xs font-medium text-[#1E1C1A]">Order</span>
        </div>
        <div className="flex-1 h-0.5 bg-[#DDD4C3] mx-3" />
        <div className="flex items-center gap-2">
          <span
            className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
              currentStep === 2
                ? "bg-[#1E1C1A] text-white"
                : "bg-[#EAE3D5] text-[#7A736B]"
            }`}
          >
            02
          </span>
          <span className="text-xs font-medium text-[#1E1C1A]">Payment</span>
        </div>
        <div className="flex-1 h-0.5 bg-[#DDD4C3] mx-3" />
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center bg-[#EAE3D5] text-[#7A736B]">
            03
          </span>
          <span className="text-xs font-medium text-[#7A736B]">Access</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form: Step 1 or Step 2 */}
        <div className="lg:col-span-7 bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#DDD4C3] shadow-xs space-y-6">
          {currentStep === 1 ? (
            /* Step 1: Customer Contact & Delivery Details */
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#EAE3D5]">
                <h2 className="font-serif text-2xl font-medium text-[#1E1C1A]">
                  Step 01 — Digital License Recipient
                </h2>
                <p className="text-xs text-[#7A736B] mt-1">
                  Your eBooks and cryptographic access tokens will be delivered to
                  this email.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A736B] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-[#DDD4C3] bg-[#FAF7F2] text-[#1E1C1A] focus:outline-none focus:border-[#A84C27]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A736B] mb-1">
                    Email Address (For eBook Delivery)
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-[#DDD4C3] bg-[#FAF7F2] text-[#1E1C1A] focus:outline-none focus:border-[#A84C27]"
                  />
                  <span className="text-[11px] text-[#7A736B] mt-1 block">
                    Download links and reading receipts are sent here immediately.
                  </span>
                </div>
              </div>

              {/* Digital Delivery Affirmation */}
              <div className="p-4 rounded-xl bg-[#2B453D]/10 border border-[#2B453D]/20 text-xs text-[#2B453D] flex items-center gap-3">
                <Zap className="w-5 h-5 text-[#A84C27] shrink-0" />
                <span>
                  <strong>Zero Shipping Required:</strong> Instant cloud
                  synchronization and direct download to Kindle / Apple Books.
                </span>
              </div>

              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="w-full py-4 px-6 bg-[#1E1C1A] hover:bg-[#A84C27] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Step 2: Payment Gateway Selection */
            <form onSubmit={handleCompleteOrder} className="space-y-6">
              <div className="pb-4 border-b border-[#EAE3D5] flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-medium text-[#1E1C1A]">
                    Step 02 — Payment Method
                  </h2>
                  <p className="text-xs text-[#7A736B] mt-1">
                    Select your preferred regional or international payment
                    gateway.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-[#A84C27] hover:underline"
                >
                  Edit details
                </button>
              </div>

              {/* Region Selector */}
              <div className="flex rounded-xl bg-[#EAE3D5] p-1 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setPaymentRegion("india");
                    setPaymentMethod("upi");
                  }}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    paymentRegion === "india"
                      ? "bg-[#FAF7F2] text-[#1E1C1A] shadow-xs font-semibold"
                      : "text-[#7A736B]"
                  }`}
                >
                  India (UPI, Cards, NetBanking)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPaymentRegion("international");
                    setPaymentMethod("stripe");
                  }}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    paymentRegion === "international"
                      ? "bg-[#FAF7F2] text-[#1E1C1A] shadow-xs font-semibold"
                      : "text-[#7A736B]"
                  }`}
                >
                  International (Cards, Apple Pay)
                </button>
              </div>

              {/* Payment Gateways */}
              {paymentRegion === "india" ? (
                <div className="space-y-3">
                  {/* UPI */}
                  <label
                    className={`block p-4 rounded-2xl border transition-all cursor-pointer ${
                      paymentMethod === "upi"
                        ? "border-[#A84C27] bg-[#FBF3EF]"
                        : "border-[#DDD4C3] bg-[#FAF7F2]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "upi"}
                          onChange={() => setPaymentMethod("upi")}
                          className="accent-[#A84C27]"
                        />
                        <span className="text-xs font-bold text-[#1E1C1A]">
                          Instant UPI / QR Code
                        </span>
                      </div>
                      <span className="text-[11px] text-[#2B453D] font-medium bg-[#2B453D]/10 px-2 py-0.5 rounded">
                        Fastest • Zero Convenience Fee
                      </span>
                    </div>

                    {paymentMethod === "upi" && (
                      <div className="mt-3 pt-3 border-t border-[#DDD4C3]/60 space-y-2">
                        <label className="text-[11px] text-[#7A736B] block">
                          Enter UPI VPA (e.g. mobile@upi, name@okaxis)
                        </label>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#DDD4C3] bg-white text-[#1E1C1A]"
                        />
                      </div>
                    )}
                  </label>

                  {/* Cards & NetBanking */}
                  <label
                    className={`block p-4 rounded-2xl border transition-all cursor-pointer ${
                      paymentMethod === "razorpay"
                        ? "border-[#A84C27] bg-[#FBF3EF]"
                        : "border-[#DDD4C3] bg-[#FAF7F2]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "razorpay"}
                          onChange={() => setPaymentMethod("razorpay")}
                          className="accent-[#A84C27]"
                        />
                        <span className="text-xs font-bold text-[#1E1C1A]">
                          Razorpay (Credit / Debit Cards, NetBanking, Wallets)
                        </span>
                      </div>
                      <CreditCard className="w-4 h-4 text-[#7A736B]" />
                    </div>
                  </label>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Stripe Card */}
                  <label
                    className={`block p-4 rounded-2xl border transition-all cursor-pointer ${
                      paymentMethod === "stripe"
                        ? "border-[#A84C27] bg-[#FBF3EF]"
                        : "border-[#DDD4C3] bg-[#FAF7F2]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "stripe"}
                          onChange={() => setPaymentMethod("stripe")}
                          className="accent-[#A84C27]"
                        />
                        <span className="text-xs font-bold text-[#1E1C1A]">
                          Credit or Debit Card (Powered by Stripe)
                        </span>
                      </div>
                      <CreditCard className="w-4 h-4 text-[#7A736B]" />
                    </div>

                    {paymentMethod === "stripe" && (
                      <div className="mt-3 pt-3 border-t border-[#DDD4C3]/60 space-y-3">
                        <div>
                          <label className="text-[11px] text-[#7A736B] block mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#DDD4C3] bg-white text-[#1E1C1A]"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] text-[#7A736B] block mb-1">
                              Expires (MM/YY)
                            </label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#DDD4C3] bg-white text-[#1E1C1A]"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] text-[#7A736B] block mb-1">
                              CVC
                            </label>
                            <input
                              type="text"
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#DDD4C3] bg-white text-[#1E1C1A]"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </label>

                  {/* Apple / Google Pay */}
                  <label
                    className={`block p-4 rounded-2xl border transition-all cursor-pointer ${
                      paymentMethod === "digital_wallet"
                        ? "border-[#A84C27] bg-[#FBF3EF]"
                        : "border-[#DDD4C3] bg-[#FAF7F2]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "digital_wallet"}
                          onChange={() => setPaymentMethod("digital_wallet")}
                          className="accent-[#A84C27]"
                        />
                        <span className="text-xs font-bold text-[#1E1C1A]">
                          Apple Pay / Google Pay / 1-Click
                        </span>
                      </div>
                      <Smartphone className="w-4 h-4 text-[#7A736B]" />
                    </div>
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 bg-[#1E1C1A] hover:bg-[#A84C27] disabled:bg-[#7A736B] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Generating Secure License...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay {formatPrice(activeTotal)} & Get Instant Access</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#7A736B]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2B453D]" />
                <span>
                  PCI-DSS Level 1 Encrypted • Instant Lifetime Download Guarantee
                </span>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Order Summary with Book Covers */}
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-[#F3EFE7] border border-[#DDD4C3] space-y-6">
          <h3 className="font-serif text-xl font-medium text-[#1E1C1A] pb-3 border-b border-[#DDD4C3]">
            Digital Order Summary
          </h3>

          <div className="divide-y divide-[#EAE3D5] max-h-72 overflow-y-auto pr-1">
            {checkoutItems.map((book) => (
              <div key={book.id} className="py-3 flex items-center gap-3">
                <div className="w-12 aspect-[2/3] relative rounded overflow-hidden shadow-xs shrink-0 bg-[#EAE3D5]">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm font-medium text-[#1E1C1A] truncate">
                    {book.title}
                  </h4>
                  <p className="text-[11px] text-[#7A736B]">{book.author}</p>
                  <span className="text-[10px] text-[#2B453D] font-mono">
                    {book.format} • DRM-Free
                  </span>
                </div>
                <span className="font-serif text-sm font-semibold text-[#1E1C1A]">
                  {formatPrice(book.price)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs text-[#5C5751] pt-3 border-t border-[#DDD4C3]">
            {activeDiscount > 0 && (
              <div className="flex justify-between text-[#A84C27]">
                <span>Total Discount Applied</span>
                <span className="font-serif text-sm font-medium">
                  -{formatPrice(activeDiscount)}
                </span>
              </div>
            )}

            <div className="flex justify-between text-xs">
              <span>Digital Fulfillment</span>
              <span className="text-[#2B453D] font-semibold">Instant Access</span>
            </div>

            <div className="pt-3 border-t border-[#DDD4C3] flex justify-between items-baseline text-base font-bold text-[#1E1C1A]">
              <span className="font-serif text-lg">Total Amount</span>
              <span className="font-serif text-2xl font-bold text-[#1E1C1A]">
                {formatPrice(activeTotal)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
