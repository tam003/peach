import { phrase } from '../../i18n/phrase';
export const JAV_TABS = () => ([['library', phrase('馆藏')], ['discover', phrase('发现')], ['wants', phrase('想要')]] as const);
export const javTab = (value: string | null) => JAV_TABS().some(([key]) => key === value) ? value! : 'library';
export const javPath = (tab: string) => javTab(tab) === 'library' ? '/?jav=1' : `/jav?tab=${tab}`;
export function javLibraryPath(search: string) {
  const params = new URLSearchParams(search);
  params.delete('tab'); params.set('jav', '1');
  return '/?' + params;
}
