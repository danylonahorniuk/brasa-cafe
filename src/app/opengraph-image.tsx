import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Brasa — Кафе з доставкою";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          position: "relative",
          fontFamily: "Georgia, serif",
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
            background: "linear-gradient(135deg, rgba(10,6,2,0.72) 0%, rgba(10,6,2,0.35) 60%, rgba(10,6,2,0.15) 100%)",
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
              fontSize: "120px",
              fontWeight: 300,
              letterSpacing: "0.18em",
              color: "#f5f0e8",
              lineHeight: 1,
              marginBottom: "24px",
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
              marginBottom: "28px",
            }}
          />

          {/* Subtitle */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: 300,
              letterSpacing: "0.06em",
              color: "rgba(240,235,225,0.8)",
              lineHeight: 1.4,
            }}
          >
            Піца на дровах · Роли · Бургери · Доставка по Києву
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
