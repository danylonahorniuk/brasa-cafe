import Link from "next/link";
import { Phone, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "#1c1410", color: "#f0ebe1" }} className="mt-24">
      <style>{`
        .footer-link:hover { color: #c49a3c !important; }
        .footer-social:hover { border-color: #8b1a2e !important; color: #c49a3c !important; }
      `}</style>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "2.2rem",
                fontWeight: 400,
                letterSpacing: "0.18em",
                color: "#e8ddd4",
              }}
            >
              BRASA
            </span>
            <p className="text-sm mt-3 leading-relaxed" style={{ color: "#7a6a5e" }}>
              Місце де смак зустрічає атмосферу. Піца, роли, бургери та авторські коктейлі.
            </p>
            <div className="flex gap-3 mt-5">
              {["IG", "FB"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="footer-social w-9 h-9 rounded-sm flex items-center justify-center text-xs font-medium transition-all"
                  style={{ border: "1px solid #2a2a2a", color: "#7a6a5e" }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="section-label mb-5" style={{ color: "#c49a3c" }}>Навігація</p>
            <ul className="space-y-3">
              {[["Меню", "/menu"], ["Бронювання", "/booking"], ["Про нас", "/about"], ["Контакти", "/contact"]].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="footer-link text-sm transition-colors"
                    style={{ color: "#7a6a5e" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <p className="section-label mb-5" style={{ color: "#c49a3c" }}>Графік роботи</p>
            <ul className="space-y-2 text-sm" style={{ color: "#7a6a5e" }}>
              <li className="flex justify-between gap-4">
                <span>Пн–Пт</span>
                <span style={{ color: "#a09080" }}>11:00–23:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Сб–Нд</span>
                <span style={{ color: "#a09080" }}>10:00–00:00</span>
              </li>
              <li className="flex items-center gap-2 mt-3" style={{ color: "#c49a3c" }}>
                <Clock size={13} />
                <span className="text-xs">Доставка до 22:30</span>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <p className="section-label mb-5" style={{ color: "#c49a3c" }}>Контакти</p>
            <ul className="space-y-3 text-sm" style={{ color: "#7a6a5e" }}>
              <li className="flex items-start gap-2">
                <MapPin size={14} style={{ color: "#8b1a2e" }} className="mt-0.5 flex-shrink-0" />
                <span>вул. Хрещатик 22, Київ</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} style={{ color: "#8b1a2e" }} className="flex-shrink-0" />
                <a href="tel:+380441234567" className="footer-link transition-colors" style={{ color: "#7a6a5e" }}>
                  +38 (044) 123-45-67
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider-accent mt-12 mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-[0.68rem] tracking-wider" style={{ color: "#3a3030" }}>
          <span>© {new Date().getFullYear()} BRASA. Всі права захищені.</span>
          <span>Портфоліо-проєкт / Next.js + Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
