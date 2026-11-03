/* Finished screen text meets the most specific sentence, and sentences the t() catalog already says need no second copy. */
import { afterEach, expect, it } from 'vitest';

import { vi as viCatalog } from '../../src/i18n/messages';
import { phrase, translateScreenText } from '../../src/i18n/phrase';
import { setLocale } from '../../src/i18n/translate';
import { summaryText } from '../../src/react/activity/tasks';

afterEach(() => setLocale('zh'));

it('一句话有更长的固定文字时，不被多个空位的宽泛句式截走', () => {
  setLocale('vi');
  expect(translateScreenText('1 个来源上次检查失败，去')).toBe(phrase('{count} 个来源上次检查失败，去', { count: 1 }));
  expect(translateScreenText('1 个来源上次检查失败，去')).not.toContain('上次');
});

it('任务摘要的字段名与服务端结果按当前语言显示', () => {
  setLocale('vi');
  const text = summaryText({ checked: 8, total: 8, scanned: 37, probed: 1, previews: 1, followups: 39 });
  expect(text).not.toMatch(/[一-鿿]/);
  expect(text).toContain(phrase('已检查'));
});

it('页面直接写出的中文若已在 t() 词表里，按词表的译文显示', () => {
  setLocale('vi');
  expect(translateScreenText('导航入口与顺序')).toBe(viCatalog['settings.navOrder']);
  expect(phrase('每批加载作品')).toBe(viCatalog['settings.batch']);
});
