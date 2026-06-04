"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, CheckCircle, MapPin, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, total, increment, decrement, remove, clear } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "", delivery: "delivery", comment: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const deliveryFee = form.delivery === "delivery" ? (total >= 500 ? 0 : 59) : 0;
  const discount    = form.delivery === "pickup" ? Math.round(total * 0.2) : 0;
  const finalTotal  = total + deliveryFee - discount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
    clear();
  };

  if (submitted) {
    return (
      <div className="pt-16 sm:pt-20 min-h-screen flex items-center justify-center px-5" style={{ background: "#ffffff" }}>
        <div className="text-center max-w-md">
          <CheckCircle size={40} color="#8b1a2e" strokeWidth={1.2} className="mx-auto mb-6" />
          <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, fontSize: "clamp(2rem, 5vw, 3rem)", color: "#1c1410", marginBottom: "1rem" }}>
            Замовлення прийнято
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#7a6a5e", lineHeight: 1.7, marginBottom: "2.5rem" }}>
            Наш менеджер зв'яжеться з вами найближчим часом для підтвердження.
          </p>
          <Link href="/menu" style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8b1a2e", textDecoration: "none", borderBottom: "1px solid rgba(139,26,46,0.3)", paddingBottom: "0.1rem" }}>
            ← Назад до меню
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-16 sm:pt-20 min-h-screen flex items-center justify-center px-5" style={{ background: "#ffffff" }}>
        <div className="text-center max-w-sm">
          <ShoppingBag size={44} className="mx-auto mb-6" style={{ color: "#d4c4b8" }} strokeWidth={1.2} />
          <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, fontSize: "2.5rem", color: "#1c1410", marginBottom: "0.75rem" }}>
            Кошик порожній
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#a09080", marginBottom: "2.5rem" }}>
            Додайте щось смачне з нашого меню
          </p>
          <Link href="/menu" style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8b1a2e", textDecoration: "none", borderBottom: "1px solid rgba(139,26,46,0.3)", paddingBottom: "0.1rem" }}>
            До меню →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 sm:pt-20" style={{ background: "#ffffff", minHeight: "100vh" }}>
      <style>{`
        .cart-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid #d4c4b8;
          padding: 0.6rem 0;
          font-size: 0.9rem;
          color: #1c1410;
          outline: none;
          transition: border-color 0.2s;
          font-family: inherit;
        }
        .cart-input::placeholder { color: #c4b4a8; }
        .cart-input:focus { border-bottom-color: #c49a3c; }
        .delivery-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        .delivery-btn.active   { background: #6b1422; color: #faf7f2; }
        .delivery-btn.inactive { background: transparent; color: #a09080; }
        .cart-qty-btn {
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid #d4c4b8;
          border-radius: 3px;
          background: #faf7f2;
          color: #7a6a5e;
          transition: all 0.15s;
          cursor: pointer;
        }
        .cart-qty-btn:active { background: #ede8e1; }
        .cart-del-btn {
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid #e8ddd4;
          border-radius: 3px;
          background: transparent;
          color: #c4b4a8;
          transition: all 0.15s;
          cursor: pointer;
        }
        @media (hover: hover) and (pointer: fine) {
          .cart-qty-btn:hover { border-color: #1c1410; color: #1c1410; }
          .cart-del-btn:hover { border-color: #8b1a2e; color: #8b1a2e; }
        }
        .cart-del-btn:active { border-color: #8b1a2e; color: #8b1a2e; }
      `}</style>

      {/* ── Основний контент ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-14 pb-36 lg:pb-14">
        <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#1c1410", marginBottom: "clamp(1.5rem, 4vw, 3rem)", lineHeight: 1 }}>
          Ваш кошик
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">

          {/* ── Товари ── */}
          <div className="lg:col-span-3">
            <div style={{ borderTop: "1px solid #e8ddd4" }}>
              {items.map((item) => (
                <div key={item.cartKey} className="flex gap-4 py-4 sm:py-6" style={{ borderBottom: "1px solid #e8ddd4" }}>
                  {/* Фото */}
                  <div className="relative flex-shrink-0 overflow-hidden rounded-sm" style={{ width: 68, height: 68 }}>
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="68px" />
                  </div>

                  {/* Інфо */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm sm:text-base leading-snug" style={{ color: "#1c1410" }}>{item.name}</p>
                        {item.selectedSize && (
                          <p style={{ fontSize: "0.7rem", color: "#a09080", marginTop: "0.15rem", letterSpacing: "0.06em" }}>{item.selectedSize}</p>
                        )}
                      </div>
                      <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.1rem", fontWeight: 400, color: "#1c1410", flexShrink: 0 }}>
                        {(item.price * item.quantity).toLocaleString()} ₴
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => decrement(item.cartKey)} className="cart-qty-btn"><Minus size={12} /></button>
                        <span style={{ fontSize: "0.9rem", color: "#1c1410", minWidth: "1.5rem", textAlign: "center" }}>{item.quantity}</span>
                        <button onClick={() => increment(item.cartKey)} className="cart-qty-btn"><Plus size={12} /></button>
                      </div>
                      <button onClick={() => remove(item.cartKey)} className="cart-del-btn"><Trash2 size={13} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <Link href="/menu" style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#a09080", textDecoration: "none" }}>
                ← Додати ще
              </Link>
            </div>
          </div>

          {/* ── Форма + Підсумок (десктоп) ── */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="lg:sticky lg:top-28" style={{ background: "#faf7f2", padding: "clamp(1.25rem, 4vw, 2rem)", border: "1px solid #e8ddd4" }}>

              {/* Тип доставки */}
              <div className="flex mb-6" style={{ border: "1px solid #d4c4b8" }}>
                {[
                  { value: "delivery", label: "Доставка",  icon: Truck  },
                  { value: "pickup",   label: "Самовивіз", icon: MapPin },
                ].map((opt) => (
                  <button key={opt.value} type="button"
                    onClick={() => setForm((f) => ({ ...f, delivery: opt.value }))}
                    className={`delivery-btn ${form.delivery === opt.value ? "active" : "inactive"}`}>
                    <opt.icon size={13} />
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Поля */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2rem" }}>
                {[
                  { key: "name",  label: "Ім'я",    type: "text", placeholder: "Ваше ім'я",           required: true },
                  { key: "phone", label: "Телефон", type: "tel",  placeholder: "+38 (0__) ___-__-__", required: true },
                ].map((field) => (
                  <div key={field.key}>
                    <label style={{ fontSize: "0.63rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#a09080", display: "block", marginBottom: "0.35rem" }}>
                      {field.label}
                    </label>
                    <input type={field.type} required={field.required} placeholder={field.placeholder}
                      value={(form as Record<string, string>)[field.key]}
                      onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                      className="cart-input" />
                  </div>
                ))}

                {form.delivery === "delivery" && (
                  <div>
                    <label style={{ fontSize: "0.63rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#a09080", display: "block", marginBottom: "0.35rem" }}>
                      Адреса
                    </label>
                    <input type="text" required placeholder="вул. Назва, буд. 1, кв. 1"
                      value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                      className="cart-input" />
                  </div>
                )}

                <div>
                  <label style={{ fontSize: "0.63rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#a09080", display: "block", marginBottom: "0.35rem" }}>
                    Коментар
                  </label>
                  <textarea rows={2} placeholder="Побажання до замовлення..."
                    value={form.comment} onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                    className="cart-input" style={{ resize: "none" }} />
                </div>
              </div>

              {/* Підсумок — тільки десктоп */}
              <div className="hidden lg:block" style={{ borderTop: "1px solid #e8ddd4", paddingTop: "1.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1.25rem" }}>
                  <div className="flex justify-between" style={{ fontSize: "0.85rem", color: "#a09080" }}>
                    <span>Товари</span><span>{total.toLocaleString()} ₴</span>
                  </div>
                  <div className="flex justify-between" style={{ fontSize: "0.85rem", color: "#a09080" }}>
                    <span>Доставка</span>
                    <span style={{ color: deliveryFee === 0 ? "#5a9a6e" : "#a09080" }}>
                      {deliveryFee === 0 ? "Безкоштовно" : `${deliveryFee} ₴`}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between" style={{ fontSize: "0.85rem", color: "#5a9a6e" }}>
                      <span>Знижка −20%</span><span>−{discount} ₴</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-baseline mb-5" style={{ borderTop: "1px solid #e8ddd4", paddingTop: "1.25rem" }}>
                  <span style={{ fontSize: "0.85rem", color: "#7a6a5e" }}>Разом</span>
                  <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "2rem", fontWeight: 300, color: "#1c1410" }}>
                    {finalTotal.toLocaleString()} ₴
                  </span>
                </div>
                <button type="submit" disabled={loading} style={{
                  width: "100%", padding: "0.9rem",
                  background: loading ? "#a09080" : "#6b1422",
                  color: "#faf7f2", fontSize: "0.72rem", letterSpacing: "0.15em",
                  textTransform: "uppercase", border: "1px solid #8a1c2e",
                  cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s",
                }}>
                  {loading ? "Оформляємо..." : "Підтвердити замовлення"}
                </button>
                {form.delivery === "delivery" && total < 500 && (
                  <p style={{ fontSize: "0.72rem", color: "#b0a090", textAlign: "center", marginTop: "0.75rem" }}>
                    До безкоштовної доставки: {500 - total} ₴
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ── Фіксована нижня панель (тільки мобіль) ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
        style={{ background: "#fff", borderTop: "1px solid #e8ddd4", boxShadow: "0 -4px 24px rgba(28,20,16,0.08)" }}
      >
        {/* Підсумок */}
        <div className="px-4 pt-3 pb-1 flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span style={{ fontSize: "0.58rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#a09080" }}>Разом</span>
            <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.5rem", fontWeight: 300, color: "#1c1410", lineHeight: 1 }}>
              {finalTotal.toLocaleString()} ₴
            </span>
          </div>
          <div className="flex flex-col items-end gap-0.5 text-right">
            {deliveryFee === 0
              ? <span style={{ fontSize: "0.62rem", color: "#5a9a6e" }}>Доставка безкоштовна</span>
              : <span style={{ fontSize: "0.62rem", color: "#a09080" }}>Доставка {deliveryFee} ₴</span>
            }
            {discount > 0 && <span style={{ fontSize: "0.62rem", color: "#5a9a6e" }}>Знижка −{discount} ₴</span>}
            {form.delivery === "delivery" && total < 500 && (
              <span style={{ fontSize: "0.6rem", color: "#b0a090" }}>До безкоштовної: {500 - total} ₴</span>
            )}
          </div>
        </div>

        {/* Кнопка */}
        <div className="px-4 pb-4">
          <button
            onClick={handleSubmit as unknown as React.MouseEventHandler}
            disabled={loading}
            style={{
              width: "100%", padding: "0.9rem",
              background: loading ? "#a09080" : "#6b1422",
              color: "#faf7f2", fontSize: "0.72rem", letterSpacing: "0.15em",
              textTransform: "uppercase", border: "1px solid #8a1c2e",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Оформляємо..." : "Підтвердити замовлення"}
          </button>
        </div>
      </div>
    </div>
  );
}
