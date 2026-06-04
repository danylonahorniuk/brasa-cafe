"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart, Flame, Plus, Minus, Search, Check } from "lucide-react";
import { menuItems, menuCategories } from "@/data/menu";
import { useCart } from "@/context/CartContext";

const categoryLabel: Record<string, string> = {
  pizza:   "Піца",
  rolls:   "Роли",
  burgers: "Бургер",
  drinks:  "Напій",
  alcohol: "Алкоголь",
};

/* ─── Картка страви ─── */
function DishCard({ item }: { item: typeof menuItems[0] }) {
  const { add } = useCart();
  const [added, setAdded]   = useState(false);
  const [qty,   setQty]     = useState(1);
  const [size,  setSize]    = useState<"30" | "40">("30");

  const hasSize      = item.category === "pizza" && item.sizes;
  const currentPrice = hasSize ? item.sizes![size] : item.price;
  const cartKey      = hasSize ? `${item.id}-${size}` : `${item.id}`;
  const sizeLabel    = hasSize ? `${size} см` : undefined;
  const displayWeight = hasSize && item.weight?.includes(" / ")
    ? item.weight.split(" / ")[size === "30" ? 0 : 1]
    : item.weight;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) add(item, cartKey, sizeLabel, currentPrice);
    setAdded(true);
    setTimeout(() => { setAdded(false); setQty(1); }, 1400);
  };

  return (
    <div className="dish-card group flex flex-col rounded-sm overflow-hidden"
      style={{ background: "#fff", border: "1px solid #e8ddd4" }}>

      {/* Фото */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ aspectRatio: "4/3", background: "#f5f0eb" }}>
        <Image
          src={item.image} alt={item.name} fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: item.imagePosition ?? "center" }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Бейджі */}
        <div className="absolute top-2.5 left-2.5 flex gap-1.5 z-10">
          {item.badge && (
            <span className="px-2 py-0.5 text-[0.55rem] tracking-widest uppercase font-medium rounded-[2px]"
              style={{ background: "#8b1a2e", color: "#fff" }}>{item.badge}</span>
          )}
          {item.isNew && (
            <span className="px-2 py-0.5 text-[0.55rem] tracking-widest uppercase font-medium rounded-[2px]"
              style={{ background: "#c49a3c", color: "#fff" }}>Нове</span>
          )}
          {item.spicy && (
            <span className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#ff8c42,#e63312)", boxShadow: "0 2px 8px rgba(230,80,18,.45)" }}>
              <Flame size={9} color="#fff" />
            </span>
          )}
        </div>
        {displayWeight && (
          <span className="absolute bottom-2 right-2 z-10 px-2 py-0.5 text-[0.58rem] rounded-[2px]"
            style={{ background: "rgba(12,8,6,.5)", color: "rgba(255,255,255,.9)", backdropFilter: "blur(4px)" }}>
            {displayWeight}
          </span>
        )}
      </div>

      {/* Контент */}
      <div className="flex flex-col flex-1 p-3 sm:p-4">
        <p className="text-[0.55rem] tracking-widest uppercase mb-1" style={{ color: "#a09080" }}>
          {categoryLabel[item.category]}
        </p>
        <h3 className="text-base sm:text-lg leading-snug mb-1"
          style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400, color: "#1c1410" }}>
          {item.name}
        </h3>
        <p className="text-[0.68rem] leading-relaxed line-clamp-2 mb-3" style={{ color: "#7a6a5e" }}>
          {item.description}
        </p>

        {/* Розмір піци */}
        {hasSize && (
          <div className="flex gap-1.5 mb-3">
            {(["30","40"] as const).map((s) => (
              <button key={s} onClick={() => setSize(s)}
                className="flex-1 py-1.5 rounded-sm text-[0.62rem] tracking-wider uppercase transition-all duration-200"
                style={{
                  background: size === s ? "#1c1410" : "#faf7f2",
                  color:      size === s ? "#fff"    : "#7a6a5e",
                  border:     `1px solid ${size === s ? "#1c1410" : "#d4c4b8"}`,
                }}>
                {s} см
              </button>
            ))}
          </div>
        )}

        {/* Ціна + контроли */}
        <div className="flex items-center gap-2 mt-auto pt-3" style={{ borderTop: "1px solid #f0e8e0" }}>
          {/* Ціна */}
          <span className="text-base sm:text-lg font-medium flex-shrink-0" style={{ color: "#c49a3c" }}>
            {currentPrice * qty} ₴
          </span>

          {/* Qty — з'являється коли qty > 1 */}
          {qty > 1 && (
            <div className="flex items-center gap-1 ml-auto">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}
                className="dish-qty-btn w-7 h-7 flex items-center justify-center rounded-sm transition-all"
                style={{ border: "1px solid #d4c4b8", color: "#7a6a5e", background: "#faf7f2" }}>
                <Minus size={10} />
              </button>
              <span className="w-6 text-center text-sm font-medium" style={{ color: "#1c1410" }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}
                className="dish-qty-btn w-7 h-7 flex items-center justify-center rounded-sm transition-all"
                style={{ border: "1px solid #d4c4b8", color: "#7a6a5e", background: "#faf7f2" }}>
                <Plus size={10} />
              </button>
            </div>
          )}

          {/* Кнопка додати */}
          {qty === 1 ? (
            /* Компактна кнопка «+» коли qty=1 */
            <div className="flex items-center gap-1.5 ml-auto">
              <button onClick={() => setQty(q => q + 1)}
                className="dish-qty-btn w-8 h-8 flex items-center justify-center rounded-sm transition-all"
                style={{ border: "1px solid #d4c4b8", color: "#7a6a5e", background: "#faf7f2" }}>
                <Plus size={12} />
              </button>
              <button onClick={handleAdd}
                className="dish-add-btn flex items-center justify-center gap-1.5 h-8 px-3 rounded-sm text-[0.58rem] tracking-wider uppercase transition-all duration-300"
                style={{
                  background: added ? "#8b1a2e" : "#1c1410",
                  color: "#fff",
                  minWidth: "72px",
                }}>
                {added ? <Check size={12} /> : <ShoppingCart size={11} />}
                {added ? "Додано" : "В кошик"}
              </button>
            </div>
          ) : (
            /* Велика кнопка «В кошик» коли qty > 1 */
            <button onClick={handleAdd}
              className="dish-add-btn flex items-center justify-center gap-1.5 h-8 px-3 rounded-sm text-[0.58rem] tracking-wider uppercase transition-all duration-300"
              style={{
                background: added ? "#8b1a2e" : "#1c1410",
                color: "#fff",
                minWidth: "72px",
              }}>
              {added ? <Check size={12} /> : <ShoppingCart size={11} />}
              {added ? "Додано" : "В кошик"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Сторінка ─── */
export default function MenuPage() {
  const [search,   setSearch]   = useState("");
  const [activeId, setActiveId] = useState("pizza");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const navRef      = useRef<HTMLDivElement>(null);

  const grouped = menuCategories.map((cat) => ({
    ...cat,
    items: menuItems.filter(
      (item) => item.category === cat.id &&
        item.name.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    if (cat) setTimeout(() => scrollToSection(cat), 400);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); }); },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    Object.values(sectionRefs.current).forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [grouped.map((g) => g.id).join(",")]);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    const navH = navRef.current?.offsetHeight ?? 0;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navH - 80, behavior: "smooth" });
  };

  return (
    <div className="pt-16 sm:pt-20" style={{ background: "#faf7f2" }}>

      {/* Заголовок */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-8 sm:pt-12 pb-5 sm:pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-[0.55rem] tracking-[0.3em] uppercase mb-2" style={{ color: "#b8a898" }}>
              Ресторан Brasa · Київ
            </p>
            <h1 className="text-5xl md:text-6xl"
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, lineHeight: 1.05, color: "#1c1410" }}>
              Наше меню
            </h1>
            <div className="flex items-center gap-2.5 mt-3">
              <div className="h-px w-10" style={{ background: "#c49a3c" }} />
              <span style={{ color: "#c49a3c", fontSize: "0.45rem", letterSpacing: "0.15em" }}>◆</span>
              <div className="h-px flex-1" style={{ background: "#f0e8e0" }} />
            </div>
          </div>
          <div className="relative w-full md:w-72">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#c4b4a8" }} />
            <input type="text" placeholder="Пошук страви..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-sm outline-none"
              style={{ background: "#fff", border: "1px solid #e8ddd4", color: "#1c1410" }} />
          </div>
        </div>
      </div>

      {/* Категорії — sticky nav */}
      <div ref={navRef} className="sticky z-30 top-16 sm:top-20"
        style={{ background: "#faf7f2", borderTop: "1px solid #e8ddd4", borderBottom: "1px solid #e8ddd4" }}>
        <div className="max-w-7xl mx-auto px-2 sm:px-6">
          <nav className="flex items-center overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {menuCategories.map((cat, idx) => {
              const isActive = activeId === cat.id;
              return (
                <div key={cat.id} className="flex items-center">
                  <button onClick={() => scrollToSection(cat.id)}
                    className="menu-nav-item flex-shrink-0 px-4 sm:px-6 py-3.5 sm:py-4 relative transition-all duration-300"
                    style={{ color: isActive ? "#1c1410" : "#a09080" }}>
                    <span className="text-[0.68rem] sm:text-[0.72rem] tracking-[0.1em] uppercase font-medium whitespace-nowrap">
                      {cat.label}
                    </span>
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300"
                      style={{ background: "#8b1a2e", opacity: isActive ? 1 : 0,
                        transform: isActive ? "scaleX(1)" : "scaleX(0)", transformOrigin: "center" }} />
                  </button>
                  {idx < menuCategories.length - 1 && (
                    <span className="flex-shrink-0 hidden sm:block" style={{ color: "#d4c4b4", fontSize: "0.35rem" }}>◆</span>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Секції */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        {grouped.length === 0 ? (
          <div className="text-center py-24" style={{ color: "#c4b4a8" }}>
            <p className="text-2xl mb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>Нічого не знайдено</p>
            <p className="text-sm">Спробуйте змінити запит</p>
          </div>
        ) : (
          grouped.map((cat, i) => (
            <section key={cat.id} id={cat.id}
              ref={(el) => { sectionRefs.current[cat.id] = el; }}
              className="pt-10 sm:pt-14 pl-4 sm:pl-5 relative"
              style={{ borderLeft: "2px solid #e8ddd4" }}>

              <span className="absolute left-[-5px] top-[2.75rem] sm:top-[3.75rem] w-2 h-2 rounded-full"
                style={{ background: "#c49a3c", boxShadow: "0 0 0 3px #faf7f2" }} />

              <div className="mb-5 sm:mb-8">
                <div className="flex items-center gap-2 mb-1">
                  <span style={{ color: "#c49a3c", fontSize: "0.42rem" }}>◆</span>
                  <span className="text-[0.52rem] tracking-[0.28em] uppercase" style={{ color: "#c4b4a8" }}>
                    {cat.items.length} {cat.items.length === 1 ? "страва" : cat.items.length < 5 ? "страви" : "страв"}
                  </span>
                </div>
                <h2 style={{
                  fontFamily: "var(--font-cormorant), serif", fontWeight: 300, fontStyle: "italic",
                  fontSize: "clamp(1.9rem, 8vw, 4rem)", lineHeight: 1, color: "#1c1410",
                }}>
                  {cat.label}
                </h2>
                <div className="flex items-center gap-2 mt-2.5">
                  <div className="h-px w-10" style={{ background: "#c49a3c" }} />
                  <span style={{ color: "#c49a3c", fontSize: "0.42rem" }}>◆</span>
                  <div className="h-px flex-1 max-w-24" style={{ background: "#ede4d8" }} />
                </div>
              </div>

              {/* Сітка: 1 колонка на мобілі → 2 на sm → 3 на lg → 4 на xl */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {cat.items.map((item) => <DishCard key={item.id} item={item} />)}
              </div>

              {i < grouped.length - 1 && (
                <div className="mt-10 sm:mt-14 mb-2 flex items-center gap-3">
                  <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, #faf7f2, #e8ddd4)" }} />
                  <div className="flex items-center gap-1.5" style={{ color: "#c8b49a" }}>
                    <span style={{ fontSize: "0.32rem" }}>◆</span>
                    <span style={{ fontSize: "0.5rem" }}>✦</span>
                    <span style={{ fontSize: "0.32rem" }}>◆</span>
                  </div>
                  <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, #faf7f2, #e8ddd4)" }} />
                </div>
              )}
            </section>
          ))
        )}
      </div>

      {/* Орнамент внизу */}
      <div className="max-w-7xl mx-auto px-6 pb-16 flex flex-col items-center gap-3">
        <div className="flex items-center gap-4 w-full max-w-xs">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #d4c4b4)" }} />
          <span style={{ color: "#c49a3c", fontSize: "0.45rem", letterSpacing: "0.2em" }}>◆ ✦ ◆</span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #d4c4b4)" }} />
        </div>
        <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.1rem", fontWeight: 300,
          fontStyle: "italic", letterSpacing: "0.12em", color: "#c8b8a8" }}>Brasa</span>
      </div>

      <style>{`
        @media (hover: hover) and (pointer: fine) {
          .dish-card {
            transition: box-shadow .4s ease, border-color .4s ease, transform .4s ease;
          }
          .dish-card:hover {
            box-shadow: 0 8px 28px rgba(28,20,16,.1);
            border-color: rgba(139,26,46,.18);
            transform: translateY(-2px);
          }
          .dish-add-btn:hover { opacity: .85; }
          .dish-qty-btn:hover { border-color: #1c1410 !important; color: #1c1410 !important; }
          .menu-nav-item:hover { color: #1c1410 !important; }
        }
        @media (hover: none) {
          .dish-add-btn:active { opacity: .75; }
          .dish-qty-btn:active { background: #f0ebe4 !important; }
        }
      `}</style>
    </div>
  );
}
