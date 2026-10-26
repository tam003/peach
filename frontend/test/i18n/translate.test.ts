/* Interface language: an unrecognized value becomes Chinese (zh), each catalog returns its own sentence, and a missing sentence falls back to English. */
import { describe, expect, it } from 'vitest';

import { applyLocale } from '../../src/appearance/locale';
import { normalizeLocale } from '../../src/i18n/locale';
import { knownPhrase, phrase } from '../../src/i18n/phrase';
import { t } from '../../src/i18n/translate';

describe('interface language', () => {
  it('a missing or unrecognized value is Chinese, and Vietnamese and English set their own lang', () => {
    expect(normalizeLocale(undefined)).toBe('zh');
    expect(normalizeLocale('sepia')).toBe('zh');
    expect(normalizeLocale('zh-CN')).toBe('zh');
    expect(normalizeLocale('en')).toBe('en');
    expect(normalizeLocale('vi')).toBe('vi');
    applyLocale('vi');
    expect(document.documentElement.lang).toBe('vi');
    expect(t('settings.language')).toBe('Ngôn ngữ');
    expect(t('settings.sidebar.moveUp', { name: 'Home' })).toBe('Đưa Home lên');
    expect(phrase('保存')).toBe('Lưu');
    expect(phrase('删除')).toBe('Xóa');
    expect(phrase('全选')).toBe('Chọn tất cả');
    expect(knownPhrase('保存')).toBe(true);
    applyLocale('zh');
    expect(document.documentElement.lang).toBe('zh-CN');
    expect(t('settings.theme.light')).toBe('浅色');
    expect(t('settings.sidebar.hide', { name: '首页' })).toBe('隐藏 首页');
    expect(phrase('保存')).toBe('保存');
    expect(phrase('删除')).toBe('删除');
    expect(phrase('全选')).toBe('全选');
    applyLocale('en');
    expect([document.documentElement.lang, t('settings.theme.dark')]).toEqual(['en', 'Dark']);
    expect(phrase('保存')).toBe('Save');
    expect(phrase('删除')).toBe('Delete');
    expect(phrase('全选')).toBe('Select all');
    applyLocale('nope');
    expect(document.documentElement.lang).toBe('zh-CN');
    applyLocale('zh');
  });
});
