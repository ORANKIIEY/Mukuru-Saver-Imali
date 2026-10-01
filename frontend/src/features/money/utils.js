/**
 * Shared utility functions for money and financial calculations
 */

/**
 * Formats a number as a South African Rand amount.
 * e.g. 4800 -> "R4,800.00"
 */
export function formatMoney(amount) {
  return `R${Number(amount).toLocaleString('en-ZA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Formats an ISO date string into a readable local date.
 * e.g. "2025-12-01" -> "1 Dec 2025"
 */
export function formatDate(dateStr, lang = 'en') {
  return new Date(dateStr).toLocaleDateString(
    lang === 'zu' ? 'zu-ZA' : 'en-ZA',
    { day: 'numeric', month: 'short', year: 'numeric' }
  );
}

/**
 * Returns a 0–100 percentage of value out of max.
 * e.g. percent(1200, 6000) -> 20
 */
export function percent(value, max) {
  if (!max || max === 0) return 0;
  return Math.min(100, Math.round((value / max) * 100));
}

/**
 * Returns the number of full weeks from now until a given date string.
 * e.g. weeksUntil("2025-06-01") -> 12
 */
export function weeksUntil(dateStr) {
  const diff = new Date(dateStr) - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24 * 7)));
}
