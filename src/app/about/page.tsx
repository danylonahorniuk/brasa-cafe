import Image from "next/image";
import Link from "next/link";

const principles = [
  {
    num: "01",
    label: "Живий вогонь",
    text: "Дров'яна піч при 450°C. Тісто дозріває 48 годин — поспіху немає.",
  },
  {
    num: "02",
    label: "Локальна сировина",
    text: "Постачальники з Київщини та Карпат. Меню слідує сезону.",
  },
  {
    num: "03",
    label: "Гарантія доставки",
    text: "Спізнились більше 60 хв — наступне замовлення коштує вам нічого.",
  },
];

const stats = [
  { val: "2020", desc: "рік відкриття першої точки на Подолі" },
  { val: "3",    desc: "локації — Поділ, Печерськ, Оболонь"  },
  { val: "36",   desc: "позицій у меню, оновлюється щосезону" },
];

export default function AboutPage() {
  return (
    <div className="pt-20" style={{ background: "#1c1410", color: "#faf7f2" }}>

      {/* ── Opening — typographic, no photo ── */}
      <section
        className="min-h-[90vh] flex flex-col max-w-7xl mx-auto px-6 pb-20"
        style={{ justifyContent: "space-between" }}
      >
        {/* top label */}
        <div className="pt-16 flex items-center gap-4">
          <div style={{ width: 40, height: 1, background: "#c49a3c" }} />
          <span
            style={{
              color: "#c49a3c",
              fontSize: "0.72rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Brasa · Київ · 2020
          </span>
        </div>

        {/* big type */}
        <div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 300,
              fontSize: "clamp(4.5rem, 13vw, 11rem)",
              lineHeight: 0.88,
              color: "#faf7f2",
            }}
          >
            Жар,<br />
            <span style={{ color: "#c49a3c" }}>що</span><br />
            змінює<br />
            смак.
          </h1>

          <div
            style={{
              marginTop: "3rem",
              paddingTop: "2rem",
              borderTop: "1px solid rgba(196,154,60,0.25)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2.5rem",
              maxWidth: 680,
            }}
          >
            <p style={{ color: "rgba(250,247,242,0.55)", fontSize: "0.9rem", lineHeight: 1.75 }}>
              <span style={{ color: "#c49a3c" }}>Brasa</span> — іспанське слово для жару і розпеченого вугілля. Повільне горіння, яке перетворює прості інгредієнти на щось особливе.
            </p>
            <p style={{ color: "rgba(250,247,242,0.55)", fontSize: "0.9rem", lineHeight: 1.75 }}>
              Три локації в Києві. Один підхід до їжі: дров'яна піч, сезонна сировина, рецептури без компромісів.
            </p>
          </div>
        </div>
      </section>

      {/* ── Photo + Stats ── */}
      <section style={{ borderTop: "1px solid rgba(196,154,60,0.12)" }}>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* photo */}
            <div className="relative" style={{ height: 580 }}>
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
                alt="Кухня Brasa"
                fill
                className="object-cover"
                style={{ filter: "brightness(0.8)" }}
              />
              <div
                style={{
                  position: "absolute", top: 0, left: 0,
                  width: 48, height: 48,
                  borderTop: "2px solid #c49a3c",
                  borderLeft: "2px solid #c49a3c",
                }}
              />
              <div
                style={{
                  position: "absolute", bottom: 0, right: 0,
                  width: 48, height: 48,
                  borderBottom: "2px solid #c49a3c",
                  borderRight: "2px solid #c49a3c",
                }}
              />
            </div>

            {/* stats */}
            <div
              style={{
                padding: "3.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderLeft: "1px solid rgba(196,154,60,0.12)",
              }}
            >
              <p
                style={{
                  color: "#c49a3c",
                  fontSize: "0.72rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  marginBottom: "3rem",
                }}
              >
                У цифрах
              </p>

              {stats.map((s, i) => (
                <div
                  key={s.val}
                  style={{
                    paddingBottom: "2rem",
                    marginBottom: "2rem",
                    borderBottom:
                      i < stats.length - 1
                        ? "1px solid rgba(250,247,242,0.07)"
                        : "none",
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
                    {s.val}
                  </p>
                  <p style={{ color: "rgba(250,247,242,0.45)", fontSize: "0.85rem" }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Principles ── */}
      <section style={{ borderTop: "1px solid rgba(196,154,60,0.12)" }}>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <p
            style={{
              color: "#c49a3c",
              fontSize: "0.72rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: "4rem",
            }}
          >
            Як ми працюємо
          </p>

          {principles.map((p, i) => (
            <div
              key={p.num}
              style={{
                display: "grid",
                gridTemplateColumns: "64px 1fr 1fr",
                gap: "2rem",
                alignItems: "start",
                paddingBottom: "2.5rem",
                marginBottom: "2.5rem",
                borderBottom:
                  i < principles.length - 1
                    ? "1px solid rgba(250,247,242,0.07)"
                    : "1px solid rgba(250,247,242,0.07)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "0.85rem",
                  color: "rgba(196,154,60,0.5)",
                  paddingTop: "0.3rem",
                }}
              >
                {p.num}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "1.8rem",
                  fontWeight: 300,
                  color: "#faf7f2",
                  lineHeight: 1.1,
                }}
              >
                {p.label}
              </h3>
              <p
                style={{
                  color: "rgba(250,247,242,0.45)",
                  fontSize: "0.9rem",
                  lineHeight: 1.75,
                }}
              >
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ borderTop: "1px solid rgba(196,154,60,0.25)" }}>
        <div
          className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-10"
        >
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 300,
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              color: "#faf7f2",
              lineHeight: 1.1,
            }}
          >
            Слова — це добре.<br />
            <span style={{ color: "#c49a3c" }}>Смак — краще.</span>
          </h2>
          <div className="flex gap-4 flex-shrink-0">
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
      </section>

    </div>
  );
}
