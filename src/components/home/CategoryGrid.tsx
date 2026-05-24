import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/menu";

export default function CategoryGrid() {
  const [pizza, ...rest] = categories;

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-end justify-between mb-8">
        <h2
          className="text-4xl md:text-5xl"
          style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, color: "#1c1410", lineHeight: 1.1 }}
        >
          Що будемо їсти?
        </h2>
        <Link href="/menu" className="btn-outline hidden md:inline-flex">
          Все меню →
        </Link>
      </div>

      {/* Асиметрична сітка: велика ліво + 3 малі право */}
      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3 h-[420px]">
        {/* Велика ліва */}
        <Link
          href={`/menu?category=${pizza.id}`}
          className="relative col-span-2 row-span-2 rounded-sm overflow-hidden group"
        >
          <Image
            src={pizza.image}
            alt={pizza.label}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="50vw"
          />
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{ background: "linear-gradient(to top, rgba(28,20,16,0.75) 0%, rgba(28,20,16,0.1) 60%, transparent 100%)" }}
          />
          <div className="absolute bottom-0 left-0 p-6">
            <p className="text-white/60 text-xs tracking-widest uppercase mb-1">{pizza.description}</p>
            <h3
              className="text-white text-4xl md:text-5xl"
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300 }}
            >
              {pizza.label}
            </h3>
          </div>
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            style={{ background: "rgba(139,26,46,0.15)" }}
          >
            <span className="btn-primary text-sm">Обрати →</span>
          </div>
        </Link>

        {/* 3 малі справа */}
        {rest.map((cat) => (
          <Link
            key={cat.id}
            href={`/menu?category=${cat.id}`}
            className="relative rounded-sm overflow-hidden group"
          >
            <Image
              src={cat.image}
              alt={cat.label}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="25vw"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(28,20,16,0.7) 0%, rgba(28,20,16,0.05) 60%)" }}
            />
            <div className="absolute bottom-0 left-0 p-4">
              <p className="text-white/55 text-[0.6rem] tracking-widest uppercase mb-0.5">{cat.description}</p>
              <h3
                className="text-white text-2xl"
                style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300 }}
              >
                {cat.label}
              </h3>
            </div>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "rgba(139,26,46,0.18)" }}
            />
          </Link>
        ))}
      </div>

      <Link href="/menu" className="btn-outline mt-5 md:hidden w-full justify-center">
        Все меню →
      </Link>
    </section>
  );
}
