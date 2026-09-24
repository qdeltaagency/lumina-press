"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Book, CartItem, LibraryItem } from "@/types";
import { books } from "@/data/books";

interface StoreContextType {
  // Cart
  cart: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  isInCart: (bookId: string) => boolean;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartTotal: number;

  // Wishlist
  wishlist: string[]; // book IDs
  toggleWishlist: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;

  // Library
  library: LibraryItem[];
  addToLibrary: (book: Book) => void;
  isInLibrary: (bookId: string) => boolean;
  updateReadingProgress: (
    bookId: string,
    progress: number,
    currentPage?: number
  ) => void;

  // Currency
  currency: "INR" | "USD";
  setCurrency: (c: "INR" | "USD") => void;
  formatPrice: (amountInINR: number) => string;

  // Modals & Overlays
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  previewBook: Book | null;
  openPreview: (book: Book) => void;
  closePreview: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const INITIAL_LIBRARY: LibraryItem[] = [
  {
    book: books[0], // The Art of Deep Work
    purchasedDate: "10 February 2026",
    progress: 62,
    currentPage: 178,
    totalPages: 288,
    lastOpenedAt: "2 hours ago",
    status: "reading",
  },
  {
    book: books[2], // The Architecture of Silence
    purchasedDate: "18 February 2026",
    progress: 18,
    currentPage: 74,
    totalPages: 412,
    lastOpenedAt: "Yesterday",
    status: "reading",
  },
];

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(["book-psychology-money"]);
  const [library, setLibrary] = useState<LibraryItem[]>(INITIAL_LIBRARY);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [previewBook, setPreviewBook] = useState<Book | null>(null);

  // Initialize and persist in localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("lumina_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("lumina_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedLibrary = localStorage.getItem("lumina_library");
      if (savedLibrary) setLibrary(JSON.parse(savedLibrary));

      const savedCurrency = localStorage.getItem("lumina_currency");
      if (savedCurrency === "USD" || savedCurrency === "INR") {
        setCurrency(savedCurrency);
      }
    } catch (e) {
      console.warn("Could not load from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("lumina_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("lumina_wishlist", JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem("lumina_library", JSON.stringify(library));
    } catch {}
  }, [library]);

  useEffect(() => {
    try {
      localStorage.setItem("lumina_currency", currency);
    } catch {}
  }, [currency]);

  // Keyboard shortcut ⌘K or Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Cart operations
  const addToCart = (book: Book) => {
    setCart((prev) => {
      if (prev.some((item) => item.book.id === book.id)) {
        return prev;
      }
      return [...prev, { book, addedAt: new Date().toISOString() }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (bookId: string) => {
    setCart((prev) => prev.filter((item) => item.book.id !== bookId));
  };

  const isInCart = (bookId: string) => {
    return cart.some((item) => item.book.id === bookId);
  };

  const clearCart = () => setCart([]);

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.book.originalPrice,
    0
  );
  const cartTotal = cart.reduce((sum, item) => sum + item.book.price, 0);
  const cartDiscount = cartSubtotal - cartTotal;

  // Wishlist operations
  const toggleWishlist = (bookId: string) => {
    setWishlist((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  const isInWishlist = (bookId: string) => wishlist.includes(bookId);

  // Library operations
  const addToLibrary = (book: Book) => {
    setLibrary((prev) => {
      if (prev.some((item) => item.book.id === book.id)) return prev;
      const newItem: LibraryItem = {
        book,
        purchasedDate: new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        progress: 0,
        currentPage: 1,
        totalPages: book.pages,
        lastOpenedAt: "Just now",
        status: "unread",
      };
      return [newItem, ...prev];
    });
  };

  const isInLibrary = (bookId: string) =>
    library.some((item) => item.book.id === bookId);

  const updateReadingProgress = (
    bookId: string,
    progress: number,
    currentPage?: number
  ) => {
    setLibrary((prev) =>
      prev.map((item) => {
        if (item.book.id === bookId) {
          const newProgress = Math.min(100, Math.max(0, progress));
          return {
            ...item,
            progress: newProgress,
            currentPage: currentPage ?? item.currentPage,
            lastOpenedAt: "Just now",
            status:
              newProgress >= 100
                ? "completed"
                : newProgress > 0
                ? "reading"
                : "unread",
          };
        }
        return item;
      })
    );
  };

  // Currency Formatter
  const formatPrice = (amountInINR: number) => {
    if (currency === "USD") {
      const usdAmount = (amountInINR * 0.012).toFixed(2);
      return `$${usdAmount}`;
    }
    return `₹${amountInINR.toLocaleString("en-IN")}`;
  };

  const openPreview = (book: Book) => setPreviewBook(book);
  const closePreview = () => setPreviewBook(null);

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        isInCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartSubtotal,
        cartDiscount,
        cartTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        library,
        addToLibrary,
        isInLibrary,
        updateReadingProgress,
        currency,
        setCurrency,
        formatPrice,
        isSearchOpen,
        setIsSearchOpen,
        previewBook,
        openPreview,
        closePreview,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
