// ─── API КЛИЕНТ (с retry, таймаутами, обработкой ошибок) ────────────────────────
import { API } from "./config";

// ─── ОШИБКИ API (типизированные для обработки в UI) ─────────────
export class ApiError extends Error {
  constructor(message, statusCode = 0, isRetryable = false) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.isRetryable = isRetryable;
  }
}

export class NetworkError extends ApiError {
  constructor(message = "Нет соединения с сервером") {
    super(message, 0, true);
    this.name = "NetworkError";
  }
}

export class TimeoutError extends ApiError {
  constructor(message = "Превышено время ожидания") {
    super(message, 0, true);
    this.name = "TimeoutError";
  }
}

export class ServerError extends ApiError {
  constructor(message = "Ошибка сервера", statusCode = 500) {
    super(message, statusCode, statusCode >= 500);
    this.name = "ServerError";
  }
}

export class ValidationError extends ApiError {
  constructor(message = "Некорректные данные", details = null) {
    super(message, 400, false);
    this.name = "ValidationError";
    this.details = details;
  }
}

// ─── УТИЛИТЫ ────────────────────────────────────────────────────
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchWithTimeout(url, options = {}, timeoutMs = API.timeout) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(timeoutId));
}

// ─── CORE FETCH ─────────────────────────────────────────────────
async function apiFetch(path, options = {}) {
  const url = `${API.baseUrl}${path}`;

  try {
    const response = await fetchWithTimeout(url, options, API.timeout);

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { detail: errorText };
      }

      if (response.status >= 500) {
        throw new ServerError(errorData.detail || "Ошибка сервера", response.status);
      } else if (response.status === 400 || response.status === 422) {
        throw new ValidationError(errorData.detail || "Некорректные данные", errorData);
      } else if (response.status === 404) {
        throw new ApiError("Не найдено", 404, false);
      } else if (response.status === 409) {
        throw new ApiError("Конфликт — возможно дублирование", 409, false);
      } else {
        throw new ApiError(errorData.detail || `HTTP ${response.status}`, response.status, false);
      }
    }

    if (response.status === 204) return null;
    return await response.json();

  } catch (error) {
    if (error.name === "AbortError") {
      throw new TimeoutError();
    }
    if (error.name === "TypeError" || error.message?.includes("fetch") || error.message?.includes("Failed to fetch")) {
      throw new NetworkError();
    }
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message || "Неизвестная ошибка", 0, false);
  }
}

// ─── RETRY WRAPPER (экспоненциальный backoff) ──────────────────
async function withRetry(operation, maxRetries = API.retries, delay = API.retryDelay) {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (!error.isRetryable || attempt >= maxRetries) break;
      await sleep(delay * Math.pow(2, attempt));
    }
  }

  throw lastError;
}

// ─── API МЕТОДЫ ─────────────────────────────────────────────────

/**
 * GET /api/catalog — загрузка каталога товаров
 */
export async function fetchCatalog() {
  return withRetry(() => apiFetch(API.endpoints.catalog));
}

/**
 * POST /api/orders — создание брони заказа
 */
export async function createOrder(telegramId, skuId, quantity = 1, username = null) {
  const body = { telegram_id: telegramId, sku_id: skuId, quantity };
  if (username) body.username = username;

  return withRetry(() => 
    apiFetch(API.endpoints.orders, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  );
}

/**
 * GET /api/catalog/sync-status — статус синхронизации
 */
export async function fetchSyncStatus() {
  return withRetry(() => apiFetch(API.endpoints.syncStatus), 1);
}

/**
 * POST /api/catalog/sync — ручной запуск синхронизации
 */
export async function triggerSync() {
  return withRetry(() => apiFetch(API.endpoints.sync, { method: "POST" }), 1);
}

/**
 * GET /health — проверка доступности
 */
export async function checkHealth() {
  try {
    const response = await fetchWithTimeout(`${API.baseUrl}/health`, {}, 5000);
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Получить историю заказов пользователя (будет реализовано в следующем этапе)
 */
export async function fetchUserOrders(telegramId) {
  // TODO: добавить эндпоинт GET /api/orders?telegram_id=xxx в backend
  console.warn("fetchUserOrders not implemented yet");
  return [];
}
