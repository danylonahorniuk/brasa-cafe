"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Flame, Search, Sparkles, ShoppingCart } from "lucide-react";
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
  const displayWeight = hasSize && item.weight?.includes(" / ")
    ? item.weight.split(" / ")[size === "30" ? 0 : 1]
    : item.weight;

  const handleAdd = () => {
    add(item, cartKey, sizeLabel, currentPrice);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="dish-row group flex gap-5 py-5"
      style={{ borderBottom: "1px solid #ede4d8" }}>

      {/* Фото — велике, одразу впізнаване */}
      <div className="relative flex-shrink-0 rounded-sm overflow-hidden"
        style={{ width: 140, height: 110, background: "#f0e8de" }}>
        <Image
          src={item.image} alt={item.name} fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectPosition: item.imagePosition ?? "center" }}
          sizes="140px"
        />
        {/* Вага поверх фото */}
        {displayWeight && (
          <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 text-[0.52rem] rounded-[2px]"
            style={{ background: "rgba(12,8,6,0.55)", color: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)" }}>
            {displayWeight}
          </span>
        )}
      </div>

      {/* Контент */}
      <div className="flex flex-1 min-w-0 flex-col justify-between py-0.5">
        <div>
          {/* Категорія + бейджі */}
          <div className="flex flex-wrap items-center gap-1.5 mb-1">
            {item.badge && (
              <span className="px-1.5 py-0.5 text-[0.48rem] tracking-widest uppercase rounded-[2px]"
                style={{ background: "#8b1a2e", color: "#fff" }}>{item.badge}</span>
            )}
            {item.isNew && (
              <span className="px-1.5 py-0.5 text-[0.48rem] tracking-widest uppercase rounded-[2px] flex items-center gap-0.5"
                style={{ background: "rgba(196,154,60,0.12)", color: "#c49a3c", border: "1px solid rgba(196,154,60,0.3)" }}>
                <Sparkles size={6} /> Нове
              </span>
            )}
            {item.spicy && (
              <span className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #ff8c42 0%, #e63312 100%)", boxShadow: "0 1px 6px rgba(230,80,18,0.4)" }}>
                <Flame size={7} color="#fff" />
              </span>
            )}
          </div>

          {/* Назва — великий пріоритет */}
          <h3 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 400,
            fontSize: "1.45rem",
            lineHeight: 1.15,
            color: "#1c1410",
            marginBottom: "0.25rem",
          }}>
            {item.name}
          </h3>

          {/* Опис */}
          <p className="text-[0.68rem] leading-relaxed line-clamp-2"
            style={{ color: "#9a8070" }}>
            {item.description}
          </p>
        </div>

        {/* Низ: розмір піци + ціна + кнопка */}
        <div className="flex items-center justify-between mt-2 gap-3">
          {hasSize ? (
            <div className="flex gap-1.5">
              {(["30", "40"] as const).map((s) => (
                <button key={s} onClick={() => setSize(s)}
                  className="px-3 py-1 rounded-[2px] text-[0.58rem] tracking-wider uppercase transition-all duration-200"
                  style={{
                    background: size === s ? "#1c1410" : "#f0ebe4",
                    color: size === s ? "#fff" : "#7a6a5e",
                    border: `1px solid ${size === s ? "#1c1410" : "#d4c4b4"}`,
                  }}>
                  {s} см
                </button>
              ))}
            </div>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-3 flex-shrink-0">
            <span style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              color: "#c49a3c",
              lineHeight: 1,
            }}>
              {currentPrice} ₴
            </span>
            <button onClick={handleAdd}
              className="dish-add-btn flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[0.58rem] tracking-wider uppercase transition-all duration-300"
              style={{
                background: added ? "#8b1a2e" : "#faf7f2",
                border: `1px solid ${added ? "#8b1a2e" : "#d4c4b4"}`,
                color: added ? "#fff" : "#7a6a5e",
              }}>
              {added ? <span style={{ fontSize: "0.65rem" }}>✓</span> : <ShoppingCart size={11} />}
              {added ? "Додано" : "В кошик"}
            </button>
          </div>
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
      <div className="max-w-2xl mx-auto px-6 pt-12 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div>
            <p className="text-[0.58rem] tracking-[0.28em] uppercase mb-2" style={{ color: "#b09070" }}>
              Ресторан Brasa
            </p>
            <h1 style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 300,
              fontSize: "clamp(2.8rem, 7vw, 4.5rem)",
              letterSpacing: "0.06em",
              lineHeight: 1,
              color: "#1c1410",
            }}>
              Наше меню
            </h1>
          </div>
          <div className="relative w-full md:w-60 flex-shrink-0">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#b09070" }} />
            <input type="text" placeholder="Пошук страви..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-sm outline-none"
              style={{ background: "#fff", border: "1px solid #e0d4c4", color: "#1c1410" }} />
          </div>
        </div>
      </div>

      {/* ── Навігація ── */}
      <div ref={navRef} className="sticky z-30"
        style={{ top: "64px", background: "#faf7f2", borderTop: "1px solid #e8ddd4", borderBottom: "1px solid #e8ddd4" }}>
        <div className="max-w-2xl mx-auto px-6">
          <nav className="flex overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {menuCategories.map((cat) => {
              const isActive = activeId === cat.id;
              return (
                <button key={cat.id} onClick={() => scrollToSection(cat.id)}
                  className="flex-shrink-0 px-5 py-4 relative transition-all duration-300 text-[0.68rem] tracking-[0.14em] uppercase whitespace-nowrap"
                  style={{ color: isActive ? "#1c1410" : "#a09080" }}>
                  {cat.icon} {cat.label}
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300"
                    style={{ background: "#8b1a2e", opacity: isActive ? 1 : 0, transform: isActive ? "scaleX(1)" : "scaleX(0)", transformOrigin: "center" }} />
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ── Секції ── */}
      <div className="max-w-2xl mx-auto px-6 pb-24">
        {grouped.length === 0 ? (
          <div className="text-center py-24" style={{ color: "#c4b4a8" }}>
            <p className="text-2xl mb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>Нічого не знайдено</p>
            <p className="text-sm">Спробуйте змінити запит</p>
          </div>
        ) : (
          grouped.map((cat, i) => (
            <section key={cat.id} id={cat.id}
              ref={(el) => { sectionRefs.current[cat.id] = el; }}
              className="pt-14">

              {/* Заголовок категорії */}
              <div className="flex items-center gap-4 mb-6">
                <h2 style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 300,
                  fontStyle: "italic",
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  lineHeight: 1,
                  color: "#1c1410",
                }}>
                  {cat.label}
                </h2>
                <div className="flex-1 h-px" style={{ background: "#e0d4c4" }} />
                <span className="text-[0.55rem] tracking-widest uppercase flex-shrink-0" style={{ color: "#c4b4a8" }}>
                  {cat.items.length} {cat.items.length === 1 ? "страва" : cat.items.length < 5 ? "страви" : "страв"}
                </span>
              </div>

              {/* Рядки страв */}
              <div>
                {cat.items.map((item) => <DishRow key={item.id} item={item} />)}
              </div>

              {/* Роздільник */}
              {i < grouped.length - 1 && (
                <div className="mt-10 flex items-center gap-4">
                  <div className="flex-1 h-px" style={{ background: "#e8ddd4" }} />
                  <span style={{ color: "#d4c4b4", fontSize: "0.48rem", letterSpacing: "0.4em" }}>✦ ✦ ✦</span>
                  <div className="flex-1 h-px" style={{ background: "#e8ddd4" }} />
                </div>
              )}
            </section>
          ))
        )}
      </div>

      <style>{`
        .dish-row {
          transition: background 0.2s ease;
          border-radius: 4px;
        }
        .dish-row:hover {
          background: rgba(255,255,255,0.7);
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
