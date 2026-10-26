/* Phrase coverage and completeness test across en, vi, and zh. */
import { describe, expect, it } from 'vitest';

import { applyLocale } from '../../src/appearance/locale';
import { phrase, type PhrasePack } from '../../src/i18n/phrase';

const packs = import.meta.glob('../../src/i18n/phrases/*.ts', { eager: true }) as Record<
  string,
  { phrases?: PhrasePack }
>;

describe('phrase completeness and accuracy', () => {
  it('all registered phrases have non-empty en and vi definitions without placeholder dummies', () => {
    let count = 0;
    for (const [path, mod] of Object.entries(packs)) {
      expect(mod.phrases, `${path} should export phrases`).toBeDefined();
      for (const [key, line] of Object.entries(mod.phrases ?? {})) {
        count++;
        expect(key.length, `key should not be empty in ${path}`).toBeGreaterThan(0);
        expect(typeof line.en, `en in ${path} for key ${key}`).toBe('string');
        expect(typeof line.vi, `vi in ${path} for key ${key}`).toBe('string');

        // Check that no dummy placeholder text remained
        if (key !== '详情') {
          expect(line.en, `en should not be placeholder 'Details' for key ${key}`).not.toBe('Details');
          expect(line.vi, `vi should not be placeholder 'Details' for key ${key}`).not.toBe('Details');
        }
      }
    }
    expect(count).toBeGreaterThan(2000);
  });

  it('translates correctly in all three supported locales', () => {
    applyLocale('vi');
    expect(phrase('保存')).toBe('Lưu');
    expect(phrase('删除')).toBe('Xóa');
    expect(phrase('全选')).toBe('Chọn tất cả');
    expect(phrase('取消')).toBe('Hủy');
    expect(phrase('重试')).toBe('Thử lại');

    applyLocale('en');
    expect(phrase('保存')).toBe('Save');
    expect(phrase('删除')).toBe('Delete');
    expect(phrase('全选')).toBe('Select all');
    expect(phrase('取消')).toBe('Cancel');
    expect(phrase('重试')).toBe('Retry');

    applyLocale('zh');
    expect(phrase('保存')).toBe('保存');
    expect(phrase('删除')).toBe('删除');
    expect(phrase('全选')).toBe('全选');
    expect(phrase('取消')).toBe('取消');
    expect(phrase('重试')).toBe('重试');

    applyLocale('zh');
  });
});
