/* Preferences domain controller: this domain's state and actions. Startup is installed by Application's lifecycle. */
import { loadMediaSources } from './../query/media-sources';
import { buildBars, dropOfflineFromDefaultLoc, homePath, loadCatalog, paintCatalogFilter, repaintCatalogGrid } from './catalog.js';
import { appSettingsStore } from './../appearance/settings';
import { playUiSound, setUiSoundsEnabled, wireUiSounds } from '../ui-kit/sounds';
import { applyLocale } from './../appearance/locale';
import { applyTheme, watchSystemTheme } from './../appearance/theme';
import { applyAccent, applyGlassFaces, applyHomeGlow, paintHomeGlowNow } from './../appearance/glow';
import { navigationState } from './navigation.js';
import { $, LOC, esc, icon, isCatalogPath } from '../core';
import { peachHistory, shellNavigate } from './../history/index';
import { notifyShell, selectMode, selected, state } from './../shell/index';
import { preferredDirection } from './../sort-preferences';
import { releaseHoverPreviews, setHoverState } from './../card-art/hover';
import { reloadCurrentSurface } from './layout.js';
import { refreshFeedRows, syncFeedAutoScroll } from './feed.js';
import { stageApi } from '../react/application-residents';
import { syncJavImages } from './../jav-artwork';
import { coverAnchor } from './../card-art/framing';
import { mediaState, repaintDetailPoster } from './media.js';
import { updateManagedRoute } from './../history/managed';
import { MEDIA_SOURCE_ICONS, emptyStateHtml, wireHorizontalScroller } from '../ui-kit';
import { tagLabel } from '../core/tags';
import { rereadPlaylists } from './playlists.js';
import { receiptsState } from './receipts.js';
import { dropBars } from './../catalog-bars';
import { applicationEffects } from './effects';
export const preferencesState = { sourceOnline: undefined, sourceProblems: undefined, sourceOffline: undefined, OFFLINE_HINT: undefined, OFFLINE_REASON: undefined, offlineReason: undefined, settingsStore: undefined, appSettings: undefined, saveSettings: undefined, catalogLoadWaiters: undefined, nextCatalogLoad: undefined, handOff: undefined, settingsEffects: undefined, syncGlassOptics: undefined, placeSidebarHead: undefined, SRCICON: undefined, srcBadge: undefined, emptyState: undefined, CENSOR_KEY: undefined };

export async function loadSourceStatus(){
  const effects=applicationEffects;
  try{
    const d=await loadMediaSources(effects.signal);
    if(!effects.isActive)return preferencesState.sourceOnline;
    preferencesState.sourceOnline=Object.fromEntries((d.sources||[]).map(s=>[s.location,s.online]));
    preferencesState.sourceProblems=Object.fromEntries((d.sources||[]).map(s=>[s.location,s.message||'']));
  }catch{if(!effects.isActive)return preferencesState.sourceOnline;preferencesState.sourceOnline={};preferencesState.sourceProblems={}}
  document.body.classList.toggle('offline-source',Object.values(preferencesState.sourceOnline).includes(false));
  dropOfflineFromDefaultLoc();
  return preferencesState.sourceOnline;
}

export function replaceCatalogAddress(){
  const path=navigationState.surfacePath();
  if(!isCatalogPath(path)||path==='/junk-files')return loadCatalog();
  const loading=preferencesState.nextCatalogLoad();
  shellNavigate(homePath(),{replace:true,state:peachHistory.navigation.location.state});
  return loading;
}

export function sidebarDot(loc){
  if(loc==='local')return {kind:'glyph',name:'hard-drive'};
  if(loc==='online')return {kind:'glyph',name:'rss'};
  const mark=MEDIA_SOURCE_ICONS[loc];
  if(mark)return mark.startsWith('data:')?{kind:'image',src:mark}:{kind:'glyph',name:mark};
  // A registered metered source uses its own mark.
  return {kind:'cost',cost:'free'};
}

export function sidebarFacets(facetData,context){
  const rows=(items,named=row=>row.label||tagLabel(row.k))=>(items||[]).map(row=>({value:String(row.k),label:named(row),n:row.n??null}));
  const creators=context.type==='entity'&&context.kind==='creator'
    ?(facetData.creators||[]).filter(row=>row.k!==context.name):facetData.creators;
  return {
    locations:(facetData.locations||[]).map(row=>({value:row.k,label:LOC[row.k]||row.k,n:row.n??null,dot:sidebarDot(row.k),
      ...(preferencesState.sourceOffline(row.k)?{offline:preferencesState.OFFLINE_HINT}:{})})),
    regions:rows(facetData.regions),orientations:rows(facetData.orientations),
    creators:rows(creators),tags:rows(facetData.tags),tech:rows(facetData.tech),
    followTags:rows(facetData.follow_tags,row=>tagLabel(row.k)),
    duration:!!facetData.stats?.duration,
  };
}

export async function refreshAll(automatic=false){
  if(automatic&&(document.hidden||!isCatalogPath(decodeURIComponent(location.pathname))||
      mediaState.stageOpen()||mediaState.immerseOpen()||selectMode||selected.size||document.activeElement===$('#q')))return false;
  if(!$('#stats').hidden){
    /* How a management page refreshes is `refresh` on the route metadata. `reopen` opens itself again.
       `skip` does not take part (the follow page needs the network to repaint, so only its own button can start that).
       A page with no value (stats, data management, resource sync) lands on the stats page. A painted playlist page only rereads (`rereadPlaylists`). Any other page
       rewrites an unclaimed address in place, takes a new page-open number, changes the page element's key so it remounts, and leaves the history length alone. */
    const path=decodeURIComponent(location.pathname),refresh=navigationState.routeMeta(path)?.route.refresh;
    if(refresh==='skip')return;
    if(path==='/playlists'){rereadPlaylists();return}
    const target=refresh==='reopen'?path:'/stats';
    if(target===path)navigationState.navigatePath(location.pathname+location.search+location.hash,true,peachHistory.navigation.location.state);
    else navigationState.navigatePath(target);
    return;
  }
  if(!$('#index').hidden){return}
  state.sort='seed';state.dir='';state.seed=receiptsState.rollSeed();notifyShell();
  // The top three rows (performer portraits, studios, tags) have a 30-second session cache, and refreshAll only reloads the grid.
  // Without clearing those two caches, "another batch" still shows the same people above.
  dropBars();
  /* The grid and the top three rows change together, and they take different amounts of time, so the spinner belongs to this layer. The refresh control waits for this Promise.
     If the grid arrives first, the spinner keeps going while the tag bar is still waiting. The top three rows and the tag bar do not get a skeleton. They
     already have content on screen, and replacing it with gray bars is more jarring than swapping it. They get a shimmer. The skeleton is for a first screen that starts empty. */
  paintCatalogFilter({refreshing:true});
  /* The catalog element starts its fetch in the microtask queued by the address rewrite. After that turn, the grid claims the surface and shows its waiting state, then the top three rows fetch. */
  try{const loading=replaceCatalogAddress();await null;await Promise.all([loading,buildBars()])}
  finally{paintCatalogFilter({refreshing:false})}
  if(!automatic)window.scrollTo({top:0,behavior:'smooth'});
  return true;
}

export function censorOn(){return document.body.classList.contains('censor')}

export function applyCensor(on){
  document.body.classList.toggle('censor',on);
  preferencesState.settingsStore.notify();
}

export function setCensored(on){
  localStorage.setItem(preferencesState.CENSOR_KEY,on?'1':'0');
  applyCensor(on);
  if(on)releaseHoverPreviews();
}

export function setHighContrast(on){
  localStorage.setItem('peach.high-contrast',String(on));
  document.documentElement.classList.toggle('board-high-contrast',on);
  preferencesState.settingsStore.notify();
}

export function wireDrag(el){return wireHorizontalScroller(el,{drag:true})}

export function wireAllDrag(){['#nrow','#count'].forEach(s=>wireDrag($(s)));
  document.querySelectorAll('.tier,.srow').forEach(wireDrag)}

export function immerseStartId(){
  const id=new URLSearchParams(location.search).get('id');
  return /^\d+$/.test(id||'')?Number(id):undefined;
}

export function installPreferences5() {
preferencesState.sourceOnline = {};
preferencesState.sourceProblems = {};
preferencesState.sourceOffline = key=>preferencesState.sourceOnline[key]===false;
preferencesState.OFFLINE_HINT = '媒体目录无法访问，请检查目录、读取权限和网盘挂载状态';
preferencesState.OFFLINE_REASON = {local:'无法读取媒体目录，请检查目录是否存在及读取权限。',
  '115':'无法读取 115 媒体目录，请检查目录权限及网盘挂载工具是否正常运行。',
  pikpak:'无法读取 PikPak 媒体目录，请检查目录权限及网盘挂载工具是否正常运行。'};
preferencesState.offlineReason = key=>preferencesState.sourceProblems[key]||preferencesState.OFFLINE_REASON[key]||'无法读取这个来源的媒体目录，请检查目录权限及挂载状态。';
preferencesState.settingsStore = appSettingsStore();
preferencesState.appSettings = preferencesState.settingsStore.value;
preferencesState.saveSettings = ()=>preferencesState.settingsStore.save();
document.documentElement.style.setProperty('--hover-delay',`${preferencesState.appSettings.hoverDelaySeconds}s`);
setUiSoundsEnabled(preferencesState.appSettings.uiSounds);
wireUiSounds();
applyTheme();
applyLocale();
watchSystemTheme();
paintHomeGlowNow();
applyGlassFaces();
applyAccent();
preferencesState.catalogLoadWaiters = [];
preferencesState.nextCatalogLoad = ()=>new Promise(resolve=>preferencesState.catalogLoadWaiters.push(resolve));
preferencesState.handOff = loading=>{preferencesState.catalogLoadWaiters.splice(0).forEach(resolve=>resolve(loading));return loading};
preferencesState.settingsEffects = {
  theme:()=>applyTheme(),
  locale:()=>applyLocale(),
  /* Turning this on plays the switch sound immediately, so the change is audible. The sound for turning it off comes from the change listener on document.
     That listener runs in the capture phase, before this code, while the switch is still on, so the last sound can still play. */
  uiSounds:()=>{setUiSoundsEnabled(preferencesState.appSettings.uiSounds);if(preferencesState.appSettings.uiSounds)playUiSound('toggle-on')},
  glowFrame:()=>applyHomeGlow(),
  glow:()=>{applyHomeGlow();applyGlassFaces()},
  batchSize:()=>{if(location.pathname==='/')loadCatalog()},
  defaultSort:()=>{
    state.sort=preferencesState.appSettings.defaultSort;
    state.dir=preferredDirection(state.sort,preferencesState.appSettings.defaultSort,preferencesState.appSettings.defaultSortDirection);
    notifyShell();
    if(location.pathname==='/')replaceCatalogAddress();
  },
  sortDirection:()=>{
    state.dir=preferredDirection(state.sort,preferencesState.appSettings.defaultSort,preferencesState.appSettings.defaultSortDirection);
    notifyShell();
    if(location.pathname==='/')replaceCatalogAddress();
  },
  hoverDelay:()=>{
    if(!preferencesState.appSettings.hoverDelaySeconds)document.querySelectorAll('[data-previewing],[data-longhover]')
      .forEach(el=>{setHoverState(el,'previewing',false);setHoverState(el,'longhover',false)});
    document.documentElement.style.setProperty('--hover-delay',`${preferencesState.appSettings.hoverDelaySeconds}s`);
  },
  seekSeconds:()=>repaintCatalogGrid(),
  /* Folding happens while rendering. Without a refetch, cards that were skipped do not appear on their own. */
  groupCollapse:()=>reloadCurrentSurface(),
  feedAutoScroll:()=>syncFeedAutoScroll(),
  feedCompilations:()=>refreshFeedRows(),
  /* The setting says leaving the detail page no longer opens the small window. Leaving an already open small window up would look like the setting did nothing. */
  miniplayer:()=>{if(!preferencesState.appSettings.miniplayer)stageApi()?.closeMiniplayer()},
  javImage:()=>{
    syncJavImages(document,preferencesState.appSettings.javImage);repaintCatalogGrid();
    document.querySelectorAll('img[data-jav-image].cover').forEach(coverAnchor);
    repaintDetailPoster();
  },
  searchHistoryLimit:()=>updateManagedRoute($('#searchMenu'),{historyLimit:preferencesState.appSettings.searchHistoryLimit}),
};
preferencesState.syncGlassOptics = ()=>{};
preferencesState.placeSidebarHead = ()=>{};
preferencesState.SRCICON = {
  ...Object.fromEntries(Object.entries(MEDIA_SOURCE_ICONS).map(([location,mark])=>
    [location,mark.startsWith('data:')?`<img class="source-icon" src="${mark}" alt="">`:icon(mark)])),
  online:icon('rss'),
};
preferencesState.srcBadge = (loc,cost,cls)=>{const label=`${LOC[loc]||loc}${cost==='metered'?' · 计费':''}`;
  return `<span class="${cls||'src'} ${cost==='metered'?'metered':'free'}" title="${esc(label)}" aria-label="${esc(label)}">`
    +(preferencesState.SRCICON[loc]||'')+'</span>'};
preferencesState.emptyState = emptyStateHtml;
}

export function installPreferences23() {
preferencesState.CENSOR_KEY = 'peach-censor';
applyCensor(localStorage.getItem(preferencesState.CENSOR_KEY)==='1');
}
