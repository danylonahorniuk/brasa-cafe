import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5 sm:px-6 pt-16 sm:pt-20"
      style={{ background: "#1c1410", color: "#faf7f2" }}
    >
      <style>{`
        .nf-btn-primary:hover {
          box-shadow: 0 6px 28px rgba(80,14,28,0.55) !important;
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.2) !important;
        }
        .nf-btn-secondary:hover {
          background: rgba(255,255,255,0.13) !important;
          border-color: rgba(255,255,255,0.4) !important;
          color: #fff !important;
          transform: translateY(-2px);
        }
      `}</style>
      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontSize: "clamp(6rem, 20vw, 14rem)",
        fontWeight: 300,
        color: "rgba(196,154,60,0.15)",
        lineHeight: 1,
        marginBottom: "1.5rem",
        userSelect: "none",
      }}>
        404
      </p>

      <h1 style={{
        fontFamily: "var(--font-cormorant), serif",
        fontWeight: 300,
        fontSize: "clamp(1.8rem, 4vw, 3rem)",
        color: "#faf7f2",
        lineHeight: 1.1,
        marginBottom: "1.25rem",
        textAlign: "center",
      }}>
        Сторінку не знайдено
      </h1>

      <p style={{
        fontSize: "0.95rem",
        color: "rgba(250,247,242,0.45)",
        marginBottom: "3rem",
        textAlign: "center",
        maxWidth: "28rem",
        lineHeight: 1.7,
      }}>
        Схоже, ця сторінка зникла як остання піца у п'ятницю ввечері.
      </p>

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          href="/"
          className="nf-btn-primary"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.8rem",
            background: "linear-gradient(135deg, #6b1220 0%, #4e0d18 100%)",
            color: "#faf7f2",
            fontSize: "0.72rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 4px 20px rgba(80,14,28,0.4)",
            transition: "all 0.3s ease",
          }}
        >
          На головну
        </Link>
        <Link
          href="/menu"
          className="nf-btn-secondary"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "0.75rem 1.8rem",
            background: "rgba(255,255,255,0.07)",
            color: "rgba(255,255,255,0.82)",
            fontSize: "0.72rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.22)",
            transition: "all 0.3s ease",
          }}
        >
          До меню
        </Link>
      </div>
    </div>
  );
}
