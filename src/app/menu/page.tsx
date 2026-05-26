"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Flame, Search, Sparkles } from "lucide-react";
import { ShoppingCart } from "lucide-react";
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
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="dish-row group flex items-center gap-5 py-5"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>

      {/* Кругова фотографія */}
      <div className="relative flex-shrink-0 rounded-full overflow-hidden"
        style={{ width: 72, height: 72, border: "2px solid rgba(196,154,60,0.25)", background: "#0f0a06" }}>
        <Image src={item.image} alt={item.name} fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          style={{ objectPosition: item.imagePosition ?? "center" }}
          sizes="72px" />
      </div>

      {/* Назва + опис */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-0.5">
          <span
            className="text-xl leading-tight"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400, color: "#f0e8dc" }}
          >
            {item.name}
          </span>
          {/* Бейджі */}
          {item.badge && (
            <span className="px-1.5 py-0.5 text-[0.48rem] tracking-widest uppercase rounded-[2px]"
              style={{ background: "#8b1a2e", color: "#fff" }}>{item.badge}</span>
          )}
          {item.isNew && (
            <span className="px-1.5 py-0.5 text-[0.48rem] tracking-widest uppercase rounded-[2px] flex items-center gap-0.5"
              style={{ background: "rgba(196,154,60,0.18)", color: "#c49a3c", border: "1px solid rgba(196,154,60,0.3)" }}>
              <Sparkles size={6} /> Нове
            </span>
          )}
          {item.spicy && (
            <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #ff8c42 0%, #e63312 100%)", boxShadow: "0 1px 6px rgba(230,80,18,0.5)" }}>
              <Flame size={7} color="#fff" />
            </span>
          )}
        </div>
        <p className="text-[0.68rem] leading-relaxed line-clamp-1 mb-1.5"
          style={{ color: "#6a5a50" }}>{item.description}</p>

        {/* Вибір розміру для піци */}
        {hasSize && (
          <div className="flex gap-1.5">
            {(["30", "40"] as const).map((s) => (
              <button key={s} onClick={() => setSize(s)}
                className="px-2.5 py-0.5 rounded-[2px] text-[0.55rem] tracking-wider uppercase transition-all duration-200"
                style={{
                  background: size === s ? "#c49a3c" : "rgba(196,154,60,0.08)",
                  color: size === s ? "#1a1208" : "#7a6a5e",
                  border: `1px solid ${size === s ? "#c49a3c" : "rgba(196,154,60,0.2)"}`,
                  fontWeight: size === s ? 600 : 400,
                }}>
                {s} см {item.weight?.includes(" / ") ? (s === "30" ? item.weight.split(" / ")[0] : item.weight.split(" / ")[1]) : ""}
              </button>
            ))}
          </div>
        )}
        {!hasSize && item.weight && (
          <span className="text-[0.58rem]" style={{ color: "#4a3a30" }}>{item.weight}</span>
        )}
      </div>

      {/* Ціна + кнопка */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Пунктирний роздільник — тільки на десктопі */}
        <div className="hidden md:block w-16 xl:w-24"
          style={{ borderTop: "1px dashed rgba(196,154,60,0.2)", marginTop: 2 }} />
        <span className="text-lg font-medium min-w-[56px] text-right"
          style={{ fontFamily: "var(--font-cormorant), serif", color: "#c49a3c", fontSize: "1.25rem" }}>
          {currentPrice} ₴
        </span>
        <button onClick={handleAdd}
          className="menu-add-btn w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            background: added ? "#8b1a2e" : "rgba(196,154,60,0.1)",
            border: `1px solid ${added ? "#8b1a2e" : "rgba(196,154,60,0.25)"}`,
            color: added ? "#fff" : "#c49a3c",
          }}>
          {added ? <span style={{ fontSize: "0.7rem" }}>✓</span> : <ShoppingCart size={13} />}
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
    <div className="pt-20 menu-dark-page">

      {/* ── Шапка ── */}
      <div className="max-w-3xl mx-auto px-6 pt-14 pb-8 text-center">
        <p className="text-[0.58rem] tracking-[0.35em] uppercase mb-3" style={{ color: "#5a4a3a" }}>
          Ресторан Brasa · Київ
        </p>
        <h1 style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 300,
          fontSize: "clamp(3.5rem, 8vw, 6rem)",
          letterSpacing: "0.18em",
          lineHeight: 1,
          color: "#f0e8dc",
        }}>
          МЕНЮ
        </h1>
        <div className="flex items-center justify-center gap-4 mt-4 mb-6">
          <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to right, transparent, rgba(196,154,60,0.5))" }} />
          <span style={{ color: "#c49a3c", fontSize: "0.5rem", letterSpacing: "0.4em" }}>◆ ◆ ◆</span>
          <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to left, transparent, rgba(196,154,60,0.5))" }} />
        </div>
        <p className="text-[0.62rem] tracking-[0.2em] uppercase" style={{ color: "#4a3a30" }}>
          Піца · Роли · Бургери · Напої · Коктейлі
        </p>
      </div>

      {/* ── Навігація ── */}
      <div ref={navRef} className="sticky z-30 menu-nav"
        style={{ top: "64px", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-3xl mx-auto px-6 flex items-center gap-2">
          <nav className="flex flex-1 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {menuCategories.map((cat) => {
              const isActive = activeId === cat.id;
              return (
                <button key={cat.id} onClick={() => scrollToSection(cat.id)}
                  className="flex-shrink-0 px-5 py-4 relative transition-all duration-300 text-[0.68rem] tracking-[0.14em] uppercase"
                  style={{ color: isActive ? "#c49a3c" : "#4a3a30", fontWeight: isActive ? 500 : 400 }}>
                  {cat.label}
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] transition-all duration-300"
                    style={{ background: "#c49a3c", opacity: isActive ? 1 : 0, transform: isActive ? "scaleX(1)" : "scaleX(0)", transformOrigin: "center" }} />
                </button>
              );
            })}
          </nav>
          {/* Пошук */}
          <div className="relative flex-shrink-0">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "#4a3a30" }} />
            <input type="text" placeholder="Пошук..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-2 text-[0.68rem] outline-none rounded-[2px] w-36 transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#c4b4a8" }} />
          </div>
        </div>
      </div>

      {/* ── Секції ── */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        {grouped.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-2xl mb-2" style={{ fontFamily: "var(--font-cormorant), serif", color: "#4a3a30" }}>Нічого не знайдено</p>
            <p className="text-sm" style={{ color: "#3a2a20" }}>Спробуйте змінити запит</p>
          </div>
        ) : (
          grouped.map((cat, i) => (
            <section key={cat.id} id={cat.id}
              ref={(el) => { sectionRefs.current[cat.id] = el; }}
              className="pt-16">

              {/* Заголовок категорії */}
              <div className="flex items-center gap-6 mb-1">
                <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
                <h2 style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 300,
                  fontStyle: "italic",
                  fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
                  lineHeight: 1,
                  color: "#f0e8dc",
                  letterSpacing: "0.06em",
                }}>
                  {cat.label}
                </h2>
                <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
              </div>
              <div className="flex justify-center mb-6">
                <span className="text-[0.52rem] tracking-[0.25em] uppercase" style={{ color: "#4a3a30" }}>
                  {cat.items.length} {cat.items.length === 1 ? "страва" : cat.items.length < 5 ? "страви" : "страв"}
                </span>
              </div>

              {/* Рядки страв */}
              <div>
                {cat.items.map((item) => <DishRow key={item.id} item={item} />)}
              </div>

              {/* Роздільник */}
              {i < grouped.length - 1 && (
                <div className="mt-12 flex items-center justify-center gap-3">
                  <div className="h-px w-20" style={{ background: "rgba(196,154,60,0.15)" }} />
                  <span style={{ color: "rgba(196,154,60,0.35)", fontSize: "0.45rem", letterSpacing: "0.5em" }}>✦ ✦ ✦</span>
                  <div className="h-px w-20" style={{ background: "rgba(196,154,60,0.15)" }} />
                </div>
              )}
            </section>
          ))
        )}
      </div>

      <style>{`
        .menu-dark-page {
          background: #110d08;
          min-height: 100vh;
          background-image:
            radial-gradient(ellipse at 30% 10%, rgba(139,26,46,0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(196,154,60,0.04) 0%, transparent 50%);
        }
        .menu-nav {
          background: #110d08;
        }
        .dish-row {
          transition: background 0.25s ease;
        }
        .dish-row:hover {
          background: rgba(255,255,255,0.02);
          border-radius: 4px;
        }
        .menu-add-btn:hover {
          background: #8b1a2e !important;
          border-color: #8b1a2e !important;
          color: #fff !important;
        }
      `}</style>
    </div>
  );
}
