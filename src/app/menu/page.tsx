"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart, Flame, Search, Sparkles, Plus, Minus } from "lucide-react";
import { menuItems, menuCategories } from "@/data/menu";
import { useCart } from "@/context/CartContext";

const categoryLabel: Record<string, string> = {
  pizza: "Піца", rolls: "Роли", burgers: "Бургер", drinks: "Напій", alcohol: "Алкоголь",
};

/* ─── Один рядок страви: фото + текст, що чергуються ─── */
function DishRow({ item, index }: { item: typeof menuItems[0]; index: number }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState<"30" | "40">("30");

  const reversed = index % 2 === 1;
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
    setTimeout(() => { setAdded(false); setQty(1); }, 1300);
  };

  return (
    <div
      className="dish-row flex flex-col md:flex-row items-center gap-8 md:gap-12 py-10"
      style={{
        borderBottom: "1px solid #ede4d8",
        flexDirection: reversed ? "row-reverse" : "row",
      }}
    >
      {/* ── Кругова фотографія ── */}
      <div className="flex-shrink-0">
        <div
          className="dish-circle relative overflow-hidden"
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: "3px solid #e8ddd4",
            boxShadow: "0 8px 32px rgba(28,20,16,0.12)",
            background: "#f5ede2",
          }}
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-700"
            style={{ objectPosition: item.imagePosition ?? "center" }}
            sizes="200px"
          />
        </div>
      </div>

      {/* ── Текстовий блок ── */}
      <div className="flex-1 min-w-0 w-full">
        {/* Бейджі */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span
            className="text-[0.52rem] tracking-[0.22em] uppercase"
            style={{ color: "#c4b4a0" }}
          >
            {categoryLabel[item.category]}
          </span>
          {item.badge && (
            <span
              className="px-2 py-0.5 text-[0.48rem] tracking-widest uppercase rounded-[2px]"
              style={{ background: "#8b1a2e", color: "#fff" }}
            >
              {item.badge}
            </span>
          )}
          {item.isNew && (
            <span
              className="px-2 py-0.5 text-[0.48rem] tracking-widest uppercase rounded-[2px] flex items-center gap-1"
              style={{ background: "rgba(196,154,60,0.12)", color: "#c49a3c", border: "1px solid rgba(196,154,60,0.3)" }}
            >
              <Sparkles size={6} /> Нове
            </span>
          )}
          {item.spicy && (
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#ff8c42,#e63312)", boxShadow: "0 1px 6px rgba(230,80,18,0.4)" }}
            >
              <Flame size={7} color="#fff" />
            </span>
          )}
        </div>

        {/* Назва */}
        <h3
          className="mb-2 leading-tight"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 400,
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            color: "#1c1410",
          }}
        >
          {item.name}
        </h3>

        {/* Опис */}
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: "#8a7a6e" }}
        >
          {item.description}
        </p>

        {/* Вага (без піци — для неї в розмірах) */}
        {!hasSize && displayWeight && (
          <p className="text-[0.62rem] tracking-wider mb-4" style={{ color: "#c4b4a0" }}>
            {displayWeight}
          </p>
        )}

        {/* Вибір розміру для піци */}
        {hasSize && (
          <div className="flex gap-2 mb-4">
            {(["30", "40"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className="px-3 py-1.5 text-[0.6rem] tracking-wider uppercase transition-all duration-200 rounded-[2px]"
                style={{
                  background: size === s ? "#1c1410" : "#f5f0ea",
                  color: size === s ? "#fff" : "#7a6a5e",
                  border: `1px solid ${size === s ? "#1c1410" : "#d8ccc0"}`,
                }}
              >
                {s} см · {s === "30" ? item.weight?.split(" / ")[0] : item.weight?.split(" / ")[1]}
              </button>
            ))}
          </div>
        )}

        {/* Ціна + кількість + кнопка */}
        <div className="flex items-center gap-4 flex-wrap">
          <span
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "1.8rem",
              fontWeight: 400,
              color: "#c49a3c",
              lineHeight: 1,
            }}
          >
            {currentPrice} ₴
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setQty(q => Math.max(1, q - 1))}
              className="w-7 h-7 flex items-center justify-center transition-colors rounded-[2px]"
              style={{ border: "1px solid #d8ccc0", color: "#8a7a6e", background: "#f5f0ea" }}
            >
              <Minus size={10} />
            </button>
            <span className="w-6 text-center text-sm" style={{ color: "#1c1410" }}>{qty}</span>
            <button
              onClick={() => setQty(q => q + 1)}
              className="w-7 h-7 flex items-center justify-center transition-colors rounded-[2px]"
              style={{ border: "1px solid #d8ccc0", color: "#8a7a6e", background: "#f5f0ea" }}
            >
              <Plus size={10} />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="dish-add-btn flex items-center gap-2 px-5 py-2 text-[0.6rem] tracking-widest uppercase transition-all duration-300 rounded-[2px]"
            style={{
              background: added ? "#8b1a2e" : "#1c1410",
              color: "#fff",
              border: `1px solid ${added ? "#8b1a2e" : "#1c1410"}`,
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
    <div className="pt-20" style={{ background: "#faf7f2", minHeight: "100vh" }}>

      {/* ── Шапка ── */}
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-[0.55rem] tracking-[0.3em] uppercase mb-2" style={{ color: "#b8a898" }}>
              Ресторан Brasa · Київ
            </p>
            <h1
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 300,
                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                lineHeight: 1,
                color: "#1c1410",
              }}
            >
              Наше меню
            </h1>
          </div>
          <div className="relative w-full md:w-64 flex-shrink-0">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#b8a898" }} />
            <input
              type="text"
              placeholder="Пошук страви..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm outline-none rounded-[2px]"
              style={{ background: "#fff", border: "1px solid #e0d4c8", color: "#1c1410" }}
            />
          </div>
        </div>
      </div>

      {/* ── Навігація ── */}
      <div
        ref={navRef}
        className="sticky z-30"
        style={{ top: "64px", background: "#faf7f2", borderTop: "1px solid #e8ddd4", borderBottom: "1px solid #e8ddd4" }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <nav className="flex overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {menuCategories.map((cat) => {
              const isActive = activeId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToSection(cat.id)}
                  className="flex-shrink-0 px-5 py-4 relative transition-all duration-300 text-[0.68rem] tracking-[0.14em] uppercase whitespace-nowrap"
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
      <div className="max-w-5xl mx-auto px-6 pb-24">
        {grouped.length === 0 ? (
          <div className="text-center py-24" style={{ color: "#c4b4a8" }}>
            <p className="text-2xl mb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>Нічого не знайдено</p>
            <p className="text-sm">Спробуйте змінити запит</p>
          </div>
        ) : (
          grouped.map((cat, ci) => (
            <section
              key={cat.id}
              id={cat.id}
              ref={(el) => { sectionRefs.current[cat.id] = el; }}
              className="pt-16"
            >
              {/* Заголовок категорії */}
              <div className="flex items-center gap-5 mb-2">
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 300,
                    fontStyle: "italic",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    lineHeight: 1,
                    color: "#1c1410",
                    flexShrink: 0,
                  }}
                >
                  {cat.label}
                </h2>
                <div className="flex-1 h-px" style={{ background: "#e0d4c8" }} />
                <span className="text-[0.52rem] tracking-widest uppercase flex-shrink-0" style={{ color: "#c4b4a8" }}>
                  {cat.items.length} {cat.items.length === 1 ? "страва" : cat.items.length < 5 ? "страви" : "страв"}
                </span>
              </div>

              {/* Рядки страв — кожна своє фото, чергування */}
              <div>
                {cat.items.map((item, idx) => (
                  <DishRow key={item.id} item={item} index={idx} />
                ))}
              </div>

              {/* Роздільник між категоріями */}
              {ci < grouped.length - 1 && (
                <div className="mt-10 flex items-center gap-5">
                  <div className="flex-1 h-px" style={{ background: "#e8ddd4" }} />
                  <span style={{ color: "#d4c4b4", fontSize: "0.45rem", letterSpacing: "0.5em" }}>✦ ✦ ✦</span>
                  <div className="flex-1 h-px" style={{ background: "#e8ddd4" }} />
                </div>
              )}
            </section>
          ))
        )}
      </div>

      <style>{`
        .dish-circle {
          transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease;
        }
        .dish-row:hover .dish-circle {
          border-color: rgba(139,26,46,0.35) !important;
          box-shadow: 0 12px 40px rgba(28,20,16,0.18) !important;
          transform: scale(1.03);
        }
        .dish-add-btn:hover {
          background: #8b1a2e !important;
          border-color: #8b1a2e !important;
        }
        @media (max-width: 767px) {
          .dish-row {
            flex-direction: column !important;
            align-items: center;
            text-align: center;
          }
          .dish-row p, .dish-row h3 {
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
