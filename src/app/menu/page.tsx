"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart, Flame, Plus, Minus, Search, Check, X } from "lucide-react";
import { menuItems, menuCategories } from "@/data/menu";
import { useCart } from "@/context/CartContext";

type MenuItem = typeof menuItems[0];

const categoryLabel: Record<string, string> = {
  pizza: "Піца", rolls: "Роли", burgers: "Бургер", drinks: "Напій", alcohol: "Алкоголь",
};

/* ════════════════════════════════════════
   MOBILE — рядок товару
════════════════════════════════════════ */
function DishRow({ item, onOpen }: { item: MenuItem; onOpen: (item: MenuItem) => void }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const hasSize      = item.category === "pizza" && !!item.sizes;
  const defaultPrice = hasSize ? item.sizes!["30"] : item.price;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const key = hasSize ? `${item.id}-30` : `${item.id}`;
    add(item, key, hasSize ? "30 см" : undefined, defaultPrice);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div
      onClick={() => onOpen(item)}
      className="flex items-center gap-3 py-3.5 px-1 cursor-pointer dish-row transition-colors"
      style={{ borderBottom: "1px solid #ede6de" }}
    >
      {/* Фото */}
      <div className="relative flex-shrink-0 rounded-sm overflow-hidden" style={{ width: 80, height: 80, background: "#f5f0eb" }}>
        <Image src={item.image} alt={item.name} fill className="object-cover"
          style={{ objectPosition: item.imagePosition ?? "center" }} sizes="80px" />
        {item.badge && (
          <span className="absolute top-1 left-1 px-1.5 py-px text-[0.45rem] tracking-widest uppercase font-medium rounded-[2px]"
            style={{ background: "#8b1a2e", color: "#fff" }}>{item.badge}</span>
        )}
      </div>

      {/* Інфо */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-1.5 mb-0.5">
          <p className="text-sm font-medium leading-snug flex-1" style={{ color: "#1c1410" }}>
            {item.name}
          </p>
          {item.spicy && (
            <span className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5"
              style={{ background: "linear-gradient(135deg,#ff8c42,#e63312)" }}>
              <Flame size={7} color="#fff" />
            </span>
          )}
          {item.isNew && (
            <span className="flex-shrink-0 px-1.5 py-px text-[0.45rem] tracking-widest uppercase font-medium rounded-[2px] mt-0.5"
              style={{ background: "#c49a3c", color: "#fff" }}>Нове</span>
          )}
        </div>

        {/* Вага / розміри */}
        {item.weight && (
          <p className="text-[0.62rem] leading-relaxed" style={{ color: "#a09080" }}>
            {hasSize ? item.weight : item.weight}
          </p>
        )}
        {hasSize && (
          <p className="text-[0.6rem]" style={{ color: "#a09080" }}>30 см · 40 см</p>
        )}

        {/* Ціна + кнопка */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-base font-medium" style={{ color: "#c49a3c" }}>
            {defaultPrice} ₴
          </span>
          <button
            onClick={handleQuickAdd}
            className="dish-add-circle flex items-center justify-center transition-all duration-300"
            style={{
              width: 34, height: 34, borderRadius: "50%",
              background: added ? "#5a9a70" : "#1c1410",
              color: "#fff", flexShrink: 0,
            }}
            aria-label="Додати"
          >
            {added ? <Check size={14} /> : <Plus size={15} />}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   MOBILE — модалка деталей (bottom sheet)
════════════════════════════════════════ */
function DishModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const { add } = useCart();
  const [qty,     setQty]     = useState(1);
  const [size,    setSize]    = useState<"30" | "40">("30");
  const [added,   setAdded]   = useState(false);
  const [closing, setClosing] = useState(false);

  const hasSize      = item.category === "pizza" && !!item.sizes;
  const currentPrice = hasSize ? item.sizes![size] : item.price;
  const cartKey      = hasSize ? `${item.id}-${size}` : `${item.id}`;

  const close = () => { setClosing(true); setTimeout(onClose, 320); };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, []);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) add(item, cartKey, hasSize ? `${size} см` : undefined, currentPrice);
    setAdded(true);
    setTimeout(() => { close(); }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end"
      style={{
        backdropFilter: "blur(4px)",
        background: closing ? "rgba(0,0,0,0)" : "rgba(28,20,16,0.6)",
        transition: "background 0.32s ease",
      }}
      onClick={close}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full rounded-t-2xl overflow-hidden"
        style={{
          background: "#faf7f2",
          maxHeight: "88svh",
          overflowY: "auto",
          transform: closing ? "translateY(100%)" : "translateY(0)",
          transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Фото */}
        <div className="relative w-full flex-shrink-0" style={{ aspectRatio: "16/9" }}>
          <Image src={item.image} alt={item.name} fill className="object-cover"
            style={{ objectPosition: item.imagePosition ?? "center" }} sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,12,8,0.4) 0%, transparent 50%)" }} />
          {/* Закрити */}
          <button onClick={close}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.45)", color: "#fff" }}>
            <X size={15} />
          </button>
          {/* Бейджі */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            {item.badge && <span className="px-2 py-0.5 text-[0.55rem] tracking-widest uppercase font-medium rounded-[2px]"
              style={{ background: "#8b1a2e", color: "#fff" }}>{item.badge}</span>}
            {item.isNew && <span className="px-2 py-0.5 text-[0.55rem] tracking-widest uppercase font-medium rounded-[2px]"
              style={{ background: "#c49a3c", color: "#fff" }}>Нове</span>}
          </div>
        </div>

        {/* Контент */}
        <div className="p-5 pb-8">
          {/* Назва + гострота */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, fontSize: "1.75rem", color: "#1c1410", lineHeight: 1.1 }}>
              {item.name}
            </h2>
            {item.spicy && (
              <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1"
                style={{ background: "linear-gradient(135deg,#ff8c42,#e63312)" }}>
                <Flame size={11} color="#fff" />
              </span>
            )}
          </div>

          {/* Категорія + вага */}
          <p className="text-[0.6rem] tracking-widest uppercase mb-3" style={{ color: "#a09080" }}>
            {categoryLabel[item.category]}{item.weight ? ` · ${item.weight}` : ""}
          </p>

          {/* Опис */}
          <p className="text-sm leading-relaxed mb-5" style={{ color: "#5a4a3e" }}>
            {item.description}
          </p>

          {/* Розмір (тільки піца) */}
          {hasSize && (
            <div className="mb-5">
              <p className="text-[0.58rem] tracking-widest uppercase mb-2.5" style={{ color: "#a09080" }}>Оберіть розмір</p>
              <div className="flex gap-2">
                {(["30","40"] as const).map(s => (
                  <button key={s} onClick={() => setSize(s)}
                    className="flex-1 py-3 rounded-sm text-sm transition-all duration-200"
                    style={{
                      background: size === s ? "#1c1410" : "#fff",
                      color:      size === s ? "#fff"    : "#7a6a5e",
                      border:     `1px solid ${size === s ? "#1c1410" : "#d4c4b8"}`,
                    }}>
                    {s} см
                    <span className="block text-[0.65rem] mt-0.5" style={{ opacity: 0.7 }}>
                      {item.sizes![s]} ₴
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Qty + В кошик */}
          <div className="flex items-center gap-3">
            {/* Лічильник */}
            <div className="flex items-center rounded-sm overflow-hidden" style={{ border: "1px solid #d4c4b8", background: "#fff" }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-11 h-12 flex items-center justify-center transition-colors"
                style={{ color: "#7a6a5e", borderRight: "1px solid #d4c4b8" }}>
                <Minus size={14} />
              </button>
              <span className="w-9 text-center text-base font-medium" style={{ color: "#1c1410" }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}
                className="w-11 h-12 flex items-center justify-center transition-colors"
                style={{ color: "#7a6a5e", borderLeft: "1px solid #d4c4b8" }}>
                <Plus size={14} />
              </button>
            </div>

            {/* Кнопка */}
            <button onClick={handleAdd}
              className="flex-1 h-12 flex items-center justify-center gap-2 rounded-sm text-[0.68rem] tracking-wider uppercase transition-all duration-300"
              style={{ background: added ? "#5a9a70" : "#1c1410", color: "#fff" }}>
              {added ? <Check size={15} /> : <ShoppingCart size={14} />}
              <span>{added ? "Додано!" : `В кошик · ${currentPrice * qty} ₴`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   DESKTOP — картка (без змін)
════════════════════════════════════════ */
function DishCard({ item }: { item: MenuItem }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [qty,   setQty]   = useState(1);
  const [size,  setSize]  = useState<"30" | "40">("30");

  const hasSize      = item.category === "pizza" && !!item.sizes;
  const currentPrice = hasSize ? item.sizes![size] : item.price;
  const cartKey      = hasSize ? `${item.id}-${size}` : `${item.id}`;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) add(item, cartKey, hasSize ? `${size} см` : undefined, currentPrice);
    setAdded(true);
    setTimeout(() => { setAdded(false); setQty(1); }, 1400);
  };

  return (
    <div className="dish-card group flex flex-col rounded-sm overflow-hidden"
      style={{ background: "#fff", border: "1px solid #e8ddd4" }}>
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: "200px", background: "#f5f0eb" }}>
        <Image src={item.image} alt={item.name} fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: item.imagePosition ?? "center" }}
          sizes="(max-width: 1024px) 50vw, 25vw" />
        <div className="absolute top-2.5 left-2.5 flex gap-1.5 z-10">
          {item.badge && <span className="px-2 py-0.5 text-[0.55rem] tracking-widest uppercase font-medium rounded-[2px]"
            style={{ background: "#8b1a2e", color: "#fff" }}>{item.badge}</span>}
          {item.isNew && <span className="px-2 py-0.5 text-[0.55rem] tracking-widest uppercase font-medium rounded-[2px]"
            style={{ background: "#c49a3c", color: "#fff" }}>Нове</span>}
          {item.spicy && <span className="w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#ff8c42,#e63312)", boxShadow: "0 2px 8px rgba(230,80,18,.45)" }}>
            <Flame size={9} color="#fff" /></span>}
        </div>
        {item.weight && (
          <span className="absolute bottom-2 right-2 z-10 px-2 py-0.5 text-[0.58rem] rounded-[2px]"
            style={{ background: "rgba(12,8,6,.5)", color: "rgba(255,255,255,.9)", backdropFilter: "blur(4px)" }}>
            {hasSize && item.weight.includes(" / ") ? item.weight.split(" / ")[size === "30" ? 0 : 1] : item.weight}
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-4">
        <p className="text-[0.58rem] tracking-widest uppercase mb-1" style={{ color: "#a09080" }}>{categoryLabel[item.category]}</p>
        <h3 className="text-xl leading-snug mb-2" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400, color: "#1c1410" }}>
          {item.name}
        </h3>
        <p className="text-[0.72rem] leading-relaxed line-clamp-3 mb-auto" style={{ color: "#7a6a5e" }}>{item.description}</p>
        {hasSize && (
          <div className="flex gap-2 mt-3">
            {(["30","40"] as const).map(s => (
              <button key={s} onClick={() => setSize(s)}
                className="flex-1 py-1.5 rounded-sm text-[0.65rem] tracking-wider uppercase transition-all"
                style={{ background: size === s ? "#1c1410" : "#faf7f2", color: size === s ? "#fff" : "#7a6a5e",
                  border: `1px solid ${size === s ? "#1c1410" : "#d4c4b8"}` }}>
                {s} см
              </button>
            ))}
          </div>
        )}
        <div className="flex items-center gap-3 mt-4 pt-4" style={{ borderTop: "1px solid #f0e8e0" }}>
          <span className="text-lg font-medium flex-shrink-0" style={{ color: "#c49a3c" }}>{currentPrice * qty} ₴</span>
          <div className="flex items-center gap-1 ml-auto">
            <button onClick={() => setQty(q => Math.max(1, q - 1))}
              className="w-7 h-7 rounded-sm flex items-center justify-center"
              style={{ border: "1px solid #d4c4b8", color: "#7a6a5e", background: "#faf7f2" }}><Minus size={10} /></button>
            <span className="w-7 text-center text-sm font-medium" style={{ color: "#1c1410" }}>{qty}</span>
            <button onClick={() => setQty(q => q + 1)}
              className="w-7 h-7 rounded-sm flex items-center justify-center"
              style={{ border: "1px solid #d4c4b8", color: "#7a6a5e", background: "#faf7f2" }}><Plus size={10} /></button>
          </div>
          <button onClick={handleAdd}
            className="dish-add-btn flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[0.6rem] tracking-wider uppercase transition-all flex-shrink-0"
            style={{ background: added ? "#8b1a2e" : "#faf7f2", border: `1px solid ${added ? "#8b1a2e" : "#d4c4b8"}`, color: added ? "#fff" : "#7a6a5e" }}>
            {added ? <Check size={11} /> : <ShoppingCart size={11} />}
            {added ? "Додано" : "В кошик"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   СТОРІНКА
════════════════════════════════════════ */
export default function MenuPage() {
  const [search,    setSearch]    = useState("");
  const [activeId,  setActiveId]  = useState("pizza");
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const navRef      = useRef<HTMLDivElement>(null);

  const grouped = menuCategories.map((cat) => ({
    ...cat,
    items: menuItems.filter(
      (item) => item.category === cat.id && item.name.toLowerCase().includes(search.toLowerCase())
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
            <p className="text-[0.55rem] tracking-[0.3em] uppercase mb-2" style={{ color: "#b8a898" }}>Ресторан Brasa · Київ</p>
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

      {/* Sticky nav */}
      <div ref={navRef} className="sticky z-30 top-16 sm:top-20"
        style={{ background: "#faf7f2", borderTop: "1px solid #e8ddd4", borderBottom: "1px solid #e8ddd4" }}>
        <div className="max-w-7xl mx-auto px-2 sm:px-6">
          <nav className="flex items-center overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {menuCategories.map((cat, idx) => {
              const isActive = activeId === cat.id;
              return (
                <div key={cat.id} className="flex items-center">
                  <button onClick={() => scrollToSection(cat.id)}
                    className="menu-nav-item flex-shrink-0 px-4 sm:px-6 py-3 sm:py-4 relative transition-all duration-300"
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
                <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, fontStyle: "italic",
                  fontSize: "clamp(1.9rem, 8vw, 4rem)", lineHeight: 1, color: "#1c1410" }}>
                  {cat.label}
                </h2>
                <div className="flex items-center gap-2 mt-2.5">
                  <div className="h-px w-10" style={{ background: "#c49a3c" }} />
                  <span style={{ color: "#c49a3c", fontSize: "0.42rem" }}>◆</span>
                  <div className="h-px flex-1 max-w-24" style={{ background: "#ede4d8" }} />
                </div>
              </div>

              {/* MOBILE — список рядків */}
              <div className="sm:hidden">
                {cat.items.map((item) => (
                  <DishRow key={item.id} item={item} onOpen={setModalItem} />
                ))}
              </div>

              {/* DESKTOP — сітка карток */}
              <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cat.items.map((item) => <DishCard key={item.id} item={item} />)}
              </div>

              {i < grouped.length - 1 && (
                <div className="mt-10 sm:mt-14 mb-2 flex items-center gap-3">
                  <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, #faf7f2, #e8ddd4)" }} />
                  <div className="flex items-center gap-1.5" style={{ color: "#c8b49a" }}>
                    <span style={{ fontSize: "0.32rem" }}>◆</span><span style={{ fontSize: "0.5rem" }}>✦</span><span style={{ fontSize: "0.32rem" }}>◆</span>
                  </div>
                  <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, #faf7f2, #e8ddd4)" }} />
                </div>
              )}
            </section>
          ))
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16 flex flex-col items-center gap-3">
        <div className="flex items-center gap-4 w-full max-w-xs">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #d4c4b4)" }} />
          <span style={{ color: "#c49a3c", fontSize: "0.45rem", letterSpacing: "0.2em" }}>◆ ✦ ◆</span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #d4c4b4)" }} />
        </div>
        <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.1rem", fontWeight: 300,
          fontStyle: "italic", letterSpacing: "0.12em", color: "#c8b8a8" }}>Brasa</span>
      </div>

      {/* Модалка деталей (mobile) */}
      {modalItem && <DishModal item={modalItem} onClose={() => setModalItem(null)} />}

      <style>{`
        .dish-row:active { background: #f5f0eb; }
        .dish-add-circle:active { transform: scale(0.9); }
        @media (hover: hover) and (pointer: fine) {
          .dish-card { transition: box-shadow .4s ease, border-color .4s ease, transform .4s ease; }
          .dish-card:hover { box-shadow: 0 8px 28px rgba(28,20,16,.1); border-color: rgba(139,26,46,.18); transform: translateY(-2px); }
          .dish-add-btn:hover { background: #8b1a2e !important; border-color: #8b1a2e !important; color: #fff !important; }
          .menu-nav-item:hover { color: #1c1410 !important; }
        }
      `}</style>
    </div>
  );
}
