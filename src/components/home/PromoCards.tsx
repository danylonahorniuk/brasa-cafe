import Link from "next/link";
import { promos } from "@/data/menu";

export default function PromoCards() {
  return (
    <section style={{ background: "#faf7f2", borderTop: "1px solid #e8ddd4" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Заголовок */}
        <div className="flex items-end justify-between mb-8">
          <div>
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
        </div>

        {/* 2×2 сітка горизонтальних карток */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {promos.map((promo) => (
            <Link
              key={promo.id}
              href={promo.href}
              className="promo-deal-card group flex overflow-hidden rounded-sm"
              style={{
                background: "#1c1410",
                border: "1px solid rgba(255,255,255,0.05)",
                minHeight: "148px",
                transition: "border-color 0.3s",
              }}
            >
              {/* Ліва панель — велика цифра/умова акції */}
              <div
                className="flex flex-col items-center justify-center px-7 flex-shrink-0 w-36 relative overflow-hidden"
                style={{
                  borderRight: "1px solid rgba(196,154,60,0.18)",
                  background: "rgba(196,154,60,0.06)",
                }}
              >
                {/* Декоративне коло */}
                <div
                  className="absolute w-24 h-24 rounded-full"
                  style={{ background: "rgba(196,154,60,0.06)" }}
                />
                <span
                  className="relative z-10 leading-none text-center"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 300,
                    fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                    color: "#c49a3c",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {promo.value}
                </span>
                <span
                  className="relative z-10 text-[0.58rem] tracking-widest uppercase mt-1 text-center"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {promo.valueLabel}
                </span>
              </div>

              {/* Права панель — контент */}
              <div className="flex flex-col justify-between p-6 flex-1">
                <div>
                  {/* Бейдж */}
                  <span
                    className="inline-block px-2 py-0.5 text-[0.58rem] tracking-widest uppercase font-medium rounded-[2px] mb-3"
                    style={{ background: "rgba(139,26,46,0.8)", color: "#fff" }}
                  >
                    {promo.badge}
                  </span>

                  {/* Заголовок */}
                  <h3
                    className="text-white leading-snug mb-2"
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontWeight: 300,
                      fontSize: "1.35rem",
                    }}
                  >
                    {promo.title}
                  </h3>

                  {/* Опис */}
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {promo.description}
                  </p>
                </div>

                {/* CTA */}
                <span
                  className="promo-cta mt-4 text-[0.65rem] tracking-wider uppercase font-medium inline-flex items-center gap-1"
                  style={{ color: "#c49a3c" }}
                >
                  Замовити →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .promo-deal-card:hover {
          border-color: rgba(196,154,60,0.25) !important;
        }
        .promo-deal-card .promo-cta {
          opacity: 0.6;
          transition: opacity 0.25s, gap 0.25s;
        }
        .promo-deal-card:hover .promo-cta {
          opacity: 1;
          letter-spacing: 0.12em;
        }
      `}</style>
    </section>
  );
}
