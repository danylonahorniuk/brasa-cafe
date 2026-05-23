"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, CheckCircle, MapPin, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";

const inputStyle = { background: "#fff", border: "1px solid #d4c4b8", color: "#1c1410" };
const inputClass = "w-full px-3 py-2.5 text-sm rounded-sm outline-none transition-colors placeholder:text-[#c4b4a8]";

export default function CartPage() {
  const { items, total, increment, decrement, remove, clear } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "", delivery: "delivery", comment: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const deliveryFee  = form.delivery === "delivery" ? (total >= 500 ? 0 : 59) : 0;
  const discount     = form.delivery === "pickup" ? Math.round(total * 0.2) : 0;
  const finalTotal   = total + deliveryFee - discount;

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
      <div className="pt-20 min-h-screen flex items-center justify-center px-6" style={{ background: "#faf7f2" }}>
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(139,26,46,0.08)", border: "1px solid rgba(139,26,46,0.2)" }}>
            <CheckCircle size={36} color="#8b1a2e" />
          </div>
          <h1 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, color: "#1c1410" }}>Замовлення прийнято!</h1>
          <p className="mb-8 text-sm leading-relaxed" style={{ color: "#7a6a5e" }}>Наш менеджер зв'яжеться з вами найближчим часом для підтвердження.</p>
          <Link href="/menu" className="btn-primary">← Назад до меню</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center px-6" style={{ background: "#faf7f2" }}>
        <div className="text-center max-w-sm">
          <ShoppingBag size={64} className="mx-auto mb-6" style={{ color: "#d4c4b8" }} />
          <h1 className="text-3xl mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, color: "#1c1410" }}>Кошик порожній</h1>
          <p className="mb-8 text-sm" style={{ color: "#a09080" }}>Додайте щось смачне з нашого меню</p>
          <Link href="/menu" className="btn-primary">Перейти до меню</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 max-w-7xl mx-auto px-6 py-12" style={{ background: "#faf7f2", minHeight: "100vh" }}>
      <p className="section-label mb-3">Оформлення</p>
      <h1 className="text-5xl mb-10" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, color: "#1c1410" }}>Ваш кошик</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Items */}
        <div className="lg:col-span-3 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 rounded-sm" style={{ background: "#fff", border: "1px solid #e8ddd4" }}>
              <div className="relative w-20 h-20 rounded-sm overflow-hidden flex-shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <p className="font-medium text-sm" style={{ color: "#1c1410" }}>{item.name}</p>
                    {item.weight && <p className="text-xs mt-0.5" style={{ color: "#c4b4a8" }}>{item.weight}</p>}
                  </div>
                  <button onClick={() => remove(item.id)} className="p-1 transition-colors" style={{ color: "#d4c4b8" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#e05050"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#d4c4b8"; }}>
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => decrement(item.id)} className="w-7 h-7 rounded-sm flex items-center justify-center transition-colors" style={{ border: "1px solid #d4c4b8", color: "#a09080" }}>
                      <Minus size={12} />
                    </button>
                    <span className="text-sm w-6 text-center" style={{ color: "#1c1410" }}>{item.quantity}</span>
                    <button onClick={() => increment(item.id)} className="w-7 h-7 rounded-sm flex items-center justify-center transition-colors" style={{ border: "1px solid #d4c4b8", color: "#a09080" }}>
                      <Plus size={12} />
                    </button>
                  </div>
                  <span className="font-medium" style={{ color: "#8b1a2e" }}>{(item.price * item.quantity).toLocaleString()} ₴</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-4 sticky top-28">
            <div className="p-5 rounded-sm" style={{ background: "#fff", border: "1px solid #e8ddd4" }}>
              <p className="section-label mb-4">Ваші дані</p>

              {/* Delivery toggle */}
              <div className="flex rounded-sm overflow-hidden border border-[#d4c4b8] mb-4">
                {[
                  { value: "delivery", label: "Доставка",  icon: Truck  },
                  { value: "pickup",   label: "Самовивіз", icon: MapPin },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, delivery: opt.value }))}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 text-[0.72rem] uppercase tracking-wider transition-all"
                    style={{
                      background: form.delivery === opt.value ? "#8b1a2e" : "#fff",
                      color: form.delivery === opt.value ? "#fff" : "#7a6a5e",
                    }}
                  >
                    <opt.icon size={13} /> {opt.label}
                  </button>
                ))}
              </div>

              {[
                { key: "name",  label: "Ім'я",    type: "text", placeholder: "Ваше ім'я",           required: true },
                { key: "phone", label: "Телефон", type: "tel",  placeholder: "+38 (0__) ___-__-__", required: true },
              ].map((field) => (
                <div key={field.key} className="mb-3">
                  <label className="text-[0.68rem] uppercase tracking-wider block mb-1.5" style={{ color: "#a09080" }}>{field.label}</label>
                  <input
                    type={field.type}
                    required={field.required}
                    placeholder={field.placeholder}
                    value={(form as Record<string, string>)[field.key]}
                    onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
              ))}

              {form.delivery === "delivery" && (
                <div className="mb-3">
                  <label className="text-[0.68rem] uppercase tracking-wider block mb-1.5" style={{ color: "#a09080" }}>Адреса</label>
                  <input
                    type="text"
                    required
                    placeholder="вул. Назва, буд. 1, кв. 1"
                    value={form.address}
                    onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
              )}

              <div>
                <label className="text-[0.68rem] uppercase tracking-wider block mb-1.5" style={{ color: "#a09080" }}>Коментар</label>
                <textarea
                  rows={2}
                  placeholder="Побажання до замовлення..."
                  value={form.comment}
                  onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                  className={`${inputClass} resize-none`}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Summary */}
            <div className="p-5 rounded-sm" style={{ background: "#fff", border: "1px solid #e8ddd4" }}>
              <p className="section-label mb-4">Підсумок</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between" style={{ color: "#a09080" }}>
                  <span>Товари</span><span>{total.toLocaleString()} ₴</span>
                </div>
                <div className="flex justify-between" style={{ color: "#a09080" }}>
                  <span>Доставка</span>
                  <span>{deliveryFee === 0 ? <span style={{ color: "#5a9a6e" }}>Безкоштовно</span> : `${deliveryFee} ₴`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-xs" style={{ color: "#5a9a6e" }}>
                    <span>Знижка самовивіз −20%</span><span>−{discount} ₴</span>
                  </div>
                )}
              </div>
              <div className="divider-warm my-3" />
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm" style={{ color: "#a09080" }}>Разом:</span>
                <span className="text-2xl" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500, color: "#8b1a2e" }}>
                  {finalTotal} ₴
                </span>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-center">
                {loading ? "Оформляємо..." : "Підтвердити замовлення"}
              </button>
              {form.delivery === "delivery" && total < 500 && (
                <p className="text-[0.65rem] text-center mt-2" style={{ color: "#c4b4a8" }}>
                  До безкоштовної доставки: {500 - total} ₴
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
