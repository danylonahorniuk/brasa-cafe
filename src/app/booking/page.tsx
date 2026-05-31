"use client";

import { useState } from "react";
import { CheckCircle, Users, Calendar, Clock, MessageSquare, UtensilsCrossed, ChevronLeft, ChevronRight } from "lucide-react";

/* ─── Локації ─── */
const locations = [
  {
    id: 1,
    name: "Поділ",
    address: "вул. Сагайдачного 14",
    hours: "Пн–Пт 11:00–23:00 · Сб–Нд 10:00–00:00",
    tables: [
      { id: 1,  label: "№1",  seats: 2, zone: "Біля вікна", shape: "round", svgX: 75,  svgY: 72  },
      { id: 2,  label: "№2",  seats: 2, zone: "Біля вікна", shape: "round", svgX: 75,  svgY: 158 },
      { id: 3,  label: "№3",  seats: 4, zone: "Біля вікна", shape: "sq4",   svgX: 75,  svgY: 252 },
      { id: 4,  label: "№4",  seats: 2, zone: "Біля вікна", shape: "round", svgX: 75,  svgY: 348 },
      { id: 5,  label: "№5",  seats: 4, zone: "Центр залу", shape: "sq4",   svgX: 240, svgY: 90  },
      { id: 6,  label: "№6",  seats: 6, zone: "Центр залу", shape: "rect6", svgX: 240, svgY: 213 },
      { id: 7,  label: "№7",  seats: 4, zone: "Центр залу", shape: "sq4",   svgX: 240, svgY: 348 },
      { id: 8,  label: "№8",  seats: 2, zone: "Бокс",       shape: "round", svgX: 415, svgY: 72  },
      { id: 9,  label: "№9",  seats: 4, zone: "Бокс",       shape: "sq4",   svgX: 415, svgY: 198 },
      { id: 10, label: "№10", seats: 6, zone: "Бокс",       shape: "rect6", svgX: 415, svgY: 348 },
      { id: 11, label: "№11", seats: 4, zone: "Тераса",     shape: "sq4",   svgX: 610, svgY: 140 },
      { id: 12, label: "№12", seats: 4, zone: "Тераса",     shape: "sq4",   svgX: 610, svgY: 298 },
    ],
  },
  {
    id: 2,
    name: "Печерськ",
    address: "вул. Велика Васильківська 55",
    hours: "Щодня 12:00–23:00",
    tables: [
      { id: 1,  label: "№1",  seats: 2, zone: "Бар",        shape: "round", svgX: 72,  svgY: 100 },
      { id: 2,  label: "№2",  seats: 2, zone: "Бар",        shape: "round", svgX: 72,  svgY: 215 },
      { id: 3,  label: "№3",  seats: 2, zone: "Бар",        shape: "round", svgX: 72,  svgY: 330 },
      { id: 4,  label: "№4",  seats: 4, zone: "Центр залу", shape: "sq4",   svgX: 240, svgY: 85  },
      { id: 5,  label: "№5",  seats: 4, zone: "Центр залу", shape: "sq4",   svgX: 240, svgY: 215 },
      { id: 6,  label: "№6",  seats: 6, zone: "Центр залу", shape: "rect6", svgX: 240, svgY: 348 },
      { id: 7,  label: "№7",  seats: 4, zone: "VIP зал",    shape: "sq4",   svgX: 415, svgY: 95  },
      { id: 8,  label: "№8",  seats: 6, zone: "VIP зал",    shape: "rect6", svgX: 473, svgY: 218 },
      { id: 9,  label: "№9",  seats: 4, zone: "VIP зал",    shape: "sq4",   svgX: 535, svgY: 95  },
      { id: 10, label: "№10", seats: 8, zone: "Банкет",     shape: "rect8", svgX: 473, svgY: 358 },
    ],
  },
  {
    id: 3,
    name: "Оболонь",
    address: "просп. Оболонський 1",
    hours: "Пн–Нд 11:00–22:00",
    tables: [
      { id: 1,  label: "№1",  seats: 2, zone: "Вхід",       shape: "round", svgX: 74,  svgY: 128 },
      { id: 2,  label: "№2",  seats: 2, zone: "Вхід",       shape: "round", svgX: 74,  svgY: 302 },
      { id: 3,  label: "№3",  seats: 4, zone: "Основний",   shape: "sq4",   svgX: 232, svgY: 85  },
      { id: 4,  label: "№4",  seats: 4, zone: "Основний",   shape: "sq4",   svgX: 232, svgY: 215 },
      { id: 5,  label: "№5",  seats: 6, zone: "Основний",   shape: "rect6", svgX: 232, svgY: 348 },
      { id: 6,  label: "№6",  seats: 4, zone: "Набережна",  shape: "sq4",   svgX: 422, svgY: 85  },
      { id: 7,  label: "№7",  seats: 4, zone: "Набережна",  shape: "sq4",   svgX: 422, svgY: 215 },
      { id: 8,  label: "№8",  seats: 6, zone: "Набережна",  shape: "rect6", svgX: 422, svgY: 348 },
      { id: 9,  label: "№9",  seats: 4, zone: "Тераса",     shape: "sq4",   svgX: 608, svgY: 142 },
      { id: 10, label: "№10", seats: 4, zone: "Тераса",     shape: "sq4",   svgX: 608, svgY: 298 },
    ],
  },
];

const timeSlots = [
  "11:00","11:30","12:00","12:30","13:00","13:30",
  "14:00","14:30","15:00","15:30","16:00","16:30",
  "17:00","17:30","18:00","18:30","19:00","19:30",
  "20:00","20:30","21:00","21:30","22:00",
];
const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8];

function isBooked(locationId: number, tableId: number, date: string, time: string): boolean {
  const str = `${locationId}|${tableId}|${date}|${time}`;
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (Math.abs(h) % 100) < 42;
}

/* ─── SVG План залу ─── */
function FloorPlan({
  location, form, canShowTables, onTableClick,
}: {
  location: typeof locations[0];
  form: { date: string; time: string; tableId: number };
  canShowTables: boolean;
  onTableClick: (id: number) => void;
}) {
  const W = "#3d2818";
  const FL = "#f8f4ef";
  const chR = 7;

  const getC = (tableId: number) => {
    const booked = canShowTables ? isBooked(location.id, tableId, form.date, form.time) : false;
    const sel = form.tableId === tableId;
    if (sel)           return { fill:"#8b1a2e", stroke:"#6a1020", chair:"#701525", text:"#fff",    cur:"pointer"      };
    if (booked)        return { fill:"#fde8e8", stroke:"#e09090", chair:"#f5c0c0", text:"#c06060", cur:"not-allowed"  };
    if (canShowTables) return { fill:"#e8f5ee", stroke:"#5a9a70", chair:"#b8e4c8", text:"#2e6040", cur:"pointer"      };
    return               { fill:"#f0ebe4", stroke:"#c4b4a8", chair:"#e4dcd4", text:"#8a7a6e", cur:"default"       };
  };

  const T = ({ t }: { t: typeof location.tables[0] }) => {
    const c = getC(t.id);
    const x = (t as any).svgX as number;
    const y = (t as any).svgY as number;
    const shape = (t as any).shape as string;
    const booked = canShowTables ? isBooked(location.id, t.id, form.date, form.time) : false;
    const sw = 1.5, csw = 0.8;

    const ch = (cx: number, cy: number) =>
      <circle cx={cx} cy={cy} r={chR} fill={c.chair} stroke={c.stroke} strokeWidth={csw} />;

    const lbl = (
      <g style={{ pointerEvents:"none", userSelect:"none" }}>
        <text x={x} y={y-2} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="700" fill={c.text}>{t.label}</text>
        <text x={x} y={y+9} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill={c.text} opacity="0.7">{t.seats}p</text>
      </g>
    );

    let inner;
    if (shape === "round") inner = (
      <g>
        {ch(x, y-23)} {ch(x, y+23)}
        <circle cx={x} cy={y} r={16} fill={c.fill} stroke={c.stroke} strokeWidth={sw} />
        {lbl}
      </g>
    );
    else if (shape === "sq4") inner = (
      <g>
        {ch(x,y-27)} {ch(x,y+27)} {ch(x-27,y)} {ch(x+27,y)}
        <rect x={x-18} y={y-18} width="36" height="36" rx="5" fill={c.fill} stroke={c.stroke} strokeWidth={sw} />
        {lbl}
      </g>
    );
    else if (shape === "rect6") inner = (
      <g>
        {ch(x-17,y-26)} {ch(x,y-26)} {ch(x+17,y-26)}
        {ch(x-17,y+26)} {ch(x,y+26)} {ch(x+17,y+26)}
        <rect x={x-28} y={y-17} width="56" height="34" rx="5" fill={c.fill} stroke={c.stroke} strokeWidth={sw} />
        {lbl}
      </g>
    );
    else inner = (
      <g>
        {ch(x-24,y-28)} {ch(x-8,y-28)} {ch(x+8,y-28)} {ch(x+24,y-28)}
        {ch(x-24,y+28)} {ch(x-8,y+28)} {ch(x+8,y+28)} {ch(x+24,y+28)}
        <rect x={x-34} y={y-18} width="68" height="36" rx="5" fill={c.fill} stroke={c.stroke} strokeWidth={sw} />
        {lbl}
      </g>
    );

    return (
      <g key={t.id} onClick={() => { if (!booked && canShowTables) onTableClick(t.id); }}
         style={{ cursor: c.cur, transition: "opacity .2s" }}>
        {inner}
      </g>
    );
  };

  const ZL = (x: number, y: number, txt: string) => (
    <text x={x} y={y} textAnchor="middle" fontSize="8" fill="#c4b4a8" letterSpacing="3" fontWeight="500" style={{ userSelect:"none" }}>{txt}</text>
  );

  const Overlay = ({ cx }: { cx: number }) => !canShowTables ? (
    <g>
      <rect x="12" y="12" width={cx} height="406" fill="rgba(240,235,228,0.55)" />
      <text x={12+cx/2} y="208" textAnchor="middle" fontSize="10" fill="#c4b4a8" letterSpacing="3">ОБЕРІТЬ ДАТУ ТА ЧАС</text>
      <text x={12+cx/2} y="225" textAnchor="middle" fontSize="10" fill="#c4b4a8" letterSpacing="3">ЩОБ ПОБАЧИТИ ДОСТУПНІСТЬ</text>
    </g>
  ) : null;

  /* ── ПОДІЛ ── */
  if (location.id === 1) return (
    <svg viewBox="0 0 700 430" width="100%" style={{ display:"block" }}>
      <rect width="700" height="430" fill="#ebe5dc" />
      <rect x="12" y="12" width="528" height="406" fill={FL} />
      <rect x="556" y="58" width="132" height="314" fill="#f5f0e8" />
      <path d="M12 12 H540 V418 H12 Z" fill="none" stroke={W} strokeWidth="8" />
      <rect x="556" y="58" width="132" height="314" fill="none" stroke={W} strokeWidth="6" />
      {/* Glass partition */}
      <line x1="540" y1="58" x2="540" y2="372" stroke="#c49a3c" strokeWidth="2" strokeDasharray="8,5" opacity="0.6" />
      {/* Windows */}
      {[55,132,210,288,366].map(wy=>(
        <g key={wy}><rect x="8" y={wy} width="8" height="28" fill="#c8dce8" stroke="#90b0c4" strokeWidth="0.5" /></g>
      ))}
      {/* Door */}
      <rect x="210" y="414" width="110" height="12" fill="#ebe5dc" />
      <path d="M320 418 A110 110 0 0 1 210 418" fill="none" stroke="#c4b4a8" strokeWidth="1" strokeDasharray="4,3" />
      <text x="265" y="427" textAnchor="middle" fontSize="7" fill="#c4b4a8" letterSpacing="2">ВХІД</text>
      {/* Zone dividers */}
      {[155,324,498].map(x=>(
        <line key={x} x1={x} y1="20" x2={x} y2="410" stroke="#d4c4b4" strokeWidth="0.8" strokeDasharray="5,4" />
      ))}
      {ZL(83,  27, "ВІКНА")} {ZL(239, 27, "ЦЕНТР")} {ZL(411, 27, "БОКСИ")} {ZL(622, 44, "ТЕРАСА")}
      {location.tables.map(t => <T key={t.id} t={t} />)}
      <Overlay cx={528} />
    </svg>
  );

  /* ── ПЕЧЕРСЬК ── */
  if (location.id === 2) return (
    <svg viewBox="0 0 700 430" width="100%" style={{ display:"block" }}>
      <rect width="700" height="430" fill="#ebe5dc" />
      <rect x="12" y="12" width="338" height="406" fill={FL} />
      <rect x="360" y="12" width="226" height="276" fill="#f5f0e8" />
      <rect x="360" y="298" width="226" height="120" fill="#f2ede6" />
      {/* Bar counter */}
      <rect x="16" y="16" width="98" height="398" fill="#f0e8de" />
      <rect x="110" y="16" width="5" height="398" fill="#c8b89a" />
      <text x="63" y="215" textAnchor="middle" fontSize="9" fill="#a09070" letterSpacing="2"
            transform="rotate(-90,63,215)" style={{ userSelect:"none" }}>БАР</text>
      {/* Walls */}
      <rect x="12" y="12" width="338" height="406" fill="none" stroke={W} strokeWidth="8" />
      <rect x="360" y="12" width="226" height="276" fill="none" stroke={W} strokeWidth="6" />
      <rect x="360" y="298" width="226" height="120" fill="none" stroke={W} strokeWidth="6" />
      {/* Door */}
      <rect x="8" y="168" width="10" height="94" fill="#ebe5dc" />
      <path d="M17 168 A94 94 0 0 0 17 262" fill="none" stroke="#c4b4a8" strokeWidth="1" strokeDasharray="4,3" />
      {/* Windows */}
      {[55,140,222,304,375].map(wy=>(
        <rect key={wy} x="8" y={wy} width="8" height="24" fill="#c8dce8" stroke="#90b0c4" strokeWidth="0.5" />
      ))}
      {/* Divider */}
      <line x1="350" y1="20" x2="350" y2="410" stroke="#d4c4b4" strokeWidth="0.8" strokeDasharray="5,4" />
      {ZL(63,27,"БАР")} {ZL(244,27,"ЦЕНТР ЗАЛУ")} {ZL(473,27,"VIP ЗАЛ")} {ZL(473,314,"БАНКЕТ")}
      {location.tables.map(t => <T key={t.id} t={t} />)}
      <Overlay cx={338} />
    </svg>
  );

  /* ── ОБОЛОНЬ ── */
  return (
    <svg viewBox="0 0 700 430" width="100%" style={{ display:"block" }}>
      <rect width="700" height="430" fill="#ebe5dc" />
      <rect x="12" y="12" width="504" height="406" fill={FL} />
      <rect x="530" y="55" width="158" height="320" fill="#edf5e4" />
      <path d="M12 12 H516 V418 H12 Z" fill="none" stroke={W} strokeWidth="8" />
      {/* Terrace dashed walls */}
      <rect x="530" y="55" width="158" height="320" fill="none" stroke={W} strokeWidth="5" strokeDasharray="12,6" />
      {/* Glass line */}
      <line x1="516" y1="55" x2="516" y2="375" stroke="#c49a3c" strokeWidth="2" strokeDasharray="8,5" opacity="0.6" />
      <text x="609" y="44" textAnchor="middle" fontSize="7" fill="#7a9a60" letterSpacing="2">ВУЛИЦЯ</text>
      {/* Windows top */}
      {[75,165,255,345,425].map(wx=>(
        <rect key={wx} x={wx} y="8" width="26" height="8" fill="#c8dce8" stroke="#90b0c4" strokeWidth="0.5" />
      ))}
      {/* Door */}
      <rect x="8" y="178" width="10" height="84" fill="#ebe5dc" />
      <path d="M17 178 A84 84 0 0 0 17 262" fill="none" stroke="#c4b4a8" strokeWidth="1" strokeDasharray="4,3" />
      {/* Zone dividers */}
      {[148,332,516].map(x=>(
        <line key={x} x1={x} y1="20" x2={x} y2="410" stroke="#d4c4b4" strokeWidth="0.8" strokeDasharray="5,4" />
      ))}
      {ZL(80,27,"ВХІД")} {ZL(240,27,"ОСНОВНИЙ")} {ZL(424,27,"НАБЕРЕЖНА")} {ZL(609,27,"ТЕРАСА")}
      {location.tables.map(t => <T key={t.id} t={t} />)}
      <Overlay cx={504} />
    </svg>
  );
}

const inputStyle = { background: "#fff", border: "1px solid #d4c4b8", color: "#1c1410" };
const inputClass = "w-full px-3 py-2.5 text-sm rounded-sm outline-none transition-colors placeholder:text-[#c4b4a8]";

export default function BookingPage() {
  const [locIndex, setLocIndex] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", guests: 2, comment: "", tableId: 0 });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [animDir, setAnimDir] = useState<"left" | "right">("left");
  const [isExiting, setIsExiting] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const location = locations[locIndex];
  const prevLoc = locations[(locIndex - 1 + locations.length) % locations.length];
  const nextLoc = locations[(locIndex + 1) % locations.length];
  const canShowTables = form.date && form.time;
  const selectedTable = location.tables.find((t) => t.id === form.tableId);

  const switchLocation = (idx: number) => {
    if (idx === locIndex) return;
    const dir = idx > locIndex || (locIndex === locations.length - 1 && idx === 0) ? "left" : "right";
    setAnimDir(dir);
    setIsExiting(true);
    setTimeout(() => {
      setLocIndex(idx);
      setForm((f) => ({ ...f, date: "", time: "", tableId: 0 }));
      setIsExiting(false);
    }, 220);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          <p className="mb-1 text-sm" style={{ color: "#7a6a5e" }}>{location.name} · {location.address}</p>
          {selectedTable && (
            <p className="mb-1 text-sm" style={{ color: "#7a6a5e" }}>Столик {selectedTable.label} · {selectedTable.zone}</p>
          )}
          <p className="mb-8 text-sm" style={{ color: "#a09080" }}>Ми зателефонуємо для підтвердження</p>
          <a href="/" className="btn-primary">← На головну</a>
        </div>
      </div>
    );
  }

  const animClass = isExiting
    ? (animDir === "left" ? "loc-exit-left" : "loc-exit-right")
    : (animDir === "left" ? "loc-enter-right" : "loc-enter-left");

  return (
    <div className="pt-20 min-h-screen" style={{ background: "#faf7f2" }}>

      {/* ── Шапка ── */}
      <div className="relative overflow-hidden" style={{ background: "#1a1208", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 py-14 text-center">
          <h1 className="text-5xl md:text-6xl"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, lineHeight: 1.05, color: "#f0e8dc" }}>
            Забронюйте<br />
            <em className="not-italic" style={{ color: "#c49a3c" }}>свій столик</em>
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(196,154,60,0.4), transparent)" }} />
      </div>

      {/* ── Перемикач ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e8ddd4" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-stretch">
            <button onClick={() => switchLocation((locIndex - 1 + locations.length) % locations.length)}
              className="loc-arrow flex items-center gap-2.5 py-3.5 pr-6 transition-all duration-200"
              style={{ borderRight: "1px solid #e8ddd4" }}>
              <ChevronLeft size={15} style={{ color: "#c4b4a8" }} />
              <div className="text-left">
                <p className="text-[0.48rem] tracking-[0.2em] uppercase mb-0.5" style={{ color: "#c4b4a8" }}>Попередній</p>
                <p className="text-[0.8rem] font-medium" style={{ color: "#7a6a5e" }}>Brasa {prevLoc.name}</p>
                <p className="text-[0.58rem]" style={{ color: "#c4b4a8" }}>{prevLoc.address}</p>
              </div>
            </button>
            <div className={`flex-1 flex flex-col items-center justify-center py-3.5 px-4 ${animClass}`}>
              <p className="text-[0.48rem] tracking-[0.25em] uppercase mb-0.5" style={{ color: "#c49a3c" }}>Ви бронюєте тут</p>
              <p className="text-base" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400, color: "#1c1410" }}>
                Brasa {location.name}
              </p>
              <p className="text-[0.6rem]" style={{ color: "#a09080" }}>{location.address}</p>
              <div className="flex gap-1.5 mt-2">
                {locations.map((_, i) => (
                  <button key={i} onClick={() => switchLocation(i)} className="rounded-full transition-all duration-300"
                    style={{ width: i === locIndex ? "16px" : "5px", height: "5px", background: i === locIndex ? "#8b1a2e" : "#d4c4b8" }} />
                ))}
              </div>
            </div>
            <button onClick={() => switchLocation((locIndex + 1) % locations.length)}
              className="loc-arrow flex items-center gap-2.5 py-3.5 pl-6 transition-all duration-200"
              style={{ borderLeft: "1px solid #e8ddd4" }}>
              <div className="text-right">
                <p className="text-[0.48rem] tracking-[0.2em] uppercase mb-0.5" style={{ color: "#c4b4a8" }}>Наступний</p>
                <p className="text-[0.8rem] font-medium" style={{ color: "#7a6a5e" }}>Brasa {nextLoc.name}</p>
                <p className="text-[0.58rem]" style={{ color: "#c4b4a8" }}>{nextLoc.address}</p>
              </div>
              <ChevronRight size={15} style={{ color: "#c4b4a8" }} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start ${animClass}`}>

          {/* ── Ліва колонка ── */}
          <div>
            <div className="space-y-3 mb-8">
              {[
                { icon: Clock,           title: location.hours,       sub: "Столик утримується 15 хвилин" },
                { icon: Users,           title: "До 8 гостей онлайн", sub: "Більше — телефонуйте нам"      },
                { icon: UtensilsCrossed, title: "Кухня до 22:30",     sub: "Останнє замовлення о 22:30"    },
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

            {/* ── SVG Схема залу ── */}
            <div className="rounded-sm overflow-hidden" style={{ border: "1px solid #e8ddd4" }}>
              {/* Заголовок */}
              <div className="px-5 py-3 flex items-center justify-between"
                style={{ background: "#1a1208", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div>
                  <span className="text-[0.62rem] tracking-[0.2em] uppercase" style={{ color: "#c49a3c" }}>Схема залу</span>
                  <span className="text-[0.55rem] ml-2" style={{ color: "#a09080" }}>Brasa {location.name}</span>
                </div>
                <span className="text-[0.58rem]" style={{ color: canShowTables ? "#c4b4a8" : "#7a6a5a" }}>
                  {canShowTables ? `${form.date} · ${form.time}` : "Оберіть дату та час"}
                </span>
              </div>

              {/* Легенда */}
              <div className="px-5 py-2.5 flex items-center gap-5" style={{ background: "#fff", borderBottom: "1px solid #f0e8e0" }}>
                {[
                  { fill:"#e8f5ee", border:"#5a9a70", label:"Вільний" },
                  { fill:"#fde8e8", border:"#e09090", label:"Зайнятий" },
                  { fill:"#8b1a2e", border:"#8b1a2e", label:"Обраний" },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded-full" style={{ background: l.fill, border: `1.5px solid ${l.border}` }} />
                    <span className="text-[0.58rem] tracking-wider uppercase" style={{ color: "#a09080" }}>{l.label}</span>
                  </div>
                ))}
              </div>

              {/* SVG план */}
              <div style={{ background: "#ebe5dc" }}>
                <FloorPlan
                  location={location}
                  form={{ date: form.date, time: form.time, tableId: form.tableId }}
                  canShowTables={!!canShowTables}
                  onTableClick={(id) => setForm((f) => ({ ...f, tableId: id }))}
                />
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
          <form onSubmit={handleSubmit} className="space-y-5 p-8 rounded-sm"
            style={{ background: "#fff", border: "1px solid #e8ddd4", boxShadow: "0 4px 24px rgba(28,20,16,0.07)" }}>
            <div className="flex items-center justify-between mb-2">
              <p className="section-label">Деталі бронювання</p>
              <span className="text-[0.6rem] tracking-wider" style={{ color: "#c49a3c" }}>Brasa {location.name}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { key: "name",  label: "Ім'я",    type: "text", placeholder: "Ваше ім'я" },
                { key: "phone", label: "Телефон", type: "tel",  placeholder: "+38 (0__) ___-__-__" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="text-[0.65rem] uppercase tracking-wider block mb-1.5" style={{ color: "#a09080" }}>{f.label}</label>
                  <input type={f.type} required placeholder={f.placeholder}
                    value={(form as Record<string, string | number>)[f.key] as string}
                    onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                    className={inputClass} style={inputStyle} />
                </div>
              ))}
            </div>

            <div>
              <label className="text-[0.65rem] uppercase tracking-wider mb-1.5 flex items-center gap-1.5" style={{ color: "#a09080" }}>
                <Calendar size={11} /> Дата
              </label>
              <input type="date" required min={today} value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value, tableId: 0 }))}
                className={inputClass} style={{ ...inputStyle, colorScheme: "light" }} />
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
                      color:      form.time === t ? "#fff"     : "#7a6a5e",
                      border:     `1px solid ${form.time === t ? "#8b1a2e" : "#d4c4b8"}`,
                    }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

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
                  className="text-[0.6rem]" style={{ color: "#c4b4a8" }}>змінити</button>
              </div>
            )}

            <div>
              <label className="text-[0.65rem] uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: "#a09080" }}>
                <Users size={11} /> Кількість гостей
              </label>
              <div className="flex gap-2">
                {guestOptions.map((g) => (
                  <button key={g} type="button" onClick={() => setForm((f) => ({ ...f, guests: g }))}
                    className="flex-1 py-2 text-sm rounded-sm border transition-all"
                    style={{
                      background: form.guests === g ? "#8b1a2e" : "#fff",
                      color:      form.guests === g ? "#fff"     : "#7a6a5e",
                      border:     `1px solid ${form.guests === g ? "#8b1a2e" : "#d4c4b8"}`,
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
                value={form.comment} onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                className={`${inputClass} resize-none`} style={inputStyle} />
            </div>

            <button type="submit"
              disabled={loading || !form.time || !form.date || !form.tableId}
              className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed">
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

      <style>{`
        .loc-arrow:hover p { color: #1c1410 !important; }
        .loc-arrow:hover svg { color: #8b1a2e !important; }
        @keyframes slideInFromRight { from{opacity:0;transform:translateX(32px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideInFromLeft  { from{opacity:0;transform:translateX(-32px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideOutToLeft   { from{opacity:1;transform:translateX(0)} to{opacity:0;transform:translateX(-32px)} }
        @keyframes slideOutToRight  { from{opacity:1;transform:translateX(0)} to{opacity:0;transform:translateX(32px)} }
        .loc-enter-right { animation: slideInFromRight 0.25s ease forwards; }
        .loc-enter-left  { animation: slideInFromLeft  0.25s ease forwards; }
        .loc-exit-left   { animation: slideOutToLeft   0.2s  ease forwards; pointer-events:none; }
        .loc-exit-right  { animation: slideOutToRight  0.2s  ease forwards; pointer-events:none; }
      `}</style>
    </div>
  );
}
