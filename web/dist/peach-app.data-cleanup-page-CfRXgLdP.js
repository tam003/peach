(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "cdbdb03d-1635-4685-8aa0-070fadbf0237", e._sentryDebugIdIdentifier = "sentry-dbid-cdbdb03d-1635-4685-8aa0-070fadbf0237");
	} catch {}
})();
import { Button as e, CLEANUP_ENTRY as t, CLEANUP_ENTRY_GRID as n, CLEANUP_HASH_REDIRECTS as r, CLEANUP_TOOLS as i, Chip as a, DIRECTORY_TEMPLATE_ERROR as o, DUPLICATES_KEY as s, Fieldset as c, FieldsetTitle as l, IDLE_REPAIR as u, IconButton as d, IndexSearch as f, Input as p, JUNK_KEY as m, LINKS_KEY as h, LINK_CHECK_KEY as g, LINK_KINDS as _, LINK_PRUNE_KEY as v, LOC as y, LibraryProcessingCard as b, MEDIA_REPAIR_KEY as x, MEDIA_REPAIR_URL as S, MEDIA_SOURCES_KEY as C, MEDIA_SOURCE_ICONS as w, Note as T, ORGANIZE_KEY as E, ORPHAN_RECORDS_KEY as D, PERFORMER_DELETE_KEY as O, PLAIN_STAT_STRIP as k, PlainStat as A, Progress as j, QUALITY_GOALS_KEY as M, REPAIR_CARD_TEXT as N, REPAIR_LIBRARIES_KEY as ee, RESOURCE_APPLY_KEY as P, RESOURCE_SCAN_KEY as te, RESULT_PANEL as ne, RESULT_SECTION as F, REVIEW_COUNTS_KEY as I, SOURCE_LABELS as L, SectionHeading as R, Select as re, SelectItem as ie, SourceMark as ae, StatusLabel as oe, TRASH_KEY as z, TaskProgress as se, Wt as ce, __toESM as le, apiSend as ue, applyConfirmText as de, applyLeftovers as fe, applyPlanText as pe, applyText as me, attachOrphan as B, baseName as he, busyProps as V, candidateText as H, checkLine as ge, confirmModal as U, cx as _e, deletePerformerVideos as ve, entityDisplayName as ye, entityFaceImg as be, entityPath as xe, errorMessage as W, esc as Se, fetchDeletePerformers as Ce, fetchDeletePlan as we, fetchDuplicates as Te, fetchJunkSummary as Ee, fetchLinkCheck as De, fetchLinkPrune as Oe, fetchLinkStats as ke, fetchMediaRepair as Ae, fetchMediaSources as je, fetchOrganize as Me, fetchOrganizeExample as Ne, fetchOrphanRecords as Pe, fetchQualityGoals as Fe, fetchRepairLibraries as Ie, fetchResourceApply as Le, fetchResourceScan as Re, fetchReviewCounts as ze, fetchTrashSummary as Be, firstGrapheme as Ve, fmtSize as G, hasChanges as He, hasResourceRoots as Ue, junkBreakdown as We, listSeparator as Ge, missingToolText as Ke, nameFallback as qe, organizeOutcome as Je, phrase as K, pickOrganizeFolder as Ye, plainStatClass as Xe, planSummary as Ze, previewOrganize as Qe, pruneText as $e, purgeCount as et, purgeOrphan as tt, queryClient as q, recordsText as nt, rememberTemplates as rt, require_jsx_runtime as it, require_react as at, reviewSummary as ot, scanLine as st, shellNavigate as ct, sourceMeta as lt, spriteGlyph as J, startLinkCheck as ut, startLinkPrune as dt, startOrganize as ft, startResourceApply as pt, startResourceScan as mt, statusLine as ht, useAction as gt, useBackgroundJob as Y, useEntityNames as _t, useMutation as vt, useQuery as X, withOrganizeJob as yt } from "./peach-app.js";
import { Page as bt } from "./peach-app.page-QAncjzM1.js";
import { ErrorExcerpt as xt } from "./peach-app.error-excerpt-CkpvnbvJ.js";
import { DataTable as St } from "./peach-app.data-table-C3qANjHs.js";
import { SiteMark as Ct } from "./peach-app.site-mark-D_VlIyJz.js";
import { LEGACY_AVATAR_IMG as wt } from "./peach-app.legacy-avatar-NSITxLRS.js";
import { FolderSearchIcon as Tt } from "./peach-app.folder-rows-l5tt6_RA.js";
import { ConnectionStatus as Et } from "./peach-app.connection-status-DI6kgn3i.js";
// src/react/data-cleanup/cleanup-entry-card.tsx
var Z = /* @__PURE__ */ le(at(), 1), Q = it(), Dt = J("chevron-right");
function Ot({ label: e, icon: n, summary: r, detail: i, state: a, attributes: o, onOpen: s }) {
	return /* @__PURE__ */ (0, Q.jsxs)("button", {
		type: "button",
		...o,
		className: t.face,
		onClick: s,
		"data-entry-state": a,
		"aria-busy": a === "loading" || void 0,
		children: [
			/* @__PURE__ */ (0, Q.jsx)("span", {
				"aria-hidden": !0,
				className: t.icon,
				children: /* @__PURE__ */ (0, Q.jsx)(n, {
					"aria-hidden": !0,
					className: "size-5"
				})
			}),
			/* @__PURE__ */ (0, Q.jsxs)("span", {
				className: t.body,
				children: [
					/* @__PURE__ */ (0, Q.jsx)("span", {
						className: t.title,
						children: e
					}),
					/* @__PURE__ */ (0, Q.jsx)("span", {
						className: _e(t.summary, a === "error" && "text-text-error-primary"),
						children: r
					}),
					i ? /* @__PURE__ */ (0, Q.jsx)("span", {
						className: t.detail,
						children: i
					}) : null
				]
			}),
			/* @__PURE__ */ (0, Q.jsx)(Dt, {
				"aria-hidden": !0,
				className: t.arrow
			})
		]
	});
}
// src/react/media-repair/media-repair-card.tsx
var kt = (e) => w[e] || e, At = (e) => q.setQueryData(x, e);
function jt({ toast: t = () => {} }) {
	let n = Y({
		queryKey: x,
		queryFn: ({ signal: e }) => Ae(e),
		start: (e) => ue(S, {
			library: e,
			restart: !0
		}),
		onFinish: (e) => {
			e.status === "complete" && !e.failed && !e.missing_tool && t(e.repaired ? `已修复 ${e.repaired.toLocaleString()} 部视频` : "已检查媒体库，没有需要修复的视频");
		}
	}), r = X({
		queryKey: ee,
		queryFn: ({ signal: e }) => Ie(e)
	}), [i, a] = (0, Z.useState)(""), o = gt(), s = n.job ?? u, d = r.data ?? [], f = s.status === "running", p = d.find((e) => e.id === (f ? s.library : i)) ?? d.find((e) => e.id === s.library) ?? d[0], m = () => {
		p && U({
			title: `修复媒体库「${p.name}」`,
			body: "缺时间戳表的片子另存一份修好的头，原文件不动；缺索引的片子重建后替换原文件，坏原件改名成同目录的隐藏文件（.文件名.peach-original）留着。" + (p.metered ? "这个库在计费来源上，每修一部都要把片子完整拉一遍。" : ""),
			confirmLabel: "修复媒体库",
			onConfirm: async () => {
				await n.start.mutateAsync(p.id);
			}
		});
	}, h = () => void o.run("stop", (e) => ue(S, { stop: !0 }, "POST", e), At), g = n.outcome, _ = ht(f ? s : g ?? u), v = o.error || g?.error || (n.query.error ? "读不到媒体修复的状态" : "");
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, Q.jsx)(c, {
			layout: "split",
			label: K("媒体修复"),
			footer: /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(re, {
				"aria-label": "媒体库",
				prefix: "媒体库",
				className: "w-48",
				selectedKey: p?.id ?? null,
				isDisabled: f || !d.length,
				onSelectionChange: (e) => {
					e !== null && a(String(e));
				},
				children: d.map((e) => /* @__PURE__ */ (0, Q.jsxs)(ie, {
					id: e.id,
					textValue: e.name,
					children: [/* @__PURE__ */ (0, Q.jsx)(ae, { mark: kt(e.icon) }), e.name]
				}, e.id))
			}), f ? /* @__PURE__ */ (0, Q.jsx)(e, {
				onClick: h,
				...V(o.busy === "stop"),
				children: K("停止")
			}) : /* @__PURE__ */ (0, Q.jsx)(e, {
				onClick: m,
				disabled: !p,
				children: K("开始修复")
			})] }),
			children: /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, Q.jsx)(l, { children: K("媒体修复") }),
					/* @__PURE__ */ (0, Q.jsx)("p", {
						className: "text-body-2-regular text-text-secondary",
						children: N
					}),
					f && s.total ? /* @__PURE__ */ (0, Q.jsx)(j, {
						label: K("修复进度"),
						value: s.checked,
						max: s.total
					}) : null,
					_ ? /* @__PURE__ */ (0, Q.jsx)("p", {
						role: "status",
						className: "text-caption-1-regular text-text-secondary",
						children: _
					}) : null
				]
			})
		}), /* @__PURE__ */ (0, Q.jsxs)("div", {
			"aria-live": "polite",
			className: "flex flex-col gap-4 empty:hidden",
			children: [g?.status === "complete" && g.missing_tool ? /* @__PURE__ */ (0, Q.jsx)(T, {
				tone: "warning",
				title: "缺少 untrunc",
				action: /* @__PURE__ */ (0, Q.jsx)(e, {
					variant: "ghost",
					size: "small",
					onClick: n.dismiss,
					children: "关闭提示"
				}),
				children: Ke(g)
			}) : null, v ? /* @__PURE__ */ (0, Q.jsx)(T, {
				tone: "error",
				children: v
			}) : null]
		})]
	});
}
// src/react/data-cleanup/link-check-icon.tsx
function Mt({ className: e }) {
	return /* @__PURE__ */ (0, Q.jsxs)("svg", {
		"aria-hidden": !0,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 2,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className: e,
		"data-link-check-icon": "",
		children: [
			/* @__PURE__ */ (0, Q.jsx)("path", { d: "m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71" }),
			/* @__PURE__ */ (0, Q.jsx)("path", { d: "m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71" }),
			/* @__PURE__ */ (0, Q.jsxs)("g", {
				"data-link-check-rays": "",
				children: [
					/* @__PURE__ */ (0, Q.jsx)("path", { d: "M8 2v3" }),
					/* @__PURE__ */ (0, Q.jsx)("path", { d: "M2 8h3" }),
					/* @__PURE__ */ (0, Q.jsx)("path", { d: "M16 19v3" }),
					/* @__PURE__ */ (0, Q.jsx)("path", { d: "M19 16h3" })
				]
			})
		]
	});
}
// src/react/data-cleanup/link-manager.tsx
var Nt = J("rotate-cw"), Pt = "站点返回 404 或 410，确认这个地址不存在。", Ft = "站点拒绝程序访问或一次临时故障都会落在这里。链接保留，可勾选后单独重试。", It = "删除前会逐条重验一次；此操作不可撤销。", Lt = "暂时无法读取进度，正在重新连接…", Rt = (e) => Number(e || 0).toLocaleString();
function zt({ label: e, value: t, note: n }) {
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-0.5",
		children: [
			/* @__PURE__ */ (0, Q.jsx)("span", {
				className: "text-caption-1-regular leading-5 text-text-secondary",
				children: e
			}),
			/* @__PURE__ */ (0, Q.jsx)("b", {
				className: "text-title-2-semibold font-bold leading-5 tabular-nums text-text-primary",
				children: t
			}),
			n ? /* @__PURE__ */ (0, Q.jsx)("small", {
				className: "text-caption-1-regular leading-5 text-text-secondary",
				children: n
			}) : null
		]
	});
}
function Bt({ title: e, items: t, hint: n, picked: r, onPick: i, children: a, footer: o, confirmed: s = !1 }) {
	return t.length ? /* @__PURE__ */ (0, Q.jsx)("div", {
		className: F,
		"data-link-results": s ? "gone" : "unclear",
		children: /* @__PURE__ */ (0, Q.jsx)(St, {
			label: e,
			items: t,
			columns: [
				{
					id: "entity",
					label: "Peach 资料",
					width: 180,
					min: 128,
					value: (e) => e.entity,
					render: (e) => /* @__PURE__ */ (0, Q.jsxs)("a", {
						className: "flex min-w-24 items-center gap-2 text-text-secondary hover:text-text-primary hover:underline",
						href: e.entity_id && e.entity_kind ? xe(e.entity_kind, e.entity, e.entity_id) : void 0,
						"data-link-identity": "",
						children: [/* @__PURE__ */ (0, Q.jsx)("span", {
							"data-link-avatar": "",
							className: `relative flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-background-quaternary-default text-caption-1-medium text-text-primary ${wt}`,
							"aria-hidden": !0,
							dangerouslySetInnerHTML: { __html: `<span>${Se(Ve(e.entity))}</span>` + be({
								kind: e.entity_kind,
								id: e.entity_id,
								hasImage: e.face?.has_image,
								version: e.face?.image_version,
								focus: e.face?.avatar_focus,
								thumb: !0,
								mark: e.entity_kind === "studio" || e.entity_kind === "agency" ? e.id : null
							}) }
						}), /* @__PURE__ */ (0, Q.jsx)("span", {
							className: "min-w-0 wrap-anywhere",
							children: e.entity
						})]
					})
				},
				{
					id: "kind",
					label: "类型",
					width: 128,
					value: (e) => _[e.link_kind] || e.link_kind,
					render: (e) => _[e.link_kind] || e.link_kind
				},
				{
					id: "label",
					label: "链接名称",
					min: 128,
					value: (e) => e.label || "",
					render: (e) => /* @__PURE__ */ (0, Q.jsx)("span", {
						className: "flex min-w-24 items-center gap-2",
						"data-link-name": "",
						children: /* @__PURE__ */ (0, Q.jsx)("span", {
							className: "min-w-0 wrap-anywhere",
							children: e.label || new URL(e.url).hostname
						})
					})
				},
				{
					id: "note",
					label: "结果",
					width: 320,
					min: 192,
					value: (e) => e.note,
					render: (e) => /* @__PURE__ */ (0, Q.jsx)("div", {
						className: "min-w-0 w-full",
						"data-link-result": s ? "gone" : "unclear",
						children: /^(?:HTTP\s+)?[1-5]\d{2}$/.test(e.note.trim()) ? /* @__PURE__ */ (0, Q.jsx)(oe, {
							tone: s || /^(?:HTTP\s+)?5\d{2}$/.test(e.note.trim()) ? "error" : "warning",
							"data-link-code": "",
							children: e.note.trim()
						}) : /* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "flex flex-col items-start gap-1",
							children: [/* @__PURE__ */ (0, Q.jsx)(oe, {
								tone: s ? "error" : "warning",
								children: s ? "地址已失效" : "未取得结论"
							}), /* @__PURE__ */ (0, Q.jsx)(xt, {
								text: e.note,
								className: "tabular-nums text-text-secondary"
							})]
						})
					})
				},
				{
					id: "url",
					label: "地址",
					width: 360,
					min: 180,
					value: (e) => e.url,
					render: (e) => /* @__PURE__ */ (0, Q.jsxs)("a", {
						href: e.url,
						target: "_blank",
						rel: "noopener noreferrer",
						title: e.url,
						"data-link-address": "",
						className: "flex min-w-0 items-center gap-1 text-text-secondary hover:text-text-primary",
						children: [
							/* @__PURE__ */ (0, Q.jsx)(Ct, { linkId: e.id }),
							/* @__PURE__ */ (0, Q.jsx)("span", {
								"data-middle-truncate": !0,
								className: "min-w-0 truncate",
								children: e.url
							}),
							/* @__PURE__ */ (0, Q.jsx)(ce, {
								"aria-hidden": !0,
								className: "size-(--icon-inline) shrink-0"
							})
						]
					})
				}
			],
			rowId: (e) => String(e.id),
			description: n,
			unit: K("条链接"),
			panel: !1,
			footerActions: o,
			rowLabel: (e) => K("{entity} 的{label}", {
				entity: e.entity,
				label: e.label || e.url
			}),
			selected: r.map(String),
			onSelected: (e) => i(e.map(Number)),
			actions: () => a
		})
	}) : null;
}
function Vt() {
	let t = X({
		queryKey: h,
		queryFn: ({ signal: e }) => ke(e)
	}), [n, r] = (0, Z.useState)([]), [i, o] = (0, Z.useState)([]), s = Y({
		queryKey: v,
		queryFn: ({ signal: e }) => Oe(e),
		start: dt,
		onFinish: () => {
			q.invalidateQueries({
				queryKey: h,
				exact: !0
			}), q.invalidateQueries({
				queryKey: g,
				exact: !0
			});
		}
	}), u = Y({
		queryKey: g,
		queryFn: ({ signal: e }) => De(e),
		start: ut,
		onStarted: () => {
			s.dismiss(), r([]), o([]);
		}
	}), d = u.job, f = d?.check_id ?? "";
	(0, Z.useEffect)(() => {
		r([]), o([]);
	}, [f]);
	let p = u.running || u.start.isPending, m = s.running || s.start.isPending, y = d?.status === "complete", b = d?.gone ?? [], x = d?.unclear ?? [], S = y ? x : [], C = b.filter((e) => i.includes(e.id)).map((e) => e.id), w = S.filter((e) => n.includes(e.id)).map((e) => e.id), E = t.data, D = (E?.top_hosts ?? []).slice(0, 3), O = (e) => {
		p || e && !e.length || u.start.mutate(e ? {
			retry: e,
			checkId: f
		} : {});
	}, k = (e) => {
		!m && b.length && U({
			title: K("删除失效链接"),
			body: K("将删除 {length} 条失效链接。删除前会再次检查，删除后无法恢复。", { length: e?.length ?? b.length }),
			confirmLabel: K("删除失效链接"),
			danger: !0,
			onConfirm: () => s.start.mutateAsync({
				checkId: f,
				ids: e
			})
		});
	}, A = s.outcome, j = u.start.error ?? s.start.error, M = null, N = null;
	if (A?.status === "failed") N = /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "error",
		title: K("链接清理未完成"),
		children: A.error || K("请查看任务记录，核对已处理的链接。")
	});
	else if (A && !b.length && !x.length) N = /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "success",
		title: K("完成"),
		children: $e(A)
	});
	else if (j) N = /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "error",
		title: K("检查失败"),
		children: W(j)
	});
	else if (u.query.isError && d) N = /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "neutral",
		title: K("任务状态"),
		children: K(Lt)
	});
	else if (d?.status === "failed") N = /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "error",
		title: K("检查失败"),
		children: d.error || K("检查失败")
	});
	else if (d && d.status !== "idle") {
		M = /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [d.status === "running" ? /* @__PURE__ */ (0, Q.jsx)(se, {
			embedded: !0,
			label: ge(d),
			value: Math.min(d.checked || 0, d.total || 0),
			total: d.total
		}) : null, m ? /* @__PURE__ */ (0, Q.jsx)(se, {
			embedded: !0,
			label: s.job?.message || "正在重验并删除失效链接",
			value: Math.min(s.job?.checked || 0, s.job?.total || 0),
			total: s.job?.total
		}) : null] });
		let t = `立即重试所选（${w.length}）`;
		N = y || b.length || x.length ? /* @__PURE__ */ (0, Q.jsxs)("div", {
			className: ne,
			children: [
				A?.status === "complete" ? /* @__PURE__ */ (0, Q.jsx)(T, {
					tone: "success",
					title: "完成",
					children: $e(A)
				}) : null,
				/* @__PURE__ */ (0, Q.jsx)(Bt, {
					title: "地址已失效",
					items: b,
					hint: Pt,
					picked: i,
					onPick: o,
					confirmed: !0,
					footer: y && b.length ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)("p", {
						className: "mr-auto min-w-0 text-caption-1-regular text-text-secondary",
						children: It
					}), /* @__PURE__ */ (0, Q.jsx)(e, {
						variant: "danger",
						...V(m),
						onClick: () => k(),
						children: `删除 ${b.length} 条失效链接`
					})] }) : null,
					children: /* @__PURE__ */ (0, Q.jsx)(e, {
						variant: "danger",
						size: "small",
						disabled: !y || !C.length,
						...V(m),
						onClick: () => k(C),
						children: K("删除所选（{length}）", { length: C.length })
					})
				}),
				/* @__PURE__ */ (0, Q.jsx)(Bt, {
					title: K("本次未访问成功"),
					items: x,
					hint: K(Ft),
					picked: n,
					onPick: r,
					footer: S.length ? /* @__PURE__ */ (0, Q.jsx)(e, {
						variant: "primary",
						leadingIcon: Nt,
						...V(p),
						onClick: () => O(S.map((e) => e.id)),
						children: `立即重试全部（${S.length}）`
					}) : null,
					children: S.length ? /* @__PURE__ */ (0, Q.jsx)(Q.Fragment, { children: /* @__PURE__ */ (0, Q.jsx)(e, {
						variant: "secondary",
						leadingIcon: Nt,
						disabled: !w.length,
						...V(p),
						onClick: () => O(w),
						children: t
					}) }) : null
				}),
				y && !b.length && !x.length ? /* @__PURE__ */ (0, Q.jsx)("p", {
					className: `${F} text-body-regular text-notification-success-foreground`,
					children: K("全部链接均可访问。")
				}) : null
			]
		}) : null;
	}
	return /* @__PURE__ */ (0, Q.jsxs)("section", {
		id: "link-manager",
		"aria-labelledby": "link-manager-title",
		className: "flex scroll-mt-20 flex-col gap-4",
		children: [/* @__PURE__ */ (0, Q.jsxs)(c, {
			layout: "stack",
			labelledBy: "link-manager-title",
			footer: /* @__PURE__ */ (0, Q.jsx)(e, {
				"data-link-check": "",
				leadingIcon: Mt,
				...V(p),
				onClick: () => O(),
				children: p ? "检查中" : y ? "重新检查" : "检查死链"
			}),
			children: [
				/* @__PURE__ */ (0, Q.jsx)(l, {
					id: "link-manager-title",
					gap: "small",
					children: K("链接管理")
				}),
				t.isError ? /* @__PURE__ */ (0, Q.jsx)(T, {
					tone: "error",
					title: K("链接统计读取失败"),
					children: W(t.error)
				}) : E ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "link-stat-grid mt-4 gap-x-8 gap-y-3",
					children: [/* @__PURE__ */ (0, Q.jsx)(zt, {
						label: K("链接总数"),
						value: Rt(E.total),
						note: K("分布在 {entities} 个女优、厂牌与系列", { entities: Rt(E.entities) })
					}), Object.entries(E.by_kind ?? {}).map(([e, t]) => /* @__PURE__ */ (0, Q.jsx)(zt, {
						label: _[e] || e,
						value: Rt(t)
					}, e))]
				}), D.length ? /* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "mt-4 flex min-w-0 flex-col gap-0.5",
					children: [/* @__PURE__ */ (0, Q.jsx)("span", {
						className: "text-caption-1-regular text-text-secondary",
						children: "主要站点"
					}), /* @__PURE__ */ (0, Q.jsx)("div", {
						className: "flex min-w-0 flex-wrap gap-x-5 gap-y-2",
						children: D.map(([e, t]) => /* @__PURE__ */ (0, Q.jsxs)("span", {
							"data-top-host": "",
							className: "inline-flex min-w-0 max-w-full items-center gap-1.5",
							children: [/* @__PURE__ */ (0, Q.jsxs)("a", {
								href: `https://${e}`,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "inline-flex min-w-0 items-center gap-1.5 text-body-2-medium text-text-primary",
								children: [
									/* @__PURE__ */ (0, Q.jsx)(Ct, { linkId: E.top_host_link_ids?.[e] }),
									/* @__PURE__ */ (0, Q.jsx)("span", {
										className: "min-w-0 wrap-anywhere",
										children: e
									}),
									/* @__PURE__ */ (0, Q.jsx)(ce, {
										"aria-hidden": !0,
										className: "size-(--icon-inline) shrink-0"
									})
								]
							}), /* @__PURE__ */ (0, Q.jsx)(a, {
								variant: "caption",
								color: "neutral",
								children: /* @__PURE__ */ (0, Q.jsx)("span", {
									className: "tabular-nums",
									children: Rt(t)
								})
							})]
						}, e))
					})]
				}) : null] }) : null,
				/* @__PURE__ */ (0, Q.jsx)("div", {
					"aria-live": "polite",
					className: "mt-4 flex flex-col gap-3 empty:hidden",
					children: M
				})
			]
		}), /* @__PURE__ */ (0, Q.jsx)("div", {
			"aria-live": "polite",
			className: "empty:hidden",
			children: N
		})]
	});
}
// src/react/data-cleanup/organize-card.tsx
var Ht = (e, t) => `将整理「${e}」${t ? `的「${t}」及其子目录` : "上的文件名与目录"}，清理特殊符号与乱码，并按已填模板改名或移动。目标已存在的行会整行跳过。这一批可以从「回滚上一批」整批退回。`, Ut = "将把上一批整理动过的文件退回整理前的名字与位置，数据库路径跟着退回。退回后这一批不再出现在这里。", Wt = 8;
function Gt({ plan: e }) {
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)("ol", {
		className: "mt-2 flex min-w-0 flex-col gap-1",
		children: e.rows.slice(0, Wt).map((e) => /* @__PURE__ */ (0, Q.jsxs)("li", {
			className: "flex min-w-0 items-center gap-2 text-caption-1-regular text-text-secondary",
			children: [
				/* @__PURE__ */ (0, Q.jsx)("span", {
					"data-middle-truncate": !0,
					title: e.current_path,
					className: "min-w-0 truncate",
					children: he(e.current_path)
				}),
				/* @__PURE__ */ (0, Q.jsx)("span", {
					"aria-hidden": !0,
					children: "→"
				}),
				/* @__PURE__ */ (0, Q.jsx)("span", {
					"data-middle-truncate": !0,
					title: e.target_path,
					className: "min-w-0 truncate text-text-primary",
					children: he(e.target_path)
				})
			]
		}, e.current_path))
	}), e.truncated || e.rows.length > Wt ? /* @__PURE__ */ (0, Q.jsx)("p", {
		className: "text-caption-1-regular text-text-secondary",
		children: "只列出前 8 行，完整计划在计划 CSV 里。"
	}) : null] });
}
function Kt({ toast: t, failure: n }) {
	let r = X({
		queryKey: E,
		queryFn: ({ signal: e }) => Me(e)
	}), i = r.data, a = i?.locations ?? [], [s, u] = (0, Z.useState)(""), f = a.some((e) => e.location === s) ? s : a[0]?.location ?? "", m = i?.templates?.[f], [h, g] = (0, Z.useState)(null), _ = h?.location === f ? h : {
		location: f,
		file: m?.file ?? "",
		dir: m?.dir ?? ""
	}, v = (e) => {
		g({
			..._,
			...e
		}), F.reset();
	}, [b, x] = (0, Z.useState)({
		location: "",
		path: ""
	}), S = b.location === f ? b.path : "", C = (0, Z.useRef)({
		location: f,
		path: S
	});
	C.current = {
		location: f,
		path: S
	};
	let [D, O] = (0, Z.useState)(null), k = (0, Z.useRef)(null), A = (0, Z.useRef)(null), j = (0, Z.useRef)(null), M = X({
		queryKey: [
			"organize-example",
			_.file,
			_.dir
		],
		queryFn: ({ signal: e }) => Ne(_.file, _.dir, e),
		enabled: !!i
	}), [N, ee] = (0, Z.useState)("file"), P = (0, Z.useRef)(!1), te = (0, Z.useRef)(null);
	(0, Z.useLayoutEffect)(() => {
		let e = te.current;
		if (!e) return;
		te.current = null;
		let t = (e.field === "file" ? k : A).current;
		t?.focus(), t?.setSelectionRange(e.caret, e.caret);
	});
	let ne = () => ({
		location: f,
		path: S.trim(),
		file_template: _.file.trim(),
		dir_template: _.dir.trim()
	}), F = vt({
		mutationFn: Qe,
		onError: (e) => {
			let t = /整理路径/.test(W(e)) ? "path" : o.test(W(e)) ? "dir" : "file";
			O(t), (t === "path" ? j : t === "dir" ? A : k).current?.focus();
		}
	}), I = vt({
		mutationFn: ({ initial: e }) => Ye(e),
		onSuccess: (e, t) => {
			e.path && t.location === C.current.location && t.path === C.current.path && (x({
				location: t.location,
				path: e.path
			}), O(null), F.reset(), j.current?.focus());
		}
	}), L = Y({
		queryKey: E,
		queryFn: ({ signal: e }) => Me(e),
		start: ft,
		jobOf: (e) => e,
		withJob: yt,
		onStarted: () => F.reset(),
		onFinish: (e) => {
			if (q.invalidateQueries({
				queryKey: E,
				exact: !0
			}), e.status !== "complete") return;
			let { text: r, failed: i } = Je(e);
			i ? n("整理文件", /* @__PURE__ */ Error(`${i} 行未能处理`)) : t(r.replace(/。$/, ""));
		}
	}), R = L.running || L.start.isPending, oe = JSON.stringify(F.variables) === JSON.stringify(ne()), z = oe ? F.data : void 0, ce = Number(z?.counts?.change || 0), le = y[f] || f, ue = (e) => {
		v(e), O(null), F.reset();
	}, de = (e) => {
		let t = (N === "file" ? k : A).current, n = _[N], r = P.current ? t?.selectionStart ?? n.length : n.length, i = P.current ? t?.selectionEnd ?? r : r, a = `{${e}}`;
		te.current = {
			field: N,
			caret: r + a.length
		}, ue({ [N]: n.slice(0, r) + a + n.slice(i) });
	}, fe = () => {
		F.isPending || R || !f || (L.dismiss(), L.start.reset(), O(null), F.mutate(ne()));
	}, pe = () => {
		let e = F.variables;
		e && z && ce && U({
			title: "整理文件",
			body: Ht(le, e.path),
			confirmLabel: "整理文件",
			onConfirm: async () => {
				await L.start.mutateAsync({
					kind: "apply",
					request: e
				}), rt({
					...i?.templates ?? {},
					[e.location]: {
						file: e.file_template,
						dir: e.dir_template
					}
				});
			}
		});
	}, me = () => void U({
		title: K("回滚上一批整理"),
		body: Ut,
		confirmLabel: K("回滚整理"),
		onConfirm: () => L.start.mutateAsync({ kind: "rollback" })
	}), B = null, he = !!ce && !R && !L.outcome, H = L.job, ge = L.outcome;
	if (H?.status === "running") {
		let e = H.message || H.stage || "正在整理文件";
		B = /* @__PURE__ */ (0, Q.jsx)(se, {
			embedded: !0,
			label: e,
			value: Math.min(H.checked || 0, H.total || 0),
			total: H.total
		});
	} else if (ge?.status === "failed") B = /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "error",
		title: K("文件整理未完成"),
		children: ge.error || K("请查看任务记录，核对已处理的文件。")
	});
	else if (ge) {
		let { text: e, failed: t } = Je(ge);
		B = /* @__PURE__ */ (0, Q.jsx)(T, {
			tone: t ? "warning" : "success",
			title: K(t ? "部分完成" : "整理结果"),
			children: e
		});
	} else L.start.isError ? B = /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "error",
		title: K("整理失败"),
		children: W(L.start.error)
	}) : F.isPending ? B = /* @__PURE__ */ (0, Q.jsx)(se, {
		embedded: !0,
		label: "正在核对整理计划"
	}) : F.isError && oe ? B = /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "error",
		title: "整理预览失败",
		children: W(F.error)
	}) : z && (B = /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "neutral",
		title: K("预览结果"),
		children: Ze(z)
	}), ce ? /* @__PURE__ */ (0, Q.jsx)(Gt, { plan: z }) : null] }));
	return /* @__PURE__ */ (0, Q.jsxs)(c, {
		layout: "stack",
		id: "organize",
		labelledBy: "cleanup-organize-title",
		attributes: { "data-cleanup-organize": "" },
		footer: /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [
			i?.last_batch ? /* @__PURE__ */ (0, Q.jsx)(e, {
				variant: "secondary",
				...V(R),
				onClick: me,
				children: K("回滚上一批")
			}) : null,
			/* @__PURE__ */ (0, Q.jsx)(e, {
				variant: he ? "secondary" : "primary",
				disabled: !a.length || R,
				...V(F.isPending),
				onClick: fe,
				children: "预览"
			}),
			he ? /* @__PURE__ */ (0, Q.jsx)(e, {
				variant: "primary",
				onClick: pe,
				children: "执行整理"
			}) : null
		] }),
		children: [
			/* @__PURE__ */ (0, Q.jsx)(l, {
				id: "cleanup-organize-title",
				gap: "medium",
				children: K("整理")
			}),
			/* @__PURE__ */ (0, Q.jsx)("p", {
				className: "text-body-regular text-text-secondary",
				children: "清理文件名中的特殊符号与乱码，也可按模板改名并归入目录。先预览，确认后执行；执行过的一批可以整批退回。"
			}),
			r.isError ? /* @__PURE__ */ (0, Q.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, Q.jsx)(T, {
					tone: "error",
					title: K("整理配置读取失败"),
					children: W(r.error)
				})
			}) : null,
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "mt-3 flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						"data-organize-scope": !0,
						className: "flex min-w-0 flex-wrap items-start gap-2",
						children: [a.length ? /* @__PURE__ */ (0, Q.jsx)(re, {
							"aria-label": "整理哪个来源",
							prefix: "来源",
							className: "w-fit min-w-25",
							selectedKey: f || null,
							onSelectionChange: (e) => {
								e !== null && (u(String(e)), x({
									location: String(e),
									path: ""
								}), O(null), F.reset(), I.reset(), P.current = !1);
							},
							children: a.map((e) => /* @__PURE__ */ (0, Q.jsxs)(ie, {
								id: e.location,
								textValue: K(y[e.location] || e.location),
								children: [/* @__PURE__ */ (0, Q.jsx)(ae, { mark: w[e.location] || "database" }), K(y[e.location] || e.location)]
							}, e.location))
						}) : null, /* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "flex min-w-0 basis-64 flex-1 items-start gap-2",
							children: [/* @__PURE__ */ (0, Q.jsx)(p, {
								"aria-label": "整理路径",
								className: "min-w-0 flex-1",
								placeholder: "留空整理整个来源",
								name: "organize-path",
								autoComplete: "off",
								spellCheck: "false",
								value: S,
								ref: j,
								isInvalid: D === "path",
								onChange: (e) => {
									x({
										location: f,
										path: e
									}), O(null), F.reset(), I.reset();
								}
							}), /* @__PURE__ */ (0, Q.jsx)(d, {
								icon: Tt,
								"aria-label": "选择整理路径",
								...V(I.isPending),
								onClick: () => I.mutate({
									initial: S || a.find((e) => e.location === f)?.roots[0] || "",
									location: f,
									path: S
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, Q.jsx)("p", {
						className: "text-caption-1-regular text-text-secondary",
						children: "指定路径时包含子目录，目录模板以该路径为起点。模板均留空时只清理文件名。"
					}),
					I.isError ? /* @__PURE__ */ (0, Q.jsx)(T, {
						tone: "error",
						title: "目录选择失败",
						children: K("{error}；也可直接输入路径。", { error: W(I.error) })
					}) : null,
					/* @__PURE__ */ (0, Q.jsx)(p, {
						label: "文件名模板",
						placeholder: "{code}[ {title}]",
						value: _.file,
						ref: k,
						spellCheck: "false",
						isInvalid: D === "file",
						onFocus: () => {
							ee("file"), P.current = !0;
						},
						onChange: (e) => ue({ file: e })
					}),
					/* @__PURE__ */ (0, Q.jsx)(p, {
						label: "目录模板",
						placeholder: "留空表示原地改名",
						value: _.dir,
						ref: A,
						spellCheck: "false",
						isInvalid: D === "dir",
						onFocus: () => {
							ee("dir"), P.current = !0;
						},
						onChange: (e) => ue({ dir: e })
					}),
					i?.presets?.length ? /* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "flex flex-col gap-2",
						role: "group",
						"aria-label": "套用模板",
						children: [/* @__PURE__ */ (0, Q.jsx)("p", {
							className: "text-caption-1-medium text-text-secondary",
							children: "套用模板"
						}), /* @__PURE__ */ (0, Q.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: i.presets.map((t) => /* @__PURE__ */ (0, Q.jsx)(e, {
								variant: "secondary",
								size: "small",
								title: t.example || t.label,
								className: "max-w-full [&>span]:min-w-0 [&>span]:shrink",
								onClick: () => {
									ue({
										file: t.file,
										dir: t.dir
									}), P.current = !1;
								},
								children: /* @__PURE__ */ (0, Q.jsx)("span", {
									className: "truncate",
									children: t.label
								})
							}, t.label))
						})]
					}) : null,
					/* @__PURE__ */ (0, Q.jsxs)("p", {
						"aria-live": "polite",
						"aria-busy": M.isFetching,
						"data-organize-example": "",
						className: "text-caption-1-regular text-text-secondary",
						children: ["路径示例：", /* @__PURE__ */ (0, Q.jsx)("code", {
							className: "wrap-anywhere",
							children: M.data?.example || M.data?.error || (M.isError ? W(M.error) : "正在预览…")
						})]
					}),
					i?.placeholders?.length ? /* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "flex flex-col gap-2",
						role: "group",
						"aria-label": "插入参数",
						children: [/* @__PURE__ */ (0, Q.jsxs)("p", {
							className: "text-caption-1-regular text-text-secondary",
							"aria-live": "polite",
							children: [
								/* @__PURE__ */ (0, Q.jsx)("strong", {
									className: "text-caption-1-semibold text-text-primary",
									children: "插入参数"
								}),
								"（到",
								N === "file" ? "文件名模板" : "目录模板",
								"）"
							]
						}), /* @__PURE__ */ (0, Q.jsx)("div", {
							className: "flex flex-wrap gap-1",
							children: i.placeholders.map((t) => /* @__PURE__ */ (0, Q.jsx)(e, {
								variant: "ghost",
								size: "small",
								"aria-label": `${t.label} {${t.key}}`,
								onClick: () => de(t.key),
								children: /* @__PURE__ */ (0, Q.jsxs)("span", {
									className: "inline-flex flex-wrap items-center gap-x-1.5",
									children: [/* @__PURE__ */ (0, Q.jsx)("code", { children: `{${t.key}}` }), /* @__PURE__ */ (0, Q.jsx)("span", {
										className: "text-text-secondary",
										children: t.label
									})]
								})
							}, t.key))
						})]
					}) : null,
					/* @__PURE__ */ (0, Q.jsx)("p", {
						className: "text-caption-1-regular leading-4.5 text-text-secondary",
						children: "点击参数插入光标处，选中文字可替换。方括号里的内容在字段为空时整段省略。"
					})
				]
			}),
			/* @__PURE__ */ (0, Q.jsx)("div", {
				"aria-live": "polite",
				className: "mt-3 flex flex-col gap-2 empty:hidden",
				children: B
			})
		]
	});
}
// src/react/data-cleanup/orphan-records-card.tsx
var qt = J("play"), Jt = () => q.invalidateQueries({
	queryKey: D,
	exact: !0
});
function Yt({ item: t, toast: n }) {
	let [r, i] = (0, Z.useState)(t.candidates[0]?.id ?? null), a = vt({
		mutationFn: () => B(t.id, Number(r)),
		onSuccess: () => {
			let e = t.candidates.find((e) => e.id === r);
			n(`已将「${t.name}」的个人记录转移到「${e?.name ?? "所选文件"}」`), Jt();
		},
		onError: (e) => n(W(e))
	}), o = vt({
		mutationFn: () => tt(t.id),
		onSuccess: (e) => {
			n(e.blocked.length ? `「${t.name}」的文件已恢复，记录未删除；下次扫描后恢复为在库状态` : `已删除「${t.name}」的作品记录及个人记录`), Jt();
		}
	}), s = () => {
		U({
			title: "删除记录",
			body: `将删除「${t.name}」的作品记录${nt(t.records) ? `及其个人记录（${nt(t.records)}）` : ""}。此操作不可撤销。`,
			confirmLabel: "删除记录",
			danger: !0,
			onConfirm: () => o.mutateAsync()
		});
	}, c = a.isPending || o.isPending;
	return /* @__PURE__ */ (0, Q.jsxs)("span", {
		className: "flex min-w-0 flex-wrap items-center gap-2",
		children: [
			/* @__PURE__ */ (0, Q.jsx)(e, {
				variant: "danger",
				size: "small",
				...V(c),
				onClick: s,
				children: "删除记录"
			}),
			t.candidates.length ? /* @__PURE__ */ (0, Q.jsx)(re, {
				"aria-label": `选择接收 ${t.name} 个人记录的文件`,
				prefix: "接收",
				className: "w-52",
				selectedKey: r,
				onSelectionChange: (e) => {
					e !== null && i(Number(e));
				},
				children: t.candidates.map((e) => /* @__PURE__ */ (0, Q.jsx)(ie, {
					id: e.id,
					textValue: H(e),
					children: H(e)
				}, e.id))
			}) : null,
			t.candidates.length ? /* @__PURE__ */ (0, Q.jsx)(e, {
				variant: "primary",
				size: "small",
				disabled: r === null,
				...V(c),
				onClick: () => a.mutate(),
				children: "转移记录"
			}) : null
		]
	});
}
function Xt({ item: e }) {
	return /* @__PURE__ */ (0, Q.jsxs)("span", {
		className: "flex min-w-0 items-center gap-3",
		children: [/* @__PURE__ */ (0, Q.jsxs)("span", {
			className: "relative inline-grid aspect-16/10 w-24 flex-none place-items-center max-cleanup-tight:hidden overflow-hidden rounded-lg border border-separator-border bg-background-tertiary-default text-text-tertiary",
			children: [/* @__PURE__ */ (0, Q.jsx)(qt, {
				"aria-hidden": !0,
				className: "size-5"
			}), e.has_thumb ? /* @__PURE__ */ (0, Q.jsx)("img", {
				src: `/thumb?id=${e.id}&c=4`,
				alt: "",
				loading: "lazy",
				onError: (e) => e.currentTarget.remove(),
				className: "absolute inset-0 size-full object-contain"
			}) : null]
		}), /* @__PURE__ */ (0, Q.jsxs)("span", {
			className: "flex min-w-0 flex-1 flex-col gap-0.5",
			children: [/* @__PURE__ */ (0, Q.jsx)("span", {
				title: e.name,
				className: "truncate text-body-regular text-text-primary",
				children: e.name
			}), /* @__PURE__ */ (0, Q.jsx)("small", {
				className: "truncate text-caption-1-regular text-text-secondary",
				children: [e.code, y[e.location] || e.location].filter(Boolean).join(" · ")
			})]
		})]
	});
}
function Zt({ toast: t }) {
	let [n, r] = (0, Z.useState)([]), i = X({
		queryKey: D,
		queryFn: ({ signal: e }) => Pe(e)
	}), a = i.data?.items ?? [], o = vt({
		mutationFn: (e) => tt(e),
		onSuccess: (e) => {
			t(`已删除 ${e.purged} 条作品记录及其个人记录${e.blocked.length ? `；${e.blocked.length} 条文件已恢复，记录未删除` : ""}`), r([]), Jt();
		}
	}), s = (e) => void U({
		title: "删除所选记录",
		body: `将删除以下 ${e.length} 条作品记录及其全部个人记录。此操作不可撤销。`,
		items: e.map((e) => e.name),
		confirmLabel: "删除所选记录",
		danger: !0,
		onConfirm: () => o.mutateAsync(e.map((e) => e.id))
	}), u = [
		{
			id: "item",
			label: "作品",
			width: 480,
			min: 320,
			value: (e) => e.name,
			render: (e) => /* @__PURE__ */ (0, Q.jsx)(Xt, { item: e })
		},
		{
			id: "records",
			label: "个人记录",
			width: 176,
			min: 144,
			value: (e) => nt(e.records),
			render: (e) => /* @__PURE__ */ (0, Q.jsx)("span", {
				className: "block min-w-0 whitespace-normal wrap-anywhere",
				children: nt(e.records) || "无"
			})
		},
		{
			id: "target",
			label: "操作",
			width: a.some((e) => e.candidates.length) ? 360 : 128,
			min: 128,
			value: (e) => e.candidates.length,
			render: (e) => /* @__PURE__ */ (0, Q.jsx)(Yt, {
				item: e,
				toast: t
			})
		}
	];
	return /* @__PURE__ */ (0, Q.jsx)("section", {
		id: "orphan-records",
		"aria-labelledby": "orphan-records-title",
		className: "flex scroll-mt-20 flex-col gap-4",
		children: i.isError ? /* @__PURE__ */ (0, Q.jsxs)(c, {
			layout: "stack",
			labelledBy: "orphan-records-title",
			children: [/* @__PURE__ */ (0, Q.jsx)(l, {
				id: "orphan-records-title",
				children: "文件已丢失的记录"
			}), /* @__PURE__ */ (0, Q.jsx)(T, {
				tone: "error",
				title: "读取文件已丢失的记录失败",
				children: W(i.error)
			})]
		}) : /* @__PURE__ */ (0, Q.jsx)(St, {
			label: "文件已消失的作品",
			items: a,
			columns: u,
			title: "文件已丢失的记录",
			titleId: "orphan-records-title",
			unit: "条作品",
			description: "这些作品的源文件已删除，喜欢、稍后看、播放列表与观看历史仍保留。选择替代文件后，这些记录会转移到该文件，旧作品记录随之删除。",
			rowId: (e) => String(e.id),
			rowLabel: (e) => e.name,
			selected: n,
			onSelected: r,
			actions: (t) => /* @__PURE__ */ (0, Q.jsx)(e, {
				variant: "danger",
				size: "small",
				disabled: !t.length,
				...V(o.isPending),
				onClick: () => s(t),
				children: `删除所选记录（${t.length}）`
			})
		})
	});
}
// src/react/data-cleanup/performer-delete-card.tsx
var Qt = "勾选女优，永久删除她们在全部来源中的影片文件、影片资料和观看记录，包括回收站中的影片。女优档案和照片保留。共同出演的同一文件只删除一次。";
function $t({ person: e }) {
	let t = ye("performer", e.k, e.entity_id), n = qe("performer", e.k, e.entity_id);
	return /* @__PURE__ */ (0, Q.jsxs)("a", {
		href: xe("performer", e.k, e.entity_id),
		title: n || t,
		className: "flex min-w-0 items-center gap-3 text-text-primary",
		children: [/* @__PURE__ */ (0, Q.jsx)("span", {
			"aria-hidden": !0,
			className: _e("relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-background-quaternary-default text-caption-1-medium", wt),
			dangerouslySetInnerHTML: { __html: `<span>${Se(Ve(t))}</span>` + be({
				kind: "performer",
				id: e.entity_id,
				hasImage: e.has_image,
				version: e.image_version,
				focus: e.avatar_focus,
				thumb: !0
			}) }
		}), /* @__PURE__ */ (0, Q.jsx)("span", {
			className: "min-w-0 wrap-anywhere",
			children: t
		})]
	});
}
function en({ toast: t }) {
	_t();
	let n = X({
		queryKey: O,
		queryFn: ({ signal: e }) => Ce(e)
	}), [r, i] = (0, Z.useState)([]), [a, o] = (0, Z.useState)(""), [s, u] = (0, Z.useState)(!1), [d, p] = (0, Z.useState)(null), [m, h] = (0, Z.useState)(""), g = (0, Z.useRef)(null);
	(0, Z.useEffect)(() => () => g.current?.abort(), []);
	let _ = (0, Z.useMemo)(() => [
		{
			id: "name",
			label: "女优",
			width: 280,
			min: 160,
			value: (e) => e.k,
			render: (e) => /* @__PURE__ */ (0, Q.jsx)($t, { person: e })
		},
		{
			id: "works",
			label: "影片",
			width: 104,
			min: 80,
			value: (e) => e.n,
			render: (e) => `${e.n.toLocaleString()} 部`
		},
		{
			id: "files",
			label: "文件",
			width: 104,
			min: 80,
			value: (e) => e.file_count,
			render: (e) => `${e.file_count.toLocaleString()} 个`
		},
		{
			id: "bytes",
			label: "登记大小",
			width: 136,
			min: 104,
			value: (e) => e.bytes,
			render: (e) => G(e.bytes)
		}
	], []), v = a.toLocaleLowerCase(), y = (n.data?.items || []).filter((e) => !v || [
		e.k,
		ye("performer", e.k, e.entity_id),
		...e.aliases
	].some((e) => e.toLocaleLowerCase().includes(v))), b = async (e, n) => {
		if (s) return;
		u(!0), h("");
		let r = new AbortController();
		g.current = r;
		try {
			let i = await we(e.map((e) => e.entity_id), r.signal);
			if (r.signal.throwIfAborted(), !i.total) {
				t("所选女优没有可删除的影片");
				return;
			}
			let a = i.performers.map((e) => ye("performer", e.name, e.id)), o = [...new Set(i.items.map((e) => e.code || e.name || `#${e.id}`))], s = await U({
				title: "删除所选女优的全部影片",
				body: K("将永久删除 {names} 关联的 {total} 个影片文件（登记大小 {bytes}）。", {
					names: a.slice(0, 5).join(Ge()) + (a.length > 5 ? K("等 {count} 位女优", { count: a.length }) : ""),
					total: i.total,
					bytes: G(i.bytes)
				}) + K("范围包含全部来源和回收站，不受当前搜索、排序或分页影响。文件、影片资料和观看记录将永久删除，无法恢复；女优档案和照片保留。") + (i.shared ? K("其中 {shared} 个文件还关联了未勾选的女优，删除后也会从她们的作品中消失。", { shared: i.shared }) : "") + K("涉及：{examples}。", { examples: o.slice(0, 5).join(Ge()) + (o.length > 5 ? K("等 {count} 部作品", { count: o.length }) : "") }),
				confirmLabel: "永久删除影片",
				danger: !0,
				onConfirm: () => ve(i)
			});
			if (!s.confirmed) return;
			let c = s.result;
			p(c), n(), await Promise.all([q.invalidateQueries({
				queryKey: O,
				exact: !0
			}), q.invalidateQueries({
				queryKey: z,
				exact: !0
			})]), t(K("已永久删除 {purged} 个影片文件", { purged: c.purged }) + (c.blocked.length ? K("，{count} 个未删除", { count: c.blocked.length }) : ""));
		} catch (e) {
			r.signal.aborted || h(W(e));
		} finally {
			r.signal.aborted || u(!1);
		}
	}, x = d ? [
		...d.blocked,
		...d.cleanup_pending,
		...d.cache_blocked.map((e) => ({
			path: e.name,
			reason: e.reason
		}))
	] : [];
	return /* @__PURE__ */ (0, Q.jsxs)("section", {
		id: "batch-delete",
		className: "flex min-w-0 scroll-mt-20 flex-col gap-3",
		"aria-label": "批量删除",
		children: [
			n.isPending || n.isError ? /* @__PURE__ */ (0, Q.jsxs)(c, {
				layout: "stack",
				labelledBy: "batch-delete-title",
				children: [/* @__PURE__ */ (0, Q.jsx)(l, {
					id: "batch-delete-title",
					children: "批量删除"
				}), n.isError ? /* @__PURE__ */ (0, Q.jsx)(T, {
					tone: "error",
					title: "读取女优列表失败",
					action: /* @__PURE__ */ (0, Q.jsx)(e, {
						variant: "secondary",
						size: "small",
						onClick: () => void n.refetch(),
						children: "重试"
					}),
					children: W(n.error)
				}) : /* @__PURE__ */ (0, Q.jsx)("p", {
					role: "status",
					className: "text-body-regular text-text-secondary",
					children: "正在读取女优列表…"
				})]
			}) : /* @__PURE__ */ (0, Q.jsx)(St, {
				label: "女优影片",
				title: "批量删除",
				titleId: "batch-delete-title",
				unit: "位女优",
				description: Qt,
				items: y,
				columns: _,
				rowId: (e) => String(e.entity_id),
				rowLabel: (e) => ye("performer", e.k, e.entity_id),
				selected: r,
				onSelected: i,
				toolbarActions: /* @__PURE__ */ (0, Q.jsx)(f, {
					label: "搜索女优姓名或别名",
					value: a,
					onQuery: (e) => {
						o(e), i([]);
					}
				}),
				actions: (t, n) => /* @__PURE__ */ (0, Q.jsx)(e, {
					variant: "danger",
					size: "small",
					...V(s),
					onClick: () => void b(t, n),
					children: "删除所选女优影片"
				})
			}),
			m ? /* @__PURE__ */ (0, Q.jsx)(T, {
				tone: "error",
				title: "未能读取删除清单",
				children: m
			}) : null,
			d ? /* @__PURE__ */ (0, Q.jsx)(T, {
				tone: x.length ? "warning" : "info",
				title: K("已永久删除 {purged} 个影片文件", { purged: d.purged }),
				extra: x.length ? /* @__PURE__ */ (0, Q.jsx)("div", {
					className: "flex flex-col gap-2 text-body-2-regular wrap-anywhere",
					children: x.slice(0, 5).map((e, t) => /* @__PURE__ */ (0, Q.jsxs)("p", { children: [
						e.path,
						"（",
						e.reason,
						"）"
					] }, t))
				}) : null,
				children: x.length ? K("{blocked} 个文件未能删除，馆藏记录仍保留；{cleanup_pending} 个隔离文件和 {cache_blocked} 个缓存文件待清理。", {
					blocked: d.blocked.length,
					cleanup_pending: d.cleanup_pending.length,
					cache_blocked: d.cache_blocked.length
				}) : "所选影片及关联记录已删除，女优档案和照片保留。"
			}) : null
		]
	});
}
// src/react/data-cleanup/resource-sync-card.tsx
var tn = J("git-compare"), nn = J("rotate-cw"), rn = "暂时无法读取进度，正在重新连接…", an = "清理失效条目", on = "inline-grid w-full grid-flow-col auto-cols-fr gap-4 max-plain-stat-pair:grid-flow-row max-plain-stat-pair:grid-cols-2 max-plain-stat-single:grid-cols-1", $ = (e) => Number(e || 0).toLocaleString();
function sn({ scan: e, partial: t = !1 }) {
	let n = e.cache ?? {
		files: 0,
		bytes: 0
	};
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)("div", {
		className: on,
		children: (e.sources ?? []).map((e) => /* @__PURE__ */ (0, Q.jsxs)("article", {
			className: Xe(),
			children: [/* @__PURE__ */ (0, Q.jsx)(A, {
				label: L[e.location] || K("媒体来源"),
				mark: /* @__PURE__ */ (0, Q.jsx)(ae, { mark: w[e.location] ?? "database" }),
				aside: /* @__PURE__ */ (0, Q.jsx)(Et, {
					online: e.online,
					children: e.online ? "可访问" : "离线"
				}),
				figure: e.online ? `${$(e.missing)} 项` : "—",
				meta: e.online ? lt(e) : `${lt(e)} · 本次已跳过`,
				wrapMeta: !0
			}), e.online && e.unreadable > 0 ? /* @__PURE__ */ (0, Q.jsx)("span", {
				className: "self-start",
				children: /* @__PURE__ */ (0, Q.jsx)(oe, {
					tone: "warning",
					children: K("{unreadable} 个目录未读取", { unreadable: $(e.unreadable) })
				})
			}) : null]
		}, e.location))
	}), !t && /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: on,
		children: [
			/* @__PURE__ */ (0, Q.jsx)("article", {
				className: Xe(),
				children: /* @__PURE__ */ (0, Q.jsx)(A, {
					label: K("待永久删除"),
					figure: K("{scan} 项", { scan: $(et(e)) }),
					meta: K("文件已不在盘上，含回收站")
				})
			}),
			/* @__PURE__ */ (0, Q.jsx)("article", {
				className: Xe(),
				children: /* @__PURE__ */ (0, Q.jsx)(A, {
					label: K("将标为已消失"),
					figure: K("{vanish} 项", { vanish: $(e.vanish) }),
					meta: K("带个人记录，记录留着")
				})
			}),
			/* @__PURE__ */ (0, Q.jsx)("article", {
				className: Xe(),
				children: /* @__PURE__ */ (0, Q.jsx)(A, {
					label: K("空文件夹"),
					figure: K("{empty} 个", { empty: $(e.empty) }),
					meta: K("保留来源根目录")
				})
			}),
			/* @__PURE__ */ (0, Q.jsx)("article", {
				className: Xe(),
				children: /* @__PURE__ */ (0, Q.jsx)(A, {
					label: K("可清理的缓存"),
					figure: K("{files} 个", { files: $(n.files) }),
					meta: n.files ? G(n.bytes) : ""
				})
			})
		]
	})] });
}
function cn({ toast: t }) {
	let n = Y({
		queryKey: P,
		queryFn: ({ signal: e }) => Le(e),
		start: pt,
		onFinish: (e) => {
			if (q.invalidateQueries({
				queryKey: z,
				exact: !0
			}), q.invalidateQueries({
				queryKey: te,
				exact: !0
			}), e.status !== "complete") return;
			let { done: n, left: r } = fe(e);
			r ? t(K("已完成 {done} 项，{left} 项没有处理", {
				done: $(n),
				left: $(r)
			}), { warning: !0 }) : t(K("已清理失效条目"));
		}
	}), r = Y({
		queryKey: te,
		queryFn: ({ signal: e }) => Re(e),
		start: mt,
		onStarted: () => n.dismiss()
	}), i = r.job, a = r.running || r.start.isPending, o = n.running || n.start.isPending, s = i?.status === "complete" || i?.status === "failed", u = K(a ? "扫描中" : s ? "重新扫描" : "检查文件"), d = (e) => void U({
		title: K(an),
		body: de(e),
		confirmLabel: K(an),
		danger: !0,
		onConfirm: () => n.start.mutateAsync(e.scan_id || "")
	}), f = n.outcome, p = (e) => {
		let t = fe(e).left > 0;
		return /* @__PURE__ */ (0, Q.jsx)(T, {
			tone: t ? "warning" : "success",
			title: K(t ? "部分完成" : "清理结果"),
			children: me(e, G)
		});
	}, m = null, h = null;
	if (f?.status === "failed") h = /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "error",
		title: K("资源清理未完成"),
		children: f.error || K("请查看任务记录，核对已处理的文件。")
	});
	else if (f) h = p(f);
	else if (n.running) m = /* @__PURE__ */ (0, Q.jsx)(se, {
		embedded: !0,
		label: n.job?.message || "正在复核并清理失效条目"
	});
	else if (r.start.isError) h = /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "error",
		title: K("扫描失败"),
		children: W(r.start.error)
	});
	else if (r.query.isError && i) h = /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "neutral",
		title: K("任务状态"),
		children: K(rn)
	});
	else if (i?.status === "running") {
		let e = st(i);
		m = /* @__PURE__ */ (0, Q.jsx)(se, {
			embedded: !0,
			label: e,
			value: i.completed_sources,
			total: i.total_sources
		}), i.sources?.length && (h = /* @__PURE__ */ (0, Q.jsx)(sn, {
			scan: i,
			partial: !0
		}));
	} else if (i?.status === "failed") h = /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [i.sources?.length ? /* @__PURE__ */ (0, Q.jsx)(sn, {
		scan: i,
		partial: !0
	}) : null, /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "error",
		title: K("扫描失败"),
		children: i.error || K("后台扫描失败")
	})] });
	else if (i?.status === "complete" && i.applied) h = n.job?.status === "complete" ? p(n.job) : /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "neutral",
		title: K("清理结果"),
		children: K("这次检查的结果已经清理，重新扫描可再核对。")
	});
	else if (i?.status === "complete") {
		let t = He(i);
		h = /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(sn, { scan: i }), t ? /* @__PURE__ */ (0, Q.jsx)(T, {
			tone: "neutral",
			title: "清理内容",
			action: /* @__PURE__ */ (0, Q.jsx)(e, {
				variant: "danger",
				...V(o),
				onClick: () => d(i),
				children: o ? "正在复核并清理…" : an
			}),
			children: pe(i)
		}) : /* @__PURE__ */ (0, Q.jsx)("p", {
			className: "mr-auto text-body-regular text-notification-success-foreground",
			children: "已检查可访问的来源，没有待清理的记录、空文件夹或缓存。"
		})] });
	}
	return n.start.isError && !f && (h = /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [h, /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "error",
		title: K("清理失败"),
		children: W(n.start.error)
	})] })), /* @__PURE__ */ (0, Q.jsxs)("section", {
		id: "resource-sync",
		"aria-labelledby": "resource-sync-title",
		className: "flex scroll-mt-20 flex-col gap-4",
		children: [/* @__PURE__ */ (0, Q.jsxs)(c, {
			layout: "split",
			labelledBy: "resource-sync-title",
			footer: /* @__PURE__ */ (0, Q.jsx)(e, {
				"data-resource-scan": !0,
				leadingIcon: s && !a ? nn : tn,
				...V(a),
				onClick: () => {
					a || r.start.mutate();
				},
				children: u
			}),
			children: [
				/* @__PURE__ */ (0, Q.jsx)(l, {
					id: "resource-sync-title",
					gap: "small",
					children: K("资源同步")
				}),
				/* @__PURE__ */ (0, Q.jsx)("p", {
					className: "max-w-190 text-body-2-regular leading-5 text-text-secondary",
					children: K("按馆藏记录逐条查找本地磁盘与网盘上的文件，列出文件已不存在的记录、空文件夹，以及不再被引用的缓存。")
				}),
				/* @__PURE__ */ (0, Q.jsx)("div", {
					"aria-live": "polite",
					className: "mt-4 empty:hidden",
					children: m
				})
			]
		}), /* @__PURE__ */ (0, Q.jsx)("div", {
			"aria-live": "polite",
			className: "flex flex-col gap-4 empty:hidden",
			children: h
		})]
	});
}
// src/react/data-cleanup/data-cleanup-tool-page.tsx
function ln({ toast: e }) {
	let t = X({
		queryKey: C,
		queryFn: ({ signal: e }) => je(e)
	});
	return t.isError ? /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "error",
		title: "读取媒体来源失败",
		children: W(t.error)
	}) : t.isPending ? /* @__PURE__ */ (0, Q.jsx)("p", {
		role: "status",
		children: "正在读取媒体来源…"
	}) : Ue(t.data) ? /* @__PURE__ */ (0, Q.jsx)(cn, { toast: e }) : /* @__PURE__ */ (0, Q.jsxs)(c, {
		layout: "stack",
		label: "资源同步",
		children: [
			/* @__PURE__ */ (0, Q.jsx)(l, { children: "资源同步" }),
			/* @__PURE__ */ (0, Q.jsx)("p", {
				className: "text-body-regular text-text-secondary",
				children: "尚未配置可核对的媒体目录。"
			}),
			/* @__PURE__ */ (0, Q.jsx)("a", {
				href: "/settings/library",
				className: "text-body-medium text-accent-600 underline",
				children: "配置媒体库"
			})
		]
	});
}
function un({ tool: e, toast: t, failure: n }) {
	let r = (e) => t(e), i;
	switch (e) {
		case "organize":
			i = /* @__PURE__ */ (0, Q.jsx)(Kt, {
				toast: r,
				failure: n
			});
			break;
		case "resource-sync":
			i = /* @__PURE__ */ (0, Q.jsx)(ln, { toast: t });
			break;
		case "orphan-records":
			i = /* @__PURE__ */ (0, Q.jsx)(Zt, { toast: r });
			break;
		case "media-repair":
			i = /* @__PURE__ */ (0, Q.jsx)(jt, { toast: r });
			break;
		case "links":
			i = /* @__PURE__ */ (0, Q.jsx)(Vt, {});
			break;
		case "batch-delete": i = /* @__PURE__ */ (0, Q.jsx)(en, { toast: r });
	}
	return /* @__PURE__ */ (0, Q.jsx)(bt, { children: i });
}
// src/react/data-cleanup/data-cleanup-page.tsx
function dn(e, t) {
	return e.data === void 0 ? e.isError ? {
		figure: "读取失败",
		state: "error"
	} : {
		figure: "正在读取…",
		state: "loading"
	} : t(e.data);
}
function fn({ section: e, label: t, icon: n, value: r, open: i }) {
	return /* @__PURE__ */ (0, Q.jsx)("button", {
		type: "button",
		className: Xe({ interactive: !0 }),
		"data-cleanup-go": e,
		"data-entry-state": r.state,
		"aria-busy": r.state === "loading" || void 0,
		onClick: () => i(e),
		children: /* @__PURE__ */ (0, Q.jsx)(A, {
			label: t,
			icon: n,
			figure: r.figure,
			meta: r.meta
		})
	});
}
function pn({ tool: e, navigate: t }) {
	let n = J(e.icon);
	return /* @__PURE__ */ (0, Q.jsx)(Ot, {
		label: e.title,
		icon: n,
		summary: e.description,
		attributes: { "data-cleanup-tool": e.key },
		onOpen: () => t(e.path + location.search)
	});
}
var mn = J("square-check-big"), hn = J("sparkles"), gn = J("file-stack"), _n = J("file-archive"), vn = J("trash"), yn = () => {
	for (let e of [
		I,
		M,
		s,
		m
	]) q.invalidateQueries({
		queryKey: e,
		exact: !0
	});
};
function bn({ toast: e, open: t, navigate: a }) {
	let o = X({
		queryKey: I,
		queryFn: ({ signal: e }) => ze(e)
	}), c = X({
		queryKey: M,
		queryFn: ({ signal: e }) => Fe(e)
	}), l = X({
		queryKey: s,
		queryFn: ({ signal: e }) => Te(e)
	}), u = X({
		queryKey: m,
		queryFn: ({ signal: e }) => Ee(e)
	}), d = X({
		queryKey: z,
		queryFn: ({ signal: e }) => Be(e)
	});
	return (0, Z.useEffect)(() => {
		let e = r[location.hash];
		e && ct(e + location.search, { replace: !0 });
	}, []), /* @__PURE__ */ (0, Q.jsxs)(bt, { children: [
		/* @__PURE__ */ (0, Q.jsxs)("section", {
			"aria-labelledby": "cleanup-pending",
			className: "flex flex-col gap-4",
			children: [/* @__PURE__ */ (0, Q.jsx)(R, {
				id: "cleanup-pending",
				children: "待处理事项"
			}), /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: k,
				children: [
					/* @__PURE__ */ (0, Q.jsx)(fn, {
						section: "review",
						label: "人工复核",
						icon: mn,
						open: t,
						value: dn(o, ot)
					}),
					/* @__PURE__ */ (0, Q.jsx)(fn, {
						section: "duplicates",
						label: "重复文件",
						icon: gn,
						open: t,
						value: dn(l, (e) => Number(e.total || 0) ? {
							figure: `${Number(e.total).toLocaleString()} 组 · ${Number(e.files || 0).toLocaleString()} 个文件`,
							meta: `可回收 ${G(e.reclaimable || 0)}`
						} : { figure: "没有重复内容" })
					}),
					/* @__PURE__ */ (0, Q.jsx)(fn, {
						section: "ads",
						label: "垃圾文件",
						icon: _n,
						open: t,
						value: dn(u, (e) => ({
							figure: `${Number(e.pending_total || 0).toLocaleString()} 个待判断`,
							meta: We(e)
						}))
					}),
					/* @__PURE__ */ (0, Q.jsx)(fn, {
						section: "quality",
						label: "高清版",
						icon: hn,
						open: t,
						value: dn(c, (e) => ({ figure: `${Number(e.total || 0).toLocaleString()} 个待升级` }))
					}),
					/* @__PURE__ */ (0, Q.jsx)(fn, {
						section: "trash",
						label: "回收站",
						icon: vn,
						open: t,
						value: dn(d, (e) => ({
							figure: `${Number(e.total || 0).toLocaleString()} 项在回收站`,
							meta: e.total ? `占用 ${G(e.bytes || 0)}` : "查看和还原已移入回收站的内容"
						}))
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, Q.jsx)("div", {
			id: "libraryProcessing",
			className: "scroll-mt-20",
			children: /* @__PURE__ */ (0, Q.jsx)(b, {
				toast: (t) => e(t),
				monitor: !0,
				onComplete: yn
			})
		}),
		/* @__PURE__ */ (0, Q.jsxs)("section", {
			"aria-labelledby": "cleanup-maintenance",
			className: "flex flex-col gap-4",
			children: [/* @__PURE__ */ (0, Q.jsx)(R, {
				id: "cleanup-maintenance",
				children: "整理与维护"
			}), /* @__PURE__ */ (0, Q.jsx)("div", {
				className: n,
				children: i.filter((e) => e.key !== "batch-delete").map((e) => /* @__PURE__ */ (0, Q.jsx)(pn, {
					tool: e,
					navigate: a
				}, e.key))
			})]
		}),
		/* @__PURE__ */ (0, Q.jsxs)("section", {
			"aria-labelledby": "cleanup-deletion",
			className: "flex flex-col gap-4",
			children: [/* @__PURE__ */ (0, Q.jsx)(R, {
				id: "cleanup-deletion",
				children: "清理与删除"
			}), /* @__PURE__ */ (0, Q.jsx)("div", {
				className: n,
				children: i.filter((e) => e.key === "batch-delete").map((e) => /* @__PURE__ */ (0, Q.jsx)(pn, {
					tool: e,
					navigate: a
				}, e.key))
			})]
		})
	] });
}
export { bn as DataCleanupPage, un as DataCleanupToolPage };

//# debugId=cdbdb03d-1635-4685-8aa0-070fadbf0237