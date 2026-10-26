/* Exact Chinese screen sentences, with an English and a Vietnamese line.
 * Locale `zh` shows the source sentence. A sentence with no entry stays as written. */
import { getLocale } from './translate';

export interface PhraseLine { en: string; vi: string }
export type PhrasePack = Record<string, PhraseLine>;

const packs = import.meta.glob('./phrases/*.ts', { eager: true }) as Record<string, { phrases?: PhrasePack }>;
const table = new Map<string, PhraseLine>();
for (const mod of Object.values(packs)) {
  for (const [source, line] of Object.entries(mod.phrases ?? {})) table.set(source, line);
}

export function phrase(source: string, vars?: Record<string, string | number>): string {
  const line = table.get(source);
  const locale = getLocale();
  const template = locale === 'zh' || !line ? source : locale === 'vi' ? line.vi || line.en : line.en;
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) => {
    const value = vars[name];
    return value === undefined ? match : String(value);
  });
}

export function knownPhrase(source: string): boolean {
  return table.has(source);
}
