"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { MenuItem } from "@/data/menu";

export interface CartItem extends MenuItem {
  quantity: number;
  cartKey: string;      // унікальний ключ: id + розмір (напр. "2-40")
  selectedSize?: string; // "30 см" | "40 см" — для відображення
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD"; item: MenuItem; cartKey: string; selectedSize?: string; finalPrice: number }
  | { type: "REMOVE"; cartKey: string }
  | { type: "INCREMENT"; cartKey: string }
  | { type: "DECREMENT"; cartKey: string }
  | { type: "CLEAR" }
  | { type: "TOGGLE_CART" }
  | { type: "CLOSE_CART" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const exists = state.items.find((i) => i.cartKey === action.cartKey);
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.cartKey === action.cartKey ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.item,
            price: action.finalPrice,
            cartKey: action.cartKey,
            selectedSize: action.selectedSize,
            quantity: 1,
          },
        ],
      };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.cartKey !== action.cartKey) };
    case "INCREMENT":
      return {
        ...state,
        items: state.items.map((i) =>
          i.cartKey === action.cartKey ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    case "DECREMENT":
      return {
        ...state,
        items: state.items
          .map((i) => (i.cartKey === action.cartKey ? { ...i, quantity: i.quantity - 1 } : i))
          .filter((i) => i.quantity > 0),
      };
    case "CLEAR":
      return { ...state, items: [] };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  total: number;
  count: number;
  add: (item: MenuItem, cartKey: string, selectedSize?: string, finalPrice?: number) => void;
  remove: (cartKey: string) => void;
  increment: (cartKey: string) => void;
  decrement: (cartKey: string) => void;
  clear: () => void;
  toggleCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export default function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  const total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = state.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        total,
        count,
        add: (item, cartKey, selectedSize, finalPrice) =>
          dispatch({ type: "ADD", item, cartKey, selectedSize, finalPrice: finalPrice ?? item.price }),
        remove: (cartKey) => dispatch({ type: "REMOVE", cartKey }),
        increment: (cartKey) => dispatch({ type: "INCREMENT", cartKey }),
        decrement: (cartKey) => dispatch({ type: "DECREMENT", cartKey }),
        clear: () => dispatch({ type: "CLEAR" }),
        toggleCart: () => dispatch({ type: "TOGGLE_CART" }),
        closeCart: () => dispatch({ type: "CLOSE_CART" }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
