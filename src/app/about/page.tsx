import Image from "next/image";
import Link from "next/link";
import { Flame, Award, Heart, Clock } from "lucide-react";

const values = [
  { icon: Flame, title: "Живий вогонь",   text: "Кожна піца — на дровах. Ми дозволяємо тісту дозріти 48 годин." },
  { icon: Award, title: "Тільки свіже",   text: "Постачальники з Київщини та Карпат. Жодних напівфабрикатів."   },
  { icon: Heart, title: "З душею",         text: "Кухарі, які люблять свою справу. Це відчувається в кожній тарілці." },
  { icon: Clock, title: "Завжди вчасно",  text: "Якщо доставка спізнюється більше 60 хв — наступне безкоштовно." },
];

export default function AboutPage() {
  return (
    <div className="pt-20" style={{ background: "#faf7f2" }}>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80"
          alt="Brasa інтер'єр"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(28,20,16,0.8) 0%, rgba(28,20,16,0.2) 60%, transparent 100%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full">
          <p className="section-label mb-3" style={{ color: "#c49a3c" }}>Про нас</p>
          <h1 className="text-5xl md:text-7xl text-white" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, lineHeight: 1.05 }}>
            Наша історія
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "#7a6a5e" }}>
              <strong style={{ color: "#1c1410", fontWeight: 500 }}>Brasa</strong> — це більше ніж кафе. Це місце де збираються люди, які цінують справжній смак і теплу атмосферу.
            </p>
            <p className="leading-relaxed mb-6 text-sm" style={{ color: "#7a6a5e" }}>
              Ми відкрились у 2020 році з простою ідеєю: готувати так, як готує мама — з душею, зі свіжих продуктів, без поспіху.
            </p>
            <p className="leading-relaxed mb-8 text-sm" style={{ color: "#7a6a5e" }}>
              Назва <em style={{ color: "#8b1a2e" }}>Brasa</em> — іспанське слово, що означає «жар», «вугілля». Це наша філософія: повільний вогонь, який перетворює прості інгредієнти на щось неймовірне.
            </p>
            <Link href="/menu" className="btn-primary">Переглянути меню</Link>
          </div>
          <div className="relative h-96 rounded-sm overflow-hidden" style={{ border: "1px solid #e8ddd4" }}>
            <Image
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
              alt="Кухня Brasa"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: "#fff", borderTop: "1px solid #e8ddd4", borderBottom: "1px solid #e8ddd4" }}>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <p className="section-label mb-3 text-center">Наші принципи</p>
          <h2 className="text-4xl text-center mb-12" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, color: "#1c1410" }}>
            Чому обирають Brasa
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title} className="p-6 rounded-sm" style={{ background: "#faf7f2", border: "1px solid #e8ddd4" }}>
                <div className="w-10 h-10 rounded-sm flex items-center justify-center mb-4" style={{ background: "rgba(139,26,46,0.07)", border: "1px solid rgba(139,26,46,0.15)" }}>
                  <v.icon size={18} color="#8b1a2e" />
                </div>
                <h3 className="text-lg mb-2" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400, color: "#1c1410" }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#a09080" }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
