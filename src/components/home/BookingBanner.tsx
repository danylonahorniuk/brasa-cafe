import Image from "next/image";
import Link from "next/link";
import { Phone, Calendar } from "lucide-react";

export default function BookingBanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div
        className="rounded-sm overflow-hidden grid grid-cols-1 md:grid-cols-2"
        style={{ background: "#1c1410", minHeight: "420px" }}
      >
        {/* Фото */}
        <div className="relative min-h-[280px] md:min-h-0">
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80"
            alt="Зал Brasa"
            fill
            className="object-cover"
            sizes="50vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, transparent 60%, #1c1410 100%)" }}
          />
        </div>

        {/* Текст */}
        <div className="flex flex-col justify-center px-10 py-12">
          <p className="section-label mb-4" style={{ color: "#c49a3c" }}>Бронювання</p>
          <h2
            className="text-4xl md:text-5xl text-white mb-4"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, lineHeight: 1.1 }}
          >
            Забронюйте столик<br />
            <em className="not-italic" style={{ color: "#c49a3c" }}>онлайн за хвилину</em>
          </h2>
          <p className="text-sm mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Оберіть дату, час і кількість гостей. Підтвердження — одразу на телефон.
          </p>

          {/* Міні-інфо */}
          <div className="flex flex-col gap-2 mb-8">
            {[
              { icon: Calendar, text: "Щодня 11:00 – 23:00" },
              { icon: Phone,    text: "+38 (044) 123-45-67" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-sm flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(196,154,60,0.12)", border: "1px solid rgba(196,154,60,0.25)" }}
                >
                  <item.icon size={13} color="#c49a3c" />
                </div>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{item.text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/booking" className="booking-btn-primary">
              <span>Забронювати</span>
              <span className="booking-btn-arrow">→</span>
            </Link>
            <a href="tel:+380441234567" className="booking-btn-gold">
              <Phone size={13} /> Зателефонувати
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .booking-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.72rem 1.8rem;
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
        .booking-btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(196,154,60,0.1) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .booking-btn-primary:hover {
          box-shadow: 0 6px 28px rgba(80,14,28,0.6), inset 0 1px 0 rgba(255,255,255,0.15);
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.2);
        }
        .booking-btn-primary:hover::before { opacity: 1; }
        .booking-btn-arrow {
          display: inline-block;
          transition: transform 0.3s ease;
        }
        .booking-btn-primary:hover .booking-btn-arrow {
          transform: translateX(4px);
        }

        .booking-btn-gold {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.72rem 1.8rem;
          border-radius: 2px;
          font-size: 0.7rem;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(196,154,60,0.8);
          background: rgba(196,154,60,0.06);
          border: 1px solid rgba(196,154,60,0.28);
          transition: all 0.3s ease;
        }
        .booking-btn-gold:hover {
          background: rgba(196,154,60,0.12);
          border-color: rgba(196,154,60,0.55);
          color: #c49a3c;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(196,154,60,0.12);
        }
      `}</style>
    </section>
  );
}
