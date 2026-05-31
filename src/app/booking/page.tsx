"use client";

import { useState } from "react";
import { CheckCircle, Users, Calendar, Clock, MessageSquare, UtensilsCrossed } from "lucide-react";

const timeSlots = [
  "11:00","11:30","12:00","12:30","13:00","13:30",
  "14:00","14:30","15:00","15:30","16:00","16:30",
  "17:00","17:30","18:00","18:30","19:00","19:30",
  "20:00","20:30","21:00","21:30","22:00",
];
const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8];

/* ─── Схема столиків ─── */
const tables = [
  // Вікна (ліворуч)
  { id: 1,  label: "№1",  seats: 2,  zone: "Біля вікна",  x: 6,   y: 8  },
  { id: 2,  label: "№2",  seats: 2,  zone: "Біля вікна",  x: 6,   y: 28 },
  { id: 3,  label: "№3",  seats: 4,  zone: "Біля вікна",  x: 6,   y: 52 },
  { id: 4,  label: "№4",  seats: 2,  zone: "Біля вікна",  x: 6,   y: 72 },
  // Центр
  { id: 5,  label: "№5",  seats: 4,  zone: "Центр залу",  x: 36,  y: 15 },
  { id: 6,  label: "№6",  seats: 6,  zone: "Центр залу",  x: 36,  y: 42 },
  { id: 7,  label: "№7",  seats: 4,  zone: "Центр залу",  x: 36,  y: 68 },
  // Право/бокси
  { id: 8,  label: "№8",  seats: 2,  zone: "Бокс",        x: 68,  y: 8  },
  { id: 9,  label: "№9",  seats: 4,  zone: "Бокс",        x: 68,  y: 30 },
  { id: 10, label: "№10", seats: 6,  zone: "Бокс",        x: 68,  y: 56 },
  // Тераса
  { id: 11, label: "№11", seats: 4,  zone: "Тераса",      x: 84,  y: 18 },
  { id: 12, label: "№12", seats: 4,  zone: "Тераса",      x: 84,  y: 58 },
];

/* Детермінований псевдорандом — для кожної дати+часу+столику унікальний */
function isBooked(tableId: number, date: string, time: string): boolean {
  const str = `${tableId}|${date}|${time}`;
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (Math.abs(h) % 100) < 42; // ~42% столиків зайняті
}

const inputStyle = { background: "#fff", border: "1px solid #d4c4b8", color: "#1c1410" };
const inputClass = "w-full px-3 py-2.5 text-sm rounded-sm outline-none transition-colors placeholder:text-[#c4b4a8]";

export default function BookingPage() {
  const [form, setForm] = useState({
    name: "", phone: "", date: "", time: "", guests: 2, comment: "", tableId: 0,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const canShowTables = form.date && form.time;
  const selectedTable = tables.find((t) => t.id === form.tableId);

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
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(139,26,46,0.08)", border: "1px solid rgba(139,26,46,0.2)" }}>
            <CheckCircle size={36} color="#8b1a2e" />
          </div>
          <h1 className="text-4xl mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, color: "#1c1410" }}>
            Бронювання підтверджено!
          </h1>
          <p className="mb-1 text-sm" style={{ color: "#7a6a5e" }}>
            {form.date} о {form.time} · {form.guests} {form.guests === 1 ? "гість" : "гостей"}
          </p>
          {selectedTable && (
            <p className="mb-1 text-sm" style={{ color: "#7a6a5e" }}>
              Столик {selectedTable.label} · {selectedTable.zone}
            </p>
          )}
          <p className="mb-8 text-sm" style={{ color: "#a09080" }}>Ми зателефонуємо для підтвердження</p>
          <a href="/" className="btn-primary">← На головну</a>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen" style={{ background: "#faf7f2" }}>

      {/* ── Шапка ── */}
      <div className="relative overflow-hidden" style={{ background: "#1a1208", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 py-14">
          <p className="text-[0.55rem] tracking-[0.3em] uppercase mb-3" style={{ color: "#5a4a3a" }}>
            Ресторан Brasa
          </p>
          <h1
            className="text-5xl md:text-6xl mb-4"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, lineHeight: 1.05, color: "#f0e8dc" }}
          >
            Забронюйте<br />
            <em className="not-italic" style={{ color: "#c49a3c" }}>свій столик</em>
          </h1>
          <p className="text-sm max-w-md" style={{ color: "#5a4a3a" }}>
            Оберіть дату, час і зручний столик. Ми підготуємо все для вашого відпочинку.
          </p>
        </div>
        {/* Декоративна золота лінія */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(196,154,60,0.4), transparent)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Ліва колонка ── */}
          <div>
            {/* Інфо-блоки */}
            <div className="space-y-3 mb-10">
              {[
                { icon: Clock,             title: "Пн–Пт: 11:00–23:00",  sub: "Столик утримується 15 хвилин" },
                { icon: Clock,             title: "Сб–Нд: 10:00–00:00",  sub: "Бронювання від 1 до 8 гостей" },
                { icon: Users,             title: "Великі компанії",      sub: "Від 8 осіб — телефонуйте нам" },
                { icon: UtensilsCrossed,   title: "Кухня до 22:30",       sub: "Останнє замовлення о 22:30" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-4 rounded-sm"
                  style={{ background: "#fff", border: "1px solid #e8ddd4" }}>
                  <div className="w-9 h-9 flex-shrink-0 rounded-sm flex items-center justify-center"
                    style={{ background: "rgba(139,26,46,0.07)", border: "1px solid rgba(139,26,46,0.15)" }}>
                    <item.icon size={15} color="#8b1a2e" />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#1c1410" }}>{item.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#a09080" }}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Схема залу ── */}
            <div className="rounded-sm overflow-hidden" style={{ border: "1px solid #e8ddd4" }}>
              {/* Заголовок схеми */}
              <div className="px-5 py-3 flex items-center justify-between"
                style={{ background: "#1a1208", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="text-[0.62rem] tracking-[0.2em] uppercase" style={{ color: "#c49a3c" }}>
                  Схема залу
                </span>
                {canShowTables ? (
                  <span className="text-[0.58rem]" style={{ color: "#5a4a3a" }}>
                    {form.date} · {form.time}
                  </span>
                ) : (
                  <span className="text-[0.58rem]" style={{ color: "#4a3a30" }}>
                    Оберіть дату та час
                  </span>
                )}
              </div>

              {/* Легенда */}
              <div className="px-5 py-2.5 flex items-center gap-5" style={{ background: "#fff", borderBottom: "1px solid #f0e8e0" }}>
                {[
                  { color: "#f0fdf4", border: "#86efac", label: "Вільний" },
                  { color: "#fef2f2", border: "#fca5a5", label: "Зайнятий" },
                  { color: "#8b1a2e", border: "#8b1a2e", label: "Обраний" },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded-[2px]" style={{ background: l.color, border: `1.5px solid ${l.border}` }} />
                    <span className="text-[0.58rem] tracking-wider uppercase" style={{ color: "#a09080" }}>{l.label}</span>
                  </div>
                ))}
              </div>

              {/* Карта залу */}
              <div className="relative p-4" style={{ background: "#faf7f2", minHeight: "280px" }}>
                {/* Зони підписи */}
                <div className="absolute top-2 left-4 text-[0.48rem] tracking-widest uppercase" style={{ color: "#c4b4a8" }}>Вікна</div>
                <div className="absolute top-2 left-[33%] text-[0.48rem] tracking-widest uppercase" style={{ color: "#c4b4a8" }}>Центр</div>
                <div className="absolute top-2 left-[65%] text-[0.48rem] tracking-widest uppercase" style={{ color: "#c4b4a8" }}>Бокси</div>
                <div className="absolute top-2 right-2 text-[0.48rem] tracking-widest uppercase" style={{ color: "#c4b4a8" }}>Тераса</div>

                {/* Розділювачі зон */}
                <div className="absolute top-6 bottom-4" style={{ left: "31%", width: "1px", background: "#e8ddd4" }} />
                <div className="absolute top-6 bottom-4" style={{ left: "63%", width: "1px", background: "#e8ddd4" }} />
                <div className="absolute top-6 bottom-4" style={{ left: "80%", width: "1px", background: "rgba(196,154,60,0.25)", borderLeft: "1px dashed rgba(196,154,60,0.3)" }} />

                {/* Столики */}
                {tables.map((table) => {
                  const booked = canShowTables ? isBooked(table.id, form.date, form.time) : false;
                  const selected = form.tableId === table.id;
                  const disabled = booked;

                  let bg = "#fff";
                  let border = "#d4c4b8";
                  let textColor = "#7a6a5e";

                  if (selected) { bg = "#8b1a2e"; border = "#8b1a2e"; textColor = "#fff"; }
                  else if (booked) { bg = "#fef2f2"; border = "#fca5a5"; textColor = "#c4a0a0"; }
                  else if (canShowTables) { bg = "#f0fdf4"; border = "#86efac"; textColor = "#166534"; }

                  return (
                    <button
                      key={table.id}
                      type="button"
                      disabled={disabled}
                      onClick={() => !disabled && setForm((f) => ({ ...f, tableId: table.id }))}
                      title={`${table.label} · ${table.seats} місця · ${table.zone}${booked ? " · Зайнятий" : ""}`}
                      className="absolute flex flex-col items-center justify-center rounded-sm transition-all duration-200"
                      style={{
                        left: `${table.x}%`,
                        top: `${table.y}%`,
                        width: table.seats >= 6 ? "52px" : table.seats >= 4 ? "46px" : "40px",
                        height: table.seats >= 6 ? "42px" : "36px",
                        background: bg,
                        border: `1.5px solid ${border}`,
                        transform: selected ? "scale(1.1)" : "scale(1)",
                        boxShadow: selected ? "0 4px 12px rgba(139,26,46,0.3)" : "none",
                        cursor: disabled ? "not-allowed" : "pointer",
                        opacity: !canShowTables ? 0.5 : 1,
                      }}
                    >
                      <span className="text-[0.5rem] font-semibold leading-none" style={{ color: textColor }}>
                        {table.label}
                      </span>
                      <span className="text-[0.42rem] leading-none mt-0.5" style={{ color: textColor, opacity: 0.8 }}>
                        {table.seats}p
                      </span>
                    </button>
                  );
                })}

                {/* Підказка якщо не обрано дату */}
                {!canShowTables && (
                  <div className="absolute inset-0 flex items-center justify-center rounded">
                    <p className="text-[0.65rem] tracking-wider uppercase text-center" style={{ color: "#c4b4a8" }}>
                      Оберіть дату та час<br />щоб побачити доступність
                    </p>
                  </div>
                )}
              </div>

              {/* Вибраний столик */}
              {selectedTable && (
                <div className="px-5 py-3 flex items-center gap-3"
                  style={{ background: "rgba(139,26,46,0.04)", borderTop: "1px solid rgba(139,26,46,0.1)" }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: "#8b1a2e" }} />
                  <span className="text-xs" style={{ color: "#1c1410" }}>
                    <span className="font-medium">Столик {selectedTable.label}</span>
                    <span style={{ color: "#a09080" }}> · {selectedTable.zone} · до {selectedTable.seats} гостей</span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ── Форма ── */}
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
                    type={f.type} required placeholder={f.placeholder}
                    value={(form as Record<string, string | number>)[f.key] as string}
                    onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                    className={inputClass} style={inputStyle}
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="text-[0.65rem] uppercase tracking-wider mb-1.5 flex items-center gap-1.5" style={{ color: "#a09080" }}>
                <Calendar size={11} /> Дата
              </label>
              <input
                type="date" required min={today} value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value, tableId: 0 }))}
                className={inputClass} style={{ ...inputStyle, colorScheme: "light" }}
              />
            </div>

            <div>
              <label className="text-[0.65rem] uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: "#a09080" }}>
                <Clock size={11} /> Час
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
                {timeSlots.map((t) => (
                  <button key={t} type="button"
                    onClick={() => setForm((f) => ({ ...f, time: t, tableId: 0 }))}
                    className="py-2 text-[0.68rem] rounded-sm border transition-all"
                    style={{
                      background: form.time === t ? "#8b1a2e" : "#fff",
                      color: form.time === t ? "#fff" : "#7a6a5e",
                      border: `1px solid ${form.time === t ? "#8b1a2e" : "#d4c4b8"}`,
                    }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Підказка: обери столик */}
            {canShowTables && !form.tableId && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-sm text-[0.68rem]"
                style={{ background: "rgba(196,154,60,0.07)", border: "1px solid rgba(196,154,60,0.2)", color: "#a07830" }}>
                ← Оберіть столик на схемі залу зліва
              </div>
            )}
            {form.tableId > 0 && selectedTable && (
              <div className="flex items-center justify-between px-3 py-2 rounded-sm"
                style={{ background: "rgba(139,26,46,0.05)", border: "1px solid rgba(139,26,46,0.15)" }}>
                <span className="text-[0.68rem]" style={{ color: "#8b1a2e" }}>
                  ✓ Столик {selectedTable.label} · {selectedTable.zone}
                </span>
                <button type="button" onClick={() => setForm((f) => ({ ...f, tableId: 0 }))}
                  className="text-[0.6rem]" style={{ color: "#c4b4a8" }}>
                  змінити
                </button>
              </div>
            )}

            <div>
              <label className="text-[0.65rem] uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: "#a09080" }}>
                <Users size={11} /> Кількість гостей
              </label>
              <div className="flex gap-2">
                {guestOptions.map((g) => (
                  <button key={g} type="button"
                    onClick={() => setForm((f) => ({ ...f, guests: g }))}
                    className="flex-1 py-2 text-sm rounded-sm border transition-all"
                    style={{
                      background: form.guests === g ? "#8b1a2e" : "#fff",
                      color: form.guests === g ? "#fff" : "#7a6a5e",
                      border: `1px solid ${form.guests === g ? "#8b1a2e" : "#d4c4b8"}`,
                    }}>
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[0.65rem] uppercase tracking-wider mb-1.5 flex items-center gap-1.5" style={{ color: "#a09080" }}>
                <MessageSquare size={11} /> Побажання
              </label>
              <textarea rows={3} placeholder="Алергії, особливі побажання, привід..."
                value={form.comment}
                onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                className={`${inputClass} resize-none`} style={inputStyle}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !form.time || !form.date || !form.tableId}
              className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Бронюємо..." : "Підтвердити бронювання"}
            </button>

            {canShowTables && !form.tableId && (
              <p className="text-center text-[0.62rem]" style={{ color: "#c4b4a8" }}>
                Для бронювання необхідно обрати столик
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
