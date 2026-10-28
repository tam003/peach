"""API 提示与报错按请求语言输出：与界面共用一份短语表，只译给人读的字段。"""
import unittest

from peach import i18n


class LocalizeStringTests(unittest.TestCase):
    def test_an_exception_name_stays_and_the_sentence_after_it_is_translated(self):
        self.assertEqual(i18n.localize_string("ValueError: 馆藏未找到这个番号", "en"),
                         "ValueError: Code not found in library")

    def test_sentences_with_slots_and_joined_reasons_are_translated(self):
        self.assertEqual(i18n.localize_string("16 项需要处理，可重试未完成的部分。", "en"),
                         "16 items need attention. You can retry the unfinished part.")
        self.assertEqual(i18n.localize_string("来源离线；处理任务已停止", "en"),
                         "Source offline; Processing stopped")

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


if __name__ == "__main__":
    unittest.main()
