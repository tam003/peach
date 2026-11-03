(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "fdba4d11-45ac-4ac1-90a6-451ea99f7fba", e._sentryDebugIdIdentifier = "sentry-dbid-fdba4d11-45ac-4ac1-90a6-451ea99f7fba");
	} catch {}
})();
import { $fe21c36db05242bb$export$d7b12c4107be0d61 as e, AMANE_BRIDGE_CHECK_URL as t, AMANE_BRIDGE_KEY as n, AMANE_BRIDGE_REBUILD_URL as r, Button as i, COVER_JOB_KEY as a, CUSTOM_SOURCES_KEY as o, CUSTOM_SOURCES_URL as s, Checkbox as c, Disclosure as l, ErrorText as u, ExternalLink as d, Fact as f, FactList as p, FieldLabel as m, Footer as h, Help as g, Input as _, LinkButton as v, LoadingDots as y, Note as b, Rows as ee, SCRAPING_CHECK_URL as te, SCRAPING_COVER_URL as x, SCRAPING_KEY as S, SCRAPING_SETTINGS_URL as ne, SEGMENT as re, SEGMENTED_TRACK as ie, Section as C, SegmentedRadioGroup as ae, Select$1 as oe, SelectField as w, SelectItem as se, SettingsRow as ce, Stack as T, StatusLabel as E, __toESM as D, apiSend as O, busyProps as k, checkText as le, confirmModal as A, errorMessage as j, esc as M, fetchAmaneBridge as N, fetchCoverJob as P, fetchCustomSources as F, fetchSources as I, i2 as ue, listSeparator as L, phrase as R, queryClient as z, require_jsx_runtime as B, require_react as V, spinnerHtml as H, useAction as U, useBackgroundJob as W, useMutation as G, useQuery as K } from "./peach-app.js";
import { CodeBlock as de } from "./peach-app.code-block-CyDva4Ms.js";
import { Page as q } from "./peach-app.page-QAncjzM1.js";
import { SiteMark as J } from "./peach-app.site-mark-D_VlIyJz.js";
import { ConnectionStatus as fe } from "./peach-app.connection-status-DI6kgn3i.js";
// src/react/scraping/custom-sources.tsx
var Y = /* @__PURE__ */ D(V(), 1), X = B(), pe = () => [
	["code", R("番号")],
	["title", R("标题")],
	["studio", R("厂牌")],
	["series", R("系列")],
	["release_date", R("发行日期")],
	["performers", R("演员（文本数组）")],
	["tags", R("标签（文本数组）")]
], me = () => [
	["censored", R("有码")],
	["amateur", R("素人")],
	["uncensored", R("无码")],
	["fc2", "FC2"],
	["kmib", R("韩国 MIB")],
	["other", R("其他")],
	["unsure", R("待核番号")],
	["unknown", R("未知")]
], he = () => ({
	name: "",
	endpoint: "",
	enabled: !1,
	fields: {
		code: "id",
		title: "title"
	},
	content_types: ["censored"]
});
function ge({ receipt: e }) {
	let [t, n] = (0, Y.useState)(null), r = K({
		queryKey: o,
		queryFn: ({ signal: e }) => F(e)
	}), a = U(), c = (e) => z.setQueryData(o, e), l = !!(r.isPending || r.error || r.data?.items.length || a.error), d = /* @__PURE__ */ (0, X.jsx)(i, {
		variant: "secondary",
		onClick: () => n(he()),
		children: R("添加来源")
	});
	return /* @__PURE__ */ (0, X.jsxs)(C, {
		title: R("自定义元数据来源"),
		children: [
			l ? /* @__PURE__ */ (0, X.jsxs)(T, { children: [
				r.isPending ? /* @__PURE__ */ (0, X.jsx)("div", {
					"aria-busy": "true",
					"data-skeleton": "",
					"aria-label": R("读取自定义来源")
				}) : null,
				r.error ? /* @__PURE__ */ (0, X.jsx)(u, { children: j(r.error) }) : null,
				r.data?.items.map((t) => /* @__PURE__ */ (0, X.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ (0, X.jsx)("span", {
							className: "min-w-0 flex-1",
							children: t.name
						}),
						/* @__PURE__ */ (0, X.jsx)(E, {
							tone: t.enabled ? "success" : "neutral",
							children: t.enabled ? "已启用" : "已停用"
						}),
						/* @__PURE__ */ (0, X.jsx)(i, {
							variant: "secondary",
							onClick: () => n(t),
							children: "编辑"
						}),
						/* @__PURE__ */ (0, X.jsx)(i, {
							variant: "secondary",
							...k(a.busy === t.id),
							onClick: () => void a.run(t.id, (e) => O(s, {
								...t,
								enabled: !t.enabled
							}, "POST", e), (n) => {
								c(n), e(t.enabled ? "已停用来源" : "已启用来源");
							}),
							children: t.enabled ? "停用" : "启用"
						}),
						/* @__PURE__ */ (0, X.jsx)(i, {
							variant: "danger",
							onClick: () => A({
								title: "删除自定义来源",
								body: `删除「${M(t.name)}」后，采集将不再查询这个来源。`,
								confirmLabel: "删除来源",
								danger: !0,
								onConfirm: async () => {
									c(await O(s, {
										action: "delete",
										id: t.id
									})), n(null), e(R("已删除来源"));
								}
							}),
							children: R("删除")
						})
					]
				}, t.id)),
				a.error ? /* @__PURE__ */ (0, X.jsx)(u, { children: a.error }) : null
			] }) : null,
			t ? null : l ? /* @__PURE__ */ (0, X.jsx)(h, { children: d }) : /* @__PURE__ */ (0, X.jsx)(T, { children: /* @__PURE__ */ (0, X.jsx)("div", {
				className: "flex justify-end",
				children: d
			}) }),
			t ? /* @__PURE__ */ (0, X.jsx)(_e, {
				initial: t,
				cancel: () => n(null),
				saved: (t) => {
					c(t), n(null), e(R("已保存来源"));
				}
			}, t.id || "new") : null
		]
	});
}
function _e({ initial: e, cancel: t, saved: n }) {
	let [r, a] = (0, Y.useState)(e), [o, l] = (0, Y.useState)(""), [d, f] = (0, Y.useState)(""), p = (0, Y.useRef)(0), v = U(), y = (e) => {
		p.current++, a((t) => ({
			...t,
			...e
		})), f("");
	};
	return /* @__PURE__ */ (0, X.jsxs)("form", {
		"aria-label": R("元数据来源配置"),
		"aria-busy": v.busy === "preview",
		onSubmit: (e) => {
			e.preventDefault(), v.run("save", (e) => O(s, r, "POST", e), n);
		},
		children: [/* @__PURE__ */ (0, X.jsxs)(T, { children: [
			/* @__PURE__ */ (0, X.jsx)(_, {
				label: R("来源名称"),
				value: r.name,
				maxLength: 80,
				onChange: (e) => y({ name: e })
			}),
			/* @__PURE__ */ (0, X.jsx)(_, {
				label: R("JSON 接口地址"),
				value: r.endpoint,
				maxLength: 2048,
				placeholder: "https://example.com/api/movies/{code}",
				onChange: (e) => y({ endpoint: e })
			}),
			/* @__PURE__ */ (0, X.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, X.jsx)(m, { children: R("来源连接方式") }), /* @__PURE__ */ (0, X.jsx)(w, {
					id: "custom-source-network",
					label: R("来源连接方式"),
					epoch: 0,
					value: r.network || "direct",
					options: [["direct", R("直连")], ["peach_proxy", R("Peach 代理")]],
					onPick: (e) => y({ network: e })
				})]
			}),
			/* @__PURE__ */ (0, X.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, X.jsx)(m, { children: R("接口番号格式") }), /* @__PURE__ */ (0, X.jsx)(w, {
					id: "custom-source-code-format",
					label: R("接口番号格式"),
					epoch: 0,
					value: r.code_format || "original",
					options: [
						["original", R("原样")],
						["lowercase", R("小写")],
						["compact", R("去掉连字符")],
						["underscore", R("连字符转下划线")]
					],
					onPick: (e) => y({ code_format: e })
				})]
			}),
			/* @__PURE__ */ (0, X.jsx)(g, { children: R("填写公开 JSON 接口和响应字段路径，例如 data.title。番号字段用于核对作品身份。") }),
			pe().map(([e, t]) => /* @__PURE__ */ (0, X.jsx)(_, {
				label: R("{label}字段路径", { label: t }),
				value: r.fields[e] || "",
				onChange: (t) => {
					let n = { ...r.fields };
					t ? n[e] = t : delete n[e], y({ fields: n });
				}
			}, e)),
			/* @__PURE__ */ (0, X.jsx)("div", {
				className: "flex flex-wrap gap-3",
				role: "group",
				"aria-label": R("适用内容类型"),
				children: me().map(([e, t]) => /* @__PURE__ */ (0, X.jsx)(c, {
					isSelected: r.content_types.includes(e),
					onChange: (t) => y({ content_types: t ? [...r.content_types, e] : r.content_types.filter((t) => t !== e) }),
					children: t
				}, e))
			}),
			/* @__PURE__ */ (0, X.jsx)(c, {
				isSelected: r.enabled,
				onChange: (e) => y({ enabled: e }),
				children: R("启用来源")
			}),
			/* @__PURE__ */ (0, X.jsx)(_, {
				label: R("试查番号（回车查询）"),
				value: o,
				onChange: (e) => {
					p.current++, l(e), f("");
				},
				onKeyDown: (e) => {
					if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
					e.preventDefault();
					let t = p.current;
					v.run("preview", (e) => O(s, {
						...r,
						code: o,
						action: "preview"
					}, "POST", e), (e) => {
						t === p.current && f(JSON.stringify(e.record, null, 2));
					}, (e) => {
						t === p.current && v.setError(j(e));
					});
				}
			}),
			v.busy === "preview" ? /* @__PURE__ */ (0, X.jsxs)(g, {
				role: "status",
				children: [/* @__PURE__ */ (0, X.jsx)("span", { dangerouslySetInnerHTML: { __html: H("正在试查来源") } }), "正在试查来源"]
			}) : null,
			d ? /* @__PURE__ */ (0, X.jsx)(de, {
				code: d,
				language: "json",
				label: "元数据接口返回"
			}) : null,
			v.error ? /* @__PURE__ */ (0, X.jsx)(u, { children: v.error }) : null
		] }), /* @__PURE__ */ (0, X.jsxs)(h, { children: [/* @__PURE__ */ (0, X.jsx)(i, {
			variant: "secondary",
			type: "button",
			onClick: t,
			children: R("取消")
		}), /* @__PURE__ */ (0, X.jsx)(i, {
			type: "submit",
			...k(v.busy === "save"),
			children: R("保存来源")
		})] })]
	});
}
// src/react/scraping/scraping-page.tsx
var Z = () => [["peach", R("Peach 代理")], ["direct", R("直接连接")]];
function Q(e) {
	return Z().some(([t]) => t === e) || !e ? [...Z()] : [...Z(), [e, e]];
}
function ve(e) {
	try {
		return new URL(e).host || e;
	} catch {
		return e;
	}
}
var $ = () => [["paste", R("粘贴 Cookie")], ["file", R("导入文件")]];
function ye() {
	return /* @__PURE__ */ (0, X.jsx)(J, { source: "github" });
}
function be({ source: t, toast: n }) {
	let [r, a] = (0, Y.useState)(t.network), [o, s] = (0, Y.useState)(""), [c, l] = (0, Y.useState)(""), [f, p] = (0, Y.useState)($()[0][0]), [g, y] = (0, Y.useState)(""), [x, w] = (0, Y.useState)(""), D = (0, Y.useRef)(null);
	function A() {
		s(""), l(""), y(""), w(""), D.current && (D.current.value = "");
	}
	let M = G({
		mutationFn: (e) => O(ne, {
			source: t.source,
			network: r,
			cookie: o,
			cookies_text: c,
			revoke: e
		}),
		onSuccess: (e, t) => {
			z.setQueryData(S, (t) => t && {
				...t,
				sources: t.sources.map((t) => t.source === e.saved.source ? e.saved : t)
			}), A(), n(R(t ? "Cookie 已撤销" : "来源设置已保存"));
		}
	}), N = G({ mutationFn: () => O(te, { source: t.source }) }), P = M.isPending || N.isPending, F = (e) => {
		e.preventDefault(), !P && (N.reset(), M.mutate(!1));
	}, I = () => {
		P || (N.reset(), M.mutate(!0));
	}, L = () => {
		P || (M.reset(), N.mutate());
	};
	async function B(e) {
		let t = e.currentTarget, n = t.files?.[0];
		if (l(""), w(""), !n) y("");
		else if (n.size > 262144) t.value = "", y(""), w(R("Cookie 文本超过 256 KiB"));
		else try {
			let e = await n.text();
			l(e), y(n.name);
		} catch {
			w(R("Cookie 文件未读取，请重新选择"));
		}
	}
	let V = x || (M.error ? j(M.error) : "") || (N.error ? j(N.error) : ""), H = N.data?.results ?? [], U = r === "peach" || t.accepts_cookie || t.browser || !!V || H.length > 0;
	return /* @__PURE__ */ (0, X.jsxs)(C, {
		title: t.label,
		onSubmit: F,
		aside: /* @__PURE__ */ (0, X.jsxs)("span", {
			className: "flex min-w-0 items-center gap-1",
			children: [/* @__PURE__ */ (0, X.jsx)(J, { source: t.source }), t.login ? /* @__PURE__ */ (0, X.jsx)(d, {
				href: t.login,
				children: ve(t.login)
			}) : null]
		}),
		children: [
			/* @__PURE__ */ (0, X.jsx)(ee, { children: /* @__PURE__ */ (0, X.jsx)(ce, {
				label: R("连接方式"),
				children: /* @__PURE__ */ (0, X.jsx)(oe, {
					"aria-label": R("连接方式"),
					className: "w-44 min-w-0",
					selectedKey: r,
					onSelectionChange: (e) => {
						e !== null && a(String(e));
					},
					children: Q(r).map(([e, t]) => /* @__PURE__ */ (0, X.jsx)(se, {
						id: e,
						children: t
					}, e))
				})
			}) }),
			t.cooldown_until && t.cooldown_until > Date.now() / 1e3 ? /* @__PURE__ */ (0, X.jsx)(b, {
				tone: "warning",
				children: /* @__PURE__ */ (0, X.jsxs)("span", {
					className: "inline-flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, X.jsx)(E, {
						tone: "warning",
						children: "冷却中"
					}), /* @__PURE__ */ (0, X.jsx)("span", { children: R("可在 {time} 后重试。", { time: (/* @__PURE__ */ new Date(t.cooldown_until * 1e3)).toLocaleString("zh-CN") }) })]
				})
			}) : null,
			U ? /* @__PURE__ */ (0, X.jsxs)(T, {
				divided: !0,
				children: [
					r === "peach" ? /* @__PURE__ */ (0, X.jsx)("span", {
						className: "self-start",
						children: /* @__PURE__ */ (0, X.jsx)(v, {
							href: "/settings/library#peachProxy",
							size: "small",
							trailingIcon: ue,
							children: R("配置 Peach 代理")
						})
					}) : null,
					t.browser ? /* @__PURE__ */ (0, X.jsx)("p", {
						className: "text-body-2-regular text-text-secondary",
						children: R("人机验证由本机浏览器自动完成；需要点击时窗口会弹出。这台机器上不需要 Cookie。")
					}) : null,
					t.accepts_cookie && !t.browser ? /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [
						/* @__PURE__ */ (0, X.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, X.jsx)("span", {
								className: "self-start",
								children: /* @__PURE__ */ (0, X.jsx)(E, {
									tone: t.cookie_saved ? "success" : "neutral",
									children: t.cookie_saved ? "Cookie 已保存" : "Cookie 未配置"
								})
							}), /* @__PURE__ */ (0, X.jsx)("p", {
								className: "text-body-2-regular text-text-secondary",
								children: t.cookie_saved ? "登录有效性待验证。" : "需要登录时，任选一种方式提供 Cookie。"
							})]
						}),
						/* @__PURE__ */ (0, X.jsx)(ae, {
							"aria-label": R("提供 Cookie 的方式（二选一）"),
							value: f,
							onChange: (e) => {
								p(e), A();
							},
							className: ie,
							children: $().map(([t, n]) => /* @__PURE__ */ (0, X.jsx)(e, {
								value: t,
								className: re,
								children: n
							}, t))
						}),
						f === "paste" ? /* @__PURE__ */ (0, X.jsx)(_, {
							type: "password",
							label: "Cookie",
							autoComplete: "off",
							value: o,
							onChange: s
						}) : /* @__PURE__ */ (0, X.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [
								/* @__PURE__ */ (0, X.jsx)(m, { children: R("Netscape Cookie 文件（.txt）") }),
								/* @__PURE__ */ (0, X.jsxs)("div", {
									className: "flex flex-wrap items-center gap-3",
									children: [/* @__PURE__ */ (0, X.jsx)(i, {
										variant: "secondary",
										onClick: () => D.current?.click(),
										children: R("选择文件")
									}), /* @__PURE__ */ (0, X.jsx)("span", {
										className: "min-w-0 text-body-2-regular break-all text-text-secondary",
										children: g || R("未选择文件")
									})]
								}),
								/* @__PURE__ */ (0, X.jsx)("input", {
									ref: D,
									type: "file",
									accept: ".txt",
									tabIndex: -1,
									"aria-hidden": !0,
									className: "hidden",
									onChange: (e) => {
										B(e);
									}
								})
							]
						})
					] }) : null,
					V ? /* @__PURE__ */ (0, X.jsx)(u, { children: V }) : null,
					H.map((e) => /* @__PURE__ */ (0, X.jsx)(b, {
						tone: e.ok ? "success" : "error",
						children: /* @__PURE__ */ (0, X.jsxs)("span", {
							className: "flex flex-col items-start gap-1",
							children: [/* @__PURE__ */ (0, X.jsx)(fe, {
								tone: e.ok ? "success" : "error",
								children: e.ok ? "可访问" : "连接失败"
							}), /* @__PURE__ */ (0, X.jsx)("span", { children: le(e, t.label) })]
						})
					}, e.label))
				]
			}) : null,
			/* @__PURE__ */ (0, X.jsxs)(h, { children: [
				t.accepts_cookie && t.cookie_saved ? /* @__PURE__ */ (0, X.jsx)(i, {
					variant: "secondary",
					onClick: I,
					...k(P),
					children: R("撤销 Cookie")
				}) : null,
				/* @__PURE__ */ (0, X.jsx)(i, {
					variant: "secondary",
					onClick: L,
					...k(P),
					children: R("检查连接")
				}),
				/* @__PURE__ */ (0, X.jsx)(i, {
					type: "submit",
					...k(P),
					children: R("保存")
				})
			] })
		]
	});
}
function xe({ toast: e }) {
	let [t, n] = (0, Y.useState)(""), { running: r, outcome: o, start: s } = W({
		queryKey: a,
		queryFn: ({ signal: e }) => P(e),
		start: () => O(x, { code: t }),
		onFinish: (t) => {
			t.status === "complete" && e(t.result || R("封面采集完成"));
		}
	}), c = (e) => {
		e.preventDefault(), !(r || s.isPending || !t.trim()) && s.mutate();
	}, l = s.error ? j(s.error) : o?.status === "failed" ? o.error || R("采集未取得") : "";
	return /* @__PURE__ */ (0, X.jsx)(C, {
		title: R("高清封面"),
		onSubmit: c,
		children: /* @__PURE__ */ (0, X.jsxs)(T, { children: [
			/* @__PURE__ */ (0, X.jsxs)("div", {
				className: "flex flex-wrap items-end gap-2",
				children: [/* @__PURE__ */ (0, X.jsx)("div", {
					className: "min-w-0 flex-1",
					children: /* @__PURE__ */ (0, X.jsx)(_, {
						"aria-label": R("馆藏番号"),
						isRequired: !0,
						isDisabled: r,
						value: t,
						onChange: n,
						placeholder: R("输入馆藏番号，如 ABW-232")
					})
				}), /* @__PURE__ */ (0, X.jsx)(i, {
					type: "submit",
					disabled: !t.trim(),
					...k(r || s.isPending),
					children: R("抓取封面")
				})]
			}),
			r ? /* @__PURE__ */ (0, X.jsx)(y, { label: R("正在抓取封面") }) : null,
			l ? /* @__PURE__ */ (0, X.jsx)(b, {
				tone: "error",
				children: l
			}) : null,
			o?.status === "complete" ? /* @__PURE__ */ (0, X.jsx)(b, {
				tone: "success",
				children: o.result || R("封面采集完成")
			}) : null
		] })
	});
}
function Se({ toast: e }) {
	let { query: a, running: o, outcome: s, start: c } = W({
		queryKey: n,
		queryFn: ({ signal: e }) => N(e),
		start: () => O(r, {}),
		jobOf: (e) => e.job,
		withJob: (e, t) => e && {
			...e,
			job: t
		},
		onFinish: (t) => {
			t.status === "complete" && e(t.result || R("amane 桥已重建"));
		}
	}), u = G({ mutationFn: () => O(t, {}) }), m = a.data;
	if (!m) return a.error ? /* @__PURE__ */ (0, X.jsx)(C, {
		id: "amane",
		title: "amane",
		children: /* @__PURE__ */ (0, X.jsx)(T, { children: /* @__PURE__ */ (0, X.jsx)(b, {
			tone: "error",
			children: j(a.error)
		}) })
	}) : null;
	let _ = o || c.isPending || u.isPending, v = c.error ? j(c.error) : u.error ? j(u.error) : s?.status === "failed" ? s.error || R("重建未完成") : "";
	return /* @__PURE__ */ (0, X.jsxs)(C, {
		id: "amane",
		title: "amane",
		aside: /* @__PURE__ */ (0, X.jsx)(d, {
			href: m.repository,
			leadingIcon: ye,
			children: m.repository
		}),
		children: [
			/* @__PURE__ */ (0, X.jsxs)(p, { children: [
				/* @__PURE__ */ (0, X.jsx)(f, {
					term: R("已安装版本"),
					children: m.installed_version || R("未安装")
				}),
				/* @__PURE__ */ (0, X.jsx)(f, {
					term: R("上游最新版本"),
					children: u.data?.latest ?? R("尚未检查")
				}),
				/* @__PURE__ */ (0, X.jsx)(f, {
					term: R("运行环境"),
					children: m.installed ? R("已安装") : R("未安装")
				}),
				/* @__PURE__ */ (0, X.jsxs)(f, {
					term: R("内置站点"),
					children: [
						m.sites.length.toLocaleString(),
						" ",
						R("个")
					]
				})
			] }),
			/* @__PURE__ */ (0, X.jsxs)(T, {
				divided: !0,
				children: [
					m.sites.length ? /* @__PURE__ */ (0, X.jsx)(l, {
						summary: R("查看内置站点"),
						children: /* @__PURE__ */ (0, X.jsx)("p", {
							className: "text-body-2-regular text-text-secondary",
							children: m.sites.map((e) => R(e.label)).join(L())
						})
					}) : null,
					m.problem ? /* @__PURE__ */ (0, X.jsx)(b, {
						tone: "error",
						children: m.problem
					}) : /* @__PURE__ */ (0, X.jsx)(g, { children: R("amane（{license}）提供这些内置站点的解析能力。首次需要时，Peach 会自动准备锁定的 {version} 版本；安装包内已有可用环境时直接使用。 手动安装也使用此版本，不随上游自动升级。", {
						license: m.license,
						version: m.version
					}) }),
					o ? /* @__PURE__ */ (0, X.jsx)(y, { label: "正在重建运行环境" }) : null,
					v ? /* @__PURE__ */ (0, X.jsx)(b, {
						tone: "error",
						children: v
					}) : null,
					s?.status === "complete" ? /* @__PURE__ */ (0, X.jsx)(b, {
						tone: "success",
						children: s.result || R("amane 桥已重建")
					}) : null
				]
			}),
			/* @__PURE__ */ (0, X.jsxs)(h, { children: [/* @__PURE__ */ (0, X.jsx)(i, {
				variant: "secondary",
				onClick: () => {
					_ || u.mutate();
				},
				...k(u.isPending),
				children: R("检查上游版本")
			}), /* @__PURE__ */ (0, X.jsx)(i, {
				disabled: !!m.problem,
				onClick: () => {
					_ || c.mutate();
				},
				...k(o || c.isPending),
				children: m.installed ? "重新安装" : "安装"
			})] })
		]
	});
}
function Ce({ toast: e }) {
	let t = K({
		queryKey: S,
		queryFn: ({ signal: e }) => I(e)
	}), n = t.data;
	return n ? /* @__PURE__ */ (0, X.jsxs)(q, { children: [
		/* @__PURE__ */ (0, X.jsx)("p", {
			className: "text-body-2-regular text-text-secondary",
			children: R("高清图片可能要经代理才能下载，先检查连接。")
		}),
		/* @__PURE__ */ (0, X.jsx)(xe, { toast: e }),
		/* @__PURE__ */ (0, X.jsx)(ge, { receipt: e }),
		(n.sources || []).map((t) => /* @__PURE__ */ (0, X.jsx)(be, {
			source: t,
			toast: e
		}, t.source)),
		/* @__PURE__ */ (0, X.jsx)(Se, { toast: e })
	] }) : /* @__PURE__ */ (0, X.jsx)(q, { children: /* @__PURE__ */ (0, X.jsx)(b, {
		tone: "error",
		title: R("采集来源读取失败"),
		children: t.error ? j(t.error) : R("读取采集来源失败")
	}) });
}
export { Ce as ScrapingPage, ve as linkHost, Q as networkOptions };

//# debugId=fdba4d11-45ac-4ac1-90a6-451ea99f7fba