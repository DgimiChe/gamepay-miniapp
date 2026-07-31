import { API } from "./config";

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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchWithTimeout(url, options = {}, timeoutMs = API.timeout) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(timeoutId));
}

async function apiFetch(path, options = {}) {
  const url = `${API.baseUrl}${path}`;
  try {
    const response = await fetchWithTimeout(url, options, API.timeout);
    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      let errorData;
      try { errorData = JSON.parse(errorText); } catch { errorData = { detail: errorText }; }
      if (response.status >= 500) throw new ServerError(errorData.detail || "Ошибка сервера", response.status);
      else if (response.status === 400 || response.status === 422) throw new ValidationError(errorData.detail || "Некорректные данные", errorData);
      else if (response.status === 404) throw new ApiError("Не найдено", 404, false);
      else if (response.status === 409) throw new ApiError("Конфликт — возможно дублирование", 409, false);
      else throw new ApiError(errorData.detail || `HTTP ${response.status}`, response.status, false);
    }
    if (response.status === 204) return null;
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") throw new TimeoutError();
    if (error.name === "TypeError" || error.message?.includes("fetch") || error.message?.includes("Failed to fetch")) throw new NetworkError();
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message || "Неизвестная ошибка", 0, false);
  }
}

async function withRetry(operation, maxRetries = API.retries, delay = API.retryDelay) {
  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try { return await operation(); }
    catch (error) {
      lastError = error;
      if (!error.isRetryable || attempt >= maxRetries) break;
      await sleep(delay * Math.pow(2, attempt));
    }
  }
  throw lastError;
}

export async function fetchCatalog(page = 1, perPage = 2000) {
  const data = await withRetry(() => apiFetch(
    `${API.endpoints.catalog}?show_out_of_stock=true&page=${page}&per_page=${perPage}`
  ));

  return {
    products: data.products || [],
    rate: data.rate || 95,
    markup_percent: data.markup_percent || 15,
    total_products: data.total_products ?? data.products?.length ?? 0,
    total_pages: data.total_pages ?? 1,
    page: data.page ?? page,
    per_page: data.per_page ?? perPage,
  };
}
  const data = await withRetry(() => apiFetch(
    `${API.endpoints.catalog}?show_out_of_stock=true&page=1&per_page=2000`
  ));

  return {
    products: data.products || [],
    rate: data.rate || 95,
    markup_percent: data.markup_percent || 15,
    total_products: data.products?.length || 0,
    total_pages: 1,
    page: 1,
    per_page: data.products?.length || 0,
  };
}

export async function createOrder(telegramId, skuId, quantity = 1, username = null) {
  const body = { telegram_id: telegramId, sku_id: skuId, quantity };
  if (username) body.username = username;
  return withRetry(() => apiFetch(API.endpoints.orders, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }));
}

export async function createPayment(orderId) {
  return withRetry(() => apiFetch(API.endpoints.payments, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ order_id: orderId }),
  }));
}

export async function fetchSyncStatus() {
  return withRetry(() => apiFetch(API.endpoints.syncStatus), 1);
}

export async function triggerSync() {
  return withRetry(() => apiFetch(API.endpoints.sync, { method: "POST" }), 1);
}

export async function checkHealth() {
  try {
    const response = await fetchWithTimeout(`${API.baseUrl}/health`, {}, 5000);
    return response.ok;
  } catch { return false; }
}

export async function fetchUserOrders(telegramId) {
  console.warn("fetchUserOrders not implemented yet");
  return [];
}
