export interface ChapterSample {
  title: string;
  subtitle?: string;
  paragraphs: string[];
}

export interface Book {
  id: string;
  title: string;
  slug: string;
  author: string;
  authorId: string;
  description: string;
  shortDescription: string;
  coverImage: string;
  previewImages?: string[];
  price: number;
  originalPrice: number;
  discount: number; // percentage e.g. 38
  currency: string;
  category: string;
  categorySlug: string;
  genres: string[];
  rating: number;
  reviewCount: number;
  publishedDate: string;
  language: string;
  pages: number;
  format: string; // e.g., "EPUB, PDF, MOBI"
  isbn: string;
  sellerId: string;
  featured?: boolean;
  bestSeller?: boolean;
  bestSellerRank?: number;
  newRelease?: boolean;
  editorialPick?: boolean;
  quote?: string;
  sampleChapters: ChapterSample[];
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  photo: string;
  bio: string;
  booksCount: number;
  primaryGenre: string;
  featured?: boolean;
  quote?: string;
  socialLinks?: {
    twitter?: string;
    website?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  bookCount: number;
}

export interface Review {
  id: string;
  bookId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  helpfulCount?: number;
}

export interface CartItem {
  book: Book;
  addedAt: string;
}

export interface LibraryItem {
  book: Book;
  purchasedDate: string;
  progress: number; // percentage 0 - 100
  currentPage: number;
  totalPages: number;
  lastOpenedAt: string;
  status: "reading" | "completed" | "unread";
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  source?: string;
}
