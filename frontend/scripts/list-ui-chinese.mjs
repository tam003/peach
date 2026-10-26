import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..', 'src');
const skip = new Set(['messages.ts']);
const hits = new Map();

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      if (name === 'boardui' || name === 'evilcharts') continue;
      walk(path);
      continue;
    }
    if (!/\.(tsx|ts|js)$/.test(name) || skip.has(name)) continue;
    const text = readFileSync(path, 'utf8');
    const stripped = text
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/(^|[^:])\/\/.*$/gm, '$1');
    const pattern = /(['"`])([^'"`\n]*[\u4e00-\u9fff][^'"`\n]*)\1|>\s*([^<{]*[\u4e00-\u9fff][^<{]*)\s*</g;
    let match;
    while ((match = pattern.exec(stripped))) {
      const value = (match[2] || match[3] || '').trim();
      if (!value || value.length > 180) continue;
      const list = hits.get(value) ?? [];
      if (list.length < 3) list.push(path.slice(path.indexOf('src')));
      hits.set(value, list);
    }
  }
}

walk(root);
const rows = [...hits.keys()].sort((a, b) => a.length - b.length || a.localeCompare(b));
console.log(String(rows.length));
for (const row of rows) console.log(row);
