import Link from "next/link";
import { promos } from "@/data/menu";

// Кольори для карток — чергуємо бордовий і золотий
const cardColors = ["#8b1a2e", "#c49a3c"];

export default function PromoCards() {
  return (
    <section style={{ background: "#faf7f2", borderTop: "1px solid #e8ddd4" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Заголовок */}
        <div className="mb-10">
          <p className="section-label mb-2">Акції</p>
          <h2
            className="text-4xl md:text-5xl"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 300,
              color: "#1c1410",
              lineHeight: 1.1,
            }}
          >
            Вигідні пропозиції
          </h2>
        </div>

        {/* 4 картки в ряд */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {promos.map((promo, i) => {
            const color = cardColors[i % cardColors.length];
            return (
              <Link
                key={promo.id}
                href={promo.href}
                className="promo-card group flex flex-col rounded-sm overflow-hidden"
                style={{
                  boxShadow: "0 2px 16px rgba(28,20,16,0.07)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
              >
                {/* ── Верх — кольоровий ── */}
                <div
                  className="flex flex-col items-center justify-end px-6 pt-8 pb-6 relative overflow-hidden"
                  style={{ background: color, minHeight: "220px" }}
                >
                  {/* Декоративне коло позаду іконки */}
                  <div
                    className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                  />

                  {/* Іконка */}
                  <span
                    className="relative z-10 select-none"
                    style={{ fontSize: "4.5rem", lineHeight: 1, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" }}
                    role="img"
                    aria-hidden="true"
                  >
                    {promo.icon}
                  </span>

                  {/* Label / deal value */}
                  <span
                    className="relative z-10 mt-2 px-3 py-0.5 text-[0.6rem] tracking-widest uppercase font-medium rounded-[2px]"
                    style={{ background: "rgba(0,0,0,0.2)", color: "rgba(255,255,255,0.9)" }}
                  >
                    {promo.label}
                  </span>

                  {/* Заголовок на кольоровому фоні */}
                  <h3
                    className="relative z-10 mt-3 text-center text-white leading-tight uppercase"
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      letterSpacing: "0.04em",
                      textShadow: "0 1px 4px rgba(0,0,0,0.25)",
                    }}
                  >
                    {promo.title}
                  </h3>
                </div>

                {/* ── Низ — білий ── */}
                <div
                  className="flex flex-col flex-1 p-5"
                  style={{ background: "#ffffff", borderTop: `3px solid ${color}` }}
                >
                  <p
                    className="font-semibold text-sm mb-2 leading-snug"
                    style={{ color: "#1c1410" }}
                  >
                    {promo.subtitle}
                  </p>
                  <p className="text-xs leading-relaxed flex-1" style={{ color: "#a09080" }}>
                    {promo.description}
                  </p>
                  <span
                    className="mt-4 text-[0.65rem] tracking-wider uppercase font-medium"
                    style={{ color }}
                  >
                    Детальніше →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        .promo-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(28,20,16,0.13) !important;
        }
      `}</style>
    </section>
  );
}
