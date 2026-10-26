/* Defaults, startup normalization, and the single store for interface preferences (`peach.settings.v1`).
 * Application, the settings panel, the sidebar, and the color popover read and write the same object.
 * The first `appSettingsStore()` reads localStorage, normalizes it, and creates the instance before startup continues.
 * Stored values are kept only when their shape and range are valid. An invalid field takes that field's default. */
import { api } from '@peach/legacy/core';

import { normalizeLocale } from '../i18n/locale';

import { normalizeJavPreferences } from '../jav-artwork';
import { boundedPreference } from '../number-setting';
import { createSettingsStore, type SettingsStore } from '../settings-store';
import { DEFAULT_SIDEBAR_ORDER, normalizeSidebarOrder } from '../sidebar';
import { SORT_ALIASES, SORT_KEYS } from '../sort-preferences';
import { DEFAULT_ACCENT, DEFAULT_HOME_GLOW, normalizeAccent, normalizeHomeGlow, type HomeGlow } from './home-glow';

export const SETTINGS_KEY = 'peach.settings.v1';
/* Three theme values. The keys match `data-theme` on <html>: the palettes in web/css/01-base.css
   already follow `prefers-color-scheme` and `[data-theme]`. This list only chooses which path applies.
   System is the default. Choosing it leaves the attribute unset. */
export const THEME_CHOICES: readonly string[] = ['system', 'light', 'dark'];
/** How many days the first follow fetch looks back. The same table lives in the database. */
export const FOLLOW_INITIAL_DAYS: readonly number[] = [0, 7, 30, 90];
/* The server filters compilations out of the new-works row from the database setting (the list, the unread count, and cover fill share it). This is
   a mirror: the switch's value lives at `/api/settings`. Large compilations and excerpts are hidden by default. Solo compilations stay listed. */
export const FEED_COMPILATION_KEYS = ['feedHideGroupCompilations', 'feedHideSoloCompilations', 'feedHideExcerpts'] as const;

/** Fields that are always present after normalization. The object has other fields the shell and islands write as needed. */
export interface AppSettings {
  [key: string]: unknown;
  batchSize: number;
  defaultSort: string;
  defaultSortDirection?: string;
  sortDefaultsVersion: number;
  hoverDelaySeconds: number;
  seekSeconds: number;
  searchHistoryLimit: number;
  relatedLimit: number;
  javLayout: string;
  homeLayout: string;
  javImage: string;
  followLayout: string;
  peopleLayout: string;
  photoSize: string;
  photoLayout?: string;
  followImagesOnly?: boolean;
  ambientMode: boolean;
  miniplayer: boolean;
  theaterMode: boolean;
  theme: string;
  locale: string;
  groupCollapse: boolean;
  detailAutoplay: boolean;
  uiSounds: boolean;
  feedAutoScroll: boolean;
  feedHideGroupCompilations: boolean;
  feedHideSoloCompilations: boolean;
  feedHideExcerpts: boolean;
  followInitialDays: number;
  sidebarOrder: string[];
  homeGlow: HomeGlow;
  accent: string;
}

export const DEFAULT_SETTINGS = {
  batchSize: 60, defaultSort: 'seed', sortDefaultsVersion: 3, hoverDelaySeconds: 5, seekSeconds: 10,
  searchHistoryLimit: 10, relatedLimit: 20, javLayout: 'big', homeLayout: 'small', javImage: 'cover',
  followLayout: 'default', peopleLayout: 'big', photoSize: 'small', ambientMode: true, miniplayer: true,
  theaterMode: false, theme: 'system', locale: 'zh', groupCollapse: true, sidebarOrder: [...DEFAULT_SIDEBAR_ORDER],
  homeGlow: DEFAULT_HOME_GLOW, accent: DEFAULT_ACCENT,
} as const;

/** Return a value that is on the allow-list. Anything else becomes `fallback`. */
export const allowedSetting = <T>(value: unknown, allowed: readonly T[], fallback: T): T =>
  allowed.includes(value as T) ? value as T : fallback;

/** Normalize stored preferences into a complete object. `migrated` means an old key was rewritten and must be saved. */
export function normalizeAppSettings(raw: unknown): { settings: AppSettings; migrated: boolean } {
  const saved = raw && typeof raw === 'object' ? raw as Record<string, unknown> : {};
  const settings = { ...DEFAULT_SETTINGS, ...saved } as Record<string, unknown>;
  settings.followInitialDays = FOLLOW_INITIAL_DAYS.includes(+(settings.followInitialDays as number))
    ? +(settings.followInitialDays as number) : 30;
  delete settings.rotateMinutes;
  /* Migration rewrites only a stored default: a key the interface no longer has becomes the current key. A sort the user chose stays.
     Without this, the allow-list would quietly turn that key into random. */
  let migrated = false;
  const version = +(settings.sortDefaultsVersion as number) || 0;
  if (version < 2 && settings.defaultSort === 'new') { settings.defaultSort = 'seed'; migrated = true }
  const alias = SORT_ALIASES[settings.defaultSort as string];
  if (version < 3 && alias) { settings.defaultSort = alias[0]; migrated = true }
  settings.sortDefaultsVersion = 3;
  settings.batchSize = boundedPreference(+(settings.batchSize as number), 1, 200, 60);
  settings.defaultSort = allowedSetting(settings.defaultSort, SORT_KEYS, 'seed');
  settings.hoverDelaySeconds = boundedPreference(+(settings.hoverDelaySeconds as number), 0, 60, 5);
  settings.seekSeconds = boundedPreference(+(settings.seekSeconds as number), 1, 300, 10);
  delete settings.loginDays;
  delete settings.metadataRefreshDays;
  settings.ambientMode = settings.ambientMode !== false;
  settings.theaterMode = settings.theaterMode === true;
  settings.groupCollapse = settings.groupCollapse !== false;
  settings.detailAutoplay = settings.detailAutoplay !== false;
  settings.miniplayer = settings.miniplayer !== false;
  settings.uiSounds = settings.uiSounds !== false;
  settings.feedAutoScroll = settings.feedAutoScroll !== false;
  settings.feedHideGroupCompilations = settings.feedHideGroupCompilations !== false;
  settings.feedHideSoloCompilations = settings.feedHideSoloCompilations === true;
  settings.feedHideExcerpts = settings.feedHideExcerpts !== false;
  settings.searchHistoryLimit = boundedPreference(+(settings.searchHistoryLimit as number), 0, 50, 10);
  settings.relatedLimit = boundedPreference(+(settings.relatedLimit as number), 0, 60, 20);
  Object.assign(settings, normalizeJavPreferences(settings));
  settings.theme = allowedSetting(settings.theme, THEME_CHOICES, 'system');
  settings.locale = normalizeLocale(settings.locale);
  settings.homeGlow = normalizeHomeGlow(settings.homeGlow);
  settings.accent = normalizeAccent(settings.accent);
  settings.sidebarOrder = normalizeSidebarOrder(settings.sidebarOrder);
  return { settings: settings as AppSettings, migrated };
}

/** Read `storage` and normalize it. Invalid JSON is treated as an empty store. */
export function readAppSettings(storage: Pick<Storage, 'getItem'>): { settings: AppSettings; migrated: boolean } {
  let raw: unknown = {};
  try { raw = JSON.parse(storage.getItem(SETTINGS_KEY) || '{}') } catch { /* Broken JSON counts as empty. */ }
  return normalizeAppSettings(raw);
}

let store: SettingsStore<AppSettings> | null = null;

/** The page-wide preference store. The first call reads and normalizes it, and saves immediately when an old key was rewritten. */
export function appSettingsStore(): SettingsStore<AppSettings> {
  if (store) return store;
  const { settings, migrated } = readAppSettings(localStorage);
  store = createSettingsStore(SETTINGS_KEY, settings);
  if (migrated) store.save();
  return store;
}

/** Name of a shell effect the database copy asks the shell to run. Same names as the settings panel. */
export type SyncedEffect = 'searchHistoryLimit';

/** Search-history length as `/api/settings` returns it. Null means it has never been set. */
export interface SyncedSettings {
  followInitialDays?: unknown;
  feedHideGroupCompilations?: unknown;
  feedHideSoloCompilations?: unknown;
  feedHideExcerpts?: unknown;
  searchHistoryLimit?: unknown;
  sidebarOrder?: unknown;
}

/* The database copy lands in the local cache. The shell fetches it at startup and the settings panel fetches it on each open. Both hand it here. An open panel and the
   sidebar follow the store notification: a new sidebar order repaints immediately. A new search-history length is pushed to the search island by handing `changed` back to the shell. */
export function applySyncedSettings(
  remote: SyncedSettings | null | undefined, changed: (effect: SyncedEffect) => void,
  target: SettingsStore<AppSettings> = appSettingsStore(),
): void {
  const settings = target.value;
  const initial = remote && remote.followInitialDays;
  if (FOLLOW_INITIAL_DAYS.includes(initial as number)) { settings.followInitialDays = initial as number; target.save() }
  for (const key of FEED_COMPILATION_KEYS) {
    if (typeof remote?.[key] !== 'boolean' || remote[key] === settings[key]) continue;
    settings[key] = remote[key] as boolean; target.save();
  }
  /* When the database has no length yet, this device's local number becomes the value for every client, and it is sent once. */
  const limit = remote && remote.searchHistoryLimit;
  if (Number.isInteger(limit) && (limit as number) >= 0 && (limit as number) <= 50) {
    if (limit !== settings.searchHistoryLimit) {
      settings.searchHistoryLimit = boundedPreference(limit as number, 0, 50, 10); target.save();
      changed('searchHistoryLimit');
    }
  } else if (remote && remote.searchHistoryLimit === null
    && settings.searchHistoryLimit !== DEFAULT_SETTINGS.searchHistoryLimit) postSearchHistoryLimit(target);
  const order = Array.isArray(remote && remote.sidebarOrder) ? remote!.sidebarOrder as string[] : null;
  if (!order || !order.length || order.join(',') === settings.sidebarOrder.join(',')) return;
  settings.sidebarOrder = order;
  target.save();
}

/** Send the local search-history length to the database. A failure is quiet; the next reconcile sends it again. */
export function postSearchHistoryLimit(target: SettingsStore<AppSettings> = appSettingsStore()): Promise<unknown> {
  return api('/api/settings', {
    method: 'POST', body: JSON.stringify({ searchHistoryLimit: target.value.searchHistoryLimit }),
  }).catch(() => {});
}
