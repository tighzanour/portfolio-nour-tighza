export const COFFEE_MARKET_URL = "https://buonmathuotcoffee.com/api/v1/coffee-price";
export const MARKET_REFRESH_MS = 30 * 60 * 1000;
export const MARKET_STALE_MS = 72 * 60 * 60 * 1000;
// Référence réellement reçue le 5 octobre, datée du 27 septembre 2026.
export const REFERENCE_ARABICA_USD_LB = 3.249;
const CACHE_KEY = "coffee-empire:arabica:v1";

export function normalizeArabicaQuote(payload, now = Date.now()) {
  if (!payload || (payload.status && payload.status !== "success")) throw new Error("Réponse invalide");
  // L'API actuelle est plate ; la documentation présente aussi une enveloppe data.
  const data = payload.data ?? payload;
  const arabica = data.ice_arabica;
  const timestamp = Date.parse(data.timestamp);
  if (!arabica || typeof arabica.value !== "number" || !Number.isFinite(arabica.value)
      || arabica.value <= 0 || arabica.value > 1000
      || (arabica.unit !== undefined && arabica.unit !== "USD/lb")
      || typeof data.timestamp !== "string" || !Number.isFinite(timestamp)
      || !/T.*(?:Z|[+-]\d{2}:\d{2})$/.test(data.timestamp) || timestamp > now + 5 * 60 * 1000) {
    throw new Error("Cours Arabica ou horodatage invalide");
  }
  return {
    value: arabica.value,
    changePct: typeof arabica.change_pct === "number" && Number.isFinite(arabica.change_pct)
      ? arabica.change_pct : null,
    timestamp: new Date(timestamp).toISOString(),
  };
}

export function calculateCoffeePrice(value) {
  if (!Number.isFinite(value) || value <= 0 || value > 1000) throw new Error("Cours invalide");
  // Modèle de jeu provisoire : 240 centimes fixes + 60 centimes indexés.
  return Math.round(240 + 60 * value / REFERENCE_ARABICA_USD_LB);
}

export function initCoffeeMarket({ onQuote } = {}) {
  const root = document.querySelector(".coffee-market");
  const lab = document.querySelector("#ia");
  if (!root || !lab || root.dataset.initialized === "true") return;
  const price = root.querySelector("[data-market-price]");
  const change = root.querySelector("[data-market-change]");
  const time = root.querySelector("[data-market-time]");
  const status = root.querySelector("[data-market-status]");
  const message = root.querySelector("[data-market-message]");
  const refresh = root.querySelector("[data-market-refresh]");
  if (!price || !change || !time || !status || !message || !refresh) return;
  root.dataset.initialized = "true";
  refresh.disabled = false;

  const number = new Intl.NumberFormat("fr-CA", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
  const percent = new Intl.NumberFormat("fr-CA", { maximumFractionDigits: 2, signDisplay: "exceptZero" });
  const date = new Intl.DateTimeFormat("fr-CA", {
    dateStyle: "medium", timeStyle: "short", timeZone: "America/New_York",
  });
  let quote = null;
  let lastAttempt = 0;
  let timer = null;
  let controller = null;
  const active = () => !lab.hidden && document.visibilityState !== "hidden";

  function renderQuote(cached = false) {
    const stale = Date.now() - Date.parse(quote.timestamp) > MARKET_STALE_MS;
    price.textContent = `${number.format(quote.value)} USD/lb`;
    change.textContent = quote.changePct === null ? "Variation non fournie" : `${percent.format(quote.changePct)} %`;
    time.dateTime = quote.timestamp;
    time.textContent = `${date.format(new Date(quote.timestamp))} (heure de New York)`;
    status.textContent = cached ? (stale ? "Cours ancien · en cache" : "Dernier cours · en cache")
      : (stale ? "Cours ancien" : "Dernier cours disponible");
    onQuote?.(quote);
  }

  // Seul le cours est conservé localement, jamais la caisse ni la progression.
  try {
    const saved = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (saved) {
      quote = normalizeArabicaQuote({ timestamp: saved.timestamp, ice_arabica: {
        value: saved.value, unit: "USD/lb", change_pct: saved.changePct,
      } });
      renderQuote(true);
      message.textContent = "Cours conservé localement ; vérification à l’ouverture du jeu.";
    }
  } catch { /* Cache absent, invalide ou stockage interdit : le jeu reste utilisable. */ }

  function schedule() {
    clearTimeout(timer);
    timer = null;
    if (active()) timer = setTimeout(update, Math.max(1000, MARKET_REFRESH_MS - (Date.now() - lastAttempt)));
  }

  async function update() {
    if (!active() || controller) return;
    if (Date.now() - lastAttempt < 15000) {
      message.textContent = "Une vérification vient d’être faite. Attends 15 secondes avant de réessayer.";
      return;
    }
    lastAttempt = Date.now();
    const request = new AbortController();
    controller = request;
    refresh.disabled = true;
    root.setAttribute("aria-busy", "true");
    message.textContent = "Vérification du dernier cours disponible…";
    const timeout = setTimeout(() => request.abort(), 8000);
    try {
      const response = await fetch(COFFEE_MARKET_URL, {
        signal: request.signal, cache: "no-store", credentials: "omit", headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const next = normalizeArabicaQuote(await response.json());
      if (request.signal.aborted || !active()) return;
      // Une réponse plus ancienne ne remplace pas un cours déjà reçu.
      if (quote && Date.parse(next.timestamp) < Date.parse(quote.timestamp)) {
        message.textContent = "La source a renvoyé un cours antérieur. Le dernier cours conservé reste utilisé.";
        return;
      }
      quote = next;
      renderQuote();
      message.textContent = Date.now() - Date.parse(quote.timestamp) > MARKET_STALE_MS
        ? "La source répond, mais son cours a plus de 72 heures. Prix du jeu indicatif, calculé avec ce cours ancien."
        : "Cours fourni par Buon Ma Thuot Coffee. Le prix du jeu est recalculé, sans modifier les ventes passées.";
      try { localStorage.setItem(CACHE_KEY, JSON.stringify(quote)); } catch { /* Stockage facultatif. */ }
    } catch {
      if (!active()) return;
      if (quote) {
        renderQuote(true);
        message.textContent = "Source injoignable ou réponse invalide. Dernier cours conservé utilisé ; ce n’est pas du direct.";
      } else {
        status.textContent = "Cours indisponible";
        message.textContent = "Source injoignable ou réponse invalide. Prix de secours : 3 $ fictifs, non reliés au marché.";
      }
    } finally {
      clearTimeout(timeout);
      controller = null;
      refresh.disabled = false;
      root.setAttribute("aria-busy", "false");
      schedule();
    }
  }

  function syncVisibility() {
    if (!active()) {
      clearTimeout(timer);
      timer = null;
      if (controller) {
        lastAttempt = 0;
        controller.abort();
      }
      return;
    }
    if (!lastAttempt || Date.now() - lastAttempt >= MARKET_REFRESH_MS) update();
    else schedule();
  }
  refresh.addEventListener("click", update);
  document.addEventListener("visibilitychange", syncVisibility);
  new MutationObserver(syncVisibility).observe(lab, { attributes: true, attributeFilter: ["hidden"] });
  syncVisibility();
}
