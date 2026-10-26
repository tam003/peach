/* Test setup: normalize default locale formatting across Windows/macOS/Linux machines. */
const origNumberFormat = Intl.NumberFormat;
const origToLocaleString = Number.prototype.toLocaleString;

Number.prototype.toLocaleString = function (locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions) {
  return origToLocaleString.call(this, locales || 'zh-CN', options);
};

// @ts-expect-error vitest environment override
Intl.NumberFormat = function (locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions) {
  return new origNumberFormat(locales || 'zh-CN', options);
};
Object.defineProperty(Intl.NumberFormat, 'prototype', { value: origNumberFormat.prototype });
Intl.NumberFormat.supportedLocalesOf = origNumberFormat.supportedLocalesOf;
