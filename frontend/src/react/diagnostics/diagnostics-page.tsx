import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/base/buttons/button';
import { Chip } from '@/components/base/badges/chip';
import { SettingsCard, SettingsSectionLabel } from '@/components/application/settings/settings-rows';
import { cx } from '@/utils/cx';
import { errorMessage } from '../../api';
import { diagnosticsSkeleton } from '../../diagnostics-skeleton';
import { ErrorExcerpt } from '../activity/error-excerpt';
import { Note } from '../components/note';
import { SiteMark } from '../components/site-mark';
import { Disclosure, Fact, FactList, Section, Stack } from '../settings/section';
import { busyProps, useAction } from '../settings/use-action';
import { DIAGNOSTICS_KEY, fetchDiagnostics, type DiagnosticCheck } from './diagnostics';
import { HealthList } from './health-list';
import { phrase } from '../../i18n/phrase';

const STATUS: Record<string, string> = { get ['ok']() { return phrase('正常'); }, get ['warning']() { return phrase('需检查'); }, get ['failed']() { return phrase('需处理'); }, get ['unknown']() { return phrase('未取得'); }, get ['disabled']() { return phrase('未配置'); },
  get ['stale']() { return phrase('待复查'); }, get ['unchecked']() { return phrase('尚无记录'); } };
const TARGET_LABELS: Record<string, string> = {
  get ['/settings/network']() { return phrase('打开网络与访问'); }, get ['/settings/maintenance']() { return phrase('打开维护与更新'); }, get ['/tasks']() { return phrase('查看任务'); },
};
const SECTIONS = () => ([
  [phrase('媒体库与挂载'), ['media_mounts', 'data_root']],
  [phrase('数据库与迁移'), ['database', 'schema']],
  [phrase('工具'), ['ffmpeg']],
  [phrase('配置与访问'), ['configured', 'security', 'port', 'version']],
  [phrase('后台任务'), ['tasks']],
] as const);
const moment = (value: string) => new Date(value).toLocaleString();

export function formatDiagnosticReason(reason: string): string {
  if (!reason) return '';
  const translated = phrase(reason);
  if (translated !== reason) return translated;
  if (reason.includes('；')) {
    return reason.split('；').map(part => formatDiagnosticReason(part)).join('; ');
  }
  if (reason.includes('：')) {
    const colonIndex = reason.indexOf('：');
    const prefix = reason.slice(0, colonIndex);
    const suffix = reason.slice(colonIndex + 1);
    const translatedPrefix = phrase(prefix);
    const translatedSuffix = phrase(suffix);
    const formattedSuffix = translatedSuffix !== suffix ? translatedSuffix : suffix.replace(/、/g, ', ');
    return `${translatedPrefix}: ${formattedSuffix}`;
  }
  return phrase(reason);
}

function DiagnosticStatus({ status }: { status: string }) {
  return <Chip variant="caption" data-diagnostic-status={status}
    color={status === 'failed' ? 'rose' : status === 'warning' || status === 'stale' ? 'yellow' : 'neutral'}>
    {STATUS[status] ?? phrase('未取得')}
  </Chip>;
}

export interface DiagnosticsProps {
  navigate(path: string): void; configure(section: string): void; openItem(id: number): void;
  receipt(message: string): void;
}

function DownloadReport() {
  const action = useAction();
  const download = () => void action.run('download', async () => {
    const response = await fetch('/api/diagnostics/bundle', { credentials: 'same-origin' });
    if (!response.ok) throw new Error(phrase('诊断报告下载失败（HTTP {status}）', { status: response.status }));
    const url = URL.createObjectURL(await response.blob());
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = 'peach-support.zip';
    document.body.append(anchor);
    try { anchor.click() } finally {
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  }, () => {}, cause => action.setError(cause instanceof Error ? cause.message : phrase('诊断报告下载失败（HTTP {status}）', { status: 500 })));
  return <div className="flex flex-col items-end gap-2">
    <Button variant="secondary" onClick={download} {...busyProps(action.busy === 'download')}>{phrase('下载诊断报告')}</Button>
    {action.error ? <Note tone="error">{action.error}</Note> : null}
  </div>;
}

function Check({ name, check, navigate, configure, compact = false }: Pick<DiagnosticsProps, 'navigate' | 'configure'> & {
  name: string; check: DiagnosticCheck; compact?: boolean;
}) {
  const section = name === 'security' || name === 'port' ? '网络与访问' : '媒体库与入库';
  const Heading = compact ? 'h4' : 'h3';
  return <div data-diagnostic-check={name} className={cx('flex flex-col gap-4 border-b border-separator-border pr-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between', compact ? 'py-3' : 'py-5')}>
    <div className={cx('flex min-w-0 flex-1 flex-col', compact ? 'gap-1' : 'gap-2')}>
      <div className="flex flex-wrap items-center gap-3">
        <Heading className={cx('text-text-primary', compact ? 'text-body-2-medium' : 'text-body-medium')}>{phrase(check.label)}</Heading>
        <DiagnosticStatus status={check.status} />
      </div>
      <p data-check-reason className={cx('text-body-2-regular break-words', compact ? 'text-text-secondary' : 'text-text-primary')}>{formatDiagnosticReason(check.reason)}</p>
      {check.action ? <p className="text-body-2-regular text-text-secondary">{phrase('处理建议：')}{phrase(check.action)}</p> : null}
    </div>
    {check.target ? <div className="shrink-0 self-end sm:self-auto"><Button size="small" variant="secondary" onClick={() => check.target === '/settings/library'
      ? configure(section) : navigate(check.target!)}>{check.target === '/settings/library'
        ? phrase(section === '网络与访问' ? '打开网络与访问' : '打开媒体库与入库') : TARGET_LABELS[check.target] ?? phrase('打开相关页面')}</Button></div> : null}
  </div>;
}

export function DiagnosticsPage(props: DiagnosticsProps) {
  const query = useQuery({ queryKey: DIAGNOSTICS_KEY, queryFn: ({ signal }) => fetchDiagnostics(signal), staleTime: 10_000 });
  const action = useAction();
  const [refreshError, setRefreshError] = useState('');
  const refresh = () => void action.run('refresh', async () => {
    const response = await query.refetch();
    if (response.error) throw response.error;
    return response.data;
  }, () => setRefreshError(''), cause => setRefreshError(errorMessage(cause)));
  const data = query.data;
  if (!data && query.isPending) return <div role="status" aria-label={phrase('正在读取系统诊断')} dangerouslySetInnerHTML={{ __html: diagnosticsSkeleton() }} />;
  if (!data) return <div className="ui-configpage"><DownloadReport /><Note tone="error" title={phrase('诊断读取失败')}
    action={<Button variant="secondary" onClick={refresh} {...busyProps(action.busy === 'refresh')}>{phrase('重新检查')}</Button>}>
    {query.error ? errorMessage(query.error) : phrase('诊断报告未取得。')}
  </Note></div>;
  const attention = Object.entries(data.checks).filter(([, check]) => ['warning', 'failed', 'unknown'].includes(check.status));
  const other = Object.entries(data.checks).filter(([, check]) => !['warning', 'failed', 'unknown'].includes(check.status));
  return <div className="flex min-w-0 flex-col gap-6">
    <div className="flex flex-wrap justify-end gap-2"><DownloadReport />
      <Button variant="secondary" onClick={refresh} {...busyProps(action.busy === 'refresh')}>{phrase('重新检查')}</Button></div>
    {refreshError ? <Note tone="error">{refreshError}</Note> : null}
    {attention.length ? <Section title={phrase('需要关注 · {length} 项', { length: attention.length })}>
      {attention.map(([key, check]) => <Check key={key} name={key} check={check} {...props} />)}
    </Section> : null}
    <Section title={phrase('库健康')}><Stack>
      {data.library.issue_at ? <p className="text-body-2-regular text-text-secondary">{phrase('处理记录 ·')} {moment(data.library.issue_at)}</p> : null}
      {Object.entries(data.library.groups).map(([key, group]) => <HealthList key={key} group={group} {...props} />)}
    </Stack></Section>
    {other.length ? <section aria-label={phrase('系统检查')}>
      <Disclosure summary={phrase('其他检查 · {length} 项', { length: other.length })} contentClassName="gap-5">
        {SECTIONS().map(([title, keys]) => {
          const rows = other.filter(([key]) => keys.some(name => name === key));
          return rows.length ? <section key={title} aria-label={title} data-diagnostic-group="" className="flex min-w-0 flex-col gap-2">
            <h3 className="flex items-center gap-2 px-3 text-body-medium text-text-primary">{title}
              <span className="text-caption-1-regular text-text-secondary">{rows.length} {phrase('项')}</span>
            </h3>
            <SettingsCard>{rows.map(([key, check]) => <Check key={key} name={key} check={check} compact {...props} />)}</SettingsCard>
          </section> : null;
        })}
      </Disclosure>
    </section> : null}
    <section aria-label={phrase('来源会话')} className="flex min-w-0 flex-col gap-3">
      <SettingsSectionLabel>{phrase('来源会话')}</SettingsSectionLabel>
      {data.sources.map(source => <article key={source.source} data-diagnostic-source={source.source}>
        <SettingsCard><Stack>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="flex min-w-0 items-center gap-2 text-body-medium text-text-primary"><SiteMark source={source.source} />{phrase(source.label)}</h3>
          <DiagnosticStatus status={source.status} />
        </div>
        {/* 原因常是整段堆栈：平时只露异常那一行，全文收在「查看详情」后面。 */}
        <ErrorExcerpt text={formatDiagnosticReason(source.reason)} className="text-body-regular text-text-primary" />
        <FactList>
          <Fact term={phrase('上次解析成功')}>{source.last_success_at ? moment(source.last_success_at) : phrase('尚无成功记录')}</Fact>
          {source.last_check_at ? <Fact term={phrase('上次检查')}>{moment(source.last_check_at)}
            {source.elapsed_s !== undefined && source.elapsed_s !== null ? phrase(' · {elapsed_s} 秒', { elapsed_s: source.elapsed_s.toFixed(2) }) : ''}</Fact> : null}
          <Fact term={phrase('冷却截止')}>{source.cooldown_until ? moment(source.cooldown_until) : phrase('未在冷却')}</Fact>
        </FactList>
        </Stack></SettingsCard>
      </article>)}
      <div><Button size="small" variant="secondary" onClick={() => props.navigate('/sources')}>{phrase('打开来源和凭证')}</Button></div>
    </section>
  </div>;
}
