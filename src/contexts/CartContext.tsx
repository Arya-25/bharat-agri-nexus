import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "agribusiness_cart_v1";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }, [items]);

  const addItem = (product: Product, qty: number = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: Math.min(copy[idx].quantity + qty, 99) };
        return copy;
      }
      return [
        ...prev,
        { id: product.id, name: product.name, price: product.price, image: product.image, quantity: qty },
      ];
    });
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id: string, qty: number) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, Math.min(qty, 99)) } : i)));

  const clear = () => setItems([]);

  const { count, total } = useMemo(() => {
    const count = items.reduce((acc, i) => acc + i.quantity, 0);
    const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
    return { count, total };
  }, [items]);

  const value: CartContextType = { items, addItem, removeItem, updateQty, clear, count, total };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
