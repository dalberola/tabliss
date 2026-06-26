import { pick } from "in-browser-language";

/**
 * Single source of truth for the locales Tabliss ships.
 *
 * The catalogues themselves are NOT imported here — they are code-split and
 * fetched on demand by `loadMessages` so a visitor downloads only their own
 * language instead of all ~45 (see `IntlProvider`). `en` and `zh` carry no
 * file and fall back to the source strings (each message's `defaultMessage`).
 */
export const locales = [
  "ar", "ca-ES", "cs", "de", "el", "en", "en-AU", "en-CA", "en-GB", "es",
  "fa", "fi", "fr", "ga", "gd", "gl", "gu", "hi", "hu", "id", "it", "ja",
  "ko", "kp", "lt", "lb", "ne", "nl", "no", "ro", "ru", "sk", "sr", "sv",
  "pl", "pt", "pt-BR", "ta", "th", "tr", "vi", "zh", "zh-CN", "zh-TW", "uk",
];

export const defaultLocale = pick(locales, "en");

// Locales that intentionally have no catalogue file (they ARE the source).
const SOURCE_LOCALES = new Set(["en", "zh"]);

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
