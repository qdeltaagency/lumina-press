export const siteConfig = {
  name: "Lumina Press",
  shortName: "Lumina",
  descriptor: "Digital eBook Marketplace",
  tagline: "Stories, Ideas & Knowledge — All in One Place.",
  description:
    "Discover thoughtfully selected eBooks from independent authors and publishers. Read what inspires you, teaches you, and moves you in a calm, modern digital reading environment.",
  market: "Worldwide",
  currency: {
    default: "INR",
    symbol: "₹",
    rateToUSD: 0.012, // 1 INR ~ 0.012 USD
  },
  navLinks: [
    { name: "Home", href: "/" },
    { name: "eBooks", href: "/books" },
    { name: "Categories", href: "/#categories" },
    { name: "Authors", href: "/#authors" },
    { name: "Best Sellers", href: "/books?sort=bestSeller" },
    { name: "New Releases", href: "/books?sort=newest" },
  ],
  customerLinks: [
    { name: "My Library", href: "/library" },
    { name: "Wishlist", href: "/wishlist" },
    { name: "Cart", href: "/cart" },
    { name: "Help Center", href: "/contact" },
  ],
  authorLinks: [
    { name: "Sell Your eBook", href: "/sell" },
    { name: "Author Dashboard", href: "/seller" },
    { name: "Publishing Guidelines", href: "/sell#guidelines" },
  ],
  legalLinks: [
    { name: "Privacy Policy", href: "/about" },
    { name: "Terms of Service", href: "/about" },
    { name: "Digital Refund Policy", href: "/about" },
    { name: "Copyright & DRM", href: "/about" },
  ],
  socials: {
    instagram: "https://instagram.com",
    twitter: "https://x.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
  },
  contact: {
    email: "editions@luminapress.com",
    supportEmail: "readers@luminapress.com",
    location: "London • New York • Bengaluru",
  },
};
