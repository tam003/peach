/* Performers and studios read in romaji outside `zh`. `/api/entity/latin-names` maps each canonical name the ledger
 * keeps to the romaji a source gave, and the screen translation swaps text that is exactly such a name.
 * Links, filters and search keep the canonical name. A name with no romaji stays as written. */
import { apiGet } from '../api';

import { registerScreenNames } from './phrase';
import { refreshScreenTranslation } from './screen';
import { getLocale, subscribeLocale } from './translate';

let loading: Promise<void> | null = null;
let installed = false;

function load(): void {
  if (loading || getLocale() === 'zh') return;
  loading = apiGet<{ names?: Record<string, string> }>('/api/entity/latin-names')
    .then((payload) => {
      registerScreenNames(payload.names ?? {});
      refreshScreenTranslation();
    })
    .catch(() => { loading = null });
}

/** Start once in the main interface. Safe to call again. */
export function installScreenNames(): void {
  if (installed) return;
  installed = true;
  subscribeLocale(load);
  load();
}
