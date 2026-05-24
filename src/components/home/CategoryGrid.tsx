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

      {/* Сітка: велика ліво + 2×2 право */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3" style={{ gridTemplateRows: "220px 220px" }}>

        {/* Велика ліва — займає 2 рядки */}
        <Link
          href={`/menu?category=${pizza.id}`}
          className="cat-card relative col-span-1 row-span-2 rounded-sm overflow-hidden flex flex-col justify-between p-6"
          style={{ background: "#f5f0eb", border: "1px solid #e8ddd4" }}
        >
          <h3
            className="text-5xl md:text-6xl leading-none z-10 relative"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, color: "#1c1410" }}
          >
            {pizza.label}
          </h3>
          <p className="text-[0.62rem] tracking-widest uppercase z-10 relative" style={{ color: "#a09080" }}>
            {pizza.description}
          </p>
          <div className="absolute bottom-0 right-0 w-4/5 h-4/5">
            <Image
              src={pizza.image}
              alt={pizza.label}
              fill
              className="object-cover object-center transition-transform duration-700 cat-card-img"
              style={{ maskImage: "linear-gradient(to top left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)" }}
              sizes="33vw"
            />
          </div>
          <div className="cat-hover-overlay absolute inset-0 rounded-sm" style={{ border: "2px solid transparent" }} />
        </Link>

        {/* 3 малі — 2 колонки × 2 рядки */}
        {rest.map((cat) => (
          <Link
            key={cat.id}
            href={`/menu?category=${cat.id}`}
            className="cat-card relative rounded-sm overflow-hidden flex flex-col justify-between p-5"
            style={{ background: "#f5f0eb", border: "1px solid #e8ddd4" }}
          >
            <h3
              className="text-3xl md:text-4xl leading-none z-10 relative"
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, color: "#1c1410" }}
            >
              {cat.label}
            </h3>
            <p className="text-[0.58rem] tracking-widest uppercase z-10 relative" style={{ color: "#a09080" }}>
              {cat.description}
            </p>
            <div className="absolute bottom-0 right-0 w-3/4 h-3/4">
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover object-center transition-transform duration-700 cat-card-img"
                style={{ maskImage: "linear-gradient(to top left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)" }}
                sizes="22vw"
              />
            </div>
            <div className="cat-hover-overlay absolute inset-0 rounded-sm" style={{ border: "2px solid transparent" }} />
          </Link>
        ))}
      </div>

      <Link href="/menu" className="btn-outline mt-5 md:hidden w-full justify-center">
        Все меню →
      </Link>

      <style>{`
        .cat-card {
          transition: box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .cat-card:hover {
          box-shadow: 0 8px 32px rgba(28,20,16,0.1);
          border-color: rgba(139,26,46,0.25);
        }
        .cat-card:hover .cat-card-img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
