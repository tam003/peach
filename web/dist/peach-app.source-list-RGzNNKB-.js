(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "24150a53-b068-4bed-9880-72d9ffe0a124", e._sentryDebugIdIdentifier = "sentry-dbid-24150a53-b068-4bed-9880-72d9ffe0a124");
	} catch {}
})();
import { createPaginatedRowModel as e } from "./peach-app.createPaginatedRowModel-ClHnhG_T.js";
import { $76d00c5a4edb230a$export$76ccd210b9029917 as t, $76d00c5a4edb230a$export$816b5d811295e6bc as n, $76d00c5a4edb230a$export$b59bdbef9ce70de2 as r, $76d00c5a4edb230a$export$f6f0c3fe4ec306ea as i, $76d00c5a4edb230a$export$f850895b287ef28e as ee, $ea3928288112382f$export$439d29a4e110a164 as a, Button as o, Bx as te, COLUMN_SORT as s, Checkbox as c, ChevronSortDown as ne, CollapseChevron as re, CollapseRegion as l, DataTableFooter as u, DataTableFrame as d, EmptyState as ie, FOLLOW_CHECK_KEY as f, LAYOUTS as ae, M6 as oe, Note as p, SORT_DEFAULT_DIR as se, SORT_OPTIONS as ce, Select as le, SelectItem as ue, SelectionDock as de, SortDirectionIcon as fe, Switch as pe, Table as me, TableColumnControls as he, TableColumnResizer as ge, TableSelectionHeader as _e, TaskProgress as ve, Un as ye, __toESM as m, authorGroups as be, authorName as xe, busyProps as h, cardClass as Se, checkEvidenceGap as Ce, checkFailures as we, checkReceipt as Te, checkSummary as Ee, checkedText as De, clickedBlank as g, columnVisibilityFeature as Oe, confirmModal as _, createColumnHelper as ke, dZ as v, dropSources as Ae, du as je, errorHeadline as Me, errorMessage as y, fetchCheckJob as Ne, fetchPending as Pe, flexRender as Fe, isBroken as Ie, l7 as b, listSeparator as x, mapLimit as Le, markItem as Re, pageWindow as ze, patchSource as Be, phrase as S, reloadFollowManage as Ve, removeSource as He, require_jsx_runtime as C, require_react as w, rowPaginationFeature as Ue, rowSelectionFeature as We, rowSortingFeature as Ge, selectionState as Ke, setSourceEnabled as qe, sortLabel as Je, startCheck as Ye, tableFeatures as T, tableRows as Xe, toggleGroup as E, useBackgroundJob as Ze, useMutation as D, useTable as Qe, useTablePreferences as $e } from "./peach-app.js";
import { AuthorAvatar as et, ErrorLine as tt, SourceIcon as O, SourceLink as nt, StatusBadge as rt } from "./peach-app.source-view-qoHWj3C_.js";
// src/react/follow-manage/source-list.tsx
var k = /* @__PURE__ */ m(w(), 1), A = C(), it = T({
	rowPaginationFeature: Ue,
	rowSelectionFeature: We,
	rowSortingFeature: Ge,
	columnVisibilityFeature: Oe,
	paginatedRowModel: e()
}), j = (e) => (Number(e) || 0).toLocaleString(), at = Object.fromEntries(Object.entries(s).map(([e, t]) => [t, e])), M = 740;
function ot() {
	let [e, t] = (0, k.useState)(!1), n = (0, k.useRef)(null), r = (0, k.useCallback)((e) => {
		if (n.current?.disconnect(), !e) {
			n.current = null;
			return;
		}
		let r = new ResizeObserver(() => t(e.clientWidth < M));
		r.observe(e), n.current = r, t(e.clientWidth < M);
	}, []);
	return (0, k.useEffect)(() => () => n.current?.disconnect(), []), [r, e];
}
var st = {
	get select() {
		return S("选择");
	},
	get author() {
		return S("创作者");
	},
	get source() {
		return S("来源");
	},
	get provider() {
		return S("站点");
	},
	get status() {
		return S("状态");
	},
	get checked() {
		return S("上次检查");
	},
	get actions() {
		return S("操作");
	}
}, ct = Object.entries(st).map(([e, t]) => ({
	id: e,
	label: t,
	width: e === "select" ? 48 : e === "source" ? 320 : e === "author" ? 240 : e === "actions" ? 208 : 184,
	min: e === "select" ? 48 : e === "actions" ? 200 : e === "source" ? 320 : 112,
	max: e === "select" ? 48 : e === "source" ? 2e3 : 800,
	flex: e === "source",
	required: e === "select" || e === "source"
}));
function lt({ source: e, selected: t, onToggle: n, handlers: r }) {
	return /* @__PURE__ */ (0, A.jsxs)("div", {
		"data-selected": t || void 0,
		"data-follow-source-row": "",
		className: "flex min-h-16 flex-wrap items-center gap-3 px-2 py-3 last:rounded-b-lg max-sm:gap-x-2",
		onClick: (e) => {
			g(e, e.currentTarget) && n(!t);
		},
		children: [
			/* @__PURE__ */ (0, A.jsx)(c, {
				isSelected: t,
				onChange: n,
				"aria-label": `选择 ${e.label}`
			}),
			/* @__PURE__ */ (0, A.jsxs)("span", {
				className: "flex min-w-0 grow basis-0 items-center gap-1.5",
				children: [/* @__PURE__ */ (0, A.jsx)("span", {
					"data-follow-source-site": "",
					className: "flex shrink-0 items-center text-body-medium",
					children: /* @__PURE__ */ (0, A.jsx)(O, { provider: e.provider })
				}), /* @__PURE__ */ (0, A.jsx)(nt, { source: e })]
			}),
			/* @__PURE__ */ (0, A.jsx)(a, { children: e.provider_label }),
			/* @__PURE__ */ (0, A.jsx)(rt, { source: e }),
			e.last_error ? /* @__PURE__ */ (0, A.jsxs)("span", {
				"data-follow-source-error": "",
				className: "flex min-w-0 basis-full gap-3 max-sm:gap-x-2 sm:order-last",
				children: [/* @__PURE__ */ (0, A.jsx)("span", {
					"aria-hidden": !0,
					className: "w-4 shrink-0"
				}), /* @__PURE__ */ (0, A.jsxs)("span", {
					className: "flex min-w-0 grow gap-1.5",
					children: [/* @__PURE__ */ (0, A.jsx)("span", {
						"aria-hidden": !0,
						className: "w-(--icon-inline) shrink-0 text-body-medium"
					}), /* @__PURE__ */ (0, A.jsx)("span", {
						className: "min-w-0 grow",
						children: /* @__PURE__ */ (0, A.jsx)(tt, { text: e.last_error })
					})]
				})]
			}) : null,
			/* @__PURE__ */ (0, A.jsxs)("span", {
				"data-follow-source-controls": "",
				className: "flex w-max max-w-full flex-none flex-wrap items-center gap-1.5 max-sm:w-full",
				children: [
					/* @__PURE__ */ (0, A.jsx)("span", {
						className: "shrink-0 text-body-2-regular whitespace-nowrap text-text-secondary max-sm:mr-auto max-sm:text-caption-1-regular",
						children: De(e)
					}),
					/* @__PURE__ */ (0, A.jsx)(pe, {
						"aria-label": S("启用 {label}", { label: e.label }),
						isSelected: e.enabled,
						isDisabled: r.readOnly,
						onChange: (t) => r.toggle(e, t)
					}),
					/* @__PURE__ */ (0, A.jsxs)("span", {
						className: "flex shrink-0 items-center gap-1",
						children: [/* @__PURE__ */ (0, A.jsx)(o, {
							variant: "secondary",
							size: "small",
							iconOnly: !0,
							leadingIcon: v,
							"aria-label": S("检查 {label} 的更新", { label: e.label }),
							disabled: !e.enabled || r.readOnly,
							...h(r.busy),
							onClick: () => r.check([e.id])
						}), /* @__PURE__ */ (0, A.jsx)(o, {
							variant: "secondary",
							size: "small",
							iconOnly: !0,
							leadingIcon: oe,
							"aria-label": S("移除 {label}", { label: e.label }),
							disabled: r.readOnly,
							onClick: () => r.remove(e)
						})]
					})
				]
			})
		]
	});
}
function ut({ group: e, name: t, open: n, selected: r, handlers: i, onOpen: ee, onToggleGroup: te, onToggle: s }) {
	let c = e.map((e) => e.id), ne = e.filter((e) => e.enabled).map((e) => e.id), u = e.filter(Ie).length, d = [...new Set(e.map((e) => e.provider_label || e.provider))].join(x()), ie = `follow-author-${e[0].id}`, f = Ke(r, c);
	return /* @__PURE__ */ (0, A.jsxs)("section", {
		"aria-label": S("{name} 的关注来源", { name: t }),
		className: Se({
			variant: "raised",
			padding: "none",
			className: "flex flex-col overflow-hidden p-2"
		}),
		children: [/* @__PURE__ */ (0, A.jsxs)("div", {
			"data-follow-author-header": !0,
			"data-open": n || void 0,
			className: "flex flex-wrap items-center gap-3 px-2 py-2.5",
			children: [
				/* @__PURE__ */ (0, A.jsx)(et, {
					group: e,
					name: t
				}),
				/* @__PURE__ */ (0, A.jsxs)("span", {
					className: "flex min-w-0 grow basis-0 flex-col gap-1",
					children: [/* @__PURE__ */ (0, A.jsx)("b", {
						className: "min-w-0 text-body-medium wrap-anywhere text-text-primary",
						children: t
					}), /* @__PURE__ */ (0, A.jsxs)("span", {
						"data-follow-author-sites": "",
						className: "flex min-w-0 flex-wrap items-center gap-1 text-body-2-regular",
						title: d,
						children: [
							e.map((e) => /* @__PURE__ */ (0, A.jsx)(O, { provider: e.provider }, e.id)),
							/* @__PURE__ */ (0, A.jsx)(a, { children: `来源：${d}` }),
							u ? /* @__PURE__ */ (0, A.jsx)("span", {
								className: "ml-1 shrink-0 text-text-error-primary",
								children: `${u} 个失败`
							}) : null
						]
					})]
				}),
				/* @__PURE__ */ (0, A.jsxs)("span", {
					"data-follow-author-controls": "",
					className: "flex flex-none items-center gap-2 max-sm:w-full max-sm:justify-end",
					children: [/* @__PURE__ */ (0, A.jsx)(o, {
						variant: "secondary",
						size: "small",
						iconOnly: !0,
						leadingIcon: v,
						"aria-label": `检查 ${t} 的全部来源`,
						disabled: !ne.length || i.readOnly,
						...h(i.busy),
						onClick: () => i.check(ne)
					}), /* @__PURE__ */ (0, A.jsxs)("span", {
						className: "flex flex-none items-center gap-2",
						children: [/* @__PURE__ */ (0, A.jsx)(o, {
							variant: "secondary",
							size: "small",
							leadingIcon: b,
							"aria-pressed": f.all ? "true" : f.some ? "mixed" : "false",
							"aria-label": S("{value} {name} 的来源", {
								value: f.all ? S("取消全选") : S("全选"),
								name: t
							}),
							onClick: () => te(!f.all),
							children: f.all ? S("取消全选") : S("全选")
						}), /* @__PURE__ */ (0, A.jsx)(o, {
							variant: "secondary",
							size: "small",
							"aria-expanded": n,
							"aria-controls": ie,
							leadingIcon: re,
							"aria-label": `${n ? "收起" : "展开"} ${t} 的来源`,
							onClick: () => ee(!n),
							children: n ? "收起" : "展开"
						})]
					})]
				})
			]
		}), /* @__PURE__ */ (0, A.jsx)(l, {
			id: ie,
			open: n,
			"data-source-divider": !0,
			children: e.map((e) => /* @__PURE__ */ (0, A.jsx)(lt, {
				source: e,
				handlers: i,
				selected: r.has(e.id),
				onToggle: (t) => s(e.id, t)
			}, e.id))
		})]
	});
}
function dt(e) {
	let { data: l, sort: m, dir: g, page: Oe, layout: Ie, pageSize: b, selected: x, readOnly: C, onSort: w, onPage: Ue, onLayout: We, onPageSize: Ge, onSelected: T, toast: M, openFollow: lt, onAdd: dt } = e, N = l.sources, P = (0, k.useMemo)(() => l.author_aliases || [], [l.author_aliases]), F = l.counts || {}, [I, ft] = (0, k.useState)(/* @__PURE__ */ new Set()), [pt, mt] = ot(), [ht, L] = (0, k.useState)(""), R = (0, k.useMemo)(() => be(N, m, g, P), [
		N,
		m,
		g,
		P
	]), gt = (0, k.useMemo)(() => Xe(R, m, g, P), [
		R,
		m,
		g,
		P
	]), { job: z, running: B, outcome: V, start: _t } = Ze({
		queryKey: f,
		queryFn: ({ signal: e }) => Ne(e),
		start: (e) => Ye(e),
		onError: (e) => L(y(e)),
		onFinish: (e) => {
			Ve(), M(e.status === "failed" ? e.error || S("检查失败") : Te(e));
		}
	}), H = (e) => {
		B || _t.isPending || (L(""), _t.mutate(e));
	}, vt = (e, t) => T(E(x, [e], t)), yt = (e, t) => T(E(x, e, t)), bt = D({
		mutationFn: (e) => He(e),
		onSuccess: (e, t) => {
			Ae([t]), T(E(x, [t], !1)), M(S("已取消关注来源"));
		},
		onError: (e) => L(y(e))
	}), xt = D({
		mutationFn: (e) => qe(e.id, e.enabled),
		onSuccess: (e, t) => {
			Be(t.id, { enabled: t.enabled }), L("");
		},
		onError: (e) => L(y(e))
	}), St = (e) => void _({
		title: S("取消关注来源"),
		body: S("将移除这个来源及已抓取的条目，媒体文件保留。"),
		confirmLabel: S("取消关注来源"),
		danger: !0,
		onConfirm: () => bt.mutateAsync(e.id)
	}), U = D({
		mutationFn: async (e) => {
			let t = await Le(e.ids, 4, async (t) => {
				e.action === "remove" ? await He(t) : await qe(t, e.action === "enabled");
			});
			return {
				...e,
				done: e.ids.filter((e, n) => t[n]?.ok),
				results: t
			};
		},
		onSuccess: (e) => {
			if (e.action === "remove") Ae(e.done);
			else for (let t of e.done) Be(t, { enabled: e.action === "enabled" });
			T(E(x, e.done, !1));
			let t = e.results.filter((e) => !e.ok);
			if (t.length) {
				L(S("{length}/{length2} 个来源未更新：{error}", {
					length: t.length,
					length2: e.ids.length,
					error: y(t[0]?.error)
				}));
				return;
			}
			L("");
			let n = e.action === "remove" ? S("删除") : e.action === "enabled" ? S("启用") : S("暂停");
			M(S("已{word} {length} 个关注来源", {
				word: n,
				length: e.done.length
			}));
		},
		onError: (e) => L(y(e))
	}), W = D({
		mutationFn: async (e) => {
			let t = ((await Pe()).groups || []).flatMap((e) => [
				e.primary,
				...e.variants,
				...e.duplicates
			]).filter((e) => e.status === "new").map((e) => e.id);
			return {
				ids: t,
				failed: (await Le(t, 6, (t) => Re(t, e))).filter((e) => !e.ok)
			};
		},
		onSuccess: (e) => {
			Ve(), e.failed.length ? L(S("批量更新 {length}/{length2} 项未完成", {
				length: e.failed.length,
				length2: e.ids.length
			})) : (L(""), M(S("已批量标记 {length} 项", { length: e.ids.length })));
		},
		onError: (e) => L(y(e))
	}), Ct = (e, t) => xt.mutate({
		id: e.id,
		enabled: t
	}), G = (0, k.useRef)({
		check: H,
		toggle: Ct,
		remove: St,
		busy: !1,
		readOnly: C
	});
	G.current = {
		check: H,
		toggle: Ct,
		remove: St,
		busy: B || _t.isPending,
		readOnly: C
	};
	let K = G.current, wt = (0, k.useMemo)(() => {
		let e = ke(), t = (e) => () => st[e] || e;
		return e.columns([
			e.display({
				id: "select",
				header: (e) => /* @__PURE__ */ (0, A.jsx)(_e, {
					table: e.table,
					label: "全选本页来源",
					page: !0
				}),
				cell: (e) => /* @__PURE__ */ (0, A.jsx)(c, {
					slot: null,
					isSelected: e.row.getIsSelected(),
					onChange: (t) => e.row.toggleSelected(t),
					"aria-label": S("选择 {label}", { label: e.row.original.source.label })
				})
			}),
			e.accessor((e) => e.author, {
				id: "author",
				header: t("author"),
				cell: (e) => /* @__PURE__ */ (0, A.jsxs)("span", {
					className: "flex min-w-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, A.jsx)(et, {
						group: e.row.original.group,
						name: e.row.original.author
					}), /* @__PURE__ */ (0, A.jsx)("span", {
						className: "min-w-0 break-words",
						children: e.row.original.author
					})]
				})
			}),
			e.accessor((e) => e.source.label, {
				id: "source",
				header: t("source"),
				cell: (e) => /* @__PURE__ */ (0, A.jsxs)("span", {
					className: "flex min-w-0 flex-col gap-0.5",
					children: [/* @__PURE__ */ (0, A.jsx)(nt, { source: e.row.original.source }), e.row.original.source.last_error ? /* @__PURE__ */ (0, A.jsx)(tt, { text: e.row.original.source.last_error }) : null]
				})
			}),
			e.accessor((e) => e.source.provider_label, {
				id: "provider",
				header: t("provider"),
				cell: (e) => /* @__PURE__ */ (0, A.jsxs)("span", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, A.jsx)(O, { provider: e.row.original.source.provider }), e.row.original.source.provider_label]
				})
			}),
			e.display({
				id: "status",
				header: t("status"),
				cell: (e) => /* @__PURE__ */ (0, A.jsx)(rt, { source: e.row.original.source })
			}),
			e.accessor((e) => e.source.last_checked_at || "", {
				id: "checked",
				header: t("checked"),
				cell: (e) => De(e.row.original.source)
			}),
			e.display({
				id: "actions",
				header: t("actions"),
				cell: (e) => /* @__PURE__ */ (0, A.jsxs)("span", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, A.jsx)(pe, {
							"aria-label": S("启用 {label}", { label: e.row.original.source.label }),
							isSelected: e.row.original.source.enabled,
							isDisabled: K.readOnly,
							onChange: (t) => G.current.toggle(e.row.original.source, t)
						}),
						/* @__PURE__ */ (0, A.jsx)(o, {
							variant: "secondary",
							size: "small",
							iconOnly: !0,
							leadingIcon: v,
							"aria-label": S("检查 {label} 的更新", { label: e.row.original.source.label }),
							disabled: !e.row.original.source.enabled || K.readOnly,
							...h(K.busy),
							onClick: () => G.current.check([e.row.original.source.id])
						}),
						/* @__PURE__ */ (0, A.jsx)(o, {
							variant: "secondary",
							size: "small",
							iconOnly: !0,
							leadingIcon: oe,
							"aria-label": S("移除 {label}", { label: e.row.original.source.label }),
							disabled: K.readOnly,
							onClick: () => G.current.remove(e.row.original.source)
						})
					]
				})
			})
		]);
	}, [K]), q = (0, k.useMemo)(() => {
		let e = at[m];
		return e ? [{
			id: e,
			desc: g === "desc"
		}] : [];
	}, [m, g]), Tt = (0, k.useMemo)(() => Object.fromEntries([...x].map((e) => [String(e), !0])), [x]), J = Ie === "table", Y = $e("follow-sources", ct), X = ze(J ? gt.length : R.length, b, Oe), Z = Qe({
		features: it,
		data: gt,
		columns: wt,
		getRowId: (e) => String(e.source.id),
		state: {
			sorting: q,
			rowSelection: Tt,
			pagination: {
				pageIndex: X.page - 1,
				pageSize: b
			},
			columnVisibility: Y.visibility
		},
		onColumnVisibilityChange: Y.change,
		manualSorting: !0,
		enableRowSelection: !0,
		onSortingChange: (e) => {
			let t = (typeof e == "function" ? e(q) : e)[0];
			if (!t) return;
			let n = s[t.id];
			n && w(n, t.desc ? "desc" : "asc");
		},
		onRowSelectionChange: (e) => {
			let t = typeof e == "function" ? e(Tt) : e;
			T(new Set(Object.entries(t).filter(([, e]) => e).map(([e]) => Number(e))));
		},
		onPaginationChange: (e) => {
			let t = {
				pageIndex: X.page - 1,
				pageSize: b
			}, n = typeof e == "function" ? e(t) : e;
			n.pageSize === b ? n.pageIndex !== t.pageIndex && Ue(n.pageIndex + 1) : Ge(n.pageSize);
		}
	}), Et = Z.getRowModel().rows, Dt = J ? Et.map((e) => e.original.source.id) : R.slice(X.start, X.end).flatMap((e) => e.map((e) => e.id)), Ot = Ke(x, Dt), Q = [...x], kt = we(V), At = N.filter((e) => e.enabled && (e.last_status === "error" || e.last_status === "unauthorized")).map((e) => e.id), jt = Ce(V), $ = R.length > 0 && I.size >= R.length;
	return N.length ? /* @__PURE__ */ (0, A.jsxs)("div", {
		className: Se({
			padding: "none",
			className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
		}),
		children: [
			/* @__PURE__ */ (0, A.jsxs)("div", {
				ref: pt,
				"data-follow-toolbar": "",
				"data-responsive-toolbar": "",
				children: [/* @__PURE__ */ (0, A.jsxs)("span", {
					"data-follow-toolbar-heading": "",
					"data-toolbar-heading": "",
					children: [/* @__PURE__ */ (0, A.jsx)("h3", {
						className: "text-title-2-medium text-text-primary",
						children: "关注列表"
					}), /* @__PURE__ */ (0, A.jsx)("span", {
						className: "text-body-2-regular text-text-secondary",
						children: S("{length} 个来源{text}", {
							length: N.length.toLocaleString(),
							text: F.new ? S(" · {new} 条未看", { new: j(F.new) }) : ""
						})
					})]
				}), /* @__PURE__ */ (0, A.jsxs)("div", {
					"data-follow-toolbar-actions": "",
					"data-toolbar-actions": "",
					children: [
						At.length ? /* @__PURE__ */ (0, A.jsx)(o, {
							variant: "secondary",
							disabled: C,
							...h(K.busy),
							onClick: () => H(At),
							children: "检查失败项"
						}) : null,
						/* @__PURE__ */ (0, A.jsx)(o, {
							variant: "primary",
							leadingIcon: v,
							disabled: C,
							"aria-label": "检查全部",
							iconOnly: mt,
							...h(K.busy),
							onClick: () => H([]),
							children: "检查全部"
						}),
						/* @__PURE__ */ (0, A.jsxs)("span", {
							"data-follow-toolbar-controls": "",
							className: "contents",
							children: [
								/* @__PURE__ */ (0, A.jsxs)("span", {
									"data-button-group": !0,
									role: "group",
									"aria-label": "关注列表版式",
									children: [/* @__PURE__ */ (0, A.jsx)(o, {
										variant: "ghost",
										iconOnly: !0,
										leadingIcon: ye,
										"aria-label": ae()[0][1],
										"aria-pressed": !J,
										onClick: () => We("default")
									}), /* @__PURE__ */ (0, A.jsx)(o, {
										variant: "ghost",
										iconOnly: !0,
										leadingIcon: je,
										"aria-label": ae()[1][1],
										"aria-pressed": J,
										onClick: () => We("table")
									})]
								}),
								J ? /* @__PURE__ */ (0, A.jsx)(he, {
									preferences: Y,
									label: "关注来源"
								}) : null,
								/* @__PURE__ */ (0, A.jsxs)("span", {
									className: "flex flex-none items-center gap-2",
									children: [/* @__PURE__ */ (0, A.jsx)(le, {
										"aria-label": "关注列表排序",
										prefix: "排序",
										selectedKey: m,
										onSelectionChange: (e) => {
											if (e === null) return;
											let t = String(e);
											w(t, se[t]);
										},
										children: ce.map(([e, t]) => /* @__PURE__ */ (0, A.jsx)(ue, {
											id: e,
											children: t
										}, e))
									}), /* @__PURE__ */ (0, A.jsx)(o, {
										variant: "secondary",
										iconOnly: !0,
										leadingIcon: fe,
										"data-icon-state": g === "asc" ? "a" : "b",
										"aria-label": Je(m, g),
										onClick: () => w(m, g === "asc" ? "desc" : "asc")
									})]
								}),
								J ? null : /* @__PURE__ */ (0, A.jsx)(o, {
									variant: "secondary",
									iconOnly: mt,
									leadingIcon: re,
									"aria-expanded": !$,
									"aria-label": $ ? "全部展开" : "全部收起",
									onClick: () => ft($ ? /* @__PURE__ */ new Set() : new Set(R.map((e) => String(e[0].author_key || e[0].id)))),
									children: S($ ? "全部展开" : "全部收起")
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, A.jsxs)("div", {
				"aria-live": "polite",
				className: "flex flex-col gap-3 empty:hidden",
				children: [
					B ? /* @__PURE__ */ (0, A.jsx)(ve, {
						embedded: !0,
						label: z?.message || (z?.total ? S("{value}：已完成 {checked}/{total} 个来源", {
							value: z.older ? S("抓取历史") : S("检查更新"),
							checked: z.checked || 0,
							total: z.total
						}) : S("正在准备检查任务")),
						value: z?.checked,
						total: z?.total
					}) : null,
					ht ? /* @__PURE__ */ (0, A.jsx)(p, {
						tone: "error",
						title: S("操作未完成"),
						children: ht
					}) : null,
					!B && V?.results?.length ? /* @__PURE__ */ (0, A.jsx)(p, {
						tone: "neutral",
						title: S("检查结果"),
						children: Ee(V)
					}) : null,
					kt.length ? /* @__PURE__ */ (0, A.jsx)(p, {
						tone: "error",
						title: S("{length} 个来源检查失败", { length: kt.length }),
						extra: /* @__PURE__ */ (0, A.jsx)("ul", {
							className: "flex flex-col gap-0.5 text-body-2-regular",
							children: kt.map((e, t) => /* @__PURE__ */ (0, A.jsx)("li", { children: `${e.provider_label || e.provider || ""} ${e.author || e.label || e.ref || ""}：${Me(e.error || "") || S("未说明原因")}` }, `${e.provider || ""}-${e.ref || t}`))
						}),
						children: S("这些来源这一轮没有取到更新。")
					}) : null,
					jt ? /* @__PURE__ */ (0, A.jsx)(p, {
						tone: "warning",
						children: S("条目已保存，但这次未保存来源的原始响应：{evidence}", { evidence: jt })
					}) : null
				]
			}),
			/* @__PURE__ */ (0, A.jsxs)(de, {
				label: S("关注来源批量操作"),
				visible: Q.length > 0,
				count: S("已选 {length} 个来源", { length: Q.length }),
				children: [
					/* @__PURE__ */ (0, A.jsx)(o, {
						variant: "secondary",
						size: "small",
						disabled: C,
						...h(K.busy),
						onClick: () => H(Q),
						children: S("检查所选")
					}),
					/* @__PURE__ */ (0, A.jsx)(o, {
						variant: "secondary",
						size: "small",
						disabled: C,
						...h(U.isPending),
						onClick: () => U.mutate({
							ids: Q,
							action: "enabled"
						}),
						children: S("启用")
					}),
					/* @__PURE__ */ (0, A.jsx)(o, {
						variant: "secondary",
						size: "small",
						disabled: C,
						...h(U.isPending),
						onClick: () => U.mutate({
							ids: Q,
							action: "paused"
						}),
						children: S("暂停")
					}),
					/* @__PURE__ */ (0, A.jsx)(o, {
						variant: "danger",
						size: "small",
						disabled: C,
						...h(U.isPending),
						onClick: () => void _({
							title: S("删除 {length} 个关注来源", { length: Q.length }),
							body: S("将移除所选关注来源及其已抓取条目，媒体文件保留。"),
							confirmLabel: S("删除所选来源"),
							danger: !0,
							onConfirm: () => U.mutateAsync({
								ids: Q,
								action: "remove"
							})
						}),
						children: S("删除")
					}),
					/* @__PURE__ */ (0, A.jsx)(o, {
						variant: "ghost",
						size: "small",
						onClick: () => T(/* @__PURE__ */ new Set()),
						children: S("取消选择")
					})
				]
			}),
			J ? /* @__PURE__ */ (0, A.jsx)(d, {
				follow: !0,
				preferences: Y,
				onRowClick: (e) => vt(Number(e), !x.has(Number(e))),
				children: /* @__PURE__ */ (0, A.jsxs)(me, {
					"aria-label": "关注来源",
					size: "sm",
					sortDescriptor: q[0] ? {
						column: q[0].id,
						direction: q[0].desc ? "descending" : "ascending"
					} : void 0,
					onSortChange: (e) => Z.setSorting([{
						id: String(e.column),
						desc: e.direction === "descending"
					}]),
					children: [/* @__PURE__ */ (0, A.jsxs)(ee, { children: [Z.getHeaderGroups()[0].headers.map((e) => {
						let t = e.column.id in s, r = Fe(e.column.columnDef.header, e.getContext());
						return /* @__PURE__ */ (0, A.jsx)(n, {
							id: e.id,
							allowsSorting: t,
							isRowHeader: e.column.id === "source",
							...Y.columnProps(e.id),
							children: ({ sortDirection: n }) => /* @__PURE__ */ (0, A.jsxs)(A.Fragment, { children: [e.id === "select" ? r : t ? /* @__PURE__ */ (0, A.jsxs)("span", {
								className: "flex items-center gap-0.5",
								children: [r, /* @__PURE__ */ (0, A.jsx)("span", {
									"data-sort-indicator": !0,
									"data-direction": n || void 0,
									children: /* @__PURE__ */ (0, A.jsx)(ne, {})
								})]
							}) : /* @__PURE__ */ (0, A.jsx)(a, { children: r }), /* @__PURE__ */ (0, A.jsx)(ge, {
								preferences: Y,
								id: e.id
							})] })
						}, e.id);
					}), /* @__PURE__ */ (0, A.jsx)(n, {
						id: "remaining-space",
						"aria-label": "行空白区域",
						"data-table-space": "",
						width: Y.spaceWidth,
						minWidth: 0
					})] }), /* @__PURE__ */ (0, A.jsx)(t, {
						renderEmptyState: () => S("这一页没有来源"),
						children: Et.map((e) => /* @__PURE__ */ (0, A.jsxs)(r, {
							id: e.id,
							"data-follow-selected": e.getIsSelected() || void 0,
							children: [e.getVisibleCells().map((e) => /* @__PURE__ */ (0, A.jsx)(i, { children: Fe(e.column.columnDef.cell, e.getContext()) }, e.id)), /* @__PURE__ */ (0, A.jsx)(i, { "data-table-space": "" })]
						}, e.id))
					})]
				})
			}) : /* @__PURE__ */ (0, A.jsxs)(A.Fragment, { children: [/* @__PURE__ */ (0, A.jsx)(c, {
				isSelected: Ot.all,
				isIndeterminate: Ot.some,
				onChange: (e) => yt(Dt, e),
				"aria-label": S("全选本页来源"),
				children: S("全选本页")
			}), /* @__PURE__ */ (0, A.jsx)("div", {
				className: "flex flex-col gap-3",
				children: R.slice(X.start, X.end).map((e) => {
					let t = String(e[0].author_key || e[0].id);
					return /* @__PURE__ */ (0, A.jsx)(ut, {
						group: e,
						name: xe(e, P),
						handlers: K,
						selected: x,
						open: !I.has(t),
						onOpen: (e) => {
							let n = new Set(I);
							e ? n.delete(t) : n.add(t), ft(n);
						},
						onToggleGroup: (t) => yt(e.map((e) => e.id), t),
						onToggle: vt
					}, t);
				})
			})] }),
			/* @__PURE__ */ (0, A.jsx)(u, {
				label: S("关注列表"),
				total: X.total,
				pagination: {
					pageIndex: X.page - 1,
					pageSize: b
				},
				unit: S(J ? "个来源" : "位创作者"),
				pageUnit: S(J ? "条" : "位"),
				onChange: (e) => {
					e.pageSize === b ? Z.setPageIndex(e.pageIndex) : Z.setPageSize(e.pageSize);
				}
			}),
			F.new ? /* @__PURE__ */ (0, A.jsxs)("div", {
				className: "-mx-6 -mb-5 flex flex-wrap items-center gap-2 border-t border-separator-border rounded-b-2xl bg-card-footer px-6 py-4 max-sm:-mx-4 max-sm:px-4",
				children: [
					/* @__PURE__ */ (0, A.jsx)("span", {
						className: "mr-auto text-body-2-regular text-text-secondary",
						children: S("未看 {new} · 已看 {seen} · 已保存 {saved} · 已忽略 {ignored}", {
							new: j(F.new),
							seen: j(F.seen),
							saved: j(F.saved),
							ignored: j(F.ignored)
						})
					}),
					/* @__PURE__ */ (0, A.jsx)(o, {
						variant: "secondary",
						size: "small",
						onClick: lt,
						children: S("去看更新")
					}),
					/* @__PURE__ */ (0, A.jsx)(o, {
						variant: "secondary",
						size: "small",
						disabled: C,
						...h(W.isPending),
						onClick: () => void _({
							title: S("标记已看"),
							body: S("将把当前未看作品标记为已看。"),
							confirmLabel: S("标记已看"),
							onConfirm: () => W.mutateAsync("seen")
						}),
						children: S("全部标记已看")
					}),
					/* @__PURE__ */ (0, A.jsx)(o, {
						variant: "secondary",
						size: "small",
						disabled: C,
						...h(W.isPending),
						onClick: () => void _({
							title: S("标记已忽略"),
							body: S("将把当前未看作品标记为已忽略。"),
							confirmLabel: S("标记已忽略"),
							onConfirm: () => W.mutateAsync("ignored")
						}),
						children: S("全部忽略")
					})
				]
			}) : null
		]
	}) : /* @__PURE__ */ (0, A.jsx)(ie, {
		icon: te,
		title: "还没有关注来源",
		actions: /* @__PURE__ */ (0, A.jsx)(o, {
			variant: "primary",
			size: "small",
			onClick: dt,
			children: "添加关注"
		}),
		children: "关注来源及其检查状态会显示在这里。"
	});
}
export { dt as SourceList };

//# debugId=24150a53-b068-4bed-9880-72d9ffe0a124