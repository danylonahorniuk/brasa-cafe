export type Category = "pizza" | "rolls" | "burgers" | "alcohol";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  badge?: string;
  popular?: boolean;
  isNew?: boolean;
  spicy?: boolean;
  weight?: string;
}

export const menuItems: MenuItem[] = [
  // ── PIZZA ──
  {
    id: 1,
    name: "Маргарита Брasa",
    description: "Томатний соус, моцарела фіор ді лате, базилік, оливкова олія",
    price: 289,
    category: "pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80",
    popular: true,
    weight: "420г",
  },
  {
    id: 2,
    name: "Карбонара",
    description: "Вершковий соус, бекон, моцарела, яйце, пармезан, чорний перець",
    price: 359,
    category: "pizza",
    image: "https://images.unsplash.com/photo-1555072956-7758afb20e8f?w=600&q=80",
    badge: "Хіт",
    popular: true,
    weight: "480г",
  },
  {
    id: 3,
    name: "Діабло",
    description: "Томатний соус, пепероні, халапеньо, моцарела, часникова олія",
    price: 329,
    category: "pizza",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    spicy: true,
    weight: "450г",
  },
  {
    id: 4,
    name: "Чотири сири",
    description: "Вершковий соус, моцарела, горгонзола, пармезан, гауда",
    price: 379,
    category: "pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80",
    weight: "460г",
  },
  {
    id: 5,
    name: "BBQ Чикен",
    description: "BBQ соус, куряче філе, ред оніон, моцарела, корніжони",
    price: 345,
    category: "pizza",
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&q=80",
    weight: "470г",
  },
  {
    id: 6,
    name: "Трюфельна",
    description: "Трюфельна олія, гриби, пармезан, рукола, бальзамічний крем",
    price: 429,
    category: "pizza",
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600&q=80",
    badge: "Преміум",
    isNew: true,
    weight: "440г",
  },

  // ── ROLLS ──
  {
    id: 7,
    name: "Філадельфія",
    description: "Лосось, крем-сир, огірок, авокадо, кунжут",
    price: 299,
    category: "rolls",
    image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600&q=80",
    popular: true,
    weight: "260г / 8шт",
  },
  {
    id: 8,
    name: "Дракон",
    description: "Угор, авокадо, огірок, тобіко, унагі соус",
    price: 349,
    category: "rolls",
    image: "https://images.unsplash.com/photo-1561339429-c1e0fd45fabd?w=600&q=80",
    badge: "Топ",
    weight: "280г / 8шт",
  },
  {
    id: 9,
    name: "Спайсі Тунець",
    description: "Тунець, авокадо, спайсі маніонез, кунжут, зелена цибуля",
    price: 319,
    category: "rolls",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80",
    spicy: true,
    weight: "250г / 8шт",
  },
  {
    id: 10,
    name: "Каліфорнія",
    description: "Краб, огірок, авокадо, тобіко, майонез",
    price: 279,
    category: "rolls",
    image: "https://images.unsplash.com/photo-1582450871972-ab5ca641643d?w=600&q=80",
    weight: "260г / 8шт",
  },

  // ── BURGERS ──
  {
    id: 11,
    name: "Brasa Classic",
    description: "Яловичий патті 180г, бриош, чеддер, карамелізована цибуля, корніжони, соус Brasa",
    price: 299,
    category: "burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    popular: true,
    weight: "380г",
  },
  {
    id: 12,
    name: "Smash Burger",
    description: "Подвійний смеш патті, американський сир, маринований огірок, гірчиця, кетчуп",
    price: 349,
    category: "burgers",
    image: "https://images.unsplash.com/photo-1586816001966-79b736744398?w=600&q=80",
    badge: "Новинка",
    isNew: true,
    weight: "420г",
  },
  {
    id: 13,
    name: "Black Truffle",
    description: "Яловичий патті, трюфельний айолі, бри, рукола, карамелізовані груші",
    price: 399,
    category: "burgers",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80",
    badge: "Преміум",
    isNew: true,
    weight: "400г",
  },
  {
    id: 14,
    name: "Crispy Chicken",
    description: "Хрустке куряче філе, соус баффало, салат айсберг, томат, ранч",
    price: 279,
    category: "burgers",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cee6ad?w=600&q=80",
    spicy: true,
    weight: "360г",
  },

  // ── ALCOHOL ──
  {
    id: 15,
    name: "Aperol Spritz",
    description: "Aperol, просеко, содова, апельсин",
    price: 189,
    category: "alcohol",
    image: "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=600&q=80",
    popular: true,
    weight: "250мл",
  },
  {
    id: 16,
    name: "Negroni",
    description: "Джин, Campari, солодкий вермут, апельсинова цедра",
    price: 219,
    category: "alcohol",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80",
    weight: "100мл",
  },
  {
    id: 17,
    name: "Craft IPA",
    description: "Крафтове пиво, гіркота хмелю, цитрусовий аромат",
    price: 149,
    category: "alcohol",
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&q=80",
    weight: "500мл",
  },
  {
    id: 18,
    name: "Whisky Sour",
    description: "Бурбон, лимонний сік, цукровий сироп, яєчний білок",
    price: 239,
    category: "alcohol",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600&q=80",
    weight: "150мл",
  },
];

export const categories = [
  { id: "pizza",   label: "Піца",     icon: "🍕", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80",  description: "18 видів піци" },
  { id: "rolls",   label: "Роли",     icon: "🍣", image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=800&q=80", description: "Свіжі щодня" },
  { id: "burgers", label: "Бургери",  icon: "🍔", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", description: "Smash & classic" },
  { id: "alcohol", label: "Алкоголь", icon: "🍸", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80", description: "Коктейлі та крафт" },
] as const;

export const promos = [
  {
    id: 1,
    icon: "🍕",
    label: "3+1",
    title: "Комбо меню",
    subtitle: "Третя піца — в подарунок!",
    description: "Замовляй будь-які дві піци і отримай третю безкоштовно. Діє на доставку та самовивіз. Не комбінується з іншими акціями.",
    href: "/menu?category=pizza",
  },
  {
    id: 2,
    icon: "🎁",
    label: "від 750 грн",
    title: "Піца або рол у подарунок",
    subtitle: "Піца або рол у подарунок від 750 грн",
    description: "За кожні 750 грн замовлення — піца або рол безкоштовно на вибір. Діє пн–чт на доставку та самовивіз.",
    href: "/menu",
  },
  {
    id: 3,
    icon: "🍣",
    label: "11:00–16:00",
    title: "Щасливі години на суші",
    subtitle: "Щасливі години на суші-сети",
    description: "Щодня з 11:00 до 16:00 — знижка на всі суші-сети. Діє на доставку та самовивіз. Не діє у святкові дні.",
    href: "/menu?category=rolls",
  },
  {
    id: 4,
    icon: "🛵",
    label: "−20%",
    title: "Забирай сам зі знижкою",
    subtitle: "Забирай сам зі знижкою 20%",
    description: "Постійна знижка 20% на всі піци та бургери при самовивозі. Деталі акції уточнюйте у оператора.",
    href: "/menu",
  },
  {
    id: 5,
    icon: "🎂",
    label: "−21%",
    title: "Знижка в день народження",
    subtitle: "Знижка 21% у день народження!",
    description: "У день народження та протягом 7 днів після — знижка 21% на все меню. Діє на доставку та самовивіз.",
    href: "/menu",
  },
  {
    id: 6,
    icon: "⭐",
    label: "5% кешбек",
    title: "Бонусна програма",
    subtitle: "Накопичуй бонуси з кожним замовленням",
    description: "5% від суми кожного замовлення повертається на бонусний рахунок. Бонусами можна оплачувати наступні замовлення.",
    href: "/menu",
  },
];

export const promotions = [
  {
    id: 1,
    title: "2 піци = 3-тя в подарунок",
    subtitle: "Замов дві будь-які піци і отримай третю безкоштовно",
    badge: "Акція",
    cta: "Замовити зараз",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1600&q=80",
    href: "/menu",
  },
  {
    id: 2,
    title: "−20% при самовивозі",
    subtitle: "Заощаджуй на кожному замовленні — забери замовлення сам",
    badge: "Знижка",
    cta: "Оформити замовлення",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80",
    href: "/menu",
  },
  {
    id: 3,
    title: "Нічне комбо 21:00–23:00",
    subtitle: "Піца + роли + напій за спеціальною ціною щовечора",
    badge: "Нічна акція",
    cta: "Дивитись комбо",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1600&q=80",
    href: "/menu",
  },
  {
    id: 4,
    title: "Бізнес-ланч 12:00–15:00",
    subtitle: "Суп + основна страва + напій. Щодня, крім неділі",
    badge: "Ланч",
    cta: "Забронювати столик",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1600&q=80",
    href: "/booking",
  },
];
