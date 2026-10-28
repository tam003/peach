import { expect, it } from 'vitest';
import { applyLocale } from '../src/appearance/locale';
import { javTitleHtml, javTitleParts } from '../src/core/jav-title';

it('已确认的版本标签与 4K 位于标题，分辨率未取得时不添加画质标记', () => {
  const host = document.createElement('div');
  const item = { is_jav: true, code: 'EXM-001', catalog_title: '示例作品', edition_badges: ['中字', '无码'] };
  host.innerHTML = javTitleHtml({ ...item, width: 3840, height: 2160 });
  expect([...host.querySelectorAll('.javedition')].map(node => node.textContent)).toEqual(['中字', '无码', '4K']);
  expect(host.querySelector('.ui-javtitle')?.textContent).toBe('示例作品');
  for (const dimensions of [{}, { width: 1920, height: 1080 }, { width: 3840, height: 1080 }]) {
    host.innerHTML = javTitleHtml({ ...item, ...dimensions });
    expect(host.querySelector('.quality')).toBeNull();
  }
});

it('界面语言不是中文时用来源英文标题，中文界面仍用官方日文标题', () => {
  const item = { is_jav: true, code: 'EXM-002', catalog_title: '示例作品', title_en: 'Sample Work' };
  applyLocale('en');
  expect(javTitleParts(item).title).toBe('Sample Work');
  applyLocale('vi');
  expect(javTitleParts(item).title).toBe('Sample Work');
  expect(javTitleParts({ ...item, title_en: '' }).title).toBe('示例作品');
  applyLocale('zh');
  expect(javTitleParts(item).title).toBe('示例作品');
});
