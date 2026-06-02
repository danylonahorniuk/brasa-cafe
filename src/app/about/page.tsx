import Image from "next/image";
import Link from "next/link";

const principles = [
  {
    label: "Живий вогонь",
    fact: "Кожна піца — на дровах при 450°C. Тісто дозріває 48 годин.",
  },
  {
    label: "Локальна сировина",
    fact: "Постачальники з Київщини та Карпат. Меню змінюється під сезон.",
  },
  {
    label: "Гарантія доставки",
    fact: "Якщо спізнились більше 60 хв — наступне замовлення безкоштовно.",
  },
];

const stats = [
  { value: "2020", label: "рік відкриття" },
  { value: "3", label: "локації в Києві" },
  { value: "36", label: "страв у меню" },
];

export default function AboutPage() {
  return (
    <div className="pt-20" style={{ background: "#faf7f2" }}>

      {/* ── Hero ── */}
      <section className="relative h-[65vh] min-h-[440px] overflow-hidden flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80"
          alt="Brasa — атмосфера"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(28,20,16,0.92) 0%, rgba(28,20,16,0.4) 55%, rgba(28,20,16,0.1) 100%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-14 w-full">
          <p
            className="section-label mb-4"
            style={{ color: "#c49a3c", letterSpacing: "0.2em" }}
          >
            Brasa
          </p>
          <h1
            className="text-5xl md:text-7xl text-white"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 300,
              lineHeight: 1.05,
              maxWidth: 600,
            }}
          >
            Жар, який<br />
            змінює смак
          </h1>
        </div>
      </section>

      {/* ── Brasa = жар ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <div>
            <p
              className="section-label mb-4"
              style={{ color: "#c49a3c" }}
            >
              Про заклад
            </p>
            <h2
              className="text-4xl md:text-5xl mb-8"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 300,
                color: "#1c1410",
                lineHeight: 1.1,
              }}
            >
              Назва — це<br />наша філософія
            </h2>
            <p
              className="text-lg leading-relaxed mb-5"
              style={{ color: "#5a4a3e" }}
            >
              <em style={{ color: "#8b1a2e", fontStyle: "normal", fontWeight: 500 }}>Brasa</em> — іспанське слово для жару і розпеченого вугілля. Повільне горіння, яке перетворює прості інгредієнти на щось особливе.
            </p>
            <p
              className="leading-relaxed"
              style={{ color: "#7a6a5e", fontSize: "0.95rem" }}
            >
              Ми не готуємо швидко — ми готуємо правильно. Дров'яна піч, сезонна сировина, рецептури без компромісів. Три точки в Києві, один підхід до їжі.
            </p>
          </div>

          {/* Image */}
          <div
            className="relative overflow-hidden"
            style={{
              height: 420,
              border: "1px solid #e8ddd4",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
              alt="Кухня Brasa"
              fill
              className="object-cover"
            />
            {/* subtle gold corner accent */}
            <div
              className="absolute top-0 left-0 w-12 h-12"
              style={{
                borderTop: "2px solid #c49a3c",
                borderLeft: "2px solid #c49a3c",
              }}
            />
            <div
              className="absolute bottom-0 right-0 w-12 h-12"
              style={{
                borderBottom: "2px solid #c49a3c",
                borderRight: "2px solid #c49a3c",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section style={{ background: "#1c1410" }}>
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-3 gap-0">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="text-center"
                style={{
                  borderRight: i < stats.length - 1 ? "1px solid rgba(196,154,60,0.2)" : "none",
                  padding: "0 2rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    fontWeight: 300,
                    color: "#c49a3c",
                    lineHeight: 1,
                    marginBottom: "0.5rem",
                  }}
                >
                  {s.value}
                </p>
                <p
                  style={{
                    color: "rgba(250,247,242,0.5)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Principles ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <p className="section-label mb-3" style={{ color: "#c49a3c" }}>
          Як ми працюємо
        </p>
        <h2
          className="text-4xl mb-14"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 300,
            color: "#1c1410",
          }}
        >
          Три речі, які не змінюються
        </h2>

        <div className="flex flex-col gap-0" style={{ borderTop: "1px solid #e8ddd4" }}>
          {principles.map((p, i) => (
            <div
              key={p.label}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10"
              style={{
                borderBottom: "1px solid #e8ddd4",
                paddingLeft: "1.5rem",
                borderLeft: "3px solid #c49a3c",
              }}
            >
              <div className="flex items-start gap-4">
                <span
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "0.85rem",
                    color: "#c49a3c",
                    fontWeight: 400,
                    minWidth: 24,
                    paddingTop: "0.15rem",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="text-2xl"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 400,
                    color: "#1c1410",
                  }}
                >
                  {p.label}
                </h3>
              </div>
              <p
                className="leading-relaxed"
                style={{ color: "#7a6a5e", fontSize: "0.95rem" }}
              >
                {p.fact}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#1a1208" }}
      >
        {/* decorative gold line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, #c49a3c, transparent)" }}
        />
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <p
            className="section-label mb-4"
            style={{ color: "#c49a3c" }}
          >
            Переконайтесь самі
          </p>
          <h2
            className="text-4xl md:text-5xl text-white mb-10"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 300,
              lineHeight: 1.1,
            }}
          >
            Слова — це добре.<br />Смак — краще.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/menu" className="btn-primary">
              Переглянути меню
            </Link>
            <Link
              href="/booking"
              className="btn-secondary"
              style={{ borderColor: "rgba(196,154,60,0.4)", color: "#faf7f2" }}
            >
              Забронювати стіл
            </Link>
          </div>
        </div>
        {/* decorative bottom line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, #c49a3c, transparent)" }}
        />
      </section>

    </div>
  );
}
