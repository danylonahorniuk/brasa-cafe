"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart, Flame, Search } from "lucide-react";
import { menuItems, categories, type Category } from "@/data/menu";
import { useCart } from "@/context/CartContext";

function DishCard({ item }: { item: typeof menuItems[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const onMove = (e: MouseEvent) => {
      const r  = card.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      card.style.transform = `perspective(700px) rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg) translateZ(4px)`;
    };
    const onLeave = () => { card.style.transform = "perspective(700px) rotateY(0) rotateX(0) translateZ(0)"; };
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => { card.removeEventListener("mousemove", onMove); card.removeEventListener("mouseleave", onLeave); };
  }, []);

  const handleAdd = () => { add(item); setAdded(true); setTimeout(() => setAdded(false), 1200); };

  return (
    <div
      ref={cardRef}
      className="group relative rounded-sm overflow-hidden"
      style={{
        background: "#fff",
        border: "1px solid #e8ddd4",
        boxShadow: "0 2px 10px rgba(28,20,16,0.05)",
        transformStyle: "preserve-3d",
        willChange: "transform",
        transition: "box-shadow 0.3s, border-color 0.3s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 36px rgba(28,20,16,0.1)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(139,26,46,0.2)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 10px rgba(28,20,16,0.05)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "#e8ddd4";
      }}
    >
      <div className="relative h-44 overflow-hidden">
        <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 25vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {item.badge && (
            <span className="px-2 py-0.5 text-[0.6rem] tracking-widest uppercase font-medium rounded-[2px] bg-[#8b1a2e] text-white">{item.badge}</span>
          )}
          {item.spicy && (
            <span className="px-2 py-0.5 text-[0.6rem] tracking-widest uppercase rounded-[2px] flex items-center gap-1 bg-orange-500 text-white">
              <Flame size={8} /> Гостре
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-base" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400, color: "#1c1410" }}>{item.name}</h3>
        <p className="text-[0.72rem] mt-1 leading-relaxed line-clamp-2" style={{ color: "#a09080" }}>{item.description}</p>
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="font-medium" style={{ color: "#8b1a2e" }}>{item.price} ₴</span>
            {item.weight && <span className="text-xs ml-2" style={{ color: "#c4b4a8" }}>{item.weight}</span>}
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[0.65rem] tracking-wider uppercase transition-all duration-300"
            style={{
              background: added ? "rgba(139,26,46,0.08)" : "transparent",
              border: `1px solid ${added ? "#8b1a2e" : "#d4c4b8"}`,
              color: added ? "#8b1a2e" : "#a09080",
            }}
          >
            <ShoppingCart size={11} />
            {added ? "✓" : "Додати"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = menuItems.filter((item) => {
    const matchCat = activeCategory === "all" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="pt-20" style={{ background: "#faf7f2" }}>
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <p className="section-label mb-3">Меню</p>
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
              style={{
                background: "#fff",
                border: "1px solid #e8ddd4",
                color: "#1c1410",
              }}
            />
          </div>
        </div>
      </div>

      <div className="divider-warm mx-6" />

      {/* Filters */}
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
    </div>
  );
}
