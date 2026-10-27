/* One sentence in the current language. React and the older pages both call `t()`.
 * On a language change, call `setLocale` first, then notify the settings store so an open panel redraws. */
import { htmlLang, normalizeLocale, type Locale } from './locale';
import { en, vi, zh, type MessageKey } from './messages';

export type { MessageKey };

const catalogs: Record<Locale, Record<MessageKey, string>> = { en, vi, zh };

function detectInitialLocale(): Locale {
  try {
    if (typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem('peach.settings.v1');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.locale) return normalizeLocale(parsed.locale);
      }
    }
  } catch { /* ignore */ }
  try {
    if (typeof document !== 'undefined') {
      const match = document.cookie.match(/(?:^|;\s*)peach\.locale=([^;]+)/);
      if (match) return normalizeLocale(match[1]);
    }
  } catch { /* ignore */ }
  if (typeof document !== 'undefined' && document.documentElement?.lang) {
    return normalizeLocale(document.documentElement.lang);
  }
  return 'zh';
}

let current: Locale = detectInitialLocale();
const listeners = new Set<() => void>();

export function getLocale(): Locale {
  return current;
}

export function setLocale(locale: Locale): void {
  if (current === locale) return;
  current = locale;
  try {
    if (typeof document !== 'undefined') {
      document.cookie = `peach.locale=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    }
  } catch { /* ignore */ }
  listeners.forEach((listener) => listener());
}

export function subscribeLocale(listener: () => void): () => void {
  listeners.add(listener);
  return () => { listeners.delete(listener) };
}

/** English fills a missing sentence. If English has no sentence either, the key stays on the page. */
export function t(key: MessageKey, vars?: Record<string, string | number>): string {
  const template = catalogs[current][key] ?? en[key] ?? key;
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) => {
    const value = vars[name];
    return value === undefined ? match : String(value);
  });
}

export function applyDocumentLocale(choice?: unknown): Locale {
  const locale = normalizeLocale(choice);
  setLocale(locale);
  document.documentElement.lang = htmlLang(locale);
  return locale;
}
