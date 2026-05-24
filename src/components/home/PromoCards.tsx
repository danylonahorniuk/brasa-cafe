"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import { promos } from "@/data/menu";

type Promo = typeof promos[0];

const cardColors = ["#8b1a2e", "#c49a3c"];

/* ─── Модальне вікно ─── */
function PromoModal({ promo, onClose }: { promo: Promo; onClose: () => void }) {
  const color = cardColors[promos.indexOf(promo) % cardColors.length];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-10"
      style={{ background: "rgba(28,20,16,0.7)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-sm overflow-hidden"
        style={{ background: "#faf7f2", boxShadow: "0 24px 80px rgba(0,0,0,0.4)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закриття */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.5)", color: "#fff" }}
        >
          <X size={15} />
        </button>

        {/* Зображення — фіксована висота, object-top щоб верх не обрізався */}
        <div className="relative w-full overflow-hidden" style={{ height: "260px", background: "#0d0806" }}>
          {promo.image ? (
            <Image
              src={promo.image}
              alt={promo.title}
              fill
              className="object-cover object-top"
              sizes="672px"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ background: color }}>
              <span style={{ fontSize: "5rem" }}>{promo.icon}</span>
              <span className="text-white text-2xl uppercase tracking-widest font-bold">{promo.label}</span>
            </div>
          )}
        </div>

        {/* Контент */}
        <div className="p-7">
          <span
            className="inline-block px-3 py-1 text-[0.6rem] tracking-widest uppercase font-medium rounded-[2px] mb-3"
            style={{ background: color, color: "#fff" }}
          >
            {promo.label}
          </span>

          <h2
            className="text-2xl md:text-3xl mb-2 leading-tight"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, color: "#1c1410" }}
          >
            {promo.subtitle}
          </h2>

          <p className="text-sm leading-relaxed mb-4" style={{ color: "#7a6a5e" }}>
            {promo.description}
          </p>

          <p className="text-xs leading-relaxed mb-6" style={{ color: "#b0a090" }}>
            * Не комбінується з іншими акціями. Деталі:{" "}
            <span style={{ color: "#8b1a2e" }}>+38 (044) 123-45-67</span>.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href={promo.href} onClick={onClose} className="btn-primary flex items-center gap-2">
              Замовити зі знижкою <ArrowRight size={14} />
            </Link>
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-sm text-[0.72rem] tracking-widest uppercase"
              style={{ border: "1px solid #d4c4b8", color: "#7a6a5e" }}
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
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="section-label mb-2">Акції</p>
          <h2
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, color: "#1c1410", lineHeight: 1.1 }}
          >
            Вигідні пропозиції
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {promos.map((promo, i) => {
            const color = cardColors[i % cardColors.length];
            return (
              <button
                key={promo.id}
                onClick={() => setSelected(promo)}
                className="promo-card group flex flex-col rounded-sm overflow-hidden text-left w-full"
                style={{ boxShadow: "0 2px 16px rgba(28,20,16,0.07)", transition: "transform 0.3s, box-shadow 0.3s" }}
              >
                {/* Верх */}
                <div
                  className="relative overflow-hidden"
                  style={{ minHeight: promo.image ? "0" : "220px", aspectRatio: promo.image ? "16/9" : "auto", background: promo.image ? "#0d0806" : color }}
                >
                  {promo.image ? (
                    <Image
                      src={promo.image}
                      alt={promo.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-end px-6 pt-8 pb-6">
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
                      <span className="relative z-10 select-none" style={{ fontSize: "4.5rem", lineHeight: 1 }}>{promo.icon}</span>
                      <span className="relative z-10 mt-2 px-3 py-0.5 text-[0.6rem] tracking-widest uppercase font-medium rounded-[2px]" style={{ background: "rgba(0,0,0,0.2)", color: "rgba(255,255,255,0.9)" }}>{promo.label}</span>
                      <h3 className="relative z-10 mt-3 text-center text-white leading-tight uppercase" style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.04em" }}>{promo.title}</h3>
                    </div>
                  )}
                </div>

                {/* Низ */}
                <div className="flex flex-col flex-1 p-5" style={{ background: "#ffffff", borderTop: `3px solid ${color}` }}>
                  <p className="font-semibold text-sm mb-2 leading-snug" style={{ color: "#1c1410" }}>{promo.subtitle}</p>
                  <p className="text-xs leading-relaxed flex-1" style={{ color: "#a09080" }}>{promo.description}</p>
                  <span className="mt-4 text-[0.65rem] tracking-wider uppercase font-medium" style={{ color }}>
                    Детальніше →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Модаль */}
      {selected && <PromoModal promo={selected} onClose={() => setSelected(null)} />}

      <style>{`
        .promo-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(28,20,16,0.13) !important;
        }
      `}</style>
    </section>
  );
}
