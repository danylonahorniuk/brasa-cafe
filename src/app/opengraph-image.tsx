import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Brasa — Кафе з доставкою";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  /* ── Завантажуємо Cormorant Garamond через Google Fonts API ── */
  let fontData: ArrayBuffer | null = null;
  try {
    const cssRes = await fetch(
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0 (compatible; NextJS)" } }
    );
    const css = await cssRes.text();
    const match = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/);
    if (match) {
      fontData = await fetch(match[1]).then((r) => r.arrayBuffer());
    }
  } catch {
    // якщо не завантажилось — рендеримо з fallback шрифтом
  }

  const fonts = fontData
    ? [{ name: "Cormorant", data: fontData, style: "normal" as const, weight: 300 as const }]
    : [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          position: "relative",
          fontFamily: fontData ? "Cormorant, serif" : "Georgia, serif",
        }}
      >
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1536622308015-0740925b8221?w=1200&q=80"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(10,6,2,0.78) 0%, rgba(10,6,2,0.42) 55%, rgba(10,6,2,0.12) 100%)",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 80px",
          }}
        >
          {/* BRASA wordmark */}
          <div
            style={{
              fontSize: "130px",
              fontWeight: 300,
              letterSpacing: "0.2em",
              color: "#f5f0e8",
              lineHeight: 1,
              marginBottom: "28px",
              fontFamily: fontData ? "Cormorant, serif" : "Georgia, serif",
            }}
          >
            BRASA
          </div>

          {/* Gold divider */}
          <div
            style={{
              width: "80px",
              height: "2px",
              background: "#c49a3c",
              marginBottom: "32px",
            }}
          />

          {/* Subtitle */}
          <div
            style={{
              fontSize: "30px",
              fontWeight: 300,
              letterSpacing: "0.06em",
              color: "rgba(240,235,225,0.75)",
              lineHeight: 1.4,
              fontFamily: fontData ? "Cormorant, serif" : "Georgia, serif",
            }}
          >
            Піца на дровах · Роли · Бургери · Доставка по Києву
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
