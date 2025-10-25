import i18n, { t } from 'i18next';
import type { TOptions } from 'i18next';

import { TxKeyPath } from '.';

/**
 * Translates text.
 * @param {TxKeyPath} key - The i18n key.
 * @param {TOptions} options - The i18n options.
 * @returns {string} - The translated text.
 * @example
 * Translations:
 *
 * ```en.ts
 * {
 *  "hello": "Hello, {{name}}!"
 * }
 * ```
 *
 * Usage:
 * ```ts
 * import { translate } from "./i18n"
 *
 * translate("hello", { name: "world" })
 * // => "Hello world!"
 * ```
 */
export function translate(key: TxKeyPath, options?: TOptions): string {
  if (i18n.isInitialized) {
    return t(key, options);
  }
  return key;
}

/**
 * Gets the current locale code for use with external services.
 * @returns {string} - The current locale code (e.g., 'en', 'de').
 */
export function getCurrentLocale(): string {
  if (i18n.isInitialized) {
    // Extract the primary language tag (e.g., 'en' from 'en-US')
    return i18n.language.split('-')[0];
  }
  return 'en'; // fallback to English
}
