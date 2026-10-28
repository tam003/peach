/* 服务端译文 `resources/locale/phrases.json` 由 `scripts/export-phrases.mjs` 从界面短语包导出；
 * 改了短语包却没重新导出，API 与页面就会说两种话。 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import type { PhrasePack } from '../../src/i18n/phrase';

const packs = import.meta.glob('../../src/i18n/phrases/*.ts', { eager: true }) as Record<string, { phrases?: PhrasePack }>;

describe('server phrase export', () => {
  it('matches the interface phrase packs', () => {
    const merged: Record<string, { en: string; vi: string }> = {};
    for (const name of Object.keys(packs).sort()) {
      for (const [source, line] of Object.entries(packs[name]?.phrases ?? {})) merged[source] = { en: line.en, vi: line.vi };
    }
    const exported = JSON.parse(readFileSync(resolve(process.cwd(), '../resources/locale/phrases.json'), 'utf8'));
    expect(exported).toEqual(merged);
  });
});
