"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { ShoppingCart, Flame, Search, Minus, Plus } from "lucide-react";
import { menuItems, categories, type Category } from "@/data/menu";
import { useCart } from "@/context/CartContext";

const categoryLabel: Record<string, string> = {
  pizza: "Піца",
  rolls: "Роли",
  burgers: "Бургер",
  alcohol: "Напій",
};

function DishCard({ item }: { item: typeof menuItems[0] }) {
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
    setTimeout(() => { setAdded(false); setQty(1); }, 1400);
  };

  return (
    <div
      className="dish-card group flex flex-col rounded-sm overflow-hidden"
      style={{ background: "#fff", border: "1px solid #e8ddd4" }}
    >
      {/* Фото */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: "200px", background: "#f5f0eb" }}>
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Бейджі */}
        <div className="absolute top-2.5 left-2.5 flex gap-1.5 z-10">
          {item.badge && (
            <span className="px-2 py-0.5 text-[0.55rem] tracking-widest uppercase font-medium rounded-[2px]"
              style={{ background: "#8b1a2e", color: "#fff" }}>
              {item.badge}
            </span>
          )}
          {item.isNew && (
            <span className="px-2 py-0.5 text-[0.55rem] tracking-widest uppercase font-medium rounded-[2px]"
              style={{ background: "#c49a3c", color: "#fff" }}>
              Нове
            </span>
          )}
          {item.spicy && (
            <span className="px-1.5 py-0.5 rounded-[2px] flex items-center bg-orange-500 text-white">
              <Flame size={8} />
            </span>
          )}
        </div>

        {/* Вага */}
        {item.weight && (
          <span className="absolute bottom-2 right-2 z-10 px-2 py-0.5 text-[0.58rem] rounded-[2px]"
            style={{ background: "rgba(12,8,6,0.5)", color: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)" }}>
            {item.weight}
          </span>
        )}
      </div>

      {/* Контент */}
      <div className="flex flex-col flex-1 p-4">
        <p className="text-[0.58rem] tracking-widest uppercase mb-1" style={{ color: "#a09080" }}>
          {categoryLabel[item.category]}
        </p>
        <h3
          className="text-xl leading-snug mb-2"
          style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400, color: "#1c1410" }}
        >
          {item.name}
        </h3>
        <p className="text-[0.72rem] leading-relaxed line-clamp-3 mb-auto" style={{ color: "#7a6a5e" }}>
          {item.description}
        </p>

        {/* Вибір розміру — тільки для піци */}
        {hasSize && (
          <div className="flex gap-2 mt-3">
            {(["30", "40"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className="flex-1 py-1.5 rounded-sm text-[0.65rem] tracking-wider uppercase transition-all duration-200"
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

        {/* Ціна + кількість + кнопка */}
        <div className="flex items-center gap-3 mt-4 pt-4" style={{ borderTop: "1px solid #f0e8e0" }}>
          <span className="text-lg font-medium flex-shrink-0" style={{ color: "#c49a3c" }}>
            {currentPrice} ₴
          </span>

          {/* Лічильник */}
          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-7 h-7 rounded-sm flex items-center justify-center transition-all duration-200"
              style={{ border: "1px solid #d4c4b8", color: "#7a6a5e", background: "#faf7f2" }}
            >
              <Minus size={10} />
            </button>
            <span className="w-7 text-center text-sm font-medium" style={{ color: "#1c1410" }}>{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-7 h-7 rounded-sm flex items-center justify-center transition-all duration-200"
              style={{ border: "1px solid #d4c4b8", color: "#7a6a5e", background: "#faf7f2" }}
            >
              <Plus size={10} />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="dish-add-btn flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[0.6rem] tracking-wider uppercase transition-all duration-300 flex-shrink-0"
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

export default function MenuPage() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("category") as Category) || "all";
  const [activeCategory, setActiveCategory] = useState<Category | "all">(initialCategory);
  const [search, setSearch] = useState("");

  const filtered = menuItems.filter((item) => {
    const matchCat = activeCategory === "all" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="pt-20" style={{ background: "#faf7f2" }}>
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h1
            className="text-5xl md:text-6xl"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, lineHeight: 1.05, color: "#1c1410" }}
          >
            Наше меню
          </h1>
          <div className="relative w-full md:w-72">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#c4b4a8" }} />
            <input
              type="text"
              placeholder="Пошук страви..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-sm outline-none transition-colors"
              style={{ background: "#fff", border: "1px solid #e8ddd4", color: "#1c1410" }}
            />
          </div>
        </div>
      </div>

      <div className="divider-warm mx-6" />

      {/* Фільтри */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className="px-5 py-2 text-[0.72rem] tracking-wider uppercase rounded-sm transition-all duration-200"
            style={{
              background: activeCategory === "all" ? "#8b1a2e" : "#fff",
              color: activeCategory === "all" ? "#fff" : "#7a6a5e",
              border: `1px solid ${activeCategory === "all" ? "#8b1a2e" : "#d4c4b8"}`,
            }}
          >
            Все меню
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as Category)}
              className="px-5 py-2 text-[0.72rem] tracking-wider uppercase rounded-sm transition-all duration-200 flex items-center gap-2"
              style={{
                background: activeCategory === cat.id ? "#8b1a2e" : "#fff",
                color: activeCategory === cat.id ? "#fff" : "#7a6a5e",
                border: `1px solid ${activeCategory === cat.id ? "#8b1a2e" : "#d4c4b8"}`,
              }}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Картки */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-24" style={{ color: "#c4b4a8" }}>
            <p className="text-2xl mb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>Нічого не знайдено</p>
            <p className="text-sm">Спробуйте змінити запит</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((item) => <DishCard key={item.id} item={item} />)}
          </div>
        )}
      </div>

      <style>{`
        .dish-card {
          transition: box-shadow 0.4s ease, border-color 0.4s ease, transform 0.4s ease;
        }
        .dish-card:hover {
          box-shadow: 0 8px 28px rgba(28,20,16,0.1);
          border-color: rgba(139,26,46,0.18);
          transform: translateY(-2px);
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
