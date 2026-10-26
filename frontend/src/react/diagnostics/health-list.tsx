import { useState } from 'react';
import { RiFileListLine } from '@remixicon/react';
import { Button } from '@/components/base/buttons/button';
import { LinkButton } from '@/components/base/buttons/link-button';
import { fmtDur, fmtSize, LOC } from '@peach/legacy/core';
import { DataTable, type DataColumn } from '../components/data-table';
import { EmptyState } from '../components/empty-state';
import { Note } from '../components/note';
import { Disclosure, Stack } from '../settings/section';
import { busyProps, useAction } from '../settings/use-action';
import type { LibraryGroup, LibraryItem } from './diagnostics';
import { phrase } from '../../i18n/phrase';

const identity = (item: LibraryItem) => item.title || item.name || item.code || phrase('作品 #{id}', { id: item.id });
const listText = (items: LibraryItem[]) => [
  [phrase('作品'), phrase('番号'), phrase('文件名'), phrase('媒体库'), phrase('路径'), phrase('时长（秒）'), phrase('大小（字节）')],
  ...items.map(item => [identity(item), item.code ?? '', item.name, phrase(LOC[item.location] || item.location),
    item.path, item.duration ?? '', item.size ?? '']),
].map(row => row.map(value => String(value ?? '').replace(/[\t\r\n]+/g, ' ')).join('\t')).join('\n');

export function HealthList({ group, openItem, receipt }: {
  group: LibraryGroup; openItem(id: number): void; receipt(message: string): void;
}) {
  const action = useAction();
  const [selected, setSelected] = useState<string[]>([]);
  const copy = (items: LibraryItem[]) => void action.run('copy',
    () => navigator.clipboard.writeText(listText(items)), () => receipt(phrase('已复制清单')));
  const columns: DataColumn<LibraryItem>[] = [
    { id: 'title', label: phrase('作品'), value: identity, render: item => <span className="flex min-w-48 max-w-72 flex-col gap-1">
      <LinkButton variant="primary" className="justify-start whitespace-normal text-left"
        onClick={() => openItem(item.id)}>{identity(item)}</LinkButton>
      {item.name && item.name !== identity(item)
        ? <span data-middle-truncate title={item.name} className="block min-w-0 text-caption-1-regular text-text-secondary">{item.name}</span> : null}
    </span> },
    { id: 'code', label: phrase('番号'), value: item => item.code || '',
      render: item => <span className="whitespace-nowrap">{item.code || phrase('未识别')}</span> },
    { id: 'location', label: phrase('媒体库'), value: item => phrase(LOC[item.location] || item.location),
      render: item => phrase(LOC[item.location] || item.location) || phrase('未取得') },
    { id: 'path', label: phrase('文件路径'), value: item => item.path,
      render: item => <span data-middle-truncate title={item.path}
        className="block w-64 text-body-2-regular text-text-secondary">{item.path || phrase('未取得')}</span> },
    { id: 'duration', label: phrase('时长'), value: item => item.duration ?? 0,
      render: item => item.duration && item.duration > 0 ? fmtDur(item.duration) : phrase('未取得') },
    { id: 'size', label: phrase('大小'), value: item => item.size ?? 0,
      render: item => item.size !== null ? fmtSize(item.size) : phrase('未取得') },
  ];
  return <Disclosure summary={`${phrase(group.label)} · ${group.count === null ? phrase('未取得') : phrase('{count} 项', { count: group.count.toLocaleString() })}`}>
    {group.count === null ? <Note tone="neutral">{phrase('清单未取得，请重新检查。')}</Note> : !group.items.length
      ? <EmptyState icon={RiFileListLine} title={phrase('清单为空')} shell="plain">{phrase('没有需要处理的作品。')}</EmptyState>
      : <Stack>
        <div className="flex flex-wrap items-center justify-between gap-2">
          {group.truncated ? <span className="text-body-2-regular text-text-secondary">
            {phrase('已载入')} {group.items.length.toLocaleString()} / {group.count.toLocaleString()} {phrase('项')}
          </span> : null}
          <Button size="small" variant="secondary" {...busyProps(action.busy === 'copy')}
            onClick={() => copy(group.items)}>{phrase('复制当前清单')}</Button>
        </div>
        {action.error ? <Note tone="error">{action.error}</Note> : null}
        <DataTable label={phrase(group.label)} title={phrase('作品清单')} unit={phrase('部作品')} panel={false}
          items={group.items} columns={columns} rowId={item => String(item.id)} rowLabel={identity}
          selected={selected} onSelected={setSelected}
          actions={items => <Button size="small" variant="secondary" {...busyProps(action.busy === 'copy')}
            onClick={() => copy(items)}>{phrase('复制所选')}</Button>} />
      </Stack>}
  </Disclosure>;
}
