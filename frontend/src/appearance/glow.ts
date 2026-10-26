/* Paint the glow, the glass faces, and the accent, and handle the color-picker clicks.
 *
 * The glow math lives in `./home-glow.ts`. That file does not know the preference object. This file passes the current settings and the target element.
 * The sidebar layer is the empty `.glowlayer` div, not <html>. Custom properties inherit, so writing them on the root restyles the whole tree,
 * about 15ms a frame, which spends the frame budget while dragging. The measurement is on the rule in web/css/01-base.css.
 * Each frame writes once: a second of pointer movement can emit hundreds of pointermove events, and the animation frame writes the settings for that frame.
 *
 * The other glass faces (search field, top-bar icon buttons, filter popover, settings-card section nav, library and color popovers, narrow column, selection bar)
 * are spread through the tree and have no shared host, so their two reflection hues can only be written on the root. One root write restyles the whole tree, so
 * that path runs only for a preset change, a color pick, and the switch. The accent is the same: one click writes one attribute, and the page's buttons, focus rings, and
 * links follow it. */
import {
  ACCENTS, DEFAULT_ACCENT, DEFAULT_HOME_GLOW, HOME_GLOW_PRESETS, HOME_GLOW_SPOTS, glowAccent, glowChipFill, glowPalette,
  isNativeGlass, normalizeAccent, paintGlassFaces, paintHomeGlow, type HomeGlow,
} from './home-glow';

import type { SettingsStore } from '../settings-store';
import { t, type MessageKey } from '../i18n/translate';
import { appSettingsStore } from './settings';

/** The two fields this layer reads and writes. The store has other fields. */
export interface GlowSettings { homeGlow: HomeGlow; accent: string }
type GlowStore = SettingsStore<GlowSettings>;

/** Write the sidebar glow layer once, immediately. Startup uses this before the first frame. */
export function paintHomeGlowNow(store: GlowStore = appSettingsStore()): void {
  paintHomeGlow(document.querySelector<HTMLElement>('.glowlayer'), store.value.homeGlow);
}

let glowFrame = 0;
/** Schedule one redraw of the sidebar glow layer. A second call in the same frame does not schedule another. It reads the settings for that frame. */
export function applyHomeGlow(store: GlowStore = appSettingsStore()): void {
  if (glowFrame) return;
  glowFrame = requestAnimationFrame(() => { glowFrame = 0; paintHomeGlowNow(store) });
}

export function applyGlassFaces(store: GlowStore = appSettingsStore()): void {
  paintGlassFaces(document.documentElement, store.value.homeGlow);
}

export function applyAccent(store: GlowStore = appSettingsStore()): void {
  document.documentElement.dataset.accent = store.value.accent;
}

/** One preset chip. The `native` chip has no color. The stylesheet picks the ball color from the current theme. */
export interface GlowChip { key: string; label: string; native: boolean; fill: string }

const chip = (key: string, label: string, colors: readonly string[]): GlowChip =>
  ({ key, label, native: isNativeGlass(key), fill: isNativeGlass(key) ? '' : glowChipFill(colors) });

/* Preset chips follow the feralui preset chip: the three glow colors split one conic-gradient, with BoardUI's three white highlights on top.
   Custom takes a cell only after the user has actually picked colors. Before that, the cell would be a ball identical to the default, and clicking it
   would change nothing while looking like an untried preset. */
/** Preset name. When the catalog has no sentence, use the Chinese name kept on the data layer. */
export function glowPresetLabel(key: string, fallback = ''): string {
  const message = `glow.preset.${key}` as MessageKey;
  const text = t(message);
  return text === message ? fallback : text;
}

export function glowChips(glow: HomeGlow): GlowChip[] {
  const chips = HOME_GLOW_PRESETS.map(([key, label, palette]) => chip(
    key, glowPresetLabel(key, label), HOME_GLOW_SPOTS.map((spot) => palette[spot].color)));
  if (glow.preset === 'custom') chips.push(chip('custom', glowPresetLabel('custom', '自定义'), HOME_GLOW_SPOTS.map((spot) => glow[spot].color)));
  return chips;
}

/** The accent row: `[key, name]`. The stylesheet paints each ball from the 400 and 600 steps of `data-accent-ball`. */
export const ACCENT_CHOICES = ACCENTS;

/* Changing a glow preset changes the accent with it. One palette is one surface. A warm glow with blue buttons reads as two skins stacked together.
   The accent row can be clicked on its own. That click changes only the accent. The pairing comes first, and it can still be split apart. */
export function chooseGlowPreset(key: string, store: GlowStore = appSettingsStore()): void {
  if (key === 'custom') return;
  const glow = store.value.homeGlow;
  glow.preset = key;
  Object.assign(glow, glowPalette(key));
  store.value.accent = glowAccent(key);
  store.save();
  applyHomeGlow(store); applyGlassFaces(store); applyAccent(store);
}

export function chooseAccent(key: string, store: GlowStore = appSettingsStore()): void {
  store.value.accent = normalizeAccent(key);
  store.save();
  applyAccent(store);
}

/* Reset changes the palette, not the whole glow. The headings say glow and accent. Clearing strength and grain with them would look like the wrong key.
   Restoring the whole glow lives on the detail screen. */
export function resetGlowColors(store: GlowStore = appSettingsStore()): void {
  const glow = store.value.homeGlow;
  glow.preset = DEFAULT_HOME_GLOW.preset;
  Object.assign(glow, glowPalette(glow.preset));
  store.value.accent = DEFAULT_ACCENT;
  store.save();
  applyHomeGlow(store); applyGlassFaces(store); applyAccent(store);
}

/* The two small circles on the color button at the bottom of the sidebar: the upper one shows the preset's first glow color, the lower one shows the accent. With the glow off,
   the upper circle hides and only the accent remains. The BoardUI dot is an accent. The glass-color preset has no glow color
   to show, so it uses half of each built-in glass reflection. The stylesheet reads `data-glow-native`. */
export function paintGlowButton(button: HTMLElement, glow: HomeGlow): void {
  button.style.setProperty('--glow-swatch', glow.on ? glow.spot1.color : 'var(--color-accent-500)');
  button.toggleAttribute('data-glow-native', glow.on && isNativeGlass(glow.preset));
  button.toggleAttribute('data-glow-off', !glow.on);
}

/** Paint the button once, then follow every save. The button stays in the shell, so a palette change from anywhere has to line up with it. */
export function wireGlowButton(button: HTMLElement, store: GlowStore = appSettingsStore()): () => void {
  paintGlowButton(button, store.value.homeGlow);
  return store.subscribe(() => paintGlowButton(button, store.value.homeGlow));
}
