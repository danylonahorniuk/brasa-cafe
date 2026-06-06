import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Brasa — Кафе з доставкою";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  /* ── Cormorant Garamond via Google Fonts ── */
  type FontEntry = { name: string; data: ArrayBuffer; style: "normal" | "italic"; weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 };
  let fonts: FontEntry[] = [];
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0" } }
    ).then((r) => r.text());
    const url = css.match(/src: url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/)?.[1];
    if (url) {
      const data = await fetch(url).then((r) => r.arrayBuffer());
      fonts = [{ name: "CG", data, style: "normal", weight: 300 }];
    }
  } catch { /* fallback to Georgia */ }

  const ff = fonts.length ? "CG, Georgia, serif" : "Georgia, serif";

  return new ImageResponse(
    (
      <div style={{ width: 1200, height: 630, display: "flex", position: "relative" }}>

        {/* Фонове фото */}
        <img
          src="https://images.unsplash.com/photo-1536622308015-0740925b8221?w=1200&q=80"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* Темний градієнт */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "linear-gradient(135deg, rgba(10,6,2,0.80) 0%, rgba(10,6,2,0.45) 55%, rgba(10,6,2,0.12) 100%)",
          display: "flex",
        }} />

        {/* Текст */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          display: "flex", flexDirection: "column", justifyContent: "center",
          paddingLeft: 80, paddingRight: 80,
        }}>
          <div style={{ fontSize: 128, fontWeight: 300, letterSpacing: "0.2em", color: "#f5f0e8", lineHeight: 1, marginBottom: 28, fontFamily: ff }}>
            BRASA
          </div>
          <div style={{ width: 80, height: 2, background: "#c49a3c", marginBottom: 32 }} />
          <div style={{ fontSize: 30, fontWeight: 300, letterSpacing: "0.05em", color: "rgba(240,235,225,0.75)", lineHeight: 1.4, fontFamily: ff }}>
            Піца на дровах · Роли · Бургери · Доставка по Києву
          </div>
        </div>

      </div>
    ),
    { ...size, fonts }
  );
}
