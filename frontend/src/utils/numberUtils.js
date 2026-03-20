/**
 * Safely converts a value to a number with a default fallback
 * @param {*} value - The value to convert to a number
 * @param {number} fallback - The default value if conversion fails
 * @returns {number} - The converted number or fallback
 */
export const safeNumber = (value, fallback = 0) => {
  if (value === null || value === undefined || value === '') {
    return fallback;
  }
  
  const num = parseFloat(value);
  return isNaN(num) ? fallback : num;
};

/**
 * Safely formats a number to a fixed decimal places
 * @param {*} value - The value to format
 * @param {number} decimals - Number of decimal places (default: 2)
 * @param {number} fallback - The default value if conversion fails
 * @returns {string} - The formatted number as string
 */
export const safeFixed = (value, decimals = 2, fallback = 0) => {
  const num = safeNumber(value, fallback);
  return num.toFixed(decimals);
};

/**
 * Formats currency with proper locale formatting
 * @param {*} value - The value to format
 * @param {string} currency - Currency code (default: 'USD')
 * @param {string} locale - Locale string (default: 'en-US')
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (value, currency = 'USD', locale = 'en-US') => {
  const num = safeNumber(value, 0);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(num);
};