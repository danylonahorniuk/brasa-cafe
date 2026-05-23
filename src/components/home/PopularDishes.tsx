"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart, Flame } from "lucide-react";
import { menuItems } from "@/data/menu";
import { useCart } from "@/context/CartContext";

const popular = menuItems.filter((m) => m.popular);

function DishCard({ item }: { item: typeof popular[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const onMove = (e: MouseEvent) => {
      const r  = card.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
      const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
      card.style.transform = `perspective(700px) rotateY(${dx * 7}deg) rotateX(${-dy * 7}deg) translateZ(6px)`;
    };
    const onLeave = () => {
      card.style.transform = "perspective(700px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
    };
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => { card.removeEventListener("mousemove", onMove); card.removeEventListener("mouseleave", onLeave); };
  }, []);

  const handleAdd = () => {
    add(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div
      ref={cardRef}
      className="group relative rounded-sm overflow-hidden"
      style={{
        background: "#fff",
        border: "1px solid #e8ddd4",
        boxShadow: "0 2px 12px rgba(28,20,16,0.06)",
        transformStyle: "preserve-3d",
        willChange: "transform",
        transition: "box-shadow 0.3s, border-color 0.3s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(28,20,16,0.12)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(139,26,46,0.2)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(28,20,16,0.06)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "#e8ddd4";
      }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-108"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {item.badge && (
            <span className="px-2 py-0.5 text-[0.62rem] tracking-widest uppercase font-medium rounded-[2px] bg-[#8b1a2e] text-white">
              {item.badge}
            </span>
          )}
          {item.spicy && (
            <span className="px-2 py-0.5 text-[0.62rem] tracking-widest uppercase rounded-[2px] flex items-center gap-1 bg-orange-500 text-white">
              <Flame size={9} /> Гостре
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3
          className="text-lg"
          style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400, color: "#1c1410" }}
        >
          {item.name}
        </h3>
        <p className="text-xs mt-1 leading-relaxed line-clamp-2" style={{ color: "#a09080" }}>
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-lg font-medium" style={{ color: "#8b1a2e" }}>{item.price} ₴</span>
            {item.weight && <span className="text-xs ml-2" style={{ color: "#c4b4a8" }}>{item.weight}</span>}
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 px-3 py-2 rounded-sm text-[0.68rem] tracking-wider uppercase transition-all duration-300"
            style={{
              background: added ? "rgba(139,26,46,0.08)" : "transparent",
              border: `1px solid ${added ? "#8b1a2e" : "#d4c4b8"}`,
              color: added ? "#8b1a2e" : "#a09080",
            }}
          >
            <ShoppingCart size={13} />
            {added ? "Додано!" : "Додати"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PopularDishes() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <p className="section-label mb-3">Популярне</p>
          <h2
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, lineHeight: 1.1, color: "#1c1410" }}
          >
            Гості обирають частіше
          </h2>
        </div>
        <a href="/menu" className="btn-outline self-start md:self-auto whitespace-nowrap">
          Все меню →
        </a>
      </div>

      <div className="divider-warm mb-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {popular.map((item) => (
          <DishCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
