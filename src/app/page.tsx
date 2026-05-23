import HeroSlider from "@/components/home/HeroSlider";
import PopularDishes from "@/components/home/PopularDishes";
import Link from "next/link";
import { Clock, MapPin, Phone, Star } from "lucide-react";

const stats = [
  { value: "4.9",   label: "Рейтинг Google"    },
  { value: "2400+", label: "Задоволених гостей" },
  { value: "45хв",  label: "Середня доставка"   },
  { value: "3км",   label: "Зона доставки"      },
];

export default function Home() {
  return (
    <>
      <HeroSlider />

      {/* Stats bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e8ddd4", borderTop: "1px solid #e8ddd4" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x" style={{ borderColor: "#e8ddd4" }}>
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center py-7 gap-1">
                <span
                  className="text-2xl md:text-3xl"
                  style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400, color: "#8b1a2e" }}
                >
                  {s.value}
                </span>
                <span className="text-[0.68rem] tracking-wider uppercase" style={{ color: "#a09080" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular dishes */}
      <PopularDishes />

      {/* CTA Banner */}
      <section
        className="mx-6 mb-0 rounded-sm overflow-hidden relative"
        style={{ background: "#1c1410" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(139,26,46,0.25) 0%, transparent 65%)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="section-label mb-3" style={{ color: "#c49a3c" }}>Бронювання</p>
            <h2
              className="text-3xl md:text-4xl text-white"
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, lineHeight: 1.2 }}
            >
              Забронюй столик онлайн<br />
              <em className="not-italic" style={{ color: "#c49a3c" }}>без черги і очікування</em>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <Link href="/booking" className="btn-primary">Забронювати →</Link>
            <a
              href="tel:+380441234567"
              className="px-7 py-3 rounded-sm text-[0.78rem] tracking-widest uppercase text-white border border-white/20 hover:border-white/50 hover:bg-white/5 transition-all flex items-center gap-2"
            >
              <Phone size={15} /> Зателефонувати
            </a>
          </div>
        </div>
      </section>

      {/* Info cards */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: Clock,  title: "Швидка доставка", text: "Доставляємо в межах 3 км від ресторану. Середній час — 40–50 хвилин." },
            { icon: MapPin, title: "Самовивіз −20%",   text: "Забери замовлення сам та отримай знижку 20% від суми замовлення."   },
            { icon: Star,   title: "Щоденні акції",    text: "Бізнес-ланч, нічне комбо, акції до свят — завжди є привід замовити." },
          ].map((card) => (
            <div
              key={card.title}
              className="p-6 rounded-sm"
              style={{ background: "#fff", border: "1px solid #e8ddd4", boxShadow: "0 2px 12px rgba(28,20,16,0.05)" }}
            >
              <div
                className="w-10 h-10 rounded-sm flex items-center justify-center mb-4"
                style={{ background: "rgba(139,26,46,0.08)", border: "1px solid rgba(139,26,46,0.15)" }}
              >
                <card.icon size={18} color="#8b1a2e" />
              </div>
              <h3
                className="text-lg mb-2"
                style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400, color: "#1c1410" }}
              >
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#a09080" }}>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
