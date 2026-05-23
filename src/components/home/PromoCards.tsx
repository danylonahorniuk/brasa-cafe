import Image from "next/image";
import Link from "next/link";
import { promos } from "@/data/menu";

export default function PromoCards() {
  const [a, b, c, d] = promos;

  return (
    <section style={{ background: "#faf7f2" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Заголовок */}
        <div className="flex items-end justify-between mb-8">
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

        {/*
          Асиметрична сітка 3 колонки × 2 рядки:
          [  Card A — col 1-2  ] [ Card B — col 3 ]
          [ Card C — col 1    ] [  Card D — col 2-3  ]
        */}
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "280px 280px",
          }}
        >
          {/* A — велика ліворуч */}
          <PromoCard item={a} style={{ gridColumn: "1 / 3", gridRow: "1 / 2" }} />

          {/* B — мала праворуч верх */}
          <PromoCard item={b} style={{ gridColumn: "3 / 4", gridRow: "1 / 2" }} />

          {/* C — мала ліворуч низ */}
          <PromoCard item={c} style={{ gridColumn: "1 / 2", gridRow: "2 / 3" }} />

          {/* D — велика праворуч низ */}
          <PromoCard item={d} style={{ gridColumn: "2 / 4", gridRow: "2 / 3" }} />
        </div>
      </div>

      <style>{`
        .promo-card-overlay {
          background: linear-gradient(to top, rgba(12,8,6,0.82) 0%, rgba(12,8,6,0.28) 55%, rgba(12,8,6,0.08) 100%);
          transition: background 0.4s;
        }
        .promo-card:hover .promo-card-overlay {
          background: linear-gradient(to top, rgba(12,8,6,0.9) 0%, rgba(12,8,6,0.45) 60%, rgba(12,8,6,0.15) 100%);
        }
        .promo-card img {
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .promo-card:hover img {
          transform: scale(1.06);
        }
        .promo-card-cta {
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s, transform 0.3s;
        }
        .promo-card:hover .promo-card-cta {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}

function PromoCard({
  item,
  style,
}: {
  item: typeof promos[0];
  style?: React.CSSProperties;
}) {
  return (
    <Link
      href={item.href}
      className="promo-card relative rounded-sm overflow-hidden block"
      style={style}
    >
      {/* Фото */}
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Оверлей */}
      <div className="promo-card-overlay absolute inset-0" />

      {/* Бейдж */}
      <div className="absolute top-4 left-4">
        <span
          className="px-2.5 py-1 text-[0.6rem] tracking-widest uppercase font-medium rounded-[2px]"
          style={{ background: "#c49a3c", color: "#fff" }}
        >
          {item.badge}
        </span>
      </div>

      {/* Контент знизу */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3
          className="text-white leading-tight mb-1.5"
          style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)" }}
        >
          {item.title}
        </h3>
        <p className="text-[0.72rem] leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>
          {item.description}
        </p>
        <span
          className="promo-card-cta inline-flex items-center gap-1.5 text-[0.68rem] tracking-wider uppercase font-medium"
          style={{ color: "#c49a3c" }}
        >
          Дізнатись більше →
        </span>
      </div>
    </Link>
  );
}
