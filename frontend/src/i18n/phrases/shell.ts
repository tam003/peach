import type { PhrasePack } from '../phrase';

export const phrases: PhrasePack = {
  '跳到正文': { en: 'Skip to content', vi: 'Tới nội dung' },
  'Peach · 蜜桃': { en: 'Peach', vi: 'Peach' },
  '蜜桃': { en: 'Peach', vi: 'Đào' },
  '导航与筛选': { en: 'Navigation and filters', vi: 'Điều hướng và bộ lọc' },
  '展开导航与筛选': { en: 'Open navigation and filters', vi: 'Mở điều hướng và bộ lọc' },
  '退出搜索': { en: 'Leave search', vi: 'Thoát tìm kiếm' },
  '搜索馆藏': { en: 'Search the library', vi: 'Tìm trong thư viện' },
  '搜索作品、女优、厂牌或标签': { en: 'Search works, performers, studios, or tags', vi: 'Tìm tác phẩm, diễn viên, hãng, hoặc thẻ' },
  '搜索': { en: 'Search', vi: 'Tìm' },
  '沉浸模式 · 随机连播': { en: 'Immerse · random play', vi: 'Đắm chìm · phát ngẫu nhiên' },
  '进入沉浸模式': { en: 'Enter immerse', vi: 'Vào chế độ đắm chìm' },
  '播放墙': { en: 'Video wall', vi: 'Tường video' },
  '进入播放墙': { en: 'Enter the video wall', vi: 'Vào tường video' },
  '多选（Ctrl 单项，Shift 连续）': { en: 'Select (Ctrl one, Shift a range)', vi: 'Chọn nhiều (Ctrl từng mục, Shift một dải)' },
  '多选模式': { en: 'Select mode', vi: 'Chế độ chọn' },
  '密度：大图 / 密集': { en: 'Density: large / dense', vi: 'Mật độ: lớn / dày' },
  '切换卡片密度': { en: 'Change card density', vi: 'Đổi mật độ thẻ' },
  '设置': { en: 'Settings', vi: 'Cài đặt' },
  '打开设置': { en: 'Open settings', vi: 'Mở cài đặt' },
  '首页': { en: 'Home', vi: 'Trang chủ' },
  '未入库的新作': { en: 'New works not in the library', vi: 'Tác phẩm mới chưa có trong thư viện' },
  'Peach 安装教程': { en: 'Peach setup guide', vi: 'Hướng dẫn cài Peach' },
};

type ShellAttr = 'title' | 'aria-label' | 'placeholder';

export const shellBindings: { selector: string; text?: string; attrs?: Partial<Record<ShellAttr, string>> }[] = [
  { selector: 'a.skiplink', text: '跳到正文' },
  { selector: 'title', text: 'Peach · 蜜桃' },
  { selector: '#brandHome .sub', text: '蜜桃' },
  { selector: '#filterBtn', attrs: { title: '导航与筛选', 'aria-label': '展开导航与筛选' } },
  { selector: '#searchBack', attrs: { title: '退出搜索', 'aria-label': '退出搜索' } },
  { selector: '#q', attrs: { placeholder: '搜索馆藏', 'aria-label': '搜索作品、女优、厂牌或标签' } },
  { selector: '#searchBtn', attrs: { title: '搜索', 'aria-label': '搜索' } },
  { selector: '#immerseBtn', attrs: { title: '沉浸模式 · 随机连播', 'aria-label': '进入沉浸模式' } },
  { selector: '#wallBtn', attrs: { title: '播放墙', 'aria-label': '进入播放墙' } },
  { selector: '#selectMode', attrs: { title: '多选（Ctrl 单项，Shift 连续）', 'aria-label': '多选模式' } },
  { selector: '#density', attrs: { title: '密度：大图 / 密集', 'aria-label': '切换卡片密度' } },
  { selector: '#settingsBtn', attrs: { title: '设置', 'aria-label': '打开设置' } },
  { selector: '[data-page-title]', text: '首页' },
  { selector: '#feedNew', attrs: { 'aria-label': '未入库的新作' } },
  { selector: '#postSetupTutorial', attrs: { 'aria-label': 'Peach 安装教程' } },
];
