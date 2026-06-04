"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/context/LangContext";

export default function AboutPage() {
  const { t } = useLang();
  return (
    <div className="pt-16 lg:pt-20" style={{ background: "#1c1410", color: "#faf7f2" }}>
      <div className="max-w-4xl mx-auto px-5 sm:px-6 py-10 sm:py-16 md:py-24">

        {/* Title */}
        <h1 style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 300,
          fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
          lineHeight: 1.05,
          color: "#faf7f2",
          marginBottom: "clamp(1.5rem, 4vw, 3rem)",
          maxWidth: "38rem",
        }}>
          <span style={{ color: "#c49a3c" }}>Brasa</span> — {t("about.title")}
        </h1>

        {/* Divider */}
        <div style={{ width: 48, height: 1, background: "#c49a3c", marginBottom: "clamp(1.5rem, 4vw, 3rem)" }} />

        {/* Body */}
        <div style={{
          fontSize: "1.05rem",
          lineHeight: 1.85,
          color: "rgba(250,247,242,0.6)",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          marginBottom: "clamp(2rem, 4vw, 3.5rem)",
        }}>
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
        </div>

        {/* Pull quote */}
        <blockquote style={{
          margin: "0 0 clamp(2rem, 4vw, 3.5rem)",
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
            {t("about.quote")}
          </p>
        </blockquote>

        {/* More body */}
        <p style={{
          fontSize: "1.05rem",
          lineHeight: 1.85,
          color: "rgba(250,247,242,0.6)",
          marginBottom: "clamp(2rem, 4vw, 3.5rem)",
        }}>
          {t("about.p3")}
        </p>

        {/* Photo */}
        <div className="relative overflow-hidden" style={{ height: "clamp(220px, 50vw, 500px)", marginBottom: "clamp(2rem, 5vw, 3.5rem)" }}>
          <Image
            src="https://images.unsplash.com/photo-1536622308015-0740925b8221?w=1200&q=80"
            alt={t("about.imageAlt")}
            fill
            className="object-cover"
            style={{ filter: "brightness(0.75)" }}
          />
        </div>

      </div>

      {/* Principles as article continuation */}
      <div className="max-w-4xl mx-auto px-5 sm:px-6 pb-12 sm:pb-24">
        <h2 style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 300,
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          color: "#faf7f2",
          lineHeight: 1.1,
          marginBottom: "2rem",
        }}>
          {t("about.howWeTitle")}
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
            <span style={{ color: "#c49a3c", fontWeight: 400 }}>{t("about.fire")}</span>{" "}
            {t("about.fireText")}
          </p>
          <p>
            <span style={{ color: "#c49a3c", fontWeight: 400 }}>{t("about.local")}</span>{" "}
            {t("about.localText")}
          </p>
          <p>
            <span style={{ color: "#c49a3c", fontWeight: 400 }}>{t("about.delivery")}</span>{" "}
            {t("about.deliveryText")}
          </p>
        </div>
      </div>

      {/* CTA */}
      <style>{`
        .about-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.8rem;
          background: linear-gradient(135deg, #6b1220 0%, #4e0d18 100%);
          color: #faf7f2;
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 4px 20px rgba(80,14,28,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .about-btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(196,154,60,0.1) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .about-btn-primary:hover {
          box-shadow: 0 6px 28px rgba(80,14,28,0.55), inset 0 1px 0 rgba(255,255,255,0.15);
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.2);
        }
        .about-btn-primary:hover::before { opacity: 1; }
        .about-btn-secondary {
          display: inline-flex;
          align-items: center;
          padding: 0.75rem 1.8rem;
          background: rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.82);
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.22);
          backdrop-filter: blur(14px);
          transition: all 0.3s ease;
        }
        .about-btn-secondary:hover {
          background: rgba(255,255,255,0.13);
          border-color: rgba(255,255,255,0.4);
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
      `}</style>
      <div className="max-w-4xl mx-auto px-5 sm:px-6 py-10 sm:py-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8">
        <p style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 300,
          fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
          color: "#faf7f2",
          lineHeight: 1.2,
        }}>
          {t("about.ctaText1")}{" "}
          <span style={{ color: "#c49a3c" }}>{t("about.ctaText2")}</span>
        </p>

        <div style={{ display: "flex", gap: "0.75rem", flexShrink: 0, flexWrap: "wrap" }}>
          <Link href="/menu" className="about-btn-primary">
            {t("about.menuBtn")}
          </Link>
          <Link href="/booking" className="about-btn-secondary">
            {t("about.bookBtn")}
          </Link>
        </div>
      </div>

    </div>
  );
}
