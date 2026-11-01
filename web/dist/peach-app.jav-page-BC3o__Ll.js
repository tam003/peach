(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "3581b4e1-895c-447f-95af-15275c70433a", e._sentryDebugIdIdentifier = "sentry-dbid-3581b4e1-895c-447f-95af-15275c70433a");
	} catch {}
})();
import { $fe21c36db05242bb$export$d7b12c4107be0d61 as e, ArtSlot as t, Button as n, ButtonLink as r, Chip as i, CloudDownloadDialog as a, DISCOVERY_SORTS as o, DOWNLOADS_KEY as s, DOWNLOADS_URL as c, E3 as l, EmptyFocusButton as u, EmptyState as d, FilterGlassRows as f, FilterIconButton as p, FilterPill as m, GlassPill as h, Help as ee, Input as g, JAV_LAYOUTS as _, JAV_RECOMMENDATION_GRID as te, JavHeader as v, LibraryShortcuts as ne, M6 as y, Note as b, PHASES as x, Pagination as S, SEGMENT as C, SEGMENTED_TRACK as w, SegmentedRadioGroup as T, Segments as re, SortKeys as ie, SourceAvatar as ae, TaskProgress as oe, WANTS_KEY as se, WantMagnets as E, Wt as ce, __toESM as le, addWant as ue, apiGet as D, appSettingsStore as de, avatarInner as O, busyProps as k, cachedMagnetStates as A, cardClass as j, cardRatio as fe, coverUrl as pe, discoveryArtwork as me, discoveryKey as he, discoveryScore as ge, entityDisplayName as M, entityPath as _e, errorMessage as N, fetchDiscoveries as ve, fetchWants as P, gridLayout as ye, invalidateWants as F, javContentSkeleton as be, javLayout as xe, javTagSkeleton as Se, listSeparator as Ce, pageWindow as I, peachHistory$1 as L, phrase as R, qE as z, recommendationScore as we, relayoutCovers as Te, removeWants as B, require_jsx_runtime as V, require_react as H, resetWants as U, searchNote as W, shellNavigate as G, spriteGlyph as K, storeJavLayout as Ee, textLang as De, useAction as q, useEntityNames as J, useQuery as Y, wantName as X, wireHorizontalScroller as Oe } from "./peach-app.js";
import { ErrorLine as ke } from "./peach-app.source-view-qoHWj3C_.js";
import "./peach-app.source-list-RGzNNKB-.js";
// src/react/jav/discovery-faces.tsx
var Z = /* @__PURE__ */ le(H(), 1), Q = V();
function Ae({ item: e }) {
	J();
	let t = e.performer_refs?.length ? e.performer_refs : [...new Set(e.performers.split(/[,，、;/]/).filter(Boolean))].map((e) => ({ name: e })), n = t.slice(0, 5).map((t, n) => {
		let r = { "--media-avatar-index": n }, i = t.source_avatar && t.source_actor_id && !t.has_image ? { children: /* @__PURE__ */ (0, Q.jsx)(ae, {
			code: e.code,
			person: t
		}) } : { dangerouslySetInnerHTML: { __html: O(t.name, t, null) } };
		return t.id ? /* @__PURE__ */ (0, Q.jsx)("a", {
			"data-media-avatar": "",
			style: r,
			href: _e("performer", t.name, t.id),
			"aria-label": `打开女优页：${M("performer", t.name, t.id)}`,
			...i
		}, t.name) : /* @__PURE__ */ (0, Q.jsx)("span", {
			"data-media-avatar": "",
			style: r,
			title: M("performer", t.name),
			...i
		}, t.name);
	});
	return t.length > 1 ? /* @__PURE__ */ (0, Q.jsx)("div", {
		"data-media-avatars": "",
		style: { "--media-avatar-count": Math.min(5, t.length) },
		children: n
	}) : n[0] || null;
}
// src/react/wants/want-list.tsx
var je = {
	get code() {
		return R("手动添加");
	},
	get feed() {
		return R("订阅新作");
	},
	get follow() {
		return R("关注");
	}
}, Me = () => [
	["all", R("全部")],
	["available", R("有磁链")],
	["missing", R("没磁链")]
], Ne = (e) => [
	e.release_date,
	e.studio,
	e.performers,
	je[e.origin]
].filter(Boolean).join(" · ");
function Pe({ want: e }) {
	return /* @__PURE__ */ (0, Q.jsxs)("span", {
		className: "relative inline-grid w-card-cover shrink-0 aspect-card-cover place-items-center overflow-hidden rounded-2lg bg-background-tertiary-default max-sm:w-24",
		children: [/* @__PURE__ */ (0, Q.jsx)("span", {
			className: "text-caption-1-regular text-text-secondary",
			children: R("无封面")
		}), e.cover ? /* @__PURE__ */ (0, Q.jsx)("img", {
			src: e.cover,
			alt: "",
			loading: "lazy",
			referrerPolicy: e.remote_cover ? "no-referrer" : void 0,
			onError: (e) => e.currentTarget.remove(),
			className: "absolute inset-0 size-full object-cover"
		}) : null]
	});
}
function Fe({ want: e, readOnly: t, busy: i, onReset: a, onRemove: o, onCloudDownload: s, downloads: c, provider: l, toast: u }) {
	let [d, f] = (0, Z.useState)(""), p = e.link || d || (e.code ? `https://javdb.com/search?q=${encodeURIComponent(e.code)}&f=all` : "");
	return /* @__PURE__ */ (0, Q.jsxs)("li", {
		"data-want-id": e.id,
		className: j({
			bordered: "soft",
			className: "flex flex-col gap-4 max-sm:p-4"
		}),
		children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "flex min-w-0 items-start gap-4 max-sm:gap-3",
			children: [/* @__PURE__ */ (0, Q.jsx)(Pe, { want: e }), /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col gap-1",
				children: [
					/* @__PURE__ */ (0, Q.jsxs)("p", {
						className: "flex min-w-0 flex-wrap items-baseline gap-x-2",
						children: [/* @__PURE__ */ (0, Q.jsx)("b", {
							className: "min-w-0 text-headline-medium wrap-anywhere text-text-primary",
							children: X(e)
						}), e.code && e.title ? /* @__PURE__ */ (0, Q.jsx)("span", {
							className: "min-w-0 truncate text-body-2-regular text-text-secondary",
							children: e.title
						}) : null]
					}),
					Ne(e) ? /* @__PURE__ */ (0, Q.jsx)("p", {
						className: "text-body-2-regular text-text-secondary",
						children: Ne(e)
					}) : null,
					!e.code || e.phase === "unreleased" || e.phase === "acquired" ? /* @__PURE__ */ (0, Q.jsx)("p", {
						"data-want-note": "",
						className: "text-caption-1-regular text-text-secondary",
						children: W(e)
					}) : null,
					e.scrape_error ? /* @__PURE__ */ (0, Q.jsx)(ke, {
						text: e.scrape_error,
						prefix: R("资料未取得："),
						tone: "muted"
					}) : null,
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "mt-1 flex flex-wrap items-center gap-2",
						children: [
							p ? /* @__PURE__ */ (0, Q.jsx)(r, {
								"data-button-link": "",
								variant: "secondary",
								size: "small",
								trailingIcon: ce,
								href: p,
								target: "_blank",
								rel: "noopener noreferrer",
								children: "来源页"
							}) : null,
							/* @__PURE__ */ (0, Q.jsx)(n, {
								variant: "secondary",
								size: "small",
								leadingIcon: y,
								disabled: t,
								...k(i === `remove:${e.id}`),
								onClick: o,
								children: "移除"
							}),
							e.phase === "given_up" ? /* @__PURE__ */ (0, Q.jsx)(n, {
								variant: "secondary",
								size: "small",
								disabled: t,
								...k(i === `reset:${e.id}`),
								onClick: a,
								children: R("重新查找")
							}) : null,
							e.phase === "searching" || e.phase === "given_up" ? /* @__PURE__ */ (0, Q.jsx)(n, {
								variant: "secondary",
								size: "small",
								onClick: s,
								children: "查找资源"
							}) : null
						]
					})
				]
			})]
		}), e.code && (e.phase === "searching" || e.phase === "given_up") ? /* @__PURE__ */ (0, Q.jsx)(E, {
			want: e,
			readOnly: t,
			downloads: c,
			provider: l,
			toast: u,
			onSource: f
		}) : null]
	});
}
function Ie({ phase: t, label: r, rows: i, row: a }) {
	let [o, s] = (0, Z.useState)(1), [c, l] = (0, Z.useState)("all"), u = A(i), f = (e) => e.has_magnets ?? u.get(e.code || "") ?? !1, p = i.filter(f), m = t !== "searching" || c === "all" ? i : i.filter((e) => f(e) === (c === "available")), h = I(m.length, 20, o);
	return /* @__PURE__ */ (0, Q.jsxs)("section", {
		"aria-label": r,
		"data-want-phase": t,
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, Q.jsxs)("h3", {
					className: "flex items-baseline gap-2 text-title-2-medium text-text-primary",
					children: [r, /* @__PURE__ */ (0, Q.jsx)("span", {
						className: "text-body-2-regular tabular-nums text-text-secondary",
						children: i.length.toLocaleString()
					})]
				}), t === "searching" ? /* @__PURE__ */ (0, Q.jsx)(T, {
					name: "want-magnet-filter",
					"aria-label": R("待找磁链筛选"),
					orientation: "horizontal",
					value: c,
					className: w,
					onChange: (e) => {
						l(e), s(1);
					},
					children: Me().map(([t, n]) => /* @__PURE__ */ (0, Q.jsxs)(e, {
						value: t,
						"aria-label": n,
						className: C,
						children: [n, /* @__PURE__ */ (0, Q.jsx)("span", {
							className: "text-caption-1-regular tabular-nums text-text-tertiary",
							children: (t === "all" ? i.length : t === "available" ? p.length : i.length - p.length).toLocaleString()
						})]
					}, t))
				}) : null]
			}),
			m.length ? null : /* @__PURE__ */ (0, Q.jsx)(d, {
				size: "compact",
				icon: z,
				title: "暂无符合条件的作品",
				actions: /* @__PURE__ */ (0, Q.jsx)(n, {
					size: "small",
					onClick: () => {
						l("all"), s(1);
					},
					children: "查看全部"
				}),
				children: null
			}),
			/* @__PURE__ */ (0, Q.jsx)("ul", {
				className: "flex flex-col gap-4",
				children: m.slice(h.start, h.end).map(a)
			}),
			h.pages > 1 ? /* @__PURE__ */ (0, Q.jsxs)("div", {
				"data-want-pager": "",
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, Q.jsx)("span", {
					className: "text-body-2-regular tabular-nums text-text-secondary",
					children: R("{start}–{end} / {total} 条", {
						start: (h.start + 1).toLocaleString(),
						end: h.end.toLocaleString(),
						total: h.total.toLocaleString()
					})
				}), /* @__PURE__ */ (0, Q.jsx)(S, {
					label: R("{label}分页", { label: r }),
					page: h.page,
					pages: h.pages,
					onPage: s
				})]
			}) : null
		]
	});
}
function Le({ readOnly: e, toast: t, query: r = "", clearQuery: i }) {
	let [o, l] = (0, Z.useState)(""), [f, p] = (0, Z.useState)(null), m = q(), h = Y({
		queryKey: se,
		queryFn: ({ signal: e }) => P(e),
		staleTime: 3e4,
		refetchInterval: (e) => e.state.data?.scraping ? 3e3 : !1
	}), _ = () => {
		let n = o.trim();
		n && !e && m.run("add", (e) => ue({ code: n }, e), (e) => {
			t(e.created ? R("已加入想要：{want}", { want: X(e.want) }) : R("{want} 已经在想要里", { want: X(e.want) })), l(""), F();
		});
	}, te = (e) => {
		e.key === "Enter" && !e.nativeEvent.isComposing && (e.preventDefault(), _());
	}, v = (e) => {
		m.run(`remove:${e.id}`, (t) => B([e.id], t), () => {
			t(R("已移除：{want}", { want: X(e) })), F();
		});
	}, ne = (e) => {
		m.run(`reset:${e.id}`, (t) => U([e.id], t), () => {
			t(R("{want} 回到待找", { want: X(e) })), F();
		});
	}, y = h.data, S = (y?.items || []).filter((e) => !r || [
		e.code,
		e.title,
		e.performers
	].join(" ").toLocaleLowerCase().includes(r.toLocaleLowerCase())), C = Y({
		queryKey: s,
		queryFn: ({ signal: e }) => D(`${c}?limit=100`, e),
		enabled: S.some((e) => e.code && (e.phase === "searching" || e.phase === "given_up"))
	}), w = C.data?.providers.filter((e) => e.configured) || [], T = w[0]?.key || "";
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		"aria-busy": h.isPending,
		className: "flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: j({
					padding: "none",
					className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
				}),
				children: [
					/* @__PURE__ */ (0, Q.jsx)("h3", {
						className: "text-title-2-medium text-text-primary",
						children: R("按番号添加")
					}),
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "flex flex-wrap items-end gap-2",
						children: [/* @__PURE__ */ (0, Q.jsx)("div", {
							className: "min-w-64 grow max-sm:min-w-0",
							children: /* @__PURE__ */ (0, Q.jsx)(g, {
								"aria-label": R("番号"),
								placeholder: R("输入番号，例如 SSIS-950"),
								value: o,
								isDisabled: e,
								onChange: l,
								onKeyDown: te
							})
						}), /* @__PURE__ */ (0, Q.jsx)(n, {
							variant: "primary",
							disabled: e || !o.trim(),
							...k(m.busy === "add"),
							onClick: _,
							children: R("添加")
						})]
					}),
					m.error ? /* @__PURE__ */ (0, Q.jsx)(b, {
						tone: "error",
						title: R("这一次没有完成"),
						children: m.error
					}) : null
				]
			}),
			h.error ? /* @__PURE__ */ (0, Q.jsx)(b, {
				tone: "error",
				title: R("想要清单读取失败"),
				children: N(h.error)
			}) : null,
			h.isPending ? /* @__PURE__ */ (0, Q.jsx)("div", {
				role: "status",
				"aria-label": R("正在读取想要"),
				dangerouslySetInnerHTML: { __html: be("wants") }
			}) : null,
			y?.scraping ? /* @__PURE__ */ (0, Q.jsx)(ee, {
				role: "status",
				children: R("正在给刚加入的番号取资料与封面。")
			}) : null,
			C.error ? /* @__PURE__ */ (0, Q.jsx)(b, {
				tone: "error",
				title: R("下载配置未取得"),
				children: N(C.error)
			}) : null,
			C.data && !w.length ? /* @__PURE__ */ (0, Q.jsxs)(b, {
				tone: "neutral",
				children: [R("尚未配置下载渠道。"), /* @__PURE__ */ (0, Q.jsx)("a", {
					href: "/settings/library?section=%E4%B8%8B%E8%BD%BD%E6%B8%A0%E9%81%93",
					children: R("下载渠道设置")
				})]
			}) : null,
			C.data && !C.data.available ? /* @__PURE__ */ (0, Q.jsx)(b, {
				tone: "neutral",
				children: R("云下载只在允许修改数据库的设备上可用。")
			}) : null,
			y && !S.length ? /* @__PURE__ */ (0, Q.jsx)(d, {
				size: "compact",
				icon: z,
				title: r ? "没有符合条件的作品" : "还没有想要的作品",
				actions: r && i ? /* @__PURE__ */ (0, Q.jsx)(n, {
					size: "small",
					onClick: i,
					children: "清除搜索"
				}) : !r && !e ? /* @__PURE__ */ (0, Q.jsx)(u, {
					target: "input[aria-label=\"番号\"]",
					children: "添加作品"
				}) : void 0,
				children: r ? "试试其他番号、女优或标题。" : "输入番号，添加想看的作品。"
			}) : null,
			x().map(([n, r]) => {
				let i = S.filter((e) => e.phase === n);
				return i.length ? /* @__PURE__ */ (0, Q.jsx)(Ie, {
					phase: n,
					label: r,
					rows: i,
					row: (n) => /* @__PURE__ */ (0, Q.jsx)(Fe, {
						want: n,
						readOnly: e,
						busy: m.busy,
						downloads: C.data,
						provider: T,
						toast: t,
						onReset: () => ne(n),
						onRemove: () => v(n),
						onCloudDownload: () => p({
							code: n.code || "",
							title: n.title || "",
							origin: `wishlist:${n.id}`,
							cover: n.cover || "",
							performers: n.performers || "",
							release_date: n.release_date || "",
							studio: n.studio || ""
						})
					}, n.id)
				}, n) : null;
			}),
			/* @__PURE__ */ (0, Q.jsx)(a, {
				prefill: f,
				close: () => p(null),
				receipt: t,
				provider: T
			})
		]
	});
}
// src/react/jav/jav-page.tsx
var Re = K("search"), ze = K("x"), Be = K("refresh-cw");
function $(e) {
	let t = new URLSearchParams(location.search);
	for (let [n, r] of Object.entries(e)) r ? t.set(n, r) : t.delete(n);
	G(location.pathname + (t.size ? `?${t}` : ""), {
		replace: !0,
		state: L.navigation.location.state
	});
}
function Ve({ tab: e, readOnly: t, navigate: n, receipt: r }) {
	let [i, o] = (0, Z.useState)(null), [s, c] = (0, Z.useState)(() => new URLSearchParams(location.search).get("q") || ""), l = (e) => {
		c(e), $({ q: e });
	};
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "flex w-full flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, Q.jsx)(v, {
				tab: e,
				navigate: n,
				find: () => o({})
			}),
			/* @__PURE__ */ (0, Q.jsx)("form", {
				"aria-label": R(e === "discover" ? "筛选推荐" : "筛选想要"),
				onSubmit: (e) => {
					e.preventDefault();
				},
				children: /* @__PURE__ */ (0, Q.jsx)(g, {
					type: "search",
					"aria-label": R(e === "discover" ? "筛选推荐" : "筛选想要"),
					placeholder: R("筛选番号、女优或标题"),
					leadingIcon: Re,
					value: s,
					onChange: l,
					enterKeyHint: "search"
				})
			}),
			e === "discover" ? /* @__PURE__ */ (0, Q.jsx)(He, {
				readOnly: t,
				receipt: r,
				resource: o,
				query: s.trim(),
				navigate: n,
				clearText: () => l("")
			}) : /* @__PURE__ */ (0, Q.jsx)(Le, {
				readOnly: t,
				toast: r,
				query: s.trim(),
				clearQuery: () => l("")
			}),
			/* @__PURE__ */ (0, Q.jsx)(a, {
				prefill: i,
				close: () => o(null),
				receipt: r
			})
		]
	});
}
function He({ readOnly: e, receipt: a, resource: s, query: c, navigate: u, clearText: ee }) {
	let g = new URLSearchParams(location.search), [v, y] = (0, Z.useState)(() => g.get("scope") === "library" ? "library" : "external"), [x, S] = (0, Z.useState)(() => g.get("tag") || ""), [C, w] = (0, Z.useState)(() => o().some(([e]) => e === g.get("sort")) ? g.get("sort") : "taste"), [T, ae] = (0, Z.useState)(() => g.get("dir") === "asc"), se = (e) => {
		y(e), $({ scope: e === "external" ? "" : e });
	}, E = (e) => {
		S(e), $({ tag: e });
	}, le = (e) => {
		w(e), $({ sort: e === "taste" ? "" : e });
	}, D = (e) => {
		ae(e), $({ dir: e ? "asc" : "" });
	}, O = (0, Z.useRef)(null);
	(0, Z.useEffect)(() => {
		let e = [...O.current?.querySelectorAll("[data-catalog-scroll],[data-catalog-tags],[data-filter-row=\"bottom\"]") || []].map((e) => Oe(e, { drag: !0 }));
		return () => e.forEach((e) => e.destroy());
	}, []);
	let A = de();
	(0, Z.useSyncExternalStore)(A.subscribe, A.version, A.version);
	let j = xe(), M = fe(ye({
		active: !0,
		home: !1,
		portrait: !1
	})), P = (0, Z.useRef)({}), I = (0, Z.useRef)(!1), L = (0, Z.useRef)(!1), z = T ? "asc" : "desc", B = Y({
		queryKey: he(v, C, z),
		retry: !1,
		refetchOnWindowFocus: !1,
		queryFn: ({ signal: e }) => {
			let t = I.current, n = L.current;
			return I.current = !1, L.current = !1, ve(v, e, {
				sort: C,
				direction: z,
				jobId: t ? void 0 : P.current[v],
				refreshMetadata: t,
				cancelMetadata: n
			});
		},
		refetchInterval: (e) => e.state.data?.metadata_job?.status === "running" && Math.max(1e3, e.state.data.poll_after_ms || 3e3)
	}), V = B.data?.metadata_job;
	(0, Z.useEffect)(() => {
		V?.job_id && (P.current[v] = V.job_id);
	}, [v, V?.job_id]);
	let H = q(), U = q(), W = (e) => {
		U.run(e, async () => (L.current = e === "stop", I.current = e !== "stop", B.refetch({
			cancelRefetch: !0,
			throwOnError: !0
		})), () => {});
	}, G = B.data?.items || [], K = [...new Set(G.flatMap((e) => e.tags || []))], J = G.filter((e) => (!x || e.tags?.includes(x)) && (!c || [
		e.code,
		e.title,
		e.performers,
		e.studio,
		...e.tags || [],
		...(e.performer_refs || []).map((e) => e.name)
	].join(" ").toLocaleLowerCase().includes(c.toLocaleLowerCase()))), X = B.isPending;
	return /* @__PURE__ */ (0, Q.jsxs)("section", {
		ref: O,
		"aria-label": R("为你推荐"),
		"aria-busy": X,
		className: "flex min-w-0 flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, Q.jsx)(f, {
				label: R("发现筛选与排序"),
				topLabel: R("发现范围与标签"),
				attrs: {
					"data-filter-frame": "",
					"data-jav-filter": "",
					"data-catalog-frame": ""
				},
				busy: X,
				topClassName: "gap-1.5 overflow-visible",
				bottomClassName: "min-h-12",
				top: /* @__PURE__ */ (0, Q.jsxs)("div", {
					"data-catalog-scroll": "",
					children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
						"data-catalog-views": "",
						children: [[["external", R("库外发现")], ["library", R("馆藏探索")]].map(([e, t]) => /* @__PURE__ */ (0, Q.jsx)(m, {
							"data-entity-tag": e,
							"data-entity-press": "",
							pressed: v === e,
							onPress: () => {
								se(e), E("");
							},
							children: t
						}, e)), /* @__PURE__ */ (0, Q.jsx)("span", {
							"data-entity-sep": "",
							"aria-hidden": "true"
						})]
					}), /* @__PURE__ */ (0, Q.jsx)("div", {
						"data-catalog-tags": "",
						dangerouslySetInnerHTML: X ? { __html: Se() } : void 0,
						children: X ? null : K.map((e) => /* @__PURE__ */ (0, Q.jsxs)(m, {
							"data-catalog-tag": e,
							"data-entity-press": "",
							pressed: x === e,
							onPress: () => E(x === e ? "" : e),
							children: [e, /* @__PURE__ */ (0, Q.jsx)("span", {
								"data-count-badge": "",
								children: G.filter((t) => t.tags?.includes(e)).length
							})]
						}, e))
					})]
				}),
				bottom: /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [
					/* @__PURE__ */ (0, Q.jsx)("span", {
						"data-catalog-readout": "",
						children: X ? /* @__PURE__ */ (0, Q.jsx)("span", {
							"data-skeleton": "count",
							"aria-hidden": !0,
							className: "relative inline-block h-3.5 w-37.5 rounded-md align-middle skeleton-sheen"
						}) : R("{length} 部", { length: J.length })
					}),
					/* @__PURE__ */ (0, Q.jsx)(ne, { currentHref: () => location.pathname + location.search }),
					c || x ? /* @__PURE__ */ (0, Q.jsx)(h, {
						onPress: () => {
							E(""), ee();
						},
						children: R("清除筛选")
					}) : null,
					/* @__PURE__ */ (0, Q.jsxs)("span", {
						"data-entity-sorts": "",
						children: [
							v === "external" ? /* @__PURE__ */ (0, Q.jsx)(p, {
								"data-entity-batch": "",
								"data-jav-metadata-update": "",
								label: V?.status === "running" ? R("停止读取") : R("更新资料"),
								disabled: X,
								"data-skeleton-action": X ? "" : void 0,
								busy: !!U.busy,
								icon: V?.status === "running" ? ze : Be,
								onPress: () => W(V?.status === "running" ? "stop" : "update")
							}) : null,
							/* @__PURE__ */ (0, Q.jsx)(re, {
								label: R("JAV 卡片版式"),
								value: j,
								options: _,
								onChange: Ee
							}),
							/* @__PURE__ */ (0, Q.jsx)(ie, {
								sorts: o().map(([e, t, n]) => ({
									key: e,
									label: t,
									ariaLabel: n,
									pressed: e === C,
									dir: z
								})),
								onSort: (e) => {
									e === C ? D(!T) : (le(e), D(e === "code"));
								}
							})
						]
					})
				] })
			}),
			X ? /* @__PURE__ */ (0, Q.jsx)("div", {
				role: "status",
				"aria-label": R("正在读取推荐"),
				dangerouslySetInnerHTML: { __html: be("discover", j) }
			}) : null,
			B.error ? /* @__PURE__ */ (0, Q.jsx)(b, {
				tone: "error",
				title: R("推荐未取得"),
				children: N(B.error)
			}) : null,
			v === "external" && V?.status === "running" ? /* @__PURE__ */ (0, Q.jsx)("div", {
				"data-jav-metadata": "",
				className: "min-w-0",
				children: /* @__PURE__ */ (0, Q.jsx)(oe, {
					embedded: !0,
					label: R("正在读取作品资料 · {completed} / {total} 部", {
						completed: V.completed,
						total: V.total
					}),
					value: V.completed,
					total: V.total
				})
			}) : null,
			V && V.status !== "running" && (V.status !== "complete" || V.failed > 0) ? /* @__PURE__ */ (0, Q.jsx)(b, {
				tone: "neutral",
				action: /* @__PURE__ */ (0, Q.jsx)(n, {
					variant: "secondary",
					...k(U.busy === "retry"),
					"aria-label": "立即重试读取作品资料",
					onClick: () => W("retry"),
					children: "立即重试"
				}),
				children: V.message || `作品资料 ${V.completed} / ${V.total} 部`
			}) : null,
			U.error ? /* @__PURE__ */ (0, Q.jsx)(b, {
				tone: "error",
				children: U.error
			}) : null,
			!X && !B.error && !J.length ? /* @__PURE__ */ (0, Q.jsx)(d, {
				icon: l,
				title: c || x ? "没有符合条件的推荐" : "暂无匹配口味的作品",
				actions: /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(r, {
					size: "small",
					href: "/taste",
					variant: "secondary",
					children: "查看口味"
				}), c || x ? /* @__PURE__ */ (0, Q.jsx)(n, {
					variant: "primary",
					size: "small",
					onClick: () => {
						ee(), S(""), $({
							q: "",
							tag: ""
						});
					},
					children: "清除筛选"
				}) : v === "library" ? /* @__PURE__ */ (0, Q.jsx)(r, {
					variant: "primary",
					size: "small",
					href: "/",
					children: "浏览馆藏"
				}) : /* @__PURE__ */ (0, Q.jsx)(n, {
					variant: "primary",
					size: "small",
					onClick: () => s({}),
					children: "查找作品"
				})] }),
				children: c || x ? "清除筛选后查看其他作品。" : v === "library" ? "观看或标记作品后，可以探索少看的馆藏。" : "可以查找番号，或更新关注来源。"
			}) : null,
			H.error ? /* @__PURE__ */ (0, Q.jsx)(b, {
				tone: "error",
				children: H.error
			}) : null,
			/* @__PURE__ */ (0, Q.jsx)("div", {
				"data-media-grid": "",
				className: te,
				style: { "--card-ratio": M },
				children: J.map((o) => {
					let c = o.performer_refs?.length ? o.performer_refs.map((e) => e.name).join(Ce()) : o.performers, l = me(o, j, A.value.javImage), d = we(o.taste_score ?? o.score), f = [
						d.label,
						R("口味 {taste_score}", { taste_score: ge(o.taste_score ?? o.score) }),
						B.data?.ranking_method === "mmr" && o.ranking_score != null ? R("排序 {ranking_score}", { ranking_score: ge(o.ranking_score) }) : "",
						o.source_score == null ? "" : R("来源评分 {source_score} / 5", { source_score: o.source_score.toFixed(1) }),
						...o.reasons || []
					].filter(Boolean).join(" · ");
					return /* @__PURE__ */ (0, Q.jsxs)("article", {
						"data-media-card": "",
						"data-jav-card": "",
						onClick: (e) => {
							e.target.closest("a,button,input") || u(o.asset_id ? `/assets/${o.asset_id}` : `/works/${encodeURIComponent(o.code)}`);
						},
						children: [
							/* @__PURE__ */ (0, Q.jsx)("a", {
								href: o.asset_id ? `/assets/${o.asset_id}` : `/works/${encodeURIComponent(o.code)}`,
								"aria-label": R("查看 {code} 详情", { code: o.code }),
								onClick: (e) => {
									e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0 || (e.preventDefault(), u(e.currentTarget.getAttribute("href")));
								},
								"data-media-pic": "",
								"data-jav-cover-box": "",
								className: "relative inline-grid place-items-center overflow-hidden rounded-2lg bg-background-tertiary-default",
								children: l ? /* @__PURE__ */ (0, Q.jsx)(t, {
									artwork: {
										kind: "cover",
										html: l
									},
									identity: me(o, "small", A.value.javImage),
									relayout: (e) => Te(e, j)
								}) : /* @__PURE__ */ (0, Q.jsx)("span", {
									"data-media-nopic": "",
									children: R("无封面")
								})
							}),
							/* @__PURE__ */ (0, Q.jsxs)("div", {
								"data-media-meta": "",
								children: [/* @__PURE__ */ (0, Q.jsx)(Ae, { item: o }), /* @__PURE__ */ (0, Q.jsxs)("div", {
									"data-media-text": "",
									children: [
										/* @__PURE__ */ (0, Q.jsxs)("h3", {
											"data-jav-title": "",
											"data-media-title": "",
											title: `${o.code} · ${o.title || "标题未取得"}`,
											children: [
												/* @__PURE__ */ (0, Q.jsx)("b", { children: o.code }),
												" ",
												o.title ? /* @__PURE__ */ (0, Q.jsx)("span", {
													lang: De(o.title),
													children: o.title
												}) : "标题未取得"
											]
										}),
										/* @__PURE__ */ (0, Q.jsxs)("div", {
											"data-media-byline": "",
											children: [
												o.performer_refs?.[0]?.id ? /* @__PURE__ */ (0, Q.jsxs)("a", {
													"data-media-who": "",
													href: _e("performer", o.performer_refs[0].name),
													title: c,
													children: [/* @__PURE__ */ (0, Q.jsx)("svg", {
														viewBox: "0 0 24 24",
														"aria-hidden": "true",
														children: /* @__PURE__ */ (0, Q.jsx)("use", { href: "#i-user-round" })
													}), /* @__PURE__ */ (0, Q.jsx)("span", { children: o.performer_refs[0].name })]
												}) : /* @__PURE__ */ (0, Q.jsxs)("span", {
													"data-media-who": "",
													title: c,
													children: [/* @__PURE__ */ (0, Q.jsx)("svg", {
														viewBox: "0 0 24 24",
														"aria-hidden": "true",
														children: /* @__PURE__ */ (0, Q.jsx)("use", { href: "#i-user-round" })
													}), /* @__PURE__ */ (0, Q.jsx)("span", { children: o.performer_refs?.[0]?.name || c })]
												}),
												(o.performer_refs?.length || 0) > 1 ? /* @__PURE__ */ (0, Q.jsxs)("span", {
													"data-media-who-more": "",
													children: [
														R("等"),
														" ",
														o.performer_refs.length,
														" ",
														R("人")
													]
												}) : null,
												o.release_date ? /* @__PURE__ */ (0, Q.jsxs)("time", {
													"data-media-release": "",
													dateTime: o.release_date,
													children: [/* @__PURE__ */ (0, Q.jsx)("svg", {
														viewBox: "0 0 24 24",
														"aria-hidden": "true",
														children: /* @__PURE__ */ (0, Q.jsx)("use", { href: "#i-calendar" })
													}), o.release_date]
												}) : null
											]
										}),
										/* @__PURE__ */ (0, Q.jsxs)("div", {
											"data-jav-tags": "",
											"data-media-tags": "",
											children: [/* @__PURE__ */ (0, Q.jsx)("button", {
												"data-jav-taste-score": "",
												type: "button",
												title: f,
												"aria-label": R("推荐分 {score}，{label}", {
													score: d.score,
													label: d.label
												}),
												className: "rounded-md outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
												children: /* @__PURE__ */ (0, Q.jsx)(i, {
													color: d.color,
													children: d.label
												})
											}), (o.tags || []).slice(0, 4).map((e) => /* @__PURE__ */ (0, Q.jsx)("button", {
												type: "button",
												"data-media-tag": "",
												"aria-pressed": x === e,
												onClick: () => E(x === e ? "" : e),
												children: e
											}, e))]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, Q.jsxs)("div", {
								"data-jav-actions": "",
								className: "flex flex-wrap gap-2",
								children: [
									o.link ? /* @__PURE__ */ (0, Q.jsx)(r, {
										"data-button-link": "",
										variant: "secondary",
										trailingIcon: ce,
										href: o.link,
										target: "_blank",
										rel: "noopener noreferrer",
										children: "作品来源"
									}) : null,
									/* @__PURE__ */ (0, Q.jsx)(n, {
										variant: "ghost",
										disabled: e || o.wanted || !!o.asset_id,
										...k(H.busy === String(o.id)),
										onClick: () => {
											H.run(String(o.id), (e) => ue({ code: o.code }, e), () => {
												a(R("已加入想要")), F(), B.refetch();
											});
										},
										children: o.asset_id ? "已入库" : o.wanted ? "已加入想要" : "想要"
									}),
									/* @__PURE__ */ (0, Q.jsx)(n, {
										variant: "secondary",
										onClick: () => s({
											...o,
											cover: o.has_cover ? pe(o, !0) : o.cover_url,
											origin: `${o.asset_id ? "asset" : "feed"}:${o.id}`
										}),
										children: "查找资源"
									})
								]
							})
						]
					}, o.id);
				})
			})
		]
	});
}
export { Ve as JavPage };

//# debugId=3581b4e1-895c-447f-95af-15275c70433a