/* Screen text that reaches the page without passing through `phrase()`: a server message, a constant
 * written straight into a template, a label stored in a data table. Outside `zh`, every text node and
 * readable attribute whose whole value is a sentence in the phrase table shows the current language.
 * Only whole values are replaced, so a title, a name or a path that merely contains Chinese stays as written. */
import { translateScreenText } from './phrase';
import { getLocale, subscribeLocale } from './translate';

const HAN = /[一-鿿]/;
const ATTRIBUTES = ['title', 'placeholder', 'aria-label', 'aria-description', 'alt', 'data-tooltip'];
const SKIP = 'script,style,textarea,code,pre,[contenteditable="true"],[translate="no"]';

/* What each node said before it was translated, so switching back to Chinese restores it. */
const sourceText = new WeakMap<Text, string>();
const sourceAttributes = new WeakMap<Element, Map<string, string>>();
const written = new WeakMap<Node, string>();

function translated(value: string): string | null {
  if (!HAN.test(value)) return null;
  const trimmed = value.trim();
  const line = translateScreenText(trimmed);
  if (line === null || line === trimmed) return null;
  const start = value.indexOf(trimmed);
  return value.slice(0, start) + line + value.slice(start + trimmed.length);
}

function textNode(node: Text): void {
  const value = node.nodeValue ?? '';
  if (written.get(node) === value) return;
  const parent = node.parentElement;
  if (!parent || parent.closest(SKIP)) return;
  const line = translated(value);
  if (line === null) return;
  sourceText.set(node, value);
  written.set(node, line);
  node.nodeValue = line;
}

function attribute(element: Element, name: string): void {
  const value = element.getAttribute(name);
  if (!value || !HAN.test(value) || element.closest(SKIP)) return;
  const line = translated(value);
  if (line === null) return;
  let sources = sourceAttributes.get(element);
  if (!sources) sourceAttributes.set(element, sources = new Map());
  sources.set(name, value);
  element.setAttribute(name, line);
}

function element(root: Element): void {
  for (const name of ATTRIBUTES) if (root.hasAttribute(name)) attribute(root, name);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (node.nodeType === Node.TEXT_NODE) textNode(node as Text);
    else for (const name of ATTRIBUTES) if ((node as Element).hasAttribute(name)) attribute(node as Element, name);
  }
}

function restore(root: Element): void {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  for (let node: Node | null = root; node; node = walker.nextNode()) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node as Text;
      const source = sourceText.get(text);
      if (source !== undefined && written.get(text) === text.nodeValue) text.nodeValue = source;
      written.delete(text);
      continue;
    }
    const sources = sourceAttributes.get(node as Element);
    if (!sources) continue;
    for (const [name, value] of sources) (node as Element).setAttribute(name, value);
    sourceAttributes.delete(node as Element);
  }
}

let observer: MutationObserver | null = null;

function onMutations(records: MutationRecord[]): void {
  if (getLocale() === 'zh') return;
  for (const record of records) {
    if (record.type === 'characterData') textNode(record.target as Text);
    else if (record.type === 'attributes' && record.attributeName) attribute(record.target as Element, record.attributeName);
    else for (const node of record.addedNodes) {
      if (node.nodeType === Node.TEXT_NODE) textNode(node as Text);
      else if (node.nodeType === Node.ELEMENT_NODE) element(node as Element);
    }
  }
}

function sync(): void {
  const root = document.documentElement;
  if (getLocale() === 'zh') restore(root);
  else element(root);
}

/** Start once per page. Safe to call again. */
export function installScreenTranslation(): void {
  if (observer || typeof MutationObserver === 'undefined' || typeof document === 'undefined') return;
  observer = new MutationObserver(onMutations);
  observer.observe(document.documentElement, {
    subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRIBUTES,
  });
  subscribeLocale(sync);
  sync();
}
