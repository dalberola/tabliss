import { pick } from "in-browser-language";

/** A selectable language: its code, endonym (shown in the picker), an English
 * name (used for the option's tooltip), and whether it is right-to-left. */
export interface LocaleOption {
  code: string;
  label: string;
  name: string;
  rtl?: boolean;
}

/**
 * Single source of truth for the locales Tabliss ships, in the order shown in
 * the language picker. The settings dropdown (`System.tsx`) and the `locales`
 * list (used for default-locale detection and on-demand loading) are both
 * derived from this — add a language here once, not in two places.
 *
 * Catalogues are NOT imported here: they are code-split and fetched on demand
 * by `loadMessages` so a visitor downloads only their own language instead of
 * all ~45 (see `IntlProvider`). `en` has no file and falls back to the source
 * strings (each message's `defaultMessage`).
 */
export const localeOptions: LocaleOption[] = [
  { code: "ar", label: "العربية", name: "Arabic", rtl: true },
  { code: "ca-ES", label: "Català", name: "Catalan" },
  { code: "cs", label: "Čeština", name: "Czech" },
  { code: "de", label: "Deutsch", name: "German" },
  { code: "el", label: "Ελληνικά", name: "Greek" },
  { code: "en-AU", label: "English (AU)", name: "English (Australian)" },
  { code: "en-CA", label: "English (CA)", name: "English (Canadian)" },
  { code: "en-GB", label: "English (GB)", name: "English (British)" },
  { code: "en", label: "English (US)", name: "English (American)" },
  { code: "es", label: "Español", name: "Spanish" },
  { code: "fa", label: "پارسی", name: "Persian", rtl: true },
  { code: "fr", label: "Français", name: "French" },
  { code: "he", label: "עברית", name: "Hebrew", rtl: true },
  { code: "ga", label: "Gaeilge", name: "Gaeilge" },
  { code: "gd", label: "Gàidhlig", name: "Scottish Gaelic" },
  { code: "gl", label: "Galego", name: "Galician" },
  { code: "gu", label: "ગુજરાતી", name: "Gujarati" },
  { code: "hi", label: "हिन्दी", name: "Hindi" },
  { code: "hu", label: "Magyar", name: "Hungarian" },
  { code: "id", label: "Indonesian", name: "Indonesian" },
  { code: "it", label: "Italiano", name: "Italian" },
  { code: "ja", label: "日本語", name: "Japanese" },
  { code: "ko", label: "한국어", name: "Korean" },
  { code: "kp", label: "조선말", name: "North Korean" },
  { code: "lb", label: "Lëtzebuergesch", name: "Luxembourgish" },
  { code: "lt", label: "Lietuvių k.", name: "Lithuanian" },
  { code: "ne", label: "Nepali", name: "Nepali" },
  { code: "nl", label: "Nederlands", name: "Dutch" },
  { code: "no", label: "Norsk", name: "Norwegian" },
  { code: "pl", label: "Polski", name: "Polish" },
  { code: "pt-BR", label: "Português do Brasil", name: "Portuguese (Brazil)" },
  { code: "pt", label: "Português de Portugal", name: "Portuguese (Portugal)" },
  { code: "ro", label: "Română", name: "Romanian" },
  { code: "ru", label: "Русский", name: "Russian" },
  { code: "sk", label: "Slovenčina", name: "Slovak" },
  { code: "sr", label: "Српски", name: "Serbian" },
  { code: "fi", label: "Suomi", name: "Finnish" },
  { code: "sv", label: "Svenska", name: "Swedish" },
  { code: "ta", label: "தமிழ்", name: "Tamil" },
  { code: "th", label: "ไทย", name: "Thai" },
  { code: "tr", label: "Türkçe", name: "Turkish" },
  { code: "vi", label: "Tiếng Việt", name: "Vietnamese" },
  { code: "zh-CN", label: "中文（中国）", name: "Simplified Chinese (China)" },
  { code: "zh-TW", label: "中文（台灣）", name: "Traditional Chinese (Taiwan)" },
  { code: "uk", label: "Українська", name: "Ukrainian" },
];

export const locales = localeOptions.map((option) => option.code);

export const defaultLocale = pick(locales, "en");

const RTL_LOCALES = new Set(
  localeOptions.filter((option) => option.rtl).map((option) => option.code),
);

/** Whether a locale is written right-to-left (Arabic, Persian, Hebrew, …). */
export function isRtlLocale(locale: string): boolean {
  return RTL_LOCALES.has(locale);
}

// Locales that intentionally have no catalogue file (they ARE the source).
const SOURCE_LOCALES = new Set(["en"]);

const cache = new Map<string, Record<string, string>>();

/**
 * Synchronously return an already-resolved catalogue, if one is available.
 * Returns `{}` for source/unknown locales (no fetch needed), or `undefined`
 * when a real catalogue still has to be loaded. Lets `IntlProvider` seed its
 * first render without a flash when the catalogue is already known.
 */
export function peekMessages(locale: string): Record<string, string> | undefined {
  if (SOURCE_LOCALES.has(locale) || !locales.includes(locale)) return {};
  return cache.get(locale);
}

/** Lazily load (and memoise) the message catalogue for a locale. */
export async function loadMessages(
  locale: string,
): Promise<Record<string, string>> {
  const ready = peekMessages(locale);
  if (ready) return ready;

  const mod = (await import(
    /* webpackChunkName: "locale-[request]" */
    /* webpackExclude: /whitelist/ */
    `./lang/${locale}.json`
  )) as { default: Record<string, string> };

  cache.set(locale, mod.default);
  return mod.default;
}

// Warm the default locale so the first paint usually has its catalogue ready.
void loadMessages(defaultLocale);
