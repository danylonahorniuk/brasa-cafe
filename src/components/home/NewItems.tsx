"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Flame, Sparkles } from "lucide-react";
import { menuItems } from "@/data/menu";
import { useCart } from "@/context/CartContext";

const newItems = menuItems.filter((m) => m.isNew);

const categoryLabel: Record<string, string> = {
  pizza: "Піца",
  rolls: "Роли",
  burgers: "Бургер",
  alcohol: "Напій",
  drinks: "Напій",
};

function NewItemCard({ item }: { item: typeof newItems[0] }) {
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
      className="new-card group flex flex-col rounded-sm overflow-hidden"
      style={{ background: "#fff", border: "1px solid #e8ddd4" }}
    >
      {/* Фото — aspect-ratio для пропорційного кадрування */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9", background: "#f5f0eb" }}>
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: item.imagePosition ?? "center" }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* Бейджі */}
        <div className="absolute top-2.5 left-2.5 flex gap-1.5 z-10">
          <span
            className="px-2 py-0.5 text-[0.55rem] tracking-widest uppercase font-medium rounded-[2px] flex items-center gap-1"
            style={{ background: "#c49a3c", color: "#fff" }}
          >
            <Sparkles size={7} /> Нове
          </span>
          {item.badge && (
            <span
              className="px-2 py-0.5 text-[0.55rem] tracking-widest uppercase font-medium rounded-[2px]"
              style={{ background: "#8b1a2e", color: "#fff" }}
            >
              {item.badge}
            </span>
          )}
          {item.spicy && (
            <span className="px-1.5 py-0.5 rounded-[2px] flex items-center bg-orange-500 text-white">
              <Flame size={8} />
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
      <div className="flex flex-col flex-1 p-4">
        <p className="text-[0.58rem] tracking-widest uppercase mb-1" style={{ color: "#a09080" }}>
          {categoryLabel[item.category]}
        </p>
        <h3
          className="text-xl leading-snug mb-1"
          style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400, color: "#1c1410" }}
        >
          {item.name}
        </h3>
        <p
          className="text-[0.65rem] leading-relaxed mb-auto line-clamp-2"
          style={{ color: "#a09080" }}
        >
          {item.description}
        </p>

        {/* Вибір розміру для піци */}
        {hasSizes && (
          <div className="flex gap-2 mt-3">
            {(["30", "40"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className="flex-1 py-1.5 rounded-sm text-[0.62rem] tracking-wider uppercase transition-all duration-200"
                style={{
                  background: size === s ? "#1c1410" : "#faf7f2",
                  color: size === s ? "#fff" : "#7a6a5e",
                  border: `1px solid ${size === s ? "#1c1410" : "#d4c4b8"}`,
                }}
              >
                {s} см
              </button>
            ))}
          </div>
        )}

        {/* Ціна + кнопка */}
        <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: "1px solid #f0e8e0" }}>
          <span className="text-lg font-medium" style={{ color: "#c49a3c" }}>
            {currentPrice} ₴
          </span>
          <button
            onClick={handleAdd}
            className="new-add-btn flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[0.6rem] tracking-wider uppercase transition-all duration-300"
            style={{
              background: added ? "#8b1a2e" : "#faf7f2",
              border: `1px solid ${added ? "#8b1a2e" : "#d4c4b8"}`,
              color: added ? "#fff" : "#7a6a5e",
            }}
          >
            {added ? <span style={{ fontSize: "0.7rem" }}>✓</span> : <ShoppingCart size={11} />}
            {added ? "Додано" : "В кошик"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NewItems() {
  if (newItems.length === 0) return null;

  return (
    <section style={{ background: "#f5f1ec", borderTop: "1px solid #e8ddd4" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Заголовок */}
        <div className="flex items-end justify-between mb-10">
          <h2
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, color: "#1c1410", lineHeight: 1.1 }}
          >
            Щойно в меню
          </h2>
          <Link
            href="/menu"
            className="hidden md:flex items-center gap-2 text-[0.68rem] tracking-widest uppercase transition-all duration-300"
            style={{ color: "#a09080" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#8b1a2e")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#a09080")}
          >
            Всі страви →
          </Link>
        </div>

        {/* Картки */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {newItems.map((item) => (
            <NewItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <style>{`
        .new-card {
          transition: box-shadow 0.4s ease, border-color 0.4s ease, transform 0.4s ease;
        }
        .new-card:hover {
          box-shadow: 0 8px 28px rgba(28,20,16,0.1);
          border-color: rgba(139,26,46,0.18);
          transform: translateY(-2px);
        }
        .new-add-btn:hover {
          background: #8b1a2e !important;
          border-color: #8b1a2e !important;
          color: #fff !important;
        }
      `}</style>
    </section>
  );
}
