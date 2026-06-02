import Image from "next/image";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

const locations = [
  {
    name: "Поділ",
    address: "вул. Сагайдачного 14",
    hours: "Пн–Пт 11:00–23:00 · Сб–Нд 10:00–00:00",
    maps: "https://maps.google.com/?q=вул.+Сагайдачного+14,+Київ",
    hero: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    ],
  },
  {
    name: "Печерськ",
    address: "вул. Лаврська 8",
    hours: "Пн–Пт 11:00–23:00 · Сб–Нд 10:00–00:00",
    maps: "https://maps.google.com/?q=вул.+Лаврська+8,+Київ",
    hero: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80",
      "https://images.unsplash.com/photo-1482275548304-a58859dc31b7?w=800&q=80",
      "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800&q=80",
    ],
  },
  {
    name: "Оболонь",
    address: "просп. Оболонський 1",
    hours: "Пн–Пт 12:00–23:00 · Сб–Нд 10:00–00:00",
    maps: "https://maps.google.com/?q=просп.+Оболонський+1,+Київ",
    hero: "https://images.unsplash.com/photo-1470338745628-171cf53de3a8?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&q=80",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
    ],
  },
];

export default function ContactPage() {
  return (
    <div className="pt-20" style={{ background: "#faf7f2" }}>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-14">
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
      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {locations.map((loc, i) => (
          <div key={loc.name} style={{ borderTop: "1px solid #e8ddd4" }}>

            {/* Hero photo with overlay text */}
            <div className="relative overflow-hidden" style={{ height: "60vh", minHeight: 400 }}>
              <Image
                src={loc.hero}
                alt={`Brasa ${loc.name}`}
                fill
                className="object-cover"
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(28,20,16,0.85) 0%, rgba(28,20,16,0.2) 60%, transparent 100%)",
              }} />

              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-10 w-full">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <p style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#c49a3c",
                      marginBottom: "0.5rem",
                    }}>
                      0{i + 1}
                    </p>
                    <h2 style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontWeight: 300,
                      fontSize: "clamp(2.5rem, 5vw, 4rem)",
                      color: "#faf7f2",
                      lineHeight: 1,
                      marginBottom: "1rem",
                    }}>
                      {loc.name}
                    </h2>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "rgba(250,247,242,0.7)" }}>
                        <MapPin size={13} color="#c49a3c" />
                        {loc.address}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "rgba(250,247,242,0.7)" }}>
                        <Clock size={13} color="#c49a3c" />
                        {loc.hours}
                      </span>
                    </div>
                  </div>

                  <a
                    href={loc.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "0.75rem 1.5rem",
                      border: "1px solid rgba(250,247,242,0.35)",
                      color: "#faf7f2",
                      fontSize: "0.7rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      flexShrink: 0,
                      transition: "border-color 0.2s",
                    }}
                  >
                    Google Maps →
                  </a>
                </div>
              </div>
            </div>

            {/* Gallery row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
              {loc.gallery.map((src, j) => (
                <div key={j} className="relative overflow-hidden" style={{ height: 220 }}>
                  <Image
                    src={src}
                    alt={`${loc.name} атмосфера`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {j < 2 && (
                    <div style={{
                      position: "absolute", top: 0, right: 0, bottom: 0,
                      width: 1,
                      background: "#faf7f2",
                    }} />
                  )}
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

      {/* Bottom contacts */}
      <div
        className="max-w-7xl mx-auto px-6 py-16"
        style={{
          borderTop: "1px solid #e8ddd4",
          marginTop: "0",
          display: "flex",
          flexWrap: "wrap",
          gap: "3rem",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
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
        </div>

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
