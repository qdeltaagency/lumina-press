# Lumina Press — Digital eBook Marketplace & Publishing Platform

An Awwwards-caliber digital bookstore and independent publishing platform built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion. Inspired by high-end editorial publishers and modern digital reading experiences.

![Lumina Press](https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1400&q=80)

---

## ✨ Features

- **Kinetic 3D Hero Experience**: Interactive mouse-tracking 3D book cover with tactile lighting and dynamic typography.
- **Sticky Scrollytelling**: Seamless pinned feature journey through Focus, Immersion, Sovereignty, and Equity.
- **Distraction-Free Digital Reader (`/reader/[slug]`)**:
  - Full-screen digital reading interface with Table of Contents.
  - Three visual reading modes: Daylight Ivory, Sepia Parchment, and OLED Midnight.
  - Adjustable typography scale and font families (Serif / Sans / Mono).
  - Chapter progress tracker and bookmarking.
- **Interactive Reading Simulator**: Draggable daylight vs. midnight reader demo directly on the homepage.
- **Dual Currency Pricing Engine**:
  - Instant one-click toggle between **₹ INR** and **$ USD**.
  - Dynamic currency conversion across all catalog titles, carts, and checkout flows.
- **Instant Digital Delivery & Digital Licensing**:
  - Digital-only checkout flow (zero physical shipping fluff).
  - UPI / Razorpay (India) & Stripe / Card (Global) simulated payment gates.
  - Instant PDF & EPUB downloads with unique cryptographically generated digital license certificates.
- **Customer Digital Library (`/library`)**:
  - Personal digital bookshelf with reading progress bars, instant reader launch, and re-download links.
- **Author Publishing Platform & 85% Royalty Calculator (`/sell`)**:
  - Interactive royalty slider calculating exact earnings vs. traditional publishers (85% vs. 15%).
  - Full author portal and sales dashboard (`/seller`).
- **Comprehensive Catalog & Faceted Search (`/books`)**:
  - Faceted filtering by category, format (EPUB, PDF, Bundle), price range, and rating.
  - Instant Cmd+K search overlay with keyboard shortcuts.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Cormorant Garamond (Editorial Serif) & Plus Jakarta Sans (Modern Body)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17+ or newer
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/qdeltaagency/lumina-press.git

# Navigate to project directory
cd lumina-press

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Verify TypeScript and build production bundle
npm run build

# Start production server
npm start
```

---

## 🧭 Routes & Architecture

| Route | Description |
| :--- | :--- |
| `/` | Elevated homepage with 3D Kinetic Hero, scrollytelling & reading simulator |
| `/books` | Complete eBook catalog with live faceted filters and search |
| `/book/[slug]` | Book details with 3D spine, chapter preview modal & reviews |
| `/reader/[slug]` | Distraction-free full-screen reader with theme controls |
| `/library` | Personal bookshelf with continue reading & downloads |
| `/wishlist` | Saved titles with one-click move to cart |
| `/cart` | Digital shopping bag with promo codes & checkout redirect |
| `/checkout` | Digital-first payment flow (UPI & Cards) |
| `/order-success/[id]` | Digital license certificate & instant download access |
| `/sell` | Author publishing portal with interactive 85% royalty calculator |
| `/seller` | Author analytics dashboard with revenue charts & title manager |
| `/admin` | Curation control room for reviewing submissions |
| `/about` | Publishing manifesto & copyright principles |
| `/contact` | Editorial inquiries & interactive FAQ |

---

## 📄 License

MIT © [Lumina Press](https://github.com/qdeltaagency/lumina-press)
