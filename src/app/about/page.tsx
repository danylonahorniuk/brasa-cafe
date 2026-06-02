import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="pt-20" style={{ background: "#1c1410", color: "#faf7f2" }}>
      <div className="max-w-4xl mx-auto px-6 py-24">

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
          <span style={{ color: "#c49a3c" }}>Brasa</span> — іспанське слово для жару і розпеченого вугілля.
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

      {/* Principles as article continuation */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <h2 style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 300,
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          color: "#faf7f2",
          lineHeight: 1.1,
          marginBottom: "2rem",
        }}>
          Як ми готуємо
        </h2>

        <div style={{
          fontSize: "1.05rem",
          lineHeight: 1.85,
          color: "rgba(250,247,242,0.6)",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}>
          <p>
            <span style={{ color: "#c49a3c", fontWeight: 400 }}>Живий вогонь.</span>{" "}
            Дров'яна піч розігрівається до 450°C. Тісто дозріває 48 годин перед тим як потрапити до печі. Ні духовок, ні конвекції — тільки вогонь і час.
          </p>
          <p>
            <span style={{ color: "#c49a3c", fontWeight: 400 }}>Локальна сировина.</span>{" "}
            Овочі та зелень — з Київщини. М'ясо та сир — з перевірених господарств у Карпатах. Меню залежить від сезону, а не від складу на полиці.
          </p>
          <p>
            <span style={{ color: "#c49a3c", fontWeight: 400 }}>Гарантія доставки.</span>{" "}
            Якщо кур'єр спізнився більше ніж на 60 хвилин — наступне замовлення за наш рахунок. Без зірочок і умовних позначок.
          </p>
        </div>
      </div>

      {/* CTA */}
      <style>{`
        .about-btn-primary {
          display: inline-block;
          padding: 0.9rem 2rem;
          background: linear-gradient(135deg, #9b1e34 0%, #6d1423 100%);
          color: #faf7f2;
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          border: 1px solid transparent;
          transition: all 0.3s ease;
          box-shadow: 0 2px 16px rgba(139,26,46,0.25);
        }
        .about-btn-primary:hover {
          background: linear-gradient(135deg, #b02238 0%, #8b1a2e 100%);
          border-color: rgba(196,154,60,0.35);
          box-shadow: 0 4px 24px rgba(139,26,46,0.45);
          color: #faf7f2;
        }
        .about-btn-secondary {
          display: inline-block;
          padding: 0.9rem 2rem;
          background: transparent;
          color: #c49a3c;
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          border: 1px solid #c49a3c;
          transition: all 0.3s ease;
        }
        .about-btn-secondary:hover {
          background: rgba(196,154,60,0.1);
          color: #e0b84e;
          border-color: #e0b84e;
          box-shadow: 0 4px 20px rgba(196,154,60,0.15);
        }
      `}</style>
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
          <Link href="/menu" className="about-btn-primary">
            Переглянути меню
          </Link>
          <Link href="/booking" className="about-btn-secondary">
            Забронювати стіл
          </Link>
        </div>
      </div>

    </div>
  );
}
