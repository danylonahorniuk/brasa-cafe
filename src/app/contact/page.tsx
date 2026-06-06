"use client";

import Image from "next/image";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { useLang } from "@/context/LangContext";

const locations = [
  {
    name: "Поділ",
    address: "вул. Сагайдачного 14",
    hours: "Пн–Пт 11:00–23:00 · Сб–Нд 10:00–00:00",
    hoursEn: "Mon–Fri 11:00–23:00 · Sat–Sun 10:00–00:00",
    maps: "https://maps.google.com/?q=вул.+Сагайдачного+14,+Київ",
    photo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=85",
  },
  {
    name: "Печерськ",
    address: "вул. Лаврська 8",
    hours: "Пн–Нд 12:00–23:00",
    hoursEn: "Mon–Sun 12:00–23:00",
    maps: "https://maps.google.com/?q=вул.+Лаврська+8,+Київ",
    photo: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1600&q=85",
  },
  {
    name: "Оболонь",
    address: "просп. Оболонський 1",
    hours: "Пн–Пт 11:00–22:30 · Сб–Нд 10:00–23:00",
    hoursEn: "Mon–Fri 11:00–22:30 · Sat–Sun 10:00–23:00",
    maps: "https://maps.google.com/?q=просп.+Оболонський+1,+Київ",
    photo: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=1600&q=85",
  },
];

export default function ContactPage() {
  const { t, lang } = useLang();
  return (
    <div className="pt-16 lg:pt-20" style={{ background: "#ffffff" }}>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-10 sm:pt-16 pb-8 sm:pb-12">
        <h1 style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 300,
          fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
          lineHeight: 1.05,
          color: "#1c1410",
        }}>
          {t("contact.title")}
        </h1>
      </div>

      {/* Locations */}
      {locations.map((loc, i) => (
        <div key={loc.name} style={{ borderTop: "1px solid #e8ddd4" }}>

          {/* MOBILE — стек: інфо → фото */}
          <div className="lg:hidden">
            {/* Інфо */}
            <div className="px-5 pt-6 pb-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h2 style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 300,
                  fontSize: "clamp(2rem, 8vw, 2.8rem)",
                  color: "#1c1410",
                  lineHeight: 1,
                }}>
                  {loc.name}
                </h2>
                <a
                  href={loc.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 mt-1"
                  style={{
                    fontSize: "0.62rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#8b1a2e",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(139,26,46,0.3)",
                    paddingBottom: "0.1rem",
                  }}
                >
                  {t("contact.mapsLinkMobile")}
                </a>
              </div>
              <div className="flex flex-col gap-1.5">
                <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", color: "#7a6a5e" }}>
                  <MapPin size={12} color="#c49a3c" />
                  {loc.address}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", color: "#7a6a5e" }}>
                  <Clock size={12} color="#c49a3c" />
                  {lang === "en" ? loc.hoursEn : loc.hours}
                </span>
              </div>
            </div>

            {/* Фото — aspect ratio */}
            <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <Image
                src={loc.photo}
                alt={`Brasa ${loc.name}`}
                fill
                className="object-cover"
                priority={i === 0}
              />
            </div>
          </div>

          {/* DESKTOP — editorial: інфо зверху → широке фото */}
          <div className="hidden lg:block pb-20">
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
                  <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "#7a6a5e" }}>
                    <MapPin size={12} color="#c49a3c" />
                    {loc.address}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "#7a6a5e" }}>
                    <Clock size={12} color="#c49a3c" />
                    {lang === "en" ? loc.hoursEn : loc.hours}
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
                {t("contact.mapsLinkDesktop")}
              </a>
            </div>

            <div className="max-w-7xl mx-auto px-6">
              <div className="relative overflow-hidden" style={{ height: 440 }}>
                <Image
                  src={loc.photo}
                  alt={`Brasa ${loc.name}`}
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            </div>
          </div>

        </div>
      ))}

      {/* Bottom contacts */}
      <div
        className="max-w-7xl mx-auto px-5 sm:px-6 py-10 sm:py-16"
        style={{
          borderTop: "1px solid #e8ddd4",
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 300,
          fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
          color: "#1c1410",
          lineHeight: 1.2,
        }}>
          {t("contact.question")}<br />
          <span style={{ color: "#8b1a2e" }}>{t("contact.callUs")}</span>
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
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
