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

// ─── МАППИНГ КАТЕГОРИЙ (масштабируемый) ─────────────────────────
// Ключ = ID для UI, value = { label, apiCategories, iconType }
// Если giftapi добавит новую категорию — просто добавить сюда строку
export const CATEGORY_MAP = {
  all:    { label: "Все",         apiCategories: [],                                          iconType: null },
  games:  { label: "Игры",        apiCategories: ["Games", "Game Top-ups", "Mobile Games", "Gaming"], iconType: "games" },
  gift:   { label: "Gift Cards",  apiCategories: ["Gift Cards", "Vouchers", "Prepaid Cards", "Gift Card"], iconType: "gift" },
  subs:   { label: "Подписки",    apiCategories: ["Subscriptions", "Streaming", "Music", "Video"], iconType: "subs" },
};

// Обратный маппинг: API category → UI category ID
export function getUiCategory(apiCategory) {
  if (!apiCategory) return null;
  const lower = apiCategory.toLowerCase();
  for (const [uiId, config] of Object.entries(CATEGORY_MAP)) {
    if (uiId === "all") continue;
    if (config.apiCategories.some(c => c.toLowerCase() === lower)) return uiId;
  }
  return null; // неизвестная категория — фильтруется в "Все"
}

// Получить иконку для продукта по категории API
export function getProductIconType(apiCategory) {
  const uiCat = getUiCategory(apiCategory);
  return uiCat ? CATEGORY_MAP[uiCat].iconType : "gift";
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
  timeout: 15000,     // 15 секунд
  retries: 2,         // повторы при временных сбоях
  retryDelay: 1000,   // 1 секунда между ретраями
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
