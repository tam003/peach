/* Write the saved language onto the document and make `t()` read the same value.
 * The first frame is set by the inline script in `web/index.html` and the entry shell. This function handles every change after startup. */
import { phrase } from '../i18n/phrase';
import { shellBindings } from '../i18n/phrases/shell';
import { applyDocumentLocale } from '../i18n/translate';

import { appSettingsStore } from './settings';

function applyShellCopy(): void {
  for (const binding of shellBindings) {
    const node = document.querySelector(binding.selector);
    if (!node) continue;
    if (binding.text) node.textContent = phrase(binding.text);
    for (const [attr, source] of Object.entries(binding.attrs ?? {})) {
      if (source) node.setAttribute(attr, phrase(source));
    }
  }
}

export function applyLocale(choice?: unknown): void {
  applyDocumentLocale(choice === undefined ? appSettingsStore().value.locale : choice);
  applyShellCopy();
}
