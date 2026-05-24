"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { menuItems } from "@/data/menu";
import { useCart } from "@/context/CartContext";

const popular = menuItems.filter((m) => m.popular);

const categoryLabel: Record<string, string> = {
  pizza: "Піца",
  rolls: "Роли",
  burgers: "Бургер",
  alcohol: "Напій",
};

export default function PopularScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { add } = useCart();
  const [addedId, setAddedId] = useState<number | null>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 280 : -280, behavior: "smooth" });
  };

  const handleAdd = (item: typeof popular[0]) => {
    add(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section className="py-16" style={{ background: "#faf7f2" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="section-label mb-2">Популярне</p>
            <h2
              className="text-4xl md:text-5xl"
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, color: "#1c1410", lineHeight: 1.1 }}
            >
              Гості обирають частіше
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            {[{ dir: "left" as const, Icon: ChevronLeft }, { dir: "right" as const, Icon: ChevronRight }].map(({ dir, Icon }) => (
              <button
                key={dir}
                onClick={() => scroll(dir)}
                className="w-10 h-10 rounded-sm flex items-center justify-center transition-all duration-300"
                style={{ border: "1px solid #d4c4b8", color: "#a09080", background: "#fff" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#8b1a2e"; (e.currentTarget as HTMLElement).style.color = "#8b1a2e"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#d4c4b8"; (e.currentTarget as HTMLElement).style.color = "#a09080"; }}
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Скрол */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingLeft: "calc((100vw - 1280px) / 2 + 24px)",
          paddingRight: "24px",
        }}
      >
        {popular.map((item) => (
          <div
            key={item.id}
            className="pop-card group flex-shrink-0 rounded-sm overflow-hidden relative"
            style={{ width: "240px", height: "320px" }}
          >
            {/* Фото — на всю картку */}
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="240px"
            />

            {/* Градієнт знизу */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(12,8,6,0.9) 0%, rgba(12,8,6,0.25) 50%, transparent 75%)" }}
            />

            {/* Бейджі зверху ліворуч */}
            <div className="absolute top-3 left-3 flex gap-1.5 z-10">
              {item.badge && (
                <span className="px-2 py-0.5 text-[0.58rem] tracking-widest uppercase font-medium rounded-[2px]"
                  style={{ background: "#8b1a2e", color: "#fff" }}>
                  {item.badge}
                </span>
              )}
              {item.spicy && (
                <span className="px-2 py-0.5 text-[0.58rem] rounded-[2px] flex items-center gap-1 bg-orange-500 text-white">
                  <Flame size={8} />
                </span>
              )}
            </div>

            {/* Кнопка "Додати" — зверху праворуч, видна тільки при hover */}
            <button
              onClick={() => handleAdd(item)}
              className="pop-add absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: addedId === item.id ? "#8b1a2e" : "rgba(255,255,255,0.15)",
                border: `1px solid ${addedId === item.id ? "#8b1a2e" : "rgba(255,255,255,0.35)"}`,
                backdropFilter: "blur(4px)",
                color: "#fff",
              }}
            >
              {addedId === item.id
                ? <span style={{ fontSize: "0.75rem" }}>✓</span>
                : <ShoppingCart size={13} />}
            </button>

            {/* Контент знизу */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
              <p className="text-[0.58rem] tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                {categoryLabel[item.category]}
              </p>
              <h3
                className="text-lg leading-snug mb-2"
                style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400, color: "#fff" }}
              >
                {item.name}
              </h3>
              <div className="flex items-center justify-between">
                <span className="font-medium" style={{ color: "#c49a3c", fontSize: "1.05rem" }}>
                  {item.price} ₴
                </span>
                {item.weight && (
                  <span className="text-[0.62rem]" style={{ color: "rgba(255,255,255,0.35)" }}>{item.weight}</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* "Все меню" в кінці */}
        <Link
          href="/menu"
          className="flex-shrink-0 w-44 rounded-sm flex flex-col items-center justify-center gap-3 transition-all duration-300"
          style={{ border: "1.5px dashed #d4c4b8", color: "#a09080" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#8b1a2e"; (e.currentTarget as HTMLElement).style.color = "#8b1a2e"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#d4c4b8"; (e.currentTarget as HTMLElement).style.color = "#a09080"; }}
        >
          <span className="text-3xl">→</span>
          <span className="text-[0.7rem] tracking-widest uppercase">Все меню</span>
        </Link>
      </div>

      <style>{`
        .pop-card .pop-add {
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.35s ease, transform 0.35s ease, background 0.3s;
        }
        .pop-card:hover .pop-add {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>
    </section>
  );
}
