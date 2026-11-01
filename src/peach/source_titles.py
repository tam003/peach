"""作品的英文显示标题：从已保存的 r18dev 来源快照里读，不碰账本、不发请求（ADR-0131）。

快照是 `library_processing` 落在 `<sources>/library-metadata/<番号>-r18dev.json` 的那一份。
英文页的标题在 `raw.title`，combined 页另有 `title_en`；只交英文页时顶层 `title` 本身就是英文。
r18dev 的英文标题多是机翻，这里只给显示用，不进 `catalog_title`，也不产生候选。

一个目录一份索引，按文件修改时间增量重读；同一进程里至多每分钟扫一次目录。
"""
from __future__ import annotations

import json
import os
import re
import threading
import time
from pathlib import Path

SUFFIX = "-r18dev.json"
RESCAN_SECONDS = 60.0
#: 含假名或汉字的写法不是英文标题。
_JAPANESE = re.compile(r"[぀-ヿ㐀-鿿]")


def english_title(payload: object) -> str:
    """一份 r18dev 快照里的英文标题；没有就是空串。"""
    if not isinstance(payload, dict):
        return ""
    raw = payload.get("raw") if isinstance(payload.get("raw"), dict) else {}
    combined = payload.get("combined") if isinstance(payload.get("combined"), dict) else {}
    english_page = not payload.get("translations")
    for value in (raw.get("title"), combined.get("title_en"), payload.get("title") if english_page else ""):
        title = " ".join(str(value or "").split())
        if title and not _JAPANESE.search(title):
            return title
    return ""


class EnglishTitles:
    """`{番号: 英文标题}`，按快照目录增量维护。"""

    def __init__(self, root: Path) -> None:
        self.root = Path(root)
        self._files: dict[str, tuple[int, str]] = {}
        self._checked = 0.0
        self._lock = threading.Lock()

    def get(self, code: object) -> str:
        key = str(code or "").strip().upper()
        if not key:
            return ""
        self._refresh()
        found = self._files.get(key)
        return found[1] if found else ""

    def _refresh(self) -> None:
        with self._lock:
            if time.monotonic() - self._checked < RESCAN_SECONDS and self._checked:
                return
            self._checked = time.monotonic()
            seen: set[str] = set()
            try:
                entries = list(os.scandir(self.root))
            except OSError:
                entries = []
            for entry in entries:
                if not entry.name.endswith(SUFFIX) or not entry.is_file():
                    continue
                code = entry.name[:-len(SUFFIX)].upper()
                seen.add(code)
                try:
                    mtime = entry.stat().st_mtime_ns
                except OSError:
                    continue
                if self._files.get(code, (None,))[0] == mtime:
                    continue
                try:
                    payload = json.loads(Path(entry.path).read_text(encoding="utf-8"))
                except (OSError, ValueError):
                    payload = None
                self._files[code] = (mtime, english_title(payload))
            for code in set(self._files) - seen:
                del self._files[code]


_indexes: dict[Path, EnglishTitles] = {}
_indexes_lock = threading.Lock()


def titles_for(root: Path) -> EnglishTitles:
    """同一快照目录在进程里共用一份索引。"""
    with _indexes_lock:
        return _indexes.setdefault(Path(root), EnglishTitles(root))
