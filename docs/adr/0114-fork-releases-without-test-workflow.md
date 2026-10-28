# ADR-0114：本分发发布不等 Test 工作流

- 状态：已采纳
- 日期：2026-10-28
- 相关：ADR-0012

## 决策

本分发（`tam003/peach`）不在 GitHub Actions 上跑 Test 与 Docker 工作流，`.github/workflows/test.yml` 与 `docker.yml` 移除。Release 工作流保留，只在推送版本标签或手动触发时运行，负责构建与发布制品；构建前的安装目录回归、Windows 与 macOS 的制品验收也一并移除，构建成功即发布。

ADR-0012 的发布链据此收窄：`release_tag.py --ship --apply` 只做提交、推送、打标签，不再等 Test 转绿；`--verify-sha` 与 `--release-sha` 只核对发布提交属于远端 master 历史。其余判据不变：不在 master、缺版本那一节、条目未归类、标签被占、工作区夹带别的改动都拒绝。

## 原因

GitHub 默认停用 fork 继承来的工作流，以免空耗算力；上游的 Test 工作流每次推送要开十几台 Windows、macOS 与 Ubuntu runner，本分发不需要这份开销，而 Release 只要开启 Actions 就能单独运行。

## 后果

发布前的验证只剩本机测试入口（`scripts/test.ps1`）与集成门槛，远端不再提供多平台回归。macOS、Linux 与浏览器回归、安装包与 DMG 的开箱验收都不再在远端执行，发现问题时以本机复现为准。
