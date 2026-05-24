"use client";

import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";

export default function CartDrawer() {
  const { items, isOpen, closeCart, increment, decrement, remove, total } = useCart();

  return (
    <>
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
          width: "min(420px, 95vw)",
          background: "#faf7f2",
          borderLeft: "1px solid #e8ddd4",
          boxShadow: "-8px 0 40px rgba(28,20,16,0.12)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid #e8ddd4" }}>
          <div>
            <p className="section-label">Кошик</p>
            <p className="text-xs mt-0.5" style={{ color: "#a09080" }}>{items.length} позиції</p>
          </div>
          <button onClick={closeCart} className="p-1 transition-colors" style={{ color: "#a09080" }}>
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} style={{ color: "#d4c4b8" }} />
              <p className="text-sm" style={{ color: "#a09080" }}>Кошик порожній</p>
              <Link href="/menu" onClick={closeCart} className="btn-outline text-xs py-2 px-4">
                До меню
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.cartKey}
                className="flex gap-3 p-3 rounded-sm"
                style={{ background: "#fff", border: "1px solid #e8ddd4" }}
              >
                <div className="relative w-16 h-16 rounded-sm overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: "#1c1410" }}>{item.name}</p>
                  {item.selectedSize && (
                    <p className="text-[0.62rem] tracking-wider uppercase mt-0.5" style={{ color: "#a09080" }}>
                      {item.selectedSize}
                    </p>
                  )}
                  <p className="text-sm font-medium mt-0.5" style={{ color: "#8b1a2e" }}>
                    {(item.price * item.quantity).toLocaleString()} ₴
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decrement(item.cartKey)}
                      className="w-7 h-7 rounded-sm flex items-center justify-center transition-colors"
                      style={{ border: "1px solid #d4c4b8", color: "#a09080" }}
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm w-5 text-center" style={{ color: "#1c1410" }}>{item.quantity}</span>
                    <button
                      onClick={() => increment(item.cartKey)}
                      className="w-7 h-7 rounded-sm flex items-center justify-center transition-colors"
                      style={{ border: "1px solid #d4c4b8", color: "#a09080" }}
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => remove(item.cartKey)}
                      className="ml-auto p-1 transition-colors"
                      style={{ color: "#d4c4b8" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#e05050"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#d4c4b8"; }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 space-y-4" style={{ borderTop: "1px solid #e8ddd4" }}>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: "#a09080" }}>Разом:</span>
              <span
                className="text-xl"
                style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500, color: "#8b1a2e" }}
              >
                {total.toLocaleString()} ₴
              </span>
            </div>
            <Link href="/cart" onClick={closeCart} className="btn-primary w-full justify-center text-center">
              Оформити замовлення
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
