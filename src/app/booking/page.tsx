"use client";

import { useState } from "react";
import { CheckCircle, Users, Calendar, Clock, MessageSquare } from "lucide-react";

const timeSlots = [
  "11:00","11:30","12:00","12:30","13:00","13:30",
  "14:00","14:30","15:00","15:30","16:00","16:30",
  "17:00","17:30","18:00","18:30","19:00","19:30",
  "20:00","20:30","21:00","21:30","22:00",
];
const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8];

const inputStyle = {
  background: "#fff",
  border: "1px solid #d4c4b8",
  color: "#1c1410",
};
const inputClass = "w-full px-3 py-2.5 text-sm rounded-sm outline-none transition-colors placeholder:text-[#c4b4a8]";

export default function BookingPage() {
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", guests: 2, comment: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center px-6" style={{ background: "#faf7f2" }}>
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(139,26,46,0.08)", border: "1px solid rgba(139,26,46,0.2)" }}>
            <CheckCircle size={36} color="#8b1a2e" />
          </div>
          <h1 className="text-4xl mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, color: "#1c1410" }}>
            Бронювання підтверджено!
          </h1>
          <p className="mb-2 text-sm" style={{ color: "#7a6a5e" }}>{form.date} о {form.time} · {form.guests} гостей</p>
          <p className="mb-8 text-sm" style={{ color: "#a09080" }}>Ми зателефонуємо для підтвердження</p>
          <a href="/" className="btn-primary">← На головну</a>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen" style={{ background: "#faf7f2" }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="section-label mb-4">Бронювання</p>
            <h1
              className="text-5xl md:text-6xl mb-6"
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, lineHeight: 1.05, color: "#1c1410" }}
            >
              Забронюйте<br />
              <em className="not-italic" style={{ color: "#8b1a2e" }}>свій столик</em>
            </h1>
            <p className="leading-relaxed mb-10 max-w-md text-sm" style={{ color: "#7a6a5e" }}>
              Оберіть зручний час і дату. Ми підготуємо все для вашого комфортного відпочинку.
            </p>
            <div className="space-y-3">
              {[
                { icon: Clock, title: "Пн–Пт: 11:00–23:00",    sub: "Столик утримується 15 хвилин" },
                { icon: Clock, title: "Сб–Нд: 10:00–00:00",    sub: "Бронювання від 1 до 8 гостей" },
                { icon: Users, title: "Великі компанії",        sub: "Від 8 осіб — телефонуйте нам" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-4 rounded-sm" style={{ background: "#fff", border: "1px solid #e8ddd4" }}>
                  <div className="w-9 h-9 flex-shrink-0 rounded-sm flex items-center justify-center" style={{ background: "rgba(139,26,46,0.07)", border: "1px solid rgba(139,26,46,0.15)" }}>
                    <item.icon size={15} color="#8b1a2e" />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#1c1410" }}>{item.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#a09080" }}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 p-8 rounded-sm"
            style={{ background: "#fff", border: "1px solid #e8ddd4", boxShadow: "0 4px 24px rgba(28,20,16,0.07)" }}
          >
            <p className="section-label mb-2">Деталі бронювання</p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { key: "name",  label: "Ім'я",    type: "text", placeholder: "Ваше ім'я" },
                { key: "phone", label: "Телефон", type: "tel",  placeholder: "+38 (0__) ___-__-__" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="text-[0.65rem] uppercase tracking-wider block mb-1.5" style={{ color: "#a09080" }}>{f.label}</label>
                  <input
                    type={f.type}
                    required
                    placeholder={f.placeholder}
                    value={(form as Record<string, string | number>)[f.key] as string}
                    onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="text-[0.65rem] uppercase tracking-wider block mb-1.5 flex items-center gap-1.5" style={{ color: "#a09080" }}>
                <Calendar size={11} /> Дата
              </label>
              <input
                type="date"
                required
                min={today}
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                className={inputClass}
                style={{ ...inputStyle, colorScheme: "light" }}
              />
            </div>

            <div>
              <label className="text-[0.65rem] uppercase tracking-wider block mb-2 flex items-center gap-1.5" style={{ color: "#a09080" }}>
                <Clock size={11} /> Час
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, time: t }))}
                    className="py-2 text-[0.68rem] rounded-sm border transition-all"
                    style={{
                      background: form.time === t ? "#8b1a2e" : "#fff",
                      color: form.time === t ? "#fff" : "#7a6a5e",
                      border: `1px solid ${form.time === t ? "#8b1a2e" : "#d4c4b8"}`,
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[0.65rem] uppercase tracking-wider block mb-2 flex items-center gap-1.5" style={{ color: "#a09080" }}>
                <Users size={11} /> Кількість гостей
              </label>
              <div className="flex gap-2">
                {guestOptions.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, guests: g }))}
                    className="flex-1 py-2 text-sm rounded-sm border transition-all"
                    style={{
                      background: form.guests === g ? "#8b1a2e" : "#fff",
                      color: form.guests === g ? "#fff" : "#7a6a5e",
                      border: `1px solid ${form.guests === g ? "#8b1a2e" : "#d4c4b8"}`,
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[0.65rem] uppercase tracking-wider block mb-1.5 flex items-center gap-1.5" style={{ color: "#a09080" }}>
                <MessageSquare size={11} /> Побажання
              </label>
              <textarea
                rows={3}
                placeholder="Алергії, особливі побажання, привід..."
                value={form.comment}
                onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                className={`${inputClass} resize-none`}
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !form.time || !form.date}
              className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Бронюємо..." : "Підтвердити бронювання"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
