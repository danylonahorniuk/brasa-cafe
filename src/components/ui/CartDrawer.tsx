"use client";

import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";

export default function CartDrawer() {
  const { items, isOpen, closeCart, increment, decrement, remove, total } = useCart();

  return (
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          .cart-ctrl-btn:hover { border-color: #1c1410 !important; color: #1c1410 !important; }
          .cart-del-btn:hover  { border-color: #8b1a2e !important; color: #8b1a2e !important; background: rgba(139,26,46,0.04) !important; }
        }
        .cart-ctrl-btn:active { background: #f0ebe4 !important; }
        .cart-del-btn:active  { border-color: #8b1a2e !important; color: #8b1a2e !important; }
      `}</style>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 z-[60] transition-all duration-400"
        style={{
          background: isOpen ? "rgba(28,20,16,0.45)" : "transparent",
          pointerEvents: isOpen ? "all" : "none",
          backdropFilter: isOpen ? "blur(4px)" : "none",
        }}
      />

      {/* Drawer */}
      <aside
        className="fixed top-0 right-0 h-full z-[70] flex flex-col"
        style={{
          width: "min(400px, 95vw)",
          background: "#faf7f2",
          borderLeft: "1px solid #e8ddd4",
          boxShadow: "-8px 0 40px rgba(28,20,16,0.12)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1px solid #e8ddd4" }}
        >
          <div>
            <p style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "1.4rem",
              fontWeight: 300,
              color: "#1c1410",
              lineHeight: 1,
            }}>
              Кошик
            </p>
            <p style={{ fontSize: "0.75rem", color: "#a09080", marginTop: "0.2rem" }}>
              {items.length === 0
                ? "порожній"
                : `${items.length} ${items.length === 1 ? "позиція" : items.length < 5 ? "позиції" : "позицій"}`}
            </p>
          </div>
          <button
            onClick={closeCart}
            style={{ color: "#c4b4a8", lineHeight: 1 }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center px-6">
              <ShoppingBag size={40} style={{ color: "#d4c4b8" }} strokeWidth={1.2} />
              <div>
                <p style={{ fontSize: "0.95rem", color: "#7a6a5e", marginBottom: "0.35rem" }}>
                  Кошик порожній
                </p>
                <p style={{ fontSize: "0.8rem", color: "#b0a090" }}>
                  Додайте страви з меню
                </p>
              </div>
              <Link
                href="/menu"
                onClick={closeCart}
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#8b1a2e",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(139,26,46,0.3)",
                  paddingBottom: "0.1rem",
                }}
              >
                До меню →
              </Link>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <div
                  key={item.cartKey}
                  className="flex gap-4 px-6 py-5"
                  style={{ borderBottom: "1px solid #e8ddd4" }}
                >
                  {/* Photo */}
                  <div className="relative flex-shrink-0 overflow-hidden rounded-sm" style={{ width: 64, height: 64 }}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p style={{ fontSize: "0.92rem", color: "#1c1410", lineHeight: 1.3 }}>
                        {item.name}
                      </p>
                      <p style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "1.05rem",
                        fontWeight: 500,
                        color: "#1c1410",
                        flexShrink: 0,
                      }}>
                        {(item.price * item.quantity).toLocaleString()} ₴
                      </p>
                    </div>

                    {item.selectedSize && (
                      <p style={{ fontSize: "0.7rem", color: "#a09080", marginTop: "0.2rem", letterSpacing: "0.08em" }}>
                        {item.selectedSize}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      {/* Qty controls */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => decrement(item.cartKey)}
                          className="cart-ctrl-btn"
                          style={{
                            width: 32, height: 32,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            border: "1px solid #d4c4b8",
                            background: "#fff",
                            borderRadius: "3px",
                            color: "#7a6a5e",
                            transition: "all 0.15s",
                          }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{
                          fontSize: "0.9rem", fontWeight: 500,
                          color: "#1c1410", minWidth: "2rem", textAlign: "center",
                        }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increment(item.cartKey)}
                          className="cart-ctrl-btn"
                          style={{
                            width: 32, height: 32,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            border: "1px solid #d4c4b8",
                            background: "#fff",
                            borderRadius: "3px",
                            color: "#7a6a5e",
                            transition: "all 0.15s",
                          }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => remove(item.cartKey)}
                        className="cart-del-btn"
                        style={{
                          width: 32, height: 32,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          border: "1px solid #e8ddd4",
                          background: "transparent",
                          borderRadius: "3px",
                          color: "#c4b4a8",
                          transition: "all 0.15s",
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5" style={{ borderTop: "1px solid #e8ddd4" }}>
            <div className="flex justify-between items-baseline mb-5">
              <span style={{ fontSize: "0.8rem", color: "#a09080", letterSpacing: "0.05em" }}>
                Разом
              </span>
              <span style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "1.6rem",
                fontWeight: 300,
                color: "#1c1410",
              }}>
                {total.toLocaleString()} ₴
              </span>
            </div>
            <Link
              href="/cart"
              onClick={closeCart}
              style={{
                display: "block",
                textAlign: "center",
                padding: "0.9rem",
                background: "#6b1422",
                color: "#faf7f2",
                fontSize: "0.72rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: "1px solid #8a1c2e",
                transition: "background 0.2s",
              }}
            >
              Оформити замовлення
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
