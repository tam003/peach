/* Three interface languages. A missing or unrecognized value is Chinese (zh), the native language of Peach.
 * `zh` is written on the page as `zh-CN`: the Chinese copy is Simplified. */

export const LOCALES = ['en', 'vi', 'zh'] as const;
export type Locale = (typeof LOCALES)[number];

const HTML_LANG: Record<Locale, string> = { en: 'en', vi: 'vi', zh: 'zh-CN' };

/** The three names on the language switch. Each stays in its own language. */
export const LOCALE_CHOICES: readonly (readonly [Locale, string])[] = [
  ['en', 'English'], ['vi', 'Tiếng Việt'], ['zh', '中文'],
];

export function normalizeLocale(value: unknown): Locale {
  if (value === 'zh-CN') return 'zh';
  return LOCALES.includes(value as Locale) ? value as Locale : 'zh';
}

export function htmlLang(locale: Locale): string {
  return HTML_LANG[locale];
}
