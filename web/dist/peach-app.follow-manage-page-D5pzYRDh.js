(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "d288ec2d-28e5-4abb-9428-670c3d5925eb", e._sentryDebugIdIdentifier = "sentry-dbid-d288ec2d-28e5-4abb-9428-670c3d5925eb");
	} catch {}
})();
import { createPaginatedRowModel as e } from "./peach-app.createPaginatedRowModel-ClHnhG_T.js";
import { createSortedRowModel as t, useTableSelection as n } from "./peach-app.use-table-selection-BSdXI_Nc.js";
import { $2ec61d1d4f780267$export$a8a3e93435678ff9 as r, $542a13ca2fa5b484$export$5b6b19405a83ff9d as i, $76d00c5a4edb230a$export$76ccd210b9029917 as a, $76d00c5a4edb230a$export$816b5d811295e6bc as o, $76d00c5a4edb230a$export$b59bdbef9ce70de2 as s, $76d00c5a4edb230a$export$f6f0c3fe4ec306ea as c, $76d00c5a4edb230a$export$f850895b287ef28e as l, $b4f18e3395fe64d7$export$3d96ec278d3efce4 as u, $b4f18e3395fe64d7$export$3e41faf802a29e71 as d, $b4f18e3395fe64d7$export$b2539bed5023c21c as f, $ea3928288112382f$export$439d29a4e110a164 as p, $l as m, Button as h, ButtonLink as ee, Bx as g, Checkbox as _, ChevronSortDown as te, Chip as v, DataTableFooter as y, DataTableFrame as ne, DataTableSort as b, EmptyFocusButton as x, EmptyState as S, ErrorText as C, ExternalLink as w, FEEDS_KEY as re, FOLLOW_CREDENTIALS_KEY as ie, FOLLOW_MANAGE_KEY as T, FOLLOW_MANAGE_NAV as E, FOLLOW_RESOLVE_KEY as D, FieldLabel as O, Help as k, Input as A, LoadingDots as j, M6 as M, MENU_ITEM as N, MENU_ITEM_INTERACTIVE as P, MENU_POPOVER_SURFACE as F, ModalFrame as I, Note as L, P7 as ae, SORT_DEFAULT_DIR as R, STAT_STRIP_SIX as z, SelectionDock as B, SelectionPopover as V, SiteLabel as oe, Switch as se, Table as ce, TableColumnControls as le, TableColumnResizer as ue, TableSelectionHeader as de, TagManager as H, TaskProgress as U, Wt as W, Xf as fe, __toESM as pe, addAlias as me, addSource as he, avatarInner as G, busyProps as K, cardClass as ge, checkFeeds as _e, columnVisibilityFeature as ve, confirmModal as ye, createColumnHelper as be, credentialDone as xe, cx as q, dZ as Se, errorHeadline as J, errorMessage as Y, feedIntervalText as Ce, fetchCredentials as we, fetchFeeds as Te, fetchFollow as Ee, fetchResolveJob as De, fetchSuggestions as Oe, flexRender as ke, followFeedByName as Ae, followSuggestKey as je, groupByAuthor as Me, isBroken as Ne, isLayout as Pe, keepSelected as Fe, listSeparator as Ie, localTime as Le, lookupFeedActor as Re, mapLimit as ze, pageSizeOf as Be, pageWindow as Ve, phrase as X, pv as He, queryClient as Ue, reloadFollowManage as We, removeAlias as Ge, removeFeed as Ke, renameAliasGroup as qe, require_jsx_runtime as Je, require_react as Ye, resolveFollowSort as Xe, rowPaginationFeature as Ze, rowSelectionFeature as Qe, rowSortingFeature as $e, setFeedEnabled as et, startCheck as tt, startResolve as nt, tableFeatures as rt, useAction as it, useBackgroundJob as at, useMutation as ot, useQuery as st, useTable as ct, useTablePreferences as lt } from "./peach-app.js";
import { Page as ut } from "./peach-app.page-QAncjzM1.js";
import { LEGACY_AVATAR_IMG as dt } from "./peach-app.legacy-avatar-NSITxLRS.js";
import { PillAriaTabList as ft } from "./peach-app.pill-aria-tab-list-BMY1ZEv1.js";
import { AuthorAvatar as pt, SourceIcon as mt } from "./peach-app.source-view-qoHWj3C_.js";
import { SourceList as ht } from "./peach-app.source-list-RGzNNKB-.js";
// src/react/follow-manage/add-source.tsx
var Z = /* @__PURE__ */ pe(Ye(), 1), Q = Je(), gt = q(N, P, "text-body-2-medium"), _t = "粘贴来源链接，或输入创作者名、id…", vt = "添加创作者关注", yt = "查找中（首次按名字查要下载创作者索引，可能几十秒）", bt = "识别中", xt = "站内没有查到来源", St = "/settings/subscriptions", Ct = (e, t) => `${e}:${t.url}`;
function wt({ field: e, menu: t, options: n, active: r, busy: a, onPick: o, onClose: s }) {
	return (0, Z.useEffect)(() => {
		t.current?.querySelector("[aria-current=\"true\"]")?.scrollIntoView({ block: "nearest" });
	}, [t, r]), /* @__PURE__ */ (0, Q.jsxs)(i, {
		ref: t,
		triggerRef: e,
		isOpen: !0,
		isNonModal: !0,
		shouldFlip: !1,
		onOpenChange: (e) => {
			e || s();
		},
		placement: "bottom start",
		offset: 4,
		"aria-label": X("来源建议"),
		className: q(F, "flex w-(--trigger-width) flex-col gap-1 overscroll-contain"),
		children: [a && !n.length ? /* @__PURE__ */ (0, Q.jsx)("div", {
			className: "px-2 py-1.5",
			children: /* @__PURE__ */ (0, Q.jsx)(j, { label: X("正在查找建议") })
		}) : null, n.map((e, t) => /* @__PURE__ */ (0, Q.jsxs)(Z.Fragment, { children: [e.group === n[t - 1]?.group ? null : /* @__PURE__ */ (0, Q.jsx)("div", {
			className: "px-2 pt-1 text-caption-1-regular text-text-tertiary",
			children: e.group
		}), /* @__PURE__ */ (0, Q.jsxs)("button", {
			type: "button",
			"aria-current": t === r ? "true" : void 0,
			className: t === r ? q(gt, "bg-background-secondary-default") : gt,
			onMouseDown: (e) => e.preventDefault(),
			onClick: () => o(e.value),
			children: [
				/* @__PURE__ */ (0, Q.jsx)("span", {
					className: "min-w-0 grow truncate text-left",
					children: e.value
				}),
				e.matched ? /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "shrink-0 text-caption-1-regular text-text-tertiary",
					children: e.matched
				}) : null,
				e.n ? /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "shrink-0 text-caption-1-regular tabular-nums text-text-tertiary",
					children: e.n.toLocaleString()
				}) : null
			]
		})] }, `${e.group}-${e.value}`))]
	});
}
function Tt({ credentials: e, hidden: t, onHidden: n }) {
	let r = (e.providers || []).filter((e) => e.followable), i = r.filter((e) => !t.has(e.provider_label)).length, a = i === r.length ? X("全部来源") : X("{shown}/{length} 个来源", {
		shown: i,
		length: r.length
	});
	return /* @__PURE__ */ (0, Q.jsx)(V, {
		label: "来源筛选",
		triggerLabel: a,
		leadingIcon: m,
		empty: "暂无可用来源",
		items: r.map((e) => ({
			id: e.provider_label,
			selected: !t.has(e.provider_label),
			label: /* @__PURE__ */ (0, Q.jsxs)("span", {
				className: "flex min-w-0 items-center gap-1.5",
				children: [/* @__PURE__ */ (0, Q.jsx)(mt, { provider: e.provider }), e.provider_label]
			})
		})),
		onChange: (e, r) => {
			let i = new Set(t);
			r ? i.delete(e) : i.add(e), n(i);
		},
		actions: [
			{
				label: "全选",
				disabled: !r.length,
				onPress: () => n(/* @__PURE__ */ new Set())
			},
			{
				label: "全不选",
				disabled: !r.length,
				onPress: () => n(new Set(r.map((e) => e.provider_label)))
			},
			{
				label: "凭据设置",
				href: St
			}
		]
	});
}
function Et({ row: e, at: t, hidden: n, unpicked: r, onPick: i }) {
	if (e.kind === "error") return /* @__PURE__ */ (0, Q.jsx)(L, {
		tone: "error",
		title: e.line,
		children: e.error || X("查找失败")
	});
	let a = (e.candidates || []).filter((e) => !n.has(e.provider_label || "")), o = Object.entries(e.failures || {});
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: ge({
			variant: "outlined",
			padding: "none",
			className: "flex flex-col gap-2 p-4"
		}),
		children: [
			/* @__PURE__ */ (0, Q.jsx)("b", {
				className: "text-body-medium text-text-primary",
				children: e.line
			}),
			a.length ? a.map((e) => {
				let n = Ct(t, e);
				return /* @__PURE__ */ (0, Q.jsx)(_, {
					isSelected: !e.known && !r.has(n),
					isDisabled: e.known,
					onChange: (e) => i(n, e),
					children: /* @__PURE__ */ (0, Q.jsxs)("span", {
						className: "flex min-w-0 flex-wrap items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, Q.jsx)(mt, { provider: e.provider }),
							/* @__PURE__ */ (0, Q.jsx)("b", {
								className: "text-body-medium",
								children: e.provider_label
							}),
							/* @__PURE__ */ (0, Q.jsx)("span", {
								className: "min-w-0 break-words",
								children: e.label
							}),
							/* @__PURE__ */ (0, Q.jsx)("small", {
								className: "text-caption-1-regular text-text-secondary",
								children: e.known ? X("已经关注") : e.evidence
							})
						]
					})
				}, n);
			}) : /* @__PURE__ */ (0, Q.jsx)(k, { children: X(xt) }),
			(e.external_searches || []).map((e) => /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, Q.jsx)("small", {
					className: "text-caption-1-regular text-text-secondary",
					children: e.evidence
				}), /* @__PURE__ */ (0, Q.jsx)(w, {
					href: e.url,
					children: `${e.label}：${e.query}`
				})]
			}, e.url)),
			o.length ? /* @__PURE__ */ (0, Q.jsx)(k, { children: o.map(([e, t]) => `${e}：${t}`).join("；") }) : null
		]
	});
}
function Dt({ data: e, credentials: t, readOnly: n, toast: r }) {
	let [i, a] = (0, Z.useState)(""), [o, s] = (0, Z.useState)(!1), [c, l] = (0, Z.useState)(""), [u, d] = (0, Z.useState)(""), [f, p] = (0, Z.useState)(!1), [m, ee] = (0, Z.useState)(null), [g, _] = (0, Z.useState)(-1), te = (0, Z.useRef)(null), v = (0, Z.useRef)(null), [y, ne] = (0, Z.useState)(/* @__PURE__ */ new Set()), [b, x] = (0, Z.useState)(/* @__PURE__ */ new Set()), [S, C] = (0, Z.useState)(""), [w, re] = (0, Z.useState)(0);
	(0, Z.useEffect)(() => {
		let e = i.trim();
		if (o || !e || e.includes("/")) {
			d("");
			return;
		}
		let t = setTimeout(() => d(e), 250);
		return () => clearTimeout(t);
	}, [i, o]);
	let ie = st({
		queryKey: je(u),
		queryFn: ({ signal: e }) => Oe(u, e),
		enabled: u.length > 0 && f && !o && m !== i
	}), T = (0, Z.useMemo)(() => (ie.data?.groups || []).flatMap((e) => e.items.map((t) => ({
		value: t.value,
		matched: t.matched || "",
		n: t.n || 0,
		group: e.label
	}))), [ie.data]), { job: E, running: k, outcome: j, start: M, dismiss: N } = at({
		queryKey: D,
		queryFn: ({ signal: e }) => De(e),
		start: (e) => nt([e]),
		onStarted: () => x(/* @__PURE__ */ new Set()),
		onError: (e) => C(Y(e)),
		onFinish: (e) => {
			e.status === "failed" && C(e.error || X("查找失败"));
		}
	}), P = (e) => {
		let t = e.trim();
		!t || n || o || k || M.isPending || (C(""), _(-1), l(t), a(t), d(""), ee(t), M.mutate(t));
	}, F = ie.isFetching, I = f && !o && m !== i && (T.length > 0 || F), ae = () => {
		_(-1), ee(i);
	}, R = (e) => {
		if (!(o || e.nativeEvent.isComposing || e.nativeEvent.keyCode === 229)) {
			if (e.key === "Escape" && I) ae();
			else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				if (!T.length) return;
				if (e.preventDefault(), !I) {
					ee(null);
					return;
				}
				let t = e.key === "ArrowDown" ? 1 : -1;
				_((e) => {
					let n = e + t;
					return n < 0 ? T.length - 1 : n >= T.length ? 0 : n;
				});
			} else e.key === "Enter" && (e.preventDefault(), P(T[g]?.value || i));
		}
	}, z = j?.results || [], B = z.flatMap((e, t) => (e.candidates || []).filter((e) => !e.known && !y.has(e.provider_label || "")).map((e) => ({
		candidate: e,
		key: Ct(t, e)
	})).filter((e) => !b.has(e.key))), V = ot({
		mutationFn: async (e) => {
			let t = [], n = [];
			re(0);
			for (let r of e) {
				try {
					let e = await he(r.candidate);
					n.push(e.source);
				} catch (e) {
					t.push(`${r.candidate.label}：${Y(e)}`);
				}
				re((e) => e + 1);
			}
			if (n.length) try {
				await tt(n);
			} catch (e) {
				t.push(Y(e));
			}
			return {
				failures: t,
				sources: n
			};
		},
		onSuccess: (e) => {
			We(), e.failures.length ? C(e.failures.join("；")) : (C(""), N(), r(X("已添加 {length} 个关注来源", { length: e.sources.length })));
		},
		onError: (e) => C(Y(e))
	}), oe = e.suggestions || [], se = !c.includes("/");
	return /* @__PURE__ */ (0, Q.jsxs)("section", {
		"aria-label": vt,
		className: ge({
			padding: "none",
			className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
		}),
		children: [
			/* @__PURE__ */ (0, Q.jsx)("h3", {
				className: "text-title-2-medium text-text-primary",
				children: vt
			}),
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-wrap items-end gap-2",
				children: [
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						ref: te,
						className: "min-w-64 grow",
						onFocus: () => p(!0),
						onBlur: (e) => {
							let t = e.relatedTarget;
							!e.currentTarget.contains(t) && !v.current?.contains(t) && p(!1);
						},
						children: [/* @__PURE__ */ (0, Q.jsx)(A, {
							"aria-label": X("来源链接、名字或 id"),
							placeholder: X(_t),
							value: i,
							leadingIcon: He,
							enterKeyHint: "search",
							isDisabled: n,
							onChange: a,
							onCompositionStart: () => {
								s(!0), _(-1);
							},
							onCompositionEnd: (e) => {
								s(!1), a(e.currentTarget.value);
							},
							onKeyDown: R
						}), I ? /* @__PURE__ */ (0, Q.jsx)(wt, {
							field: te,
							menu: v,
							options: T,
							active: g,
							busy: F,
							onPick: P,
							onClose: ae
						}) : null]
					}),
					/* @__PURE__ */ (0, Q.jsx)(Tt, {
						credentials: t,
						hidden: y,
						onHidden: ne
					}),
					/* @__PURE__ */ (0, Q.jsx)(h, {
						variant: "primary",
						disabled: n || !i.trim(),
						...K(k || M.isPending),
						onClick: () => P(i),
						children: X("查找")
					})
				]
			}),
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				"aria-live": "polite",
				className: "flex flex-col gap-3 empty:hidden",
				children: [k || M.isPending ? /* @__PURE__ */ (0, Q.jsx)(U, {
					embedded: !0,
					label: E?.message || (E?.total ? X("查找中：{checked}/{total}", {
						checked: E.checked || 0,
						total: E.total
					}) : X(se ? yt : bt)),
					value: E?.checked,
					total: E?.total
				}) : null, S ? /* @__PURE__ */ (0, Q.jsx)(L, {
					tone: "error",
					title: X("这一次没有完成"),
					children: S
				}) : null]
			}),
			z.length ? /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, Q.jsx)(O, { children: X("查找结果") }),
					z.map((e, t) => /* @__PURE__ */ (0, Q.jsx)(Et, {
						row: e,
						at: t,
						hidden: y,
						unpicked: b,
						onPick: (e, t) => {
							let n = new Set(b);
							t ? n.delete(e) : n.add(e), x(n);
						}
					}, `${e.line}-${t}`)),
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, Q.jsx)(h, {
								variant: "secondary",
								size: "small",
								onClick: () => N(),
								children: "关闭"
							}),
							/* @__PURE__ */ (0, Q.jsx)(h, {
								variant: "primary",
								size: "small",
								disabled: n || !B.length,
								...K(V.isPending),
								onClick: () => V.mutate(B),
								children: `添加选中（${B.length}）`
							}),
							V.isPending ? /* @__PURE__ */ (0, Q.jsx)("span", {
								role: "status",
								className: "text-body-2-regular text-text-secondary",
								children: X("添加中… {added}/{length}", {
									added: w,
									length: B.length
								})
							}) : null
						]
					})
				]
			}) : null,
			oe.length ? /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, Q.jsx)("span", {
					className: "text-body-2-regular text-text-secondary",
					children: X("猜你喜欢")
				}), oe.map((e) => /* @__PURE__ */ (0, Q.jsx)(h, {
					variant: "secondary",
					size: "small",
					disabled: n,
					title: X("浏览历史里出现 {visits} 次{text}", {
						visits: e.visits,
						text: e.origin ? ` · ${e.origin}` : ""
					}),
					onClick: () => P(e.name),
					children: e.name
				}, e.name))]
			}) : null
		]
	});
}
// src/react/follow-manage/add-feed.tsx
var Ot = "输入女优名，到 JavDB 找她的演员页", kt = "添加 JAV 订阅";
function At(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let r of e.candidates) t.has(r.id) && r.held_by && n.set(r.held_by.id, r.held_by.name);
	if (n.size > 1) return {
		text: X("所勾的卡分属数据库里不同的人：{value}，先去合并再订", { value: [...n.values()].join(Ie()) }),
		blocked: !0
	};
	let [r] = n.values();
	return r ? {
		text: X("会登记到「{holder}」名下", { holder: r }),
		blocked: !1
	} : e.known ? {
		text: X("会登记到数据库里的「{name}」名下", { name: e.known.name }),
		blocked: !1
	} : {
		text: X("数据库里还没有「{q}」，会新建一位", { q: e.q }),
		blocked: !1
	};
}
function jt({ card: e, picked: t, onPick: n }) {
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "flex flex-wrap items-center gap-2",
		children: [/* @__PURE__ */ (0, Q.jsx)(_, {
			isSelected: t,
			onChange: n,
			children: /* @__PURE__ */ (0, Q.jsxs)("span", {
				className: "flex min-w-0 flex-wrap items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, Q.jsx)("span", {
						className: "min-w-0 break-words",
						children: e.names.join(Ie())
					}),
					e.record ? /* @__PURE__ */ (0, Q.jsx)(v, {
						variant: "caption",
						color: "neutral",
						children: X(e.record)
					}) : null,
					e.held_by ? /* @__PURE__ */ (0, Q.jsx)("small", {
						className: "text-caption-1-regular text-text-secondary",
						children: X("已在「{name}」名下", { name: e.held_by.name })
					}) : null
				]
			})
		}), /* @__PURE__ */ (0, Q.jsx)(w, {
			href: e.url,
			children: e.id
		})]
	});
}
function Mt({ readOnly: e, toast: t, onAdded: n }) {
	let [r, i] = (0, Z.useState)(""), [a, o] = (0, Z.useState)(null), [s, c] = (0, Z.useState)(/* @__PURE__ */ new Set()), l = it(), u = () => {
		let t = r.trim();
		t && !e && l.run("lookup", (e) => Re(t, e), (e) => {
			o(e), c(new Set(e.suggested));
		});
	}, d = (e) => {
		e.key === "Enter" && !e.nativeEvent.isComposing && (e.preventDefault(), u());
	}, f = () => {
		o(null), c(/* @__PURE__ */ new Set()), l.setError("");
	}, p = () => {
		a && l.run("follow", (e) => Ae(a.q, [...s], e), (e) => {
			t(e.created ? X("已新建「{entity_name}」并订阅她的新作", { entity_name: e.entity_name }) : X("已订阅「{entity_name}」的新作", { entity_name: e.entity_name })), i(""), f(), n();
		});
	}, m = a ? At(a, s) : null;
	return /* @__PURE__ */ (0, Q.jsxs)("section", {
		"aria-label": kt,
		className: ge({
			padding: "none",
			className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
		}),
		children: [
			/* @__PURE__ */ (0, Q.jsx)("h3", {
				className: "text-title-2-medium text-text-primary",
				children: kt
			}),
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-wrap items-end gap-2",
				children: [/* @__PURE__ */ (0, Q.jsx)("div", {
					className: "min-w-64 grow",
					children: /* @__PURE__ */ (0, Q.jsx)(A, {
						"aria-label": X("女优名"),
						placeholder: X(Ot),
						value: r,
						leadingIcon: He,
						enterKeyHint: "search",
						isDisabled: e,
						onChange: i,
						onKeyDown: d
					})
				}), /* @__PURE__ */ (0, Q.jsx)(h, {
					variant: "primary",
					disabled: e || !r.trim(),
					...K(l.busy === "lookup"),
					onClick: u,
					children: X("查找")
				})]
			}),
			l.error ? /* @__PURE__ */ (0, Q.jsx)(L, {
				tone: "error",
				title: X("这一次没有完成"),
				children: l.error
			}) : null,
			a ? /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, Q.jsx)(O, { children: X("JavDB 上的演员卡") }),
					a.candidates.length ? a.candidates.map((e) => /* @__PURE__ */ (0, Q.jsx)(jt, {
						card: e,
						picked: s.has(e.id),
						onPick: (t) => c((n) => {
							let r = new Set(n);
							return t ? r.add(e.id) : r.delete(e.id), r;
						})
					}, e.id)) : /* @__PURE__ */ (0, Q.jsx)(k, { children: X("JavDB 上没有搜到这个名字。") }),
					a.candidates.length ? /* @__PURE__ */ (0, Q.jsx)(k, {
						role: "status",
						children: s.size ? m.text : X("勾选她的演员卡；有碼与無碼两条记录都是她的话，两张都勾。")
					}) : null,
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, Q.jsx)(h, {
							variant: "secondary",
							size: "small",
							onClick: f,
							children: "关闭"
						}), a.candidates.length ? /* @__PURE__ */ (0, Q.jsx)(h, {
							variant: "primary",
							size: "small",
							disabled: e || !s.size || m.blocked,
							...K(l.busy === "follow"),
							onClick: p,
							children: X("添加订阅（{size}）", { size: s.size })
						}) : null]
					})
				]
			}) : null
		]
	});
}
// src/react/follow-manage/alias-rename-dialog.tsx
function Nt({ group: e, close: t, receipt: n }) {
	return /* @__PURE__ */ (0, Q.jsx)(I, {
		isOpen: !!e,
		onOpenChange: (e) => {
			e || t();
		},
		width: "form",
		label: "修改统一名称",
		children: e ? /* @__PURE__ */ (0, Q.jsx)(Pt, {
			group: e,
			close: t,
			receipt: n
		}, e.canonical_key) : null
	});
}
function Pt({ group: e, close: t, receipt: n }) {
	let [i, a] = (0, Z.useState)(e.canonical_name), o = it();
	return /* @__PURE__ */ (0, Q.jsxs)("form", {
		onSubmit: (r) => {
			r.preventDefault(), i.trim() && i.trim() !== e.canonical_name && o.run("rename", (t) => qe(e.canonical_key, i.trim(), t), () => {
				We(), n(`已把统一名称改为 ${i.trim()}`), t();
			});
		},
		className: "flex min-h-0 flex-col gap-4 p-5",
		children: [
			/* @__PURE__ */ (0, Q.jsx)(r, {
				slot: "title",
				className: "text-title-2-semibold text-text-primary",
				children: "修改统一名称"
			}),
			/* @__PURE__ */ (0, Q.jsxs)("p", {
				className: "text-body-2-regular wrap-anywhere text-text-secondary",
				children: ["当前名称：", e.canonical_name]
			}),
			/* @__PURE__ */ (0, Q.jsx)(A, {
				"aria-label": "统一名称",
				autoFocus: !0,
				value: i,
				onChange: a
			}),
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, Q.jsx)(O, { children: "选择已有别名" }), /* @__PURE__ */ (0, Q.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: e.aliases.map((e) => /* @__PURE__ */ (0, Q.jsx)(h, {
						variant: "secondary",
						size: "small",
						onClick: () => a(e.name),
						children: e.name
					}, e.key))
				})]
			}),
			/* @__PURE__ */ (0, Q.jsx)("p", {
				className: "text-body-2-regular text-text-secondary",
				children: "原名称保留为别名，关联档案和作品署名会同步更新。"
			}),
			o.error ? /* @__PURE__ */ (0, Q.jsx)(L, {
				tone: "error",
				children: o.error
			}) : null,
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-wrap justify-end gap-2",
				children: [/* @__PURE__ */ (0, Q.jsx)(h, {
					variant: "secondary",
					onClick: t,
					children: "取消"
				}), /* @__PURE__ */ (0, Q.jsx)(h, {
					type: "submit",
					variant: "primary",
					disabled: !i.trim() || i.trim() === e.canonical_name,
					...K(!!o.busy),
					children: "修改统一名称"
				})]
			})
		]
	});
}
// src/react/follow-manage/alias-manager.tsx
var Ft = (e) => `将移除别名「${e}」，对应来源恢复为独立创作者组。`, It = rt({
	rowSelectionFeature: Qe,
	rowSortingFeature: $e,
	rowPaginationFeature: Ze,
	columnVisibilityFeature: ve,
	sortedRowModel: t(),
	paginatedRowModel: e()
}), Lt = It, Rt = {
	id: "select",
	label: "选择",
	width: 48,
	min: 48,
	max: 48,
	required: !0
}, zt = {
	id: "canonical",
	label: "统一名称",
	width: 280,
	min: 240,
	required: !0,
	flex: !0
}, Bt = [
	Rt,
	zt,
	{
		id: "alias",
		label: "平台别名",
		width: 240
	},
	{
		id: "evidence",
		label: "依据",
		width: 320
	},
	{
		id: "actions",
		label: "操作",
		width: 112
	}
], Vt = [
	Rt,
	zt,
	{
		id: "aliases",
		label: "平台别名",
		width: 400
	},
	{
		id: "actions",
		label: "操作",
		width: 184,
		min: 168
	}
], Ht = (e) => e.alias;
function Ut(e, t, n) {
	let r = n ? `name:${n}` : "", i = r && e.find((e) => e.author_key === r) || e.find((e) => e.author_name === t || e.entity_name === t);
	return i ? e.filter((e) => e.author_key === i.author_key) : [];
}
function Wt({ sources: e, name: t, canonicalKey: n }) {
	return /* @__PURE__ */ (0, Q.jsxs)("span", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, Q.jsx)(pt, {
			group: Ut(e, t, n),
			name: t
		}), /* @__PURE__ */ (0, Q.jsx)("b", {
			className: "text-body-medium",
			children: t
		})]
	});
}
function Gt({ groups: e, suggestions: t, sources: r = [], readOnly: i, toast: u }) {
	let d = lt("alias-suggestions", Bt), f = lt("alias-saved", Vt), [p, m] = (0, Z.useState)(null), [ee, g] = (0, Z.useState)({}), [v, w] = (0, Z.useState)({}), re = n(() => g({})), ie = n(() => w({})), [T, E] = (0, Z.useState)([]), [D, k] = (0, Z.useState)([]), [j, M] = (0, Z.useState)({
		pageIndex: 0,
		pageSize: 20
	}), [N, P] = (0, Z.useState)({
		pageIndex: 0,
		pageSize: 20
	}), F = {
		...j,
		pageIndex: Math.min(j.pageIndex, Math.max(0, Math.ceil(t.length / j.pageSize) - 1))
	}, I = {
		...N,
		pageIndex: Math.min(N.pageIndex, Math.max(0, Math.ceil(e.length / N.pageSize) - 1))
	}, [L, R] = (0, Z.useState)(""), [z, V] = (0, Z.useState)(""), [oe, se] = (0, Z.useState)(""), H = ot({
		mutationFn: async (e) => {
			let t = 0;
			for (let n of e) {
				try {
					await me(n.canonical, n.alias);
				} catch (n) {
					throw t && We(), Error(X("{cause}（还有 {length} 组没有合并）", {
						cause: Y(n),
						length: e.length - t
					}));
				}
				t += 1;
			}
			return {
				done: t,
				items: e
			};
		},
		onSuccess: (e) => {
			R(""), g({}), We(), u(X("已合并 {done} 组创作者别名", { done: e.done }));
		},
		onError: (e) => R(Y(e))
	}), U = ot({
		mutationFn: (e) => me(e.canonical, e.alias),
		onSuccess: () => {
			R(""), V(""), se(""), We(), u(X("已保存创作者别名"));
		},
		onError: (e) => R(Y(e))
	}), W = ot({
		mutationFn: async (e) => {
			let t = typeof e == "string" ? [e] : e, n = 0;
			try {
				for (let e of t) await Ge(e), n += 1;
			} catch (e) {
				throw Error(X("{cause}（已移除 {done} 个别名，还有 {length} 个未移除）", {
					cause: Y(e),
					done: n,
					length: t.length - n
				}));
			} finally {
				We();
			}
		},
		onSuccess: () => {
			R(""), w({}), u(X("已移除创作者别名"));
		},
		onError: (e) => R(Y(e))
	}), pe = (e, t) => {
		e.length && ye({
			title: X(t ? "合并全部创作者别名" : "合并所选创作者别名"),
			body: X("将合并以下 {length} 组创作者：{map}。", {
				length: e.length,
				map: e.map((e) => X("「{alias}」归入「{canonical}」", {
					alias: e.alias,
					canonical: e.canonical
				})).join("；")
			}),
			confirmLabel: X(t ? "合并全部别名" : "合并所选别名"),
			onConfirm: () => H.mutateAsync(e)
		});
	}, he = (e) => void ye({
		title: X("移除创作者别名"),
		body: Ft(e),
		confirmLabel: X("移除创作者别名"),
		onConfirm: () => W.mutateAsync(e)
	}), G = (0, Z.useRef)({
		sources: r,
		readOnly: i,
		merging: H.isPending,
		removing: W.isPending,
		merge: pe,
		remove: he,
		rename: m
	});
	G.current = {
		sources: r,
		readOnly: i,
		merging: H.isPending,
		removing: W.isPending,
		merge: pe,
		remove: he,
		rename: m
	};
	let _e = (0, Z.useMemo)(() => {
		let e = be();
		return e.columns([
			e.display({
				id: "select",
				header: (e) => /* @__PURE__ */ (0, Q.jsx)(de, {
					table: e.table,
					label: "全选待合并别名"
				}),
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)(_, {
					slot: null,
					isSelected: e.row.getIsSelected(),
					"aria-label": X("选择别名 {alias}，归入 {canonical}", {
						alias: e.row.original.alias,
						canonical: e.row.original.canonical
					}),
					onChange: (t) => e.row.toggleSelected(t)
				})
			}),
			e.accessor("canonical", {
				header: "统一名称",
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)(Wt, {
					sources: G.current.sources,
					name: e.getValue()
				})
			}),
			e.accessor("alias", {
				header: X("平台别名"),
				cell: (e) => e.getValue()
			}),
			e.accessor("evidence", {
				header: X("依据"),
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "text-body-2-regular text-text-secondary",
					children: e.getValue()
				})
			}),
			e.display({
				id: "actions",
				header: X("操作"),
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)(h, {
					variant: "secondary",
					size: "small",
					disabled: G.current.readOnly,
					...K(G.current.merging),
					onClick: () => G.current.merge([e.row.original], !1),
					children: X("合并")
				})
			})
		]);
	}, []), ve = (0, Z.useMemo)(() => {
		let e = be();
		return e.columns([
			e.display({
				id: "select",
				header: ({ table: e }) => /* @__PURE__ */ (0, Q.jsx)(de, {
					table: e,
					label: "全选已保存别名"
				}),
				cell: ({ row: e }) => /* @__PURE__ */ (0, Q.jsx)(_, {
					slot: null,
					"aria-label": X("选择已保存别名 {canonical_name}", { canonical_name: e.original.canonical_name }),
					isSelected: e.getIsSelected(),
					onChange: (t) => e.toggleSelected(t)
				})
			}),
			e.accessor("canonical_name", {
				id: "canonical",
				header: "统一名称",
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)(Wt, {
					sources: G.current.sources,
					name: e.getValue(),
					canonicalKey: e.row.original.canonical_key
				})
			}),
			e.accessor("aliases", {
				header: X("平台别名"),
				sortFn: (e, t) => e.original.aliases.map((e) => e.name).join(" ").localeCompare(t.original.aliases.map((e) => e.name).join(" "), "zh-CN"),
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "flex flex-wrap items-center gap-1.5",
					children: e.getValue().map((e) => /* @__PURE__ */ (0, Q.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-md bg-background-secondary-default px-1.5 py-1 text-caption-1-medium text-text-secondary",
						children: [e.name, /* @__PURE__ */ (0, Q.jsx)(h, {
							variant: "ghost",
							size: "xs",
							iconOnly: !0,
							leadingIcon: ae,
							"aria-label": X("移除别名 {name}", { name: e.name }),
							disabled: G.current.readOnly,
							...K(G.current.removing),
							onClick: () => G.current.remove(e.name)
						})]
					}, e.key))
				})
			}),
			e.display({
				id: "actions",
				header: "操作",
				cell: ({ row: e }) => /* @__PURE__ */ (0, Q.jsx)(h, {
					variant: "secondary",
					size: "small",
					disabled: G.current.readOnly,
					"aria-label": `修改 ${e.original.canonical_name} 的统一名称`,
					onClick: () => G.current.rename(e.original),
					children: "修改统一名称"
				})
			})
		]);
	}, []), xe = ct({
		features: It,
		data: t,
		columns: _e,
		getRowId: Ht,
		state: {
			rowSelection: ee,
			sorting: T,
			pagination: F,
			columnVisibility: d.visibility
		},
		onColumnVisibilityChange: d.change,
		onRowSelectionChange: (e) => {
			re(), g(e);
		},
		onSortingChange: (e) => {
			E(e), M((e) => ({
				...e,
				pageIndex: 0
			}));
		},
		onPaginationChange: M,
		enableRowSelection: !0
	}), q = ct({
		features: Lt,
		data: e,
		columns: ve,
		getRowId: (e) => e.canonical_key,
		state: {
			rowSelection: v,
			sorting: D,
			pagination: I,
			columnVisibility: f.visibility
		},
		onColumnVisibilityChange: f.change,
		onRowSelectionChange: (e) => {
			ie(), w(e);
		},
		enableRowSelection: !0,
		onSortingChange: (e) => {
			k(e), P((e) => ({
				...e,
				pageIndex: 0
			}));
		},
		onPaginationChange: P
	}), Se = xe.getSelectedRowModel().rows.map((e) => e.original), J = q.getSelectedRowModel().rows.flatMap((e) => e.original.aliases.map((e) => e.name)), Ce = K(H.isPending);
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: ge({
			padding: "none",
			className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
		}),
		children: [
			/* @__PURE__ */ (0, Q.jsx)("h3", {
				className: "text-title-2-medium text-text-primary",
				children: X("创作者别名")
			}),
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, Q.jsx)(O, { children: X("手动添加别名") }), /* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "flex flex-wrap items-end gap-2",
					children: [
						/* @__PURE__ */ (0, Q.jsx)(A, {
							"aria-label": "统一名称",
							placeholder: "在 Peach 中统一显示的名称",
							value: z,
							onChange: V,
							isDisabled: i,
							className: "w-56"
						}),
						/* @__PURE__ */ (0, Q.jsx)(A, {
							"aria-label": X("平台别名"),
							placeholder: X("平台别名"),
							value: oe,
							onChange: se,
							isDisabled: i,
							className: "w-56"
						}),
						/* @__PURE__ */ (0, Q.jsx)(h, {
							variant: "primary",
							disabled: i || !z.trim() || !oe.trim(),
							...K(U.isPending),
							onClick: () => U.mutate({
								canonical: z.trim(),
								alias: oe.trim()
							}),
							children: X("保存别名")
						})
					]
				})]
			}),
			L ? /* @__PURE__ */ (0, Q.jsx)(C, { children: L }) : null,
			t.length ? /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						"data-responsive-toolbar": "",
						children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
							"data-toolbar-heading": "",
							children: [/* @__PURE__ */ (0, Q.jsx)(O, { children: "待合并" }), /* @__PURE__ */ (0, Q.jsx)("span", {
								className: "text-body-2-regular text-text-secondary",
								children: `${t.length} 组`
							})]
						}), /* @__PURE__ */ (0, Q.jsxs)("div", {
							"data-toolbar-actions": "",
							children: [
								/* @__PURE__ */ (0, Q.jsx)(h, {
									variant: "primary",
									size: "small",
									disabled: i,
									...Ce,
									onClick: () => pe(t, !0),
									children: `全部合并（${t.length}）`
								}),
								/* @__PURE__ */ (0, Q.jsx)(b, {
									label: "待合并创作者别名",
									sorting: T,
									options: [
										{
											id: "canonical",
											label: "统一名称"
										},
										{
											id: "alias",
											label: "平台别名"
										},
										{
											id: "evidence",
											label: "依据"
										}
									],
									onChange: (e) => {
										E(e), M((e) => ({
											...e,
											pageIndex: 0
										}));
									}
								}),
								/* @__PURE__ */ (0, Q.jsx)(le, {
									preferences: d,
									label: "待合并创作者别名"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, Q.jsxs)(B, {
						label: X("待合并别名批量操作"),
						visible: Se.length > 0,
						count: X("已选 {length} 组", { length: Se.length }),
						children: [/* @__PURE__ */ (0, Q.jsx)(h, {
							variant: "secondary",
							size: "small",
							disabled: i,
							...Ce,
							onClick: () => pe(Se, !1),
							children: X("合并所选（{length}）", { length: Se.length })
						}), /* @__PURE__ */ (0, Q.jsx)(h, {
							variant: "ghost",
							size: "small",
							onClick: () => g({}),
							children: X("取消选择")
						})]
					}),
					/* @__PURE__ */ (0, Q.jsx)(ne, {
						follow: !0,
						preferences: d,
						onRowClick: (e) => xe.getRow(e)?.toggleSelected(),
						children: /* @__PURE__ */ (0, Q.jsxs)(ce, {
							"aria-label": "待合并创作者别名",
							size: "sm",
							sortDescriptor: T[0] ? {
								column: T[0].id,
								direction: T[0].desc ? "descending" : "ascending"
							} : void 0,
							onSortChange: (e) => xe.getColumn(String(e.column))?.toggleSorting(e.direction === "descending"),
							children: [/* @__PURE__ */ (0, Q.jsxs)(l, { children: [xe.getHeaderGroups()[0].headers.map((e) => /* @__PURE__ */ (0, Q.jsx)(o, {
								id: e.id,
								isRowHeader: e.column.id === "canonical",
								allowsSorting: e.column.getCanSort(),
								...d.columnProps(e.id),
								children: ({ sortDirection: t }) => /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsxs)("span", {
									className: "flex items-center gap-0.5",
									children: [ke(e.column.columnDef.header, e.getContext()), e.column.getCanSort() ? /* @__PURE__ */ (0, Q.jsx)("span", {
										"data-sort-indicator": !0,
										"data-direction": t || void 0,
										children: /* @__PURE__ */ (0, Q.jsx)(te, {})
									}) : null]
								}), /* @__PURE__ */ (0, Q.jsx)(ue, {
									preferences: d,
									id: e.id
								})] })
							}, e.id)), /* @__PURE__ */ (0, Q.jsx)(o, {
								id: "remaining-space",
								"aria-label": "行空白区域",
								"data-table-space": "",
								width: d.spaceWidth,
								minWidth: 0
							})] }), /* @__PURE__ */ (0, Q.jsx)(a, { children: xe.getRowModel().rows.map((e) => /* @__PURE__ */ (0, Q.jsxs)(s, {
								id: e.id,
								"data-board-selected": e.getIsSelected() || void 0,
								children: [e.getVisibleCells().map((e) => /* @__PURE__ */ (0, Q.jsx)(c, { children: ke(e.column.columnDef.cell, e.getContext()) }, e.id)), /* @__PURE__ */ (0, Q.jsx)(c, { "data-table-space": "" })]
							}, e.id)) })]
						})
					}),
					/* @__PURE__ */ (0, Q.jsx)(y, {
						label: X("待合并创作者别名"),
						unit: X("组"),
						total: t.length,
						pagination: F,
						onChange: M
					})
				]
			}) : null,
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						"data-responsive-toolbar": "",
						children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
							"data-toolbar-heading": "",
							children: [/* @__PURE__ */ (0, Q.jsx)(O, { children: "已保存别名" }), /* @__PURE__ */ (0, Q.jsx)("span", {
								className: "text-body-2-regular text-text-secondary",
								children: `${e.length} 组`
							})]
						}), /* @__PURE__ */ (0, Q.jsxs)("div", {
							"data-toolbar-actions": "",
							children: [/* @__PURE__ */ (0, Q.jsx)(b, {
								label: "已保存创作者别名",
								sorting: D,
								options: [{
									id: "canonical",
									label: "统一名称"
								}, {
									id: "aliases",
									label: "平台别名"
								}],
								onChange: (e) => {
									k(e), P((e) => ({
										...e,
										pageIndex: 0
									}));
								}
							}), /* @__PURE__ */ (0, Q.jsx)(le, {
								preferences: f,
								label: "已保存创作者别名"
							})]
						})]
					}),
					/* @__PURE__ */ (0, Q.jsxs)(B, {
						label: X("已保存别名批量操作"),
						visible: J.length > 0,
						count: X("已选 {length} 个别名", { length: J.length }),
						children: [/* @__PURE__ */ (0, Q.jsx)(h, {
							variant: "secondary",
							size: "small",
							disabled: i,
							...K(W.isPending),
							onClick: () => void ye({
								title: X("移除所选创作者别名"),
								body: X("将移除以下 {length} 个别名，对应来源恢复为独立创作者组。", { length: J.length }),
								items: J,
								confirmLabel: X("移除所选别名"),
								onConfirm: () => W.mutateAsync(J)
							}),
							children: X("移除所选别名（{length}）", { length: J.length })
						}), /* @__PURE__ */ (0, Q.jsx)(h, {
							variant: "ghost",
							size: "small",
							onClick: () => w({}),
							children: X("取消选择")
						})]
					}),
					e.length ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(ne, {
						follow: !0,
						preferences: f,
						onRowClick: (e) => q.getRow(e)?.toggleSelected(),
						children: /* @__PURE__ */ (0, Q.jsxs)(ce, {
							"aria-label": "已保存创作者别名",
							size: "sm",
							sortDescriptor: D[0] ? {
								column: D[0].id,
								direction: D[0].desc ? "descending" : "ascending"
							} : void 0,
							onSortChange: (e) => q.getColumn(String(e.column))?.toggleSorting(e.direction === "descending"),
							children: [/* @__PURE__ */ (0, Q.jsxs)(l, { children: [q.getHeaderGroups()[0].headers.map((e) => /* @__PURE__ */ (0, Q.jsx)(o, {
								id: e.id,
								isRowHeader: e.column.id === "canonical",
								allowsSorting: e.column.getCanSort(),
								...f.columnProps(e.id),
								children: ({ sortDirection: t }) => /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsxs)("span", {
									className: "flex items-center gap-0.5",
									children: [ke(e.column.columnDef.header, e.getContext()), e.column.getCanSort() ? /* @__PURE__ */ (0, Q.jsx)("span", {
										"data-sort-indicator": !0,
										"data-direction": t || void 0,
										children: /* @__PURE__ */ (0, Q.jsx)(te, {})
									}) : null]
								}), /* @__PURE__ */ (0, Q.jsx)(ue, {
									preferences: f,
									id: e.id
								})] })
							}, e.id)), /* @__PURE__ */ (0, Q.jsx)(o, {
								id: "remaining-space",
								"aria-label": "行空白区域",
								"data-table-space": "",
								width: f.spaceWidth,
								minWidth: 0
							})] }), /* @__PURE__ */ (0, Q.jsx)(a, { children: q.getRowModel().rows.map((e) => /* @__PURE__ */ (0, Q.jsxs)(s, {
								id: e.id,
								"data-board-selected": e.getIsSelected() || void 0,
								children: [e.getVisibleCells().map((e) => /* @__PURE__ */ (0, Q.jsx)(c, { children: ke(e.column.columnDef.cell, e.getContext()) }, e.id)), /* @__PURE__ */ (0, Q.jsx)(c, { "data-table-space": "" })]
							}, e.id)) })]
						})
					}), /* @__PURE__ */ (0, Q.jsx)(y, {
						label: X("已保存创作者别名"),
						unit: X("组"),
						total: e.length,
						pagination: I,
						onChange: P
					})] }) : /* @__PURE__ */ (0, Q.jsx)(S, {
						size: "compact",
						icon: fe,
						title: "还没有保存创作者别名",
						actions: i ? void 0 : /* @__PURE__ */ (0, Q.jsx)(x, {
							target: "input[aria-label=\"统一名称\"]",
							children: "添加别名"
						}),
						children: "填写统一名称，以及该创作者在其他平台使用的名字。"
					})
				]
			}),
			/* @__PURE__ */ (0, Q.jsx)(Nt, {
				group: p,
				close: () => m(null),
				receipt: u
			})
		]
	});
}
// src/react/follow-manage/feed-sources.tsx
var Kt = rt({
	rowPaginationFeature: Ze,
	rowSelectionFeature: Qe,
	rowSortingFeature: $e,
	columnVisibilityFeature: ve,
	sortedRowModel: t(),
	paginatedRowModel: e()
}), qt = {
	get select() {
		return X("选择");
	},
	get name() {
		return X("名称");
	},
	get kind() {
		return X("类型");
	},
	get origin() {
		return X("来源");
	},
	get status() {
		return X("状态");
	},
	get interval() {
		return X("频率");
	},
	get fetched() {
		return X("上次拉取");
	},
	get fresh() {
		return X("上次新增");
	},
	get actions() {
		return X("操作");
	}
}, Jt = /* @__PURE__ */ new Set(["actions"]), Yt = Object.entries(qt).map(([e, t]) => ({
	id: e,
	label: t,
	width: e === "select" ? 48 : e === "name" ? 300 : e === "actions" ? 208 : e === "fetched" ? 200 : 160,
	min: e === "select" ? 48 : e === "actions" ? 200 : e === "name" ? 300 : 112,
	max: e === "select" ? 48 : e === "name" ? 2e3 : 800,
	flex: e === "name",
	required: e === "select" || e === "name"
})), Xt = () => Ue.invalidateQueries({
	queryKey: re,
	exact: !0
}), $ = (e) => e.name || e.url;
function Zt(e) {
	try {
		return new URL(e).hostname.replace(/^www\./, "");
	} catch {
		return e;
	}
}
function Qt({ source: e }) {
	return e.enabled ? e.last_error ? /* @__PURE__ */ (0, Q.jsx)(v, {
		variant: "caption",
		color: "rose",
		children: "拉取失败"
	}) : e.last_fetched_at ? /* @__PURE__ */ (0, Q.jsx)(v, {
		variant: "caption",
		color: "lime",
		children: "正常"
	}) : /* @__PURE__ */ (0, Q.jsx)(v, {
		variant: "caption",
		color: "gray",
		children: "未检查"
	}) : /* @__PURE__ */ (0, Q.jsx)(v, {
		variant: "caption",
		color: "gray",
		children: "已暂停"
	});
}
function $t({ source: e }) {
	let t = e.entity_id ? {
		id: e.entity_id,
		has_image: !!e.has_image,
		image_version: e.image_version,
		avatar_focus: e.avatar_focus
	} : null;
	return /* @__PURE__ */ (0, Q.jsx)("span", {
		"aria-hidden": !0,
		className: `relative inline-grid size-8 shrink-0 place-items-center overflow-hidden rounded-full bg-background-tertiary-default text-caption-1-semibold text-text-secondary ${dt}`,
		dangerouslySetInnerHTML: { __html: G($(e), t, null, "performer") }
	});
}
var en = (e, t) => e.entity_id !== null && t.has(e.entity_id) && e.page_name && e.page_name !== e.name ? e.page_name : "";
function tn(e) {
	let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set();
	for (let { entity_id: r } of e) r !== null && (t.has(r) ? n.add(r) : t.add(r));
	return n;
}
function nn(e, t) {
	let n = e.length === 1 ? e[0] : null;
	return ye({
		title: n ? X("移除订阅源") : X("移除 {length} 条订阅源", { length: e.length }),
		body: n ? X("将移除订阅源「{one}」，之后不再拉取它的新作；已经拉到的新作保留。", { one: $(n) }) : X("将移除所选订阅源，之后不再拉取它们的新作；已经拉到的新作保留。"),
		confirmLabel: X(n ? "移除订阅源" : "移除所选订阅源"),
		danger: !0,
		onConfirm: t
	});
}
function rn({ readOnly: e, toast: t, onAdd: n, selection: r }) {
	let i = st({
		queryKey: re,
		queryFn: ({ signal: e }) => Te(e)
	}), u = it(), d = lt("jav-feeds", Yt), f = i.data, m = (0, Z.useMemo)(() => f?.sources ?? [], [f]), [ee, v] = (0, Z.useState)(/* @__PURE__ */ new Set()), x = r?.ids ?? ee, w = r?.onChange ?? v, [ie, T] = (0, Z.useState)(1), [E, D] = (0, Z.useState)(20), [O, A] = (0, Z.useState)([]), j = Ve(m.length, E, ie);
	(0, Z.useEffect)(() => {
		T((e) => Math.min(e, j.pages));
	}, [j.pages]), (0, Z.useEffect)(() => {
		w((e) => {
			let t = new Set(m.map((e) => e.id)), n = new Set([...e].filter((e) => t.has(e)));
			return n.size === e.size ? e : n;
		});
	}, [m, w]);
	let N = ot({
		mutationFn: async (e) => {
			let t = await ze(e.ids, 4, async (t) => {
				e.action === "remove" ? await Ke(t) : await et(t, e.action === "enabled");
			});
			return {
				...e,
				results: t
			};
		},
		onSuccess: (e) => {
			let n = e.results.filter((e) => !e.ok), r = e.ids.length - n.length;
			if (w(/* @__PURE__ */ new Set()), Xt(), e.action === "remove" && r && t(X("已移除 {done} 条订阅源", { done: r })), n.length) {
				let e = n[0];
				u.setError(X("{length} 条没有写入：{value}", {
					length: n.length,
					value: e.ok ? "" : Y(e.error)
				}));
			}
		},
		onError: (e) => u.setError(Y(e))
	}), P = (0, Z.useMemo)(() => tn(m), [m]), F = (0, Z.useRef)({
		readOnly: e,
		shared: P,
		busy: null,
		toggle: () => {},
		fetch: () => {},
		remove: () => {}
	});
	F.current = {
		readOnly: e,
		shared: P,
		busy: u.busy,
		toggle: (e, t) => void u.run(`enabled-${e.id}`, (n) => et(e.id, t, n), () => void Xt()),
		fetch: (e) => void u.run(`check-${e.id}`, (t) => _e(t, [e.id]), () => void Xt()),
		remove: (e) => void nn([e], async () => {
			await Ke(e.id), t(X("已移除订阅源「{source}」", { source: $(e) })), Xt();
		})
	};
	let I = (0, Z.useMemo)(() => {
		let e = be(), t = (e) => () => qt[e] || e;
		return e.columns([
			e.display({
				id: "select",
				header: (e) => /* @__PURE__ */ (0, Q.jsx)(de, {
					table: e.table,
					label: "全选本页订阅源",
					page: !0
				}),
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)(_, {
					slot: null,
					isSelected: e.row.getIsSelected(),
					onChange: (t) => e.row.toggleSelected(t),
					"aria-label": X("选择 {original}", { original: $(e.row.original) })
				})
			}),
			e.accessor($, {
				id: "name",
				header: t("name"),
				cell: (e) => {
					let t = en(e.row.original, F.current.shared);
					return /* @__PURE__ */ (0, Q.jsxs)("span", {
						className: "flex items-center gap-2 whitespace-nowrap text-body-medium text-text-primary",
						children: [
							/* @__PURE__ */ (0, Q.jsx)($t, { source: e.row.original }),
							e.getValue(),
							t ? /* @__PURE__ */ (0, Q.jsx)("span", {
								className: "text-body-2-regular text-text-secondary",
								title: X("站上这一页挂在「{alias}」名下", { alias: t }),
								children: t
							}) : null
						]
					});
				}
			}),
			e.accessor((e) => e.kind_label, {
				id: "kind",
				header: t("kind"),
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "whitespace-nowrap",
					children: e.getValue()
				})
			}),
			e.accessor((e) => e.url, {
				id: "origin",
				header: t("origin"),
				cell: (e) => /* @__PURE__ */ (0, Q.jsxs)("a", {
					href: e.getValue(),
					target: "_blank",
					rel: "noopener noreferrer",
					title: "打开来源页面",
					className: "text-text-primary underline-offset-2 hover:underline",
					children: [/* @__PURE__ */ (0, Q.jsx)(oe, {
						site: e.row.original.kind.startsWith("javdb") ? "javdb" : Zt(e.getValue()),
						label: Zt(e.getValue())
					}), /* @__PURE__ */ (0, Q.jsx)(W, {
						"aria-hidden": !0,
						className: "size-(--icon-inline) shrink-0"
					})]
				})
			}),
			e.accessor((e) => e.last_error ? X("拉取失败") : e.enabled ? X("已启用") : X("已暂停"), {
				id: "status",
				header: t("status"),
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)(Qt, { source: e.row.original })
			}),
			e.accessor((e) => e.interval_minutes, {
				id: "interval",
				header: t("interval"),
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "whitespace-nowrap",
					children: Ce(e.getValue())
				})
			}),
			e.accessor((e) => e.last_fetched_at && Date.parse(e.last_fetched_at) || 0, {
				id: "fetched",
				header: t("fetched"),
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "whitespace-nowrap tabular-nums",
					children: e.row.original.last_fetched_at ? Le(e.row.original.last_fetched_at) : X("还没拉过")
				})
			}),
			e.accessor((e) => e.last_new_count, {
				id: "fresh",
				header: t("fresh"),
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "whitespace-nowrap tabular-nums",
					children: X("{getValue} 条", { getValue: e.getValue() })
				})
			}),
			e.display({
				id: "actions",
				header: t("actions"),
				cell: (e) => /* @__PURE__ */ (0, Q.jsxs)("span", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, Q.jsx)(se, {
							"aria-label": X("启用 {original}", { original: $(e.row.original) }),
							isSelected: e.row.original.enabled,
							isDisabled: F.current.readOnly,
							onChange: (t) => F.current.toggle(e.row.original, t)
						}),
						/* @__PURE__ */ (0, Q.jsx)(h, {
							variant: "secondary",
							size: "small",
							iconOnly: !0,
							leadingIcon: Se,
							"aria-label": `拉取 ${$(e.row.original)}`,
							disabled: F.current.readOnly,
							...K(F.current.busy === `check-${e.row.original.id}`),
							onClick: () => F.current.fetch(e.row.original)
						}),
						/* @__PURE__ */ (0, Q.jsx)(h, {
							variant: "secondary",
							size: "small",
							iconOnly: !0,
							leadingIcon: M,
							"aria-label": `移除 ${$(e.row.original)}`,
							disabled: F.current.readOnly,
							onClick: () => F.current.remove(e.row.original)
						})
					]
				})
			})
		]);
	}, []), ae = (0, Z.useMemo)(() => Object.fromEntries([...x].map((e) => [String(e), !0])), [x]), R = ct({
		features: Kt,
		data: m,
		columns: I,
		getRowId: (e) => String(e.id),
		state: {
			rowSelection: ae,
			sorting: O,
			pagination: {
				pageIndex: j.page - 1,
				pageSize: E
			},
			columnVisibility: d.visibility
		},
		onColumnVisibilityChange: d.change,
		onSortingChange: (e) => {
			A(e), T(1);
		},
		enableRowSelection: !0,
		onRowSelectionChange: (e) => {
			r?.onActivate();
			let t = typeof e == "function" ? e(ae) : e;
			w(new Set(Object.entries(t).filter(([, e]) => e).map(([e]) => Number(e))));
		}
	});
	if (!f) return i.error ? /* @__PURE__ */ (0, Q.jsx)(L, {
		tone: "error",
		title: X("打不开订阅源"),
		children: Y(i.error)
	}) : /* @__PURE__ */ (0, Q.jsx)(k, { children: X("正在读订阅源。") });
	let z = () => void u.run("check", (e) => _e(e), () => void Xt()), V = (e) => {
		r?.onActivate(), w((t) => {
			let n = new Set(t);
			return n.has(e) ? n.delete(e) : n.add(e), n;
		});
	}, H = m.filter((e) => x.has(e.id)), U = m.filter((e) => e.last_error);
	return /* @__PURE__ */ (0, Q.jsx)("div", {
		className: "flex flex-col gap-3",
		children: /* @__PURE__ */ (0, Q.jsxs)("section", {
			"aria-label": "JAV 订阅列表",
			className: ge({
				padding: "none",
				className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
			}),
			children: [
				/* @__PURE__ */ (0, Q.jsxs)("div", {
					"data-responsive-toolbar": "",
					children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
						"data-toolbar-heading": "",
						children: [/* @__PURE__ */ (0, Q.jsx)("h3", {
							className: "text-title-2-medium text-text-primary",
							children: "JAV 订阅源"
						}), /* @__PURE__ */ (0, Q.jsx)("span", {
							className: "text-body-2-regular text-text-secondary",
							children: `${m.length.toLocaleString()} 个订阅源 · ${(Number(f.unread) || 0).toLocaleString()} 条未看`
						})]
					}), /* @__PURE__ */ (0, Q.jsxs)("div", {
						"data-toolbar-actions": "",
						children: [
							/* @__PURE__ */ (0, Q.jsx)(h, {
								onClick: z,
								disabled: e,
								...K(u.busy === "check"),
								children: "立即拉取"
							}),
							/* @__PURE__ */ (0, Q.jsx)(le, {
								preferences: d,
								label: "JAV 订阅源"
							}),
							/* @__PURE__ */ (0, Q.jsx)(b, {
								label: "JAV 订阅源",
								sorting: O,
								onChange: (e) => {
									A(e), T(1);
								},
								options: [
									"name",
									"kind",
									"origin",
									"status",
									"interval",
									"fetched",
									"fresh"
								].map((e) => ({
									id: e,
									label: qt[e]
								}))
							})
						]
					})]
				}),
				U.length || u.error ? /* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [U.length ? /* @__PURE__ */ (0, Q.jsx)(L, {
						tone: "error",
						title: X("{length} 条订阅源拉取失败", { length: U.length.toLocaleString() }),
						extra: /* @__PURE__ */ (0, Q.jsx)("ul", {
							className: "flex flex-col gap-0.5 text-body-2-regular",
							children: U.map((e) => /* @__PURE__ */ (0, Q.jsx)("li", {
								className: "min-w-0 truncate",
								title: e.last_error || "",
								children: `${$(e)}：${J(e.last_error || "") || X("未说明原因")}`
							}, e.id))
						}),
						children: X("这些订阅源这一轮没有取到新条目。")
					}) : null, u.error ? /* @__PURE__ */ (0, Q.jsx)(C, { children: u.error }) : null]
				}) : null,
				/* @__PURE__ */ (0, Q.jsxs)(B, {
					visible: H.length > 0,
					label: X("订阅源批量操作"),
					count: X("已选 {length} 条订阅源", { length: H.length }),
					children: [
						/* @__PURE__ */ (0, Q.jsx)(h, {
							variant: "secondary",
							size: "small",
							disabled: e,
							...K(N.isPending),
							onClick: () => N.mutate({
								ids: H.map((e) => e.id),
								action: "enabled"
							}),
							children: X("启用")
						}),
						/* @__PURE__ */ (0, Q.jsx)(h, {
							variant: "secondary",
							size: "small",
							disabled: e,
							...K(N.isPending),
							onClick: () => N.mutate({
								ids: H.map((e) => e.id),
								action: "paused"
							}),
							children: X("暂停")
						}),
						/* @__PURE__ */ (0, Q.jsx)(h, {
							variant: "danger",
							size: "small",
							disabled: e,
							...K(N.isPending),
							onClick: () => void nn(H, () => N.mutateAsync({
								ids: H.map((e) => e.id),
								action: "remove"
							})),
							children: X("移除")
						}),
						/* @__PURE__ */ (0, Q.jsx)(h, {
							variant: "ghost",
							size: "small",
							onClick: () => w(/* @__PURE__ */ new Set()),
							children: X("取消选择")
						})
					]
				}),
				m.length ? /* @__PURE__ */ (0, Q.jsx)(ne, {
					follow: !0,
					preferences: d,
					onRowClick: (e) => V(Number(e)),
					children: /* @__PURE__ */ (0, Q.jsxs)(ce, {
						"aria-label": "JAV 订阅源",
						size: "sm",
						sortDescriptor: O[0] ? {
							column: O[0].id,
							direction: O[0].desc ? "descending" : "ascending"
						} : void 0,
						onSortChange: (e) => R.getColumn(String(e.column))?.toggleSorting(e.direction === "descending"),
						children: [/* @__PURE__ */ (0, Q.jsxs)(l, { children: [R.getHeaderGroups()[0].headers.map((e) => {
							let t = ke(e.column.columnDef.header, e.getContext());
							return /* @__PURE__ */ (0, Q.jsx)(o, {
								id: e.id,
								isRowHeader: e.column.id === "name",
								allowsSorting: e.column.getCanSort(),
								...d.columnProps(e.id),
								children: ({ sortDirection: n }) => /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [Jt.has(e.column.id) ? /* @__PURE__ */ (0, Q.jsx)(p, { children: t }) : /* @__PURE__ */ (0, Q.jsxs)("span", {
									className: "flex items-center gap-0.5",
									children: [t, e.column.getCanSort() ? /* @__PURE__ */ (0, Q.jsx)("span", {
										"data-sort-indicator": !0,
										"data-direction": n || void 0,
										children: /* @__PURE__ */ (0, Q.jsx)(te, {})
									}) : null]
								}), /* @__PURE__ */ (0, Q.jsx)(ue, {
									preferences: d,
									id: e.id
								})] })
							}, e.id);
						}), /* @__PURE__ */ (0, Q.jsx)(o, {
							id: "remaining-space",
							"aria-label": "行空白区域",
							"data-table-space": "",
							width: d.spaceWidth,
							minWidth: 0
						})] }), /* @__PURE__ */ (0, Q.jsx)(a, { children: R.getRowModel().rows.map((e) => /* @__PURE__ */ (0, Q.jsxs)(s, {
							id: e.id,
							"data-follow-selected": e.getIsSelected() || void 0,
							children: [e.getVisibleCells().map((e) => /* @__PURE__ */ (0, Q.jsx)(c, { children: ke(e.column.columnDef.cell, e.getContext()) }, e.id)), /* @__PURE__ */ (0, Q.jsx)(c, { "data-table-space": "" })]
						}, e.id)) })]
					})
				}) : /* @__PURE__ */ (0, Q.jsx)(S, {
					icon: g,
					title: "还没有订阅源",
					size: "compact",
					actions: e ? void 0 : /* @__PURE__ */ (0, Q.jsx)(h, {
						variant: "secondary",
						onClick: n,
						children: "添加订阅"
					}),
					children: "在「添加关注」按女优名添加，或在人物页点「订阅新作」。"
				}),
				m.length ? /* @__PURE__ */ (0, Q.jsx)(y, {
					label: X("JAV 订阅"),
					total: j.total,
					unit: X("个订阅源"),
					pagination: {
						pageIndex: j.page - 1,
						pageSize: E
					},
					onChange: (e) => {
						D(e.pageSize), T(e.pageIndex + 1);
					}
				}) : null,
				/* @__PURE__ */ (0, Q.jsx)("footer", {
					className: "-mx-6 -mb-5 flex flex-wrap items-center gap-2 border-t border-separator-border rounded-b-2xl bg-card-footer px-6 py-4 max-sm:-mx-4 max-sm:px-4",
					children: /* @__PURE__ */ (0, Q.jsx)("span", {
						role: "status",
						className: "mr-auto text-body-2-regular text-text-secondary",
						children: X("未看 {unread} · 已启用 {length} / {length2}", {
							unread: (Number(f.unread) || 0).toLocaleString(),
							length: m.filter((e) => e.enabled).length.toLocaleString(),
							length2: m.length.toLocaleString()
						})
					})
				})
			]
		})
	});
}
// src/react/follow-manage/follow-manage-page.tsx
var an = (e) => E.some(([t]) => t === e);
function on({ term: e, figure: t, unit: n }) {
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: ge({
			padding: "none",
			className: "flex flex-col gap-3 px-6 py-5 max-sm:gap-2 max-sm:p-4"
		}),
		children: [/* @__PURE__ */ (0, Q.jsx)("span", {
			className: "text-body-medium text-text-secondary",
			children: e
		}), /* @__PURE__ */ (0, Q.jsxs)("b", {
			"data-follow-reading": "",
			className: `flex min-w-0 flex-wrap items-baseline gap-x-1 tabular-nums text-text-primary ${t >= 1e6 ? "text-headline-medium" : t >= 1e5 ? "text-title-3-medium" : "text-title-1-medium"}`,
			children: [/* @__PURE__ */ (0, Q.jsx)("span", {
				className: "min-w-0 wrap-anywhere",
				children: t.toLocaleString()
			}), /* @__PURE__ */ (0, Q.jsx)("small", {
				className: "whitespace-nowrap text-body-2-regular text-text-secondary",
				children: ` ${n}`
			})]
		})]
	});
}
function sn(e) {
	let { route: t, savePreference: n, toast: r, openFollow: i, readOnly: a, readOnlyMessage: o, writerUrl: s } = e, [c, l] = (0, Z.useState)(an(e.tab) ? e.tab : "list"), [p, m] = (0, Z.useState)(Math.max(1, Math.floor(e.page) || 1)), [h, g] = (0, Z.useState)(() => Xe(e.sort, e.dir).sort), [_, te] = (0, Z.useState)(() => Xe(e.sort, e.dir).dir), [v, y] = (0, Z.useState)(Pe(e.layout) ? e.layout : "default"), [ne, b] = (0, Z.useState)(Be(e.pageSize)), [x, S] = (0, Z.useState)(/* @__PURE__ */ new Set()), [C, D] = (0, Z.useState)(/* @__PURE__ */ new Set()), O = st({
		queryKey: T,
		queryFn: ({ signal: e }) => Ee(e)
	}), k = st({
		queryKey: ie,
		queryFn: ({ signal: e }) => we(e)
	}), A = st({
		queryKey: re,
		queryFn: ({ signal: e }) => Te(e)
	}), j = O.data || { sources: [] }, M = k.data || {
		root: "",
		providers: []
	}, N = j.sources;
	(0, Z.useEffect)(() => {
		S((e) => {
			let t = Fe(e, N);
			return t.size === e.size ? e : t;
		});
	}, [N]);
	let P = (e) => {
		let n = e.sort ?? h, r = e.dir ?? _;
		t({
			tab: e.tab ?? c,
			page: e.page ?? p,
			sort: n === "checked" ? "" : n,
			dir: r === R[n] ? "" : r
		});
	}, F = Me(N), I = N.filter(Ne).length, ae = N.filter((e) => e.enabled).length, B = (M.providers || []).filter((e) => e.requirement === "required" && !xe(e)).length, V = new Set((A.data?.sources || []).map((e) => e.entity_id ?? `source-${e.id}`)).size;
	return /* @__PURE__ */ (0, Q.jsxs)(ut, { children: [
		a ? /* @__PURE__ */ (0, Q.jsx)(L, {
			tone: "warning",
			title: X("本机只能浏览"),
			extra: s ? /* @__PURE__ */ (0, Q.jsx)("p", {
				className: "text-body-2-regular",
				children: /* @__PURE__ */ (0, Q.jsx)(w, {
					href: s,
					children: "前往写入端管理关注"
				})
			}) : void 0,
			children: o
		}) : null,
		/* @__PURE__ */ (0, Q.jsxs)("div", {
			className: z,
			"aria-label": X("关注概览"),
			children: [
				/* @__PURE__ */ (0, Q.jsx)(on, {
					term: X("关注创作者"),
					figure: F.length,
					unit: X("位")
				}),
				/* @__PURE__ */ (0, Q.jsx)(on, {
					term: X("启用来源"),
					figure: ae,
					unit: `/ ${N.length}`
				}),
				/* @__PURE__ */ (0, Q.jsx)(on, {
					term: X("检查失败"),
					figure: I,
					unit: X("个来源")
				}),
				/* @__PURE__ */ (0, Q.jsx)(on, {
					term: X("未看更新"),
					figure: j.counts?.new || 0,
					unit: X("条")
				}),
				/* @__PURE__ */ (0, Q.jsx)(on, {
					term: X("JAV 订阅"),
					figure: V,
					unit: X("位")
				}),
				/* @__PURE__ */ (0, Q.jsx)(on, {
					term: X("未看新作"),
					figure: A.data?.unread || 0,
					unit: X("条")
				})
			]
		}),
		/* @__PURE__ */ (0, Q.jsxs)(f, {
			selectedKey: c,
			onSelectionChange: (e) => {
				let t = String(e);
				an(t) && (S(/* @__PURE__ */ new Set()), D(/* @__PURE__ */ new Set()), l(t), P({ tab: t }));
			},
			className: "flex flex-col gap-6",
			children: [
				/* @__PURE__ */ (0, Q.jsx)(ft, {
					"aria-label": "关注管理区域",
					"data-section-nav": !0,
					"data-section-items": !0,
					className: "flex max-w-full flex-nowrap overflow-x-auto",
					children: E.map(([e, t]) => /* @__PURE__ */ (0, Q.jsx)(d, {
						id: e,
						"data-pill-selected": c === e ? "" : void 0,
						"data-pill-variant": "gray",
						className: "cursor-pointer whitespace-nowrap",
						children: t
					}, e))
				}),
				/* @__PURE__ */ (0, Q.jsxs)(u, {
					id: "list",
					className: "flex flex-col gap-4",
					children: [/* @__PURE__ */ (0, Q.jsx)(rn, {
						readOnly: a,
						toast: r,
						onAdd: () => {
							l("add"), P({ tab: "add" });
						},
						selection: {
							ids: C,
							onChange: D,
							onActivate: () => S(/* @__PURE__ */ new Set())
						}
					}), /* @__PURE__ */ (0, Q.jsx)(ht, {
						data: j,
						sort: h,
						dir: _,
						page: p,
						layout: v,
						pageSize: ne,
						selected: x,
						readOnly: a,
						toast: r,
						openFollow: i,
						onAdd: () => {
							l("add"), P({ tab: "add" });
						},
						onSort: (e, t) => {
							g(e), te(t), m(1), P({
								sort: e,
								dir: t,
								page: 1
							});
						},
						onPage: (e) => {
							m(e), P({ page: e });
						},
						onSelected: (e) => {
							S(e), D(/* @__PURE__ */ new Set());
						},
						onLayout: (e) => {
							y(e), m(1), n({ layout: e }), P({ page: 1 });
						},
						onPageSize: (e) => {
							b(e), m(1), n({ pageSize: e }), P({ page: 1 });
						}
					})]
				}),
				/* @__PURE__ */ (0, Q.jsxs)(u, {
					id: "add",
					className: "flex flex-col gap-8",
					children: [
						/* @__PURE__ */ (0, Q.jsx)(Dt, {
							data: j,
							credentials: M,
							readOnly: a,
							toast: r
						}),
						/* @__PURE__ */ (0, Q.jsx)(Mt, {
							readOnly: a,
							toast: r,
							onAdded: () => {
								A.refetch(), l("list"), P({ tab: "list" });
							}
						}),
						/* @__PURE__ */ (0, Q.jsx)(Gt, {
							groups: j.author_aliases || [],
							readOnly: a,
							toast: r,
							suggestions: j.alias_suggestions || [],
							sources: j.sources
						})
					]
				}),
				/* @__PURE__ */ (0, Q.jsx)(u, {
					id: "tags",
					className: "flex flex-col gap-4",
					children: /* @__PURE__ */ (0, Q.jsx)(H, { scope: "online" })
				})
			]
		}),
		/* @__PURE__ */ (0, Q.jsx)("div", { children: /* @__PURE__ */ (0, Q.jsxs)(ee, {
			variant: "secondary",
			href: "/settings/subscriptions",
			children: ["来源与订阅设置", B ? `（${B}）` : ""]
		}) })
	] });
}
export { sn as FollowManagePage };

//# debugId=d288ec2d-28e5-4abb-9428-670c3d5925eb