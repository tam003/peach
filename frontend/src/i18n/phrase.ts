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
    if (value === undefined) return match;
    // A slot filled with a whole known sentence (a label the server sent) reads in the same language.
    const known = typeof value === 'string' && locale !== 'zh' ? table.get(value) : undefined;
    return known ? (locale === 'vi' ? known.vi || known.en : known.en) : String(value);
  });
}

export function knownPhrase(source: string): boolean {
  return table.has(source);
}

/* A sentence with `{name}` slots also matches the finished text on the page: `3 项需要处理` meets `{n} 项需要处理`. */
interface PhrasePattern { match: RegExp; names: string[]; line: PhraseLine }
let patterns: PhrasePattern[] | null = null;

function phrasePatterns(): PhrasePattern[] {
  if (patterns) return patterns;
  patterns = [];
  for (const [source, line] of table) {
    if (!/\{\w+\}/.test(source)) continue;
    const names: string[] = [];
    const body = source.split(/(\{\w+\})/).map((part) => {
      const slot = /^\{(\w+)\}$/.exec(part);
      if (!slot) return part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      names.push(slot[1] ?? '');
      return '([\\s\\S]+?)';
    }).join('');
    patterns.push({ match: new RegExp(`^${body}$`), names, line });
  }
  // A longer literal part is the more specific sentence.
  patterns.sort((a, b) => b.match.source.length - a.match.source.length);
  return patterns;
}

/** The current-language sentence for finished screen text, or null when the table has no line for it. */
export function translateScreenText(text: string): string | null {
  const locale = getLocale();
  if (locale === 'zh') return null;
  const pick = (line: PhraseLine) => (locale === 'vi' ? line.vi || line.en : line.en) || null;
  const exact = table.get(text);
  if (exact) return pick(exact);
  // Several reasons joined by `；` read in the current language when every reason has a line.
  // This runs before slot patterns, whose slots would otherwise swallow the separator.
  const parts = text.split('；');
  if (parts.length > 1) {
    const lines = parts.map((part) => (/[一-鿿]/.test(part) ? translateScreenText(part.trim()) : part.trim()));
    if (lines.every((line) => line !== null)) return lines.join('; ');
  }
  for (const { match, names, line } of phrasePatterns()) {
    const found = match.exec(text);
    if (!found) continue;
    const template = pick(line);
    if (!template) return null;
    const vars: Record<string, string> = {};
    names.forEach((name, index) => {
      const value = found[index + 1] ?? '';
      vars[name] = /[一-鿿]/.test(value) ? translateScreenText(value) ?? value : value;
    });
    return template.replace(/\{(\w+)\}/g, (slot, name: string) => vars[name] ?? slot);
  }
  return null;
}

/** The separator between listed names: `、` in Chinese, a comma elsewhere. */
export function listSeparator(): string {
  return getLocale() === 'zh' ? '、' : ', ';
}
