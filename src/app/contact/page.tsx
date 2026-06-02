import Image from "next/image";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

const locations = [
  {
    name: "Поділ",
    address: "вул. Сагайдачного 14",
    hours: "Пн–Пт 11:00–23:00 · Сб–Нд 10:00–00:00",
    maps: "https://maps.google.com/?q=вул.+Сагайдачного+14,+Київ",
    photo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=85",
  },
  {
    name: "Печерськ",
    address: "вул. Лаврська 8",
    hours: "Пн–Пт 11:00–23:00 · Сб–Нд 10:00–00:00",
    maps: "https://maps.google.com/?q=вул.+Лаврська+8,+Київ",
    photo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=85",
  },
  {
    name: "Оболонь",
    address: "просп. Оболонський 1",
    hours: "Пн–Пт 12:00–23:00 · Сб–Нд 10:00–00:00",
    maps: "https://maps.google.com/?q=просп.+Оболонський+1,+Київ",
    photo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=85",
  },
];

export default function ContactPage() {
  return (
    <div className="pt-20" style={{ background: "#faf7f2" }}>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-16">
        <h1 style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 300,
          fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
          lineHeight: 1.05,
          color: "#1c1410",
        }}>
          Три локації в Києві
        </h1>
      </div>

      {/* Locations */}
      {locations.map((loc, i) => (
        <div
          key={loc.name}
          style={{
            borderTop: "1px solid #e8ddd4",
            paddingBottom: "5rem",
          }}
        >
          {/* Info row */}
          <div
            className="max-w-7xl mx-auto px-6"
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
              paddingTop: "3rem",
              paddingBottom: "2.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "2rem", flexWrap: "wrap" }}>
              <h2 style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 300,
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                color: "#1c1410",
                lineHeight: 1,
              }}>
                {loc.name}
              </h2>
              <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                <span style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  fontSize: "0.85rem", color: "#7a6a5e",
                }}>
                  <MapPin size={12} color="#c49a3c" />
                  {loc.address}
                </span>
                <span style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  fontSize: "0.85rem", color: "#7a6a5e",
                }}>
                  <Clock size={12} color="#c49a3c" />
                  {loc.hours}
                </span>
              </div>
            </div>

            <a
              href={loc.maps}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#8b1a2e",
                textDecoration: "none",
                borderBottom: "1px solid rgba(139,26,46,0.3)",
                paddingBottom: "0.1rem",
                whiteSpace: "nowrap",
              }}
            >
              Google Maps →
            </a>
          </div>

          {/* Photo */}
          <div
            className="relative overflow-hidden"
            style={{ height: "62vh", minHeight: 380 }}
          >
            <Image
              src={loc.photo}
              alt={`Brasa ${loc.name}`}
              fill
              className="object-cover"
              priority={i === 0}
            />
          </div>
        </div>
      ))}

      {/* Bottom contacts */}
      <div
        className="max-w-7xl mx-auto px-6 py-16"
        style={{
          borderTop: "1px solid #e8ddd4",
          display: "flex",
          flexWrap: "wrap",
          gap: "3rem",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 300,
          fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
          color: "#1c1410",
          lineHeight: 1.2,
        }}>
          Є питання?<br />
          <span style={{ color: "#8b1a2e" }}>Зателефонуйте нам.</span>
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <a href="tel:+380671234567" style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            fontSize: "1rem", color: "#1c1410", textDecoration: "none",
          }}>
            <Phone size={14} color="#8b1a2e" />
            +38 (067) 123-45-67
          </a>
          <a href="mailto:hello@brasa.ua" style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            fontSize: "1rem", color: "#1c1410", textDecoration: "none",
          }}>
            <Mail size={14} color="#8b1a2e" />
            hello@brasa.ua
          </a>
        </div>
      </div>

    </div>
  );
}
