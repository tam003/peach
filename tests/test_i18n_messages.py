"""API 提示与报错按请求语言输出：与界面共用一份短语表，只译给人读的字段。"""
import tempfile
import unittest
from pathlib import Path

from fastapi.testclient import TestClient

from peach import i18n
from peach.api import create_app
from peach.config import PeachSettings
from support.ledger import fresh_ledger


class LocalizeStringTests(unittest.TestCase):
    def test_an_exception_name_stays_and_the_sentence_after_it_is_translated(self):
        self.assertEqual(i18n.localize_string("ValueError: 馆藏未找到这个番号", "en"),
                         "ValueError: Code not found in library")

    def test_sentences_with_slots_and_joined_reasons_are_translated(self):
        self.assertEqual(i18n.localize_string("16 项需要处理，可重试未完成的部分。", "en"),
                         "16 items need attention. You can retry the unfinished part.")
        self.assertEqual(i18n.localize_string("来源离线；处理任务已停止", "en"),
                         "Source offline; Processing stopped")

    def test_a_sentence_mark_added_after_a_known_sentence_still_translates(self):
        reason = "来源返回 403：可能是凭据失效，也可能是出口 IP 被封，先看站点是否要求登录再决定换凭据还是等"
        self.assertEqual(
            i18n.localize_string(f"{reason}。", "en"),
            "The source returned 403: the credentials may have expired or the exit IP may be blocked. "
            "Check whether the site wants a sign-in, then switch credentials or wait.")

    def test_a_label_and_a_known_sentence_joined_by_a_colon_translate_on_both_sides(self):
        self.assertEqual(i18n.localize_string("诊断报告：C:/peach/support.zip", "en"),
                         "Diagnostic report: C:/peach/support.zip")
        self.assertEqual(i18n.localize_string("javdb 登录页，换一份凭据后重跑", "en"),
                         "javdb sign-in page, Switch credentials and run again")

    def test_a_title_in_a_slot_stays_while_the_sentence_around_it_translates(self):
        self.assertTrue(i18n.localize_string("下载已入库：雪后山径", "en").endswith("雪后山径"))
        self.assertNotIn("下载已入库", i18n.localize_string("下载已入库：雪后山径", "en"))

    def test_chinese_and_unknown_text_are_left_alone(self):
        self.assertEqual(i18n.localize_string("ValueError: 馆藏未找到这个番号", "zh"),
                         "ValueError: 馆藏未找到这个番号")
        self.assertEqual(i18n.localize_string("雪后山径.mp4", "vi"), "雪后山径.mp4")


class LocalizeMessagesTests(unittest.TestCase):
    def test_only_sentence_fields_are_translated(self):
        payload = {"error": "ValueError: 馆藏未找到这个番号", "title": "馆藏未找到这个番号",
                   "runs": [{"task_label": "封面采集", "progress_label": "正在整理", "tags": ["正在整理"]}]}
        result = i18n.localize_messages(payload, "en")
        self.assertEqual(result["error"], "ValueError: Code not found in library")
        self.assertEqual(result["title"], "馆藏未找到这个番号")
        self.assertEqual(result["runs"][0]["task_label"], "Cover collection")
        self.assertEqual(result["runs"][0]["progress_label"], "Organizing")
        self.assertEqual(result["runs"][0]["tags"], ["正在整理"])
        self.assertIs(i18n.localize_messages(payload, "zh"), payload)


class ResponseLanguageTests(unittest.TestCase):
    """每个 JSON 响应都按请求语言输出，不只是通用契约那一条路由。"""

    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        root = Path(temporary.name).resolve()
        app = create_app(PeachSettings(db_path=fresh_ledger(root), configured=True,
                                       follow_state_root=root / "state", secrets_root=root / "secrets"))
        self.addCleanup(app.state.http_transport.close)
        self.client = TestClient(app, client=("127.0.0.1", 12345))

    def test_health_checks_read_in_the_cookie_language_and_stay_chinese_by_default(self):
        english = self.client.get("/healthz", cookies={"peach.locale": "en"}).json()
        chinese = self.client.get("/healthz").json()
        self.assertEqual(chinese["checks"]["database"]["reason"], "数据库可读取")
        self.assertNotRegex(english["checks"]["database"]["reason"], "[一-鿿]")
        self.assertEqual(english["version"], chinese["version"])


if __name__ == "__main__":
    unittest.main()
