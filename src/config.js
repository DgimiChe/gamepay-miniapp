// ─── КОНФИГУРАЦИЯ (масштабируемая — легко менять без пересборки) ─────────────────
// Все значения можно переопределить через env при билде.
// Это позволяет менять API URL, токены и т.д. без изменения кода.

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://web-production-e2f7.up.railway.app";
const BOT_TOKEN = process.env.REACT_APP_BOT_TOKEN || "";
const SUPPORT_CHAT_ID = process.env.REACT_APP_SUPPORT_CHAT_ID || "-1004361489413";

// ─── ЦВЕТА (единая палитра приложения) ─────────────────────────
// Все цвета централизованы для лёгкой смены темы.
export const C = {
  bg: "#0F0F1A",           // Фон приложения
  card: "#1A1A2E",         // Фон карточек
  cardHover: "#1E1E38",    // Фон карточек при наведении
  accent: "#7C3AED",       // Основной акцент (кнопки, активные элементы)
  accentLight: "#A78BFA",    // Светлый акцент (текст, градиенты)
  success: "#22C55E",        // Успешные действия (заказ выполнен, копирование)
  warning: "#F59E0B",        // Предупреждения (бейджи, акции)
  error: "#EF4444",          // Ошибки (нет соединения, неправильные данные)
  text: "#F1F5F9",          // Основной текст
  muted: "#94A3B8",         // Вторичный текст (описания, подписи)
  border: "#2D2D4E",         // Границы карточек и кнопок
};

// ─── МАППИНГ КАТЕГОРИЙ (масштабируемый) ─────────────────────────
// Ключ = ID для UI (используется в фильтрах и URL).
// apiCategories = точные строки категорий из giftapi API.
// iconType = тип иконки для отображения (games, gift, subs).
//
// ПРИНЦИП: при добавлении новой категории в giftapi — просто добавить
// строку в apiCategories. Не нужно менять компоненты.
//
// ИСТОРИЯ ИЗМЕНЕНИЙ:
// 2026-07-18: добавлена "Mobile Apps" и "PC Apps" — giftapi отдаёт
// категорию "Mobile Apps" для Apple Gift Card, Google Play и т.д.
// Ранее была только "Мобильные приложения" (русская версия), но
// API перешёл на английские названия.
export const CATEGORY_MAP = {
  all:    { 
    label: "Все", 
    apiCategories: [], 
    iconType: null 
  },
  games:  { 
    label: "Игры", 
    apiCategories: [
      // Игровые платформы
      "Игры для ПК", "Игры для Nintendo Switch", "Игры для EA App",
      "Мобильные игры", "Battle.net", "Steam", "Xbox",
      "Игры для Xbox", "Игры для Rockstar", "Игры для Steam",
      "Кроссплатформенные игры", "Пополнение игр", "PlayStation", "Nintendo",
    ], 
    iconType: "games" 
  },
  gift:   { 
    label: "Покупки", 
    apiCategories: [
      // Gift Cards и предоплаченные карты
      "Покупки", "Предоплаченные карты", "Apple Gift Card", "Google Play Gift Code",
      // Приложения (ранее были отдельно, но giftapi относит к покупкам)
      "Мобильные приложения", "ПК приложения",
      // Английские версии категорий (добавлено 2026-07-18)
      "Mobile Apps", "PC Apps",
    ], 
    iconType: "gift" 
  },
  topup:  { 
    label: "Пополнения", 
    apiCategories: [
      "Пополнение мобильной связи", "Пополнение сервисов", "Telegram",
    ], 
    iconType: "subs" 
  },
  esim:   { 
    label: "eSIM", 
    apiCategories: ["eSIM"], 
    iconType: "subs" 
  },
  crypto: { 
    label: "Крипта", 
    apiCategories: ["Криптовалюты"], 
    iconType: "gift" 
  },
  music:  { 
    label: "Музыка", 
    apiCategories: ["Музыка"], 
    iconType: "subs" 
  },
  stream: { 
    label: "Стриминг", 
    apiCategories: ["Стриминг сервисы"], 
    iconType: "subs" 
  },
  other:  { 
    label: "Другое", 
    apiCategories: ["Другое", "Остальное"], 
    iconType: "gift" 
  },
};

// Обратный маппинг: API category → UI category ID
// ПРИНЦИП: точное совпадение строк (case-insensitive).
// Если категория не найдена — товар показывается только во "Все".
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

// Получить тип иконки для продукта по категории API
export function getProductIconType(apiCategory) {
  const uiCat = getUiCategory(apiCategory);
  return uiCat ? CATEGORY_MAP[uiCat].iconType : "gift";
}

// Получить цвет для категории (используется в ProductScreen)
export function getCategoryColor(apiCategory) {
  const uiCat = getUiCategory(apiCategory);
  switch (uiCat) {
    case "games": return "#F59E0B";  // Оранжевый
    case "gift": return "#22C55E";   // Зелёный
    case "topup": return "#3B82F6";  // Синий
    case "esim": return "#06B6D4";   // Бирюзовый
    case "crypto": return "#EF4444"; // Красный
    case "music": return "#EC4899";  // Розовый
    case "stream": return "#8B5CF6"; // Фиолетовый
    case "other": return "#94A3B8";  // Серый
    default: return "#7C3AED";        // Фиолетовый (дефолт)
  }
}

// ─── API КОНФИГ ─────────────────────────────────────────────────
// Все эндпоинты backend централизованы для лёгкой смены URL.
export const API = {
  baseUrl: API_BASE_URL,
  endpoints: {
    catalog: "/api/catalog",           // GET — каталог товаров
    orders: "/api/orders",           // POST — создание брони
    sync: "/api/catalog/sync",        // POST — ручная синхронизация
    syncStatus: "/api/catalog/sync-status",  // GET — статус синхронизации
    syncSettings: "/api/catalog/sync-settings", // PATCH — настройки
  },
  timeout: 15000,     // 15 секунд — таймаут запроса
  retries: 2,         // Повторы при временных сбоях (network, 5xx)
  retryDelay: 1000,   // 1 секунда между ретраями
};

// ─── TELEGRAM CONFIG ────────────────────────────────────────────
export const TG = {
  botToken: BOT_TOKEN,
  supportChatId: SUPPORT_CHAT_ID,
};

// ─── UI КОНСТАНТЫ ───────────────────────────────────────────────
export const RESERVATION_MINUTES = 15;  // Время брони заказа
export const CASHBACK_PERCENT = 3;      // Процент кешбэка
export const REFERRAL_PERCENT = 5;      // Процент реферального бонуса
