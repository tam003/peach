/* Application layer for appearance and layout (`@peach/appearance`): the preference store, startup normalization, document attributes, CSS variables, and layout switches.
 * Application and the React pages share this source, and it ships in peach-app.js.
 * Route and catalog checks for JAV and the home page are computed in application/layout.js and passed in as arguments. */
export {
  allowedSetting, appSettingsStore, applySyncedSettings, DEFAULT_SETTINGS, FEED_COMPILATION_KEYS, FOLLOW_INITIAL_DAYS,
  normalizeAppSettings, postSearchHistoryLimit, readAppSettings, SETTINGS_KEY, THEME_CHOICES,
} from './settings';
export type { AppSettings, SyncedEffect, SyncedSettings } from './settings';
export { applyLocale } from './locale';
export { applyTheme, THEME_OPTIONS, watchSystemTheme } from './theme';
export { applyDensity, currentDensity, paintPhotoSizeButton, TILES, toggleDensity } from './density';
export type { Density } from './density';
export {
  cardLayoutFor, cardRatio, COVER_FRONT_RATIO, gridLayout, homeLayout, JAV_LAYOUTS, javLayout, PHOTO_LAYOUTS, PHOTO_SIZES,
  photoLayout, photoSize, storeHomeLayout, storeJavLayout, storePhotoLayout, storePhotoSize, storeVideoLayout,
} from './layout';
export type { GridLayout } from './layout';
export {
  ACCENT_CHOICES, applyAccent, applyGlassFaces, applyHomeGlow, chooseAccent, chooseGlowPreset, glowChips, glowPresetLabel, paintGlowButton,
  paintHomeGlowNow, resetGlowColors, wireGlowButton,
} from './glow';
export type { GlowChip, GlowSettings } from './glow';
export {
  ACCENTS, DEFAULT_ACCENT, DEFAULT_HOME_GLOW, GLASS_NATIVE_PRESET, GLOW_SPOT_LABELS, GLOW_SWATCHES, GLOW_SWATCH_FAMILIES,
  HOME_GLOW_CHOICES, HOME_GLOW_PRESETS, HOME_GLOW_SPOTS, glowAccent, glowChipFill, glowColor, glowPalette, glowPresetName,
  isNativeGlass, normalizeAccent, normalizeHomeGlow, paintGlassFaces, paintHomeGlow,
} from './home-glow';
export type { GlowSpot, HomeGlow } from './home-glow';
