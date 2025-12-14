/**
 * Formats a numeric value into a localized currency string.
 *
 * @param {number|string} value - Monetary value to format
 * @param {string} currency - ISO 4217 currency code (default: USD)
 * @returns {string} Localized currency representation
 */
export default function formatCurrency(value, currency = "USD") {
  const numericValue =
    typeof value === "number" ? value : Number(value) || 0;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(numericValue);
}
