import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="pt-20" style={{ background: "#1c1410", color: "#faf7f2" }}>
      <div className="max-w-3xl mx-auto px-6 py-24">

        {/* Label */}
        <p
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#c49a3c",
            marginBottom: "2.5rem",
          }}
        >
          Про заклад
        </p>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 300,
            fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
            lineHeight: 1.05,
            color: "#faf7f2",
            marginBottom: "3rem",
          }}
        >
          Brasa — іспанське слово для жару і розпеченого вугілля.
        </h1>

        {/* Divider */}
        <div style={{ width: 48, height: 1, background: "#c49a3c", marginBottom: "3rem" }} />

        {/* Body text */}
        <div
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.85,
            color: "rgba(250,247,242,0.65)",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <p>
            Ми відкрились у 2020 році на Подолі з дуже простою ідеєю: готувати їжу так, як вона того заслуговує. Без поспіху, без напівфабрикатів, без компромісів у виборі продуктів.
          </p>
          <p>
            Дров'яна піч при 450°C, тісто яке дозріває 48 годин, постачальники з Київщини і Карпат — це не маркетинг. Це просто те, як ми працюємо з першого дня.
          </p>
        </div>

        {/* Pull quote */}
        <blockquote
          style={{
            margin: "3.5rem 0",
            paddingLeft: "1.75rem",
            borderLeft: "2px solid #c49a3c",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              color: "#faf7f2",
              lineHeight: 1.35,
            }}
          >
            "Ми не готуємо швидко — ми готуємо правильно."
          </p>
        </blockquote>

        {/* More body text */}
        <div
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.85,
            color: "rgba(250,247,242,0.65)",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            marginBottom: "3.5rem",
          }}
        >
          <p>
            Сьогодні у нас три точки в Києві — Поділ, Печерськ, Оболонь. Меню з 36 позицій, яке змінюється під сезон. І та сама піч, що була з самого початку.
          </p>
        </div>

        {/* Photo */}
        <div
          className="relative overflow-hidden"
          style={{ height: 480, marginBottom: "3.5rem" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80"
            alt="Кухня Brasa"
            fill
            className="object-cover"
            style={{ filter: "brightness(0.75)" }}
          />
        </div>

        {/* Principles — simple numbered text */}
        <div style={{ marginBottom: "4rem" }}>
          <p
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#c49a3c",
              marginBottom: "2rem",
            }}
          >
            Як ми працюємо
          </p>

          {[
            {
              num: "01",
              title: "Живий вогонь",
              text: "Дров'яна піч при 450°C. Тісто дозріває 48 годин.",
            },
            {
              num: "02",
              title: "Локальна сировина",
              text: "Постачальники з Київщини та Карпат. Меню слідує сезону.",
            },
            {
              num: "03",
              title: "Гарантія доставки",
              text: "Спізнились більше 60 хв — наступне замовлення безкоштовно.",
            },
          ].map((p) => (
            <div
              key={p.num}
              style={{
                display: "grid",
                gridTemplateColumns: "2.5rem 1fr",
                gap: "1.25rem",
                padding: "1.75rem 0",
                borderBottom: "1px solid rgba(250,247,242,0.08)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "0.8rem",
                  color: "rgba(196,154,60,0.45)",
                  paddingTop: "0.2rem",
                }}
              >
                {p.num}
              </span>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "1.3rem",
                    fontWeight: 400,
                    color: "#faf7f2",
                    marginBottom: "0.35rem",
                  }}
                >
                  {p.title}
                </p>
                <p style={{ fontSize: "0.9rem", color: "rgba(250,247,242,0.45)", lineHeight: 1.65 }}>
                  {p.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            paddingTop: "3rem",
            borderTop: "1px solid rgba(196,154,60,0.2)",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 300,
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              color: "#faf7f2",
              lineHeight: 1.2,
            }}
          >
            Слова — це добре.{" "}
            <span style={{ color: "#c49a3c" }}>Смак — краще.</span>
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/menu" className="btn-primary">
              Переглянути меню
            </Link>
            <Link
              href="/booking"
              className="btn-secondary"
              style={{ borderColor: "rgba(196,154,60,0.35)", color: "#faf7f2" }}
            >
              Забронювати стіл
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
