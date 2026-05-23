"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Sparkles } from "lucide-react";
import { menuItems } from "@/data/menu";
import { useCart } from "@/context/CartContext";

const newItems = menuItems.filter((m) => m.isNew);

export default function NewItems() {
  const { add } = useCart();
  const [addedId, setAddedId] = useState<number | null>(null);

  const handleAdd = (item: typeof newItems[0]) => {
    add(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  if (newItems.length === 0) return null;

  return (
    <section style={{ background: "#fff", borderTop: "1px solid #e8ddd4" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="section-label mb-2 flex items-center gap-2">
              <Sparkles size={12} />
              Новинки
            </p>
            <h2
              className="text-4xl md:text-5xl"
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, color: "#1c1410", lineHeight: 1.1 }}
            >
              Щойно в меню
            </h2>
          </div>
          <Link href="/menu" className="btn-outline hidden md:inline-flex">
            Всі страви →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {newItems.map((item, i) => (
            <div
              key={item.id}
              className="group relative rounded-sm overflow-hidden flex"
              style={{
                background: "#faf7f2",
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
              {/* Номер */}
              <div
                className="absolute top-4 left-4 z-10 w-7 h-7 rounded-full flex items-center justify-center text-[0.65rem] font-medium"
                style={{ background: "#8b1a2e", color: "#fff" }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Нова мітка */}
              <div
                className="absolute top-4 right-4 z-10 px-2 py-0.5 text-[0.6rem] tracking-widest uppercase font-medium rounded-[2px] flex items-center gap-1"
                style={{ background: "#c49a3c", color: "#fff" }}
              >
                <Sparkles size={8} /> Нове
              </div>

              {/* Фото */}
              <div className="relative w-36 flex-shrink-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="144px"
                />
              </div>

              {/* Контент */}
              <div className="flex flex-col justify-between p-4 flex-1">
                <div>
                  <p className="text-[0.65rem] tracking-widest uppercase mb-1" style={{ color: "#a09080" }}>
                    {item.category === "pizza" ? "Піца" : item.category === "burgers" ? "Бургер" : item.category === "rolls" ? "Рол" : "Напій"}
                  </p>
                  <h3
                    className="text-xl leading-tight mb-2"
                    style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400, color: "#1c1410" }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "#a09080" }}>
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-medium" style={{ color: "#8b1a2e" }}>{item.price} ₴</span>
                  <button
                    onClick={() => handleAdd(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[0.65rem] tracking-wider uppercase transition-all duration-300"
                    style={{
                      background: addedId === item.id ? "rgba(139,26,46,0.08)" : "#fff",
                      border: `1px solid ${addedId === item.id ? "#8b1a2e" : "#d4c4b8"}`,
                      color: addedId === item.id ? "#8b1a2e" : "#a09080",
                    }}
                  >
                    <ShoppingCart size={12} />
                    {addedId === item.id ? "✓" : "Додати"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
