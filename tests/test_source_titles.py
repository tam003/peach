"""作品的英文显示标题从 r18dev 快照读出，快照改了、删了，索引跟着变（ADR-0115）。"""
import json
import os
import tempfile
import unittest
from pathlib import Path

from peach import source_titles


class EnglishTitleTests(unittest.TestCase):
    def test_the_english_page_title_wins_and_japanese_text_never_counts(self):
        payload = {"title": "美人妻の誘惑", "translations": [{"language": "ja", "title": "美人妻の誘惑"}],
                   "raw": {"title": "  The  Beautiful Wife's Temptation "}, "combined": {"title_en": "Other"}}
        self.assertEqual(source_titles.english_title(payload), "The Beautiful Wife's Temptation")
        self.assertEqual(source_titles.english_title({"raw": {"title": "美人妻"}, "combined": {"title_en": "Wife"}}), "Wife")
        self.assertEqual(source_titles.english_title({"title": "美人妻の誘惑", "translations": [{"language": "ja"}]}), "")
        self.assertEqual(source_titles.english_title({"title": "English Only Page"}), "English Only Page")
        self.assertEqual(source_titles.english_title(None), "")


class EnglishTitlesIndexTests(unittest.TestCase):
    def test_the_index_follows_snapshots_by_code_and_rereads_changed_files(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            snapshot = root / "SSIS-950-r18dev.json"
            snapshot.write_text(json.dumps({"raw": {"title": "First Title"}}), encoding="utf-8")
            (root / "SSIS-950-javdb.json").write_text(json.dumps({"title": "Javdb"}), encoding="utf-8")
            index = source_titles.EnglishTitles(root)
            self.assertEqual(index.get("ssis-950"), "First Title")
            self.assertEqual(index.get("ABP-001"), "")

            snapshot.write_text(json.dumps({"raw": {"title": "Second Title"}}), encoding="utf-8")
            os.utime(snapshot, ns=(snapshot.stat().st_atime_ns, snapshot.stat().st_mtime_ns + 10**9))
            index._checked = 0.0
            self.assertEqual(index.get("SSIS-950"), "Second Title")

            snapshot.unlink()
            index._checked = 0.0
            self.assertEqual(index.get("SSIS-950"), "")


if __name__ == "__main__":
    unittest.main()
