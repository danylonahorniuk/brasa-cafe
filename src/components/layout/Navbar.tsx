"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart, X,
  Home, UtensilsCrossed, CalendarDays, MoreHorizontal, UserCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";
import CartDrawer from "@/components/ui/CartDrawer";

export default function Navbar() {
  const pathname = usePathname();
  const { count, toggleCart } = useCart();
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled]   = useState(false);
  const [moreOpen, setMoreOpen]   = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close "Ще" panel on route change
  useEffect(() => { setMoreOpen(false); }, [pathname]);

  // Lock body scroll when panel open
  useEffect(() => {
    document.body.style.overflow = moreOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [moreOpen]);

  const showWhite = scrolled || !isHome;

  /* ── Desktop nav links ── */
  const desktopLinks = [
    { href: "/",        label: t("nav.home")    },
    { href: "/menu",    label: t("nav.menu")    },
    { href: "/booking", label: t("nav.booking") },
    { href: "/about",   label: t("nav.about")   },
    { href: "/contact", label: t("nav.contact") },
  ];

  /* ── "Ще" sidebar links ── */
  const moreLinks = [
    { href: "/auth",    label: t("auth.cabinet") },
    { href: "/about",   label: t("nav.about")    },
    { href: "/contact", label: t("nav.contact")  },
  ];

  /* ── Bottom nav items ── */
  const bottomNav = [
    { href: "/",        label: t("nav.home"),    Icon: Home,            center: false },
    { href: "/menu",    label: t("nav.menu"),    Icon: UtensilsCrossed, center: true  },
    { href: "/booking", label: t("nav.booking"), Icon: CalendarDays,    center: false },
  ];

  return (
    <>
      {/* ═══════════════════ TOP HEADER ═══════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          background: showWhite ? "rgba(26,18,8,0.97)" : "transparent",
          backdropFilter: showWhite ? "blur(16px)" : undefined,
          borderBottom: showWhite ? "1px solid rgba(255,255,255,0.06)" : undefined,
          boxShadow: showWhite ? "0 2px 24px rgba(0,0,0,0.25)" : "none",
        }}
      >
        <nav className="max-w-7xl mx-auto px-5 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none">
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(1.5rem, 5vw, 1.9rem)",
                fontWeight: 400,
                letterSpacing: "0.18em",
                color: showWhite ? "#e8ddd4" : "#ffffff",
                transition: "color 0.4s",
              }}
            >
              BRASA
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-8">
            {desktopLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="relative text-[0.75rem] tracking-[0.1em] uppercase transition-colors duration-300"
                    style={{
                      color: active
                        ? (showWhite ? "#c49a3c" : "#ffffff")
                        : showWhite ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.75)",
                    }}
                  >
                    {l.label}
                    <span
                      className="absolute -bottom-0.5 left-0 h-px transition-all duration-300"
                      style={{
                        width: active ? "100%" : "0%",
                        background: showWhite ? "#c49a3c" : "#ffffff",
                      }}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right side: lang + cart (desktop) | cart hidden on mobile → in bottom nav */}
          <div className="flex items-center gap-3">
            {/* Lang switcher — desktop only */}
            <div className="hidden lg:flex items-center" style={{ marginRight: "4px" }}>
              <button
                onClick={() => setLang(lang === "uk" ? "en" : "uk")}
                className="text-[0.62rem] tracking-[0.12em] uppercase transition-colors px-2 py-1"
                style={{ color: showWhite ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.6)" }}
              >
                {lang === "uk" ? "EN" : "UA"}
              </button>
            </div>

            {/* Cabinet — desktop only */}
            <Link
              href="/auth"
              className="relative p-2 transition-colors hidden lg:block"
              style={{ color: pathname === "/auth" ? "#c49a3c" : showWhite ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.75)" }}
              aria-label={t("auth.cabinet")}
            >
              <UserCircle size={20} strokeWidth={1.5} />
            </Link>

            {/* Cart — desktop only (mobile has it in bottom nav) */}
            <button
              onClick={toggleCart}
              className="relative p-2 transition-colors hidden lg:block"
              style={{ color: showWhite ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.75)" }}
              aria-label={t("cart.title")}
            >
              <ShoppingCart size={20} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#8b1a2e] text-white text-[0.6rem] font-bold flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* ═══════════════════ "Ще" SIDEBAR OVERLAY ═══════════════════ */}
      <div
        className="fixed inset-0 z-40 lg:hidden transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.5)",
          opacity: moreOpen ? 1 : 0,
          pointerEvents: moreOpen ? "auto" : "none",
        }}
        onClick={() => setMoreOpen(false)}
      />

      <aside
        className="fixed top-0 right-0 bottom-0 z-50 lg:hidden flex flex-col transition-transform duration-400"
        style={{
          width: "min(300px, 85vw)",
          background: "#1a1208",
          borderLeft: "1px solid rgba(255,255,255,0.07)",
          transform: moreOpen ? "translateX(0)" : "translateX(100%)",
          paddingBottom: "calc(64px + env(safe-area-inset-bottom))",
        }}
      >
        {/* Header сайдбару */}
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <span
            className="text-[0.6rem] tracking-[0.25em] uppercase"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            {t("nav.more")}
          </span>
          <button
            onClick={() => setMoreOpen(false)}
            className="p-1.5"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Навігаційні посилання (Про нас, Контакти) */}
        <nav className="flex flex-col px-6 pt-6 gap-1">
          {moreLinks.map((l, i) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center py-3.5"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  transform: moreOpen ? "translateX(0)" : "translateX(12px)",
                  opacity: moreOpen ? 1 : 0,
                  transition: `transform 0.35s ease ${moreOpen ? i * 60 : 0}ms, opacity 0.35s ease ${moreOpen ? i * 60 : 0}ms`,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "1.6rem",
                    fontWeight: 300,
                    color: active ? "#c49a3c" : "#e8ddd4",
                    letterSpacing: "0.03em",
                  }}
                >
                  {l.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Нижня частина — телефон + мова */}
        <div className="mt-auto px-6 pb-6 flex flex-col gap-5">
          <div>
            <p className="text-[0.58rem] tracking-[0.22em] uppercase mb-1.5" style={{ color: "rgba(255,255,255,0.28)" }}>
              {t("nav.orders")}
            </p>
            <a
              href="tel:+380991234567"
              style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.1rem", color: "#c49a3c", letterSpacing: "0.05em" }}
            >
              +38 (099) 123-45-67
            </a>
          </div>

          {/* Перемикач мови */}
          <div>
            <p className="text-[0.58rem] tracking-[0.22em] uppercase mb-2" style={{ color: "rgba(255,255,255,0.28)" }}>
              {t("nav.language")}
            </p>
            <div className="flex gap-1 p-0.5 rounded-sm w-fit" style={{ background: "rgba(255,255,255,0.06)" }}>
              {(["uk", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="px-4 py-1.5 rounded-sm text-[0.6rem] tracking-[0.18em] uppercase transition-all duration-200"
                  style={{
                    background: lang === l ? "rgba(196,154,60,0.15)" : "transparent",
                    color: lang === l ? "#c49a3c" : "rgba(255,255,255,0.35)",
                    border: lang === l ? "1px solid rgba(196,154,60,0.3)" : "1px solid transparent",
                  }}
                >
                  {l === "uk" ? "UA" : "EN"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* ═══════════════════ MOBILE BOTTOM NAV ═══════════════════ */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden flex items-end"
        style={{
          background: "rgba(22,14,6,0.97)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          height: "calc(60px + env(safe-area-inset-bottom))",
          paddingBottom: "env(safe-area-inset-bottom)",
          overflow: "visible",
        }}
      >
        {/* 1. Головна */}
        {(() => {
          const { href, label, Icon } = bottomNav[0];
          const active = pathname === href;
          return (
            <Link
              href={href}
              className="flex-1 flex flex-col items-center justify-center gap-1 transition-colors duration-200 h-[60px]"
              style={{ color: active ? "#c49a3c" : "rgba(255,255,255,0.42)" }}
            >
              <Icon size={19} strokeWidth={active ? 1.8 : 1.5} />
              <span className="text-[0.52rem] tracking-wider uppercase">{label}</span>
            </Link>
          );
        })()}

        {/* 2. Бронювання */}
        {(() => {
          const { href, label, Icon } = bottomNav[2];
          const active = pathname === href;
          return (
            <Link
              href={href}
              className="flex-1 flex flex-col items-center justify-center gap-1 transition-colors duration-200 h-[60px]"
              style={{ color: active ? "#c49a3c" : "rgba(255,255,255,0.42)" }}
            >
              <Icon size={19} strokeWidth={active ? 1.8 : 1.5} />
              <span className="text-[0.52rem] tracking-wider uppercase">{label}</span>
            </Link>
          );
        })()}

        {/* 3. Меню (FAB — центр) */}
        {(() => {
          const { href, label, Icon } = bottomNav[1];
          const active = pathname === href;
          return (
            <Link
              href={href}
              className="flex-1 flex flex-col items-center gap-1.5 transition-colors duration-200"
              style={{
                color: active ? "#c49a3c" : "rgba(255,255,255,0.55)",
                paddingBottom: "6px",
              }}
            >
              <span
                className="flex items-center justify-center rounded-full transition-all duration-300"
                style={{
                  width: "54px",
                  height: "54px",
                  background: active
                    ? "linear-gradient(135deg, #c49a3c 0%, #a07828 100%)"
                    : "linear-gradient(135deg, #a02030 0%, #8b1a2e 100%)",
                  boxShadow: active
                    ? "0 -4px 20px rgba(196,154,60,0.4), 0 4px 12px rgba(0,0,0,0.3)"
                    : "0 -4px 20px rgba(139,26,46,0.45), 0 4px 12px rgba(0,0,0,0.3)",
                  transform: "translateY(-14px)",
                  flexShrink: 0,
                }}
              >
                <Icon size={22} color="#fff" strokeWidth={1.8} />
              </span>
              <span
                className="text-[0.52rem] tracking-wider uppercase"
                style={{ marginTop: "-8px" }}
              >
                {label}
              </span>
            </Link>
          );
        })()}

        {/* Кошик */}
        <button
          onClick={toggleCart}
          className="flex-1 flex flex-col items-center justify-center gap-1 transition-colors duration-200 h-[60px]"
          style={{ color: count > 0 ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.42)" }}
          aria-label={t("cart.title")}
        >
          <span className="relative">
            <ShoppingCart size={19} strokeWidth={1.5} />
            {count > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-white flex items-center justify-center"
                style={{ background: "#8b1a2e", fontSize: "0.48rem", fontWeight: 700 }}
              >
                {count}
              </span>
            )}
          </span>
          <span className="text-[0.52rem] tracking-wider uppercase">{t("nav.cart")}</span>
        </button>

        {/* Ще */}
        <button
          onClick={() => setMoreOpen((v) => !v)}
          className="flex-1 flex flex-col items-center justify-center gap-1 transition-colors duration-200 h-[60px]"
          style={{ color: moreOpen ? "#c49a3c" : "rgba(255,255,255,0.42)" }}
          aria-label={t("nav.more")}
        >
          {moreOpen ? <X size={19} strokeWidth={1.5} /> : <MoreHorizontal size={19} strokeWidth={1.5} />}
          <span className="text-[0.52rem] tracking-wider uppercase">{t("nav.more")}</span>
        </button>
      </nav>

      <CartDrawer />
    </>
  );
}
