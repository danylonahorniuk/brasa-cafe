"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { promotions } from "@/data/menu";

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(() => setActive((a) => (a + 1) % promotions.length), []);
  const back = useCallback(() => setActive((a) => (a - 1 + promotions.length) % promotions.length), []);

  useEffect(() => {
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [next]);

  // Swipe підтримка
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : back();
    touchStartX.current = null;
  };

  const slide = promotions[active];

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "100svh", minHeight: "580px" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Фонові зображення */}
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
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Desktop gradient — темніємо зліва для тексту */}
      <div
        className="absolute inset-0 z-10 hidden sm:block"
        style={{
          background:
            "linear-gradient(to right, rgba(15,8,6,0.82) 0%, rgba(15,8,6,0.45) 55%, rgba(15,8,6,0.15) 100%)",
        }}
      />
      {/* Mobile gradient — рівномірне темне накриття */}
      <div
        className="absolute inset-0 z-10 sm:hidden"
        style={{ background: "rgba(15,8,6,0.55)" }}
      />
      {/* Загальний градієнт знизу */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(to top, rgba(15,8,6,0.75) 0%, transparent 45%)",
        }}
      />

      {/* Декоративний BRASA — лише на десктопі */}
      <div
        className="absolute right-[-2vw] top-1/2 -translate-y-1/2 z-10 select-none pointer-events-none hidden sm:block"
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
      <div className="absolute inset-0 z-20 flex items-end sm:items-center pb-28 sm:pb-0">
        <div className="max-w-7xl mx-auto px-5 sm:px-12 w-full">
          <div className="max-w-xl">
            {/* Tag */}
            <p
              key={`tag-${active}`}
              className="mb-3 text-[0.6rem] tracking-[0.25em] uppercase animate-fade-up"
              style={{
                color: "#c49a3c",
                animationFillMode: "both",
                animationDelay: "0ms",
              }}
            >
              {slide.badge ?? "Brasa Café"}
            </p>

            {/* Title */}
            <h1
              key={`title-${active}`}
              className="animate-fade-up text-white"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(2.4rem, 8vw, 5.2rem)",
                fontWeight: 300,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                animationFillMode: "both",
                animationDelay: "80ms",
                textShadow: "0 2px 20px rgba(0,0,0,0.3)",
              }}
            >
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p
              key={`sub-${active}`}
              className="mt-3 sm:mt-4 text-white/70 text-sm sm:text-base leading-relaxed max-w-xs sm:max-w-sm animate-fade-up"
              style={{ animationFillMode: "both", animationDelay: "160ms" }}
            >
              {slide.subtitle}
            </p>

            {/* Buttons */}
            <div
              key={`btns-${active}`}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 animate-fade-up"
              style={{ animationFillMode: "both", animationDelay: "240ms" }}
            >
              <Link href={slide.href} className="hero-btn-primary">
                <span>{slide.cta}</span>
                <span className="hero-btn-arrow">→</span>
              </Link>
              <Link href="/booking" className="hero-btn-glass">
                <span>Забронювати столик</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Прогрес-індикатори + номер слайда */}
      <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-20 flex items-center justify-center gap-3">
        {promotions.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="relative h-0.5 rounded-full overflow-hidden transition-all duration-500"
            style={{
              width: i === active ? "48px" : "18px",
              background: "rgba(255,255,255,0.25)",
            }}
            aria-label={`Слайд ${i + 1}`}
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

      {/* Номер слайда — лише десктоп */}
      <div className="absolute bottom-10 right-8 z-20 text-white/40 text-xs tracking-widest hidden sm:block">
        {String(active + 1).padStart(2, "0")} / {String(promotions.length).padStart(2, "0")}
      </div>

      {/* Стрілки навігації — лише десктоп */}
      <button
        onClick={back}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-sm items-center justify-center text-white/60 hover:text-white border border-white/20 hover:border-white/50 transition-all hidden sm:flex"
        style={{ backdropFilter: "blur(8px)", background: "rgba(0,0,0,0.2)" }}
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-sm items-center justify-center text-white/60 hover:text-white border border-white/20 hover:border-white/50 transition-all hidden sm:flex"
        style={{ backdropFilter: "blur(8px)", background: "rgba(0,0,0,0.2)" }}
      >
        <ChevronRight size={18} />
      </button>

      <style>{`
        @keyframes slide-progress {
          from { width: 0% }
          to   { width: 100% }
        }

        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.82rem 1.8rem;
          border-radius: 2px;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #fff;
          background: linear-gradient(135deg, #6b1220 0%, #4e0d18 100%);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 4px 20px rgba(80,14,28,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .hero-btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(196,154,60,0.1) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .hero-btn-primary:hover {
          box-shadow: 0 6px 28px rgba(80,14,28,0.6), inset 0 1px 0 rgba(255,255,255,0.15);
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.2);
        }
        .hero-btn-primary:hover::before { opacity: 1; }
        .hero-btn-arrow {
          display: inline-block;
          transition: transform 0.3s ease;
        }
        .hero-btn-primary:hover .hero-btn-arrow { transform: translateX(4px); }

        .hero-btn-glass {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.82rem 1.8rem;
          border-radius: 2px;
          font-size: 0.7rem;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.82);
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.22);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition: all 0.3s ease;
        }
        .hero-btn-glass:hover {
          background: rgba(255,255,255,0.13);
          border-color: rgba(255,255,255,0.4);
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
      `}</style>
    </section>
  );
}
