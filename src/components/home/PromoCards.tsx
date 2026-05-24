"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import { promos } from "@/data/menu";

type Promo = typeof promos[0];

const cardColors = ["#8b1a2e", "#c49a3c"];

/* ─── Модальне вікно ─── */
function PromoModal({ promo, onClose }: { promo: Promo; onClose: () => void }) {
  const color = cardColors[promos.indexOf(promo) % cardColors.length];
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 400);
  };

  // Закриття по Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-10"
      style={{
        backdropFilter: "blur(6px)",
        animation: closing ? "backdropOut 0.4s ease forwards" : "backdropIn 0.5s ease forwards",
      }}
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-xl rounded-sm overflow-hidden"
        style={{
          background: "#faf7f2",
          boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
          animation: closing ? "modalOut 0.4s cubic-bezier(0.4,0,1,1) forwards" : "modalIn 0.55s cubic-bezier(0,0,0.2,1) forwards",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.45)", color: "#fff" }}
        >
          <X size={13} />
        </button>

        <div className="flex items-center justify-center">
          {promo.image ? (
            <Image src={promo.image} alt={promo.title} width={1456} height={816} className="w-full h-auto block" sizes="576px" />
          ) : (
            <div className="w-full flex items-center justify-center gap-4 py-10" style={{ background: color }}>
              <span style={{ fontSize: "3.5rem" }}>{promo.icon}</span>
              <span className="text-white text-xl uppercase tracking-widest font-bold">{promo.label}</span>
            </div>
          )}
        </div>

        <div className="p-6">
          <span className="inline-block px-2.5 py-0.5 text-[0.58rem] tracking-widest uppercase font-medium rounded-[2px] mb-3" style={{ background: color, color: "#fff" }}>
            {promo.label}
          </span>
          <h2 className="text-2xl mb-2 leading-tight" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, color: "#1c1410" }}>
            {promo.subtitle}
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#5a4a3e" }}>{promo.description}</p>
          <div className="divider-warm mb-4" />
          <p className="text-xs leading-relaxed mb-5" style={{ color: "#a09080" }}>
            * Акція не комбінується з іншими знижками. Умови можуть змінюватись. Деталі:{" "}
            <span style={{ color: "#8b1a2e" }}>+38 (044) 123-45-67</span>.
          </p>
          <div className="flex gap-3">
            <Link href={promo.href} onClick={handleClose} className="btn-primary flex items-center gap-2">
              Замовити зі знижкою <ArrowRight size={13} />
            </Link>
            <button onClick={handleClose} className="px-4 py-2.5 rounded-sm text-[0.68rem] tracking-widest uppercase" style={{ border: "1px solid #d4c4b8", color: "#7a6a5e" }}>
              Закрити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Секція акцій — список ─── */
export default function PromoCards() {
  const [selected, setSelected] = useState<Promo | null>(null);

  return (
    <section style={{ background: "#faf7f2", borderTop: "1px solid #e8ddd4" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Заголовок */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-label mb-2">Акції</p>
            <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, color: "#1c1410", lineHeight: 1.1 }}>
              Вигідні пропозиції
            </h2>
          </div>
          <span className="text-sm hidden md:block" style={{ color: "#a09080" }}>{promos.length} акції</span>
        </div>

        {/* Список акцій */}
        <div className="flex flex-col">
          {promos.map((promo, i) => {
            const color = cardColors[i % cardColors.length];
            return (
              <button
                key={promo.id}
                onClick={() => setSelected(promo)}
                className="promo-row group w-full text-left flex items-center gap-6 py-5 transition-all duration-200"
                style={{ borderBottom: "1px solid #e8ddd4" }}
              >
                {/* Мініатюра */}
                <div className="flex-shrink-0 rounded-sm overflow-hidden" style={{ width: "120px", height: "68px", background: "#0d0806" }}>
                  {promo.image ? (
                    <Image src={promo.image} alt={promo.title} width={240} height={135} className="w-full h-full object-cover" sizes="120px" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: color }}>
                      <span style={{ fontSize: "1.8rem" }}>{promo.icon}</span>
                    </div>
                  )}
                </div>

                {/* Контент */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 text-[0.55rem] tracking-widest uppercase font-medium rounded-[2px]" style={{ background: color, color: "#fff" }}>
                      {promo.label}
                    </span>
                  </div>
                  <h3 className="text-lg leading-tight mb-1 truncate" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400, color: "#1c1410" }}>
                    {promo.subtitle}
                  </h3>
                  <p className="text-xs leading-relaxed line-clamp-1" style={{ color: "#a09080" }}>{promo.description}</p>
                </div>

                {/* Права частина — CTA */}
                <div className="flex-shrink-0 flex items-center gap-4">
                  <span
                    className="text-[0.65rem] tracking-wider uppercase font-medium transition-all duration-200"
                    style={{ color }}
                  >
                    Детальніше →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selected && <PromoModal promo={selected} onClose={() => setSelected(null)} />}

      <style>{`
        .promo-row:hover {
          background: rgba(139,26,46,0.03);
          padding-left: 8px;
        }
        .promo-row:first-child {
          border-top: 1px solid #e8ddd4;
        }
        @keyframes backdropIn {
          from { background: rgba(28,20,16,0); }
          to   { background: rgba(28,20,16,0.7); }
        }
        @keyframes backdropOut {
          from { background: rgba(28,20,16,0.7); }
          to   { background: rgba(28,20,16,0); }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96) translateY(24px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes modalOut {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to   { opacity: 0; transform: scale(0.96) translateY(12px); }
        }
      `}</style>
    </section>
  );
}
