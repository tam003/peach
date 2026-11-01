(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "519694eb-a8ce-49ee-8d4f-0ef102a351a5", e._sentryDebugIdIdentifier = "sentry-dbid-519694eb-a8ce-49ee-8d4f-0ef102a351a5");
	} catch {}
})();
import { Button as e, CollectionSummary as t, DUPLICATES_KEY as n, EmptyState as r, FilterGlass as i, GlassPill as a, KEEP_LABELS as o, LOC as s, MEDIA_SOURCES_KEY as c, MEDIA_SOURCE_ICONS as l, Note as u, SourceLabel as d, SourceMark as f, TRASH_KEY as p, __toESM as m, batchOperate as h, bulkCloudPreferences as g, busyProps as _, cardClass as v, cloudLocations as y, confirmModal as b, distinctName as x, duplicateVictims as S, errorMessage as C, fetchDuplicates as w, fetchMediaSources as T, fmtDur as E, fmtSize as D, mixedCloudPreferences as O, phrase as k, queryClient as A, require_jsx_runtime as j, require_react as M, sharedNamePrefix as N, spriteGlyph as P, useMutation as F, useQuery as I, victimBytes as L } from "./peach-app.js";
// src/react/duplicates/duplicates-page.tsx
var R = /* @__PURE__ */ m(M(), 1), z = j(), B = P("play"), V = P("file-stack"), H = v({
	padding: "none",
	radius: "surface",
	className: "mb-6 overflow-hidden dark:bg-background-primary-default"
}), U = "rounded-sm px-1.5 py-px text-caption-1-regular leading-5", W = "rounded-sm px-2 py-0.5 text-caption-1-regular leading-5", G = "font-mono text-caption-1-regular leading-5 text-text-secondary", K = () => {
	A.invalidateQueries({
		queryKey: n,
		exact: !0
	}), A.invalidateQueries({
		queryKey: p,
		exact: !0
	});
};
function q(e) {
	return e.identical ? /* @__PURE__ */ (0, z.jsx)("span", {
		className: `${W} text-(--keep)`,
		children: k("sha1 一致")
	}) : /* @__PURE__ */ (0, z.jsx)("span", {
		className: `${W} text-text-secondary`,
		children: e.evidence === "same_code_short_copy" ? k("同番号短版本") : k("时长推断")
	});
}
function J({ file: e, prefix: t, openItem: n }) {
	let r = () => n(e.id), i = s[e.location] || e.location || e.drive;
	return /* @__PURE__ */ (0, z.jsxs)("div", {
		className: "duplicate-row items-center gap-3 border-t border-separator-border px-5 py-4 max-compact:p-4",
		children: [
			/* @__PURE__ */ (0, z.jsxs)("button", {
				type: "button",
				onClick: r,
				"aria-label": k("预览 {name}", { name: e.name }),
				className: "relative row-span-2 inline-grid aspect-16/10 w-full cursor-pointer place-items-center overflow-hidden rounded-2lg bg-background-tertiary-default text-text-secondary",
				children: [/* @__PURE__ */ (0, z.jsx)(B, {
					"aria-hidden": !0,
					className: "size-6"
				}), /* @__PURE__ */ (0, z.jsx)("img", {
					src: `/thumb?id=${e.id}&c=4`,
					alt: "",
					loading: "lazy",
					onError: (e) => e.currentTarget.remove(),
					className: "absolute inset-0 size-full object-contain"
				})]
			}),
			/* @__PURE__ */ (0, z.jsxs)("span", {
				className: "flex min-w-0 items-center gap-2 max-duplicate-narrow:col-start-2 max-duplicate-narrow:-col-end-1",
				children: [/* @__PURE__ */ (0, z.jsx)("button", {
					type: "button",
					onClick: r,
					title: e.name,
					"data-middle-truncate": !0,
					"data-middle-truncate-within": !0,
					className: "min-w-0 shrink cursor-pointer truncate text-left text-body-regular hover:text-text-secondary",
					children: x(e.name, t)
				}), e.is_largest || e.is_longest ? /* @__PURE__ */ (0, z.jsxs)("span", {
					className: "flex flex-none gap-1",
					children: [e.is_largest ? /* @__PURE__ */ (0, z.jsx)("i", {
						className: `${U} not-italic bg-background-primary-hover text-text-secondary`,
						children: k("最大")
					}) : null, e.is_longest ? /* @__PURE__ */ (0, z.jsx)("i", {
						className: `${U} not-italic bg-(--keep)/22 text-(--keep)`,
						children: k("最长")
					}) : null]
				}) : null]
			}),
			/* @__PURE__ */ (0, z.jsxs)("span", {
				className: `${G} flex min-w-0 items-center gap-1.5`,
				children: [/* @__PURE__ */ (0, z.jsx)(f, { mark: l[e.location] || "database" }), /* @__PURE__ */ (0, z.jsx)("span", {
					title: i,
					className: "min-w-0 truncate",
					children: i
				})]
			}),
			/* @__PURE__ */ (0, z.jsx)("span", {
				className: G,
				children: D(e.size || 0)
			}),
			/* @__PURE__ */ (0, z.jsx)("span", {
				className: G,
				children: E(e.duration)
			}),
			/* @__PURE__ */ (0, z.jsx)("span", {
				className: `${G} col-start-2 -col-end-1 min-w-0 pt-0.5 wrap-anywhere max-duplicate-narrow:col-span-full`,
				children: e.path ?? ""
			})
		]
	});
}
function Y({ openItem: l, toast: f, failure: p }) {
	let m = I({
		queryKey: n,
		queryFn: ({ signal: e }) => w(e)
	}), v = I({
		queryKey: c,
		queryFn: ({ signal: e }) => T(e)
	}), [x, E] = (0, R.useState)(""), A = F({
		mutationFn: (e) => h(e, "dispose"),
		onSuccess: (e, t) => {
			K(), f(k("已把 {length} 项移入回收站", { length: t.length }), { undo: async () => {
				try {
					await h(t, "restore");
				} catch (e) {
					p(k("撤销移入回收站"), e);
				} finally {
					K();
				}
			} });
		},
		onSettled: () => E("")
	}), j = m.data;
	if (!j) return /* @__PURE__ */ (0, z.jsx)("div", {
		className: "mx-auto w-full max-w-board",
		children: /* @__PURE__ */ (0, z.jsx)(u, {
			tone: "error",
			title: k("重复文件读取失败"),
			children: m.error ? C(m.error) : k("未取得重复文件列表，请刷新页面重试。")
		})
	});
	let M = j.groups ?? [], P = y(v.data), B = ({ groups: e, keep: t, key: n }) => {
		if (A.isPending) return;
		let r = S(e, t);
		r.length && b({
			title: k("移入回收站"),
			body: k("将把 {length} 个重复文件的馆藏记录移入回收站，每组保留{label}。", {
				length: r.length,
				label: o[t] ?? o.largest
			}) + k("文件共 {chosen}，记录可从回收站还原。", { chosen: D(L(e, r)) }),
			confirmLabel: k("移入回收站"),
			onConfirm: () => (E(n), A.mutateAsync(r))
		});
	}, U = (e) => _(x === e && A.isPending);
	return /* @__PURE__ */ (0, z.jsxs)("div", {
		className: "mx-auto w-full max-w-board pb-10.5",
		children: [
			/* @__PURE__ */ (0, z.jsx)(t, {
				label: k("重复内容"),
				figure: k("{total} 组", { total: Number(j.total || 0).toLocaleString() }),
				detail: k("{files} 个文件 · 可回收 {reclaimable}", {
					files: Number(j.files || 0).toLocaleString(),
					reclaimable: D(j.reclaimable)
				})
			}),
			M.length ? /* @__PURE__ */ (0, z.jsxs)(i, {
				title: k("批量保留"),
				children: [
					/* @__PURE__ */ (0, z.jsx)(a, {
						busy: x === "all:largest",
						onPress: () => B({
							groups: M,
							keep: "largest",
							key: "all:largest"
						}),
						children: k("全部保留最大")
					}),
					/* @__PURE__ */ (0, z.jsx)(a, {
						busy: x === "all:longest",
						onPress: () => B({
							groups: M,
							keep: "longest",
							key: "all:longest"
						}),
						children: k("全部保留最长")
					}),
					g(M, P).map((e) => /* @__PURE__ */ (0, z.jsx)(a, {
						busy: x === `all:${e}`,
						onPress: () => B({
							groups: M,
							keep: e,
							key: `all:${e}`
						}),
						children: /* @__PURE__ */ (0, z.jsx)(d, {
							source: e,
							label: k("全部优先 {item}", { item: s[e] || e })
						})
					}, e))
				]
			}) : null,
			A.isError ? /* @__PURE__ */ (0, z.jsx)("div", {
				className: "mb-5",
				children: /* @__PURE__ */ (0, z.jsx)(u, {
					tone: "error",
					title: k("移入回收站失败"),
					children: C(A.error)
				})
			}) : null,
			M.length ? M.map((t, n) => {
				let r = [t], i = N(t.files.map((e) => e.name)), a = (e) => `${n}:${e}`;
				return /* @__PURE__ */ (0, z.jsxs)("section", {
					"aria-label": t.code,
					className: H,
					children: [/* @__PURE__ */ (0, z.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3 bg-background-tertiary-default p-5 max-compact:p-4 dark:bg-background-secondary-default",
						children: [
							/* @__PURE__ */ (0, z.jsx)("b", {
								className: "text-title-2-medium text-text-primary",
								children: t.code
							}),
							/* @__PURE__ */ (0, z.jsx)("span", {
								className: "font-mono text-caption-1-regular leading-5 text-text-primary",
								children: k("{count} 个 · 可回收 {reclaimable}", {
									count: Number(t.count || 0).toLocaleString(),
									reclaimable: D(t.reclaimable)
								})
							}),
							q(t),
							t.cross_drive ? /* @__PURE__ */ (0, z.jsx)("span", {
								className: `${W} text-text-secondary`,
								children: k("跨盘 {drives}", { drives: t.drives.join(" ") })
							}) : null,
							/* @__PURE__ */ (0, z.jsxs)("span", {
								className: "ml-auto flex flex-wrap gap-2 max-compact:ml-0 max-compact:w-full",
								children: [
									/* @__PURE__ */ (0, z.jsx)(e, {
										variant: "secondary",
										size: "small",
										...U(a("largest")),
										onClick: () => B({
											groups: r,
											keep: "largest",
											key: a("largest")
										}),
										children: k("留最大")
									}),
									/* @__PURE__ */ (0, z.jsx)(e, {
										variant: "secondary",
										size: "small",
										...U(a("longest")),
										onClick: () => B({
											groups: r,
											keep: "longest",
											key: a("longest")
										}),
										children: k("留最长")
									}),
									O(t.files, P).map((t) => /* @__PURE__ */ (0, z.jsx)(e, {
										variant: "secondary",
										size: "small",
										...U(a(t)),
										onClick: () => B({
											groups: r,
											keep: t,
											key: a(t)
										}),
										children: /* @__PURE__ */ (0, z.jsx)(d, {
											source: t,
											label: k("留 {item}", { item: s[t] || t })
										})
									}, t)),
									/* @__PURE__ */ (0, z.jsx)(e, {
										variant: "danger",
										size: "small",
										...U(a("all")),
										onClick: () => B({
											groups: r,
											keep: "all",
											key: a("all")
										}),
										children: k("整组回收")
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, z.jsx)("div", { children: t.files.map((e) => /* @__PURE__ */ (0, z.jsx)(J, {
						file: e,
						prefix: i,
						openItem: l
					}, e.id)) })]
				}, `${t.code}-${n}`);
			}) : /* @__PURE__ */ (0, z.jsx)(r, {
				icon: V,
				title: k("没有找到重复文件"),
				children: k("所有来源之间没有检测到内容相同的文件。扫描新来源后，这里会自动更新。")
			}),
			M.length > 0 && j.total > M.length ? /* @__PURE__ */ (0, z.jsx)("p", {
				className: "text-center text-caption-1-regular text-text-secondary",
				children: k("显示可回收最多的前 {length} 组，共 {total} 组；处理掉这些后，其余的会补上来。", {
					length: M.length.toLocaleString(),
					total: Number(j.total).toLocaleString()
				})
			}) : null
		]
	});
}
export { Y as DuplicatesPage };

//# debugId=519694eb-a8ce-49ee-8d4f-0ef102a351a5