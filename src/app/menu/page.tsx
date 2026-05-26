"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart, Flame, Search, Sparkles, Plus, Minus } from "lucide-react";
import { menuItems, menuCategories } from "@/data/menu";
import { useCart } from "@/context/CartContext";

/* ─── Рядок однієї страви ─── */
function ItemRow({ item }: { item: typeof menuItems[0] }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState<"30" | "40">("30");

  const hasSize = item.category === "pizza" && item.sizes;
  const currentPrice = hasSize ? item.sizes![size] : item.price;
  const cartKey = hasSize ? `${item.id}-${size}` : `${item.id}`;
  const sizeLabel = hasSize ? `${size} см` : undefined;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) add(item, cartKey, sizeLabel, currentPrice);
    setAdded(true);
    setTimeout(() => { setAdded(false); setQty(1); }, 1300);
  };

  return (
    <div
      className="item-row flex items-start gap-4 py-4"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Назва + опис + розмір */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "1.25rem",
              fontWeight: 400,
              color: "#f0e8dc",
              lineHeight: 1.2,
            }}
          >
            {item.name}
          </span>
          {item.badge && (
            <span
              className="px-1.5 py-0.5 text-[0.45rem] tracking-widest uppercase"
              style={{ background: "#8b1a2e", color: "#fff", borderRadius: "2px" }}
            >
              {item.badge}
            </span>
          )}
          {item.isNew && (
            <span
              className="px-1.5 py-0.5 text-[0.45rem] tracking-widest uppercase flex items-center gap-0.5"
              style={{ background: "rgba(196,154,60,0.15)", color: "#c49a3c", border: "1px solid rgba(196,154,60,0.3)", borderRadius: "2px" }}
            >
              <Sparkles size={6} /> Нове
            </span>
          )}
          {item.spicy && (
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#ff8c42,#e63312)", boxShadow: "0 1px 6px rgba(230,80,18,0.45)" }}
            >
              <Flame size={7} color="#fff" />
            </span>
          )}
        </div>

        <p className="text-[0.67rem] leading-relaxed mb-1.5 line-clamp-2" style={{ color: "#5a4a3a" }}>
          {item.description}
        </p>

        {item.weight && !hasSize && (
          <span className="text-[0.55rem] tracking-wider" style={{ color: "#3a2e24" }}>{item.weight}</span>
        )}

        {hasSize && (
          <div className="flex gap-1.5 mt-1">
            {(["30", "40"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className="px-2.5 py-0.5 text-[0.55rem] tracking-wider uppercase transition-all duration-200"
                style={{
                  borderRadius: "2px",
                  background: size === s ? "#c49a3c" : "rgba(196,154,60,0.08)",
                  color: size === s ? "#1a1208" : "#6a5a4a",
                  border: `1px solid ${size === s ? "#c49a3c" : "rgba(196,154,60,0.2)"}`,
                  fontWeight: size === s ? 600 : 400,
                }}
              >
                {s} см · {item.weight?.includes(" / ") ? (s === "30" ? item.weight.split(" / ")[0] : item.weight.split(" / ")[1]) : ""}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Ціна + кількість + кнопка */}
      <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
        <span
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "1.2rem",
            color: "#c49a3c",
            lineHeight: 1,
            minWidth: "58px",
            textAlign: "right",
          }}
        >
          {currentPrice} ₴
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setQty(q => Math.max(1, q - 1))}
            className="w-6 h-6 flex items-center justify-center transition-colors"
            style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#5a4a3a", borderRadius: "2px" }}
          >
            <Minus size={8} />
          </button>
          <span className="w-5 text-center text-xs" style={{ color: "#a09080" }}>{qty}</span>
          <button
            onClick={() => setQty(q => q + 1)}
            className="w-6 h-6 flex items-center justify-center transition-colors"
            style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#5a4a3a", borderRadius: "2px" }}
          >
            <Plus size={8} />
          </button>
        </div>

        <button
          onClick={handleAdd}
          className="menu-add-btn flex items-center gap-1.5 px-3 py-1.5 text-[0.55rem] tracking-wider uppercase transition-all duration-300"
          style={{
            borderRadius: "2px",
            background: added ? "#8b1a2e" : "rgba(196,154,60,0.1)",
            border: `1px solid ${added ? "#8b1a2e" : "rgba(196,154,60,0.25)"}`,
            color: added ? "#fff" : "#c49a3c",
          }}
        >
          {added ? <span style={{ fontSize: "0.65rem" }}>✓</span> : <ShoppingCart size={10} />}
          {added ? "Додано" : "В кошик"}
        </button>
      </div>
    </div>
  );
}

/* ─── Секція категорії ─── */
function CategorySection({
  cat,
  items,
  reversed,
}: {
  cat: { id: string; label: string; icon: string };
  items: typeof menuItems;
  reversed: boolean;
}) {
  // Беремо найпопулярнішу страву для кругового фото
  const hero = items.find((i) => i.popular) ?? items[0];

  return (
    <div className="flex flex-col md:flex-row items-start gap-10 md:gap-16"
      style={{ flexDirection: reversed ? "row-reverse" : "row" }}>

      {/* Кругове фото — анкор категорії */}
      <div className="flex-shrink-0 flex flex-col items-center gap-4 w-full md:w-auto">
        <div
          className="circle-photo relative overflow-hidden"
          style={{
            width: 220,
            height: 220,
            borderRadius: "50%",
            border: "2px solid rgba(196,154,60,0.35)",
            boxShadow: "0 0 0 8px rgba(196,154,60,0.06), 0 20px 60px rgba(0,0,0,0.5)",
            background: "#1a1208",
          }}
        >
          <Image
            src={hero.image}
            alt={hero.name}
            fill
            className="object-cover"
            style={{ objectPosition: hero.imagePosition ?? "center" }}
            sizes="220px"
          />
        </div>

        {/* Назва категорії під фото */}
        <div
          className="px-4 py-1.5"
          style={{ background: "#c49a3c", borderRadius: "2px" }}
        >
          <span
            className="text-[0.62rem] tracking-[0.25em] uppercase font-semibold"
            style={{ color: "#1a1208" }}
          >
            {cat.label}
          </span>
        </div>
      </div>

      {/* Список страв */}
      <div className="flex-1 w-full">
        {items.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
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
    <div className="pt-20" style={{ background: "#0f0c08", minHeight: "100vh" }}>

      {/* ── Шапка ── */}
      <div className="max-w-5xl mx-auto px-6 pt-14 pb-10 text-center">
        <p className="text-[0.55rem] tracking-[0.35em] uppercase mb-3" style={{ color: "#3a2e24" }}>
          Ресторан Brasa · Київ
        </p>
        <h1
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 300,
            fontSize: "clamp(3rem, 8vw, 5.5rem)",
            letterSpacing: "0.15em",
            lineHeight: 1,
            color: "#f0e8dc",
          }}
        >
          МЕНЮ
        </h1>
        <div className="flex items-center justify-center gap-4 mt-5">
          <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, rgba(196,154,60,0.4))" }} />
          <span style={{ color: "rgba(196,154,60,0.5)", fontSize: "0.45rem", letterSpacing: "0.4em" }}>◆ ◆ ◆</span>
          <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, rgba(196,154,60,0.4))" }} />
        </div>
      </div>

      {/* ── Навігація ── */}
      <div
        ref={navRef}
        className="sticky z-30"
        style={{
          top: "64px",
          background: "#0f0c08",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 flex items-center gap-3">
          <nav className="flex flex-1 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {menuCategories.map((cat) => {
              const isActive = activeId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToSection(cat.id)}
                  className="flex-shrink-0 px-5 py-4 relative transition-all duration-300 text-[0.65rem] tracking-[0.15em] uppercase whitespace-nowrap"
                  style={{ color: isActive ? "#c49a3c" : "#3a2e24" }}
                >
                  {cat.label}
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[1px] transition-all duration-300"
                    style={{
                      background: "#c49a3c",
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "center",
                    }}
                  />
                </button>
              );
            })}
          </nav>

          <div className="relative flex-shrink-0">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "#3a2e24" }} />
            <input
              type="text"
              placeholder="Пошук..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-2 text-[0.65rem] outline-none w-32"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "#a09080",
                borderRadius: "2px",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Секції ── */}
      <div className="max-w-5xl mx-auto px-6 pb-28">
        {grouped.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-2xl mb-2" style={{ fontFamily: "var(--font-cormorant), serif", color: "#3a2e24" }}>
              Нічого не знайдено
            </p>
            <p className="text-sm" style={{ color: "#2a2018" }}>Спробуйте змінити запит</p>
          </div>
        ) : (
          grouped.map((cat, i) => (
            <section
              key={cat.id}
              id={cat.id}
              ref={(el) => { sectionRefs.current[cat.id] = el; }}
              className="pt-20"
            >
              <CategorySection
                cat={cat}
                items={cat.items}
                reversed={i % 2 === 1}
              />

              {i < grouped.length - 1 && (
                <div className="mt-16 flex items-center gap-5">
                  <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
                  <span style={{ color: "rgba(196,154,60,0.25)", fontSize: "0.45rem", letterSpacing: "0.5em" }}>✦ ✦ ✦</span>
                  <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
                </div>
              )}
            </section>
          ))
        )}
      </div>

      <style>{`
        .item-row {
          transition: background 0.2s ease;
          border-radius: 3px;
          margin: 0 -8px;
          padding-left: 8px;
          padding-right: 8px;
        }
        .item-row:hover {
          background: rgba(255,255,255,0.025);
        }
        .circle-photo {
          transition: box-shadow 0.4s ease;
        }
        .circle-photo:hover {
          box-shadow: 0 0 0 8px rgba(196,154,60,0.1), 0 20px 60px rgba(0,0,0,0.5) !important;
        }
        .menu-add-btn:hover {
          background: #8b1a2e !important;
          border-color: #8b1a2e !important;
          color: #fff !important;
        }
        @media (max-width: 767px) {
          .flex-col.md\\:flex-row {
            flex-direction: column !important;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}
