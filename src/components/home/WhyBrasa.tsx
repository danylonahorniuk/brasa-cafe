import { Clock, Leaf, ChefHat, Star } from "lucide-react";

const features = [
  {
    icon: Clock,
    value: "45 хв",
    label: "Доставка",
    desc: "Привеземо замовлення гарячим у будь-яку точку міста",
  },
  {
    icon: Leaf,
    value: "Свіжо",
    label: "Щодня",
    desc: "Інгредієнти від локальних постачальників — тільки сезонне",
  },
  {
    icon: ChefHat,
    value: "8+",
    label: "Шеф-кухарів",
    desc: "Команда з досвідом у найкращих ресторанах Києва та Европи",
  },
  {
    icon: Star,
    value: "4.9",
    label: "Рейтинг",
    desc: "Понад 2 400 відгуків — клієнти повертаються знову і знову",
  },
];

export default function WhyBrasa() {
  return (
    <section style={{ background: "#1c1410" }}>
      <style>{`
        .why-card { background: #1c1410; transition: background 0.3s; }
        .why-card:hover { background: #231a14; }
        .why-card .why-line { opacity: 0; transition: opacity 0.5s; }
        .why-card:hover .why-line { opacity: 1; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Заголовок */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="section-label mb-2" style={{ color: "#c49a3c" }}>Чому Brasa</p>
            <h2
              className="text-4xl md:text-5xl text-white"
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, lineHeight: 1.1 }}
            >
              Більше ніж просто їжа
            </h2>
          </div>
          <p
            className="text-sm max-w-xs leading-relaxed md:text-right"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Ми поєднуємо якість та зручність — щоб кожне замовлення стало маленьким святом
          </p>
        </div>

        {/* Картки переваг */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          {features.map((f, i) => (
            <div key={i} className="why-card flex flex-col gap-4 p-8">
              {/* Іконка */}
              <div
                className="w-11 h-11 rounded-sm flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(196,154,60,0.1)", border: "1px solid rgba(196,154,60,0.2)" }}
              >
                <f.icon size={18} color="#c49a3c" strokeWidth={1.5} />
              </div>

              {/* Цифра / значення */}
              <div>
                <span
                  className="block text-5xl leading-none"
                  style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, color: "#c49a3c" }}
                >
                  {f.value}
                </span>
                <span
                  className="block text-[0.65rem] tracking-widest uppercase mt-1"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {f.label}
                </span>
              </div>

              {/* Опис */}
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                {f.desc}
              </p>

              {/* Декоративна лінія знизу */}
              <div
                className="why-line h-px mt-auto"
                style={{ background: "linear-gradient(90deg, #c49a3c, transparent)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
