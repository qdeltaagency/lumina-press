"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { Home, Compass, BookOpen, Bookmark, ShoppingBag } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  const { cart, wishlist, library, setIsCartOpen } = useStore();

  // Hide bottom nav on full-screen reader page
  if (pathname.startsWith("/reader")) {
    return null;
  }

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Explore", href: "/books", icon: Compass },
    {
      name: "Library",
      href: "/library",
      icon: BookOpen,
      badge: library.length > 0 ? library.length : undefined,
    },
    {
      name: "Wishlist",
      href: "/wishlist",
      icon: Bookmark,
      badge: wishlist.length > 0 ? wishlist.length : undefined,
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#EAE3D5] px-2 py-2">
      <div className="max-w-md mx-auto grid grid-cols-5 items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 transition-colors relative ${
                isActive ? "text-[#A84C27]" : "text-[#7A736B] hover:text-[#1E1C1A]"
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5 stroke-[1.75]" />
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-[#A84C27] text-white text-[9px] rounded-full flex items-center justify-center font-medium">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 font-medium tracking-tight">
                {item.name}
              </span>
            </Link>
          );
        })}

        {/* Cart Item */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center py-1 transition-colors relative text-[#7A736B] hover:text-[#1E1C1A]"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-[#1E1C1A] text-white text-[9px] rounded-full flex items-center justify-center font-medium">
                {cart.length}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 font-medium tracking-tight">
            Cart
          </span>
        </button>
      </div>
    </div>
  );
}
