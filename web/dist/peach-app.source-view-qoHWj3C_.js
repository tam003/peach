(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "97adf5dc-5b44-42ed-be9f-0b02b24152f6", e._sentryDebugIdIdentifier = "sentry-dbid-97adf5dc-5b44-42ed-be9f-0b02b24152f6");
	} catch {}
})();
import { Button as e, Chip as t, Wt as n, __toESM as r, authorAvatar as i, authorInitial as a, errorHeadline as o, isBroken as s, phrase as c, require_jsx_runtime as l, require_react as u, sourceIconUrl as d, statusText as f } from "./peach-app.js";
import { MarkImage as p } from "./peach-app.site-mark-D_VlIyJz.js";
// src/react/follow-manage/source-view.tsx
var m = /* @__PURE__ */ r(u(), 1), h = l();
function g({ provider: e }) {
	return /* @__PURE__ */ (0, h.jsx)(p, { src: d(e) });
}
function _({ group: e, name: t }) {
	let { src: n, fallback: r } = i(e), [o, s] = (0, m.useState)(0), l = [n, r].filter(Boolean)[o];
	return l ? /* @__PURE__ */ (0, h.jsx)("img", {
		src: l,
		alt: "",
		width: 32,
		height: 32,
		loading: "lazy",
		referrerPolicy: "no-referrer",
		onError: () => s(o + 1),
		className: "size-8 shrink-0 rounded-full bg-background-tertiary-default object-cover"
	}) : /* @__PURE__ */ (0, h.jsx)("span", {
		title: c("没有可用头像"),
		className: "inline-grid size-8 shrink-0 place-items-center rounded-full bg-background-tertiary-default text-caption-1-semibold text-text-secondary",
		children: a(t)
	});
}
function v({ source: e }) {
	let n = !e.enabled || e.history_exhausted ? "gray" : s(e) ? "rose" : e.enabled && e.last_status === "ok" ? "lime" : e.enabled ? "yellow" : "gray";
	return /* @__PURE__ */ (0, h.jsx)(t, {
		variant: "caption",
		color: n,
		children: f(e)
	});
}
function y({ source: e }) {
	return /* @__PURE__ */ (0, h.jsxs)("a", {
		href: e.url,
		target: "_blank",
		rel: "noopener noreferrer",
		title: "打开原来源",
		className: "max-w-full min-w-0 self-start text-body-medium wrap-anywhere text-text-primary underline-offset-2 hover:underline",
		children: [e.label, /* @__PURE__ */ (0, h.jsx)(n, {
			"aria-hidden": !0,
			className: "size-(--icon-inline) shrink-0"
		})]
	});
}
function b({ text: t, prefix: n = "", tone: r = "error" }) {
	let i = (0, m.useRef)(null), [a, s] = (0, m.useState)(!1), [l, u] = (0, m.useState)(!1), d = o(t);
	(0, m.useLayoutEffect)(() => {
		let e = i.current;
		if (!e || a) return;
		let t = () => u(e.scrollWidth > e.clientWidth + 1);
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	}, [d, a]);
	let f = l || d !== String(t || "").trim();
	return /* @__PURE__ */ (0, h.jsxs)("span", {
		className: "flex min-w-0 max-w-full flex-col items-start gap-0.5",
		children: [/* @__PURE__ */ (0, h.jsxs)("small", {
			ref: i,
			"data-error-line": "",
			className: `max-w-full text-caption-1-regular ${r === "error" ? "text-text-error-primary" : "text-text-secondary"} ${a ? "whitespace-pre-line wrap-anywhere" : "block truncate"}`,
			children: [n, a ? t : d]
		}), f ? /* @__PURE__ */ (0, h.jsx)(e, {
			variant: "ghost",
			size: "small",
			"data-error-line-toggle": "",
			"data-error-details-toggle": "",
			"aria-expanded": a,
			className: "-ml-2",
			onClick: () => s(!a),
			children: c(a ? "收起详情" : "查看详情")
		}) : null]
	});
}
export { _ as AuthorAvatar, b as ErrorLine, g as SourceIcon, y as SourceLink, v as StatusBadge };

//# debugId=97adf5dc-5b44-42ed-be9f-0b02b24152f6