import Link from "next/link";
import { promos } from "@/data/menu";

export default function PromoCards() {
  return (
    <section style={{ background: "#fff", borderTop: "1px solid #e8ddd4", borderBottom: "1px solid #e8ddd4" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-label mb-2">Акції</p>
            <h2
              className="text-4xl md:text-5xl"
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, color: "#1c1410", lineHeight: 1.1 }}
            >
              Вигідні пропозиції
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {promos.map((promo) => (
            <div
              key={promo.id}
              className="group relative rounded-sm overflow-hidden flex flex-col"
              style={{ border: "1px solid #e8ddd4", background: "#faf7f2" }}
            >
              {/* Ілюстрація-зона */}
              <div
                className="flex items-center justify-center py-8 text-6xl relative overflow-hidden"
                style={{ background: "#f5f0e8", borderBottom: "1px solid #e8ddd4", minHeight: "140px" }}
              >
                {/* Декоративне коло */}
                <div
                  className="absolute w-28 h-28 rounded-full opacity-10"
                  style={{ background: promo.color }}
                />
                <span className="relative z-10 text-5xl select-none">{promo.icon}</span>
              </div>

              {/* Контент */}
              <div className="p-5 flex flex-col flex-1">
                {/* Badge */}
                <span
                  className="inline-block self-start px-2 py-0.5 text-[0.6rem] tracking-widest uppercase font-medium rounded-[2px] mb-3"
                  style={{ background: promo.color, color: "#fff" }}
                >
                  {promo.badge}
                </span>

                <h3
                  className="text-lg mb-2 leading-snug"
                  style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500, color: "#1c1410" }}
                >
                  {promo.title}
                </h3>

                <p className="text-xs leading-relaxed flex-1" style={{ color: "#a09080" }}>
                  {promo.description}
                </p>

                <Link
                  href="/menu"
                  className="mt-4 text-[0.68rem] tracking-wider uppercase font-medium transition-colors flex items-center gap-1"
                  style={{ color: promo.color }}
                >
                  Замовити →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
