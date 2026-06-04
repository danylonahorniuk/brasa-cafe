"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/menu";
import { useLang } from "@/context/LangContext";

export default function CategoryGrid() {
  const { t } = useLang();
  const [pizza, rolls, burgers, alcohol] = categories;

  return (
    <section className="py-12 sm:py-16" style={{ background: "#fff", borderTop: "1px solid #e8ddd4" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* Заголовок */}
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <h2
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, color: "#1c1410", lineHeight: 1.1 }}
          >
            {t("categories.title")}
          </h2>
          <Link
            href="/menu"
            className="hidden lg:inline-flex items-center gap-2 px-6 py-3 rounded-sm text-[0.72rem] tracking-widest uppercase cat-menu-btn transition-all duration-300"
            style={{ border: "1.5px solid #8b1a2e", color: "#8b1a2e", background: "transparent" }}
          >
            {t("categories.allMenu")}
          </Link>
        </div>

        {/* ── Десктопна сітка (lg+) ── */}
        <div className="hidden lg:grid grid-cols-4 grid-rows-2 gap-3 h-[420px]">

          {/* Піца — велика ліва */}
          <Link
            href={`/menu?category=${pizza.id}`}
            className="relative col-span-2 row-span-2 rounded-sm overflow-hidden group"
          >
            <Image src={pizza.image} alt={pizza.label} fill
              className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="50vw" />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(28,20,16,0.78) 0%, rgba(28,20,16,0.08) 55%, transparent 100%)" }} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(to top, rgba(12,8,6,0.45) 0%, transparent 55%)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-white/60 text-xs tracking-widest uppercase mb-1">{pizza.description}</p>
                <h3 className="text-white text-4xl md:text-5xl"
                  style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300 }}>{pizza.label}</h3>
              </div>
              <span className="cat-glass-btn flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-sm text-[0.68rem] tracking-widest uppercase opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400">
                {t("categories.choose")}
              </span>
            </div>
          </Link>

          {/* Роли */}
          <Link href={`/menu?category=${rolls.id}`} className="relative rounded-sm overflow-hidden group">
            <Image src={rolls.image} alt={rolls.label} fill
              className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="25vw" />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(28,20,16,0.72) 0%, rgba(28,20,16,0.05) 60%)" }} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(to top, rgba(12,8,6,0.4) 0%, transparent 55%)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between gap-2">
              <div>
                <p className="text-white/55 text-[0.6rem] tracking-widest uppercase mb-0.5">{rolls.description}</p>
                <h3 className="text-white text-2xl" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300 }}>{rolls.label}</h3>
              </div>
              <span className="cat-glass-btn flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-sm text-[0.6rem] tracking-widest uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                {t("categories.choose")}
              </span>
            </div>
          </Link>

          {/* Бургери */}
          <Link href={`/menu?category=${burgers.id}`} className="relative rounded-sm overflow-hidden group">
            <Image src={burgers.image} alt={burgers.label} fill
              className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="25vw" />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(28,20,16,0.72) 0%, rgba(28,20,16,0.05) 60%)" }} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(to top, rgba(12,8,6,0.4) 0%, transparent 55%)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between gap-2">
              <div>
                <p className="text-white/55 text-[0.6rem] tracking-widest uppercase mb-0.5">{burgers.description}</p>
                <h3 className="text-white text-2xl" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300 }}>{burgers.label}</h3>
              </div>
              <span className="cat-glass-btn flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-sm text-[0.6rem] tracking-widest uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                {t("categories.choose")}
              </span>
            </div>
          </Link>

          {/* Алкоголь — нижній правий, 2 колонки */}
          <Link href={`/menu?category=${alcohol.id}`} className="relative col-span-2 rounded-sm overflow-hidden group">
            <Image src={alcohol.image} alt={alcohol.label} fill
              className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="50vw" />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(28,20,16,0.72) 0%, rgba(28,20,16,0.05) 60%)" }} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(to top, rgba(12,8,6,0.4) 0%, transparent 55%)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between gap-2">
              <div>
                <p className="text-white/55 text-[0.6rem] tracking-widest uppercase mb-0.5">{alcohol.description}</p>
                <h3 className="text-white text-2xl" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300 }}>{alcohol.label}</h3>
              </div>
              <span className="cat-glass-btn flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-sm text-[0.6rem] tracking-widest uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                {t("categories.choose")}
              </span>
            </div>
          </Link>
        </div>

        {/* ── Мобільна/планшетна сітка (< lg) ── */}
        <div className="flex flex-col gap-3 lg:hidden">

          {/* Піца — повна ширина, широкий формат */}
          <Link
            href={`/menu?category=${pizza.id}`}
            className="relative rounded-sm overflow-hidden group"
            style={{ aspectRatio: "16/7" }}
          >
            <Image src={pizza.image} alt={pizza.label} fill
              className="object-cover" sizes="100vw" />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(28,20,16,0.82) 0%, rgba(28,20,16,0.1) 60%, transparent 100%)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-white/55 text-[0.58rem] tracking-widest uppercase mb-1">{pizza.description}</p>
              <h3 className="text-white text-4xl"
                style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300 }}>{pizza.label}</h3>
            </div>
          </Link>

          {/* Роли + Бургери — 2 колонки */}
          <div className="grid grid-cols-2 gap-3">
            {[rolls, burgers].map((cat) => (
              <Link
                key={cat.id}
                href={`/menu?category=${cat.id}`}
                className="relative rounded-sm overflow-hidden group"
                style={{ aspectRatio: "3/4" }}
              >
                <Image src={cat.image} alt={cat.label} fill
                  className="object-cover" sizes="50vw" />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(28,20,16,0.78) 0%, rgba(28,20,16,0.05) 60%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-2xl"
                    style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300 }}>{cat.label}</h3>
                  <p className="text-white/50 text-[0.58rem] tracking-wider uppercase mt-0.5">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Алкоголь — повна ширина */}
          <Link
            href={`/menu?category=${alcohol.id}`}
            className="relative rounded-sm overflow-hidden group"
            style={{ aspectRatio: "16/7" }}
          >
            <Image src={alcohol.image} alt={alcohol.label} fill
              className="object-cover" sizes="100vw" />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(28,20,16,0.82) 0%, rgba(28,20,16,0.1) 60%, transparent 100%)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-white/55 text-[0.58rem] tracking-widest uppercase mb-1">{alcohol.description}</p>
              <h3 className="text-white text-3xl"
                style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300 }}>{alcohol.label}</h3>
            </div>
          </Link>
        </div>

        {/* Кнопка "Все меню" — мобіль */}
        <Link
          href="/menu"
          className="mt-4 lg:hidden w-full flex items-center justify-center gap-2 py-3.5 rounded-sm text-[0.72rem] tracking-widest uppercase transition-all duration-300"
          style={{ border: "1.5px solid #8b1a2e", color: "#8b1a2e" }}
        >
          {t("categories.allMenu")}
        </Link>
      </div>

      <style>{`
        .cat-glass-btn {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.35);
          color: #fff;
          backdrop-filter: blur(6px);
        }
        @media (hover: hover) and (pointer: fine) {
          .cat-glass-btn:hover {
            background: rgba(255,255,255,0.22);
            border-color: rgba(255,255,255,0.7);
          }
          .cat-menu-btn:hover {
            background: #8b1a2e !important;
            color: #fff !important;
          }
        }
      `}</style>
    </section>
  );
}
