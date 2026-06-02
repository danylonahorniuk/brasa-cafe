import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="pt-20" style={{ background: "#1c1410", color: "#faf7f2" }}>
      <div className="max-w-4xl mx-auto px-6 py-24">

        {/* Label */}
        <p style={{
          fontSize: "0.72rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#c49a3c",
          marginBottom: "2.5rem",
        }}>
          Про заклад
        </p>

        {/* Title */}
        <h1 style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 300,
          fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
          lineHeight: 1.05,
          color: "#faf7f2",
          marginBottom: "3rem",
          maxWidth: "38rem",
        }}>
          Brasa — іспанське слово для жару і розпеченого вугілля.
        </h1>

        {/* Divider */}
        <div style={{ width: 48, height: 1, background: "#c49a3c", marginBottom: "3rem" }} />

        {/* Body */}
        <div style={{
          fontSize: "1.05rem",
          lineHeight: 1.85,
          color: "rgba(250,247,242,0.6)",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          marginBottom: "3.5rem",
        }}>
          <p>
            Ми відкрились у 2020 році на Подолі з простою ідеєю: готувати їжу так, як вона того заслуговує. Без поспіху, без напівфабрикатів, без компромісів у виборі продуктів.
          </p>
          <p>
            Дров'яна піч при 450°C, тісто яке дозріває 48 годин, постачальники з Київщини і Карпат — це не маркетинг. Це просто те, як ми працюємо з першого дня.
          </p>
        </div>

        {/* Pull quote */}
        <blockquote style={{
          margin: "0 0 3.5rem",
          paddingLeft: "1.75rem",
          borderLeft: "2px solid #c49a3c",
        }}>
          <p style={{
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            color: "#faf7f2",
            lineHeight: 1.35,
          }}>
            "Ми не готуємо швидко — ми готуємо правильно."
          </p>
        </blockquote>

        {/* More body */}
        <p style={{
          fontSize: "1.05rem",
          lineHeight: 1.85,
          color: "rgba(250,247,242,0.6)",
          marginBottom: "3.5rem",
        }}>
          Сьогодні у нас три точки в Києві — Поділ, Печерськ, Оболонь. Меню з 36 позицій, яке змінюється під сезон. І та сама піч, що була з самого початку.
        </p>

        {/* Photo */}
        <div className="relative overflow-hidden" style={{ height: 500, marginBottom: "5rem" }}>
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80"
            alt="Кухня Brasa"
            fill
            className="object-cover"
            style={{ filter: "brightness(0.75)" }}
          />
        </div>

      </div>

      {/* Principles — wider, full bleed section */}
      <div style={{ borderTop: "1px solid rgba(196,154,60,0.15)", borderBottom: "1px solid rgba(196,154,60,0.15)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p style={{
            fontSize: "0.72rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#c49a3c",
            marginBottom: "4rem",
          }}>
            Як ми працюємо
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                num: "01",
                title: "Живий вогонь",
                text: "Дров'яна піч розігрівається до 450°C. Тісто дозріває 48 годин перед тим як потрапити до печі. Ні духовок, ні конвекції — тільки вогонь і час.",
              },
              {
                num: "02",
                title: "Локальна сировина",
                text: "Овочі та зелень — з Київщини. М'ясо та сир — з перевірених господарств у Карпатах. Меню залежить від сезону, а не від складу на полиці.",
              },
              {
                num: "03",
                title: "Гарантія доставки",
                text: "Якщо кур'єр спізнився більше ніж на 60 хвилин — наступне замовлення за наш рахунок. Без зірочок і умовних позначок.",
              },
            ].map((p) => (
              <div key={p.num}>
                <p style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "3.5rem",
                  fontWeight: 300,
                  color: "rgba(196,154,60,0.2)",
                  lineHeight: 1,
                  marginBottom: "1.25rem",
                }}>
                  {p.num}
                </p>
                <h3 style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "1.75rem",
                  fontWeight: 400,
                  color: "#faf7f2",
                  marginBottom: "1rem",
                  lineHeight: 1.1,
                }}>
                  {p.title}
                </h3>
                <p style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.8,
                  color: "rgba(250,247,242,0.45)",
                }}>
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <p style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 300,
          fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
          color: "#faf7f2",
          lineHeight: 1.2,
        }}>
          Слова — це добре.{" "}
          <span style={{ color: "#c49a3c" }}>Смак — краще.</span>
        </p>

        <div style={{ display: "flex", gap: "0.75rem", flexShrink: 0, flexWrap: "wrap" }}>
          <Link href="/menu" style={{
            display: "inline-block",
            padding: "0.875rem 1.75rem",
            background: "#8b1a2e",
            color: "#faf7f2",
            fontSize: "0.72rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "background 0.2s",
          }}>
            Переглянути меню
          </Link>
          <Link href="/booking" style={{
            display: "inline-block",
            padding: "0.875rem 1.75rem",
            background: "transparent",
            color: "#faf7f2",
            fontSize: "0.72rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textDecoration: "none",
            border: "1px solid rgba(196,154,60,0.55)",
            transition: "border-color 0.2s",
          }}>
            Забронювати стіл
          </Link>
        </div>
      </div>

    </div>
  );
}
