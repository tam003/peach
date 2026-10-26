import { JAV_RELEASE_SORT } from '../../sort-preferences';
import { phrase } from '../../i18n/phrase';

export const DISCOVERY_SORTS = () => ([
  ['taste', phrase('口味'), phrase('按口味匹配排序')],
  ['release_date', JAV_RELEASE_SORT[1], phrase('按发行日期排序')],
  ['source_score', phrase('来源评分'), phrase('按来源评分排序')],
  ['duration', phrase('时长'), phrase('按时长排序')],
  ['code', phrase('番号'), phrase('按番号排序')],
] as const);
export type DiscoverySort = ReturnType<typeof DISCOVERY_SORTS>[number][0];
export type DiscoveryDirection = 'asc' | 'desc';

export function discoveryScore(value: number | null | undefined): string {
  return typeof value === 'number' && Number.isFinite(value) ? value.toFixed(3) : '—';
}

/** 口味相关度使用固定百分制；未知读数保留空值。 */
export function recommendationScore(value: number | null | undefined) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return { score: '—', label: phrase('资料未取得'), color: 'neutral' as const };
  const score = Math.round(Math.max(0, Math.min(1, value)) * 100);
  const tier = score >= 75 ? { label: phrase('强烈推荐'), color: 'lime' as const }
    : score >= 50 ? { label: phrase('推荐'), color: 'blue' as const }
    : score >= 25 ? { label: phrase('值得看看'), color: 'yellow' as const }
    : { label: phrase('探索'), color: 'neutral' as const };
  return { score: String(score), ...tier };
}
