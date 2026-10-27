
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

const STORAGE_KEYS = {
  CART: "shoppingCart",
  WISHLIST: "wishlist",
};

const safeParse = (str) => {
  try {
    return str ? JSON.parse(str) : null;
  } catch (err) {
    console.error("localStorage JSON parse error:", err, "value:", str);
    return null;
  }
};

export const CartProvider = ({ children }) => {
  // Read from localStorage synchronously for initial state
  const [cartItems, setCartItems] = useState(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEYS.CART) : null;
    return safeParse(raw) || [];
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEYS.WISHLIST) : null;
    return safeParse(raw) || [];
  });

  // Keep localStorage in sync
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
    } catch (err) {
      console.error("Failed to save cart to localStorage:", err);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlistItems));
    } catch (err) {
      console.error("Failed to save wishlist to localStorage:", err);
    }
  }, [wishlistItems]);

  // Helpers
  const addToCart = (product, quantity = 1) => {
    if (!product || product.id === undefined || product.id === null) {
      console.error("addToCart: product must have an id", product);
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p));
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) => prev.map((p) => (p.id === productId ? { ...p, quantity } : p)));
  };

  const clearCart = () => setCartItems([]);

  const addToWishlist = (product) => {
    if (!product || product.id === undefined || product.id === null) {
      console.error("addToWishlist: product must have an id", product);
      return;
    }
    setWishlistItems((prev) => (prev.some((p) => p.id === product.id) ? prev : [...prev, product]));
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const isInWishlist = (productId) => wishlistItems.some((p) => p.id === productId);

  const getCartTotal = () => cartItems.reduce((t, item) => t + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0);
  const getCartCount = () => cartItems.reduce((c, item) => c + (Number(item.quantity) || 0), 0);

  // debugging helper you can call in UI if needed
  const debugPrint = () => {
    console.log("Cart items:", cartItems);
    console.log("Wishlist items:", wishlistItems);
    console.log("localStorage cart:", localStorage.getItem(STORAGE_KEYS.CART));
    console.log("localStorage wishlist:", localStorage.getItem(STORAGE_KEYS.WISHLIST));
  };

  const value = {
    cartItems,
    wishlistItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getCartTotal,
    getCartCount,
    debugPrint,
  };

  return <CartContext.Provider value={value}>
    {children}
    </CartContext.Provider>;
};

