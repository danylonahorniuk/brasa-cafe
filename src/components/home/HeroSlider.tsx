"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { promotions } from "@/data/menu";

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  const next = useCallback(() => setActive((a) => (a + 1) % promotions.length), []);
  const back = useCallback(() => setActive((a) => (a - 1 + promotions.length) % promotions.length), []);

  useEffect(() => {
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [next]);

  const slide = promotions[active];

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background images — всі завантажені, перемикаємо opacity */}
      {promotions.map((p, i) => (
        <div
          key={p.id}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === active ? 1 : 0 }}
        >
          <Image
            src={p.image}
            alt={p.title}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Gradient overlays — затемнення знизу і зліва для тексту */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(15,8,6,0.78) 0%, rgba(15,8,6,0.45) 55%, rgba(15,8,6,0.15) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(15,8,6,0.6) 0%, transparent 50%)",
        }}
      />

      {/* Декоративний напис BRASA */}
      <div
        className="absolute right-[-2vw] top-1/2 -translate-y-1/2 z-10 select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(100px, 18vw, 280px)",
          fontWeight: 700,
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.08)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
        }}
      >
        BRASA
      </div>

      {/* Контент */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="max-w-xl">
            {/* Badge */}
            <div
              key={`badge-${active}`}
              className="inline-flex items-center gap-2 mb-5 animate-fade-up"
              style={{
                background: "rgba(139,26,46,0.85)",
                borderRadius: "2px",
                padding: "0.3rem 0.9rem",
                backdropFilter: "blur(8px)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
              <span className="text-[0.65rem] tracking-[0.22em] uppercase font-medium text-white">
                {slide.badge}
              </span>
            </div>

            {/* Title */}
            <h1
              key={`title-${active}`}
              className="animate-fade-up delay-100 text-white"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(2.6rem, 6vw, 5.2rem)",
                fontWeight: 300,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                animationFillMode: "both",
                textShadow: "0 2px 20px rgba(0,0,0,0.3)",
              }}
            >
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p
              key={`sub-${active}`}
              className="mt-4 text-white/75 text-base leading-relaxed max-w-sm animate-fade-up delay-200"
              style={{ animationFillMode: "both" }}
            >
              {slide.subtitle}
            </p>

            {/* Buttons */}
            <div
              key={`btns-${active}`}
              className="flex flex-wrap gap-4 mt-8 animate-fade-up delay-300"
              style={{ animationFillMode: "both" }}
            >
              <Link href={slide.href} className="btn-primary">
                {slide.cta}
              </Link>
              <Link
                href="/booking"
                className="px-7 py-3 rounded-sm text-[0.78rem] tracking-widest uppercase text-white border border-white/30 hover:border-white/60 hover:bg-white/10 transition-all"
              >
                Забронювати столик
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Прогрес-індикатори */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {promotions.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="relative h-0.5 rounded-full overflow-hidden transition-all duration-500"
            style={{
              width: i === active ? "52px" : "20px",
              background: "rgba(255,255,255,0.25)",
            }}
          >
            {i === active && (
              <span
                className="absolute inset-y-0 left-0 bg-white rounded-full"
                style={{ animation: "slide-progress 5.5s linear" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Стрілки навігації */}
      <button
        onClick={back}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-sm flex items-center justify-center text-white/60 hover:text-white border border-white/20 hover:border-white/50 transition-all"
        style={{ backdropFilter: "blur(8px)", background: "rgba(0,0,0,0.2)" }}
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-sm flex items-center justify-center text-white/60 hover:text-white border border-white/20 hover:border-white/50 transition-all"
        style={{ backdropFilter: "blur(8px)", background: "rgba(0,0,0,0.2)" }}
      >
        <ChevronRight size={18} />
      </button>

      {/* Номер слайда */}
      <div className="absolute bottom-10 right-8 z-20 text-white/40 text-xs tracking-widest">
        {String(active + 1).padStart(2, "0")} / {String(promotions.length).padStart(2, "0")}
      </div>

      <style>{`
        @keyframes slide-progress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </section>
  );
}
