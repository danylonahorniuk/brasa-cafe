import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const locations = [
  {
    name: "Поділ",
    address: "вул. Сагайдачного 14, Київ",
    hours: "Пн–Пт: 11:00–23:00\nСб–Нд: 10:00–00:00",
    maps: "https://maps.google.com/?q=вул.+Сагайдачного+14,+Київ",
    photo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
    note: "Перша і головна точка. Тераса з видом на Поштову площу.",
  },
  {
    name: "Печерськ",
    address: "вул. Лаврська 8, Київ",
    hours: "Пн–Пт: 11:00–23:00\nСб–Нд: 10:00–00:00",
    maps: "https://maps.google.com/?q=вул.+Лаврська+8,+Київ",
    photo: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80",
    note: "Камерний зал для тих, хто цінує тишу і хороше вино.",
  },
  {
    name: "Оболонь",
    address: "просп. Оболонський 1, Київ",
    hours: "Пн–Пт: 12:00–23:00\nСб–Нд: 10:00–00:00",
    maps: "https://maps.google.com/?q=просп.+Оболонський+1,+Київ",
    photo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
    note: "Найбільший зал і найдовша тераса з виходом до набережної.",
  },
];

export default function ContactPage() {
  return (
    <div className="pt-20" style={{ background: "#faf7f2" }}>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-14">
        <p className="section-label mb-3" style={{ color: "#c49a3c" }}>Контакти</p>
        <h1
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 300,
            fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
            lineHeight: 1.05,
            color: "#1c1410",
          }}
        >
          Три локації в Києві
        </h1>
      </div>

      {/* Locations */}
      <div className="max-w-7xl mx-auto px-6">
        {locations.map((loc, i) => (
          <div
            key={loc.name}
            className="grid grid-cols-1 lg:grid-cols-2 mb-6"
            style={{ border: "1px solid #e8ddd4" }}
          >
            {/* Photo — alternates sides */}
            <div
              className={`relative ${i % 2 !== 0 ? "lg:order-2" : ""}`}
              style={{ minHeight: 420 }}
            >
              <Image
                src={loc.photo}
                alt={`Brasa ${loc.name}`}
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div
              className={`flex flex-col justify-center px-10 py-12 ${i % 2 !== 0 ? "lg:order-1" : ""}`}
              style={{ background: "#fff" }}
            >
              <p
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#c49a3c",
                  marginBottom: "1rem",
                }}
              >
                Brasa
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 300,
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "#1c1410",
                  lineHeight: 1,
                  marginBottom: "0.75rem",
                }}
              >
                {loc.name}
              </h2>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#9a8878",
                  marginBottom: "2rem",
                  lineHeight: 1.6,
                }}
              >
                {loc.note}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "2.5rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <MapPin size={14} color="#8b1a2e" style={{ marginTop: "0.15rem", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.9rem", color: "#3a2e24" }}>{loc.address}</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <Clock size={14} color="#8b1a2e" style={{ marginTop: "0.15rem", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.9rem", color: "#3a2e24", whiteSpace: "pre-line", lineHeight: 1.7 }}>
                    {loc.hours}
                  </span>
                </div>
              </div>

              <a
                href={loc.maps}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.72rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#8b1a2e",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(139,26,46,0.3)",
                  paddingBottom: "0.15rem",
                  width: "fit-content",
                  transition: "border-color 0.2s",
                }}
              >
                Відкрити в Google Maps →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom contacts */}
      <div
        className="max-w-7xl mx-auto px-6 py-16"
        style={{
          borderTop: "1px solid #e8ddd4",
          marginTop: "3rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "3rem",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 300,
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              color: "#1c1410",
              lineHeight: 1.2,
            }}
          >
            Є питання?<br />
            <span style={{ color: "#8b1a2e" }}>Зателефонуйте нам.</span>
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <a
            href="tel:+380671234567"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              fontSize: "1rem",
              color: "#1c1410",
              textDecoration: "none",
            }}
          >
            <Phone size={14} color="#8b1a2e" />
            +38 (067) 123-45-67
          </a>
          <a
            href="mailto:hello@brasa.ua"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              fontSize: "1rem",
              color: "#1c1410",
              textDecoration: "none",
            }}
          >
            <Mail size={14} color="#8b1a2e" />
            hello@brasa.ua
          </a>
        </div>
      </div>

    </div>
  );
}
