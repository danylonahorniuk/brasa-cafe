"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { menuItems } from "@/data/menu";
import { useCart } from "@/context/CartContext";

const popular = menuItems.filter((m) => m.popular);

export default function PopularScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { add } = useCart();
  const [addedId, setAddedId] = useState<number | null>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
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

          {/* Стрілки */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-sm flex items-center justify-center transition-all"
              style={{ border: "1px solid #d4c4b8", color: "#a09080", background: "#fff" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#8b1a2e"; (e.currentTarget as HTMLElement).style.color = "#8b1a2e"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#d4c4b8"; (e.currentTarget as HTMLElement).style.color = "#a09080"; }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-sm flex items-center justify-center transition-all"
              style={{ border: "1px solid #d4c4b8", color: "#a09080", background: "#fff" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#8b1a2e"; (e.currentTarget as HTMLElement).style.color = "#8b1a2e"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#d4c4b8"; (e.currentTarget as HTMLElement).style.color = "#a09080"; }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Горизонтальний скрол */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 px-6 scroll-smooth"
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
            className="group flex-shrink-0 rounded-sm overflow-hidden"
            style={{
              width: "280px",
              background: "#fff",
              border: "1px solid #e8ddd4",
              boxShadow: "0 2px 12px rgba(28,20,16,0.05)",
              transition: "box-shadow 0.3s, border-color 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(28,20,16,0.1)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,26,46,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(28,20,16,0.05)";
              (e.currentTarget as HTMLElement).style.borderColor = "#e8ddd4";
            }}
          >
            {/* Фото */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-600 group-hover:scale-110"
                sizes="280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              {item.badge && (
                <span
                  className="absolute top-3 left-3 px-2 py-0.5 text-[0.6rem] tracking-widest uppercase font-medium rounded-[2px]"
                  style={{ background: "#8b1a2e", color: "#fff" }}
                >
                  {item.badge}
                </span>
              )}
              {item.spicy && (
                <span className="absolute top-3 right-3 px-2 py-0.5 text-[0.6rem] tracking-widest uppercase rounded-[2px] flex items-center gap-1 bg-orange-500 text-white">
                  <Flame size={8} />
                </span>
              )}
            </div>

            {/* Контент */}
            <div className="p-4">
              <h3
                className="text-xl mb-1"
                style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400, color: "#1c1410" }}
              >
                {item.name}
              </h3>
              <p className="text-xs leading-relaxed line-clamp-2 mb-4" style={{ color: "#a09080" }}>
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-medium" style={{ color: "#8b1a2e" }}>{item.price} ₴</span>
                  {item.weight && <span className="text-xs ml-1.5" style={{ color: "#c4b4a8" }}>{item.weight}</span>}
                </div>
                <button
                  onClick={() => handleAdd(item)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-sm text-[0.68rem] tracking-wider uppercase transition-all duration-300"
                  style={{
                    background: addedId === item.id ? "rgba(139,26,46,0.08)" : "transparent",
                    border: `1px solid ${addedId === item.id ? "#8b1a2e" : "#d4c4b8"}`,
                    color: addedId === item.id ? "#8b1a2e" : "#a09080",
                  }}
                >
                  <ShoppingCart size={13} />
                  {addedId === item.id ? "Додано" : "Додати"}
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Посилання "Всі" в кінці */}
        <Link
          href="/menu"
          className="flex-shrink-0 w-48 rounded-sm flex flex-col items-center justify-center gap-3 transition-all"
          style={{ border: "1.5px dashed #d4c4b8", color: "#a09080" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#8b1a2e"; (e.currentTarget as HTMLElement).style.color = "#8b1a2e"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#d4c4b8"; (e.currentTarget as HTMLElement).style.color = "#a09080"; }}
        >
          <span className="text-3xl">→</span>
          <span className="text-[0.72rem] tracking-widest uppercase">Все меню</span>
        </Link>
      </div>
    </section>
  );
}
