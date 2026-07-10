import React, { useState, useEffect } from "react";

// ─── ЦВЕТА ───────────────────────────────────────────────────
const C = {
  bg: "#0F0F1A", card: "#1A1A2E", cardHover: "#1E1E38",
  accent: "#7C3AED", accentLight: "#A78BFA",
  success: "#22C55E", warning: "#F59E0B", error: "#EF4444",
  text: "#F1F5F9", muted: "#94A3B8", border: "#2D2D4E",
};

// ─── ИКОНКИ (Neon Outline) ───────────────────────────────────
function Ico({ id, size = 24, c1 = "#7C3AED", c2 = "#A78BFA", sw = 1.8, children }) {
  const gid = `g${id}`, fid = `f${id}`, rid = `r${id}`;
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={c1} /><stop offset="100%" stopColor={c2} />
        </linearGradient>
        <filter id={fid} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" result="b" in="SourceGraphic" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id={rid} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={c1} stopOpacity="0.12" />
          <stop offset="100%" stopColor={c1} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${rid})`} />
      <g filter={`url(#${fid})`} stroke={`url(#${gid})`} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none">
        {children}
      </g>
    </svg>
  );
}

const IcoHome = ({ size = 24 }) => (
  <Ico id="hm" size={size}>
    <path d="M6 13.5C6 11.3 7.8 9.5 10 9.5H22C24.2 9.5 26 11.3 26 13.5V17C26 20.1 23.5 22.5 20.4 22.5H11.6C8.5 22.5 6 20.1 6 17V13.5Z" />
    <line x1="9" y1="15.5" x2="13.5" y2="15.5" /><line x1="11.2" y1="13.2" x2="11.2" y2="17.8" />
    <circle cx="20.5" cy="13.5" r="1.1" /><circle cx="22.5" cy="15.5" r="1.1" /><circle cx="20.5" cy="17.5" r="1.1" />
    <circle cx="12.5" cy="20" r="1.5" /><circle cx="19.5" cy="20" r="1.5" />
  </Ico>
);

const IcoOrders = ({ size = 24 }) => (
  <Ico id="or" size={size}>
    <path d="M7 15H25V22C25 23.1 24.1 24 23 24H9C7.9 24 7 23.1 7 22V15Z" />
    <path d="M5 11C5 9.9 5.9 9 7 9H25C26.1 9 27 9.9 27 11V15H5V11Z" />
    <line x1="16" y1="9" x2="16" y2="24" />
    <path d="M16 9C16 9 13 7.5 12 6C12 6 14 6 16 9Z" />
    <path d="M16 9C16 9 19 7.5 20 6C20 6 18 6 16 9Z" />
  </Ico>
);

const IcoProfile = ({ size = 24 }) => (
  <Ico id="pr" size={size}>
    <circle cx="16" cy="12" r="5" />
    <path d="M7 27C7 22.6 11 19 16 19C21 19 25 22.6 25 27" />
  </Ico>
);

const IcoSearch = ({ size = 24 }) => (
  <Ico id="sr" size={size}>
    <circle cx="14.5" cy="14.5" r="6.5" />
    <line x1="19.5" y1="19.5" x2="25" y2="25" />
  </Ico>
);

const IcoGames = ({ size = 24 }) => (
  <Ico id="gm" size={size} c1="#7C3AED" c2="#C084FC">
    <rect x="13.5" y="17" width="5" height="8" rx="2.5" />
    <ellipse cx="16" cy="25" rx="5.5" ry="2" />
    <circle cx="16" cy="13.5" r="5" />
    <path d="M13.5 11.5C14 10.8 14.9 10.5 16 10.5" strokeWidth="1.3" />
  </Ico>
);

const IcoGiftCard = ({ size = 24 }) => (
  <Ico id="gc" size={size} c1="#7C3AED" c2="#06B6D4">
    <rect x="4" y="9" width="24" height="15" rx="3.5" />
    <line x1="4" y1="14" x2="28" y2="14" />
    <rect x="8" y="17" width="5" height="3.5" rx="1" />
    <path d="M21 11.5L21.7 13.5H23.8L22.1 14.7L22.8 16.7L21 15.5L19.2 16.7L19.9 14.7L18.2 13.5H20.3L21 11.5Z" strokeWidth="1.2" />
  </Ico>
);

const IcoSubs = ({ size = 24 }) => (
  <Ico id="sb" size={size} c1="#7C3AED" c2="#22C55E">
    <path d="M18.5 5L9 18H16L13.5 27L23 14H16L18.5 5Z" />
  </Ico>
);

const IcoBuy = ({ size = 24 }) => (
  <Ico id="by" size={size} c1="#F59E0B" c2="#EF4444">
    <path d="M5 11C5 9.9 5.9 9 7 9H25C26.1 9 27 9.9 27 11V23C27 24.1 26.1 25 25 25H7C5.9 25 5 24.1 5 23V11Z" />
    <line x1="5" y1="14" x2="27" y2="14" />
    <rect x="19" y="17" width="8" height="5" rx="2.5" />
    <circle cx="23" cy="19.5" r="1.2" />
  </Ico>
);

const IcoCopy = ({ size = 24 }) => (
  <Ico id="cp" size={size}>
    <rect x="11" y="6" width="14" height="17" rx="3" />
    <rect x="7" y="10" width="14" height="17" rx="3" />
    <line x1="10.5" y1="15" x2="17.5" y2="15" />
    <line x1="10.5" y1="18" x2="15.5" y2="18" />
    <line x1="10.5" y1="21" x2="16.5" y2="21" />
  </Ico>
);

const IcoReferral = ({ size = 24 }) => (
  <Ico id="rf" size={size} c1="#7C3AED" c2="#F59E0B">
    <circle cx="9.5" cy="11" r="3.5" /><path d="M3 24C3 20.7 5.9 18 9.5 18" />
    <circle cx="22.5" cy="11" r="3.5" /><path d="M22.5 18C26.1 18 29 20.7 29 24" />
    <path d="M14 17L16 14.5L18 17" /><line x1="16" y1="14.5" x2="16" y2="19.5" />
  </Ico>
);

const IcoCashback = ({ size = 24 }) => (
  <Ico id="cb" size={size} c1="#22C55E" c2="#06B6D4">
    <path d="M24 16C24 20.4 20.4 24 16 24C11.6 24 8 20.4 8 16C8 11.6 11.6 8 16 8C18.8 8 21.3 9.4 22.8 11.5" />
    <path d="M23 7.5V12H18.5" />
    <path d="M15 13.5H17.5C18.3 13.5 19 14.2 19 15C19 15.8 18.3 16.5 17.5 16.5H15V13.5Z" strokeWidth="1.4" />
    <line x1="15" y1="16.5" x2="18.5" y2="16.5" strokeWidth="1.4" />
    <line x1="15" y1="12.5" x2="15" y2="19.5" strokeWidth="1.4" />
  </Ico>
);

const IcoSupport = ({ size = 24 }) => (
  <Ico id="sp" size={size} c1="#7C3AED" c2="#06B6D4">
    <path d="M6 8C6 6.9 6.9 6 8 6H24C25.1 6 26 6.9 26 8V19C26 20.1 25.1 21 24 21H13L8 26V21C6.9 21 6 20.1 6 19V8Z" />
    <path d="M13.5 12.5C13.5 11 14.6 10 16 10C17.4 10 18.5 11 18.5 12.5C18.5 13.8 17.2 14.5 16 15.2V16.5" strokeWidth="1.7" />
    <circle cx="16" cy="19" r="0.9" stroke="none" fill="#A78BFA" />
  </Ico>
);

const IcoSuccess = ({ size = 24 }) => (
  <Ico id="ok" size={size} c1="#22C55E" c2="#10B981">
    <circle cx="16" cy="16" r="10" />
    <path d="M11 16L14.5 19.5L21 13" />
  </Ico>
);

const IcoPending = ({ size = 24 }) => (
  <Ico id="pd" size={size} c1="#F59E0B" c2="#EF4444">
    <circle cx="16" cy="16" r="10" />
    <path d="M16 10V16L20.5 18.5" />
    <line x1="16" y1="7" x2="16" y2="9" strokeWidth="2.2" />
    <line x1="16" y1="23" x2="16" y2="25" strokeWidth="2.2" />
    <line x1="7" y1="16" x2="9" y2="16" strokeWidth="2.2" />
    <line x1="23" y1="16" x2="25" y2="16" strokeWidth="2.2" />
  </Ico>
);

const IcoError = ({ size = 24 }) => (
  <Ico id="er" size={size} c1="#EF4444" c2="#DC2626">
    <circle cx="16" cy="16" r="10" />
    <path d="M12.5 12.5L19.5 19.5M19.5 12.5L12.5 19.5" />
  </Ico>
);

// Индикатор онлайн — два концентрических круга с зелёным glow
const IcoOnline = ({ size = 14 }) => (
  <Ico id="onl" size={size} c1="#22C55E" c2="#10B981" sw={1.5}>
    <circle cx="16" cy="16" r="9" />
    <circle cx="16" cy="16" r="4" />
  </Ico>
);

// Иконки для продуктов
const IcoPUBG = ({ size = 36 }) => (
  <Ico id="pb" size={size} c1="#F59E0B" c2="#EF4444">
    <circle cx="16" cy="16" r="9" />
    <path d="M11 12H16C18.2 12 20 13.8 20 16C20 18.2 18.2 20 16 20H13V23" strokeWidth="2.2" />
    <line x1="13" y1="16" x2="20" y2="16" strokeWidth="1.5" />
  </Ico>
);

const IcoGenshin = ({ size = 36 }) => (
  <Ico id="gs" size={size} c1="#A78BFA" c2="#7C3AED">
    <path d="M16 5L19 12H26L20.5 16.5L22.5 24L16 19.5L9.5 24L11.5 16.5L6 12H13L16 5Z" />
  </Ico>
);

const IcoSpotify = ({ size = 36 }) => (
  <Ico id="st" size={size} c1="#22C55E" c2="#16A34A">
    <circle cx="16" cy="16" r="10" />
    <path d="M11 13C13.5 12 18.5 12 21 13.5" strokeWidth="2" />
    <path d="M11.5 16.5C13.5 15.5 18 15.5 20 16.8" strokeWidth="2" />
    <path d="M12 20C14 19.2 17.5 19.2 19.5 20.2" strokeWidth="2" />
  </Ico>
);

const IcoPSN = ({ size = 36 }) => (
  <Ico id="ps" size={size} c1="#3B82F6" c2="#06B6D4">
    <path d="M8 22V10L13 9V21L8 22Z" strokeWidth="2" />
    <path d="M13 14C13 14 14 11 17 11C20 11 21 13 21 14.5C21 17 19 18 17 18H13" strokeWidth="1.8" />
    <path d="M17 18L22 22" strokeWidth="2" />
  </Ico>
);

const IcoAppStore = ({ size = 36 }) => (
  <Ico id="as" size={size} c1="#94A3B8" c2="#CBD5E1">
    <path d="M16 6L19.5 12.5H26L20.5 17L23 23.5L16 19L9 23.5L11.5 17L6 12.5H12.5L16 6Z" />
  </Ico>
);

const IcoGooglePlay = ({ size = 36 }) => (
  <Ico id="gp" size={size} c1="#22C55E" c2="#06B6D4">
    <path d="M8 7L24 16L8 25V7Z" />
    <path d="M8 7L16 15" strokeWidth="1.5" />
    <path d="M8 25L16 17" strokeWidth="1.5" />
  </Ico>
);

// ─── ДАННЫЕ ──────────────────────────────────────────────────
const PRODUCT_ICONS = {
  1: IcoPUBG, 2: IcoGooglePlay, 3: IcoAppStore,
  4: IcoPSN, 5: IcoGenshin, 6: IcoSpotify,
};

const products = [
  {
    id: 1, category: "games", name: "PUBG Mobile UC", color: "#F59E0B",
    region: "🌍 Глобальный", regionNote: "Для любого аккаунта PUBG Mobile",
    badge: "🔥 Хит", deliveryTime: "Мгновенно", validity: "Бессрочно",
    compatibility: "Любой существующий аккаунт",
    description: "Пополни баланс UC прямо на аккаунт. Трать на скины, боевые пропуски и эксклюзивные наборы. Зачисление за 5–30 секунд.",
    instruction: ["Открой PUBG Mobile → Настройки → Аккаунт", "Скопируй свой Player ID", "Вставь ID в поле при оформлении заказа"],
    variants: [{ label: "60 UC", price: 120 }, { label: "325 UC", price: 590 }, { label: "660 UC", price: 1150 }, { label: "1800 UC", price: 2900 }],
    soldToday: 312, guarantee: true, needsId: true,
  },
  {
    id: 2, category: "gift", name: "Google Play", color: "#22C55E",
    region: "🇹🇷 Турция", regionNote: "Для аккаунтов с турецким регионом",
    badge: "🔥 Хит", deliveryTime: "Мгновенно", validity: "12 месяцев",
    compatibility: "Аккаунт Google с регионом Турция",
    description: "Пополни баланс Google Play и покупай приложения, игры и подписки. Работает со всеми Android-устройствами при турецком регионе аккаунта.",
    instruction: ["Открой Google Play → меню → Погасить код", "Введи полученный код", "Баланс зачислится автоматически"],
    variants: [{ label: "$5", price: 490 }, { label: "$10", price: 950 }, { label: "$25", price: 2350 }, { label: "$50", price: 4600 }],
    soldToday: 847, guarantee: true, needsId: false,
  },
  {
    id: 3, category: "gift", name: "App Store", color: "#94A3B8",
    region: "🇷🇺 Россия", regionNote: "Для российских Apple ID",
    badge: null, deliveryTime: "Мгновенно", validity: "12 месяцев",
    compatibility: "Apple ID с регионом Россия",
    description: "Пополни баланс App Store и покупай приложения, игры и подписки Apple. Работает на iPhone, iPad, Mac.",
    instruction: ["Открой App Store → профиль → Погасить подарочную карту", "Введи код вручную или отсканируй камерой", "Баланс зачислится на аккаунт"],
    variants: [{ label: "500 ₽", price: 560 }, { label: "1000 ₽", price: 1100 }, { label: "3000 ₽", price: 3250 }],
    soldToday: 523, guarantee: true, needsId: false,
  },
  {
    id: 4, category: "gift", name: "PSN Store", color: "#3B82F6",
    region: "🇹🇷 Турция", regionNote: "Для турецких PSN аккаунтов",
    badge: "🆕 Новинка", deliveryTime: "Мгновенно", validity: "12 месяцев",
    compatibility: "Аккаунт PlayStation с регионом Турция",
    description: "Пополни кошелёк PSN и покупай игры, DLC и подписки PS Plus в турецком магазине. Цены значительно ниже российского региона.",
    instruction: ["Войди в PS4/PS5 или на сайт PSN", "Настройки → Учётная запись → Погасить коды", "Введи 12-значный код"],
    variants: [{ label: "200 TL", price: 620 }, { label: "500 TL", price: 1490 }, { label: "1000 TL", price: 2850 }],
    soldToday: 189, guarantee: true, needsId: false,
  },
  {
    id: 5, category: "games", name: "Genshin Impact", color: "#A78BFA",
    region: "🌍 Глобальный", regionNote: "Введи UID и выбери сервер",
    badge: null, deliveryTime: "До 5 минут", validity: "Бессрочно",
    compatibility: "Любой аккаунт Genshin Impact",
    description: "Пополни кристаллы Primogem и Genesis для круток и покупок в магазине. Поддерживаем все серверы: Азия, Европа, Америка, TW/HK/MO.",
    instruction: ["Открой Genshin Impact → Настройки → Аккаунт", "Скопируй UID (9 цифр)", "Укажи UID и сервер при оформлении"],
    variants: [{ label: "60 Genesis", price: 100 }, { label: "330 Genesis", price: 520 }, { label: "1090 Genesis", price: 1600 }],
    soldToday: 234, guarantee: true, needsId: true,
  },
  {
    id: 6, category: "subs", name: "Spotify Premium", color: "#22C55E",
    region: "🇹🇷 Турция", regionNote: "Индивидуальная подписка, 1 месяц",
    badge: "🔥 Хит", deliveryTime: "Мгновенно", validity: "1–12 месяцев",
    compatibility: "Новый или существующий аккаунт Spotify",
    description: "Слушай музыку без рекламы и ограничений. Скачивай треки офлайн. Работает на всех устройствах. Турецкий регион — самые низкие цены.",
    instruction: ["Открой Spotify → Настройки → Ваш план", "Нажми «Погасить» и введи код", "Подписка активируется мгновенно"],
    variants: [{ label: "1 месяц", price: 290 }, { label: "3 месяца", price: 810 }, { label: "12 месяцев", price: 2900 }],
    soldToday: 401, guarantee: true, needsId: false,
  },
];

const mockOrders = [
  { id: "ORD-4821", product: "Google Play $10", price: 950, date: "Сегодня, 13:42", status: "done", code: "GPLAY-X7K2-M9QR-4TBN" },
  { id: "ORD-4803", product: "App Store 500₽", price: 560, date: "Вчера, 20:15", status: "done", code: "APPS-N3H8-K1WQ-7ZMP" },
  { id: "ORD-4791", product: "PUBG 325 UC", price: 590, date: "25 июн, 11:30", status: "done", code: null },
];

// ─── КОМПОНЕНТЫ ──────────────────────────────────────────────
function Badge({ children, color = C.accent }) {
  return (
    <span style={{ background: color + "22", color, fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20, border: `1px solid ${color}44` }}>
      {children}
    </span>
  );
}

function TabBar({ active, onChange }) {
  const tabs = [
    { id: "home", Icon: IcoHome, label: "Главная" },
    { id: "orders", Icon: IcoOrders, label: "Заказы" },
    { id: "profile", Icon: IcoProfile, label: "Профиль" },
  ];
  return (
    <div style={{ display: "flex", borderTop: `1px solid ${C.border}`, background: C.card }}>
      {tabs.map(({ id, Icon, label }) => (
        <button key={id} onClick={() => onChange(id)}
          style={{ flex: 1, padding: "10px 0 8px", background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <Icon size={active === id ? 26 : 22} />
          <span style={{ fontSize: 10, color: active === id ? C.accentLight : C.muted, fontWeight: active === id ? 700 : 400 }}>{label}</span>
          {active === id && <div style={{ width: 20, height: 2, background: C.accent, borderRadius: 2, boxShadow: `0 0 8px ${C.accent}` }} />}
        </button>
      ))}
    </div>
  );
}

function ProductCard({ product, onClick }) {
  const [hov, setHov] = useState(false);
  const PIcon = PRODUCT_ICONS[product.id];
  return (
    <div onClick={() => onClick(product)}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? C.cardHover : C.card, border: `1px solid ${hov ? C.accent + "88" : C.border}`, borderRadius: 16, padding: "14px 12px", cursor: "pointer", transition: "all 0.2s", boxShadow: hov ? `0 0 20px ${C.accent}33` : "none", position: "relative", overflow: "hidden" }}>
      {hov && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${C.accent}, ${C.accentLight})`, boxShadow: `0 0 8px ${C.accent}` }} />}
      {product.badge && (
        <div style={{ position: "absolute", top: 10, right: 10, background: C.warning + "22", color: C.warning, fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 8, border: `1px solid ${C.warning}44` }}>
          {product.badge}
        </div>
      )}
      <div style={{ marginBottom: 10 }}><PIcon size={38} /></div>
      <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 4, lineHeight: 1.3 }}>{product.name}</div>
      <div style={{ fontSize: 11, color: C.muted, marginBottom: 10 }}>{product.region}</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.accentLight }}>от {Math.min(...product.variants.map(v => v.price))} ₽</span>
        <span style={{ fontSize: 10, color: C.muted }}>×{product.soldToday}</span>
      </div>
    </div>
  );
}

// ─── ЭКРАНЫ ──────────────────────────────────────────────────
function HomeScreen({ onProduct }) {
  const [cat, setCat] = useState("all");
  const [search, setSearch] = useState("");
  const cats = [
    { id: "all", Icon: null, label: "Все" },
    { id: "games", Icon: IcoGames, label: "Игры" },
    { id: "gift", Icon: IcoGiftCard, label: "Gift Cards" },
    { id: "subs", Icon: IcoSubs, label: "Подписки" },
  ];
  const filtered = products.filter(p => (cat === "all" || p.category === cat) && p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
      {/* Шапка */}
      <div style={{ padding: "16px 0 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: C.text, letterSpacing: -0.5 }}>GamePay</div>
          <div style={{ fontSize: 11, color: C.muted }}>Мгновенная выдача 24/7</div>
        </div>
        <div style={{ background: C.success + "18", border: `1px solid ${C.success}44`, borderRadius: 20, padding: "5px 12px", boxShadow: `0 0 12px ${C.success}33`, display: "flex", alignItems: "center", gap: 6 }}>
          <IcoOnline size={16} />
          <span style={{ fontSize: 11, color: C.success, fontWeight: 600 }}>Онлайн</span>
        </div>
      </div>

      {/* Баннер */}
      <div style={{ background: `linear-gradient(135deg, ${C.accent}33, #1A1A2E)`, border: `1px solid ${C.accent}44`, borderRadius: 16, padding: "14px 16px", marginBottom: 16, boxShadow: `0 0 24px ${C.accent}22` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <IcoSuccess size={18} />
          <span style={{ fontSize: 11, color: C.muted }}>Продано сегодня</span>
        </div>
        <div style={{ fontSize: 26, fontWeight: 800, color: C.text }}>2 506 <span style={{ fontSize: 13, color: C.muted, fontWeight: 400 }}>товаров</span></div>
        <div style={{ fontSize: 11, color: C.accentLight, marginTop: 4 }}>Гарантия замены на каждый товар</div>
      </div>

      {/* Поиск */}
      <div style={{ position: "relative", marginBottom: 14 }}>
        <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>
          <IcoSearch size={18} />
        </div>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск товаров..."
          style={{ width: "100%", background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "10px 14px 10px 38px", color: C.text, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
      </div>

      {/* Категории */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
        {cats.map(({ id, Icon, label }) => (
          <button key={id} onClick={() => setCat(id)}
            style={{ background: cat === id ? C.accent : C.card, border: `1px solid ${cat === id ? C.accent : C.border}`, borderRadius: 20, padding: "6px 14px", color: cat === id ? "#fff" : C.muted, fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6, boxShadow: cat === id ? `0 0 12px ${C.accent}55` : "none", transition: "all 0.2s" }}>
            {Icon && <Icon size={16} />}
            {label}
          </button>
        ))}
      </div>

      {/* Сетка товаров или empty state */}
      {filtered.length === 0
        ? <EmptyScreen type="search" query={search} onReset={() => setSearch("")} />
        : <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} onClick={onProduct} />)}
          </div>
      }
    </div>
  );
}

function ProductScreen({ product, onBack, onBuy }) {
  const [sel, setSel] = useState(0);
  const [pid, setPid] = useState("");
  const PIcon = PRODUCT_ICONS[product.id];

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 24px" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: C.accentLight, fontSize: 14, cursor: "pointer", padding: "16px 0 12px", display: "flex", alignItems: "center", gap: 6 }}>
        ← Назад
      </button>

      {/* Шапка карточки */}
      <div style={{ background: `linear-gradient(135deg, ${product.color}22, ${C.card})`, border: `1px solid ${product.color}44`, borderRadius: 18, padding: 20, marginBottom: 16, textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}><PIcon size={56} /></div>
        {product.badge && (
          <div style={{ marginBottom: 8 }}>
            <span style={{ background: C.warning + "22", color: C.warning, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, border: `1px solid ${C.warning}44` }}>
              {product.badge}
            </span>
          </div>
        )}
        <div style={{ fontSize: 20, fontWeight: 800, color: C.text, marginBottom: 8 }}>{product.name}</div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          <Badge color={product.color}>{product.region}</Badge>
          {product.guarantee && <Badge color={C.success}>Гарантия замены</Badge>}
        </div>
      </div>

      {/* Маркетинговое описание */}
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 16 }}>
        {product.description}
      </div>

      {/* Характеристики: 3 плитки */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
        {[
          { label: "Выдача", value: product.deliveryTime },
          { label: "Срок", value: product.validity },
          { label: "Аккаунт", value: product.compatibility.length > 18 ? product.compatibility.slice(0, 16) + "…" : product.compatibility },
        ].map(({ label, value }) => (
          <div key={label} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.text, lineHeight: 1.3 }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Примечание региона */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", marginBottom: 16, display: "flex", gap: 10, alignItems: "flex-start" }}>
        <IcoSupport size={20} />
        <div style={{ fontSize: 13, color: C.text }}>{product.regionNote}</div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: C.muted, marginBottom: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Номинал</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {product.variants.map((v, i) => (
            <button key={i} onClick={() => setSel(i)}
              style={{ background: sel === i ? C.accent + "33" : C.card, border: `2px solid ${sel === i ? C.accent : C.border}`, borderRadius: 12, padding: "12px 8px", cursor: "pointer", transition: "all 0.15s", boxShadow: sel === i ? `0 0 16px ${C.accent}44` : "none" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{v.label}</div>
              <div style={{ fontSize: 13, color: sel === i ? C.accentLight : C.muted }}>{v.price} ₽</div>
            </button>
          ))}
        </div>
      </div>

      {product.needsId && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Player ID</div>
          <input value={pid} onChange={e => setPid(e.target.value)} placeholder="Введи ID аккаунта..."
            style={{ width: "100%", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "11px 14px", color: C.text, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
          <div style={{ fontSize: 11, color: C.muted, marginTop: 6 }}>Настройки → Аккаунт → ID</div>
        </div>
      )}

      {/* Инструкция активации */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: C.muted, marginBottom: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Как активировать</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {product.instruction.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ minWidth: 22, height: 22, borderRadius: 11, background: C.accent + "33", border: `1px solid ${C.accent}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: C.accentLight }}>
                {i + 1}
              </div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6, paddingTop: 2 }}>{step}</div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => onBuy(product, sel)} disabled={product.needsId && !pid}
        style={{ width: "100%", background: product.needsId && !pid ? C.border : `linear-gradient(135deg, ${C.accent}, #9333EA)`, border: "none", borderRadius: 14, padding: "15px", color: "#fff", fontSize: 15, fontWeight: 700, cursor: product.needsId && !pid ? "not-allowed" : "pointer", boxShadow: product.needsId && !pid ? "none" : `0 4px 24px ${C.accent}55`, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
        <IcoBuy size={22} />
        Купить за {product.variants[sel].price} ₽
      </button>

      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 14 }}>
        {["СБП", "Карта РФ", "ЮMoney"].map(m => (
          <span key={m} style={{ fontSize: 11, color: C.muted }}>{m}</span>
        ))}
      </div>
    </div>
  );
}

function PaymentScreen({ product, variantIdx, onSuccess, onBack }) {
  const [step, setStep] = useState(0);
  const variant = product.variants[variantIdx];

  const handlePay = () => {
    setStep(1);

    // Создаём объект заказа здесь — один раз, до перехода на SuccessScreen
    const now = new Date();
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 9000 + 1000)}`,
      product: `${product.name} ${variant.label}`,
      price: variant.price,
      date: `Сегодня, ${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`,
      status: "done",
      code: product.needsId ? null : `${product.name.substring(0, 5).toUpperCase()}-X7K2-M9QR-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    };

    setTimeout(() => {
      setStep(2);
      setTimeout(() => onSuccess(newOrder), 1000);
    }, 2200);
  };

  if (step === 1) return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32 }}>
      <div style={{ marginBottom: 20 }}><IcoPending size={64} /></div>
      <div style={{ fontSize: 17, fontWeight: 700, color: C.text, marginBottom: 8 }}>Обрабатываем платёж...</div>
      <div style={{ width: "100%", height: 3, background: C.border, borderRadius: 4, overflow: "hidden", marginTop: 20 }}>
        <div style={{ height: "100%", background: `linear-gradient(90deg, ${C.accent}, ${C.accentLight})`, borderRadius: 4, boxShadow: `0 0 10px ${C.accent}`, animation: "prg 2.2s linear forwards" }} />
      </div>
      <div style={{ fontSize: 12, color: C.muted, marginTop: 12 }}>Выдача займёт несколько секунд</div>
      <style>{`@keyframes prg { from{width:0%} to{width:100%} }`}</style>
    </div>
  );

  if (step === 2) return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32 }}>
      <IcoSuccess size={64} />
      <div style={{ fontSize: 16, color: C.success, marginTop: 12 }}>Платёж подтверждён</div>
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 24px" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: C.accentLight, fontSize: 14, cursor: "pointer", padding: "16px 0 12px", display: "flex", alignItems: "center", gap: 6 }}>← Назад</button>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16, marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: C.muted, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Твой заказ</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{product.name}</div>
            <div style={{ fontSize: 13, color: C.muted }}>{variant.label} · {product.region}</div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: C.accentLight }}>{variant.price} ₽</div>
        </div>
      </div>

      <div style={{ fontSize: 12, color: C.muted, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>Способ оплаты</div>

      {[
        { icon: "⚡", label: "СБП", sub: "Мгновенно, без комиссии" },
        { icon: "💳", label: "Карта РФ", sub: "Visa, MC, МИР" },
        { icon: "💛", label: "ЮMoney", sub: "С кошелька или карты" },
      ].map((m, i) => (
        <button key={i} onClick={handlePay}
          style={{ width: "100%", background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, marginBottom: 10, transition: "border-color 0.15s" }}>
          <span style={{ fontSize: 22 }}>{m.icon}</span>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{m.label}</div>
            <div style={{ fontSize: 11, color: C.muted }}>{m.sub}</div>
          </div>
          <span style={{ marginLeft: "auto", color: C.muted }}>›</span>
        </button>
      ))}
    </div>
  );
}

function SuccessScreen({ product, order, onHome }) {
  const [copied, setCopied] = useState(false);
  const code = order?.code || null;


  const handleCopy = () => {
    // Пробуем современный Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => fallbackCopy());
    } else {
      fallbackCopy();
    }
  };

  const fallbackCopy = () => {
    // Создаём временный textarea, копируем через execCommand
    const el = document.createElement("textarea");
    el.value = code;
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.focus();
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 20px", textAlign: "center" }}>
      <div style={{ marginBottom: 16 }}><IcoSuccess size={72} /></div>
      <div style={{ fontSize: 24, fontWeight: 800, color: C.text, marginBottom: 6 }}>Готово!</div>
      <div style={{ fontSize: 14, color: C.muted, marginBottom: 28 }}>
        {product.needsId ? "Пополнение зачислено на аккаунт" : "Твой код активации:"}
      </div>

      {!product.needsId && (
        <>
          <div style={{ background: C.card, border: `1px solid ${C.success}44`, borderRadius: 14, padding: "16px 20px", width: "100%", marginBottom: 12, boxSizing: "border-box", boxShadow: `0 0 20px ${C.success}22` }}>
            <div style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 700, color: C.success, letterSpacing: 2 }}>{code}</div>
          </div>
          <button onClick={handleCopy}
            style={{ width: "100%", background: copied ? C.success : `linear-gradient(135deg, ${C.accent}, #9333EA)`, border: "none", borderRadius: 12, padding: "13px", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.3s", boxShadow: `0 4px 20px ${copied ? C.success : C.accent}55` }}>
            <IcoCopy size={20} />
            {copied ? "Скопировано!" : "Скопировать код"}
          </button>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", width: "100%", textAlign: "left", marginBottom: 20, boxSizing: "border-box" }}>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 6 }}>Как активировать:</div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.8 }}>
              1. Открой {product.name}<br />
              2. Нажми «Погасить код»<br />
              3. Введи код выше
            </div>
          </div>
        </>
      )}

      {product.needsId && (
        <div style={{ background: C.card, border: `1px solid ${C.success}44`, borderRadius: 14, padding: 20, width: "100%", marginBottom: 20, boxSizing: "border-box" }}>
          <IcoSuccess size={32} />
          <div style={{ fontSize: 14, color: C.success, marginTop: 8 }}>{order?.product} зачислены на аккаунт</div>
        </div>
      )}

      <button onClick={onHome} style={{ width: "100%", background: "none", border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px", color: C.muted, fontSize: 14, cursor: "pointer" }}>
        На главную
      </button>
    </div>
  );
}

function OrdersScreen({ orders, onOrder }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <IcoOrders size={28} />
        <div style={{ fontSize: 18, fontWeight: 800, color: C.text }}>Мои заказы</div>
      </div>
      {orders.length === 0
        ? <EmptyScreen type="orders" onReset={() => {}} />
        : orders.map(o => (
          <div key={o.id} onClick={() => onOrder(o)}
            style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", marginBottom: 10, cursor: "pointer", transition: "all 0.2s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{o.product}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>{o.date}</div>
              </div>
              <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.accentLight }}>{o.price} ₽</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <IcoSuccess size={14} />
                  <span style={{ fontSize: 10, color: C.success }}>Выдан</span>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: C.muted, display: "flex", alignItems: "center", gap: 4 }}>
              Подробнее <span style={{ fontSize: 14 }}>›</span>
            </div>
          </div>
        ))
      }
    </div>
  );
}

function ProfileScreen({ orders }) {
  const totalSpent = orders.reduce((sum, o) => sum + o.price, 0);
  const cashback = Math.floor(totalSpent * 0.03);
  const stats = [
    { label: "Покупок", value: String(orders.length), Icon: IcoOrders },
    { label: "Потрачено", value: `${totalSpent.toLocaleString("ru")} ₽`, Icon: IcoBuy },
    { label: "Кешбэк", value: `${cashback} ₽`, Icon: IcoCashback },
    { label: "Рефералов", value: "3", Icon: IcoReferral },
  ];
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <IcoProfile size={28} />
        <div style={{ fontSize: 18, fontWeight: 800, color: C.text }}>Профиль</div>
      </div>

      <div style={{ background: `linear-gradient(135deg, ${C.accent}33, ${C.card})`, border: `1px solid ${C.accent}44`, borderRadius: 16, padding: 20, marginBottom: 16, display: "flex", alignItems: "center", gap: 14, boxShadow: `0 0 24px ${C.accent}22` }}>
        <div style={{ width: 52, height: 52, background: C.accent + "33", border: `1px solid ${C.accent}66`, borderRadius: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IcoProfile size={30} />
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>Дмитрий</div>
          <div style={{ fontSize: 12, color: C.muted }}>С нами с июня 2026</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        {stats.map(({ label, value, Icon }) => (
          <div key={label} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px" }}>
            <div style={{ marginBottom: 8 }}><Icon size={22} /></div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.accentLight }}>{value}</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.warning}44`, borderRadius: 14, padding: 16, marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <IcoReferral size={20} />
          <div style={{ fontSize: 13, fontWeight: 700, color: C.warning }}>Реферальная программа</div>
        </div>
        <div style={{ fontSize: 12, color: C.muted, marginBottom: 12 }}>Приглашай друзей и получай 5% с каждой их покупки</div>
        <div style={{ background: C.bg, borderRadius: 8, padding: "8px 12px", fontFamily: "monospace", fontSize: 11, color: C.text, marginBottom: 10, border: `1px solid ${C.border}` }}>
          t.me/gamepay_bot?start=ref_4821
        </div>
        <button style={{ width: "100%", background: C.warning + "22", border: `1px solid ${C.warning}44`, borderRadius: 10, padding: "10px", color: C.warning, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <IcoCopy size={18} /> Скопировать ссылку
        </button>
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.success}44`, borderRadius: 14, padding: 16, marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <IcoCashback size={20} />
          <div style={{ fontSize: 13, fontWeight: 700, color: C.success }}>Кешбэк: 144 ₽</div>
        </div>
        <div style={{ fontSize: 12, color: C.muted }}>Используй при следующей покупке от 500 ₽. Действует 90 дней.</div>
      </div>

      {/* Поддержка — разделитель + кнопка-строка */}
      <div style={{ borderTop: `1px solid ${C.border}`, marginBottom: 12 }} />
      <button style={{ width: "100%", background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, transition: "border-color 0.2s" }}
        onClick={() => window.open("https://t.me/gamepay_support", "_blank")}>
        <IcoSupport size={24} />
        <div style={{ textAlign: "left", flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Служба поддержки</div>
          <div style={{ fontSize: 11, color: C.muted }}>Ответим в течение 10 минут</div>
        </div>
        <span style={{ color: C.muted, fontSize: 18 }}>›</span>
      </button>
    </div>
  );
}

// ─── ЭКРАН 1: ОНБОРДИНГ ──────────────────────────────────────
// Показывается один раз при первом запуске.
// Три слайда → кнопка "Начать" → главная.
function OnboardingScreen({ onDone }) {
  const [slide, setSlide] = useState(0);
  const slides = [
    { Icon: IcoGiftCard, title: "Gift Cards и пополнения", text: "Google Play, App Store, PSN, PUBG и ещё 500+ товаров в одном месте" },
    { Icon: IcoSuccess, title: "Мгновенная выдача", text: "Код приходит автоматически за 5–30 секунд после оплаты. Без ожидания." },
    { Icon: IcoReferral, title: "Приглашай — зарабатывай", text: "5% с каждой покупки твоего реферала + кешбэк 3% на свои покупки" },
  ];
  const s = slides[slide];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "40px 24px 32px" }}>
      {/* Слайд */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{ marginBottom: 28 }}><s.Icon size={80} /></div>
        <div style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 12, lineHeight: 1.3 }}>{s.title}</div>
        <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, maxWidth: 280 }}>{s.text}</div>
      </div>
      {/* Точки */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
        {slides.map((_, i) => (
          <div key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 24 : 8, height: 8, borderRadius: 4, background: i === slide ? C.accent : C.border, transition: "all 0.3s", cursor: "pointer", boxShadow: i === slide ? `0 0 8px ${C.accent}` : "none" }} />
        ))}
      </div>
      {/* Кнопки */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
        {slide < slides.length - 1 ? (
          <>
            <button onClick={() => setSlide(slide + 1)}
              style={{ width: "100%", background: `linear-gradient(135deg, ${C.accent}, #9333EA)`, border: "none", borderRadius: 14, padding: "15px", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 20px ${C.accent}55` }}>
              Далее →
            </button>
            <button onClick={onDone}
              style={{ width: "100%", background: "none", border: "none", color: C.muted, fontSize: 13, cursor: "pointer", padding: "8px" }}>
              Пропустить
            </button>
          </>
        ) : (
          <button onClick={onDone}
            style={{ width: "100%", background: `linear-gradient(135deg, ${C.accent}, #9333EA)`, border: "none", borderRadius: 14, padding: "15px", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 20px ${C.accent}55` }}>
            Начать покупки ⚡
          </button>
        )}
      </div>
    </div>
  );
}

// ─── ЭКРАН 2: СКЕЛЕТОН-ЗАГРУЗКА ──────────────────────────────
// Показывается пока данные грузятся с сервера.
// Анимированные серые блоки повторяют форму реального контента.
function SkeletonPulse({ w = "100%", h = 16, r = 8, mb = 0 }) {
  return (
    <div style={{ width: w, height: h, borderRadius: r, background: `linear-gradient(90deg, ${C.card} 25%, ${C.cardHover} 50%, ${C.card} 75%)`, backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite", marginBottom: mb }} />
  );
}

function SkeletonScreen() {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
      <style>{`@keyframes shimmer { from{background-position:200% 0} to{background-position:-200% 0} }`}</style>
      {/* Шапка */}
      <div style={{ padding: "16px 0 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div><SkeletonPulse w={120} h={22} r={6} mb={6} /><SkeletonPulse w={160} h={12} r={4} /></div>
        <SkeletonPulse w={80} h={30} r={15} />
      </div>
      {/* Баннер */}
      <SkeletonPulse h={88} r={16} mb={16} />
      {/* Поиск */}
      <SkeletonPulse h={42} r={12} mb={14} />
      {/* Табы */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[80, 90, 110, 100].map((w, i) => <SkeletonPulse key={i} w={w} h={34} r={17} />)}
      </div>
      {/* Карточки 2×3 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{ background: C.card, borderRadius: 16, padding: 14 }}>
            <SkeletonPulse w={44} h={44} r={10} mb={10} />
            <SkeletonPulse w="80%" h={14} r={4} mb={6} />
            <SkeletonPulse w="60%" h={11} r={4} mb={10} />
            <SkeletonPulse w="50%" h={14} r={4} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ЭКРАН 3: ПУСТОЕ СОСТОЯНИЕ ───────────────────────────────
// Два варианта: нет результатов поиска / нет заказов.
// Передаём type="search" или type="orders".
function EmptyScreen({ type = "search", query = "", onReset }) {
  const config = {
    search: {
      Icon: IcoSearch,
      title: `Ничего не найдено`,
      text: query ? `По запросу «${query}» товаров нет. Попробуй другой запрос.` : "Введи название товара в строку поиска",
      btnLabel: "Сбросить поиск",
    },
    orders: {
      Icon: IcoOrders,
      title: "Заказов пока нет",
      text: "Здесь появятся твои покупки. Перейди в каталог и сделай первый заказ.",
      btnLabel: "В каталог",
    },
  };
  const { Icon, title, text, btnLabel } = config[type];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 32px", textAlign: "center" }}>
      <div style={{ opacity: 0.4, marginBottom: 20 }}><Icon size={64} /></div>
      <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 10 }}>{title}</div>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 28 }}>{text}</div>
      <button onClick={onReset}
        style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "11px 24px", color: C.accentLight, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
        {btnLabel}
      </button>
    </div>
  );
}

// ─── ЭКРАН 4: ОШИБКА ─────────────────────────────────────────
// Показывается при сбое API, платёжки или giftapi.
// Передаём message и onRetry.
function ErrorScreen({ message = "Что-то пошло не так", onRetry, onHome }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 28px", textAlign: "center" }}>
      <div style={{ marginBottom: 20 }}><IcoError size={72} /></div>
      <div style={{ fontSize: 20, fontWeight: 800, color: C.text, marginBottom: 10 }}>Ошибка</div>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 8 }}>{message}</div>
      <div style={{ fontSize: 11, color: C.muted, marginBottom: 28 }}>Если проблема повторяется — напиши в поддержку</div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
        <button onClick={onRetry}
          style={{ width: "100%", background: `linear-gradient(135deg, ${C.accent}, #9333EA)`, border: "none", borderRadius: 14, padding: "14px", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 20px ${C.accent}44` }}>
          Попробовать снова
        </button>
        <button onClick={onHome}
          style={{ width: "100%", background: "none", border: `1px solid ${C.border}`, borderRadius: 14, padding: "12px", color: C.muted, fontSize: 13, cursor: "pointer" }}>
          На главную
        </button>
      </div>
    </div>
  );
}

// ─── ЭКРАН 5: ДЕТАЛИ ЗАКАЗА ──────────────────────────────────
// Открывается по тапу на заказ в истории.
// Показывает полную информацию + кнопку копирования кода.
function OrderDetailScreen({ order, onBack }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 24px" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: C.accentLight, fontSize: 14, cursor: "pointer", padding: "16px 0 12px", display: "flex", alignItems: "center", gap: 6 }}>
        ← Назад
      </button>
      {/* Статус */}
      <div style={{ background: C.success + "18", border: `1px solid ${C.success}44`, borderRadius: 16, padding: 20, marginBottom: 16, textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}><IcoSuccess size={48} /></div>
        <div style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 4 }}>Заказ выполнен</div>
        <div style={{ fontSize: 12, color: C.muted }}>{order.date}</div>
      </div>
      {/* Информация */}
      {[
        { label: "Товар", value: order.product },
        { label: "Сумма", value: `${order.price} ₽` },
        { label: "Номер заказа", value: order.id },
        { label: "Статус оплаты", value: "✅ Оплачен" },
      ].map(({ label, value }) => (
        <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontSize: 13, color: C.muted }}>{label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{value}</span>
        </div>
      ))}
      {/* Код активации */}
      {order.code && (
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Код активации</div>
          <div style={{ background: C.card, border: `1px solid ${C.success}44`, borderRadius: 12, padding: "14px 16px", marginBottom: 12, boxShadow: `0 0 16px ${C.success}18` }}>
            <div style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 700, color: C.success, letterSpacing: 2 }}>{order.code}</div>
          </div>
          <button onClick={handleCopy}
            style={{ width: "100%", background: copied ? C.success : `linear-gradient(135deg, ${C.accent}, #9333EA)`, border: "none", borderRadius: 12, padding: "13px", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.3s", boxShadow: `0 4px 20px ${copied ? C.success : C.accent}44` }}>
            <IcoCopy size={18} />
            {copied ? "Скопировано!" : "Скопировать код"}
          </button>
        </div>
      )}
      {!order.code && (
        <div style={{ marginTop: 20, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 13, color: C.muted }}>Пополнение зачислено напрямую на аккаунт</div>
        </div>
      )}
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────
export default function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [loading, setLoading] = useState(true);

  // Инициализация Telegram Mini App
  // tgUser доступен во всём приложении через window.Telegram.WebApp.initDataUnsafe.user
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();                          // сообщаем Telegram что приложение готово
      tg.expand();                         // раскрываем на весь экран
      tg.setHeaderColor("#0F0F1A");        // цвет шапки = наш фон
      tg.setBackgroundColor("#0F0F1A");    // цвет фона
    }
  }, []);
  const [screen, setScreen] = useState("home");
  const [tab, setTab] = useState("home");
  const [selProduct, setSelProduct] = useState(null);
  const [selVariant, setSelVariant] = useState(0);
  const [selOrder, setSelOrder] = useState(null);
  const [error, setError] = useState(null);

  // Хранилище заказов — на фронте до подключения backend
  // При деплое: заменить на GET /api/orders и POST /api/orders
  const [orders, setOrders] = useState(mockOrders);

  // Симулируем загрузку данных при старте (1.5 сек)
  useEffect(() => { setTimeout(() => setLoading(false), 1500); }, []);

  const goProduct = (p) => { setSelProduct(p); setScreen("product"); };
  const goBuy = (p, vi) => { setSelProduct(p); setSelVariant(vi); setScreen("payment"); };
  const goHome = () => { setScreen("home"); setTab("home"); setError(null); };
  const goTab = (t) => { setTab(t); setScreen(t); };
  const goOrder = (o) => { setSelOrder(o); setScreen("orderDetail"); };

  // Принимает готовый order из PaymentScreen, добавляет в список и переходит на успех
  const handleSuccess = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
    setSelOrder(newOrder);
    setScreen("success");
  };

  // Онбординг — пока не прошёл, показываем слайды
  if (!onboarded) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#050510", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <div style={{ width: 375, height: 720, background: C.bg, borderRadius: 36, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)" }}>
        <OnboardingScreen onDone={() => setOnboarded(true)} />
      </div>
    </div>
  );

  const Screen = () => {
    // Скелетон пока грузимся
    if (loading) return <SkeletonScreen />;
    // Экран ошибки
    if (error) return <ErrorScreen message={error} onRetry={() => { setLoading(true); setTimeout(() => { setLoading(false); setError(null); }, 1500); }} onHome={goHome} />;

    switch (screen) {
      case "home": return <HomeScreen onProduct={goProduct} />;
      case "product": return <ProductScreen product={selProduct} onBack={() => setScreen("home")} onBuy={goBuy} />;
      case "payment": return <PaymentScreen product={selProduct} variantIdx={selVariant} onSuccess={handleSuccess} onBack={() => setScreen("product")} />;
      case "success": return <SuccessScreen product={selProduct} order={selOrder} onHome={goHome} />;
      case "orders": return <OrdersScreen orders={orders} onOrder={goOrder} />;
      case "orderDetail": return <OrderDetailScreen order={selOrder} onBack={() => setScreen("orders")} />;
      case "profile": return <ProfileScreen orders={orders} />;
      default: return <HomeScreen onProduct={goProduct} />;
    }
  };

  const showTab = !["payment", "success", "orderDetail"].includes(screen);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#050510", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <div style={{ width: 375, height: 720, background: C.bg, borderRadius: 36, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <Screen />
        </div>
        {showTab && <TabBar active={tab} onChange={goTab} />}
      </div>
    </div>
  );
}
