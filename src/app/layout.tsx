import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { StoreProvider } from "@/context/StoreContext";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import SearchOverlay from "@/components/SearchOverlay";
import CartDrawer from "@/components/CartDrawer";
import PreviewModal from "@/components/PreviewModal";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumina Press — Curated Digital Books & Independent Editions",
  description:
    "Discover thoughtfully selected eBooks from independent authors and publishers. Read what inspires you, teaches you, and moves you in a calm, modern digital reading environment.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-[#FAF7F2] text-[#1E1C1A] selection:bg-[#E8DFD1] selection:text-[#1A1816] antialiased">
        <StoreProvider>
          <ScrollProgressBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ScrollToTop />
          <BottomNav />
          <SearchOverlay />
          <CartDrawer />
          <PreviewModal />
        </StoreProvider>
      </body>
    </html>
  );
}
