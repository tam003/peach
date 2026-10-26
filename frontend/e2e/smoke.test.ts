/* Invariants every main route must hold on desktop and at 390×844.
 *
 * These are the geometry and runtime facts the interface check repeats every round. Once they are cases, the test entry runs them.
 * The browser panel is kept for a new layout's first shape and for looking at it. A new problem of the same kind gets a case here before the fix.
 *
 * Each route waits for its own body, then settle, then the geometry. Errors, failed requests, horizontal overflow, and a waiting state
 * all hold when the page never rendered, so a blank screen would pass without a body. The body is written for the demo library from `tests/test_web_e2e.py`:
 * 12 videos, no playlists, follow sources, or task records. Those pages wait for their own empty state.
 * Performer, studio, and tag indexes can go from empty to filled in one round: an earlier route that opened a work makes entries appear,
 * so an index body is "an entry or an empty state", not one of the two. A title only identifies the page. It is not the body by itself:
 * a management page's `[data-manage-title]` is written by the shell first, and it is still there when the content area fails.
 *
 * Section tabs (`.ui-board-local-nav`) show only the current cell. The other panels do not take part in layout. Each cell is selected
 * and measured, or a configuration section that is not on the first screen, such as network and access, would never be measured. */
import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';

import type { Browser, Locator, Page } from 'playwright-core';

import { configurationBody, expectBody, layout, launch, requiredEnv, settle, visit, VIEWPORTS } from './harness.ts';
import { mockJavDetail } from './jav-detail-fixture.ts';

interface Route {
  path: string;
  /** The target page body. Every locator must be visible. A skeleton placeholder title has `aria-hidden`, so a role query does not find it. */
  body(page: Page): Locator[];
}

const heading = (page: Page, scope: string, name: string): Locator =>
  page.locator(scope).getByRole('heading', { name, exact: true });

const DESKTOP = VIEWPORTS.find((viewport) => !viewport.mobile)!;

/** An index entry (`data-k`) or a definite empty state, whichever appears first. Both are painted only by the React tree.
 * The shell skeleton has neither. The selector includes `:visible`. Otherwise `.first()` can land on a hidden
 * match, waiting for it to be visible times out, and the body was already painted. */
const indexEntries = (page: Page): Locator =>
  page.locator('#index [data-k]:visible, #index [data-empty-state]:visible').first();

/** The sign that the stats page has painted: four reading cards that are also tabs. The first is the library. The name also carries the count and the size, so the match is a prefix. */
const statsInventoryTab = (page: Page): Locator =>
  page.locator('#stats').getByRole('tab', { name: /^馆藏视频/ });

const ROUTES: readonly Route[] = [
  { path: '/works/EXM-001', body: page => [page.locator('#stage [data-jav-detail] h1'), page.getByRole('img', { name: 'EXM-001 封面', exact: true })] },
  { path: '/jav', body: page => [heading(page, '#javLibraryHeader', 'JAV'), page.getByRole('tab', { name: '馆藏', exact: true, selected: true }), page.locator('#grid [data-media-card]:visible, #grid [data-media-empty]:visible').first()] },
  { path: '/jav?tab=discover', body: page => [heading(page, '#stats', 'JAV'), page.getByRole('tab', { name: '发现', exact: true, selected: true }), page.getByText('暂无匹配口味的作品', { exact: true })] },
  { path: '/jav?tab=wants', body: page => [heading(page, '#stats', 'JAV'), page.getByRole('tab', { name: '想要', exact: true, selected: true }), page.getByText('还没有想要的作品', { exact: true })] },
  { path: '/', body: (page) => [page.locator('#grid [data-media-card]').first()] },
  { path: '/wall', body: (page) => [page.locator('[data-wall-tile]').first(), page.getByRole('button', { name: 'Leave the video wall' })] },
  { path: '/performers', body: (page) => [heading(page, '#index', '艺人'), indexEntries(page)] },
  { path: '/creators', body: (page) => [heading(page, '#index', '卖家'), indexEntries(page)] },
  { path: '/creators/', body: (page) => [heading(page, '#index', '卖家'), indexEntries(page)] },
  { path: '/performers?category=animation', body: (page) => [heading(page, '#index', '艺人'), indexEntries(page)] },
  { path: '/studios', body: (page) => [heading(page, '#index', '厂牌'), indexEntries(page)] },
  { path: '/agencies', body: (page) => [heading(page, '#index', '事务所'), indexEntries(page)] },
  { path: '/tags', body: (page) => [heading(page, '#index', '标签'), indexEntries(page)] },
  {
    path: '/playlists',
    body: (page) => [heading(page, '#stats', '播放列表'), heading(page, '#stats', '还没有播放列表')],
  },
  {
    path: '/follow',
    body: (page) => [heading(page, '#stats', '关注'), heading(page, '#stats', '还没有关注任何来源')],
  },
  {
    // The skeleton also has the follow-list segments, and the whole block can carry `aria-hidden`. A tab found by role is only the real page.
    path: '/subscriptions',
    body: (page) => [heading(page, '#main', '关注管理'),
      page.locator('#stats').getByRole('tab', { name: '添加关注', exact: true })],
  },
  {
    // The feed tab is opened by the address. The demo library has no feeds, so the wait is that section's footer button.
    path: '/subscriptions?tab=feeds',
    body: (page) => [page.locator('#stats').getByRole('tab', { name: 'JAV 订阅源', exact: true, selected: true }),
      page.locator('#stats').getByRole('button', { name: '立即拉取', exact: true })],
  },
  {
    // The skeleton's metric strip also says the library-video label, so it does not show that painting finished. Only the real page makes the four reading cards into tabs.
    path: '/stats',
    body: (page) => [heading(page, '#main', '统计'), statsInventoryTab(page)],
  },
  {
    // The skeleton's metric strip also says the history label, so it does not show that painting finished. Only the real page makes the two evidence sets into tabs.
    path: '/taste',
    body: (page) => [heading(page, '#main', '口味'),
      page.locator('#stats').getByRole('tab', { name: '浏览器记录', exact: true })],
  },
  {
    // The skeleton's category column also says the review-category label, so it does not show that painting finished. Only the real page makes the ten categories into tabs.
    path: '/review',
    body: (page) => [heading(page, '#main', '人工复核'),
      page.locator('#stats').getByRole('tab', { name: '元数据字段' })],
  },
  {
    path: '/data-cleanup',
    // The legacy skeleton before mount uses a heading. The final React card uses a named section. Waiting for that final name is what shows the mount finished.
    body: (page) => [heading(page, '#main', '数据管理'),
      page.locator('#stats section[aria-label="扫描与采集"]'),
      page.locator('#stats section[aria-label="媒体修复"]')],
  },
  {
    // The demo library has no junk candidates, so the wait is the empty-state title of the junk queue. The shell skeleton only has card placeholders.
    path: '/junk-files',
    body: (page) => [heading(page, '#main', '垃圾文件'), heading(page, '#grid', '没有待判断的垃圾文件')],
  },
  {
    // The skeleton only says the comparison is running. The summary cell for duplicate content is painted whether or not groups exist, and only the real page has it.
    path: '/duplicates',
    body: (page) => [heading(page, '#main', '重复文件'), page.locator('#stats').getByText('重复内容', { exact: true })],
  },
  {
    // The old direct address lands on the data-management anchor. That block in the skeleton has no `id`. The id is only on the real card after the demo library has a root.
    path: '/resource-sync',
    body: (page) => [heading(page, '#main', '数据管理'), page.locator('#stats section#resource-sync')],
  },
  {
    path: '/quality-goals',
    // The demo library has no marked targets, so the wait is the empty-state sentence. It is a real heading element, not a stretch of text.
    body: (page) => [heading(page, '#main', '高清版'), heading(page, '#stats', '没有标记中的高清版目标')],
  },
  {
    // The legacy skeleton also has the sentence about high-resolution pictures maybe needing a proxy, so it does not show that painting finished. The high-resolution cover form is only on the real page.
    path: '/sources',
    body: (page) => [heading(page, '#main', '来源和凭证'), page.locator('#stats form[aria-label="高清封面"]')],
  },
  // A name that matches no agency becomes the empty state. The skeleton staying in place would read as still loading.
  { path: '/agencies/不存在的事务所', body: (page) => [heading(page, '#index', '找不到这个事务所')] },
  { path: '/settings/library', body: configurationBody },
  { path: '/diagnostics', body: page => [page.getByRole('tab', { name: 'Diagnostics', selected: true }), page.locator('#stats section[aria-label="库健康"]')] },
  { path: '/settings/diagnostics', body: page => [page.getByRole('tab', { name: 'Diagnostics', selected: true }), page.locator('#stats section[aria-label="库健康"]')] },
  { path: '/tasks', body: (page) => [heading(page, '#main', '任务中心'), heading(page, '#stats', '还没有任务记录')] },
  ...['', '/appearance', '/playback', '/jav', '/search', '/content'].map(section => ({ path: '/settings' + section,
    body: (page: Page) => [page.getByRole('dialog', { name: /Appearance and navigation|Browse and playback|JAV and new works|Search and recommendations|Content display/ })] })),
  ...['subscriptions', 'downloads', 'network', 'maintenance'].map(section => ({ path: `/settings/${section}`, body: configurationBody })),
  {
    path: `/assets/${requiredEnv('PEACH_E2E_ITEM')}`,
    body: (page) => {
      const stage = page.getByRole('dialog', { name: 'Work details' });
      return [stage, stage.locator('video.vjs-tech')];
    },
  },
];

async function assertHolds(page: Page, problems: string[], where: string): Promise<void> {
  assert.deepEqual(problems, [], `${where}：页面报错或有失败请求`);
  const box = await layout(page);
  assert.ok(box.scrollWidth <= box.viewportWidth,
    `${where}：横向溢出，scrollWidth ${box.scrollWidth} > 视口 ${box.viewportWidth}`);
  assert.deepEqual(box.offenders, [], `${where}：有元素越出视口右边缘`);
  if (where === '/') {
    const images = await page.locator('img[loading="lazy"]').evaluateAll(nodes => ({
      count: nodes.length,
      missing: nodes.filter(node => !(Number(node.getAttribute('width')) > 0 && Number(node.getAttribute('height')) > 0))
        .map(node => node.getAttribute('src')),
    }));
    assert.ok(images.count > 0, '首页没有懒加载图片');
    assert.deepEqual(images.missing, [], '首页懒加载图片需要声明尺寸');
  }
}

describe('路由冒烟', () => {
  let browser: Browser;

  before(async () => {
    browser = await launch();
  });

  after(async () => {
    await browser.close();
  });

  for (const viewport of VIEWPORTS) {
    for (const route of ROUTES) {
      // One case's timeout is far shorter than the whole Python round. A stuck case reports its own name and does not stall the round's output.
      it(`${route.path} @ ${viewport.name}`, { timeout: 60_000 }, async () => {
        const opened = await visit(browser, route.path.startsWith('/works/') ? '/stats' : route.path, viewport);
        try {
          if (route.path.startsWith('/works/')) {
            await mockJavDetail(opened.page);
            await opened.page.goto(requiredEnv('PEACH_E2E_ORIGIN') + route.path);
          }
          await expectBody(opened.page, route.path, route.body(opened.page));
          await settle(opened.page);
          await assertHolds(opened.page, opened.problems, route.path);
          // The settings overlay's tab row stays in the DOM and is invisible while closed. Only click the row that is visible on the page.
          const tabs = opened.page.locator('.ui-board-local-nav [role="tab"]:visible');
          const count = await tabs.count();
          // If the selector matches nothing, the loop runs zero cells and still passes. The configuration page has at least the media, network and access, and maintenance cells.
          if (route.path === '/settings/library') assert.ok(count >= 3, `配置页只看到 ${count} 个分区 tab`);
          for (let index = 0; index < count; index += 1) {
            const tab = tabs.nth(index);
            const name = (await tab.textContent())?.trim() || `第 ${index + 1} 格`;
            await tab.click({ timeout: 5_000 });
            await settle(opened.page);
            assert.equal(await tab.getAttribute('aria-selected'), 'true', `${route.path}「${name}」点了没有选中`);
            await assertHolds(opened.page, opened.problems, `${route.path}「${name}」`);
          }
        } finally {
          await opened.close();
        }
      });
    }
  }

  /* A React page fetches for itself. Polling lives with that root, not with a generation in the legacy layer. When the legacy layer changes pages,
     most management pages assign `innerHTML` directly. The root can leave the document and still be alive. This case watches whether it was unmounted.
     Page changes go through pushState and popstate. Sidebar buttons, the drawer, and the browser back button all end on that path. */
  it('离开活动页之后轮询停下，回到这一页又接上', { timeout: 120_000 }, async () => {
    const opened = await visit(browser, '/tasks', DESKTOP);
    try {
      const polls: string[] = [];
      opened.page.on('request', (request) => {
        if (request.url().includes('/api/tasks')) polls.push(request.url());
      });
      const waitForPolls = async (least: number, what: string) => {
        for (let step = 0; step < 80; step += 1) {
          if (polls.length >= least) return;
          await opened.page.waitForTimeout(250);
        }
        assert.ok(polls.length >= least, `${what}：只看到 ${polls.length} 次 /api/tasks，要 ${least} 次`);
      };
      await expectBody(opened.page, '/tasks',
        [heading(opened.page, '#stats', '还没有任务记录')]);
      // Confirm the poll is actually running. Otherwise "it stopped" also holds when it never started.
      await waitForPolls(2, '活动页的轮询没有跑起来');

      await opened.page.evaluate(() => {
        history.pushState({}, '', '/stats');
        window.dispatchEvent(new PopStateEvent('popstate'));
      });
      await expectBody(opened.page, '/stats', [statsInventoryTab(opened.page)]);
      await settle(opened.page);
      const stopped = polls.length;
      // The stats page is a React page too. The management body should have only that root left. The activity page's root leaves with its poll.
      assert.equal(await opened.page.locator('#stats .peach-react').count(), 1,
        '管理区正文里不是只剩统计页那一棵 React 根');
      assert.equal(
        await opened.page.locator('#stats').getByRole('heading', { name: '还没有任务记录' }).count(), 0,
        '换页之后活动页的 React 根还留在管理区正文里');
      await opened.page.waitForTimeout(3_000);
      assert.equal(polls.length, stopped, '离开活动页之后 /api/tasks 还在轮询');

      await opened.page.goBack();
      await expectBody(opened.page, '/tasks',
        [heading(opened.page, '#stats', '还没有任务记录')]);
      await waitForPolls(stopped + 2, '回到活动页之后轮询没有接上');
      await assertHolds(opened.page, opened.problems, '/activity 换页往返');
    } finally {
      await opened.close();
    }
  });

  /* The new-works row on the home page belongs only to the catalog. Going from home to stats hides and clears it. A fetch that has not returned
     must not paint the row onto a management page after the user has left. The demo library has no subscriptions. The intercepted API supplies one new work. */
  it('离开首页之后新作那一行收起，晚到的取数也不画回来', { timeout: 60_000 }, async () => {
    const opened = await visit(browser, '/stats', DESKTOP);
    try {
      let hold: Promise<void> | null = null;
      let served = 0;
      await opened.page.route(/\/api\/feeds\/discoveries\?/, async (route) => {
        if (hold) await hold;
        // The request may already have been cancelled with the page change, and fulfilling it then throws. What matters is the page after the response.
        await route.fulfill({ json: { ok: true, more: false, items: [{
          id: 1, code: 'MCSR-191', title: 'MCSR-191 示例作品', link: null, cover_url: null,
          has_cover: false, cover_frame: null, poster_box: null, release_date: '2025-07-19',
          studio: null, performers: null, read: false, ignored: false, scrape_error: null,
        }] } }).catch(() => undefined);
        served += 1;
      });
      const go = (path: string) => opened.page.evaluate((target) => {
        history.pushState({}, '', target);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }, path);
      const feedCards = opened.page.locator('#feedNew article.feednewcard');
      await expectBody(opened.page, '/stats', [statsInventoryTab(opened.page)]);

      await go('/');
      await expectBody(opened.page, '/', [feedCards.first()]);
      await go('/stats');
      await expectBody(opened.page, '/stats', [statsInventoryTab(opened.page)]);
      assert.equal(await opened.page.locator('#feedNew').isHidden(), true, '进统计页之后新作那一行还露着');
      assert.equal(await feedCards.count(), 0, '进统计页之后新作那一行没有清空');

      await go('/');
      await expectBody(opened.page, '/', [feedCards.first()]);
      await go('/junk-files');
      await opened.page.locator('#count [data-junk-filters]').waitFor();
      assert.equal(await opened.page.locator('#feedNew').isHidden(), true, '垃圾文件页不展示订阅新作');
      assert.equal(await feedCards.count(), 0);

      for (const target of ['/stats', '/junk-files']) {
        let release!: () => void;
        hold = new Promise((resolve) => { release = resolve; });
        const asked = opened.page.waitForRequest(/\/api\/feeds\/discoveries\?/);
        await go('/');
        await asked;
        await go(target);
        const body = target === '/stats' ? statsInventoryTab(opened.page) : opened.page.locator('#count [data-junk-filters]');
        await expectBody(opened.page, target, [body]);
        const before = served;
        release();
        for (let step = 0; step < 40 && served === before; step += 1) await opened.page.waitForTimeout(100);
        assert.ok(served > before, '压住的那一次新作取数没有放行');
        // After the response the page has one synchronous repaint left. An old loading state in the catalog does not belong to the current page.
        await opened.page.waitForTimeout(500);
        assert.equal(await feedCards.count(), 0, `晚到的新作取数画到了 ${target} 上`);
        await assertHolds(opened.page, opened.problems, `首页与 ${target} 往返`);
      }
    } finally {
      await opened.close();
    }
  });

  /* A new work that is not on this machine has only the sleeve address from the source, and no sidecar. Flush to the right edge, a 0.75 card is wider than the front cover
     and pulls in a spine on the left. Measuring back from the right edge at the front-cover ratio 0.704 leaves only the front cover. */
  it('远程封套按正封先验比例切，不带进书脊', { timeout: 60_000 }, async () => {
    const opened = await visit(browser, '/stats', DESKTOP);
    try {
      const remote = 'https://covers.example.test/sleeve.svg';
      await opened.page.route(remote, (route) => route.fulfill({
        contentType: 'image/svg+xml',
        body: '<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="1000">'
          + '<rect width="1500" height="1000" fill="#888"/></svg>',
      }));
      await opened.page.route(/\/api\/feeds\/discoveries\?/, (route) => route.fulfill({ json: {
        ok: true, more: false, items: [{
          id: 1, code: 'ABF-348', title: 'ABF-348 示例作品', link: null, cover_url: remote,
          has_cover: false, cover_frame: null, poster_box: null, release_date: '2026-09-30',
          studio: null, performers: null, read: false, ignored: false, scrape_error: null,
        }] } }));
      await opened.page.evaluate(() => {
        history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
      });
      const cover = opened.page.locator('#feedNew img.cover.panel');
      await expectBody(opened.page, '/', [cover]);
      // A 1500×1000 sleeve. The front cover is 704 wide and its left edge is column 796: clip 53.07% off the left and leave the right edge.
      assert.equal(await cover.evaluate((img) => img.style.getPropertyValue('--panel-clip')),
        '0% 0% 0% 53.07%');
    } finally {
      await opened.close();
    }
  });

  /* When the latest cover fetch dies on the connection and the row still has cards without covers, a Note above the row points at the source page.
     A row of missing covers does not say whether the publisher has no cover or the line is down. */
  it('封面连不上图片主机时新作那一行上方指去配连接方式', { timeout: 60_000 }, async () => {
    const opened = await visit(browser, '/stats', DESKTOP);
    try {
      await opened.page.route(/\/api\/feeds\/discoveries\?/, (route) => route.fulfill({ json: {
        ok: true, more: false, cover_network: 3, items: [{
          id: 1, code: 'MCSR-191', title: 'MCSR-191 示例作品', link: null, cover_url: null,
          has_cover: false, cover_frame: null, poster_box: null, release_date: '2025-07-19',
          studio: null, performers: null, read: false, ignored: false, scrape_error: null,
        }] } }));
      await opened.page.evaluate(() => {
        history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
      });
      const note = opened.page.locator('#feedNew .feednetwork');
      await expectBody(opened.page, '/', [note]);
      assert.match(await note.innerText(), /3 部新作的封面连不上 DMM 图片主机/);
      assert.equal(await note.locator('a').getAttribute('href'), '/sources');
      await assertHolds(opened.page, opened.problems, '新作连不上图片主机的提示');
    } finally {
      await opened.close();
    }
  });
});
