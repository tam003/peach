/* Screen text that skips `phrase()` still reads in the chosen language: whole sentences, sentences with slots,
 * readable attributes, and the way back to Chinese. A name or path that merely contains Chinese stays as written. */
import { afterEach, describe, expect, it } from 'vitest';

import { applyLocale } from '../../src/appearance/locale';
import { listSeparator, phrase, translateScreenText } from '../../src/i18n/phrase';

const settle = () => new Promise((resolve) => setTimeout(resolve, 0));

afterEach(() => {
  applyLocale('zh');
  document.body.replaceChildren();
});

describe('screen translation', () => {
  it('matches whole sentences and sentences with slots, and leaves unknown text alone', () => {
    applyLocale('vi');
    expect(translateScreenText('厂牌分目录')).toBe('Thư mục theo hãng');
    expect(translateScreenText('16 项需要处理，可重试未完成的部分。')).toBe('16 mục cần xử lý, có thể thử lại phần chưa xong.');
    expect(translateScreenText('雪后山径.mp4')).toBeNull();
    expect(translateScreenText('「三上悠亚」有 2 张人物页都列着；「三上」没有人物页列着'))
      .toBe('"三上悠亚": có 2 trang nhân vật cùng ghi; "三上": không có trang nhân vật nào ghi');
    applyLocale('zh');
    expect(translateScreenText('厂牌分目录')).toBeNull();
  });

  it('rewrites text nodes and attributes added to the page, and restores Chinese on the way back', async () => {
    applyLocale('vi');
    const button = document.createElement('button');
    button.title = '厂牌分目录';
    button.append('已排除', document.createElement('span'));
    button.lastElementChild!.textContent = '雪后山径.mp4';
    document.body.append(button);
    await settle();
    expect(button.title).toBe('Thư mục theo hãng');
    expect(button.firstChild!.nodeValue).toBe('Đã loại trừ');
    expect(button.lastElementChild!.textContent).toBe('雪后山径.mp4');

    button.firstChild!.nodeValue = '番号 标题';
    await settle();
    expect(button.firstChild!.nodeValue).toBe('Mã phim + Tiêu đề');

    applyLocale('zh');
    expect(button.title).toBe('厂牌分目录');
    expect(button.firstChild!.nodeValue).toBe('番号 标题');
  });

  it('fills a slot holding a known label in the same language and joins lists with the local separator', () => {
    applyLocale('vi');
    expect(phrase('{label}空间使用率', { label: '系统盘' })).toBe('Mức dùng chỗ của Ổ hệ thống');
    expect(phrase('{label}空间使用率', { label: 'D:' })).toBe('Mức dùng chỗ của D:');
    expect(['甲', '乙'].join(listSeparator())).toBe('甲, 乙');
    applyLocale('zh');
    expect(['甲', '乙'].join(listSeparator())).toBe('甲、乙');
  });
});
