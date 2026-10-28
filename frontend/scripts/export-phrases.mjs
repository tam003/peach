/* 把界面短语包导出成服务端用的 `resources/locale/phrases.json`，API 的提示与报错和页面用同一份译文。
 * 合并顺序与 `src/i18n/phrase.ts` 的 `import.meta.glob` 一致：按文件名排序，后加载的同键覆盖前面的。
 * 用法：node frontend/scripts/export-phrases.mjs（仓库根或 frontend 目录均可）。 */
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const frontend = join(dirname(fileURLToPath(import.meta.url)), '..');
const packs = join(frontend, 'src', 'i18n', 'phrases');
const output = join(frontend, '..', 'resources', 'locale', 'phrases.json');

const table = {};
for (const name of readdirSync(packs).filter((file) => file.endsWith('.ts')).sort()) {
  const { phrases } = await import(pathToFileURL(join(packs, name)).href);
  for (const [source, line] of Object.entries(phrases ?? {})) table[source] = { en: line.en, vi: line.vi };
}
const sorted = Object.fromEntries(Object.keys(table).sort().map((key) => [key, table[key]]));
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, `${JSON.stringify(sorted, null, 0).replace(/},"/g, '},\n"')}\n`, 'utf8');
console.log(`${Object.keys(sorted).length} phrases -> resources/locale/phrases.json`);
