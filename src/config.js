// ─── КОНФИГУРАЦИЯ (масштабируемая — легко менять без пересборки) ─────────────────
// Все значения можно переопределить через env при билде

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://web-production-e2f7.up.railway.app";
const BOT_TOKEN = process.env.REACT_APP_BOT_TOKEN || "";
const SUPPORT_CHAT_ID = process.env.REACT_APP_SUPPORT_CHAT_ID || "-1004361489413";

// ─── ЦВЕТА ────────────────────────────────────────────────────
export const C = {
  bg: "#0F0F1A",
  card: "#1A1A2E",
  cardHover: "#1E1E38",
  accent: "#7C3AED",
  accentLight: "#A78BFA",
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
  text: "#F1F5F9",
  muted: "#94A3B8",
  border: "#2D2D4E",
};

// ─── МАППИНГ КАТЕГОРИЙ (точные категории из giftapi) ─────────────
// Ключ = ID для UI, value = { label, apiCategories, iconType }
// apiCategories — точные строки из giftapi API
export const CATEGORY_MAP = {
  all:    { label: "Все",    apiCategories: [], iconType: null },
  games:  { label: "Игры",   apiCategories: [
    "Игры для ПК",
    "Игры для Nintendo Switch",
    "Игры для EA App",
    "Мобильные игры",
    "Battle.net",
    "Steam",
    "Xbox",
    "Игры для Xbox",
    "Игры для Rockstar",
    "Игры для Steam",
    "Кроссплатформенные игры",
    "Пополнение игр",
    "PlayStation",
    "Nintendo",
  ], iconType: "games" },
  gift:   { label: "Покупки", apiCategories: [
    "Покупки",
    "Предоплаченные карты",
    "Apple Gift Card",
    "Google Play Gift Code",
  ], iconType: "gift" },
  topup:  { label: "Пополнения", apiCategories: [
    "Пополнение мобильной связи",
    "Пополнение сервисов",
    "Telegram",
  ], iconType: "subs" },
  apps:   { label: "Приложения", apiCategories: [
    "Мобильные приложения",
    "ПК приложения",
  ], iconType: "gift" },
  esim:   { label: "eSIM",    apiCategories: ["eSIM"], iconType: "subs" },
  crypto: { label: "Крипта",  apiCategories: ["Криптовалюты"], iconType: "gift" },
  music:  { label: "Музыка",  apiCategories: ["Музыка"], iconType: "subs" },
  stream: { label: "Стриминг", apiCategories: ["Стриминг сервисы"], iconType: "subs" },
  other:  { label: "Другое",  apiCategories: [
    "Другое",
    "Остальное",
  ], iconType: "gift" },
};

// Обратный маппинг: API category → UI category ID
export function getUiCategory(apiCategory) {
  if (!apiCategory) return null;
  const lower = apiCategory.toLowerCase();

  for (const [uiId, config] of Object.entries(CATEGORY_MAP)) {
    if (uiId === "all") continue;
    for (const cat of config.apiCategories) {
      if (lower === cat.toLowerCase()) return uiId;
    }
  }
  return null;
}

export function getProductIconType(apiCategory) {
  const uiCat = getUiCategory(apiCategory);
  return uiCat ? CATEGORY_MAP[uiCat].iconType : "gift";
}

export function getCategoryColor(apiCategory) {
  const uiCat = getUiCategory(apiCategory);
  switch (uiCat) {
    case "games": return "#F59E0B";
    case "gift": return "#22C55E";
    case "topup": return "#3B82F6";
    case "apps": return "#A78BFA";
    case "esim": return "#06B6D4";
    case "crypto": return "#EF4444";
    case "music": return "#EC4899";
    case "stream": return "#8B5CF6";
    case "other": return "#94A3B8";
    default: return "#7C3AED";
  }
}

// ─── API КОНФИГ ─────────────────────────────────────────────────
export const API = {
  baseUrl: API_BASE_URL,
  endpoints: {
    catalog: "/api/catalog",
    orders: "/api/orders",
    sync: "/api/catalog/sync",
    syncStatus: "/api/catalog/sync-status",
    syncSettings: "/api/catalog/sync-settings",
  },
  timeout: 15000,
  retries: 2,
  retryDelay: 1000,
};

// ─── TELEGRAM CONFIG ────────────────────────────────────────────
export const TG = {
  botToken: BOT_TOKEN,
  supportChatId: SUPPORT_CHAT_ID,
};

// ─── UI КОНСТАНТЫ ───────────────────────────────────────────────
export const RESERVATION_MINUTES = 15;
export const CASHBACK_PERCENT = 3;
export const REFERRAL_PERCENT = 5;
