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
  drinks: "Напій",
};

function PopCard({ item }: { item: typeof popular[0] }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [size, setSize] = useState<"30" | "40">("30");

  const hasSizes = item.category === "pizza" && !!item.sizes;
  const currentPrice = hasSizes ? item.sizes![size] : item.price;
  const cartKey = hasSizes ? `${item.id}-${size}` : `${item.id}`;
  const displayWeight = hasSizes && item.weight?.includes(" / ")
    ? item.weight.split(" / ")[size === "30" ? 0 : 1]
    : item.weight;

  const handleAdd = () => {
    add(item, cartKey, hasSizes ? `${size} см` : undefined, currentPrice);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div
      className="pop-card group flex-shrink-0 flex flex-col rounded-sm overflow-hidden"
      style={{
        width: "clamp(200px, 68vw, 250px)",
        background: "#fff",
        border: "1px solid #e8ddd4",
        scrollSnapAlign: "start",
      }}
    >
      {/* Фото */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3", background: "#f5f0eb" }}>
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: item.imagePosition ?? "center" }}
          sizes="(max-width: 640px) 68vw, 250px"
        />

        {/* Бейджі */}
        <div className="absolute top-2.5 left-2.5 flex gap-1.5 z-10">
          {item.badge && (
            <span
              className="px-2 py-0.5 text-[0.55rem] tracking-widest uppercase font-medium rounded-[2px]"
              style={{ background: "#8b1a2e", color: "#fff" }}
            >
              {item.badge}
            </span>
          )}
          {item.spicy && (
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #ff8c42 0%, #e63312 100%)", boxShadow: "0 2px 8px rgba(230,80,18,0.45)" }}
            >
              <Flame size={9} color="#fff" />
            </span>
          )}
        </div>

        {/* Вага */}
        {displayWeight && (
          <span
            className="absolute bottom-2 right-2 z-10 px-2 py-0.5 text-[0.58rem] rounded-[2px]"
            style={{ background: "rgba(12,8,6,0.5)", color: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)" }}
          >
            {displayWeight}
          </span>
        )}
      </div>

      {/* Контент */}
      <div className="flex flex-col flex-1 p-3.5 sm:p-4">
        <p className="text-[0.55rem] tracking-widest uppercase mb-1" style={{ color: "#a09080" }}>
          {categoryLabel[item.category]}
        </p>
        <h3
          className="text-base sm:text-lg leading-snug mb-1"
          style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400, color: "#1c1410" }}
        >
          {item.name}
        </h3>
        <p className="text-[0.65rem] leading-relaxed mb-auto line-clamp-2" style={{ color: "#a09080" }}>
          {item.description}
        </p>

        {/* Розміри піци */}
        {hasSizes && (
          <div className="flex p-0.5 rounded-sm mt-3" style={{ background: "#e8e0d8" }}>
            {(["30", "40"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className="flex-1 py-1.5 rounded-sm text-[0.58rem] tracking-wider uppercase transition-all duration-200"
                style={{
                  background: size === s ? "#fff" : "transparent",
                  color:      size === s ? "#1c1410" : "#a09080",
                  boxShadow:  size === s ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                }}
              >
                {s} см
              </button>
            ))}
          </div>
        )}

        {/* Ціна + кнопка */}
        <div
          className="flex items-center justify-between mt-3 pt-3"
          style={{ borderTop: "1px solid #f0e8e0" }}
        >
          <span className="text-lg font-medium" style={{ color: "#c49a3c" }}>
            {currentPrice} ₴
          </span>
          <button
            onClick={handleAdd}
            className="pop-add-btn flex items-center gap-1.5 px-3.5 py-2 rounded-sm text-[0.6rem] tracking-wider uppercase transition-all duration-300"
            style={{
              background: "#8b1a2e",
              border: "1px solid #8b1a2e",
              color: "#fff",
            }}
          >
            {added ? <span style={{ fontSize: "0.7rem" }}>✓</span> : <ShoppingCart size={12} />}
            {added ? "Додано" : "В кошик"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PopularScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 270 : -270, behavior: "smooth" });
  };

  return (
    <section className="py-12 sm:py-16" style={{ background: "#fff" }}>
      {/* Заголовок */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <h2
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, color: "#1c1410", lineHeight: 1.1 }}
          >
            Гості обирають частіше
          </h2>
          <div className="hidden md:flex gap-2">
            {[{ dir: "left" as const, Icon: ChevronLeft }, { dir: "right" as const, Icon: ChevronRight }].map(({ dir, Icon }) => (
              <button
                key={dir}
                onClick={() => scroll(dir)}
                className="pop-arrow w-10 h-10 rounded-sm flex items-center justify-center transition-all duration-300"
                style={{ border: "1px solid #d4c4b8", color: "#a09080", background: "#fff" }}
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
        className="pop-scroll flex gap-3 sm:gap-4 overflow-x-auto pb-4 pl-5 pr-5 xl:pl-[calc((100vw_-_1280px)_/_2_+_24px)] xl:pr-6"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          overscrollBehaviorX: "contain",
          scrollSnapType: "x mandatory",
        }}
      >
        {popular.map((item) => (
          <PopCard key={item.id} item={item} />
        ))}

        {/* Все меню */}
        <Link
          href="/menu"
          className="pop-menu-link flex-shrink-0 w-36 sm:w-44 rounded-sm flex flex-col items-center justify-center gap-3 transition-all duration-300"
          style={{
            border: "1.5px dashed #d4c4b8",
            color: "#a09080",
            scrollSnapAlign: "start",
            minHeight: "160px",
          }}
        >
          <span className="text-3xl">→</span>
          <span className="text-[0.7rem] tracking-widest uppercase">Все меню</span>
        </Link>
      </div>

      <style>{`
        /* Hover — тільки мишка */
        @media (hover: hover) and (pointer: fine) {
          .pop-card {
            transition: box-shadow 0.4s ease, border-color 0.4s ease, transform 0.4s ease;
          }
          .pop-card:hover {
            box-shadow: 0 8px 28px rgba(28,20,16,0.1);
            border-color: rgba(139,26,46,0.18);
            transform: translateY(-2px);
          }
          .pop-add-btn:hover {
            background: #8b1a2e !important;
            border-color: #8b1a2e !important;
            color: #fff !important;
          }
          .pop-arrow:hover {
            border-color: #8b1a2e !important;
            color: #8b1a2e !important;
          }
          .pop-menu-link:hover {
            border-color: #8b1a2e !important;
            color: #8b1a2e !important;
          }
        }

        /* Активний стан для тач */
        @media (hover: none) {
          .pop-card:active {
            border-color: rgba(139,26,46,0.25);
          }
          .pop-add-btn:active {
            background: #8b1a2e !important;
            border-color: #8b1a2e !important;
            color: #fff !important;
          }
        }
      `}</style>
    </section>
  );
}
