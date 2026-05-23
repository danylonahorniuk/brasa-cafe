"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const inputStyle = { background: "#fff", border: "1px solid #d4c4b8", color: "#1c1410" };
const inputClass = "w-full px-3 py-2.5 text-sm rounded-sm outline-none transition-colors placeholder:text-[#c4b4a8]";

export default function ContactPage() {
  const [form, setForm]   = useState({ name: "", email: "", message: "" });
  const [sent, setSent]   = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="pt-20" style={{ background: "#faf7f2", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <p className="section-label mb-3">Контакти</p>
        <h1 className="text-5xl md:text-6xl mb-14" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, lineHeight: 1.05, color: "#1c1410" }}>
          Зв'яжіться з нами
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: MapPin, label: "Адреса",   value: "вул. Хрещатик 22,\nКиїв, 01001" },
                { icon: Phone,  label: "Телефон",  value: "+38 (044) 123-45-67\n+38 (067) 123-45-67" },
                { icon: Mail,   label: "Email",    value: "hello@brasa.ua" },
                { icon: Clock,  label: "Графік",   value: "Пн–Пт: 11:00–23:00\nСб–Нд: 10:00–00:00" },
              ].map((item) => (
                <div key={item.label} className="p-5 rounded-sm" style={{ background: "#fff", border: "1px solid #e8ddd4" }}>
                  <div className="w-8 h-8 rounded-sm flex items-center justify-center mb-3" style={{ background: "rgba(139,26,46,0.07)", border: "1px solid rgba(139,26,46,0.15)" }}>
                    <item.icon size={14} color="#8b1a2e" />
                  </div>
                  <p className="text-[0.65rem] uppercase tracking-wider mb-1" style={{ color: "#a09080" }}>{item.label}</p>
                  <p className="text-sm whitespace-pre-line leading-relaxed" style={{ color: "#1c1410" }}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div
              className="h-56 rounded-sm overflow-hidden flex items-center justify-center relative"
              style={{ background: "#fff", border: "1px solid #e8ddd4" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(rgba(139,26,46,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(139,26,46,0.06) 1px, transparent 1px)`,
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="relative z-10 text-center">
                <MapPin size={28} color="#8b1a2e" className="mx-auto mb-2" />
                <p className="text-sm" style={{ color: "#7a6a5e" }}>вул. Хрещатик 22, Київ</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs mt-2 inline-block hover:underline"
                  style={{ color: "#8b1a2e" }}
                >
                  Відкрити в Google Maps →
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 rounded-sm" style={{ background: "#fff", border: "1px solid #e8ddd4", boxShadow: "0 4px 24px rgba(28,20,16,0.06)" }}>
            <p className="section-label mb-6">Напишіть нам</p>
            {sent ? (
              <div className="text-center py-10">
                <Send size={32} color="#8b1a2e" className="mx-auto mb-4" />
                <p className="text-lg" style={{ fontFamily: "var(--font-cormorant), serif", color: "#1c1410" }}>Повідомлення надіслано!</p>
                <p className="text-sm mt-2" style={{ color: "#a09080" }}>Ми відповімо протягом 24 годин</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { key: "name",  label: "Ім'я",  type: "text",  placeholder: "Ваше ім'я"           },
                  { key: "email", label: "Email", type: "email", placeholder: "email@example.com"   },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="text-[0.65rem] uppercase tracking-wider block mb-1.5" style={{ color: "#a09080" }}>{f.label}</label>
                    <input
                      type={f.type}
                      required
                      placeholder={f.placeholder}
                      value={(form as Record<string, string>)[f.key]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                ))}
                <div>
                  <label className="text-[0.65rem] uppercase tracking-wider block mb-1.5" style={{ color: "#a09080" }}>Повідомлення</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Ваше питання або пропозиція..."
                    value={form.message}
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                    className={`${inputClass} resize-none`}
                    style={inputStyle}
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                  <Send size={14} />
                  {loading ? "Надсилаємо..." : "Надіслати повідомлення"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
