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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-10"
      style={{
        backdropFilter: "blur(6px)",
        animation: closing ? "backdropOut 0.4s ease forwards" : "backdropIn 0.5s ease forwards",
      }}
      onClick={handleClose}
    >
      <div
        className="relative w-full sm:max-w-xl rounded-t-xl sm:rounded-sm overflow-hidden"
        style={{
          background: "#faf7f2",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.35), 0 24px 80px rgba(0,0,0,0.5)",
          animation: closing
            ? "modalOut 0.4s cubic-bezier(0.4,0,1,1) forwards"
            : "modalIn 0.45s cubic-bezier(0,0,0.2,1) forwards",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.4)", color: "#fff" }}
          aria-label="Закрити"
        >
          <X size={14} />
        </button>

        {/* Зображення */}
        <div className="flex items-center justify-center">
          {promo.image ? (
            <Image
              src={promo.image}
              alt={promo.title}
              width={1456}
              height={816}
              className="w-full h-auto block"
              style={{ maxHeight: "220px", objectFit: "cover" }}
              sizes="576px"
            />
          ) : (
            <div className="w-full flex items-center justify-center gap-4 py-10" style={{ background: color }}>
              <span style={{ fontSize: "3.5rem" }}>{promo.icon}</span>
              <span className="text-white text-xl uppercase tracking-widest font-bold">{promo.label}</span>
            </div>
          )}
        </div>

        {/* Контент */}
        <div className="p-5 sm:p-6">
          <span
            className="inline-block px-2.5 py-0.5 text-[0.55rem] tracking-widest uppercase font-medium rounded-[2px] mb-3"
            style={{ background: color, color: "#fff" }}
          >
            {promo.label}
          </span>
          <h2
            className="text-xl sm:text-2xl mb-2 leading-tight"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, color: "#1c1410" }}
          >
            {promo.subtitle}
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#5a4a3e" }}>
            {promo.description}
          </p>
          <div className="divider-warm mb-4" />
          <p className="text-xs leading-relaxed mb-5" style={{ color: "#a09080" }}>
            * Акція не комбінується з іншими знижками. Умови можуть змінюватись. Деталі:{" "}
            <span style={{ color: "#8b1a2e" }}>+38 (044) 123-45-67</span>.
          </p>

          {/* Кнопки — стовпчик на мобілі, ряд на десктопі */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
            <Link
              href={promo.href}
              onClick={handleClose}
              className="promo-btn-primary"
            >
              Замовити зі знижкою <ArrowRight size={13} />
            </Link>
            <button
              onClick={handleClose}
              className="promo-btn-secondary"
            >
              Закрити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Секція акцій ─── */
export default function PromoCards() {
  const [selected, setSelected] = useState<Promo | null>(null);

  return (
    <section style={{ background: "#faf7f2", borderTop: "1px solid #e8ddd4" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-12 sm:py-16">
        {/* Заголовок */}
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <h2
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, color: "#1c1410", lineHeight: 1.1 }}
          >
            Вигідні пропозиції
          </h2>
          <span className="text-sm hidden md:block" style={{ color: "#a09080" }}>
            {promos.length} акції
          </span>
        </div>

        {/* Список */}
        <div className="flex flex-col">
          {promos.map((promo, i) => {
            const color = cardColors[i % cardColors.length];
            return (
              <button
                key={promo.id}
                onClick={() => setSelected(promo)}
                className="promo-row group w-full text-left flex items-center gap-4 sm:gap-6 py-4 sm:py-5"
                style={{ borderBottom: "1px solid #e8ddd4" }}
              >
                {/* Мініатюра */}
                <div
                  className="promo-thumb flex-shrink-0 rounded-sm overflow-hidden"
                  style={{ width: "80px", height: "52px" }}
                >
                  {promo.image ? (
                    <Image
                      src={promo.image}
                      alt={promo.title}
                      width={240}
                      height={135}
                      className="w-full h-full object-cover"
                      sizes="80px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: color }}>
                      <span style={{ fontSize: "1.5rem" }}>{promo.icon}</span>
                    </div>
                  )}
                </div>

                {/* Текст */}
                <div className="flex-1 min-w-0">
                  <span
                    className="inline-block px-2 py-0.5 text-[0.52rem] tracking-widest uppercase font-medium rounded-[2px] mb-1"
                    style={{ background: color, color: "#fff" }}
                  >
                    {promo.label}
                  </span>
                  <h3
                    className="text-base sm:text-lg leading-tight sm:truncate"
                    style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400, color: "#1c1410" }}
                  >
                    {promo.subtitle}
                  </h3>
                  {/* Опис — тільки десктоп */}
                  <p className="text-xs leading-relaxed line-clamp-1 hidden sm:block mt-0.5" style={{ color: "#a09080" }}>
                    {promo.description}
                  </p>
                </div>

                {/* CTA — тільки десктоп */}
                <div className="flex-shrink-0 hidden sm:flex items-center gap-4">
                  <span className="promo-cta text-[0.65rem] tracking-wider uppercase font-medium" style={{ color }}>
                    Детальніше →
                  </span>
                </div>

                {/* Стрілка — тільки мобіль */}
                <div className="flex-shrink-0 sm:hidden" style={{ color: "rgba(0,0,0,0.25)" }}>
                  <ArrowRight size={16} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selected && <PromoModal promo={selected} onClose={() => setSelected(null)} />}

      <style>{`
        /* Hover — тільки на пристроях з мишкою */
        @media (hover: hover) and (pointer: fine) {
          .promo-row {
            transition: background 0.45s ease, padding-left 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          .promo-row:hover {
            background: rgba(139,26,46,0.03);
            padding-left: 10px;
          }
          .promo-row .promo-thumb {
            transition: transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.45s ease;
          }
          .promo-row:hover .promo-thumb {
            transform: scale(1.04);
            box-shadow: 0 4px 16px rgba(28,20,16,0.15);
          }
          .promo-row .promo-cta {
            transition: letter-spacing 0.45s ease, opacity 0.45s ease;
            opacity: 0.6;
          }
          .promo-row:hover .promo-cta {
            letter-spacing: 0.1em;
            opacity: 1;
          }
        }

        /* Активний стан для тач */
        @media (hover: none) {
          .promo-row:active {
            background: rgba(139,26,46,0.04);
          }
        }

        .promo-row:first-child {
          border-top: 1px solid #e8ddd4;
        }

        /* Кнопки модалки */
        .promo-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.8rem 1.5rem;
          background: linear-gradient(135deg, #6b1220 0%, #4e0d18 100%);
          color: #faf7f2;
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          border: 1px solid rgba(139,26,46,0.4);
          box-shadow: 0 4px 20px rgba(80,14,28,0.25);
          transition: all 0.25s ease;
          border-radius: 2px;
        }
        .promo-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.8rem 1.5rem;
          background: transparent;
          color: #7a6a5e;
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border: 1px solid #d4c4b8;
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 2px;
        }
        @media (hover: hover) and (pointer: fine) {
          .promo-btn-primary:hover {
            box-shadow: 0 6px 28px rgba(80,14,28,0.45);
            transform: translateY(-1px);
          }
          .promo-btn-secondary:hover {
            border-color: #a09080;
            color: #1c1410;
          }
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
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(30px); }
        }
      `}</style>
    </section>
  );
}
