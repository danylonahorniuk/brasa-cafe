"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Search, Plus, Flame, Check } from "lucide-react";
import { menuItems, menuCategories } from "@/data/menu";
import { useCart } from "@/context/CartContext";

/* ─── Рядок страви ─── */
function DishRow({ item }: { item: typeof menuItems[0] }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [size, setSize] = useState<"30" | "40">("30");

  const hasSize = item.category === "pizza" && item.sizes;
  const currentPrice = hasSize ? item.sizes![size] : item.price;
  const cartKey = hasSize ? `${item.id}-${size}` : `${item.id}`;
  const sizeLabel = hasSize ? `${size} см` : undefined;

  const handleAdd = () => {
    add(item, cartKey, sizeLabel, currentPrice);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div
      className="dish-row flex items-center gap-4 py-4"
      style={{ borderBottom: "1px solid #f0e8e0" }}
    >
      {/* Мініатюра */}
      <div className="relative flex-shrink-0 rounded-sm overflow-hidden" style={{ width: "88px", height: "88px", background: "#f5f0eb" }}>
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 dish-row-img"
          sizes="88px"
        />
        {/* Бейджі */}
        <div className="absolute top-1.5 left-1.5 flex flex-col gap-1 z-10">
          {item.badge && (
            <span className="px-1.5 py-0.5 text-[0.5rem] tracking-widest uppercase font-medium rounded-[2px] leading-none"
              style={{ background: "#8b1a2e", color: "#fff" }}>
              {item.badge}
            </span>
          )}
          {item.isNew && (
            <span className="px-1.5 py-0.5 text-[0.5rem] tracking-widest uppercase font-medium rounded-[2px] leading-none"
              style={{ background: "#c49a3c", color: "#fff" }}>
              Нове
            </span>
          )}
        </div>
      </div>

      {/* Назва + опис + вага */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3
            className="text-[1.05rem] leading-tight"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400, color: "#1c1410" }}
          >
            {item.name}
          </h3>
          {item.spicy && <Flame size={12} className="flex-shrink-0 text-orange-500" />}
        </div>
        <p className="text-[0.72rem] leading-relaxed line-clamp-2 mb-1" style={{ color: "#a09080" }}>
          {item.description}
        </p>
        <div className="flex items-center gap-3">
          {item.weight && (
            <span className="text-[0.62rem]" style={{ color: "#c4b4a8" }}>{item.weight}</span>
          )}
          {/* Розмір піци */}
          {hasSize && (
            <div className="flex gap-1">
              {(["30", "40"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className="px-2 py-0.5 text-[0.58rem] tracking-wide uppercase rounded-[2px] transition-all duration-200"
                  style={{
                    background: size === s ? "#1c1410" : "transparent",
                    color: size === s ? "#fff" : "#a09080",
                    border: `1px solid ${size === s ? "#1c1410" : "#d4c4b8"}`,
                  }}
                >
                  {s} см
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Ціна + кнопка */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="text-base font-medium" style={{ color: "#1c1410", minWidth: "64px", textAlign: "right" }}>
          {currentPrice} ₴
        </span>
        <button
          onClick={handleAdd}
          className="add-circle-btn w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            border: `1.5px solid ${added ? "#8b1a2e" : "#d4c4b8"}`,
            background: added ? "#8b1a2e" : "#fff",
            color: added ? "#fff" : "#8b1a2e",
          }}
        >
          {added ? <Check size={14} /> : <Plus size={14} />}
        </button>
      </div>
    </div>
  );
}

/* ─── Сторінка ─── */
export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState("pizza");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const grouped = menuCategories.map((cat) => ({
    ...cat,
    items: menuItems.filter(
      (item) =>
        item.category === cat.id &&
        item.name.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  // ScrollSpy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    Object.values(sectionRefs.current).forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [grouped.map((g) => g.id).join(",")]);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="pt-20" style={{ background: "#faf7f2" }}>
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h1 className="text-5xl md:text-6xl"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, lineHeight: 1.05, color: "#1c1410" }}>
            Наше меню
          </h1>
          <div className="relative w-full md:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#c4b4a8" }} />
            <input type="text" placeholder="Пошук..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-sm outline-none"
              style={{ background: "#fff", border: "1px solid #e8ddd4", color: "#1c1410" }} />
          </div>
        </div>
      </div>

      <div className="divider-warm mx-6" />

      {/* ── Основний layout ── */}
      <div className="max-w-7xl mx-auto px-6 pb-24 flex gap-8 items-start">

        {/* Ліва навігація */}
        <aside className="hidden md:flex flex-col flex-shrink-0 sticky"
          style={{ width: "200px", top: "88px", maxHeight: "calc(100vh - 96px)", overflowY: "auto" }}>
          <nav className="flex flex-col pt-8 pb-4">
            {menuCategories.map((cat) => {
              const isActive = activeId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToSection(cat.id)}
                  className="text-left px-4 py-3 rounded-sm text-[0.72rem] tracking-[0.1em] uppercase transition-all duration-300 font-medium"
                  style={{
                    color: isActive ? "#fff" : "#7a6a5e",
                    background: isActive ? "#8b1a2e" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "#1c1410";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "#7a6a5e";
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Секції меню */}
        <div className="flex-1 min-w-0">
          {grouped.length === 0 ? (
            <div className="text-center py-24" style={{ color: "#c4b4a8" }}>
              <p className="text-2xl mb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>Нічого не знайдено</p>
              <p className="text-sm">Спробуйте змінити запит</p>
            </div>
          ) : (
            grouped.map((cat, i) => (
              <section
                key={cat.id}
                id={cat.id}
                ref={(el) => { sectionRefs.current[cat.id] = el; }}
                className="pt-8"
              >
                {/* Заголовок секції */}
                <div className="flex items-baseline justify-between mb-2 pb-3"
                  style={{ borderBottom: "2px solid #1c1410" }}>
                  <h2 style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 300,
                    fontStyle: "italic",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    lineHeight: 1,
                    color: "#1c1410",
                  }}>
                    {cat.label}
                  </h2>
                  <span className="text-[0.62rem] tracking-widest uppercase" style={{ color: "#c4b4a8" }}>
                    {cat.items.length} {cat.items.length === 1 ? "страва" : cat.items.length < 5 ? "страви" : "страв"}
                  </span>
                </div>

                {/* Список страв */}
                <div>
                  {cat.items.map((item) => (
                    <DishRow key={item.id} item={item} />
                  ))}
                </div>

                {/* Роздільник між секціями */}
                {i < grouped.length - 1 && (
                  <div className="mt-4 mb-2 flex items-center gap-4">
                    <div className="flex-1 h-px" style={{ background: "#e8ddd4" }} />
                    <span style={{ color: "#d4c4b8", fontSize: "0.45rem", letterSpacing: "0.4em" }}>✦ ✦ ✦</span>
                    <div className="flex-1 h-px" style={{ background: "#e8ddd4" }} />
                  </div>
                )}
              </section>
            ))
          )}
        </div>
      </div>

      <style>{`
        .dish-row:last-child {
          border-bottom: none;
        }
        .dish-row:hover .dish-row-img {
          transform: scale(1.06);
        }
        .add-circle-btn:hover {
          background: #8b1a2e !important;
          border-color: #8b1a2e !important;
          color: #fff !important;
        }
      `}</style>
    </div>
  );
}
