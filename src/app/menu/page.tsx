"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart, Flame, Minus, Plus, Search, Sparkles } from "lucide-react";
import { menuItems, menuCategories } from "@/data/menu";
import { useCart } from "@/context/CartContext";

const categoryLabel: Record<string, string> = {
  pizza: "Піца",
  rolls: "Роли",
  burgers: "Бургер",
  drinks: "Напій",
  alcohol: "Алкоголь",
};

/* ─── Картка ─── */
function DishCard({ item }: { item: typeof menuItems[0] }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState<"30" | "40">("30");

  const hasSize = item.category === "pizza" && item.sizes;
  const currentPrice = hasSize ? item.sizes![size] : item.price;
  const cartKey = hasSize ? `${item.id}-${size}` : `${item.id}`;
  const sizeLabel = hasSize ? `${size} см` : undefined;
  const displayWeight = hasSize && item.weight?.includes(" / ")
    ? item.weight.split(" / ")[size === "30" ? 0 : 1]
    : item.weight;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) add(item, cartKey, sizeLabel, currentPrice);
    setAdded(true);
    setTimeout(() => { setAdded(false); setQty(1); }, 1400);
  };

  return (
    <div
      className="dish-card group flex flex-col overflow-hidden"
      style={{ background: "#fff", border: "1px solid #ede4d8", borderRadius: "3px" }}
    >
      {/* Фото — займає більшу частину картки */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{ aspectRatio: "4/3", background: "#f5ede2" }}
      >
        <Image
          src={item.image} alt={item.name} fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: item.imagePosition ?? "center" }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Затемнення знизу для ваги */}
        <div
          className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(10,6,3,0.55) 0%, transparent 100%)" }}
        />

        {/* Бейджі — зверху ліво */}
        <div className="absolute top-3 left-3 flex gap-1.5 z-10">
          {item.badge && (
            <span
              className="px-2 py-0.5 text-[0.52rem] tracking-widest uppercase font-medium"
              style={{ background: "#8b1a2e", color: "#fff", borderRadius: "2px" }}
            >
              {item.badge}
            </span>
          )}
          {item.isNew && (
            <span
              className="px-2 py-0.5 text-[0.52rem] tracking-widest uppercase font-medium flex items-center gap-1"
              style={{ background: "#c49a3c", color: "#fff", borderRadius: "2px" }}
            >
              <Sparkles size={7} /> Нове
            </span>
          )}
          {item.spicy && (
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #ff8c42 0%, #e63312 100%)",
                boxShadow: "0 2px 8px rgba(230,80,18,0.5)",
              }}
            >
              <Flame size={9} color="#fff" />
            </span>
          )}
        </div>

        {/* Вага — знизу право, поверх градієнту */}
        {displayWeight && (
          <span
            className="absolute bottom-2.5 right-3 z-10 text-[0.6rem]"
            style={{ color: "rgba(255,255,255,0.85)", textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
          >
            {displayWeight}
          </span>
        )}
      </div>

      {/* Контент */}
      <div className="flex flex-col flex-1 p-5">
        {/* Категорія */}
        <p
          className="text-[0.54rem] tracking-[0.22em] uppercase mb-1.5"
          style={{ color: "#c4b4a0" }}
        >
          {categoryLabel[item.category]}
        </p>

        {/* Назва */}
        <h3
          className="leading-tight mb-2"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 400,
            fontSize: "1.45rem",
            color: "#1c1410",
          }}
        >
          {item.name}
        </h3>

        {/* Опис */}
        <p
          className="text-[0.71rem] leading-relaxed line-clamp-2 mb-auto"
          style={{ color: "#8a7a6e" }}
        >
          {item.description}
        </p>

        {/* Вибір розміру */}
        {hasSize && (
          <div className="flex gap-2 mt-4">
            {(["30", "40"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className="flex-1 py-1.5 text-[0.6rem] tracking-wider uppercase transition-all duration-200"
                style={{
                  borderRadius: "2px",
                  background: size === s ? "#1c1410" : "#f5f0ea",
                  color: size === s ? "#fff" : "#7a6a5e",
                  border: `1px solid ${size === s ? "#1c1410" : "#d8ccc0"}`,
                }}
              >
                {s} см
              </button>
            ))}
          </div>
        )}

        {/* Ціна + кількість + кнопка */}
        <div
          className="flex items-center gap-3 mt-4 pt-4"
          style={{ borderTop: "1px solid #f0e6dc" }}
        >
          <span
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "1.5rem",
              fontWeight: 400,
              color: "#c49a3c",
              lineHeight: 1,
            }}
          >
            {currentPrice} ₴
          </span>

          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-7 h-7 flex items-center justify-center transition-colors"
              style={{ border: "1px solid #d8ccc0", color: "#8a7a6e", background: "#f5f0ea", borderRadius: "2px" }}
            >
              <Minus size={10} />
            </button>
            <span className="w-7 text-center text-sm" style={{ color: "#1c1410" }}>{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-7 h-7 flex items-center justify-center transition-colors"
              style={{ border: "1px solid #d8ccc0", color: "#8a7a6e", background: "#f5f0ea", borderRadius: "2px" }}
            >
              <Plus size={10} />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="dish-add-btn flex items-center gap-1.5 px-3 py-1.5 text-[0.58rem] tracking-wider uppercase transition-all duration-300"
            style={{
              borderRadius: "2px",
              background: added ? "#8b1a2e" : "#f5f0ea",
              border: `1px solid ${added ? "#8b1a2e" : "#d8ccc0"}`,
              color: added ? "#fff" : "#7a6a5e",
            }}
          >
            {added ? <span style={{ fontSize: "0.65rem" }}>✓</span> : <ShoppingCart size={11} />}
            {added ? "Додано" : "В кошик"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Сторінка ─── */
export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState("pizza");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const navRef = useRef<HTMLDivElement>(null);

  const grouped = menuCategories.map((cat) => ({
    ...cat,
    items: menuItems.filter(
      (item) =>
        item.category === cat.id &&
        item.name.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    Object.values(sectionRefs.current).forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [grouped.map((g) => g.id).join(",")]);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    const navH = navRef.current?.offsetHeight ?? 0;
    const top = el.getBoundingClientRect().top + window.scrollY - navH - 80;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="pt-20" style={{ background: "#f7f2ec", minHeight: "100vh" }}>

      {/* ── Шапка ── */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-[0.55rem] tracking-[0.3em] uppercase mb-2" style={{ color: "#b8a898" }}>
              Ресторан Brasa · Київ
            </p>
            <h1
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 300,
                fontSize: "clamp(3rem, 6vw, 5rem)",
                lineHeight: 1,
                color: "#1c1410",
                letterSpacing: "0.02em",
              }}
            >
              Наше меню
            </h1>
          </div>
          <div className="relative w-full md:w-72">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#b8a898" }} />
            <input
              type="text" placeholder="Пошук страви..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm outline-none"
              style={{ background: "#fff", border: "1px solid #e0d4c8", color: "#1c1410", borderRadius: "2px" }}
            />
          </div>
        </div>
      </div>

      {/* ── Навігація ── */}
      <div
        ref={navRef}
        className="sticky z-30"
        style={{ top: "64px", background: "#f7f2ec", borderTop: "1px solid #e0d4c8", borderBottom: "1px solid #e0d4c8" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {menuCategories.map((cat) => {
              const isActive = activeId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToSection(cat.id)}
                  className="flex-shrink-0 px-6 py-4 relative transition-all duration-300 text-[0.68rem] tracking-[0.14em] uppercase whitespace-nowrap"
                  style={{ color: isActive ? "#1c1410" : "#a09080" }}
                >
                  {cat.label}
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300"
                    style={{
                      background: "#8b1a2e",
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "center",
                    }}
                  />
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ── Секції ── */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
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
              className="pt-16"
            >
              {/* Заголовок секції */}
              <div className="flex items-baseline gap-5 mb-8">
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 300,
                    fontStyle: "italic",
                    fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                    lineHeight: 1,
                    color: "#1c1410",
                  }}
                >
                  {cat.label}
                </h2>
                <div className="flex-1 h-px" style={{ background: "#e0d4c8", marginBottom: "6px" }} />
                <span className="text-[0.55rem] tracking-widest uppercase flex-shrink-0" style={{ color: "#c4b4a8" }}>
                  {cat.items.length} {cat.items.length === 1 ? "страва" : cat.items.length < 5 ? "страви" : "страв"}
                </span>
              </div>

              {/* Сітка карток — 3 колонки, широкі картки */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {cat.items.map((item) => (
                  <DishCard key={item.id} item={item} />
                ))}
              </div>

              {/* Роздільник */}
              {i < grouped.length - 1 && (
                <div className="mt-14 flex items-center gap-5">
                  <div className="flex-1 h-px" style={{ background: "#e0d4c8" }} />
                  <span style={{ color: "#d0c4b4", fontSize: "0.45rem", letterSpacing: "0.5em" }}>✦ ✦ ✦</span>
                  <div className="flex-1 h-px" style={{ background: "#e0d4c8" }} />
                </div>
              )}
            </section>
          ))
        )}
      </div>

      <style>{`
        .dish-card {
          transition: box-shadow 0.35s ease, transform 0.35s ease, border-color 0.35s ease;
        }
        .dish-card:hover {
          box-shadow: 0 12px 40px rgba(28, 20, 16, 0.12);
          transform: translateY(-3px);
          border-color: rgba(139, 26, 46, 0.2) !important;
        }
        .dish-add-btn:hover {
          background: #8b1a2e !important;
          border-color: #8b1a2e !important;
          color: #fff !important;
        }
      `}</style>
    </div>
  );
}
