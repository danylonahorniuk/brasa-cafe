"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/ui/CartDrawer";

const links = [
  { href: "/",        label: "Головна"    },
  { href: "/menu",    label: "Меню"       },
  { href: "/booking", label: "Бронювання" },
  { href: "/about",   label: "Про нас"    },
  { href: "/contact", label: "Контакти"   },
];

export default function Navbar() {
  const pathname = usePathname();
  const { count, toggleCart } = useCart();
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // На головній: прозорий поверх hero (темного фото) → після скролу білий
  // На інших сторінках: одразу білий
  const showWhite = scrolled || !isHome;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          background: showWhite ? "rgba(250,247,242,0.97)" : "transparent",
          backdropFilter: showWhite ? "blur(16px)" : "none",
          borderBottom: showWhite ? "1px solid #e8ddd4" : "none",
          boxShadow: showWhite ? "0 1px 20px rgba(28,20,16,0.06)" : "none",
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none">
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "1.9rem",
                fontWeight: 400,
                letterSpacing: "0.18em",
                color: showWhite ? "#8b1a2e" : "#ffffff",
                transition: "color 0.4s",
              }}
            >
              BRASA
            </span>
            <span
              className="text-[0.5rem] tracking-[0.35em] uppercase mt-0.5"
              style={{ color: showWhite ? "#a09080" : "rgba(255,255,255,0.55)", transition: "color 0.4s" }}
            >
              Кафе & Доставка
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="relative text-[0.75rem] tracking-[0.1em] uppercase transition-colors duration-300"
                    style={{
                      color: active
                        ? "#8b1a2e"
                        : showWhite ? "#7a6a5e" : "rgba(255,255,255,0.75)",
                    }}
                  >
                    {l.label}
                    <span
                      className="absolute -bottom-0.5 left-0 h-px bg-[#8b1a2e] transition-all duration-300"
                      style={{ width: active ? "100%" : "0%" }}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Cart + mobile */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleCart}
              className="relative p-2 transition-colors"
              style={{ color: showWhite ? "#7a6a5e" : "rgba(255,255,255,0.75)" }}
              aria-label="Кошик"
            >
              <ShoppingCart size={20} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#8b1a2e] text-white text-[0.6rem] font-bold flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-1 transition-colors"
              style={{ color: showWhite ? "#7a6a5e" : "rgba(255,255,255,0.75)" }}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: mobileOpen ? "320px" : "0",
            background: "rgba(250,247,242,0.98)",
            borderTop: mobileOpen ? "1px solid #e8ddd4" : "none",
          }}
        >
          <ul className="flex flex-col px-6 py-5 gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm tracking-wider uppercase"
                  style={{ color: pathname === l.href ? "#8b1a2e" : "#7a6a5e" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <CartDrawer />
    </>
  );
}
