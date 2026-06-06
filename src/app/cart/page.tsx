"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Minus, Plus, Trash2, ShoppingBag, CheckCircle,
  MapPin, Truck, Clock, CreditCard, Phone, Store, Banknote,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";

type FormState = {
  name: string;
  phone: string;
  address: string;
  delivery: "delivery" | "pickup";
  comment: string;
  payment: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  cardName: string;
};

export default function CartPage() {
  const { items, total, increment, decrement, remove, clear } = useCart();
  const { t, lang } = useLang();
  const [form, setForm] = useState<FormState>({
    name: "", phone: "", address: "", delivery: "delivery", comment: "",
    payment: "cash", cardNumber: "", cardExpiry: "", cardCvv: "", cardName: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const deliveryFee = form.delivery === "delivery" ? (total >= 500 ? 0 : 59) : 0;
  const discount    = form.delivery === "pickup" ? Math.round(total * 0.2) : 0;
  const finalTotal  = total + deliveryFee - discount;

  const paymentOptions = form.delivery === "delivery"
    ? [
        { value: "cash",         label: t("cart.paymentCash"),        icon: Banknote    },
        { value: "card_courier", label: t("cart.paymentCardCourier"), icon: CreditCard  },
      ]
    : [
        { value: "card_online",    label: t("cart.paymentCardOnline"),   icon: CreditCard },
        { value: "cash_restaurant",label: t("cart.paymentRestaurant"),   icon: Store      },
      ];

  const isCardPayment = form.payment === "card_online";

  const switchDelivery = (type: "delivery" | "pickup") => {
    setForm(f => ({
      ...f,
      delivery: type,
      payment: type === "delivery" ? "cash" : "card_online",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <div className="pt-16 sm:pt-20 min-h-screen flex items-center justify-center px-5" style={{ background: "#ffffff" }}>
        <style>{`
          .cart-success-btn-primary {
            display: inline-flex; align-items: center; gap: 0.5rem;
            padding: 0.75rem 1.8rem;
            background: linear-gradient(135deg, #6b1220 0%, #4e0d18 100%);
            color: #faf7f2; font-size: 0.7rem; letter-spacing: 0.15em;
            text-transform: uppercase; text-decoration: none;
            border: 1px solid rgba(255,255,255,0.12);
            box-shadow: 0 4px 20px rgba(80,14,28,0.3);
            transition: all 0.3s ease;
          }
          .cart-success-btn-primary:hover {
            box-shadow: 0 6px 28px rgba(80,14,28,0.5);
            transform: translateY(-2px);
            border-color: rgba(255,255,255,0.22);
          }
          .cart-success-btn-secondary {
            display: inline-flex; align-items: center;
            padding: 0.75rem 1.8rem;
            color: #7a6a5e; font-size: 0.7rem; letter-spacing: 0.15em;
            text-transform: uppercase; text-decoration: none;
            border: 1px solid #d4c4b8;
            transition: all 0.3s ease;
          }
          .cart-success-btn-secondary:hover {
            border-color: #8b1a2e; color: #8b1a2e;
            transform: translateY(-2px);
          }
        `}</style>
        <div className="text-center max-w-md">
          <CheckCircle size={40} color="#8b1a2e" strokeWidth={1.2} className="mx-auto mb-6" />
          <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, fontSize: "clamp(2rem, 5vw, 3rem)", color: "#1c1410", marginBottom: "1rem" }}>
            {t("cart.successTitle")}
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#7a6a5e", lineHeight: 1.7, marginBottom: "2.5rem" }}>
            {t("cart.successSubtitle")}
          </p>
          <p style={{ fontSize: "0.82rem", color: "#a09080", marginBottom: "1.5rem", lineHeight: 1.6 }}>
            {t("cart.successHint")}
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/about" className="cart-success-btn-primary">{t("cart.successAbout")}</Link>
            <Link href="/" className="cart-success-btn-secondary">{t("cart.successHome")}</Link>
          </div>
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
            {t("cart.emptyTitle")}
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#a09080", marginBottom: "2.5rem" }}>
            {t("cart.emptySubtitle")}
          </p>
          <Link href="/menu" style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8b1a2e", textDecoration: "none", borderBottom: "1px solid rgba(139,26,46,0.3)", paddingBottom: "0.1rem" }}>
            {t("cart.toMenu")}
          </Link>
        </div>
      </div>
    );
  }

  const InfoCard = () => (
    <div className="flex flex-col gap-3 p-5 rounded-sm" style={{ background: "#faf7f2", border: "1px solid #e8ddd4" }}>
      {/* Прогрес доставки */}
      {form.delivery === "delivery" && (
        <div>
          <div className="flex justify-between mb-2">
            <span style={{ fontSize: "0.7rem", color: "#7a6a5e" }}>
              {total >= 500 ? t("cart.freeDelivery") : `${t("cart.untilFree")} ${500 - total} ₴`}
            </span>
            <span style={{ fontSize: "0.7rem", color: "#a09080" }}>{t("cart.fromAmount")}</span>
          </div>
          <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: "#e8ddd4" }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (total / 500) * 100)}%`, background: total >= 500 ? "#5a9a6e" : "#c49a3c" }} />
          </div>
        </div>
      )}
      {/* Умови */}
      <div style={{ borderTop: form.delivery === "delivery" ? "1px solid #e8ddd4" : "none", paddingTop: form.delivery === "delivery" ? "0.75rem" : "0", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {(form.delivery === "delivery" ? [
          { Icon: Clock,       text: t("cart.deliveryTime") },
          { Icon: CreditCard,  text: t("cart.deliveryPayment") },
          { Icon: Phone,       text: t("cart.deliveryConfirm") },
        ] : [
          { Icon: Store,       text: t("cart.pickupTitle") },
          { Icon: Clock,       text: t("cart.pickupTime") },
          { Icon: CreditCard,  text: t("cart.pickupPayment") },
        ]).map(({ Icon, text }) => (
          <p key={text} style={{ fontSize: "0.78rem", color: "#a09080", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Icon size={13} color="#c49a3c" style={{ flexShrink: 0 }} /> {text}
          </p>
        ))}
      </div>
    </div>
  );

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
          display: flex; align-items: center; justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: none; cursor: pointer; transition: all 0.2s;
        }
        .delivery-btn.active   { background: #6b1422; color: #faf7f2; }
        .delivery-btn.inactive { background: transparent; color: #a09080; }
        .cart-success-btn-primary {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.75rem 1.8rem;
          background: linear-gradient(135deg, #6b1220 0%, #4e0d18 100%);
          color: #faf7f2; font-size: 0.7rem; letter-spacing: 0.15em;
          text-transform: uppercase; text-decoration: none;
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 4px 20px rgba(80,14,28,0.3);
          transition: all 0.3s ease;
        }
        .cart-success-btn-primary:hover {
          box-shadow: 0 6px 28px rgba(80,14,28,0.5);
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.22);
        }
        .cart-success-btn-secondary {
          display: inline-flex; align-items: center;
          padding: 0.75rem 1.8rem;
          color: #7a6a5e; font-size: 0.7rem; letter-spacing: 0.15em;
          text-transform: uppercase; text-decoration: none;
          border: 1px solid #d4c4b8;
          transition: all 0.3s ease;
        }
        .cart-success-btn-secondary:hover {
          border-color: #8b1a2e; color: #8b1a2e;
          transform: translateY(-2px);
        }
        .cart-qty-btn {
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid #d4c4b8; border-radius: 3px;
          background: #faf7f2; color: #7a6a5e;
          transition: all 0.15s; cursor: pointer;
        }
        .cart-qty-btn:active { background: #ede8e1; }
        .cart-del-btn {
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid #e8ddd4; border-radius: 3px;
          background: transparent; color: #c4b4a8;
          transition: all 0.15s; cursor: pointer;
        }
        @media (hover: hover) and (pointer: fine) {
          .cart-qty-btn:hover { border-color: #1c1410; color: #1c1410; }
          .cart-del-btn:hover  { border-color: #8b1a2e; color: #8b1a2e; }
        }
        .cart-del-btn:active { border-color: #8b1a2e; color: #8b1a2e; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-14 pb-36 lg:pb-14">
        <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#1c1410", marginBottom: "clamp(1.5rem, 4vw, 3rem)", lineHeight: 1 }}>
          {t("cart.heading")}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">

          {/* ── Товари ── */}
          <div className="lg:col-span-3">
            <div style={{ borderTop: "1px solid #e8ddd4" }}>
              {items.map((item) => (
                <div key={item.cartKey} className="flex gap-4 py-4 sm:py-6" style={{ borderBottom: "1px solid #e8ddd4" }}>
                  <div className="relative flex-shrink-0 overflow-hidden rounded-sm" style={{ width: 68, height: 68 }}>
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="68px" />
                  </div>
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

            <div className="mt-5 flex items-center justify-between">
              <Link href="/menu" style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#a09080", textDecoration: "none" }}>
                {t("cart.addMore")}
              </Link>
              <span style={{ fontSize: "0.72rem", color: "#a09080" }}>
                {items.reduce((s, i) => s + i.quantity, 0)} {t("cart.itemsShort")}
              </span>
            </div>

            {/* Інфо-картка (десктоп) */}
            <div className="hidden lg:block mt-8">
              <InfoCard />
            </div>
          </div>

          {/* ── Форма + Підсумок ── */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="lg:sticky lg:top-28" style={{ background: "#faf7f2", padding: "clamp(1.25rem, 4vw, 2rem)", border: "1px solid #e8ddd4" }}>

              {/* Тип доставки */}
              <div className="flex mb-6" style={{ border: "1px solid #d4c4b8" }}>
                {[
                  { value: "delivery" as const, label: t("cart.deliveryType"), Icon: Truck  },
                  { value: "pickup"   as const, label: t("cart.pickupType"),   Icon: MapPin },
                ].map((opt) => (
                  <button key={opt.value} type="button"
                    onClick={() => switchDelivery(opt.value)}
                    className={`delivery-btn ${form.delivery === opt.value ? "active" : "inactive"}`}>
                    <opt.Icon size={13} />
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Поля */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "1.75rem" }}>
                {[
                  { key: "name",  label: lang === "en" ? "Name" : "Ім'я",    type: "text", placeholder: lang === "en" ? "Your name" : "Ваше ім'я",           required: true },
                  { key: "phone", label: lang === "en" ? "Phone" : "Телефон", type: "tel",  placeholder: "+38 (0__) ___-__-__", required: true },
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
                      {t("cart.address")}
                    </label>
                    <input type="text" required placeholder={t("cart.addressPlaceholder")}
                      value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                      className="cart-input" />
                  </div>
                )}

                <div>
                  <label style={{ fontSize: "0.63rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#a09080", display: "block", marginBottom: "0.35rem" }}>
                    {t("cart.comment")}
                  </label>
                  <textarea rows={2} placeholder={t("cart.commentPlaceholder")}
                    value={form.comment} onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                    className="cart-input" style={{ resize: "none" }} />
                </div>

                {/* Спосіб оплати */}
                <div>
                  <label style={{ fontSize: "0.63rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#a09080", display: "block", marginBottom: "0.75rem" }}>
                    {t("cart.paymentLabel")}
                  </label>
                  <div className="flex flex-col gap-2">
                    {paymentOptions.map((opt) => (
                      <button key={opt.value} type="button"
                        onClick={() => setForm(f => ({ ...f, payment: opt.value }))}
                        className="flex items-center gap-3 px-3.5 py-3 rounded-sm transition-all duration-150 text-left"
                        style={{
                          border: `1px solid ${form.payment === opt.value ? "#8b1a2e" : "#d4c4b8"}`,
                          background: form.payment === opt.value ? "rgba(139,26,46,0.04)" : "#fff",
                        }}>
                        <opt.icon size={15} color={form.payment === opt.value ? "#8b1a2e" : "#a09080"} style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: "0.8rem", color: form.payment === opt.value ? "#1c1410" : "#7a6a5e" }}>
                          {opt.label}
                        </span>
                        <span className="ml-auto w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center"
                          style={{ border: `1.5px solid ${form.payment === opt.value ? "#8b1a2e" : "#d4c4b8"}` }}>
                          {form.payment === opt.value && (
                            <span className="w-2 h-2 rounded-full" style={{ background: "#8b1a2e" }} />
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Форма картки — тільки для онлайн-оплати */}
                {isCardPayment && (
                  <div style={{ padding: "1rem", background: "#fff", border: "1px solid #e8ddd4", borderRadius: "2px" }}>
                    <p style={{ fontSize: "0.63rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#a09080", marginBottom: "1rem" }}>
                      {t("cart.cardDetails")}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      <div>
                        <label style={{ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#a09080", display: "block", marginBottom: "0.3rem" }}>
                          {t("cart.cardNumber")}
                        </label>
                        <input type="text" required={isCardPayment} placeholder="0000 0000 0000 0000" maxLength={19}
                          value={form.cardNumber}
                          onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                            setForm(f => ({ ...f, cardNumber: v.replace(/(.{4})/g, "$1 ").trim() }));
                          }}
                          className="cart-input" style={{ letterSpacing: "0.1em" }} />
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label style={{ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#a09080", display: "block", marginBottom: "0.3rem" }}>
                            {t("cart.cardExpiry")}
                          </label>
                          <input type="text" required={isCardPayment} placeholder={t("cart.cardExpiry")} maxLength={7}
                            value={form.cardExpiry}
                            onChange={(e) => {
                              const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                              setForm(f => ({ ...f, cardExpiry: v.length > 2 ? `${v.slice(0,2)} / ${v.slice(2)}` : v }));
                            }}
                            className="cart-input" />
                        </div>
                        <div style={{ width: "80px" }}>
                          <label style={{ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#a09080", display: "block", marginBottom: "0.3rem" }}>
                            {t("cart.cardCvv")}
                          </label>
                          <input type="password" required={isCardPayment} placeholder="•••" maxLength={3}
                            value={form.cardCvv}
                            onChange={(e) => setForm(f => ({ ...f, cardCvv: e.target.value.replace(/\D/g, "").slice(0,3) }))}
                            className="cart-input" />
                        </div>
                      </div>
                      <div>
                        <label style={{ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#a09080", display: "block", marginBottom: "0.3rem" }}>
                          {t("cart.cardHolder")}
                        </label>
                        <input type="text" required={isCardPayment} placeholder="IVAN PETRENKO"
                          value={form.cardName}
                          onChange={(e) => setForm(f => ({ ...f, cardName: e.target.value.toUpperCase() }))}
                          className="cart-input" style={{ letterSpacing: "0.05em" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Підсумок — тільки десктоп */}
              <div className="hidden lg:block" style={{ borderTop: "1px solid #e8ddd4", paddingTop: "1.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1.25rem" }}>
                  <div className="flex justify-between" style={{ fontSize: "0.85rem", color: "#a09080" }}>
                    <span>{t("cart.summaryGoods")}</span><span>{total.toLocaleString()} ₴</span>
                  </div>
                  <div className="flex justify-between" style={{ fontSize: "0.85rem", color: "#a09080" }}>
                    <span>{t("cart.summaryDelivery")}</span>
                    <span style={{ color: deliveryFee === 0 ? "#5a9a6e" : "#a09080" }}>
                      {deliveryFee === 0 ? t("cart.summaryFree") : `${deliveryFee} ₴`}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between" style={{ fontSize: "0.85rem", color: "#5a9a6e" }}>
                      <span>{t("cart.summaryDiscount")}</span><span>−{discount} ₴</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-baseline mb-5" style={{ borderTop: "1px solid #e8ddd4", paddingTop: "1.25rem" }}>
                  <span style={{ fontSize: "0.85rem", color: "#7a6a5e" }}>{t("cart.summaryTotal")}</span>
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
                  {loading ? t("cart.submitLoading") : t("cart.submitBtn")}
                </button>
                {form.delivery === "delivery" && total < 500 && (
                  <p style={{ fontSize: "0.72rem", color: "#b0a090", textAlign: "center", marginTop: "0.75rem" }}>
                    {t("cart.untilFree")} {500 - total} ₴
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ── Фіксована нижня панель (мобіль) ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
        style={{ background: "#fff", borderTop: "1px solid #e8ddd4", boxShadow: "0 -4px 24px rgba(28,20,16,0.08)" }}>
        <div className="px-4 pt-3 pb-1 flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span style={{ fontSize: "0.58rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#a09080" }}>{t("cart.summaryTotal")}</span>
            <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.5rem", fontWeight: 300, color: "#1c1410", lineHeight: 1 }}>
              {finalTotal.toLocaleString()} ₴
            </span>
          </div>
          <div className="flex flex-col items-end gap-0.5 text-right">
            {deliveryFee === 0
              ? <span style={{ fontSize: "0.62rem", color: "#5a9a6e" }}>{t("cart.deliveryFreeLabel")}</span>
              : form.delivery === "delivery"
                ? <span style={{ fontSize: "0.62rem", color: "#a09080" }}>{t("cart.deliveryPaidLabel")} {deliveryFee} ₴</span>
                : <span style={{ fontSize: "0.62rem", color: "#5a9a6e" }}>{t("cart.discountLabel")} −{discount} ₴</span>
            }
            {form.delivery === "delivery" && total < 500 && (
              <span style={{ fontSize: "0.6rem", color: "#b0a090" }}>{t("cart.untilFreeShort")} {500 - total} ₴</span>
            )}
          </div>
        </div>
        <div className="px-4 pb-4">
          <button onClick={handleSubmit as unknown as React.MouseEventHandler} disabled={loading} style={{
            width: "100%", padding: "0.9rem",
            background: loading ? "#a09080" : "#6b1422",
            color: "#faf7f2", fontSize: "0.72rem", letterSpacing: "0.15em",
            textTransform: "uppercase", border: "1px solid #8a1c2e",
            cursor: loading ? "not-allowed" : "pointer",
          }}>
            {loading ? t("cart.submitLoading") : t("cart.submitBtn")}
          </button>
        </div>
      </div>
    </div>
  );
}
