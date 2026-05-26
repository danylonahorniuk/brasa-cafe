"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/menu";

export default function CategoryGrid() {
  const [pizza, ...rest] = categories;

  return (
    <section className="py-16" style={{ background: "#fff", borderTop: "1px solid #e8ddd4" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-8">
          <h2
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, color: "#1c1410", lineHeight: 1.1 }}
          >
            Що будемо їсти?
          </h2>
          <Link
            href="/menu"
            className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-sm text-[0.72rem] tracking-widest uppercase transition-all duration-300"
            style={{ border: "1.5px solid #8b1a2e", color: "#8b1a2e", background: "transparent" }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#8b1a2e"; el.style.color = "#fff"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "#8b1a2e"; }}
          >
            Все меню →
          </Link>
        </div>

        {/* Асиметрична сітка */}
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3 h-[420px]">

          {/* Велика ліва — Піца */}
          <Link
            href={`/menu?category=${pizza.id}`}
            className="relative col-span-2 row-span-2 rounded-sm overflow-hidden group"
          >
            <Image
              src={pizza.image}
              alt={pizza.label}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="50vw"
            />
            {/* Базовий градієнт */}
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(28,20,16,0.78) 0%, rgba(28,20,16,0.08) 55%, transparent 100%)" }} />
            {/* Додатковий при ховері */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(to top, rgba(12,8,6,0.45) 0%, transparent 55%)" }} />

            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-white/60 text-xs tracking-widest uppercase mb-1">{pizza.description}</p>
                <h3 className="text-white text-4xl md:text-5xl"
                  style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300 }}>
                  {pizza.label}
                </h3>
              </div>
              <span className="cat-glass-btn flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-sm text-[0.68rem] tracking-widest uppercase opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400">
                Обрати →
              </span>
            </div>
          </Link>

          {/* 3 малі справа */}
          {rest.map((cat) => (
            <Link
              key={cat.id}
              href={`/menu?category=${cat.id}`}
              className="relative rounded-sm overflow-hidden group"
            >
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="25vw"
              />
              {/* Базовий градієнт */}
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(28,20,16,0.72) 0%, rgba(28,20,16,0.05) 60%)" }} />
              {/* Додатковий при ховері */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(to top, rgba(12,8,6,0.4) 0%, transparent 55%)" }} />

              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between gap-2">
                <div>
                  <p className="text-white/55 text-[0.6rem] tracking-widest uppercase mb-0.5">{cat.description}</p>
                  <h3 className="text-white text-2xl"
                    style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300 }}>
                    {cat.label}
                  </h3>
                </div>
                <span className="cat-glass-btn flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-sm text-[0.6rem] tracking-widest uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                  Обрати →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/menu"
          className="mt-5 md:hidden w-full flex items-center justify-center gap-2 py-3 rounded-sm text-[0.72rem] tracking-widest uppercase transition-all duration-300"
          style={{ border: "1.5px solid #8b1a2e", color: "#8b1a2e", background: "transparent" }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#8b1a2e"; el.style.color = "#fff"; }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "#8b1a2e"; }}
        >
          Все меню →
        </Link>
      </div>

      <style>{`
        .cat-glass-btn {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.35);
          color: #fff;
          backdrop-filter: blur(6px);
        }
        .cat-glass-btn:hover {
          background: rgba(255,255,255,0.22);
          border-color: rgba(255,255,255,0.7);
        }
      `}</style>
    </section>
  );
}
